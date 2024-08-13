import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ color }) => (color ? color : "red")};
  width: 100vw;
  min-height: 100vh;
  padding: ${({ padding }) => (padding ? padding : "0px")};
  // color: ${({ fontColor }) => (fontColor ? fontColor : "white")}
`;

const Tile = styled.div`
  width: ${({ width }) => (width ? width : "600px")};
  background: ${({ color }) => (color ? color : "red")};
  margin: ${({ margin }) => (margin ? margin : "32px auto")};
  border-radius: 5px;
  padding: ${({ padding }) => (padding ? padding : "0px")};
  -webkit-box-shadow: -3px 20px 16px -23px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -3px 20px 16px -23px rgba(0, 0, 0, 0.75);
  box-shadow: -3px 20px 16px -23px rgba(0, 0, 0, 0.75);
`;
const Button = styled.button`
  background: #444444;
  color: #f2f2f2;
  padding: 5px;
  width: ${({ width }) => (width ? width : "450px")};
  font-weight: 700;
  border: none;
  font-size: 20px;
  -webkit-box-shadow: -3px 20px 16px -13px rgba(117, 69, 33, 1);
  -moz-box-shadow: -3px 20px 16px -13px rgba(117, 69, 33, 1);
  box-shadow: -3px 20px 16px -13px rgba(117, 69, 33, 1);
`;

export { Wrapper, Tile, Button };
