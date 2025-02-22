function SearchParam({ paramTitle, paramName, paramId}: {paramTitle:string, paramName:string, paramId:string}) {
    return (
        <div>
            <label htmlFor={paramId}>{paramTitle}:</label><br />
            <input type="text" id={paramId} name={paramName} />
            <button>Add</button><br />
        </div>
    );
}

export default function SearchGUI() {
    return (
        <div className= "border-[5px]">
            <h1>Search</h1>
            <SearchParam paramTitle="Card Name" paramName="name" paramId="name" />
            <SearchParam paramTitle="Rules Text" paramName="text" paramId="text" />
            <SearchParam paramTitle="Expansion" paramName="expansion" paramId="expansion" />
            <SearchParam paramTitle="Format" paramName="format" paramId="format" />
            <SearchParam paramTitle="Colors" paramName="colors" paramId="colors" />
            <SearchParam paramTitle="Color Identity" paramName="colorId" paramId="colorId" />
            <SearchParam paramTitle="Types" paramName="types" paramId="types" />
            <SearchParam paramTitle="Subtypes" paramName="subtypes" paramId="subtypes" />
            {/* <SearchParam paramTitle="Mana Value" paramName="mv" paramId="mv" /> */}
        </div>
    );
}