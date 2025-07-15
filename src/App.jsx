import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

const STORAGE_KEY = "chatConversations";

const App = () => {
  // conversations: array of { id, title, messages }
  const [conversations, setConversations] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  });

  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  // Load messages when currentChatId changes
  useEffect(() => {
    if (!currentChatId) {
      setMessages([]);
      return;
    }
    const conv = conversations.find((c) => c.id === currentChatId);
    setMessages(conv ? conv.messages : []);
  }, [currentChatId, conversations]);

  // Save or update a conversation
  const saveChat = (title, newMessages) => {
    setConversations((prev) => {
      // Update existing conversation
      const index = prev.findIndex((c) => c.id === currentChatId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], title, messages: newMessages };
        return updated;
      }
      // Or create a new conversation with unique id
      const newConv = {
        id: Date.now().toString(),
        title,
        messages: newMessages,
      };
      setCurrentChatId(newConv.id);
      return [...prev, newConv];
    });
  };

  return (
    <div className="min-h-screen bg-primary flex">
      <Sidebar
        chats={conversations}
        setCurrentChat={setCurrentChatId}
        setMessages={setMessages}
      />
      <Chat
        messages={messages}
        setMessages={setMessages}
        currentChat={currentChatId}
        saveChat={saveChat}
      />
    </div>
  );
};

export default App;
