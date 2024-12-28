import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8080"; // Replace with your backend URL

const useChatLogic = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(null);
  const getRecords = async (href) => {
    try {
      const result = await axios.get(href);
      console.log("@getRecords result", result);
    } catch (error) {}
  };
  // Establish socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });
    console.log("newSocket", newSocket);
    setSocket(newSocket);

    // Handle chatbot responses
    newSocket.on("orteraPoCServerMessage", (response) => {
      console.log("Chatbot response:", response);
      const _links = response?._links;
      console.log("_links", _links);
      const href = _links?._links?.self?.href;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "chatbot",
          text: response.assistantResponse
            ? response?.assistantResponse?.[0]?.text?.value
            : "No response",
        },
      ]);

      setIsTyping(null); // Reset typing indicator
      if (href) getRecords(href);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle sending a user message
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && socket) {
      const userMessage = { userQuestion: input, userId: 1 };
      console.log("Sending userMessage to backend:", userMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: input },
      ]);
      setInput("");
      setIsTyping("Ortera is typing...");

      socket.emit("orteraPoCClientMessage", userMessage);
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isTyping,
  };
};

export default useChatLogic;
