// 전체 결제 내역 관리(전체 결제 내역 목록)
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";
import { useNavigate } from "react-router-dom";
import Tr4 from "../../component/admin/PaymentElement";
import AdminAxiosApi from "../../api/AdminAxiosApi";

// 전체 큰 틀css
const PaymentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .Logo {
    text-align: center;
    cursor: pointer;
  }

  // 결제 목록 css
  p {
    text-align: center;
    font-size: 45px;
    padding-bottom: 50px;
  }

  .tableBox {
    //table 표
    overflow-x: auto;
    table {
      margin: 0 auto;
      thead {
        tr {
          th {
            padding: 20px 10px;
            font-size: 20px;
            white-space: nowrap;
          }
        }
      }
      tbody {
        text-align: center;
        tr {
          white-space: nowrap;
        }
      }
    }
  }
  @media screen and (max-width: 430px) {
    padding-top: 60px;
    // 결제 목록 css
    p {
      font-size: 25px;
      padding-bottom: 30px;
    }
    .tableBox {
      width: 100%;
      white-space: nowrap;
      table {
        width: auto;
        thead {
          tr {
            th {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
`;

// 등록 버튼
const Buttons = styled.div`
  border: 1px solid white;
  background-color: white;
  width: 100%;
  text-align: center;
  color: #353535;

  button {
    font-weight: 500;
    background-color: #dfede9;
    border: 1px solid #04bf8a;
    border-radius: 10px;
    padding: 15px;
    font-size: 15px;
    margin: 10px 10px;
    cursor: pointer;
    color: #353535;
  }
  @media screen and (max-width: 430px) {
    button {
      padding: 10px;
      font-size: 13px;
      margin: 15px 10px;
    }
  }
`;

// 결제 목록 페이지
const AllPaymentList = () => {
  // 맵 돌릴 리스트
  const [paymentList, setPaymentList] = useState([]); // 결제 리스트
  const [num, setNum] = useState(1); // 인덱스 번호
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  // 수정, 등록 시 경로 이동
  const handleClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const payList = async () => {
      const rsp = await AdminAxiosApi.paymentList();
      console.log("rsp.data : ", rsp.data);
      if (rsp.data) {
        console.log("정상출력");
        setPaymentList(rsp.data);
      }
    };
    payList();
  }, [isChange]);

    useEffect(() => {
      const fetchData = async () => {};
      fetchData();
    }, [isChange]);

  return (
    <PaymentContainer>
      <div className="Logo" onClick={() => handleClick("/AdminMain")}>
        <FullLogoBth />
      </div>
      <p>전체 결제 내역 목록</p>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>주문번호</th>
              <th>주문자이메일</th>
              <th>주문자이름</th>
              <th>주문자 전화번호</th>
              <th>주문금액</th>
              <th>강사명</th>
              <th>강사 전화번호</th>
              <th>상태</th>
              <th>분류선택</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {/* map으로 반복할 요소 */}
            {paymentList &&
              paymentList.map((data, index) => (
                <Tr4
                  key={data.id}
                  data={data}
                  index={index + num}
                  active={data.active === "active"}
                  setIsChange={setIsChange}
                />
              ))}
          </tbody>
        </table>
      </div>
      <Buttons>
        <button onClick={() => handleClick("/AdminMain")}>뒤로가기</button>
      </Buttons>
      {/* 햄버거 토글 사이드바 */}
      <Layout />
    </PaymentContainer>
  );
};

export default AllPaymentList;
