import React, {useCallback, useEffect, useRef} from "react";

import "./App.scss";
import {alphabetEN, monthEN} from "./helpers/const/global";
import {getUsers} from "./store/reducers/usersReducer";
import {useTypedDispatch, useTypedSelector} from "./hooks/useTypedRedux";
import Preloader from "./components/Preloader";
import {ActiveUsersTab, UsersTab} from "./components/Tab";
import {gsapFromTo} from "./helpers/functions/gsap";

export function App() {
  const dispatch = useTypedDispatch();
  const {isUsersLoading} = useTypedSelector(useCallback(state => state.usersReducer, []));

  const isActivatedUsers = useTypedSelector(useCallback(state => {
    let countLength = 0;
    for (const arrUsers in state.usersReducer.activeUsers) {
      countLength += state.usersReducer.activeUsers[arrUsers].length;
    }
    return countLength>0;
  }, []));

  useEffect(() => {
    if(!localStorage["persist:root"]){
      dispatch(getUsers());
    };
  }, [dispatch]);

  const container1=useRef<any>(null);
  const container2=useRef<any>(null);
  useEffect(()=>{
    if (!container1.current) return;
    gsapFromTo(container1.current.children,{
      scale:0.9,
      y:20,
      x:-20
    },{
      scale:1,
      y:0,
      x:0,
    });
  },[isUsersLoading]);
  useEffect(()=>{
    if (!container2.current) return;
    gsapFromTo(container2.current.children,{
      scale:0.9,
      y:20,
      x:20
    },{
      scale:1,
      y:0,
      x:0,
    });
  },[isUsersLoading,isActivatedUsers]);

  return (
    <div className="App">
      <header className="header">
        {/*any header*/}
      </header>
      <main>
        <section className="users">
          {
            isUsersLoading ? <Preloader/> :
              <div className="users__container _container" >
                <div className="users__accordion">
                  <h1>Employess</h1>
                  <div className="users__accordion-con" ref={container1}>
                    {
                      alphabetEN.map((el) => {
                        return <UsersTab key={el} letter={el}/>;
                      }
                      )
                    }
                  </div>
                </div>
                <div className="users__accordion">
                  <h1>Employees birthday</h1>
                  <div className="users__accordion-con" ref={container2}>
                    {!isActivatedUsers
                      ? <h2>Employees List is empty</h2>
                      :
                      monthEN.map((el) => {
                        return <ActiveUsersTab key={el} month={el}/>;
                      })}
                  </div>
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
