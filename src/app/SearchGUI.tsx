"use client";
import { useState } from "react";

/**
 * Returns a <ul> containing all current search parameters
 * @param {Array<{}>} searchParameters - An array of JSON search parameters.
 * @returns a <ul> of search paramters.
 */
function ParameterDisplay({ searchParameters }: { searchParameters:Array<{}> }){
    let i = 0;
    return (
        <ul>
            {searchParameters.map((param) => (
                <li key={i++}>{JSON.stringify(param)}</li>
            ))}
        </ul>
    );
}


/**
 * @returns A div containing multiple search parameter fields, a current search parameters display, and a Search button.
 */
export default function SearchGUI() {
    // let searchParams = [{ "example": 1 }, { "example": 2 }, { "example": 3 }];
    const [searchParams, setSearchParams] = useState<{}[]>([]);

    /**
     * Returns a div containing a Label, a text input, and an Add button. Used for adding search parameters.
     * @param {string} paramTitle - The text of the label.
     * @param {string} paramId - The unique ID for the parameter. (i.e. 'name' for searching via name)
     * @returns a div with a label, text input, and Add button
     */
    function SearchParam({ paramTitle, paramId, inputType }: { paramTitle: string, paramId: string, inputType: string }) {
        const [inputVal, setInputVal] = useState("");

        function addParameter() {
            const newParam = {"searchParam": paramId, "searchValue": inputVal}
            setSearchParams([...searchParams, newParam]);
        }
        return (
            <div>
                <label htmlFor={paramId}>{paramTitle}:</label><br />
                <input type={inputType} id={paramId} name={paramId} onChange={(e) => setInputVal(e.target.value)}/>
                <button onClick={addParameter}>Add</button><br />
            </div>
        );
    }

    return (
        <div className= "border-[5px]">
            <div>
                <h1>Search Parameters</h1>
                <SearchParam paramTitle="Card Name" paramId="name" inputType="text" />
                <SearchParam paramTitle="Rules Text" paramId="oracle_text" inputType="text" />
                <SearchParam paramTitle="Expansion" paramId="expansion" inputType="text" />
                <SearchParam paramTitle="Colors" paramId="colors" inputType="text" />
                <SearchParam paramTitle="Color Identity" paramId="colorId" inputType="text" />
                <SearchParam paramTitle="Types" paramId="types" inputType="text" />
                <SearchParam paramTitle="Subtypes" paramId="subtypes" inputType="text" />
                <SearchParam paramTitle="Mana Value" paramId="mv" inputType="number" />
            </div>
            <div>
                <h1>Current Parameters:</h1>
                <ParameterDisplay searchParameters={searchParams} />
            </div>
        </div>
    );
}