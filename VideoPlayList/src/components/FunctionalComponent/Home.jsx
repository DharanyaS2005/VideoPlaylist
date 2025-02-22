import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleDragStart = (event, video, from) => {
    event.dataTransfer.setData('video', JSON.stringify(video));
    event.dataTransfer.setData('from', from);
  };

  const handleDrop = (event, target, index = null) => {
    const video = JSON.parse(event.dataTransfer.getData('video'));
    const from = event.dataTransfer.getData('from');

    if (from === target) {
      if (target === 'left' && index !== null) {
        // Reordering within the left section
        const newVideosLeft = [...videosLeft];
        newVideosLeft.splice(index, 0, newVideosLeft.splice(newVideosLeft.indexOf(video), 1)[0]);
        setVideosLeft(newVideosLeft);
      }
    } else {
      if (target === 'left') {
        setVideosLeft([...videosLeft, video]);
        setVideosRight(videosRight.filter((v) => v.id !== video.id));
      } else {
        setVideosRight([...videosRight, video]);
        setVideosLeft(videosLeft.filter((v) => v.id !== video.id));
      }
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const playAllVideos = async () => {
    for (let video of videosLeft) {
      const videoElement = document.getElementById(video.id);
      if (videoElement) {
        await videoElement.play();
        await new Promise((resolve) =>
          videoElement.addEventListener('ended', resolve, { once: true })
        );
      }
    }
  };

  return (
    <div className="container">
      <nav className="nav-bar">
        <ol className="nav-list">
          <li><Link to="/home" className="link">Home</Link></li>
          <li><Link to="/" className="link">Logout</Link></li>
        </ol>
      </nav>
      <div
        className="left-section"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'left')}
      >
        <div className="header">
          <h3>Your Playlist</h3>
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
            onDrop={(event) => handleDrop(event, 'left', index)} // Added index for reordering
            onDragOver={handleDragOver}
          >
            <video
              id={video.id}
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
          <h3>All Videos</h3>
        </div>
        {videosRight.map((video) => (
          <div
            key={video.id}
            className="video-card"
            draggable
            onDragStart={(event) => handleDragStart(event, video, 'right')}
          >
            <video
              id={video.id}
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
