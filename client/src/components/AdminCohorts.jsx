import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
import NewCohort from '../Pages/NewCohort';

function AdminCohorts() {
    const [users, refreshData, cohorts] = useOutletContext();
    const [selectedCohort, setSelectedCohort] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCohortModal, setNewCohortModal] = useState(false);

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

    const displayCohort = filteredCohorts?.map(cohort => (
        <>
            <div className="cohort" key={cohort._id}>
                <p>Name: {cohort.cohortName}</p>
                <p>Subject: {cohort.cohortSubject}</p>
                <p>Instructor: {cohort.instructorID}</p>
                <p>Cohort Status: {cohort.isLive ? 'active' : 'not active'}</p>
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
                        <Button variant="danger">Delete</Button>
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
