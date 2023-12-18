import styled from "styled-components";
import ProductBox from "./ProductBox.js";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1r 1fr 1fr; 
    gap: 30px; 
`;

export default function ProductsGrid({products}) {
    return (
        <StyledProductsGrid>
            {products?.length > 0 && products.map((product) => (
                <ProductBox {...product} key={product._id}/>
            ))}
        </StyledProductsGrid>
    );   
}