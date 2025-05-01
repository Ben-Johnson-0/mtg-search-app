"use client";
import { useState } from "react";


interface SearchParam {
    field: string;
    operator: string;
    clause: string;
    value: any;
}

interface SearchGUIProps {
    onSearch: (query: Record<string, any>) => void;
}

function buildQuery(params: SearchParam[]): Record<string, any> {
    const query: Record<string, any> = {};

    for (const { field, operator, clause, value } of params) {
        if (!(query.hasOwnProperty(clause))) {
            query[clause] = []
        }
        query[clause].push({ [field]: { [operator]: value } });
    }

    return(query);
}

/**
 * @returns A div containing multiple search parameter fields, a current search parameters display, and a Search button.
 */
export default function SearchGUI({ onSearch } : SearchGUIProps) {
    const [searchParams, setSearchParams] = useState<SearchParam[]>([]);

    function handleSearchClick() {
        const query: Record<string, any> = {};
        for (const {field, operator, value} of searchParams) {
            query[field] = {[operator]: value};
        }
        onSearch(query);
    }

    /**
     * Returns a div containing a Label, a text input, and an Add button. Used for adding search parameters.
     * @param {string} paramTitle - The text of the label.
     * @param {string} paramId - The unique ID for the parameter. (i.e. 'name' for searching via name)
     * @returns a div with a label, text input, and Add button
     */
    function SearchParamEntry({ paramTitle, paramId, inputType }: { paramTitle: string, paramId: string, inputType: string }) {
        const [inputVal, setInputVal] = useState("");

        function addParameter() {
            const newParam: SearchParam = { "field": paramId, "operator": "$eq", "clause": "$and", "value": inputVal }
            setSearchParams([...searchParams, newParam]);
        }
        return (
            <div>
                <label htmlFor={paramId}>{paramTitle}:</label><br />
                <input type={inputType} id={paramId} name={paramId} onChange={(e) => setInputVal(e.target.value)} />
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
            <ul>
                {searchParams.length === 0 ? (
                    <li>None</li>
                ) : (
                    searchParams.map((param) => (
                        <li key={i++}>
                            <button onClick={(e) => setSearchParams(searchParams.toSpliced(searchParams.indexOf(param), 1))}>[Remove]</button>
                            {" " + JSON.stringify(param)}
                        </li>
                    )))}
            </ul>
        );
    }

    return (
        <div className="border-[5px] border-transparent">
            <div>
                <h1 className="text-2xl font-bold">Search Parameters</h1>
                <SearchParamEntry paramTitle="Card Name" paramId="name" inputType="text" />
                <SearchParamEntry paramTitle="Rules Text" paramId="oracle_text" inputType="text" />
                <SearchParamEntry paramTitle="Expansion" paramId="expansion" inputType="text" />
                <SearchParamEntry paramTitle="Colors" paramId="colors" inputType="text" />
                <SearchParamEntry paramTitle="Color Identity" paramId="colorId" inputType="text" />
                <SearchParamEntry paramTitle="Types" paramId="types" inputType="text" />
                <SearchParamEntry paramTitle="Subtypes" paramId="subtypes" inputType="text" />
                <SearchParamEntry paramTitle="Mana Value" paramId="cmc" inputType="number" />
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