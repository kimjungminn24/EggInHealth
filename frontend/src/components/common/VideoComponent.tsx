import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";

interface VideoComponentProps {
    track: LocalVideoTrack | RemoteVideoTrack;
    participantIdentity: string;
    local?: boolean;
}

function VideoComponent({ track, participantIdentity, local = false }: VideoComponentProps) {
    const videoElement = useRef<HTMLVideoElement | null>(null);
    console.log(
        '트랙 :',track, '참가자id : ',participantIdentity, '로컬 : ', local
    );

    useEffect(() => {
        if (videoElement.current) {
            track.attach(videoElement.current);
        }

        return () => {
            track.detach();
        };
    }, [track]);

    return (
        <div id={"camera-" + participantIdentity} className="h-full bg-white flex items-center justify-center rounded-[19px]">
            <div className="absolute top-0 left-0">
                <p className="bg-[#f8f8f8] m-0 p-[0_5px] text-[#777777] font-bold rounded-br-[4px]">
                    {local ? "나" : ""}
                </p>
            </div>
            <video ref={videoElement} id={track.sid} className="max-h-[800px] max-w-[1500px] h-full w-auto"></video>
        </div>
    );
}

export default VideoComponent;
