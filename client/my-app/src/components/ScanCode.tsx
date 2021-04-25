import React, { useRef } from 'react';
import useCamera from './useCamera';

function ScanCode() {
  const captureOptions = {
    audio: false,
    video: { facingMode: 'environment' }
  };

  const videoRef = useRef<HTMLVideoElement>();
  const mediaStream = useCamera(captureOptions);

  if (mediaStream && videoRef.current && !videoRef?.current?.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef?.current?.play();
  }

  return (
    mediaStream ? <div>
      <h2>Scan the box code...</h2>
      <video ref={videoRef.current?.src} onCanPlay={handleCanPlay} autoPlay playsInline muted />
    </div> : <div>No camera found.</div>
  );
}

export default ScanCode;
