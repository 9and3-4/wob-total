import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import { useNavigate } from "react-router-dom";

const MapContainer = styled.div`
  width: 65%;
  height: 45vh;
  margin: 0 auto;
`;

const AppContainer = styled.div`
  text-align: center;
  h1 {
    font-size: 25px;
    color: #353535;
    margin-bottom: 5px;
    span {
      font-size: 30px;
    }
  }
  p {
    font-size: 40px;
    margin-bottom: 5px;
    span {
      color: #028c65;
      .names {
        color: #04bf8a;
      }
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 45%;
  top: 20px;
  left: 30%;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
`;

const InputWrapper = styled.div`
  flex: 1; /* 입력창이 확장되도록 함 */
  display: flex; /* 내부 요소를 수평으로 배치하기 위해 flex 사용 */
  align-items: center; /* 수직 중앙 정렬 */
`;

const InfoWindowContainer = styled.div`
  position: relative;
  width: 45%;
  top: 25px;
  left: 30%;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  line-height: 25px;
`;

const Input = styled.input`
  width: 100%; /* 입력창이 전체 너비를 차지하도록 함 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #04bf8a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
`;

const InfoWindowContent = styled.div`
  padding: 10px;
  font-size: 16px;
`;

const KakaoMap = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: 0, long: 0 }); // 위도, 경도
  const mapRef = useRef(null); // 지도를 담을 영역의 DOM 레퍼런스
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null); // 지도 객체
  const [markers, setMarkers] = useState([]); // 마커 배열
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소
  const [sportsData, setSportsData] = useState(""); // 각 종목데이터 불러오기
  const [text, setText] = useState(""); // 검색한 키워드 저장
  // 현재 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  // 현재 위치 가져오기
  const onSuccess = (position) => {
    console.log(
      "현재 위치 : " + position.coords.latitude,
      position.coords.longitude
    );
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };

  // 에러일 때
  const onError = (error) => {
    console.log(error);
  };

  // 지도 가져오기(초기값)
  useEffect(() => {
    const container = mapRef.current; // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(location.lat, location.long),
      level: 5,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, [location]);

  // 검색 상자
  const handleSearchInputChange = (event) => {
    // console.log("검색 : ", searchQuery);
    setSearchQuery(event.target.value);
  };

  // 검색 확인 버튼 누를 시 내용 조회
  const handleSearchButtonClick = async () => {
    console.log("검색 : ", searchQuery);
    setText(searchQuery);
    const resp = await AdminAxiosApi.mapSearch(searchQuery);
    setSportsData(resp.data);
    console.log(resp);
    setSearchQuery(""); // 엔터치면 글 초기화
  };

  // 지도에 마커 표시하기
  useEffect(() => {
    if (!sportsData) return;
    markers.forEach((marker) => marker.setMap(null));

    const newMarkers = sportsData.map((place) => {
      const placeMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude), // 마커 위치
      });
      placeMarker.setMap(map); // 지도에 마커 표시
      window.kakao.maps.event.addListener(placeMarker, "click", () => {
        setSelectedPlace(place);
      });
      return placeMarker;
    });
    setMarkers(newMarkers);
  }, [sportsData]);

  // 지도에 뜨는 내용 나오는 거 누르면 자세히보기로 이동
  const onClickBtn = (id) => {
    navigate(`/postDetail/${id}`);
  };

   // 내 현재 위치 값 보여줌
    const iwPosition = new window.kakao.maps.LatLng(location.lat, location.long);
    const infowindow = new window.kakao.maps.InfoWindow({
      position: iwPosition,
    });
    infowindow.open();
    // Marker 생성 및 지도에 추가
    const marker = new window.kakao.maps.Marker({
      position: iwPosition,
    });

    // 지도에 마커 추가
    marker.setMap(map); // 여기서 map은 이미 생성된 지도 객체를 나타냄

  return (
    <AppContainer>
      <p>
        🏋🏻‍♀️내 주변
        <span>
          "BU<span className="names">DDY" </span>
        </span>
        찾기🏋🏻‍♀️
      </p>
      <h1>
        내가 선택한 종목 : <strong>"{text}"</strong>
      </h1>
      <MapContainer ref={mapRef}></MapContainer>
      <SearchContainer>
        <InputWrapper>
          <Input
            type="text"
            placeholder="원하는 종목을 검색해보세요"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyUp={(e) => {
              if (e.key === "Enter" && searchQuery.trim() !== "") {
                e.preventDefault(); // Enter 키의 기본 동작을 방지
                handleSearchButtonClick();
              }
            }}
          />
        </InputWrapper>
        <Button onClick={handleSearchButtonClick}>확인</Button>
      </SearchContainer>
      {selectedPlace && (
        <InfoWindowContainer>
          <InfoWindowContent>
            <strong>{selectedPlace.title}</strong>
            <br />
            장소: {selectedPlace.place}
            <br />
            일시: {selectedPlace.date},{selectedPlace.time}
            <br />
            모집인원: {selectedPlace.people}
            <br />
            예상비용: {selectedPlace.fee}
            <br />
            일정소개: {selectedPlace.introduction}
            <br />
            <Button onClick={() => onClickBtn(selectedPlace.id)}>
              상세내용보기
            </Button>
          </InfoWindowContent>
        </InfoWindowContainer>
      )}
    </AppContainer>
  );
};

export default KakaoMap;
