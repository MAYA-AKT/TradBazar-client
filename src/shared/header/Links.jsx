import React from 'react';
import { NavLink } from 'react-router';
import { IoMdHome } from "react-icons/io";

const Links = () => {
    return (
        <>
            <NavLink path='/'>
                <IoMdHome/> Home
            </NavLink>
           
            <NavLink path='/contact'>Products</NavLink>
        </>
    );
};

export default Links;