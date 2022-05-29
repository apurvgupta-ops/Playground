import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import Actions from "../Actions";
import logo from "../assets/sangharsh-lohakare-Iy7QyzOs1bo-unsplash.jpg";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
import { initSocket } from "../socket";
const EditorPage = () => {
  const [client, setClient] = useState([]);

  const socketRef = useRef();
  const codeRef = useRef();
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect-error", (err) => handleError(err));
      socketRef.current.on("connect-failed", (err) => handleError(err));

      const handleError = (err) => {
        console.log("socket-error", err);
        toast.error("Socket connection failed");
        navigate("/");
      };

      socketRef.current.emit(Actions.JOIN, {
        roomId,
        userName: location.state?.userName,
      });

      //LISTENING ON JOIN
      socketRef.current.on(
        Actions.JOINED,
        ({ clients, userName, socketId }) => {
          if (userName !== location.state?.userName) {
            toast.success(`${userName} joined to the room`);
            console.log(`${userName}joined`);
          }
          setClient(clients);
          socketRef.current.emit(Actions.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      //LISTENING ON DISCONNECT
      socketRef.current.on(Actions.DISCONNECTED, ({ socketId, userName }) => {
        toast.success(`${userName} left the room`);
        console.log(`${userName} left the room`);

        setClient((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    //CLEANUP
    return () => {
      socketRef.current.off(Actions.JOIN);
      socketRef.current.off(Actions.JOINED);
      socketRef.current.disconnect();
    };
  }, []);

  if (!location.state) {
    return <Navigate to={"/"} />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      console.log(roomId);
      toast.success("RoomId copied");
    } catch (error) {
      toast.error("Not able to copy roomId ");
    }
  };

  const leaveRoom = () => {
    navigate("/");
  };

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
            <button
              onClick={copyRoomId}
              className="bg-gradient-to-b from-indigo-400 via-purple-500 to-blue-800 px-2 py-1 rounded-lg "
            >
              Copy Room Id
            </button>
            <button
              onClick={leaveRoom}
              className="bg-gradient-to-b from-indigo-400 via-purple-500 to-blue-800 px-2 py-1 rounded-lg"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
