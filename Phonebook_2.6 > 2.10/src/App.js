import React, {useState} from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        {name: "Arto Hellas", number: "040-123456"},
        {name: "Ada Lovelace", number: "39-44-5323523"},
        {name: "Dan Abramov", number: "12-43-234345"},
        {name: "Mary Poppendieck", number: "39-23-6423122"},
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [query, setQuery] = useState("");

    const handleQuery = (event) => {
        setQuery(event.target.value);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if (persons.filter((person) => person.name === newName).length > 0) {
            alert(`${newName} is already added.`);
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            };
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
        }
    };

    const result = query
        ? persons.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()))
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter query={query} handleQuery={handleQuery}></Filter>
            <PersonForm {...{handleNameChange, handleNumberChange, handleSubmitForm, newName, newNumber}}></PersonForm>
            <h2>Numbers</h2>
            <Persons result={result}></Persons>
        </div>
    );
};

export default App;
