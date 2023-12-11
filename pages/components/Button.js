import styled from "styled-components";
import { css } from "styled-components";
import { primary } from "../lib/colors";

export const ButtonStyle = css`

border: 0;
padding: 5px 15px;
border-radius: 5px; 
cursos: pointer;
display: inline-flex; 
align-items: center;
text-decoration: none;
font-weight: bold;
font-family: 'Roboto', sans-serif;
svg {
    height: 16px; 
    margin-right: 5px;

}
${props => props.white && !props.outline && css`
    background-color: white; 
    color: black;
`}

${props => props.white && props.outline && css`
    background-color: transparent;; 
    color: white;
    border: 1px solid white; 
`}

${props => props.primary && css && !props.outline && css`
    background-color: ${primary}; 
    color: white;
    border: 1px solid ${primary}; 
`} 

${props => props.primary && css && props.outline && css`
    background-color: transparent;; 
    color: ${primary};
    border: 1px solid ${primary}; 
`} 

${props => props.size === "l" && css`
    font-size: 1.2rem;
    padding: 10px 20px; 
    svg {
        height: 20px; 
    }
`}`

const StyledButton = styled.button`
   ${ButtonStyle}
`; 

export default function Button ({children, ...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
        
    )
}