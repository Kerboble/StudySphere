import React, {useContext} from 'react'
import { CohortContext } from '../context/cohortContext'


function CohortFiles() {
    const {cohort} = useContext(CohortContext);
    
    const readingAssignments = cohort ? cohort.cohortFiles.readingMaterial : null;

    const displayReadingAssignments = readingAssignments?  readingAssignments.map(assignment => {
        return (
            <p>{assignment}</p>
        )
    }) : null;
    console.log(displayReadingAssignments)
  return (
    <div>
        <header>
            
        </header>
        {displayReadingAssignments}
    </div>
  )
}

export default CohortFiles