import styled from "styled-components"

const Card = styled.div`
    border: 1px doubled black;
    width: 85%;
    margin: 12px auto;
    padding: 10px;
    border-radius: 10px;
    background: ${({color}) => color ? color : "#333333"};
    color: #e8e8e88e
   
`

export {Card}