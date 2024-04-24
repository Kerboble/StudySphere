import React, { useContext, useEffect, useState } from 'react';
import { CohortContext } from '../context/cohortContext';
import axios from 'axios';
import exam from "../img/exam.png"
import book from "../img/book.png"
import books from "../img/books.png"
import quiz from "../img/megaphone.png"
import events from "../img/upcoming.png"
import defaultPhoto from "../img/shark.png"



function CohortFiles() {
  const { cohort } = useContext(CohortContext);
  const [teacher, setTeacher] = useState(null);

  const readingMaterials = cohort ? cohort.cohortFiles.readingMaterial : null;
  const readingAssignments = cohort ? cohort.cohortFiles.assignments : null;
  const tests = cohort ? cohort.cohortFiles.tests : null;
  const teacherID = cohort ? cohort.instructorID : null;

  const displayReadingMaterials = readingMaterials
    ? readingMaterials.map((material, index) => <p key={index}>{material}</p>)
    : null;

  const displayAssignments = readingAssignments
    ? readingAssignments.map((assignment, index) => <p key={index}>{assignment}</p>)
    : null;

  const displayTests = tests
    ? tests.map((test, index) => <p key={index}>{test}</p>)
    : null;

  const displayStudents = cohort.students
    ? cohort.students.map((student, index) => (
      <>
      <div className='student' key={student.id}>
          <img src={student.student.profilePicture || defaultPhoto} alt={`Student ${index + 1}`} />
          <strong>{student.student.username}</strong>
          <button className='btn btn-primary btn-sm'>Profile</button>
        </div>
        <hr />
      </>
      ))
    : null;

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.post("http://localhost:4000/get-teacher", { id: teacherID });
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };
    if (teacherID) {
      fetchTeacher();
    }
  }, [teacherID]);

  console.log(teacher)

  return (
    <div>
      <header>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>{cohort.cohortName}</h1>
      </header>
      <div className='files-container'>
        <div className="files-wrapper">
          <div className='files reading-material'>
            <img src={books} alt="" />
            <h4>Reading Material</h4>
            {displayReadingMaterials}
          </div>
          <div className="files assignments">
            <img src={book} alt="" />
            <h4>Assignments</h4>
            {displayAssignments}
          </div>
          <div className="files tests">
            <img src={exam} alt="" />
            <h4>Exams</h4>
            {displayTests}
          </div>
          <div className="files quizzes">
            <img src={quiz} alt="" />
            <h4>Quizzes</h4>
            0
          </div>
          <div className="files events">
            <img src={events} alt="" />
            <h4>Events</h4>
            0
          </div>
        </div>
        <div className='users'>
        <div className="students">
        <h3>Students</h3>
        <hr />
          {displayStudents}
        </div>
        {teacher && (
          <div className='teacher'>
            <h3>Instructor</h3>
            <p>{teacher.username}</p>
            <img  className='instructor-photo' src={teacher.profilePicture === "" ? defaultPhoto : teacher.profilePicture} alt="" />
            <div className="information">
              <p>Email:{teacher.email}</p>
              <p>Phone:{teacher.phoneNumber}</p>
            </div>
            <button className='btn btn-primary'>Profile</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default CohortFiles;

