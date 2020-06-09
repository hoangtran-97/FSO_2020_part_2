import React, {useState, useEffect} from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [query, setQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isError, setIsError] = useState(false);
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
    const removePerson = (id, name) => {
        console.log("removed", id);
        if (window.confirm(`Do you really want to delete ${name} with an ID of ${id}`)) {
            personService
                .remove(id)
                .then((res) => {
                    personService.getAll().then((response) => {
                        console.log("promise fulfilled", response);
                        setPersons(response);
                        setIsError(false);
                        setErrorMessage(`Information of ${name} has been removed from the server`);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    });
                })
                .catch((err) => {
                    setIsError(true);
                    setErrorMessage(`Information of ${name} has already been removed from the server`);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });
        }
    };
    const handleSubmitForm = (event) => {
        event.preventDefault();
        const existingName = persons.filter((person) => person.name === newName);
        if (existingName.length > 0) {
            alert(`${newName} is already added.`);
            const {number, id} = existingName[0];
            if (number !== newNumber) {
                if (window.confirm("Replace existing number with new number?")) {
                    const changedPerson = {...existingName[0], number: newNumber};
                    personService.update(id, changedPerson).then((response) => {
                        setPersons(persons.map((person) => (person.id !== id ? person : response)));
                        setIsError(false);
                        setErrorMessage(`Person '${response.name}' number was changed to ${response.number}`);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    });
                }
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            };
            personService.create(newPerson).then((response) => {
                setPersons(persons.concat(response));
                setNewName("");
                setNewNumber("");
                setIsError(false);
                setErrorMessage(`Person '${response.name}' was added`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
        }
    };

    const result = query
        ? persons.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()))
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} isError={isError}></Notification>
            <Filter query={query} handleQuery={handleQuery}></Filter>
            <PersonForm {...{handleNameChange, handleNumberChange, handleSubmitForm, newName, newNumber}}></PersonForm>
            <h2>Numbers</h2>
            <Persons result={result} removePerson={removePerson}></Persons>
        </div>
    );
};

export default App;
