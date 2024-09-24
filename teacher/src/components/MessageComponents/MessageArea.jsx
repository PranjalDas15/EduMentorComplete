import React, { useEffect, useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { Context } from "../../main";
import axios from "axios";

const MessageArea = ({ userId, setIsHidden, isHidden }) => {
  const { users, teacher } = useContext(Context);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const senderId = teacher._id;
      const response = await axios.post(
        `http://localhost:5000/api/v1/message/teacherSend/${userId}`,
        { senderId, message },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(error.response?.data?.message || "Failed to send message!");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const teacherId = teacher._id;
        const response = await axios.get(
          `http://localhost:5000/api/v1/message/teacher/${teacherId}/${userId}`,
          { withCredentials: true }
        );
        setConversation(response.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
        toast.error("Error fetching messages");
      }
    };

    fetchMessages();
  }, [handleSendMessage]);

  const latestSentMessage = conversation
    .filter((msg) => msg.senderId === teacher._id)
    .slice(-1)[0];
  const latestReceivedMessage = conversation
    .filter((msg) => msg.senderId !== teacher._id)
    .slice(-1)[0];

    const sortedConversation = conversation.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

  return (
    <>
      <div className="w-full h-full py-10 bg-slate-200 border-2 border-blue rounded-xl">
        <div className="flex items-center gap-2 mt-3 px-5">
          <img
            onClick={() => setIsHidden(false)}
            src={assets.chev_left}
            alt=""
            className={isHidden ? "" : "hidden"}
          />
          <p className="text-xl font-semibold">Student</p>
        </div>
        <div className="flex flex-col h-full gap-2 p-5 rounded-xl">
          {/* Coversation Area */}
          <div className="border h-[100%] w-full p-5 bg-white rounded-xl text-white flex flex-col gap-3 overflow-y-auto ">
            {/* Map over the sorted conversation */}
            {sortedConversation.map((msg) => (
              <div
                key={msg._id}
                className={`flex gap-2 ${
                  msg.senderId === teacher._id ? "justify-end" : ""
                }`}
              >
                <div className="flex flex-col">
                  <p
                    className={`p-4 ${
                      msg.senderId === teacher._id
                        ? "bg-blue-900 text-right"
                        : "bg-blue-900"
                    } max-w-[350px] rounded-xl`}
                  >
                    {msg.message}
                  </p>
                  <p className={`text-black text-[10px] ${
                      msg.senderId === teacher._id
                        ? "text-right"
                        : "text-left"
                    } max-w-[350px] rounded-xl`}>
                    {new Date(msg.createdAt).toLocaleTimeString().slice(0,5)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Sending Message*/}
          <form
            onSubmit={handleSendMessage}
            className="w-full py-3 flex justify-center gap-2 mt-5"
          >
            <input
              type="text"
              className="rounded-xl w-[90%] h-14 mt-2 text-black"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={isSending || !message.trim()}
              className="bg-blue-900 hover:bg-yellow-400 text-white h-14 w-20 rounded-xl mt-2 overflow-hidden flex items-center justify-center transition-all duration-200 ease-in-out"
            >
              {isSending ? (
                "..."
              ) : (
                <img src={assets.send_w} alt="" className="w-10 object-cover" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageArea;
