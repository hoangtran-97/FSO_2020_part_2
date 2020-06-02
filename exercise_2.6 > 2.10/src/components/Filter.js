import React from "react";

const Filter = ({query, handleQuery}) => {
    return (
        <div>
            Filter name <input value={query} onChange={handleQuery} />
        </div>
    );
};

export default Filter;
