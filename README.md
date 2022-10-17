# 룰루랩 - 병원 예약 시스템 구축
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=TypeORM&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/postman-%23FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>

## 개요

원티드 프리온보딩 2주차 과제입니다.

병원 예약 관련 시스템으로, 병원 예약 목록 조회, 예약 등록 및 수정을 할 수 있습니다.

- 개발기간: 2022.10.15 - 2022.10.16 
- 개발인원: 김현정

<br>

## 프로젝트 구조

### DB모델링

![2주차 - 하이퍼클라우드](https://user-images.githubusercontent.com/110225060/196066269-e423a0d4-24a8-46c3-9c4f-083bbff736e8.png)

<br>

## 구현 기능

### 1. 병원 목록 조회
- 날짜를 필수 값으로 입력 받아 병원 목록을 조회하여 해당 일자의 병원의 예약 가능 여부를 확인할 수 있습니다.

### 2. 병원 예약 가능 시간 조회
- 선택한 병원의 예약 가능한 시간대를 확인할 수 있습니다.
- 이미 예약이 된 시간대는 조회가 되지 않습니다.
- 날짜는 입력은 필수 입니다.

### 3. 병원 예약 조회
- 예약 번호를 입력하여 예약정보를 조회할 수 있습니다.

### 4. 병원 예약 등록
- 예약자 정보 및 예약 정보를 입력받아 예약자 테이블과 예약 테이블로 각각 저장되도록 구현하였습니다.
- 예약을 등록하는 날짜 + 일련번호로 예약 번호가 생성됩니다.
<br> ex) 20221017000001
- 예약을 등록하고자 하는 날짜에 이미 예약이 된 시간대는 예약이 되지 않습니다.
- 한 번이라도 예약을 한 뒤 방문하지 않은 사용자는 예약이 불가능합니다.
- 예약 종류는 테이블을 따로 두어 ID값으로 입력받도록 하였습니다.
  <br> ex) 1: 진료 | 2: 검진 | 3: 입원 | 4: 처방

### 5. 병원 예약 수정
- 예약 번호를 입력하여 예약정보를 수정할 수 있습니다.

### 6. 병원 예약 취소
- 예약 번호를 입력하여 병원 예약을 취소할 수 있습니다.

### 7. 방문여부 반영
- 예약자의 방문여부를 설정할 수 있습니다.
- 예약자가 방문하지 않았다면 noshow 테이블에 데이터가 입력됩니다.

<br>

## API doc

### Postman

- 👉 [Postman API doc](https://documenter.getpostman.com/view/22723303/2s847CvaGt)
