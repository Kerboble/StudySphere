import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import defaultCohortPhoto from "../img/coursephoto.jpg"
import { CohortContext } from '../context/cohortContext';
import { useOutletContext } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import ProgressBar from 'react-bootstrap/ProgressBar';
import arrow from "../img/right-arrow (2).png"
import defaultTeacherPhoto from "../img/shark.png"



function StudentCourses() {
    const {currentUser} = useContext(AuthContext);
    const [users, refreshData, cohorts] = useOutletContext();
    const {setCohort} = useContext(CohortContext);
    const Navigate = useNavigate();



    const courseOverView = (cohort) => {
        localStorage.removeItem('cohort');
        localStorage.setItem('cohort', JSON.stringify(cohort));
        setCohort(cohort);
        Navigate("../cohortfiles")
        console.log(course)
    }

    const showMyCourses = cohorts
    ? cohorts.map(cohort => {
        if (cohort.students) {
          const studentIds = cohort.students.map(student => student.student.id);
          if (studentIds.includes(currentUser._id)) {
            return (
                <div className="my-course">
                    <div className="left">
                        <div className="course-photo">
                            <img src={defaultCohortPhoto} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="course-title">
                            <h2>{cohort.cohortName}</h2>
                        </div>
                        <div className="course-description">
                            <p>Course Description will go here, needs to be implemented in the backend</p>
                        </div>
                        <div className="course-footers">
                            <div className="course-tags">
                                <p>Tag</p>
                                <p>Tag</p>
                            </div>
                            <button onClick={() => courseOverView(cohort)} className='btn btn-primary'>
                                <img src={arrow} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            );
          }
        }
        return null;
      })
    : null;

    const showMyCoursesProgress = cohorts
    ? cohorts.map(cohort => {
        if (cohort.students) {
          const studentIds = cohort.students.map(student => student.student.id);
          if (studentIds.includes(currentUser._id)) {
            return (
              <div className='course-progress'> 
                <strong>{cohort.cohortName}</strong>
                <ProgressBar striped variant="warning" now={60} style={{marginBottom:"5px"}}/>
              </div>
            );
          }
        }
        return null;
      })
    : null;

   
    const showMyCoursesInstructors = cohorts
    ? cohorts.reduce((instructors, cohort) => {
        if (cohort.students) {
          const studentIds = cohort.students.map(student => student.student.id);
          if (studentIds.includes(currentUser._id)) {
            const instructorID = cohort.instructorID;
            if (!instructors.includes(instructorID)) {
              instructors.push(instructorID);
            }
          }
        }
        return instructors;
      }, []).map(instructorID => (
        <>
        <div className='instructor' key={instructorID}>
          <img src={defaultTeacherPhoto} alt="Instructor" />
          <strong> {instructorID}</strong>
        </div>
        <hr />
        </>
      ))
    : null;
  


  return (
    <div className='student-courses-container'>
       <div className='left-side'>
       <div class="courses-filter">
            <p>All</p>
            <p>Advertising</p>
            <p>Design</p>
            <p>Marketing</p>
            <p>Illustration</p>
            <p>Brand</p>
        </div>
        <div className="courses">
            {showMyCourses}
        </div>
       </div>
       <div className="right-side">
        <h2>Calender</h2>
            <div className="calender">

            </div>
            <h2>Instructors</h2>
            <div className="teachers">
                {showMyCoursesInstructors}
            </div>
            <h2>Learning Process</h2>
            <div className="learning-process">
                {showMyCoursesProgress}
            </div>
       </div>
    </div>
  )
}

export default StudentCourses