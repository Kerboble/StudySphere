import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
import NewCohort from '../Pages/NewCohort';
import axios from 'axios';

function AdminCohorts() {
    const [users, refreshData, cohorts] = useOutletContext();
    const [selectedCohort, setSelectedCohort] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCohortModal, setNewCohortModal] = useState(false);

    const activeCohort = {
        color:"green"
    }
    const inActiveCohort = {
        color:"red"
    }

    const toggleModal = (cohort) => {
        setShowModal(!showModal);
        setSelectedCohort(cohort);
    };

    const toggleNewCohortModal = () => {
        setNewCohortModal(!newCohortModal);
    };

    const filteredCohorts = cohorts.filter(cohort =>
        cohort.cohortName.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.cohortName.localeCompare(b.cohortName));

    const deleteCohort = async (id) => {
        const confirmed = window.confirm(`Are you sure you want to delete the user with cohort: ${id}?`);
        if (confirmed) {
            try {
                const res = await axios.post("http://localhost:4000/delete-cohort", { id });
                setShowModal(false);
                console.log('Cohort has been deleted:', res.data);
            } catch (error) {
                console.error('Error deleting cohort:', error);
            }
        } else {
            console.log('Deletion cancelled by user.');
        }

    };

    const displayCohort = filteredCohorts?.map(cohort => (
        <>
            <div className="cohort" key={cohort._id}>
                <p><strong>Name</strong>{cohort.cohortName}</p>
                <p><strong>Subject</strong> {cohort.cohortSubject}</p>
                <p><strong>Instructor</strong>{cohort.instructorID}</p>
                {cohort.isLive ?  <p style={activeCohort}><strong>inactive</strong> </p>: <p style={inActiveCohort}><strong>inactive</strong> </p>}
                <div className="actions">
                    <button type="button" className="btn btn-secondary" onClick={() => toggleModal(cohort)}>Actions</button>
                </div>
            </div>
            <hr />
        </>
    ));

    return (
        <div className="student-container">
            <div className='students-header'>
                <div>
                    <p>Manage Cohorts</p>
                    <h1>Cohorts</h1>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignSelf: "flex-end" }}>
                    <p style={{ color: "gray" }}>{cohorts.length} Cohorts</p>
                    <input
                        type="text"
                        placeholder='Search cohort name'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={toggleNewCohortModal}>+ Add Cohort</button>
                </div>
            </div>
            <hr />
            {displayCohort}
            <Modal className="modal-container" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Actions</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-content">
                    {selectedCohort && (
                        <>
                            <div className="modal-student-info">
                                <strong>Username: {selectedCohort.username}</strong>
                                <p>Email: {selectedCohort.email}</p>
                                <p>Phone Number: {selectedCohort.phoneNumber}</p>
                                <p>ID: {selectedCohort._id}</p>
                                <p>Role: {selectedCohort.role}</p>
                            </div>
                        </>
                    )}
                    <div className="modal-footer">
                        <Button variant="primary">Edit</Button>
                        <Button variant="primary">Assign Teacher</Button>
                        <Button variant="primary">View Files</Button>
                        <Button onClick={() => deleteCohort(selectedCohort._id)} variant="danger">Delete</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal className="modal-container" show={newCohortModal} onHide={toggleNewCohortModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Cohort</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCohort />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleNewCohortModal}>Close</Button>
                    {/* Add save functionality */}
                    <Button variant="primary" onClick={toggleNewCohortModal}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminCohorts;
