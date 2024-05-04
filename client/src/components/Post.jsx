import React, { useContext, useEffect, useState, useRef } from 'react';
import { PostContext } from '../context/postContext';
import { CohortContext } from '../context/cohortContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { Modal, Button } from 'react-bootstrap';


function Post() {
    const { post } = useContext(PostContext);
    const { cohort } = useContext(CohortContext);
    const { currentUser } = useContext(AuthContext);
    const [targetedPost, setTargetedPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const commentInputRef = useRef(null); // Create a ref for the textarea element
    const [showModal, setShowModal] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [showReplies, setShowReplies] = useState(false)


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get("http://localhost:4000/get-post", {
                    params: {
                        _id: post
                    }
                });
                setTargetedPost(res.data.post);
                setError(null);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError('Error fetching post');
            }
        };

        fetchPost();
    }, [refresh]);

    useEffect(() => {
        if (isCommenting) {
            commentInputRef.current.focus(); // Focus the textarea when isCommenting becomes true
        }
    }, [isCommenting]);

    const handleCommentSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:4000/add-comment", {
                _id: targetedPost._id,
                comment: commentText,
                profilePicture: currentUser.profilePicture,
                username: currentUser.username
            });
            setTargetedPost(res.data.post)
            setCommentText('');
            setError(null);
            setRefresh(!refresh);
            setIsCommenting(false); // Reset to input mode after submitting comment
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Error adding comment');
        }
    };

    const replyToComment = async(replierName, replierPicture, postID, commentID) => {
        try {
            const res = axios.post("http://localhost:4000/reply", {replierName, replierPicture, _id:postID, commentID, replyContent});
            handleModalClose()
        } catch (error) {
            console.log(error)
        }
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    console.log(replyContent)

    return (
        <div className='selected-post-container'>
            {targetedPost && (
                <div className='selected-post-wrapper'>
                    <div className='owner-of-post'>
                        <img src={targetedPost.ownerPicture} alt="" />
                        <h1>{targetedPost.title}</h1>
                        <p>{targetedPost.content}</p>
                        <hr style={{ width: "90%" }} />
                    </div>
                    {isCommenting ? (
                        <div className='text-area'>
                            <textarea
                                ref={commentInputRef} // Set the ref to the textarea element
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    width: "100%",
                                    marginBottom: "10px"
                                }}
                            />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <button className='btn btn-secondary' onClick={() => setIsCommenting(false)} >Cancel</button>
                                <button className='btn btn-primary' onClick={handleCommentSubmit} >Submit</button>
                            </div>
                        </div>
                    ) : (
                        <div className='text-area'>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                onClick={() => setIsCommenting(true)}
                                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%", marginBottom: "10px", cursor:"text", textAlign:"center"}}
                            />
                        </div>
                    )}
                    <div className='comments-container'>
                        {targetedPost.comments && targetedPost.comments.length > 0 ? (
                            targetedPost.comments.map(comment => (
                                <div className='comment-wrapper' >
                                    <div className='comment' key={comment._id}> {/* Moved key to parent div */}
                                    <div className='comment-owner-info'>
                                        <img src={comment.ownerPicture} alt="" />
                                    <div className='comment-content'>
                                        <span>{comment.ownerName}</span>
                                        <p>{comment.content}</p>
                                        <button onClick={handleModalOpen}>Reply</button>
                                    </div>
                                    </div>
                                </div>
                                    <Modal className="modal-container" show={showModal} onHide={handleModalClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Reply to {comment.ownerName}'s comment</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="modal-content">
                                            <p>{comment.content}</p>
                                            <textarea name="reply" id="reply" cols="30" rows="10" onChange={(e) => setReplyContent(e.target.value)}></textarea>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className="btn btn-primary" onClick={() => replyToComment(currentUser.username, currentUser.profilePicture, targetedPost._id, comment._id)}>Reply</button>
                                            <button onClick={handleModalClose} className='btn btn-secondary'> Cancel</button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div className='replies'>
                                        <p>Replies</p>
                                        { showReplies && comment.replies.length > 0 ? comment.replies.map(reply => {
                                            return(
                                                <div className='reply'>
                                                    <div className='reply-owner-info'>
                                                        <img style={{height:"25px", width:"25px"}} src={reply.ownerPicture} alt="" />
                                                        <span>{reply.ownerName}</span>
                                                    </div>
                                                    <p>{reply.content}</p>
                                                </div>
                                            )
                                        })
                                        :
                                        null
                                    }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
