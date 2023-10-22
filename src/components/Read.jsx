import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, readAllUsers } from "../features/userSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

function Read() {
  const { users, loading, error, searchData } = useSelector(
    (state) => state.user
  ); // lay user slice

  const dispatch = useDispatch();

  const [id, setId] = useState();
  const [genderRadio, setGenderRadio] = useState();
  const [isPopup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(readAllUsers());
  }, []);

  const viewUser = (id) => {
    setId(id);
    setPopup(true);
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log(searchData);
  return (
    <div>
      {isPopup && <CustomModal id={id} setPopup={setPopup} />}
      <h2>All Users - {users.length}</h2>
      <input
        type="radio"
        className="form-check-input"
        name="gender"
        value=""
        id="all"
        onChange={(e) => setGenderRadio(e.target.value)}
      />
      <label className="form-check-label" for="all">
        All
      </label>{" "}
      &nbsp;
      <input
        type="radio"
        className="form-check-input"
        name="gender"
        value="male"
        id="male"
        onChange={(e) => setGenderRadio(e.target.value)}
      />
      <label className="form-check-label" for="male">
        Male
      </label>{" "}
      &nbsp;
      <input
        type="radio"
        className="form-check-input"
        name="gender"
        id="female"
        value="female"
        onChange={(e) => setGenderRadio(e.target.value)}
      />
      <label className="form-check-label" for="female">
        Female
      </label>
      {users &&
        users
          .filter((el) => {
            if (!searchData) {
              return el;
            } else {
              return el.name.toLowerCase().includes(searchData.toLowerCase());
            }
          })
          .filter((el) => {
            if (!genderRadio) {
              return el;
            } else {
              return el.gender === genderRadio;
            }
          })
          .map((us) => (
            <div key={us.id} className="card">
              <div className="card-body">
                <h5 className="card-title">{us.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{us.email}</h6>
                <p className="card-text">{us.gender}</p>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    viewUser(us.id);
                  }}
                >
                  View
                </button>{" "}
                &nbsp;
                <Link to={`/edit/${us.id}`} className="btn btn-warning">
                  Edit
                </Link>{" "}
                &nbsp;
                <button
                  onClick={() => {
                    dispatch(deleteUser(us.id));
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}

export default Read;
