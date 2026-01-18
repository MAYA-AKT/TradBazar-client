import React, { useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoCall = ({ channelName }) => {
    useEffect(() => {
        let localTracks = [];
        let remoteUsers = {};

        const startCall = async () => {
            const uid = Math.floor(Math.random() * 100000); // unique per user

            // get token from backend
            const { data } = await axios.get("/agora/token", {
                params: { channelName, uid }
            });

            // join channel
            await client.join(
                import.meta.env.VITE_AGORA_APP_ID,
                channelName,
                data.token,
                uid
            );

            // create tracks
            const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            localTracks.push(localAudioTrack, localVideoTrack);

            // play local video
            localVideoTrack.play("local-player");

            // publish tracks
            await client.publish([localAudioTrack, localVideoTrack]);

            // subscribe remote users
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    user.videoTrack.play("remote-player");
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
                remoteUsers[user.uid] = user;
            });

            client.on("user-unpublished", (user) => {
                delete remoteUsers[user.uid];
            });
        };

        startCall();

        return async () => {
            localTracks.forEach((track) => track.close());
            await client.leave();
        };
    }, [channelName]);

    return (
        <div className="grid grid-cols-2 gap-2 h-96">
            <div id="local-player" className="bg-black w-full h-full rounded-lg"></div>
            <div id="remote-player" className="bg-black w-full h-full rounded-lg"></div>
        </div>
    );
};

export default VideoCall;
