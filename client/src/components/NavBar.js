import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE,BASKET_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react";
import Container from "react-bootstrap/Container";
import {useNavigate } from 'react-router-dom'
import Image from "react-bootstrap/Image";
import AdminLogo from "./ImgAndLogo/AdminLogo.png"
import ExitLogo from "./ImgAndLogo/ExitLogo.png"
import AuthLogo from "./ImgAndLogo/Auth.png"
import BrendLogo from "./ImgAndLogo/BrendLogo.png";
import BasketLogo from "./ImgAndLogo/BasketLogo.png"

import "./style/styleForComponent.css";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate ()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>

                <NavLink style={{color:'white',textDecoration:'none'}} to={SHOP_ROUTE} className={"MainTextLogo"}>
                    <Image src={BrendLogo} width={25} height={25} ></Image>
                    Clocks Store </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history(BASKET_ROUTE)}
                            className="mr-2 buttonAdmin"

                        >
                            <Image src={BasketLogo} width={30} height={30} ></Image>
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE)}
                            className={"buttonAdmin"}

                        >
                            <Image src={AdminLogo} width={30} height={30} ></Image>
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2 buttonAdmin"

                        >
                            <Image src={ExitLogo} width={30} height={30} ></Image>
                        </Button>

                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} className="ml-2 buttonAdmin"  onClick={() => history(LOGIN_ROUTE)}>
                            <Image src={AuthLogo} width={30} height={30} ></Image>
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
