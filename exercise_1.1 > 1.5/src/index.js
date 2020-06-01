import React from "react";
import ReactDOM from "react-dom";

const Part = (props) => {
    const {part, exercise} = props;
    return (
        <p>
            {part} {exercise}
        </p>
    );
};
const Header = (props) => {
    const {course} = props;
    return <h1>{course}</h1>;
};
const Content = (props) => {
    const {parts} = props;
    return (
        <>
            {parts.map((part, index) => (
                <Part part={part.name} exercise={part.exercises} key={index}></Part>
            ))}
        </>
    );
};
const Total = (props) => {
    const {parts} = props;
    let total = 0;
    parts.map((part) => (total += part.exercises));
    return <p>Number of exercises {total}</p>;
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };
    const {name, parts} = course;

    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
