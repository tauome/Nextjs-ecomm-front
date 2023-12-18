import styled from 'styled-components';
import Center from './Center.js';
import ButtonLink from './ButtonLink.js';
import CartIcon from './icons/cart.js';
import { useContext } from 'react';
import { CartContext } from './CartContext.js';

const Bg = styled.div`
    background-color: #222; 
    color: white; 
    padding: 50px 0; 
`; 

const Title = styled.h1`
    margin:0;
    font-weight: normal; 
    font-size: 1.5rem;
    @media screen and (min-width: 768px) {
        font-size: 3rem;
    }
`; 

const Desc = styled.p`
    color: #aaa; 
    font-sie: 0.8rem; 
`;  

const ColumnsWrapper = styled.div`
    gap: 40px; 
    width: 100%;
    img { 
        max-width: 100%; 
        max-height: 80%;
        display: block;
        margin: 0 auto;

    };
    div: nth-child(1){
        order: 2;
    }

`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px; 
    margin-top: 25px;
`; 


const Column = styled.div`
    margin-top: 30px;
    display: flex; 
    align-items: center; 
    flex-direction: column;
`;





export default function Featured({featuredProduct}){
    const {addProduct} = useContext(CartContext); 

    function addFeaturedToCart(ev){
        ev.preventDefault();
        addProduct(featuredProduct._id); 
    };


    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{featuredProduct.name}</Title>
                            <Desc>{featuredProduct.description} </Desc>  
                            <ButtonsWrapper>
                                <ButtonLink href={'/products/'+featuredProduct._id} white={1} outline={1}>Read More</ButtonLink>
                                <ButtonLink onClick={addFeaturedToCart} href={''} primary={1}>
                                    <CartIcon/>
                                    Add to Cart</ButtonLink>
                            </ButtonsWrapper>
                            
                        </div>
                    </Column>
                    <Column>
                        <img src="https://www.apple.com/v/macbook-pro-14-and-16/a/images/overview/hero/intro__ewz1ro7xs14y_large.jpg"></img>
                    </Column>
                </ColumnsWrapper>
                
            </Center>
 
        </Bg>
    )
}