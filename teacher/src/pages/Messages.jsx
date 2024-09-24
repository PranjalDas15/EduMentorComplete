import React, { useContext, useEffect, useState } from "react";
import MessageArea from "../components/MessageComponents/MessageArea";
import MessageSidebar from "../components/MessageComponents/MessageSidebar";
import { Context } from "../main";
import { assets } from "../assets/assets";

const Messages = () => {
  const { teacher } = useContext(Context);
  const [isHidden, setIsHidden] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
    <div className="flex items-center justify-center rounded-3xl w-full">
        <div className="relative w-[90%] h-[70vh] my-10 mx-5 border flex rounded-3xl overflow-hidden">
          <div
            className={`bg-blue-900 ${
              !isHidden
                ? "absolute md:relative left-0 top-0 h-full w-full md:w-[400px] p-5 overflow-y-auto"
                : "hidden"
            }`}
          >
            <MessageSidebar setIsHidden={setIsHidden} setSelectedConversation={setSelectedConversation} />
          </div>

          <div className={`h-full flex-1 py-10 pr-5 ml-5`}>
            {selectedConversation ? (
              <MessageArea
                setIsHidden={setIsHidden} 
                isHidden={isHidden}
                userId={selectedConversation.participants.find(
                  (p) => p !== teacher._id
                )}
              />
            ) : (
              <div className="text-center">
                Select a conversation to see messages
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
