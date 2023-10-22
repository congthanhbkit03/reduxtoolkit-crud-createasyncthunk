import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://6531f5484d4c2e3f333d6f79.mockapi.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//read all users
export const readAllUsers = createAsyncThunk(
  "readAllUsers",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://6531f5484d4c2e3f333d6f79.mockapi.io/users"
    );
    console.log(response);
    try {
      const json = await response.json();
      //   console.log(json);
      return json;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://6531f5484d4c2e3f333d6f79.mockapi.io/users/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://6531f5484d4c2e3f333d6f79.mockapi.io/users/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const userSlice = createSlice({
  name: "userSlice", //ten nay lam prefix cho action
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: null, //goi du lieu tu search form vao state nay
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload; //truyen payload vao cap nhap searchData
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [readAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [readAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [readAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;

      const { id } = action.payload; //xoa xong ra payload ve la object bi xoa {id: .., name: ...}
      if (id) {
        state.users = state.users.filter((el) => el.id !== id);
      }
      // state.users = action.payload;
      console.log("delete: ", action.payload);
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((us) =>
        us.id === action.payload.id ? action.payload : us
      ); //neu id user trung voi id tra ve tu payload thi lay payload con ko lay user cu
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { searchUser } = userSlice.actions;
