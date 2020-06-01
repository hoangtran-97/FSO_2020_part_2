import React from "react";

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
            {parts.map((part) => (
                <Part part={part.name} exercise={part.exercises} key={part.id}></Part>
            ))}
        </>
    );
};
const Total = (props) => {
    const {parts} = props;
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises;
    }, 0);
    console.log(total);
    return <p>Number of exercises {total}</p>;
};
const Course = ({course}) => {
    const {name, parts} = course;
    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    );
};

export default Course;
