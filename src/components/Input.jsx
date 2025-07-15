import { useRef, useState, useEffect } from "react";
import { BiSolidSend } from "react-icons/bi";
import { main } from "./Chatbot";

const Input = ({ messages, setMessages, currentChatId, saveChat }) => {
  const inputRef = useRef();
  const [text, setText] = useState("");

  // Adjust textarea height to fit content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // reset height to shrink if needed
      inputRef.current.style.height = inputRef.current.scrollHeight + "px"; // expand to scrollHeight
    }
  }, [text]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const userMsg = {
      id: messages.length,
      sender: "user",
      text: trimmedText,
    };

    const loadingMsg = {
      id: messages.length + 1,
      sender: "bot",
      loading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setText("");

    try {
      const botResponse = await main(trimmedText);

      const updatedMessages = [
        ...messages,
        userMsg,
        {
          id: messages.length + 1,
          sender: "bot",
          text: botResponse,
        },
      ];

      // NEW chatTitle logic here:
      const chatTitle =
        messages.length === 0
          ? trimmedText.slice(0, 30)
          : messages.find((m) => m.sender === "user")?.text.slice(0, 30) ||
            "New Chat";

      saveChat(chatTitle, updatedMessages);
      setMessages(updatedMessages);
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? { ...msg, text: "Something went wrong.", loading: false }
            : msg
        )
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      sendMessage(e); // submit form
    }
  };

  return (
    <>
      <form
        onSubmit={sendMessage}
        className="flex items-center w-full lg:w-4/6 mx-auto p-4 bg-primary fixed bottom-0 left-0 lg:static lg:rounded-b-md lg:mx-0"
      >
        <textarea
          rows={1}
          placeholder="Send a message"
          className="flex-grow p-3 rounded-md bg-dark2 text-white placeholder-gray-400 focus:outline-none resize-none overflow-hidden"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="special p-3 rounded-md ml-2 text-white">
          <BiSolidSend size={24} />
        </button>
      </form>
      <p className="text-white text-xs text-center mt-1 mb-2 hidden lg:block">
        ChatGPT may produce inaccurate information.
      </p>
    </>
  );
};

export default Input;
