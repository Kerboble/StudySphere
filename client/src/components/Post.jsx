import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../context/postContext';
import { CohortContext } from '../context/cohortContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Post() {
    const { post } = useContext(PostContext);
    const { cohort } = useContext(CohortContext);
    const {currentUser} = useContext(AuthContext);
    const [targetedPost, setTargetedPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [error, setError] = useState(null);
    const Navigate = useNavigate()
    const [refresh, setRefresh] = useState(false);
    

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
            setRefresh(!refresh)
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Error adding comment');
        }
    };

    console.log(post)

    return (
        <div className='selected-post-container'>
            {targetedPost && (
                <div className='selected-post-wrapper'>
                    <div>{targetedPost.title}</div>
                    <div>{targetedPost.content}</div>
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={handleCommentSubmit}>Add Comment</button>
                    <div className='comments-container'>
                      {targetedPost.comments && targetedPost.comments.length > 0 ? (
                          targetedPost.comments.map(comment => (
                                <div className='comment'>  
                                  <img src={comment.ownerPicture} alt="" />
                                  <p>{comment.ownerName}</p>
                                  <p key={comment._id}>{comment.content}</p>
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
