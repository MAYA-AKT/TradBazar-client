import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "c7a28543c05e4c9a86dbcbba55f4a911";

const VideoCall = () => {
    const { channelName } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { token, uid } = state || {};
    const initializedRef = useRef(false);

    const clientRef = useRef(null);
    const tracksRef = useRef([]);

    useEffect(() => {
        if (initializedRef.current) {
            console.log("⚠️ Agora already initialized, skipping...");
            return;
        }
        initializedRef.current = true;

        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = client;

        const init = async () => {
            try {
                console.log("🎥 Joining channel:", channelName);

                await client.join(APP_ID, channelName, token, uid);

                let tracks = [];
                try {
                    tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
                    console.log("🎤🎥 Mic & camera tracks created");
                } catch {
                    console.warn("⚠️ No camera found — audio only");
                    tracks = [await AgoraRTC.createMicrophoneAudioTrack()];
                }

                tracksRef.current = tracks;
                await client.publish(tracks);

                if (tracks[1]) tracks[1].play("local-player");

                client.on("user-published", async (user, mediaType) => {
                    await client.subscribe(user, mediaType);
                    if (mediaType === "video") user.videoTrack.play("remote-player");
                    if (mediaType === "audio") user.audioTrack.play();
                });

                console.log("✅ Agora connected successfully");
            } catch (err) {
                console.error("🔥 Agora join failed:", err);
            }
        };

        init();

        return () => {
            console.log("🧹 Cleanup triggered");
        };
    }, []);


    // 🔴 END CALL FUNCTION
    const endCall = async () => {
        console.log("❌ Ending call...");

        try {
            tracksRef.current.forEach(track => {
                track.stop();
                track.close();
            });

            if (clientRef.current) {
                await clientRef.current.leave();
            }

            console.log("✅ Call ended successfully");
        } catch (err) {
            console.error("⚠️ Error ending call:", err);
        }

        navigate(-1); // go back
    };

    return (
        <div className=" h-[400px] md:h-[600px] my-20 max-w-7xl mx-auto bg-black flex flex-col">
            <h2 className="text-white text-center p-2">
                Live Product Verification Call
            </h2>

            <div className="flex flex-1 gap-2 p-2">
                <div
                    id="local-player"
                    className="flex-1 bg-gray-800 rounded"
                ></div>

                <div
                    id="remote-player"
                    className="flex-1 bg-gray-800 rounded"
                ></div>
            </div>

            {/* 🔴 CUT CALL BUTTON */}
            <div className="p-4 flex justify-center">
                <button
                    onClick={endCall}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold"
                >
                    ❌ End Call
                </button>
            </div>
        </div>
    );
};

export default VideoCall;
