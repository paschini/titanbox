import { useState, useEffect } from 'react';

function UseCamera(requestCamera: MediaStreamConstraints) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestCamera);
        setMediaStream(stream);
      } catch(error) {
        console.error(error);
        return null;
      }
    }

    if (!mediaStream) {
      enableStream().then(r => r);
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  }, [mediaStream, requestCamera]);

  return mediaStream;
}

export default UseCamera;