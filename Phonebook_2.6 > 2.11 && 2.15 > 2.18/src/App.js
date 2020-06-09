import React, {useState, useEffect} from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        console.log("effect");
        personService.getAll().then((response) => {
            console.log("promise fulfilled", response);
            setPersons(response);
        });
    }, []);
    console.log("render", persons.length, "persons");

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
            personService.create(newPerson).then((response) => {
                setPersons(persons.concat(response));
                setNewName("");
                setNewNumber("");
            });
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
