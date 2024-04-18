import React, {useState} from 'react'
import { AuthContext } from '../context/authContext'
import { useOutletContext } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';


function AdminStudents() {
    const users = useOutletContext();
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    const students = users ? users.filter(user => user.role === "student") : [];
    
    const toggleModal = (student) => {
        setShowModal(!showModal);
        setSelectedStudent(student);
    };

    const test = (data) => {
        console.log(data);
    };

    // Filter students based on email
    const filteredStudents = students.filter(student =>
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.username.localeCompare(b.username)); 

    return (
        <div className="student-container">
            <div className='students-header'>
                <div>
                    <p>Manage Students</p>
                    <h1>Students</h1>
                </div>
                <div style={{display:"flex", flexDirection:"row", gap:"10px", alignSelf:"flex-end"}}>
                    <p>{students.length} Students</p>
                    <input 
                        type="text" 
                        placeholder='search email'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="button" class="btn btn-outline-primary btn-sm">+ ADD student</button>
                </div>        
            </div>
            <hr />
            {filteredStudents.map(student => (
                <div key={student.id}>
                    <div className="student">
                        <div className="student-info">
                            <img className='student-img' src={student.profilePicture} alt="" />
                            <strong>{student.username}</strong>
                            <p>{student.email}</p>
                        </div>
                        <div className="actions">
                            <button type="button" className="btn btn-secondary" onClick={() => toggleModal(student)}>Actions</button>
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
                    {selectedStudent && (
                        <>
                            <div className="modal-student-info">
                                <img className='logo' src={selectedStudent.profilePicture} alt="" />
                                <strong>Username:{selectedStudent.username}</strong>
                                <p>Email:{selectedStudent.email}</p>
                                <p>Phone Number:{selectedStudent.phoneNumber}</p>
                                <p>ID:{selectedStudent._id}</p>
                            </div>
                        </>
                    )}
                    <Button variant="primary">Edit</Button>
                    <Button onClick={() => test(selectedStudent.username)} variant="danger">Test</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminStudents;