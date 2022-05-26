import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import logo from "../assets/sangharsh-lohakare-Iy7QyzOs1bo-unsplash.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const createNewRoomId = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("Create A New Room Id");
    setUserName("Apurv Gupta");
  };

  const joinRoom = () => {
    if (!roomId && !userName) {
      toast.error("Please enter RoomId and UserName");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };

  const handleKeyButton = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="h-screen w-auto flex justify-center items-center">
      <div className="h-96 w-96">
        <div className=" flex justify-start items-center text-white">
          <img src={logo} alt="logo" className="h-10 w-10 m-2 rounded-full" />
          <h2 className="flex flex-col pl-2 border-l-4 border-pink-900 ">
            Code-Sync <span className="text-[10px]">RealTime Editor</span>
          </h2>
        </div>
        <div>
          <div className="text-white p-2 h-90">
            <p>Paste Invitation RoomId</p>
            <input
              type="text"
              placeholder="RoomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyUp={handleKeyButton}
              className="mb-2 rounded-lg p-2 w-full text-black outline-none hover:border-b-4 border-pink-500"
            />
            <input
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyUp={handleKeyButton}
              className="mb-2 rounded-lg p-2 w-full text-black outline-none hover:border-b-4 border-pink-500"
            />
            <div className="flex justify-end">
              <button
                onClick={joinRoom}
                className="text-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-1 rounded-lg hover:animate-pulse"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <footer className="flex justify-center mt-28  ">
          If You dont have invite then create{" "}
          <a onClick={createNewRoomId} href="" className="text-green-500 px-2 ">
            New Room
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
