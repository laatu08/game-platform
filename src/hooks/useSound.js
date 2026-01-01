import { useRef } from "react";

export function useSound(src, volume = 0.5) {
  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
  }

  const play = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return play;
}
