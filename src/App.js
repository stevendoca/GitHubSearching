import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Users from "./components/Users/Users";
import axios from "axios";
import Search from "./components/Users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/page/About";
import User from "./components/Users/User";
import GithubState from "./components/context/github/GithubState";
import NotFound from "./components/page/NotFound";
const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <NavBar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert />
            <Routes>
              <Route
                path="/"
                element={
                  <Fragment>
                    <Search />
                    <Users />
                  </Fragment>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/user/:login" element={<User />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
