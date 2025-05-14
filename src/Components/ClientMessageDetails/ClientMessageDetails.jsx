import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaArchive,
  FaReply,
  FaCheck,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Auth from "../Services/Auth";
import styles from "./ClientMessageDetails.module.css";

const ClientMessageDetails = () => {
  const location = useLocation(); // ✅ directly get location here
  const navigate = useNavigate();

  console.log("Location object:", location.search); // Debug log
  const searchParams = new URLSearchParams(location.search);
  console.log("All URL parameters:", Array.from(searchParams.entries()));

  const messageId = searchParams.get("messageId");

  console.log("Final extracted messageId:", messageId);

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replies, setReplies] = useState([]);

  console.log("messageId from query:", messageId); // ✅ DEBUG LOG

  // Fetch message details and replies
  useEffect(() => {
    const fetchMessageDetails = async () => {
      if (!messageId) return; // Early return if no messageId

      try {
        setLoading(true);
        const token = Auth.getToken();

        const params = new URLSearchParams();
        params.append("messageId", messageId);
        // Fetch message details
        const response = await axios.get(
          `http://209.74.89.83/erpbackend/get-message-by-messageId`,
          {
            params, // Pass as params object instead of in URL
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMessage(response.data.data);

        // Fetch replies for this message
        const repliesResponse = await axios.get(
          `http://209.74.89.83/erpbackend/get-message-replies`,
          {
            params: { messageId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setReplies(repliesResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching message details:", error);
        toast.error("Failed to load message details");
      } finally {
        setLoading(false);
      }
    };

    fetchMessageDetails();
  }, [messageId]);

  // Handle sending a reply
  const handleSendReply = async () => {
    if (!replyContent.trim()) {
      toast.warning("Reply content cannot be empty");
      return;
    }

    try {
      const token = Auth.getToken();
      const response = await axios.post(
        "http://209.74.89.83/erpbackend/send-message-reply",
        {
          messageId,
          content: replyContent,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add the new reply to the replies list
      setReplies([response.data.data, ...replies]);
      setReplyContent("");
      setIsReplying(false);
      toast.success("Reply sent successfully!");
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    }
  };

  // Handle resolving the message (marking as completed)
  const handleResolveMessage = async () => {
    if (
      !window.confirm("Are you sure you want to mark this message as resolved?")
    )
      return;

    try {
      const token = Auth.getToken();
      await axios.patch(
        `http://209.74.89.83/erpbackend/mark-message-resolved?messageId=${messageId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the message status locally
      setMessage((prev) => ({ ...prev, status: "resolved" }));
      toast.success("Message marked as resolved!");
    } catch (error) {
      console.error("Error resolving message:", error);
      toast.error("Failed to mark message as resolved");
    }
  };

  const handleArchiveMessage = async () => {
    if (!window.confirm("Are you sure you want to archive this message?"))
      return;

    try {
      const token = Auth.getToken();
      await axios.patch(
        `http://209.74.89.83/erpbackend/archive-message?messageId=${messageId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Message archived successfully!");
      navigate("/superadmin/communications");
    } catch (error) {
      console.error("Error archiving message:", error);
      toast.error("Failed to archive message");
    }
  };

  // Handle deleting the message
  const handleDeleteMessage = async () => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      const token = Auth.getToken();
      await axios.delete(
        `http://209.74.89.83/erpbackend/delete-message-by-messageId?messageId=${messageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Message deleted successfully!");
      navigate("/superadmin/communications");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading message details...</p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className={styles.errorContainer}>
        <p>Message not found</p>
        <button
          onClick={() => navigate("/superadmin/communications")}
          className={styles.backButton}
        >
          <FaArrowLeft /> Back to Communications
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={() => navigate("/superadmin/communications")}
          className={styles.backButton}
        >
          <FaArrowLeft /> Back to Communications
        </button>
        <h2>Message Details</h2>
        <div className={styles.messageActions}>
          <button
            onClick={handleArchiveMessage}
            className={styles.archiveButton}
            title="Archive message"
          >
            <FaArchive /> Archive
          </button>
          {message.status !== "resolved" && (
            <button
              onClick={handleResolveMessage}
              className={styles.resolveButton}
              title="Mark as resolved"
            >
              <FaCheck /> Resolve
            </button>
          )}
          <button
            onClick={handleDeleteMessage}
            className={styles.deleteButton}
            title="Delete message"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      <div className={styles.messageContainer}>
        <div className={styles.messageHeader}>
          <h3>{message.subject}</h3>
          <div className={styles.messageMeta}>
            <span className={styles.sender}>
              From: {message.senderName || message.senderEmail}
            </span>
            <span className={styles.date}>
              {new Date(message.createdAt).toLocaleString()}
            </span>
            <span
              className={`${styles.status} ${
                message.archived ? styles.archived : styles[message.status]
              }`}
            >
              {message.archived ? "Archived" : message.status}
            </span>
          </div>
        </div>

        <div className={styles.messageContent}>
          <p>{message.content}</p>
        </div>

        <div className={styles.replySection}>
          {!isReplying ? (
            <button
              onClick={() => setIsReplying(true)}
              className={styles.replyButton}
            >
              <FaReply /> Reply
            </button>
          ) : (
            <div className={styles.replyForm}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply here..."
                rows={4}
              />
              <div className={styles.replyActions}>
                <button onClick={handleSendReply} className={styles.sendButton}>
                  Send Reply
                </button>
                <button
                  onClick={() => setIsReplying(false)}
                  className={styles.cancelButton}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {replies.length > 0 && (
          <div className={styles.repliesSection}>
            <h4>Replies ({replies.length})</h4>
            <div className={styles.repliesList}>
              {replies.map((reply) => (
                <div
                  key={reply._id}
                  className={`${styles.reply} ${
                    reply.senderRole === "superadmin"
                      ? styles.adminReply
                      : styles.clientReply
                  }`}
                >
                  <div className={styles.replyHeader}>
                    <span className={styles.replySender}>
                      {reply.senderRole === "superadmin"
                        ? "You"
                        : reply.senderName || "Client"}
                    </span>
                    <span className={styles.replyDate}>
                      {new Date(reply.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className={styles.replyContent}>
                    <p>{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientMessageDetails;
