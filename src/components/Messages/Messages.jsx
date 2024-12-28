import React, { useEffect, useRef } from "react";
import Message from "./Message/Message"; // Component for rendering a single message
import "./Messages.css"; // Import styles for the Messages component

/**
 * Messages Component
 *
 * This component handles the rendering of a list of chat messages and ensures
 * that the view automatically scrolls to the bottom whenever new messages arrive.
 *
 * @component
 * @param {Object[]} messages - Array of message objects to display.
 * @param {string} name - The name of the current user, used to differentiate message ownership.
 * @returns {JSX.Element} The Messages component, which renders a list of chat messages.
 * @example
 * const messages = [{ text: "Hello", user: "John" }, { text: "Hi", user: "Jane" }];
 * <Messages messages={messages} name="John" />
 */
const Messages = ({ messages, name }) => {
  // Reference to the last message element for scrolling into view
  const messagesEndRef = useRef(null);

  /**
   * Scrolls the view to the bottom of the message list.
   *
   * Ensures that the latest message is always visible.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling effect
  };

  // Automatically scroll to the bottom when the messages array changes
  useEffect(() => {
    scrollToBottom(); // Trigger scroll on message update
  }, [messages]);

  return (
    <div className="messages">
      {/* Map through the messages array and render each message */}
      {messages.map((message, i) => (
        <div key={i}>
          {/* Render individual Message component */}
          <Message message={message} name={name} />
        </div>
      ))}
      {/* Invisible div used as the scrolling target */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
