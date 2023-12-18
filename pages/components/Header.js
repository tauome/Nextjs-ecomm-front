import styled from "styled-components";
import Center from "./Center.js";
import { CartContext } from "./CartContext.js";
import { useContext, useState } from "react";
import BarsIcon from "./icons/Bars.js";

const StyledHeader = styled.header`
    background-color: #222;
    padding: 0.5rem;
    width: 100%;
`;

const Logo = styled.a`
    color: #fff;
    text-decoration: none;
    position: relative;
    z-index: 3;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between; 
    padding: 30px 0;
`;
const StyledNav = styled.nav`
    ${({mobileNavActive}) => mobileNavActive ? `display: block` : `display: none;`}
    gap: 15px;
    position: fixed; 
    top: 70px; 
    bottom: 0;
    left: 0;
    right: 0;
    padding: 50px 20px 20px;
    background-color: #222;
    @media screen and (min-width: 768px) {
        display: flex;
        position: static;
        padding: 0;
    }
    
`; 

const  NavLink = styled.a`
    display: block; 
    color: #aaa;
    text-decoration: none;
    font-size: 1.5rem;
    padding: 10px 0;
    @media screen and (min-width: 768px) {
        font-size: 1rem;
        padding: 0;
    }
`;

const NavButton = styled.button` 
    background-color: transparent;
    width: 35px;
    height: 35px;
    border: none;
    color: white; 
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export default function Header(){
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                        Ecommerce 
                    </Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/products"}>All Products</NavLink>
                        <NavLink href={"/categories"}>Categories</NavLink>
                        <NavLink href={"/account"}>Account</NavLink>
                        <NavLink href={"/cart"}>Cart ({cartProducts?.length})</NavLink>
                    </StyledNav> 
                    <NavButton onClick={() => setMobileNavActive(prev =>  !prev)}>
                        <BarsIcon/> 
                    </NavButton>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}
