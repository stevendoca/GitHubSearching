import React, { useContext, useReducer } from "react";
import axios from "axios";
import GithubContext from "./GithubContext";
import githubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: {
      message: "nothing",
      type: "",
    },
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Get Users
  const searchUsers = (text) => {
    setLoading();
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({
        type: SEARCH_USERS,
        payload: res.data.items,
      });
    };
    fetchData().catch(console.error);
  };

  //Get User
  const getUser = async (name) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${name}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({ type: GET_USER, payload: res.data });
  };
  // Get Repos
  const getUserRepos = async (name) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${name}/repos?per_page=5&sort=created:client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({ type: GET_REPOS, payload: res.data });
  };
  //Clear Users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };
  //Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  //Set Alert
  const isAlert = (message, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { messageContent: message, typeContent: type },
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        alert: state.alert,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        isAlert,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
