import React from 'react';
import Modal from 'react-modal';

const VideoModal = ({ isOpen, onRequestClose, video }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>비디오 재생</h2>
      <video width="500" controls>
        <source src={video} type="video/mp4" />
      </video>
      <button onClick={onRequestClose}>닫기</button>
    </Modal>
  );
};

export default VideoModal;
