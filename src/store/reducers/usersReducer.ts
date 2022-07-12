import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {alphabetEN, monthEN} from "../../const/global";
import {IUser} from "../../types";

interface IUsers {
    [x: string]: IUser[]
}

interface IInitialState {
    users: IUsers,
    activeUsers: IUsers,
    isUsersLoading: boolean,
}

const initialState: IInitialState = {
  users: {},
  activeUsers: monthEN.reduce((accum: IUsers, elem) => {
    accum[elem] = [];
    return accum;
  }, {}),
  isUsersLoading: false,
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, {dispatch}) => {
    const response = await axios.get("http://topdevsprojects.org:8081/tasks/users");
    const transformRes = response.data.reduce((acc: IUsers, el: IUser) => {
      acc[el.firstName[0]].push({...el, active: false});
      return acc;
    }, alphabetEN.reduce((accum: IUsers, elem) => {
      accum[elem] = [];
      return accum;
    }, {}));
    for (const letter of alphabetEN) {
      transformRes[letter].sort((a: IUser, b: IUser) => {
        if (a.firstName > b.firstName) return 1;
        if (a.firstName < b.firstName) return -1;
        return 0;
      }
      );
    }
    dispatch(setUsers(transformRes));
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, {payload}) {
      state.users = payload;
    },
    setActive(state, {payload}) {
      const finder = state.users[payload.letter].find((el) => el.id === payload.id);
      if (finder) {
        finder.active = payload.active;
        const indexMonth=+finder.dob.slice(5,7);
        const monthInArr=indexMonth<7?indexMonth+12-7:indexMonth-7;
        if(payload.active){
          state.activeUsers[monthEN[monthInArr]].push(finder);
          state.activeUsers[monthEN[monthInArr]].sort((a: IUser, b: IUser) => {
            if (a.lastName > b.lastName) return 1;
            if (a.lastName < b.lastName) return -1;
            return 0;
          }
          );
        }else{
          state.activeUsers[monthEN[monthInArr]]=state.activeUsers[monthEN[monthInArr]]
            .filter((el)=>el.id!==payload.id);
        }
      }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isUsersLoading = false;
      });
  }
});

export default usersSlice.reducer;
export const {
  setUsers,
  setActive
} = usersSlice.actions;