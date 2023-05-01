import { ReactElement } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Navbar } from "./components";
import { Home, Login, Register, Settings, Single, Write } from "./pages";
import { useAppSelector } from "./redux";
import { selectAuth } from "./redux/features";

const App = (): ReactElement => {
  const { user } = useAppSelector(selectAuth);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
      </Routes>
    </Router>
  );
};

export default App;
