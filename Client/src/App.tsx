import { Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Registration";
import ProfileCreationForm from "./components/Profile";
import UI from "./components/UI";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<ProfileCreationForm />} />
        <Route path="/UI" element={<UI />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
