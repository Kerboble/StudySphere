import React, { useContext, useState } from 'react';
import { StudentContext } from '../context/studentContext';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

function StudentClasses() {
    const { student } = useContext(StudentContext);
    const [users, refreshData, cohorts] = useOutletContext();
    const id = student._id;
    const profilePicture = student.profilePicture;
    const username = student.username
    console.log(username)

    const [selectedCohort, setSelectedCohort] = useState(null);
    const listCohorts = cohorts ? cohorts.map(cohort => (
        <option key={cohort._id} value={cohort._id}>{cohort.cohortName}</option>
    )) : null;

    const handleAddToCohort = async () => {
        console.log(id, selectedCohort, profilePicture, username);
        try {
            const res = await axios.post("http://localhost:4000/add-to-class", {
                studentId: id,
                cohortId: selectedCohort,
                profilePicture,
                username
            });
            console.log("Response:", res.data);
            closeModal();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const [modalVisible, setModalVisible] = useState(false);
    
    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = () => {
        setModalVisible(false);
    };
    

    const showMyCourses = cohorts
    ? cohorts.map(cohort => {
        if (cohort.students && Array.isArray(cohort.students)) {
          const studentIds = cohort.students.map(student => student.id);
          if (studentIds.includes(id)) {
            return <p>{cohort.cohortName}</p>;
          }
        }
        return null;
      })
    : null;
  
    

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>Add to Cohort</button>
            <div>{showMyCourses}</div>
            {modalVisible && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select Cohort</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <select className="form-control" onChange={(e) => setSelectedCohort(e.target.value)} value={selectedCohort}>
                                    <option value="">Select a cohort</option>
                                    {listCohorts}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddToCohort}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentClasses;
