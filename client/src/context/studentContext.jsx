import React, { createContext, useState, useEffect } from 'react';


const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
    const [student, setStudent] = useState(null);
    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            {children}
        </StudentContext.Provider>
    );
};

export { StudentContext, StudentContextProvider };
