import React, { createContext, useState, useEffect } from 'react';


const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
    const storedStudent = JSON.parse(localStorage.getItem('student'))
    const [student, setStudent] = useState(storedStudent ? storedStudent : null);
    console.log(storedStudent)
    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            {children}
        </StudentContext.Provider>
    );
};

export { StudentContext, StudentContextProvider };
