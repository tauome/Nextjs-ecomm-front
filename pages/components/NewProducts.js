import styled from "styled-components";
import Center from "./Center.js";
import ProductBox from "./ProductBox.js";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1r 1fr 1fr; 
    gap: 30px; 
`;

const Title = styled.h2`
    font-size: 2rem; 
    margin: 30px 0 20px; 
    font-weight: 400; 
`;


export default function NewProducts({newProducts}){
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid>
                {newProducts?.length > 0 && newProducts.map((product) => (
                    <ProductBox {...product} key={product._id}/>
                ))}
            </ProductsGrid>
        </Center>
    );
}