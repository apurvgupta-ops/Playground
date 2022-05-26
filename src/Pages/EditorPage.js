import React, { useState } from "react";
import logo from "../assets/sangharsh-lohakare-Iy7QyzOs1bo-unsplash.jpg";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
const EditorPage = () => {
  const [client, setClient] = useState([
    { socketId: 1, userName: "Apurv" },
    { socketId: 1, userName: "Gorav" },
  ]);

  return (
    <div className="flex">
      <div className="border-r-4 border-pink-900 w-64 h-screen bg-gradient-to-b from-indigo-600 via-purple-700 to-blue-1000">
        <div className=" flex justify-start items-center text-white">
          <img src={logo} alt="logo" className="h-10 w-10 m-2 rounded-full" />
          <h2 className="flex flex-col pl-2 border-l-4 border-pink-900">
            Code-Sync <span className="text-[10px]">RealTime Editor</span>
          </h2>
        </div>
        <div className="flex flex-col justify-between h-[90%]">
          <div>
            <h1 className="text-xl px-2">Connected</h1>
            {client.map((data) => (
              <>
                <Client key={data.socketId} name={data.userName} />
              </>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <button className="bg-gradient-to-b from-indigo-400 via-purple-500 to-blue-800 px-2 py-1 rounded-lg ">
              Copy Room Id
            </button>
            <button className="bg-gradient-to-b from-indigo-400 via-purple-500 to-blue-800 px-2 py-1 rounded-lg">
              Leave
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
