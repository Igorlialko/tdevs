import React, {FC} from "react";

import {IUser} from "../../types";
import {useTypedDispatch} from "../../hooks/useTypedRedux";
import { setActive } from "../../store/reducers/usersReducer";

import st from "./index.module.scss";

export const User: FC<{ user: IUser, letter: string }> = ({user, letter}) => {
  const dispatch = useTypedDispatch();

  const handleActive=()=>{
    dispatch(setActive({
      letter,
      active:true,
      id:user.id
    }));
  };
  const handleDisable=()=>{
    dispatch(setActive({
      letter,
      active:false,
      id:user.id
    }));
  };

  return (
    <div className={st.user}>
      <h2 className={user.active?st.active:""}>{user.firstName} {user.lastName}</h2>
      <div className={st.user_btns}>
        <div className={`${st.user_btn} ${user.active?st.active:""}`}
          onClick={handleActive}
        >
                    active
        </div>
        <div className={`${st.user_btn} ${!user.active?st.activeF:""}`}
          onClick={handleDisable}
        >
                    no active
        </div>
      </div>
    </div>
  );
};
