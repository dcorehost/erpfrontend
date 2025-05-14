import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaEnvelope, FaBullhorn, FaCalendarAlt, FaSearch, 
  FaPlus, FaChevronDown, FaEdit, FaTrash, FaCheck, FaTimes 
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./ClientCommunication.module.css";
import axios from "axios";
import Auth from "../Services/Auth";

const ClientCommunication = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editFormData, setEditFormData] = useState({ subject: "", content: "" });
  const [newMessageForm, setNewMessageForm] = useState({ subject: "", content: "" });
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const navigate = useNavigate();

  // Fetch messages on component mount and tab change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === "messages") {
          await getMessages();
        } else if (activeTab === "announcements") {
          await getAnnouncements();
        } else if (activeTab === "meetings") {
          await getMeetings();
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
        toast.error(`Failed to load ${activeTab}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // Fetch messages from the API
  const getMessages = async () => {
    try {
      const token = Auth.getToken();
      const response = await axios.get("http://209.74.89.83/erpbackend/get-messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  // Fetch announcements from the API
  const getAnnouncements = async () => {
    try {
      const token = Auth.getToken();
      const response = await axios.get("http://209.74.89.83/erpbackend/get-announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(response.data.data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      throw error;
    }
  };

  // Fetch meetings from the API
  const getMeetings = async () => {
    try {
      const token = Auth.getToken();
      const response = await axios.get("http://209.74.89.83/erpbackend/get-meetings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeetings(response.data.data || []);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      throw error;
    }
  };

  // Create a new message
  const createMessage = async (e) => {
    e.preventDefault();
    try {
      const token = Auth.getToken();
      const response = await axios.post(
        "http://209.74.89.83/erpbackend/create-message",
        newMessageForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages([response.data.data, ...messages]);
      setNewMessageForm({ subject: "", content: "" });
      setShowNewMessageForm(false);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error creating message:", error);
      toast.error("Failed to send message");
    }
  };

  // Start editing a message
  const startEditing = (message) => {
    setEditingMessageId(message._id);
    setEditFormData({
      subject: message.subject,
      content: message.content
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditFormData({ subject: "", content: "" });
  };

  // Update message by ID
  const updateMessage = async () => {
    try {
      const token = Auth.getToken();
      const response = await axios.put(
        `http://209.74.89.83/erpbackend/update-message-by-messageId?messageId=${editingMessageId}`,
        { subject: editFormData.subject, content: editFormData.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages(messages.map(msg => 
        msg._id === editingMessageId ? response.data.data : msg
      ));
      setEditingMessageId(null);
      toast.success("Message updated successfully!");
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
    }
  };

  // Delete message by ID
  const deleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const token = Auth.getToken();
      await axios.delete(
        `http://209.74.89.83/erpbackend/delete-message-by-messageId?messageId=${messageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages(messages.filter(msg => msg._id !== messageId));
      toast.success("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  // Mark message as read
  const markAsRead = async (messageId) => {
    try {
      const token = Auth.getToken();
      await axios.patch(
        `http://209.74.89.83/erpbackend/mark-message-read?messageId=${messageId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  // Search functionality for messages
  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Search functionality for announcements
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Search functionality for meetings
  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={styles.communicationContainer}>
      <div className={styles.header}>
        <h1>Communication Center</h1>
        <p>Manage all your communications in one place</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "messages" ? styles.active : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          <FaEnvelope /> Messages
        </button>
        <button
          className={`${styles.tab} ${activeTab === "announcements" ? styles.active : ""}`}
          onClick={() => setActiveTab("announcements")}
        >
          <FaBullhorn /> Announcements
        </button>
        <button
          className={`${styles.tab} ${activeTab === "meetings" ? styles.active : ""}`}
          onClick={() => setActiveTab("meetings")}
        >
          <FaCalendarAlt /> Meetings
        </button>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <p>Loading {activeTab}...</p>
          </div>
        ) : (
          <>
            {activeTab === "messages" && (
              <div className={styles.messagesSection}>
                <div className={styles.actions}>
                  <div className={styles.search}>
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button 
                    className={styles.newButton}
                    onClick={() => setShowNewMessageForm(!showNewMessageForm)}
                  >
                    <FaPlus /> {showNewMessageForm ? "Cancel" : "New Message"}
                  </button>
                </div>

                {showNewMessageForm && (
                  <form onSubmit={createMessage} className={styles.messageForm}>
                    <div className={styles.formGroup}>
                      <label>Subject:</label>
                      <input
                        type="text"
                        value={newMessageForm.subject}
                        onChange={(e) => setNewMessageForm({
                          ...newMessageForm,
                          subject: e.target.value
                        })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Content:</label>
                      <textarea
                        value={newMessageForm.content}
                        onChange={(e) => setNewMessageForm({
                          ...newMessageForm,
                          content: e.target.value
                        })}
                        required
                      />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                      Send Message
                    </button>
                  </form>
                )}

                <div className={styles.messagesList}>
                  {filteredMessages.length === 0 ? (
                    <div className={styles.emptyState}>
                      <p>No messages found</p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message._id}
                        className={`${styles.message} ${!message.read ? styles.unread : ""}`}
                        onClick={() => !message.read && markAsRead(message._id)}
                      >
                        {editingMessageId === message._id ? (
                          <div className={styles.editForm}>
                            <div className={styles.formGroup}>
                              <label>Subject:</label>
                              <input
                                type="text"
                                value={editFormData.subject}
                                onChange={(e) => setEditFormData({
                                  ...editFormData,
                                  subject: e.target.value
                                })}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label>Content:</label>
                              <textarea
                                value={editFormData.content}
                                onChange={(e) => setEditFormData({
                                  ...editFormData,
                                  content: e.target.value
                                })}
                              />
                            </div>
                            <div className={styles.editActions}>
                              <button 
                                onClick={updateMessage}
                                className={styles.saveButton}
                              >
                                <FaCheck /> Save
                              </button>
                              <button 
                                onClick={cancelEditing}
                                className={styles.cancelButton}
                              >
                                <FaTimes /> Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className={styles.messageHeader}>
                              <h3>{message.subject}</h3>
                              <span className={styles.date}>
                                {new Date(message.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className={styles.messageBody}>
                              <p className={styles.sender}>From: {message.sender}</p>
                              <p className={styles.preview}>{message.content}</p>
                            </div>
                            <div className={styles.messageActions}>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditing(message);
                                }}
                                className={styles.editButton}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMessage(message._id);
                                }}
                                className={styles.deleteButton}
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "announcements" && (
              <div className={styles.announcementsSection}>
                <div className={styles.search}>
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className={styles.announcementsList}>
                  {filteredAnnouncements.length === 0 ? (
                    <div className={styles.emptyState}>
                      <p>No announcements found</p>
                    </div>
                  ) : (
                    filteredAnnouncements.map((announcement) => (
                      <div key={announcement._id} className={styles.announcement}>
                        <div className={styles.announcementHeader}>
                          <h3>{announcement.title}</h3>
                          <span className={styles.date}>
                            {new Date(announcement.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={styles.announcementBody}>
                          <p>{announcement.content}</p>
                        </div>
                        {announcement.important && (
                          <div className={styles.importantTag}>Important</div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "meetings" && (
              <div className={styles.meetingsSection}>
                <div className={styles.actions}>
                  <div className={styles.search}>
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search meetings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Link to="/client-meetings/schedule" className={styles.newButton}>
                    <FaPlus /> Schedule Meeting
                  </Link>
                </div>

                <div className={styles.meetingsList}>
                  {filteredMeetings.length === 0 ? (
                    <div className={styles.emptyState}>
                      <p>No meetings scheduled</p>
                    </div>
                  ) : (
                    filteredMeetings.map((meeting) => (
                      <div key={meeting._id} className={styles.meeting}>
                        <div className={styles.meetingHeader}>
                          <h3>{meeting.title}</h3>
                          <div className={styles.meetingTime}>
                            <span>
                              {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                            </span>
                            <span>({meeting.duration})</span>
                          </div>
                        </div>
                        <div className={styles.meetingBody}>
                          <div className={styles.participants}>
                            <p>Participants:</p>
                            <ul>
                              {meeting.participants.map((participant, index) => (
                                <li key={index}>{participant}</li>
                              ))}
                            </ul>
                          </div>
                          <div className={styles.meetingActions}>
                            <button className={styles.acceptButton}>Accept</button>
                            <button className={styles.declineButton}>Decline</button>
                            <button 
                              className={styles.detailsButton}
                              onClick={() => navigate(`/client-meetings/${meeting._id}`)}
                            >
                              Details <FaChevronDown />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClientCommunication;