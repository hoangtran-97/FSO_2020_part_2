import React from "react";

const Notification = ({message, isError}) => {
    console.log(isError);

    if (message === null) {
        return null;
    }
    return (
        <div className="error" style={{color: isError ? "red" : "green"}}>
            {message}
        </div>
    );
};

export default Notification;
