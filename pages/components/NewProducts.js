import styled from "styled-components";
import Center from "./Center.js";
import ProductsGrid from "./ProductsGrid.js";


const Title = styled.h2`
    font-size: 2rem; 
    margin: 30px 0 20px; 
    font-weight: 400; 
`;


export default function NewProducts({newProducts}){
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products={newProducts}></ProductsGrid>
        </Center>
    );
}