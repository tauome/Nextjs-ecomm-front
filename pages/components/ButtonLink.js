import Link from 'next/link'; 
import styled, { css } from 'styled-components';
import { ButtonStyle } from './Button.js';

const StyledLink = styled.a`
    ${ButtonStyle}
`

export default function ButtonLink(props) {
    return (
        <StyledLink {...props}/>
    )
}

