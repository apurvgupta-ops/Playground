import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import EditorPage from "./Pages/EditorPage";
import { Toaster } from "react-hot-toast";

import Login from "./Login/Login";
import { useStateValue } from "./Context/StateProvider";
const App = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "red",
              },
            },
          }}
        ></Toaster>
      </div>
      <div className="h-screen bg-gradient-to-b from-indigo-300 via-purple-500 to-blue-800">
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:roomId" element={<EditorPage />} />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
