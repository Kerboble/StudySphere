import React, { useContext, useState, useEffect } from 'react'
import { CohortContext } from '../context/cohortContext'
import defaultPhoto from "../img/shark.png"
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import empty from "../img/empty.png"
import { PostContext } from '../context/postContext';
import { useNavigate } from 'react-router-dom';

function DiscussionBoard() {
    const { cohort, setCohort } = useContext(CohortContext);
    const [showModal, setShowModal] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const {currentUser} = useContext(AuthContext);
    const ownerOfPost = currentUser.username
    const cohortId = cohort._id;
    const ownerOfPostPhoto = currentUser.profilePicture;
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const {setPost } = useContext(PostContext);
    const Navigate = useNavigate()


    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Make a GET request to fetch posts based on cohort ID
                const response = await axios.get('http://localhost:4000/discussion-posts', {
                    params: {
                        cohortId: cohortId
                    }
                });
                // Set the retrieved posts to state
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [refresh]);

    const showPost = (post) =>{
        localStorage.removeItem('storedPostId')
        const postID = post._id
        setPost(postID)
        localStorage.setItem('storedPostId', postID)
        Navigate('../post')
    };

    const displayPosts = posts.length > 0 ? posts.map((post, index) => {
        return (
              <div key={index} className='posts' onClick={() => showPost(post)}>
                    <div className='posts-owner'>
                        <img className='owner-photo' src={post.ownerPicture} alt="" />
                    </div>
                    <div className='post-preview'>
                        <h3>{post.title}</h3>
                        <p>latest reply from user 5 minutes ago</p>
                        {post.content.length > 20 ? <p>{post.content.slice(0, 100) + '...'}</p> : <p>{post.content}</p>}
                    </div>
                    <div className="replies-preview">
                        <div className='user-photos'>
                            user photos will go here
                        </div>
                        <div className="comments-count">
                            {post.comments.length} comments
                        </div>
                    </div>
                </div>
        )
    }) :   
    <>
        <div className='no-posts'>
            <img className='empty-image' src={empty} alt="" />
            <h3 style={{display:"block"}}>No posts have been made</h3>
        </div>
    </>

    const handlePostSubmit = async () => {
        const res = await axios.post('http://localhost:4000/discussion-post', {ownerOfPost, cohortId, ownerOfPostPhoto, postTitle, postContent})
        console.log(res.data)
        setRefresh(refresh + 1)
        setPostTitle('');
        setPostContent('');
        setShowModal(false);
    };

    console.log(posts)

  return (
    <div className='discussion-container'>
    <header>
        <h1>{cohort.cohortName}</h1>
        <p>Discussion Board</p>
        <select name="options" id="options">
            <option value="">Latests first</option>
        </select>
    </header>
    <div className="discussion-wrapper">
        <div className="post-wrapper">
           {displayPosts}
        </div>
        <div className="make-post">
            <button onClick={() => handleModalOpen()} className='btn btn-primary'>Start New Discussion</button>
            <hr />
        </div>
    </div>

        <Modal className="modal-container" show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Start New Discussion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-content">
                    <div className="form-group">
                        <label htmlFor="postTitle">Post Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postTitle"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postContent">Post Content</label>
                        <textarea
                            className="form-control"
                            id="postContent"
                            rows="3"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => handlePostSubmit()}>Submit</button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default DiscussionBoard