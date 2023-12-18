import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const WhiteBox = styled(Link)`
    background-color: #fff; 
    padding: 20px;
    height: 120px; 
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img {
        max-width: 100%;
        max-height: 80px; 
    };
    height: 150px; 
`; 

const ProductWrapper = styled.div``; 

const Title = styled(Link)`
    font-weight: normal; 
    font-size: 0.9rem;
    margin: 0;
    color: inherit; 
    text-decoration: none;
`; 

const ProductInfo = styled.div`
    margin-top: 5px;

`; 

const PriceRow = styled.div`
    display: block; 
    align-items: center;
    justify-content: space-between;
    margin-top: 2px; 
    @media screen and (min-width: 768px) {
        display: flex;  
        gap: 10px;
    }
`; 

const Price = styled.div`
    font-size: 1rem; 
    font-weight: bold; 
    @media screen and (min-width: 768px) {
        font-size: 1.5rem; 
    }
`;

export default function ProducBox({_id, name, price, images, description}) {
    const url = `/products/${_id}`;
    const {addProduct} = useContext(CartContext);

    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images[0]}></img>
                </div>        
            </WhiteBox>
            <ProductInfo>
                <Title href={url}>{name}</Title>
                <PriceRow>
                    <Price>${price}</Price>
                    <Button onClick={() => addProduct(_id)} primary={1} outline={1}>
                        Add to Cart
                    </Button>
                </PriceRow>
            </ProductInfo>
        </ProductWrapper>
         
    ); 
}