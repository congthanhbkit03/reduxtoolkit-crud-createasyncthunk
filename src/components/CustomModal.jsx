import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";

function CustomModal({ id, setPopup }) {
  const { users } = useSelector((state) => state.user);
  const user = users.find((u) => u.id == id);
  console.log(user);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setPopup(false)} className="btn btn-warning">
          Close
        </button>
        <h2>{user.name}</h2>
        <div>{user.email}</div>
        <div>{user.age}</div>
        <div>{user.gender}</div>
      </div>
    </div>
  );
}

export default CustomModal;
