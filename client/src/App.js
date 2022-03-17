import "normalize.css";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";
import mainContext from "./context/mainContext";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import BookingsPage from "./pages/BookingsPage";
import UploadPostPage from "./pages/UploadPostPage";
import SinglePostPage from "./pages/SinglePostPage";

function App() {

    const [admin, setAdmin] = useState(false)

  return (
    <>
     <mainContext.Provider value={{admin, setAdmin}}>
         <BrowserRouter>
             <Routes>
                 <Route path="/" element={<LandingPage/>}/>
                 <Route path="/register" element={<RegisterPage/>}/>
                 <Route path="/login" element={<LoginPage/>}/>
                 <Route path="/main" element={<MainPage/>}/>
                 <Route path="/bookings" element={<BookingsPage/>}/>
                 <Route path="/uploadPost" element={<UploadPostPage/>}/>
                 <Route path="/:_id" element={<SinglePostPage/>}/>
             </Routes>
         </BrowserRouter>
     </mainContext.Provider>
    </>
  );
}

export default App;
