import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/sangharsh-lohakare-Iy7QyzOs1bo-unsplash.jpg";
const Home = () => {
  return (
    <div className="h-screen w-auto bg-gradient-to-b from-indigo-300 via-purple-500 to-blue-800 flex justify-center items-center">
      <div className="h-96 w-96">
        <div className=" flex justify-start items-center text-white">
          <img src={logo} alt="logo" className="h-10 w-10 m-2 rounded-full" />
          <span className=" h-12 border-r-4 border-pink-900 rounded-full"></span>
          <h2 className="flex flex-col pl-2">
            Code-Sync <span className="text-[10px]">RealTime Editor</span>
          </h2>
        </div>
        <div>
          <div className="text-white p-2 h-90">
            <p>Paste Invitation RoomId</p>
            <input
              type="text"
              placeholder="RoomId"
              className="mb-2 rounded-lg p-2 w-full text-black outline-none hover:border-b-4 border-pink-500"
            />
            <input
              type="text"
              placeholder="UserName"
              className="mb-2 rounded-lg p-2 w-full text-black outline-none hover:border-b-4 border-pink-500"
            />
            <div className="flex justify-end">
              <button className="text-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-1 rounded-lg hover:animate-pulse">
                Join
              </button>
            </div>
          </div>
        </div>
        <footer className="flex justify-center mt-28  ">
          If You dont have invite then create{" "}
          <Link to="/new-room" className="text-green-500 px-2 ">
            New Room
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Home;
