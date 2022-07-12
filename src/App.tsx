import React, {useCallback, useEffect} from "react";

import "./App.scss";
import {alphabetEN, monthEN} from "./const/global";
import {getUsers} from "./store/reducers/usersReducer";
import {useTypedDispatch, useTypedSelector} from "./hooks/useTypedRedux";
import Preloader from "./components/Preloader";
import {ActiveUsersTab, UsersTab} from "./components/Tab";

export function App() {
  const dispatch = useTypedDispatch();
  const {isUsersLoading} = useTypedSelector(useCallback(state => state.usersReducer, []));

  const isActivatedUsers = useTypedSelector(useCallback(state => {
    let countLength = 0;
    for (const arrUsers in state.usersReducer.activeUsers) {
      countLength += state.usersReducer.activeUsers[arrUsers].length;
    }
    return countLength;
  }, []));

  useEffect(() => {
    if(!Object.keys(JSON.parse(JSON.parse(localStorage["persist:root"])?.usersReducer)?.users)?.length){
      dispatch(getUsers());
    };
  }, [dispatch]);

  return (
    <div className="App">
      <header className="header">
        {/*any header*/}
      </header>
      <main>
        <section className="users">
          {
            isUsersLoading ? <Preloader/> :
              <div className="users__container _container">
                <div className="users__accordion">
                  <h1>Employess</h1>
                  {
                    alphabetEN.map((el) => {
                      return <UsersTab key={el} letter={el}/>;
                    }
                    )
                  }
                </div>
                <div className="users__accordion">
                  <h1>Employees birthday</h1>
                  {!isActivatedUsers
                    ? <h2>Employees List is empty</h2>
                    : monthEN.map((el) => {
                      return <ActiveUsersTab key={el} month={el}/>;
                    }
                    )
                  }
                </div>
              </div>

          }
        </section>

      </main>
      <footer>
        {/*any footer*/}
      </footer>
    </div>
  );
}
