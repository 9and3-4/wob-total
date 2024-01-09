// 관리자 햄버거 버튼 사이드바 css
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  margin: auto;
  position: absolute;
  top: 30px;
  left: 150px;
  @media screen and (max-width: 430px) {
    left: -20px;
  }

  // 햄버거 버튼
  .mainhead {
    height: 60px;
    width: 20%;
    display: flex;
    justify-content: end;
    align-items: center;

    // 관리자 관리 내역
    .welcome {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      color: #353535;
      @media screen and (max-width: 430px) {
        margin-top: 40px;
      }

      .hambeger {
        position: relative;
      }
    }
  }
  .mainbody {
    height: calc(100vh - 54px - 50px);
  }
`;

// 햄버거 토글 안 목록
export const List = styled.ul`
  margin: 50px;
  position: relative;
  .m-title {
    font-size: 23px;
    font-weight: bold;
    line-height: 40px;
    cursor: pointer;
    position: relative;
  }
  .sub-menu {
    line-height: 60px;
    cursor: pointer;
    position: relative;
  }
  .logoBox {
    display: flex;
    justify-content: end;
  }
  @media screen and (max-width: 430px) {
    margin: 30px;
    .m-title {
      font-size: 20px;
      font-weight: bold;
      line-height: 30px;
      cursor: pointer;
    }
    .sub-menu {
      line-height: 50px;
      cursor: pointer;
    }
    .logoBox {
      display: flex;
      justify-content: end;
    }
  }
`;
// 햄버거 사이드메뉴 움직이는 css
export const StyledSideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  width: 340px;
  height: 85vh;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  transform: ${(props) =>
  props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  background-color: #dceae6;
  @media screen and (max-width: 430px) {
    height: 90vh;
  }
`;

export const StyledMenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Dummy = styled.div`
  height: 54px;
`;

export default Container;
