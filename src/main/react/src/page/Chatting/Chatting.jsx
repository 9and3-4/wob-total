import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import SettingAxiosApi from "../../api/SettingAxiosApi";
import MyPageAxiosApi from "../../api/MyPageAxiosApi";

import { KH_SOCKET_URL } from "../../utils/Common";

const Container = styled.div`
  position: relative;
  padding: 20px;
  max-width: 768px;
  margin: 40px auto;
  background-color: var(--MINT);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  @media only screen and (max-width: 768px) {
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`;
const ChatHeader = styled.div`
  font-size: 1.5em;
  width: 100%;
  padding-right: 10%;
  color: #333;
  display: flex;
  justify-content: center;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 75vh;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    height: 82vh;
  }
  @media only screen and (max-height: 700px) {
    height: 79vh;
  }
  @media only screen and (max-height: 600px) {
    height: 76vh;
  }
`;

const Message = styled.div`
  /* max-width: 60%; */
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isSender ? "#04BF8A" : "#FFFFFF")};
    /* align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")}; */
  border: ${(props) =>
      props.isSender ? "1px solid #04BF8A" : "1px solid #FFFFFF"};
`;

const MessageSender = styled.div`
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  // align-self는 flex 아래에서 적용됨.
`;
const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Input = styled.input`
  padding: 10px;
  width: 80%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  width: 100px;
  background-color: #ffffff;
  box-shadow: 1px 1px 1px #ccc;
  color: black;
  border-radius: 4px;
  /* margin-left: px; */
  cursor: pointer;

  &:hover {
    background-color: #04bf8a;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
`;

const BackBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent; // 버튼 배경 없애기
  border: none;
  cursor: pointer;

  img {
    width: 80%;
    height: 60%;
  }
`;

const Chatting = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [chatList, setChatList] = useState([]);
  const { roomId } = useParams();
  const [sender, setSender] = useState("");
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null);
  const navigate = useNavigate(); // useNavigate 훅 추가

  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  const onEnterKey = (e) => {
    // enter 키 눌렀을 때 메세지 보내는 함수 호출
    if (e.key === "Enter" && inputMsg) {
      e.preventDefault();
      onClickMsgSend();
    }
  };

  // 전송 버튼
  const onClickMsgSend = () => {
    // 웹소켓 연결이 되어있다면, 정보들 보내기
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
          JSON.stringify({
            type: "TALK",
            roomId: roomId,
            sender: sender,
            message: inputMsg,
          })
      );
      setInputMsg("");
    } else {
      alert("error : 채팅 연결에 실패했습니다. 이전 페이지로 이동합니다.");
    }
  };

  // 종료 버튼
  const onClickMsgClose = () => {
    // 웹소켓 연결 끊고 이전 페이지로 이동
    ws.current.close();
    navigate(-1);
  };

  // 이전 채팅 내용을 가져오는 함수
  const loadPreviousChat = async () => {
    try {
      const res = await SettingAxiosApi.recentChatLoad(roomId);
      const recentMessages = res.data;
      setChatList(recentMessages);
    } catch (error) {
      alert("error : 이전 대화내용을 불러오지 못했습니다.");
    }
  };

  // // 정해진 시간이 흐른 뒤 채팅방 종료
  // useEffect(() => {
  //   const afterDate = new Date("2023-12-27T15:58:00"); // 내가 지정한 날짜와 시간
  //   const currentDate = new Date(); // 현재 날짜와 시간
  //   const timeoutId = setTimeout(() => {
  //     if (ws.current) {
  //       ws.current.close();
  //       navigate("/main"); // 이 부분 수정해야 함
  //       console.log("정상 종료");
  //     } else {
  //       console.log("소켓 없음");
  //     }
  //   }, afterDate - currentDate);
  //   return () => clearTimeout(timeoutId);
  // }, []);

  useEffect(() => {
    // 이메일로 회원 닉네임 가져와서 sender에 저장
    const getMember = async () => {
      try {
        const rsp = await MyPageAxiosApi.userGetOne(
            window.localStorage.getItem("email")
        );
        setSender(rsp.data.nickname);
      } catch (error) {
        alert(
            "error : 회원 닉네임을 불러오지 못했습니다. 이전 페이지로 이동합니다."
        );
        navigate(-1);
      }
    };
    getMember();
  });

  useEffect(() => {
    // 채팅방 정보 가져 오기
    const getChatRoom = async () => {
      try {
        const rsp = await SettingAxiosApi.chatDetail(roomId);
        setRoomName(rsp.data.name);
      } catch (error) {
        alert(
            "error : 채팅방 정보를 불러오지 못했습니다. 이전 페이지로 이동합니다."
        );
        navigate(-1);
      }
    };
    getChatRoom();
  });

  useEffect(() => {
    // 웹소켓 연결하는 부분, 이전 대화내용 불러오는 함수 호출
    console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket(KH_SOCKET_URL);
      ws.current.onopen = () => {
        setSocketConnected(true);
      };
    }
    if (socketConnected) {
      // 웹소켓 연결이 되어있다면,
      ws.current.send(
          JSON.stringify({
            type: "ENTER",
            roomId: roomId,
            sender: sender,
            message: "처음으로 접속 합니다.",
          })
      );
      loadPreviousChat();
    }
    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      setChatList((prevItems) => [...prevItems, data]);
    };

    // 홈페이지의 뒤로가기를 눌렀을 때, 웹소켓 연결 끊기도록 return을 적어줌
    return () => {
      ws.current.send(
          JSON.stringify({
            type: "CLOSE",
            roomId: roomId,
            sender: sender,
            message: "종료 합니다.",
          })
      );
    };
  }, [socketConnected]);

  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
    }
  }, [chatList]);
  return (
      <>
        <Container>
          <HeaderBox>
            <BackBtn onClick={onClickMsgClose}>
              <img
                  src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%EB%92%A4%EB%A1%9C%EA%B0%80%EA%B8%B0%EB%B2%84%ED%8A%BC.png?alt=media&token=5fab2a09-453f-4736-8d86-3ac2850a7007"
                  alt="뒤로가기버튼"
              />
            </BackBtn>
            <ChatHeader>&lt; {roomName} &gt;</ChatHeader>
          </HeaderBox>

          <MessagesContainer ref={chatContainerRef}>
            {chatList.map((chat, index) => (
                <MessageBox key={index} isSender={chat.sender === sender}>
                  <MessageSender
                      isSender={chat.sender === sender}
                  >{`${chat.sender}`}</MessageSender>
                  <Message isSender={chat.sender === sender}>
                    {/*채팅 보낸 사람과 내가 일치하면 나에게 출력*/}
                    {`${chat.message}`}
                  </Message>
                </MessageBox>
            ))}
          </MessagesContainer>
          <InputContainer>
            <Input
                placeholder="메세지를 입력해주세요."
                value={inputMsg}
                onChange={onChangMsg}
                onKeyUp={onEnterKey}
            />
            <SendButton onClick={onClickMsgSend}>전송</SendButton>
          </InputContainer>
        </Container>
      </>
  );
};
export default Chatting;
