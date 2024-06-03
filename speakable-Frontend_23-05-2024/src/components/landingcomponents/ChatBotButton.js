import React, { useState } from "react";
import ChatBot from "./ChatBot/index"; // Assuming you have a ChatBot component

const ChatBotButton = ({ onLetsChatClick, ChatPopUp }) => {
  const [isChatBotVisible, setChatBotVisibility] = useState(false);

  const toggleChatBot = () => {
    setChatBotVisibility(!isChatBotVisible);
  };

  return (
    <div>
      {/* Chat bot component */}
      {ChatPopUp && <ChatBot />}

      {/* Button to toggle the chat bot */}
      <button className="chatbotbtn" onClick={onLetsChatClick}>
        <i class="bi bi-chat-dots-fill"></i>
      </button>
    </div>
  );
};

export default ChatBotButton;
