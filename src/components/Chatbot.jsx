import React, { useState } from "react";
import Header from "./Header";
import Searchbox from "./Searchbox";
import MessageDisplay from "./MessageDisplay";

export default function Chatbot() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '64px', paddingBottom: '96px' }}>
        <MessageDisplay messages={messages} />
      </div>
      <Searchbox
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}