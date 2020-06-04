import React from "react";

const Persons = ({result}) => {
    return (
        <>
            {result.map((person) => (
                <p key={person.name}>
                    {person.name} / {person.number}
                </p>
            ))}
        </>
    );
};

export default Persons;