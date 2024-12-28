import React from "react";
import useChatLogic from "./ChatApp"; // Import the extracted chat logic hook
import "./Chat.css"; // Import styles for the Chat component
import TextContainer from "../TextContainer/TextContainer"; // Component to display connected users
import Messages from "../Messages/Messages"; // Component to display chat messages
import InfoBar from "../InfoBar/InfoBar"; // Component for room information
import Input from "../Input/Input"; // Component for user message input

/**
 * Chat Component
 *
 * This component represents the main chat interface. It includes the chat room
 * information, message display, user input for messages, typing indicator,
 * and a container to show the list of connected users.
 *
 * @component
 * @returns {JSX.Element} The Chat component, which renders the chat interface.
 * @example
 * <Chat />
 */
const Chat = () => {
  // Destructure values from the custom hook that handles chat logic
  const { messages, input, setInput, sendMessage, isTyping } = useChatLogic();

  // Render the chat interface
  return (
    <div className="outerContainer">
      {/* Main chat container */}
      <div className="container">
        {/* Display the chat room information */}
        <InfoBar room="Chat Room With Adi" />

        {/* Display chat messages */}
        <Messages messages={messages} name="User" />

        {/* Show a typing indicator if someone is typing */}
        {isTyping && <div className="typingIndicator">{isTyping}</div>}

        {/* Input field for users to type and send messages */}
        <Input
          message={input}
          setMessage={setInput}
          sendMessage={sendMessage}
        />
      </div>

      {/* Display connected users in a separate container */}
      <TextContainer users={["User1", "User2"]} />
    </div>
  );
};

export default Chat;
