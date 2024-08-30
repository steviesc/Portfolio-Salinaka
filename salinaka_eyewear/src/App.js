import Footer from "./components/Footer";
import Navigation /* , { UserContext } */ from "./components/Navigation";
import "./components/Home/Content_Style.css";
import {
  Routes,
  Route,
  Link,
  Navigate,
  NavLink,
  useRoutes,
  BrowserRouter as Router,
} from "react-router-dom";
import routes from "./Routes/routes";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function App() {
  const element = useRoutes(routes);
  const [showUser, setShowUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [checkTotal, setCheckTotal] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { name } = JSON.parse(storedUser);
      setShowUser(true);
      setUserName(name);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        showUser,
        setShowUser,
        userName,
        setUserName,
        checkTotal,
        setCheckTotal,
      }}
    >
      <div className="App">
        <Navigation />
        <main className="content">{element}</main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
