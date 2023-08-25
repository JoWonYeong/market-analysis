# 수성구 카페 상권 분석

<br />

## 💡 1. 프로젝트 소개
![](https://github.com/JoWonYeong/YeongTube/assets/92977925/2bc6043e-560c-476f-afdb-11c0789c7d73)
- 대구 수성구 카페 자영업자들을 위해 수성구 행정동별 카페 상권 정보와 분석을 제공하는 서비스
- 공공 데이터와 연계 기업(CSP mobile lab)에서 제공 받은 카페 판매 데이터를 분석하여 유의미한 결과를 도출하고, 이를 시각화하여 제공

<br />

### ➡️ 개발 기간
- 2022.09 ~ 2022.12

<br />

### ➡️ 개발 환경
![](https://github.com/JoWonYeong/YeongTube/assets/92977925/d06b72df-f6cc-401a-a740-485f01246920)
- 개발도구 : `VSCode`
- 서버 : `Google Cloud`를 통해 `docker`를 활용한 `mongoDB` , `node.js` , `Nginx`,  `Tensorflow` 연동하여 배포
- 클라이언트 : `JavaScript` , `React.js`

<br />

### ➡️ 팀원
|김건준|신지송|이상협|조원영|
| :---: | :---: | :---: | :---: |
| 팀원 | 팀원 | 팀원 | 팀장 |
| 데이터 수집과 분석, 딥러닝 모델 제작 | 데이터 수집과 분석, 데이터 크롤링 | 데이터 수집과 분석, 데이터 크롤링, 서버 구축 | 데이터 수집과 분석, UI 설계, FE 구현 |

<br />

## 💡 2. 주요 기능 
### [ 1 ] 날씨 정보를 제공하고, 이를 이용해 메뉴의 판매량 예측하여 상권 분석
![1](https://user-images.githubusercontent.com/92977925/235345760-eaf36a45-d380-4d4b-8a8b-0cc35821d46f.png)
![3](https://user-images.githubusercontent.com/92977925/235345783-036caf73-2ac0-4461-a8d8-ca10addc4d2e.png)
- 오늘과 내일의 수성구 날씨 정보를 적절한 아이콘과 함께 제공
- 이에 따른 메뉴별 판매 순위 예측해 나타냄

<br />

### [ 2 ] 수성구 행정동별 카페 위치와 수집한 상권 정보 제공
![4](https://user-images.githubusercontent.com/92977925/235345793-fcae4567-e842-44f6-8c15-1b4e89e3ac86.png)
- 지도에서 동을 클릭하면 해당 동의 지도에 카페의 이름과 위치 마커로 표시
-  해당 동의 상권 정보 그래프로 제공

<br />

## 💡 3. 구현
![](https://github.com/JoWonYeong/YeongTube/assets/92977925/8f901d6f-d7d4-4e08-8558-67aefabfe161)

<br />

### ➡️ 데이터 수집
- 제공받은 판매 데이터 : 2022년 1월부터 8월 까지의 매스커피 범물점, 수성구청점의 `하루 총 매출액`, `시간당 매출액`, `메뉴별 판매 개수`

- 수집한 수성구 공공 데이터 중 상권과 관련있는 정보를 가공하여 행정동별로 정리해 최종 데이터 산출
- 행정동별 최종 상권 정보 : `남녀 비율(남/여)` , `평균 연령` , `연간 평균 유동인구(최근 3년 기준)` , `업종별 평균 영업기간`
![](https://velog.velcdn.com/images/wswy17/post/006684fb-2e0e-40f7-94ad-854ff852050f/image.jpg)

- 크롤링 통해 수성구 소재의 요식업 업종별 위치 정보(`식당명` , `도로명 주소` , `지번 주소` , `위도` , `경도`)를 수집
![](https://velog.velcdn.com/images/wswy17/post/22bf7add-bd1b-4c67-bd4e-21bf5e3cc570/image.jpg)

<br />

### ➡️ 딥러닝 모델 구현
![](https://velog.velcdn.com/images/wswy17/post/fd2639a1-947a-4b30-8d7f-69f12e3bfc65/image.jpg)
- 수집한 공공 데이터 중에 판매 데이터와 규칙성 있는 관계를 보이는 기상 데이터를 활용

![스크린샷 2023-08-24 223119](https://github.com/JoWonYeong/YeongTube/assets/92977925/07580656-035a-44f3-8f8a-ee79891e8973)
- Tensorflow 라이브러리로 딥러닝 모델 제작
- 입력값 : 2022년 1~8월 기상 데이터 
- 결과값 : 2022년 1~8월 메뉴별 판매데이터

![스크린샷 2023-08-24 224936](https://github.com/JoWonYeong/YeongTube/assets/92977925/2d4b8bee-aea7-466e-b430-0920147d268e)
- 딥러닝 모델 제작을 위해 작성된 코드에서, 4개의 기상 데이터 `shape: [4]`(`최고기온` , `최저기온` , `전운량` , `풍속`) 입력받음
- 그 값들이 2개의 은닉층 (layer1, layer2)을 거쳐 
56개의 메뉴별 예측 판매량 `units:56` 를 도출하고 실제 판매량과 비교하여 오차를 줄이는 학습을 30000번 `epochs: 30000` 반복
- 이 모델 서버에 저장해서 클라이언트에서 사용

![스크린샷 2023-08-24 223355](https://github.com/JoWonYeong/YeongTube/assets/92977925/f6c71b06-5d08-457c-81ee-9f653fe2c7ed)
- 위 사진은 딥러닝 학습 과정의 일부분으로, `epoch` 옆 숫자는 `학습 횟수`, `RMSE`은 `평균 
제곱근 오차` 의미
- 29999 번째에서의 `평균 제곱근 오차`가 3.07 이고, 이는 이 딥러닝 모델이 예측한 각 메뉴별 판매량이 평균적으로 3개 정도의 오차를 가진다는 의미
- 이후의 학습에서는 오차가 3.07 밑으로 떨어지지 않았고, 이 정도의 오차를 가지는 모델은 신뢰할 수 있다고 판단

<br />

### ➡️ 백엔드 구현
![스크린샷 2023-08-24 225319](https://github.com/JoWonYeong/YeongTube/assets/92977925/40f3a87d-146a-4ce9-a903-e42fcba58471)
- `Google Cloud` 플랫폼을 통해 linux기반 vm 인스턴스를 생성하여 서버 구성
- 서버를 구축하면서 vm 인스턴스가 제대로 작동하지 않을 경우, 새로 구축하기 쉽게 하기 위해 docker-compose를 사용하여 각 도커 이미지들과의의 연동 및 이식성을 높여줌
- `node.js`로 서버 구축, `Nginx`로 배포
- `nginx` 폴더에 서버 배포 관련 파일들이, `nodejs` 폴더에 서버 및 페이지 배포에 필요한 파일들이, `menuPredict` 폴더는 딥러닝 모델이 있음

<br />

### ➡️ 프론트 구현
![스크린샷 2023-08-24 215936](https://github.com/JoWonYeong/YeongTube/assets/92977925/00eb9fef-9169-43ff-ad86-8487df9d8154)
- `기상청 단기예보 공공데이터 API`를 통해 오늘과 내일의 기상 정보를 받아와 이들 값과 시간을 고려해 아이콘과 배경을 다르게 하여 나타냄
-  오늘과 내일의 기상 정보를 서버로 보내서 딥러닝 모델에 의해 예상된 판매량 상위 5가지 메뉴 받아와서 순위대로 나타냄
- ` kakaomap API` 통해 행정동별로 구분된 대구 수성구 지도 제공, 마우스 오버 시 채움색이 변하고 해당 동 이름 마우스 옆에 띄어줌
- 동을 클릭하면 모달이 뜨고,  왼쪽에는 클릭한 동의 지도와 휴게음식점 위치를 마커로 표시
- 오른쪽에는 서버에서 받아온 해당 동의 상권 정보를 `ApexCharts.js` 라이브러리 활용해 시각화하여 나타냄

<br />

## 💡 4. 고찰 및 결론
본 프로젝트에서는 공공 데이터와 판매 데이터를 활용하여 카페 상권 분석 시스템을 구축하였다. 카페 판매 데이터를 제공받아 카페 중심으로 상권 분석을 진행하였지만, 추후에 더 다양한 업종에서 다량의 데이터를 제공받는다면 다른 업종까지 시스템을 확장시킬 수 있을 것이다. 또한 현재 구축한 예상 판매 메뉴 모델에 판매 데이터를 추가하고 다양한 영향 요소를 추가해 정확도를 높인다면 더욱 신뢰성 있는 모델이 될 것이라 기대된다.

<br />

## 💡 5. 참고사항
- UCWIT 2022 한국정보과학회 학술심포지엄 논문 기재
- 팀 노션 : [https://fearless-daughter-e0c.notion.site/4-b5804aeb23fd4505a7b2343ea6cef846](https://www.notion.so/b5804aeb23fd4505a7b2343ea6cef846)
