import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import LoginPage from "scenes/loginPage";
import AboutPage from "scenes/aboutPage";
import ContactUsPage from "scenes/contacUsPage";
import MessagePage from "scenes/messagesPage/MessagesPage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const isCompany = useSelector((state) => state.user && state.user.isCompany);
  const _id = useSelector((state) => state.user && state.user._id);
  return (
    <>
      {/*Routes used for navigation from one page to other page*/}
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              isAuth ? (
                isCompany ? (
                  <HomePage />
                ) : (
                  <Navigate to={`/user/${_id}`} />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/about"
            element={isAuth ? <AboutPage /> : <Navigate to="/" />}
          />
          <Route
            path="/contactus"
            element={isAuth ? <ContactUsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/user/:id/messages"
            element={isAuth ? <MessagePage /> : <Navigate to="/" />}
          />
          <Route
            path="/user/:id/:connectionId/messages"
            element={isAuth ? <MessagePage /> : <Navigate to="/" />}
          />
          <Route
            path="/user/:id"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
