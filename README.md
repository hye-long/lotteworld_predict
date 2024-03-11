# 롯데월드에 언제 갈까?? 
# 실시간 날씨 정보와 날짜 정보를 활용하여 최적의 날짜 추천 서비스 

공부 도중, 자바스크립트를 활용하여 만든 간단한 웹페이지 

## 활용 데이터
https://openweathermap.org/api
오픈 weather 사이트에서 제공하는 실시간 날씨 정보 API활용 / 

실시간의 날씨가 아니라 날씨 예보에 관해 데이터가 필요했으므로
무료 API중 5일간의 날짜가 3시간마다 업데이트 되는 API 활용


## 프로젝트 설계
1. 주말이 혼잡할 것이므로 주말보다는 평일에 가는 것을 추천
2. 기온이 좋을수록 놀이공원을 잘 즐길 수 있으므로 기온이 낮은날보다 높은날을 추천

<br>

더 추천해주고 싶은 날짜에 더 높은 점수를 부여하여 점수가 더 높은 날짜를 출력하기로 한다. 

## 구현 모습 
<img height="380" src="https://github.com/hye-long/Baekjoon/assets/159509656/7cbf766f-0306-45b5-8edb-dd162e8fdd73">

<br>
'최적의 날짜' 라는 버튼을 누르면 앞으로의 5일간 중 추천해줄만한 날짜와 총점이 표시된다.

<img height="380" src="https://github.com/hye-long/Baekjoon/assets/159509656/e132d0bd-3180-4428-bf62-2331b02cda3f">
<br>
해당 날짜를 누르면 날짜와 날씨가 각각 얼만큼의 점수가 매겨졌는지에 관해 나온다.
<br>
그리고 5번을 다 눌러 JSON 파일에 있던 5일간의 날짜가 다 출력이 되면 끝났다는 메시지가 뜬다. 

## 소감
자바스크립트를 공부하다가 정말 간단하게 구현을 해본 것이었는데 생각보다 어려웠던 것 같다...
그래도 API를 활용한 실시간 동적페이지를 처음으로 만들어봐서 재미있었다. 
자바스크립트를 공부하기 위한 것이므로 정말 간단하게 구현하긴 했는데 앞으로는 조금 더 많은 데이터와 더욱 복잡한 웹사이트를 만들 수 있을 것 같다. 

