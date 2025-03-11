"use client"; // Mark this component as a Client Component

import { useRef, useEffect, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Autoplay the video when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  // Update the current time and duration of the video
  useEffect(() => {
    const video = videoRef.current;

    const updateProgress = () => {
      if (video) {
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
      }
    };

    if (video) {
      video.addEventListener("timeupdate", updateProgress);
      video.addEventListener("loadedmetadata", () => {
        setDuration(video.duration);
      });
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  // Handle seeking in the video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = parseFloat(e.target.value);
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Szia Bátyus, helyzet?</h1>

      {/* Video Player */}
      <video ref={videoRef} autoPlay loop style={styles.media}>
        <source src="/media/starship.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          style={styles.progressBar}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const, // Explicitly type as 'column'
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  media: {
    width: "1200px", // Increased width
    height: "675px", // Increased height
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  text: {
    marginTop: "20px", // Space between the video and text
    fontSize: "1.2rem",
    textAlign: "center" as const, // Explicitly type as 'center'
    maxWidth: "800px", // Match the width of the video
  },
  progressBarContainer: {
    marginTop: "20px",
    width: "800px", // Match the width of the video
  },
  progressBar: {
    width: "100%",
    cursor: "pointer",
  },
};
