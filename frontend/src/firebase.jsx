import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { receiveToken } from './api/user';

const firebaseConfig = {
  apiKey: import.meta.env.FCM_API_KEY,
  authDomain: import.meta.env.FCM_AUTH_DOMAIN,
  projectId: import.meta.env.FCM_PROJECT_ID,
  storageBucket: import.meta.env.FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.FCM_APP_ID,
  measurementId: import.meta.env.FCM_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission(){
    console.log("권한 요청중");

    const permission = await Notification.requestPermission();
    if(permission === "denied"){
        console.log("알림 권한 허용 안됨");
        return;
    }

    console.log("권한 허용됨.");

    const deviceToken = await getToken(messaging, {
        vapidKey: import.meta.env.FCM_KEY,
    });

    if(deviceToken){
        receiveToken(deviceToken);
        console.log("deviceToken: ", deviceToken);
    }
    else
        console.log("Can not get deviceToken");

    onMessage(messaging, (payload) => {
        console.log("메세지 도착", payload);
    });
}

export {requestPermission};