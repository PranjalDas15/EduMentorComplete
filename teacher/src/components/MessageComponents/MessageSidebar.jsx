import React, { useEffect, useState, useContext } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { Context } from "../../main";

const MessageSidebar = ({ setSelectedConversation, setIsHidden }) => {
  const { users, teacher } = useContext(Context);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const fetchConversations = async () => {
      if (!teacher._id) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/message/teacherConversations/${teacher._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch conversations:",
          error.response?.data || error.message
        );
      }
    };

    fetchConversations();
  }, [teacher._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      for (const convo of conversations) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/v1/message/teacher/${teacher._id}/${convo.participants.find(p => p !== teacher._id)}`,
            { withCredentials: true }
          );
          setMessages(prev => ({
            ...prev,
            [convo._id]: response.data,
          }));
        } catch (error) {
          console.error("Failed to fetch messages for conversation:", error);
        }
      }
    };

    if (conversations.length > 0) {
      fetchMessages();
    }
  }, [conversations, teacher._id]);

  const getParticipantName = (participantId) => {
    if (participantId === teacher._id) {
      return `${users.firstName} ${users.lastName}`;
    }

    const user = users.find((u) => u._id === participantId);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown";
  };

  const handleClickOnSmallScreen = (convo)=> {
    setSelectedConversation(convo)
    setIsHidden(true)
  }

  return (
    <div className="w-[100%] sm:w-full">
      <h1 className="text-white font-semibold text-center my-5">
        Your Conversations
      </h1>
      <div className="flex flex-col w-full gap-2 py-10">
      {conversations.map((convo) => {
        const latestMessage = messages[convo._id]?.slice(-1)[0];

        return (
          <div
            key={convo._id}
            className="bg-white hover:bg-yellow-400 w-full rounded-xl h-16 p-2 flex flex-col gap-2 justify-center transition-all duration-200 ease-in-out cursor-pointer"
            onClick={() => handleClickOnSmallScreen(convo)} 
          >
            <p className="text-lg font-semibold text-blue-900">
              {getParticipantName(
                convo.participants.find((participant) => participant !== teacher._id)
              )}
            </p>
            <p className="text-[12px] text-gray-500">
              {latestMessage ? latestMessage.message.slice(0,50) + "..." : "No messages"}
            </p>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default MessageSidebar;
