import React, { useState } from 'react';

const initialVideos = [
  { id: '1', title: 'Video 1', src: '/animation.mp4' },
  { id: '2', title: 'Video 2', src: '/Coca-Cola.mp4' },
  { id: '3', title: 'Video 3', src: '/Rainy_Day.mp4' },
  { id: '4', title: 'Video 4', src: '/Beach.mp4' },
];

const Home = () => {
  const [videos, setVideos] = useState(initialVideos);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('dragIndex', index);
  };

  const handleDrop = (event, dropIndex) => {
    const dragIndex = parseInt(event.dataTransfer.getData('dragIndex'), 10);

    if (dragIndex === dropIndex) return;

    const updatedVideos = [...videos];
    const [draggedVideo] = updatedVideos.splice(dragIndex, 1);
    updatedVideos.splice(dropIndex, 0, draggedVideo);

    setVideos(updatedVideos);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        padding: '20px',
        width: '500px',
        margin: 'auto',
        background: '#f7f7f7',
        borderRadius: '8px',
      }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            background: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Video Preview */}
          <video
            src={video.src}
            width="150"
            height="80"
            controls
            style={{
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          />
          {/* Video Title */}
          <span>{video.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Home;