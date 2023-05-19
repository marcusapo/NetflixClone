import styled from "styled-components";

export const ButtonAction = styled.button`
    width: 100px;
    height: 100px;
    background: ${ props => props.bgColor};

    & h2 {
        color: white
    }

    &:hover {
        background-color: yellow;
    }
`