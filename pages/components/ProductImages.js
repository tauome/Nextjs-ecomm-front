import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
    max-width: 100%; 
    max-height: 100%;
`;

const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`;

const BigImageWrapper = styled.div`
    text-align: center;
`;

const ImageSelector = styled.div`
    display: flex;
    flex-grow: 0;
    gap: 10px;
    margin-top: 10px;
`;

const ImageButton = styled.div`
    ${({active}) => active && `
         border: 2px solid #aaa;
         border-radius: 5px; 
    `}
    height: 40px;
    padding: 5px; 
    cursor: pointer;
`;
 
export default function ProductImages ({images}) {
    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <>
        <BigImageWrapper>
              <BigImage src={activeImage} />
        </BigImageWrapper>
        <ImageSelector>
            {images?.map(img => (
                <ImageButton
                key={img} 
                active={img === activeImage} 
                onClick={() => setActiveImage(img)}>
                    <Image src={img} alt="product image" />
                </ImageButton>
            ))}
        </ImageSelector>
        </>
    )
}