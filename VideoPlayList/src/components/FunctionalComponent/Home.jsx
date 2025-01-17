import React, { useState, useRef } from 'react';
import './Home.css';

const initialVideosLeft = [
  { id: '1', title: 'Video 1', src: '/animation.mp4' },
  { id: '2', title: 'Video 2', src: '/Coca-Cola.mp4' },
];

const initialVideosRight = [
  { id: '3', title: 'Video 3', src: '/Rainy_Day.mp4' },
  { id: '4', title: 'Video 4', src: '/Beach.mp4' },
  { id: '5', title: 'Video 5', src: '/Explainer.mp4' },
  { id: '6', title: 'Video 6', src: '/Puppies.mp4' },
];

const Home = () => {
  const [videosLeft, setVideosLeft] = useState(initialVideosLeft);
  const [videosRight, setVideosRight] = useState(initialVideosRight);
  const videoRefs = useRef([]);

  const handleDragStart = (event, video, from) => {
    event.dataTransfer.setData('video', JSON.stringify(video));
    event.dataTransfer.setData('from', from);
  };

  const handleDrop = (event, target) => {
    const video = JSON.parse(event.dataTransfer.getData('video'));
    const from = event.dataTransfer.getData('from');

    if (target === 'left' && from === 'right') {
      setVideosLeft((prev) => [...prev, video]);
      setVideosRight((prev) => prev.filter((v) => v.id !== video.id));
    } else if (target === 'right' && from === 'left') {
      setVideosRight((prev) => [...prev, video]);
      setVideosLeft((prev) => prev.filter((v) => v.id !== video.id));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const playAllVideos = async () => {
    for (let i = 0; i < videosLeft.length; i++) {
      const videoElement = videoRefs.current[i];
      if (videoElement) {
        videoElement.play();
        await new Promise((resolve) => {
          const onVideoEnd = () => {
            videoElement.removeEventListener('ended', onVideoEnd);
            resolve();
          };
          videoElement.addEventListener('ended', onVideoEnd);
        });
      }
    }
  };

  return (
    <div className="container">
      <div
        className="left-section"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'left')}
      >
        <div className="header">
        <h3>Your PlayList</h3>
        <button className="play-all-btn" onClick={playAllVideos}>
          Play All
        </button>
        </div>
        {videosLeft.map((video, index) => (
          <div
            key={video.id}
            className="video-card"
            draggable
            onDragStart={(event) => handleDragStart(event, video, 'left')}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              width="150"
              height="80"
              controls
              className="video-preview"
            />
            <span>{video.title}</span>
          </div>
        ))}
      </div>

      <div
        className="right-section"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'right')}
      >
        <div className="header">
        <h3> All videos</h3>
        </div>
        {videosRight.map((video) => (
          <div
            key={video.id}
            className="video-card"
            draggable
            onDragStart={(event) => handleDragStart(event, video, 'right')}
          >
            <video
              src={video.src}
              width="150"
              height="80"
              controls
              className="video-preview"
            />
            <span>{video.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
