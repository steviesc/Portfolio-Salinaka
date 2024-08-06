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
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const element = useRoutes(routes);
  const [showUser, setShowUser] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider
      value={{ showUser, setShowUser, userName, setUserName }}
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
