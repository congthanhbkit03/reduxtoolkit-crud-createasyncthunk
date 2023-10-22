import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userSlice";

function Update() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.user);

  const [updateData, setUpdateData] = useState(); // khi updateData nay cap nhat
  // se render lai - lay du lieu filter va cap nhat state
  useEffect(() => {
    if (id) {
      const user = users.find((us) => us.id == id);
      setUpdateData(user); // y nghia la tim user theo id va load lai de hien thi du lieu cu len form
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(updateUser(updateData));

    navigate("/read");
  };

  const inputChangHandler = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  return (
    <div>
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
            value={updateData && updateData.name}
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
            value={updateData && updateData.email}
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
            value={updateData && updateData.age}
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
            checked={updateData && updateData.gender == "male"}
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
            checked={updateData && updateData.gender == "female"}
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
    </div>
  );
}

export default Update;
