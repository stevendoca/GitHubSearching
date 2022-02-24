import React, { useState, useContext } from "react";
import GithubContext from "../context/github/GithubContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const [text, setText] = useState("");
  const onChangeTextHandler = (event) => {
    setText(event.target.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (text === "") {
      githubContext.isAlert("error", "light");
    } else {
      githubContext.isAlert({ message: "nothing", type: "" });
      githubContext.searchUsers(text);
      setText("");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChangeTextHandler}
        />
        <input
          type="submit"
          value="search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
