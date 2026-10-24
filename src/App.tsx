import { useEffect, useRef } from 'react';

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted for browser autoplay policy
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay handled
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black select-none flex items-center justify-center p-0 m-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover bg-black"
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src="/assets/aistudio/armoax2_2ef98b78.mov" type="video/quicktime" />
        <source src="/assets/aistudio/armoax2_2ef98b78.mov" type="video/mp4" />
        <source src="/armoax2_web.mp4" type="video/mp4" />
        <source src="/armoax2.mp4" type="video/mp4" />
        <source src="/armoax2.mov" type="video/quicktime" />
      </video>
    </div>
  );
}
