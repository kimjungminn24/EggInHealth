my-react-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├──   common/
│   │   │     ├── Comment.jsx
│   │   │     ├── Chat.jsx
│   │   │     ├── Facechat.jsx
│   │   │     ├── ButtonProfileEdit.jsx
│   │   │     ├── ButtonCheckInbody.jsx
│   │   │     ├── ButtonDisconnect.jsx
│   │   │     ├── ButtonNaverLogin.jsx
│   │   │     ├── ButtonPorofile.jsx
│   │   │     ├── ButtonCamera.jsx
│   │   │     ├── ButtonSwap.jsx
│   │   │     ├── ButtonCheckPTCount.jsx
│   │   │     ├── InbodyPage.jsx
│   │   │     ├── ModalInbody.jsx
│   │   │     ├── ModalAddInbody.jsx
│   │   │     └── ModalDate.jsx
│   │   ├──  user/
│   │   │     ├── UserNavbar.jsx
│   │   │     ├── UserHeader.jsx
│   │   │     ├── ModalDiet.jsx
│   │   │     ├── ModalExercise.jsx
│   │   │     └── ModalRegisterQR.jsx
│   │   └──  trainer/
│   │         ├── TrainerNavbar.jsx
│   │         ├── TrainerHeader.jsx
│   │         ├── TrainerUserDetailHeader.jsx
│   │         ├── ModalMakeCode.jsx
│   │         ├── ModalMakeQR.jsx
│   │         ├── ModalSchedule.jsx
│   │         ├── ModalAddSchedule.jsx
│   │         ├── ModalEditSchedule.jsx
│   │         ├── ModalPT.jsx
│   │         ├── ModalUserList.jsx
│   │         └── ModalAddUserExercise.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── RedirectURI.jsx 
│   │   ├── Select.jsx
│   │   ├── user/
│   │   │    ├── UserSurvey.jsx
│   │   │    ├── UserMain.jsx
│   │   │    ├── UserDiet.jsx
│   │   │    ├── UserChatRoom.jsx
│   │   │    ├── UserCalender.jsx
│   │   │    ├── UserExercise.jsx
│   │   │    └── UserProfile.jsx
│   │   └── trainer/
│   │        ├── TrainerMain.jsx
│   │        ├── TrainerChat.jsx
│   │        ├── TrainerChatRoom.jsx
│   │        ├── TrainerUserList.jsx
│   │        └── TrainerProfile.jsx
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── index.jsx
├── .gitignore
├── package.json
└── README.md


- public/: 정적 파일을 저장하는 디렉토리
- src/: 소스 코드를 저장하는 메인 디렉토리
- assets/: 이미지, 폰트 등 정적 자산을 저장
- components/: 재사용 가능한 컴포넌트를 저장
- common/: 프로젝트 전반에서 공통적으로 사용되는컴포넌트
- specific/: 특정 페이지나 기능에 국한된 컴포넌트
- hooks/: 커스텀 훅을 저장
- pages/: 각 페이지 컴포넌트를 저장
- services/: API 호출 등 비즈니스 로직을 처리하는 파일을 저장
- store/: Zustand 스토어 파일을 저장
- styles/: 전역 스타일 시트(CSS, SCSS 등)를 저장
- utils/: 유틸리티 함수 및 헬퍼 함수를 저장
- App.jsx: 최상위 앱 컴포넌트
- index.jsx: 엔트리 포인트
