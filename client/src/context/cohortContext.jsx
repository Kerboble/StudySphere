import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const CohortContext = createContext();

const CohortContextProvider = ({ children }) => {
    const [cohort, setCohort] = useState(null);
    return (
        <CohortContext.Provider value={{ cohort, setCohort }}>
            {children}
        </CohortContext.Provider>
    );
};

export { CohortContext, CohortContextProvider };