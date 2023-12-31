import styled from "styled-components";

const TitleAlign = styled.h2`
  text-align: center;
  color: #353535;
`;

const TextAlign = styled.div`
  text-align: center;
  color: #353535;
`;

const SelectButton = styled.button`
  padding: 5px 30px;
  font-size: 20px;
  background-color: ${(props) => (props.selected ? "#04bf8a" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "inherit")};
  border: 1px solid ${(props) => (props.selected ? "#04bf8a" : "#353535")};
  border-radius: 30px;
  white-space: nowrap;
  &:focus {
    outline: none;
  }
  &:hover {
    border-color: #04bf8a;
    color: ${(props) => (props.selected ? "#fff" : "#04bf8a")};
  }
`;

const InputBar = styled.input`
  font-size: 20px;
  border: 1px solid ${(props) => (props.hasValue ? "#04bf8a" : "#353535")};
  border-radius: 30px;
  padding: 20px 60px;
  grid-column: span 2;
  background-color: ${(props) => (props.disabled ? "#ebebeb" : "transparent")};
  color: ${(props) => (props.disabled ? "gray" : "inherit")};
  &:focus {
    outline-color: #04bf8a;
  }
`;

const NextButton = styled.button`
  padding: 20px 60px;
  background-color: #04bf8a;
  opacity: ${(props) => (props.active ? "1" : "0.5")};
  color: #fff;
  border: 1px solid gray;
  border-radius: 30px;
  grid-column: span 2;
  white-space: nowrap;
  cursor: ${(props) =>
    props.active ? "pointer" : "default"}; /* 포인터가 생기도록 설정 */
  &:focus {
    outline: none;
  }
`;

const PrevNavigateBox = styled.div`
  /* margin-top: 10px; */
  text-align: center;
  text-decoration: underline;
  opacity: 0.5;
  grid-column: span 2;
  &:hover {
    cursor: pointer;
  }
`;
export {
  TitleAlign,
  TextAlign,
  SelectButton,
  InputBar,
  NextButton,
  PrevNavigateBox,
};
