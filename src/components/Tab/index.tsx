import React, {FC, memo, ReactNode, useCallback, useEffect, useRef, useState} from "react";

import {useTypedSelector} from "../../hooks/useTypedRedux";
import {User} from "../User";
import {monthEN} from "../../helpers/const/global";
import {gsapFromTo} from "../../helpers/functions/gsap";

import st from "./index.module.scss";

export const Tab: FC<{ header: string, children: ReactNode, active?: boolean }> = ({
  active = false,
  children,
  header
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(active);
  }, [active, setIsOpen]);

  const trigger = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [setIsOpen]);

  const container = useRef<any>(null);
  useEffect(() => {
    if (!container.current) return;
    const containerLength=container.current.children.length;
    const anim =containerLength&& gsapFromTo(container.current.children, {
      scale: 0.9,
      y: 20,
      x: 20
    }, {
      scale: 1,
      y: 0,
      x: 0,
    });
    return () => {
      if (!containerLength) return;
      anim.kill();
    };
  }, [container, isOpen]);

  return (
    <div className={`${st.tab} ${isOpen ? st.active : ""}`}>
      <h2 className={st.tab__header}
        onClick={trigger}
      >
        {header}
      </h2>
      <div className={st.tab__main} ref={container}>
        {children}
      </div>
    </div>
  );
};

export const UsersTab: FC<{ letter: string }> = memo(({letter}) => {
  const letterArr = useTypedSelector(useCallback(state => state.usersReducer.users[letter], [letter]));
  return (
    <Tab header={letter}>
      {letterArr &&
            (!letterArr.length
              ? <h2>«No Employees»</h2>
              : letterArr.map((el) => <User key={el.id} user={el} letter={letter}/>))
      }
    </Tab>
  );
});
export const ActiveUsersTab: FC<{ month: string }> = memo(({month}) => {
  const monthArr = useTypedSelector(useCallback(state => state.usersReducer.activeUsers[month], [month]));

  return (
    <Tab header={month} active={!(monthArr.length < 1)}>
      {monthArr &&
            (!monthArr.length
              ? <h2>«No Employees»</h2>
              : monthArr.map((el) => {
                const indexMonth = +el.dob.slice(5, 7);
                const monthInArr = monthEN[indexMonth < 7 ? indexMonth + 12 - 7 : indexMonth - 7];
                return <div key={el.id}>
                  {el.lastName} {el.firstName} - {el.dob.slice(8, 10)} {monthInArr}, {el.dob.slice(0, 4)} year
                </div>;
              }
              ))
      }
    </Tab>
  );
});