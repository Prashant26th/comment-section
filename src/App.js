import React, { useEffect, useState } from "react";
import Comment from "./Comments";
import { v4 as uuidv4 } from "uuid";
import './App.css';

const App = () => {
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem("comments")) || []);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  },[comments])

  const handlePostComment = () => {
    if (newCommentName.trim() !== "" && newCommentText.trim() !== "") {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: uuidv4(),
          name: newCommentName,
          text: newCommentText,
          replies: [],
          postedAt: new Date(),
          reply: 'parent',
        },
      ]);

      setNewCommentName("");
      setNewCommentText("");
    }
  };

  const handleReply = (replyText, parentId, replyName, postedAt) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: uuidv4(),
                name: replyName,
                text: replyText,
                replies: [],
                postedAt: postedAt,
              },
            ],
          };
        }
        return comment;
      });
    });
  };

  const handleEdit = (editedComment) => {
    if (editedComment.reply === 'parent') {
      setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === editedComment.id ? editedComment : comment
      )
    )} else {
      let parentComment;
      const commentNotModified = comments.map((comment) => {
        const listOfRepliesId = comment.replies.map((reply) => reply.id);
        if (listOfRepliesId.includes(editedComment.id)) {
          parentComment = comment;
          return null;
        } else {
          return comment;
        }
      })
      const commentNotModifiedNotNull = commentNotModified.filter((item) => item !== null);
      const filterParentComment = parentComment.replies.filter((comm) => comm.id !== editedComment.id);
      const newparentComment = {...parentComment, replies: [...filterParentComment, editedComment]}
      setComments([...commentNotModifiedNotNull, newparentComment])

    }
  };

  const handleDelete = (commentId, parentId) => {
    setComments((prevComments) => {
      return prevComments
        .map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== commentId
              ),
            };
          } else if (
            comment.replies &&
            comment.replies.some((reply) => reply.id === commentId)
          ) {
            return {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== commentId
              ),
            };
          } else if (comment.id === commentId) {
            return null;
          }
          return comment;
        })
        .filter(Boolean);
    });
  };

  const handleSortByDate = () => {
    setComments((prevComments) =>
      [...prevComments].sort((a, b) => b.postedAt - a.postedAt)
    );
  };

  return (
    <div className="App">
      <div className="comment-section">
        <h2>Comment Section</h2>
        <div className="new-comment">
          <span style={{ fontSize: '12px'}}>Comment</span>
          <input
            type="text"
            placeholder="Name"
            value={newCommentName}
            onChange={(e) => setNewCommentName(e.target.value)}
          />
          <textarea
            placeholder="Comment"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button className="post-button" onClick={handlePostComment}>Post</button>
        </div>
        <button className="sorting-button" onClick={handleSortByDate}>Sort By: Date and Time </button>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
