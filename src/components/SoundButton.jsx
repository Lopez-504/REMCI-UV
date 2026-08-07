import React from 'react';
import clickSound from '../../public/chords-0210.wav'; 

const SoundButton = () => {
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <button onClick={playSound}>
      🔊 Play Sound
    </button>
  );
};

export default SoundButton;