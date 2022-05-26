import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import EditorPage from "./Pages/EditorPage";
import { Toaster } from "react-hot-toast";
const App = () => {
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:roomId" element={<EditorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
