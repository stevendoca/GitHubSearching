import React, { useContext } from "react";
import GithubContext from "../context/github/GithubContext";

const Alert = () => {
  const githubContext = useContext(GithubContext);
  return (
    githubContext.alert.message === "error" && (
      <div className={`alert alert-${githubContext.alert.type}`}>
        <i className="fa-solid fa-circle-xmark" />
        Please enter something
      </div>
    )
  );
};

export default Alert;
