import Header from "../components/Header";
import Center from "../components/Center";
import styled from "styled-components";
import mongooseConnect from "../lib/mongoose";
import { Product } from "@/models/Product";
import ImageBox from "../components/ImageBox";
import ProductImages from "../components/ProductImages";
import Button from "../components/Button";
import CartIcon from "../components/icons/cart";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";

const Title = styled.h1`
    font-size: 1.5em;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;
`;

const PriceRow = styled.div`
    display: flex;
    gap: 20px; 
    align-items: center;
`;

const Price = styled.span` 
    font-size: 1.5rem; 
`;


export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext);

    return (
       <>
       <Header/>
       <Center>
             <ColWrapper>
                <ImageBox>
                    <ProductImages images={product.images}/> 
                </ImageBox>
                <div>
                    <Title>{product.name}</Title> 
                    <p>{product.description}</p>
                    <PriceRow>
                        <Price>${product.price}</Price>
                        <Button onClick={() => addProduct(product._id)} primary><CartIcon/>Add to Cart</Button>
                    </PriceRow>
                </div>
             </ColWrapper>
       </Center>
       </>
    ); 
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const id = context.params.id;
    const product = await Product.findById(id); 

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }; 
}

