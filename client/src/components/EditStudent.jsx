import React, { useState, useContext } from 'react';
import { StudentContext } from '../context/studentContext';
import user from "../img/user(2).png";

function EditStudent() {
    const { student } = useContext(StudentContext);
    const [avatar, setAvatar] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phoneNumber: '',
        address: '',
        profilePicture: null, // Initialize profilePicture as null
        role: 'student' // Default role is 'student'
    });

    const {firstName, lastName, dob, email, phoneNumber, address, profilePicture, role} = formData;


    const onFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file }); // Set the file itself in formData
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeFile = () => {
        setFormData({ ...formData, profilePicture: null });
        setAvatar(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send formData to your endpoint
        console.log(formData);
        setFormData({
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            phoneNumber: '',
            address: '',
            profilePicture: null,
            role: 'student'
        });
    };

    return (
        <div className='edit-student-container'>
            <div className="edit-student-wrapper">
                <div className="add-photo">
                    <input onChange={onFileChange} type="file" name="file" id="file" />
                    {student.profilePicture !== '' && <img src={avatar ? avatar : student.profilePicture} />}
                    {student.profilePicture === '' && <img src={avatar ? avatar : user} alt="" />}
                    <div className="photo-buttons">
                        <label htmlFor='file' className='btn btn-primary' >Choose file</label>
                        <button onClick={() => removeFile()} className='btn btn-danger'>Remove</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Enter Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Enter Phone Number"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <textarea
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        rows="3"
                                        placeholder="Enter Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditStudent;
