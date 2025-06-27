"use client";
import { useState } from "react";
import { Filter } from "mongodb";
import { type CardData } from "./fetch"


interface SearchParam {
    field: string;
    operator: string;
    clause: string;
    value: string | string[] | number;
}

/** Takes a SearchParam and converts it to a user-readable string. */
function searchParamToString(param: SearchParam): string {
    const opDict:Record<string, string> = {"$eq": "==", "$lt":"<", "$lte":"<=", "$gt":">", "$gte":">=", "$regex":"matches", "$in":"has"};
    const clauseDict:Record<string, string> = {"$and": "AND", "$not":"NOT", "$or":"OR"};
    return (clauseDict[param['clause']] + " " + param['field'] + " " + opDict[param['operator']] + " '" + param['value'] + "'");
}

/** Create a list of SearchParams for each color in the input string
 * @returns An array of SearchParams
 */
function handleColorInput(paramId: string, operator: string, clause: string, value: string): Array<SearchParam> {
    const colorDict: Record<string, string> = { "red": "R", "white": "W", "blue": "U", "green": "G", "black": "B", "colorless": "C", "r": "R", "w": "W", "u": "U", "g": "G", "b": "B", "c": "C" };
    const colors = value
        .toLowerCase()
        .split(" ")
        .map((c) => colorDict[c])
        .filter(Boolean);

    const parameters: Array<SearchParam> = [];
    for (const color of colors) {
        const newParam: SearchParam = { "field": paramId, "operator": operator, "clause": clause, "value": (color === "C") ? [] : [color] }
        parameters.push(newParam);
    }
    return parameters;
}

/** Create a list of SearchParams for each word in the search term. Words in "'s or /'s will remained grouped
 * @returns An array of SearchParams
 */
function handleTextInput(paramId: string, operator: string, clause: string, value: string): Array<SearchParam> {
    const regex: RegExp = /(?![^"/]*["/]) /;
    const matches = value.split(regex);
    const words = matches.map(token =>
        ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith('/') && token.endsWith('/')))
            ? token.slice(1, -1) // remove quotes or slashes
            : token
    );

    const parameters: Array<SearchParam> = [];
    for (const word of words) {
        const newParam: SearchParam = { "field": paramId, "operator": operator, "clause": clause, "value": word }
        parameters.push(newParam);
    }
    return parameters;
}

interface SearchGUIProps {
    onSearch: (query: Filter<CardData>) => void;
    className: string;
}

/**
 * @returns A div containing multiple search parameter fields, a current search parameters display, and a Search button.
 */
export default function SearchGUI({ onSearch, className } : SearchGUIProps) {
    const [searchParams, setSearchParams] = useState<SearchParam[]>([]);

    function handleSearchClick() {        
        const query: Filter<CardData> = {"$and":[], "$or":[]};
        
        for (const { field, operator, clause, value } of searchParams) {
            let operator_subquery = {[operator]: value};

            // Make regex-based searches case-insensitive
            if (operator === "$regex") {
                operator_subquery['$options'] = "i";
            }

            // $not isn't a top level operator like $or and $and, so they need to be handled differently
            if (clause === "$not") {
                operator_subquery = { "$not": operator_subquery };
                query["$and"].push({ [field]: operator_subquery });
            }

            // $or and $and operators
            else {
                query[clause].push({ [field]: operator_subquery });
            }
        }

        // Delete unused $and and $or
        if (query.$and.length === 0)
            delete query.$and
        if (query.$or.length === 0)
            delete query.$or

        onSearch(query);
    }

    /**
     * Returns a div containing a Label, a text input, and an Add button. Used for adding search parameters.
     * @param {string} paramTitle - The text of the label.
     * @param {string} paramId - The unique ID for the parameter. (i.e. 'name' for searching via name)
     * @param {string} inputType - The type of input. (i.e. 'text' or 'number')
     * @param {string} defaultOp - The default operator used for searching with this parameter field. (i.e. '$regex' for text or '$eq' for a number)
     * @returns a div with a label, text input, and Add button
     */
    function SearchParamEntry({ paramTitle, paramId, inputType, defaultOp }: { paramTitle: string, paramId: string, inputType: string, defaultOp: string }) {
        const defaultCompare : string = defaultOp
        const [inputVal, setInputVal] = useState("");
        const [clause, setClause] = useState("$and");
        const [compare, setCompare] = useState(defaultCompare);

        function addParameter() {
            if (inputType === "number") {
                const newParam: SearchParam = { "field": paramId, "operator": compare, "clause": clause, "value": Number(inputVal) }
                setSearchParams([...searchParams, newParam]);
            } else if (paramId === "colors" || paramId === "color_identity") {
                const newParams: Array<SearchParam> = handleColorInput(paramId, compare, clause, inputVal)
                setSearchParams(searchParams.concat(newParams));
            } else {
                const newParams: Array<SearchParam> = handleTextInput(paramId, compare, clause, inputVal)
                setSearchParams(searchParams.concat(newParams));
            }
        }
        return (
            <div>
                <label htmlFor={paramId}>{paramTitle}:</label><br />
                <select name={paramId + "ClauseSelect"} id={paramId + "ClauseSelect"} onChange={(e) => setClause(e.target.value)}>
                    <option value="$and">And</option>
                    <option value="$or">Or</option>
                    <option value="$not">Not</option>
                </select>
                {(inputType === "number") ? (
                    <select name={paramId + "CompareSelect"} id={paramId + "CompareSelect"} onChange={(e) => setCompare(e.target.value)}>
                        <option value="$eq">{"=="}</option>
                        <option value="$lt">{"<"}</option>
                        <option value="$lte">{"<="}</option>
                        <option value="$gt">{">"}</option>
                        <option value="$gte">{">="}</option>
                    </select>
                ) : null}
                <input type={inputType} id={paramId} name={paramId} 
                    onChange={(e) => setInputVal(e.target.value)} 
                    size={(inputType === "number") ? 13 : 20}/>
                <button onClick={addParameter}>Add</button><br />
            </div>
        );
    }

    /**
     * Returns a unordered list containing all current search parameters
     * @returns an unordered list of search paramters.
     */
    function ParameterDisplay() {
        let i = 0;
        return (
            <div>
            <ul>
                {searchParams.length === 0 ? (
                    <li>None</li>
                ) : (
                    searchParams.map((param) => (
                        <li key={i++}>
                            <button onClick={() => setSearchParams(searchParams.toSpliced(searchParams.indexOf(param), 1))}>[Remove]</button>
                            {" " + searchParamToString(param)}
                        </li>
                    )))}
            </ul>
            <button onClick={() => setSearchParams([])}>Clear All</button>
            </div>
        );
    }

    return (
        <div className={className}>
            <div>
                <h1 className="text-2xl font-bold">Search Parameters</h1>
                <SearchParamEntry paramTitle="Card Name" paramId="name" inputType="text" defaultOp="$regex"/>
                <SearchParamEntry paramTitle="Rules Text" paramId="oracle_text" inputType="text" defaultOp="$regex" />
                <SearchParamEntry paramTitle="Colors" paramId="colors" inputType="text" defaultOp="$in" />
                <SearchParamEntry paramTitle="Color Identity" paramId="color_identity" inputType="text" defaultOp="$in" />
                <SearchParamEntry paramTitle="Types" paramId="type_line" inputType="text" defaultOp="$regex" />
                <SearchParamEntry paramTitle="Mana Value" paramId="cmc" inputType="number" defaultOp="$eq" />
                <SearchParamEntry paramTitle="Rarity" paramId="rarity" inputType="text" defaultOp="$eq" />
                <SearchParamEntry paramTitle="Expansion/Set" paramId="set_name" inputType="text" defaultOp="$eq" />
                <SearchParamEntry paramTitle="Flavor Text" paramId="flavor_text" inputType="text" defaultOp="$regex" />
                <SearchParamEntry paramTitle="Artist" paramId="artist" inputType="text" defaultOp="$regex" />
                <br/>
                <button onClick={handleSearchClick} className="text-2xl font-bold">Search</button>
            </div>
            <br/>
            <div>
                <h1 className="text-2xl font-bold">Current Parameters</h1>
                <ParameterDisplay />
            </div>
        </div>
    );
}