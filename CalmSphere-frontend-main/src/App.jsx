import { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MainLayout from "./Components/Layouts/MainLayout";
import SignUp from "./Pages/SignUp";
import Users from "./Pages/Admin/Users";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import WorkingOnIt from "./StatusCodes/WorkingOnIt";
import PageNotFound from "./StatusCodes/PageNotFound";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Doctors from "./Pages/Doctors";
import Appointment from "./Components/Appointment";
import DoctorProfile from "./Pages/DoctorProfile";
import Chatbot from "./Components/Chatbot";
import Chat from "./Components/Chat";
import Meditation from "./Components/Meditation";
import Card1 from './Components/Article/Card1';
import Card2 from './Components/Article/Card2';
import Card3 from './Components/Article/Card3';
import Card4 from './Components/Article/Card4';
import Card5 from './Components/Article/Card5';
import Card6 from './Components/Article/Card6';
import Card7 from './Components/Article/Card7';
import Card8 from './Components/Article/Card8';
import Card9 from './Components/Article/Card9';
import Card10 from './Components/Article/Card10';
import Card11 from './Components/Article/Card11';
import Card12 from './Components/Article/Card12';
import Card13 from './Components/Article/Card13';
import Card14 from './Components/Article/Card14';
import Card15 from './Components/Article/Card15';
import Card16 from './Components/Article/Card16';
import Card17 from './Components/Article/Card17';
import Card18 from './Components/Article/Card18';
import Article from "./Components/article";
import Quotes from './Components/Quotes';



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Fragment>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/chatbot" element={<Chat />} />
              <Route path="/meditation" element={<Meditation />} />
              <Route path="/article" element={<Article />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/theory1" element={<Card1 />} />
              <Route path="/theory2" element={<Card2 />} />
              <Route path="/theory3" element={<Card3 />} />
              <Route path="/theory4" element={<Card4 />} />
              <Route path="/theory5" element={<Card5 />} />
              <Route path="/theory6" element={<Card6 />} />
              <Route path="/theory7" element={<Card7 />} />
              <Route path="/theory8" element={<Card8 />} />
              <Route path="/theory9" element={<Card9 />} />
              <Route path="/theory10" element={<Card10 />} />
              <Route path="/theory11" element={<Card11 />} />
              <Route path="/theory12" element={<Card12 />} />
              <Route path="/theory13" element={<Card13 />} />
              <Route path="/theory14" element={<Card14 />} />
              <Route path="/theory15" element={<Card15 />} />
              <Route path="/theory16" element={<Card16 />} />
              <Route path="/theory17" element={<Card17 />} />
              <Route path="/theory18" element={<Card18 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/doctor/:id" element={<DoctorProfile />} />

              <Route element={<PrivateRoute />}>
                <Route path="/appointment/:id" element={<Appointment />} />
                <Route element={<AdminRoute />}>
                  <Route path="/users" element={<Users />} />
                </Route>
                
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/edit-profile/:id" element={<EditProfile />} />
              </Route>

              <Route path="/working" element={<WorkingOnIt />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Fragment>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
