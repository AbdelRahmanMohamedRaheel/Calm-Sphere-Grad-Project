import React, { useEffect } from "react";

const VideoBack = () => {
  useEffect(() => {
    const video_back = new window.video_background(
      document.getElementById("home"),
      {
        position: "absolute", // Follow page scroll
        zIndex: "-1", // Behind everything
        loop: true, // Loop when it reaches the end
        autoplay: true, // Autoplay at start
        muted: true, // Muted at start
        mp4: "src/assets/upload/preview.mp4", // Path to video mp4 format
        ogg: "src/assets/upload/preview.ogg", // Path to video ogg format
        webm: "src/assets/upload/preview.webm", // Path to video webm format
        video_ratio: 1.7778, // width/height -> If none provided, sizing of the video is set to adjust
        fallback_image: "src/assets/images/dummy.png", // Fallback image path
        priority: "html5", // Priority for HTML5 (if set to flash and tested locally will give a flash security error)
      }
    );

    return () => {
      // Cleanup video background when component unmounts
      if (video_back) {
        // video_back.destroy();
      }
    };
  }, []);

  return <div id="home" style={{ position: "relative" }}></div>;
};

export default VideoBack;
