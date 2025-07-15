import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";

const Sidebar = ({ chats, setCurrentChat, setMessages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChat(null);
  };

  return (
    <>
      <div className="p-4 fixed top-0 right-0 mr-8 cursor-pointer lg:hidden z-50">
        <HiMenuAlt4
          onClick={toggleSidebar}
          className="text-white text-3xl fixed"
        />
      </div>

      <div
        className={`
          fixed top-0 left-0 h-screen bg-primary border-r border-gray-500
          w-72 z-40 flex flex-col justify-between transition-transform duration-300 p-5
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col">
          <div className="flex gap-2 items-center justify-center text-white mt-3 text-xl">
            <img className="h-8" src="/ChatGPT-logo.png" alt="" />
            <p>ChatGPT</p>
          </div>

          <button
            className="special text-white rounded-[3px] w-full py-2 my-5"
            onClick={handleNewChat}
          >
            + New Chat
          </button>
          <p className="text-gray-400 mt-12 mb-2">Chats</p>
          {chats.length === 0 && (
            <p className="text-gray-600 px-2 italic">No chats yet</p>
          )}
          {chats.map(({ id, title }) => (
            <button
              key={id}
              className="text-white rounded-[5px] w-full flex items-center justify-start mb-2 px-4 py-2 hover:bg-dark2"
              onClick={() => setCurrentChat(id)}
              title={title}
            >
              {title.length > 30 ? title.slice(0, 27) + "..." : title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
