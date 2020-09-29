import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useClickOutside} from "../../../Hooks/ClickOutside";

export default function ({title, items}) {
    const closedClass = "navbar__submenu-list";
    const openClass = "navbar__submenu-list navbar__submenu--active";
    const wrapperRef = useRef(null);
    const [className, setClassName] = useState(closedClass);

    useClickOutside(wrapperRef, () => setClassName(closedClass));

    const close = () => {
        setClassName(closedClass);
    };

    const open = () => {
        setClassName(openClass);
    };

    const handleOnClick = item => {
        item.onClick();
        close();
    }

    return (
        <li className="navbar__nav-item navbar__submenu" ref={wrapperRef}>
            <a href='#' rel='noreferrer' className="navbar__nav-link"
               onClick={open}>
                {title}
            </a>
            <ul className={className}>
                {items.map((item, index) => (
                    <li className="navbar__submenu-item" key={index}>
                        {item.onClick ? (
                            <a href="#" onClick={() => handleOnClick(item)} className="navbar__link">{item.title}</a>

                        ) : item.href ? (
                            <a href={item.href} onClick={() => close()} className="navbar__link">{item.title}</a>
                        ) : (
                            <Link className="navbar__link" onClick={close} to={item.to}>{item.title}</Link>
                        )}
                    </li>
                ))}
            </ul>

        </li>
    )
};
