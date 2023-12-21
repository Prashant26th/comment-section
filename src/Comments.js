import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { convertDays, convertMonth } from "./misc";

const Comment = ({ comment, onReply, onEdit, onDelete, reply }) => {
  const [replyText, setReplyText] = useState("");
  const [replyName, setReplyName] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleReply = () => {
    if (replyText.trim() !== "") {
      onReply(replyText, comment.id, replyName || "User", new Date());
      setReplyText("");
      setReplyName("");
      setShowReplyBox(false);
    }
  };

  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSaveEdit = () => {
    console.log(comment.parentId);
    onEdit({ ...comment, text: editedText });
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(comment.id, comment.parentId);
  };

  const getDateOfComment = (date) => {
    const dateOfMonth = convertDays(new Date(date).getDate()).toLocaleString();
    const month = convertMonth(new Date(date).getMonth()).toLocaleString();
    const year = new Date(date).getFullYear().toLocaleString();
    return `${dateOfMonth} ${month} ${year}`
  }

  return (
    <div>
      <div className="comment">
        <div className="comment-heading">
        <strong>{comment.name}</strong>
        <span>{getDateOfComment(comment.postedAt)}</span>
        </div>
        <div style={{ marginTop: '8px', display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
            {editMode ? (
            <textarea
                className="editTextarea"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            ) : (
            <span>{comment.text}</span>
            )}{" "}
            <div>
                <button className="delete-button" onClick={handleDelete}>
                <FaTrash />
                </button>
            </div>
        </div>
      </div>
      <div className="comment-actions">
        {!editMode && (
          <>
            {!reply && 
                <button className="button" onClick={toggleReplyBox}>
                Reply
              </button>
            }
          </>
        )}
        <button className="button" onClick={handleEdit}>
          {editMode ? "Cancel" : "Edit"}
        </button>
        {editMode && <button className="button" onClick={handleSaveEdit}>Save Edit</button>}
      </div>
      {showReplyBox && (
        <div className="reply-box">
          <span>Reply</span>
          <input
            type="text"
            placeholder="Name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
          />
          <textarea
            placeholder="Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className="post-button" onClick={handleReply}>Post</button>
        </div>
      )}
      {comment.replies && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              reply='true'
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
