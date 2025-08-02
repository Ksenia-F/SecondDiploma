import s from "./SideBar.module.scss";
import logo from "../../../../assets/imgs/vector/logo.svg";
import Exit from "../../../../assets/imgs/vector/exit.svg?react"

import Accordion from "./Accordion/Accordion.jsx";

import { useLocation, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BurgerContext } from "../../../../Contexts.jsx";


import profile from "../../../../assets/imgs/vector/aside__icons/profile.svg?react";
import calendar from "../../../../assets/imgs/vector/aside__icons/calendar.svg?react";
import groups from "../../../../assets/imgs/vector/aside__icons/groups.svg?react";
import lessons from "../../../../assets/imgs/vector/aside__icons/lessons.svg?react";
import articles from "../../../../assets/imgs/vector/aside__icons/articles.svg?react";
import appeals from "../../../../assets/imgs/vector/aside__icons/appeals.svg?react";
import admin from "../../../../assets/imgs/vector/aside__icons/admin.svg?react";

import teacher from "../../../../assets/imgs/vector/aside__icons/teacher.svg?react";
import user from "../../../../assets/imgs/vector/aside__icons/user.svg?react";
import schedule from "../../../../assets/imgs/vector/aside__icons/schedule.svg?react";
import programs from "../../../../assets/imgs/vector/aside__icons/programs.svg?react";
import methodist from "../../../../assets/imgs/vector/aside__icons/methodist.svg?react";
import group__control from "../../../../assets/imgs/vector/aside__icons/group__control.svg?react";
import appeals__control from "../../../../assets/imgs/vector/aside__icons/appeals__control.svg?react";
import plan from "../../../../assets/imgs/vector/aside__icons/plan.svg?react";

export const Items = [
    {
        id: 1,
        category: "Меню",
        menu__items: [
            {
                id: 1,
                icon: profile,
                text: "Профиль",
                page: "profile"
            },
            {
                id: 2,
                icon: teacher,
                text: "Учителю",
                isAccordion: true,
                innerMenu: [
                    {
                        id: 1,
                        icon: groups,
                        text: "Группы",
                        page: "groups",
                    },
                ]
            },
            {
                id: 3,
                icon: admin,
                text: "Админу",
                isAccordion: true,
                innerMenu: [
                    {
                        id: 1,
                        icon: user,
                        text: "Пользователи",
                        page: "reallyadmin/usersControl",
                    },
                    {
                        id: 2,
                        icon: group__control,
                        text: "Группы",
                        page: "reallyadmin/groupsControl",
                    },
                    {
                        id: 3,
                        icon: appeals__control,
                        text: "Заявки",
                        page: "reallyadmin/appealsControl",
                    },
                    {
                        id: 4,
                        icon: schedule,
                        text: "Расписание",
                        page: "reallyadmin/calendar",
                    }
                ]
            },
            {
                id: 5,
                icon: methodist,
                text: "Методисту",
                isAccordion: true,
                innerMenu: [
                    {
                        id: 1,
                        icon: articles,
                        text: "Статьи",
                        page: "articles",
                    },
                    {
                        id: 2,
                        icon: plan,
                        text: "Учебный план",
                        page: "lolcreallyadmin",
                    },
                    {
                        id: 3,
                        icon: programs,
                        text: "Программы",
                        page: "nereallyadmin",
                    },
                ]
            },
        ]
    }
];


export default function SideBar () {
    const {isActiveBurger, setIsActiveBurger} = useContext(BurgerContext);
    const path = useLocation().pathname;

    function handleOnMouseEnter() {
        setIsActiveBurger(false);
    }

    function handleOnMouseDown() {
        setIsActiveBurger(true);
    }
    
    return (
        <>
            <aside className={`${s.SideBar} ${isActiveBurger ? s.active : ""}`} onMouseEnter={handleOnMouseEnter}>
                <div className={s.logo}>
                    <img src={logo} alt="" />
                    <p>Диплом</p>
                </div>
                <menu className={s.menu}>
                    {
                        Items.map((category) => (
                            <div key={category.id} className={s.menu__category}>
                                <span className={s.category}>{isActiveBurger ? "..." : category.category}</span>
                                <ul>
                                    {
                                        category.menu__items.map((item) => {
                                            const isActive = path.includes(`/${item.page}`);
                                            const Icon = item.icon;
                                            return (
                                                <li key={item.id} className={isActive ? s.active : ""}>
                                                    {
                                                        function returnItem() {
                                                            if (!item.isAccordion) {
                                                                return (
                                                                    <Link to={`/diploma/${item.page}`} className={s.Link}>
                                                                        <Icon alt={item.text} className={s.icon}/>
                                                                        <span>{item.text}</span>
                                                                    </Link>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Accordion item={item} isActive={isActive}/>
                                                                )
                                                            }
                                                        }()
                                                    }
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        ))
                    }
                    <div className={s.exit}>
                        <Link to={`${path}/exit`} className={s.Link}>
                            <Exit className={s.icon}/>
                            <span>Выйти</span>
                        </Link>
                    </div>
                </menu>
            </aside>
        </>
    )
}
