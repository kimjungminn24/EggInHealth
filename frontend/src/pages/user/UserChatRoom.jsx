import {
    LocalVideoTrack,
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication,
    Room,
    RoomEvent,
} from "livekit-client";
import { useState } from "react";
import VideoComponent from "../../components/common/VideoComponent";
import AudioComponent from "../../components/common/AudioComponent";
import ChatComponent from "../../components/common/ChatComponent"; // 추가
import { useStore } from "../../store/store.js";

// For local development, leave these variables empty
// For production, configure them with correct URLs depending on your deployment
let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

function configureUrls() {
    // If APPLICATION_SERVER_URL is not configured, use default value from local development
    if (!APPLICATION_SERVER_URL) {
        if (window.location.hostname === "localhost") {
            APPLICATION_SERVER_URL = "http://localhost:8080/rtc/";
        } else {
            APPLICATION_SERVER_URL = "https://" + window.location.hostname + ":6443/rtc/";
        }
    }

    // If LIVEKIT_URL is not configured, use default value from local development
    if (!LIVEKIT_URL) {
        if (window.location.hostname === "localhost") {
            LIVEKIT_URL = "ws://localhost:7880/";
        } else {
            LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/";
        }
    }
}

function UserChatRoom() {
    const [room, setRoom] = useState(undefined);
    const [localTrack, setLocalTrack] = useState(undefined);
    const [remoteTracks, setRemoteTracks] = useState([]);
    // const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100));
    const userState = useStore(state => state)
    const participantName = userState.userId
    const roomName = userState.userId

    async function joinRoom() {
        const room = new Room();
        setRoom(room);
    
        room.on(
            RoomEvent.TrackSubscribed,
            (_track, publication, participant) => {
                setRemoteTracks((prev) => [
                    ...prev,
                    { trackPublication: publication, participantIdentity: participant.identity },
                ]);
            }
        );
    
        room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
            setRemoteTracks((prev) =>
                prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid)
            );
        });
    
        try {
            const rtctoken = await getToken(roomName, participantName);
            await room.connect(LIVEKIT_URL, rtctoken);
    
            // 디바이스 접근 권한 확인
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                console.log("Media devices access granted:", stream);
            } catch (err) {
                console.error("Error accessing media devices:", err.name, err.message);
                if (err.name === "NotAllowedError") {
                    console.error("Permissions to access camera and microphone were denied by the user.");
                    alert("Please allow camera and microphone access.");
                } else if (err.name === "NotFoundError") {
                    console.error("No camera or microphone found on this device.");
                    alert("No camera or microphone found. Please connect a device and try again.");
                } else {
                    console.error("An unexpected error occurred:", err);
                }
                throw new Error("Failed to access media devices.");
            }
    
            // 카메라와 마이크 활성화
            const isEnabled = await room.localParticipant.enableCameraAndMicrophone();
            console.log("Camera and microphone enabled:", isEnabled);
    
            if (!isEnabled) {
                throw new Error("Failed to enable camera and microphone.");
            }
    
            const videoPublication = Array.from(room.localParticipant.videoTrackPublications.values())[0];
            if (videoPublication && videoPublication.videoTrack) {
                console.log("Video track publication found:", videoPublication);
                setLocalTrack(videoPublication.videoTrack);
            } else {
                throw new Error("No video track available.");
            }
        } catch (error) {
            console.error("Error occurred:", error.message);
            await leaveRoom();
        }
    }
    
    

    async function leaveRoom() {
        // Leave the room by calling 'disconnect' method over the Room object
        await room?.disconnect();

        // Reset the state
        setRoom(undefined);
        setLocalTrack(undefined);
        setRemoteTracks([]);
    }

    async function getToken(roomName, participantName) {
        APPLICATION_SERVER_URL = "http://localhost:8080/rtc/";
        const response = await fetch(APPLICATION_SERVER_URL + "rtctoken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roomName: roomName,
                participantName: participantName,
            }),
            credentials: "include"
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to get rtctoken: ${error.errorMessage}`);
        }

        const data = await response.json();
        return data.rtctoken;
    }

    let isCamOn = false

    return (
        <>
            {!room ? (
             <div>
                <form
                            onSubmit={(e) => {
                                joinRoom();
                                e.preventDefault();
                            }}
                        >
                            <button
                                className='btn btn-lg btn-success'
                                type='submit'
                                disabled={!roomName || !participantName}
                            >
                                Join!
                            </button>
                        </form>
             </div>   
            ): (
                <div id='room'>
                    <div id='room-header'>
                        <h2 id='room-title'>{roomName}</h2>
                        <button className='btn btn-danger' id='leave-room-button' onClick={leaveRoom}>
                            Leave Room
                        </button>
                    </div>
                    <div id='layout-container'>
                        {localTrack && (
                            <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                        )}
                        {remoteTracks.map((remoteTrack) =>
                            remoteTrack.trackPublication.kind === "video" ? (
                                <VideoComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.videoTrack}
                                    participantIdentity={remoteTrack.participantIdentity}
                                />
                            ) : (
                                <AudioComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.audioTrack}
                                />
                            )
                        )}
                    </div>
                </div>
            )}
            <div>   
                <ChatComponent participantName={participantName} roomName={roomName} receiver={userState.userInfo.trId}/>
            </div>
        </>
    );
}

export default UserChatRoom;
