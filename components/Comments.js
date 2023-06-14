import { useState, useEffect } from 'react';
import axios from "axios";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { apiServer } from '../config';

const Comments = ({ movieId }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const {user} = useUser();

  
  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`${apiServer}/api/comments/movie/${movieId}`);
      setComments(response.data);
    }
    fetchComments();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${apiServer}/api/comments/movie/${movieId}`, {
        movieId,
        username: user.fullName,
        commentText,
        email: user.primaryEmailAddress.emailAddress
      });
      
      const response = await axios.get(`${apiServer}/api/comments/movie/${movieId}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${apiServer}/api/comments/${commentId}`);
      
      const response = await axios.get(`${apiServer}/api/comments/movie/${movieId}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-8 bg-gray-800 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <SignedIn>
        <form className="mt-4" onSubmit={handleSubmit}>
          <textarea 
            className="w-full p-2 border rounded mb-2 bg-white text-gray-700" 
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded">Submit</button>
        </form>
      </SignedIn>
      <SignedOut>
        <p>You must sign in add comments</p>
      </SignedOut>
      {comments.length > 0 ? (
        <div className="space-y-4 mt-4 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white shadow p-4 rounded text-gray-800">
              <p className="text-sm font-bold">{comment.username}</p>
              <p className="text-sm">{comment.content}</p>
              {user && comment.email === user.primaryEmailAddress.emailAddress && (
                <button onClick={() => handleDelete(comment.id)} className="mt-2 text-sm text-red-500">Delete</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="font-bold text-gray-200 mt-4">Be the first to comment</div>
      )}
    </div>
  );
};

export default Comments;
