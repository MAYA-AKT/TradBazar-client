import React, { useRef, useState } from "react";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-sdk-ng";

const client = createClient({ mode: "rtc", codec: "vp8" });

const BuyerCall = ({ sellerEmail }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [inCall, setInCall] = useState(false);

  const uid = Math.floor(Math.random() * 100000);

  const joinCall = async () => {
    const res = await fetch(
      `http://localhost:5000/getToken?sellerEmail=${sellerEmail}&uid=${uid}`
    );
    const data = await res.json();
    const token = data.token;
    const channelName = data.channelName;

    await client.join("b1c2d3984bd640638321ace53c71d199", channelName, token, uid);

    const [localAudioTrack, localVideoTrack] = await createMicrophoneAndCameraTracks();
    localVideoTrack.play(localVideoRef.current);
    await client.publish([localAudioTrack, localVideoTrack]);

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") user.videoTrack.play(remoteVideoRef.current);
      if (mediaType === "audio") user.audioTrack.play();
    });

    setInCall(true);
  };

  const leaveCall = async () => {
    await client.leave();
    setInCall(false);
  };

  return (
    <div>
      {!inCall ? (
        <button
          onClick={joinCall}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Join Video Call
        </button>
      ) : (
        <>
          <div className="flex space-x-4 mt-4">
            <div
              className="w-1/2 h-64 bg-gray-200 flex items-center justify-center"
              ref={localVideoRef}
            ></div>
            <div
              className="w-1/2 h-64 bg-gray-300 flex items-center justify-center"
              ref={remoteVideoRef}
            ></div>
          </div>
          <button
            onClick={leaveCall}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Leave Call
          </button>
        </>
      )}
    </div>
  );
};

export default BuyerCall;
