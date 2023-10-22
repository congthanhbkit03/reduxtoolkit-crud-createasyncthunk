import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

function Create() {
  const [user, setUser] = useState({});

  const inputChangHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(createUser(user));
    navigate("/read");
  };
  return (
    <form className="w-50 mx-auto" onSubmit={handleSubmit}>
      <div className="mb-3 mt-3">
        <label for="email" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter name"
          name="name"
          onChange={inputChangHandler}
        />
      </div>
      <div className="mb-3 mt-3">
        <label for="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          name="email"
          onChange={inputChangHandler}
        />
      </div>
      <div className="mb-3">
        <label for="pwd" className="form-label">
          Age:
        </label>
        <input
          type="text"
          className="form-control"
          id="age"
          placeholder="Enter Age"
          name="age"
          onChange={inputChangHandler}
        />
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          id="radio1"
          name="gender"
          value="male"
          onChange={inputChangHandler}
        />
        <label class="form-check-label" for="radio1">
          Male
        </label>
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          id="radio2"
          name="gender"
          value="female"
          onChange={inputChangHandler}
        />

        <label class="form-check-label" for="radio2">
          Female
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Create;
