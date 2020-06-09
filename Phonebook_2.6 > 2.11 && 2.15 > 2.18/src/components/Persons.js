import React from "react";

const Persons = ({result, removePerson}) => {
    return (
        <>
            {result.map((person) => (
                <div key={person.name}>
                    <p>
                        {person.name} / {person.number}
                    </p>
                    <button type="button" onClick={() => removePerson(person.id, person.name)}>
                        Delete
                    </button>
                </div>
            ))}
        </>
    );
};

export default Persons;
