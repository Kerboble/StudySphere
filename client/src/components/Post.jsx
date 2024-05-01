import React, { useContext, useEffect, useState, useRef } from 'react';
import { PostContext } from '../context/postContext';
import { CohortContext } from '../context/cohortContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

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

    console.log(targetedPost)

    return (
        <div className='selected-post-container'>
            {targetedPost && (
                <div className='selected-post-wrapper'>
                    <div className='owner-of-post'>
                        <img style={{ height: "200px", width: "200px" }} src={targetedPost.ownerPicture} alt="" />
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
                                <div className='comment' key={comment._id}> {/* Moved key to parent div */}
                                    <img src={comment.ownerPicture} alt="" />
                                    <p>{comment.ownerName}</p>
                                    <p>{comment.content}</p>
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
