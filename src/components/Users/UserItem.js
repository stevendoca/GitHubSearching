import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const UserItem = (props) => {
  const { login, avatar_url, html_url } = props.user;
  return (
    <Fragment>
      <div className="card text-center">
        <img
          src={avatar_url}
          alt=""
          className="round-img"
          style={{ width: "60px" }}
        />
        <p>{login}</p>
        <div>
          <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
            More info
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserItem;
