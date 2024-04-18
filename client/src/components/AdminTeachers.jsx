import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

function AdminTeachers() {
    const [users] = useOutletContext();
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    const teachers = users ? users.filter(user => user.role === "teacher") : [];
    
    const toggleModal = (teacher) => {
        setShowModal(!showModal);
        setSelectedTeacher(teacher);
    };

    const test = (data) => {
        console.log(data);
    };

    // Filter teachers based on email
    const filteredTeachers = teachers.filter(teacher =>
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.username.localeCompare(b.username)); 

    return (
        <div className="student-container">
            <div className='students-header'>
                <div>
                    <p>Manage Teachers</p>
                    <h1>Teachers</h1>
                </div>
                <div style={{display:"flex", flexDirection:"row", gap:"10px", alignSelf:"flex-end"}}>
                    <p>{teachers.length} Teachers</p>
                    <input 
                        type="text" 
                        placeholder='search email'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Add teacher button */}
                    <button type="button" className="btn btn-outline-primary btn-sm">+ ADD teacher</button>
                </div>        
            </div>
            <hr />
            {filteredTeachers.map(teacher => (
                <div key={teacher.id}>
                    <div className="student">
                        <div className="student-info">
                            <img className='student-img' src={teacher.profilePicture} alt="" />
                            <strong>{teacher.username}</strong>
                            <p>{teacher.email}</p>
                        </div>
                        <div className="actions">
                            <button type="button" className="btn btn-secondary" onClick={() => toggleModal(teacher)}>Actions</button>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Actions</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    {selectedTeacher && (
                        <>
                            <div className="modal-student-info">
                                <img className='logo' src={selectedTeacher.profilePicture} alt="" />
                                <strong>Username: {selectedTeacher.username}</strong>
                                <p>Email: {selectedTeacher.email}</p>
                                <p>Phone Number: {selectedTeacher.phoneNumber}</p>
                                <p>ID: {selectedTeacher._id}</p>
                                <p>Role: {selectedTeacher.role}</p>
                            </div>
                        </>
                    )}
                    <Button variant="primary">Edit</Button>
                    <Button onClick={() => test(selectedTeacher.username)} variant="danger">Test</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminTeachers;
