import { useRef, useState } from "react";
import { TbMusic, TbMusicOff } from "react-icons/tb";

export const MusicButton = () => {
  const musicFile = "https://res.cloudinary.com/dnqinxiwo/video/upload/v1759073264/better-days_wgkeib.mp3";
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button
        onClick={toggleMusic}
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
      >
        
        {isPlaying ? <TbMusic /> : <TbMusicOff />}
        <span className="text-sm font-medium">
          {isPlaying ? "Tắt nhạc" : "Mở nhạc"}
        </span>
      </button>

      <audio ref={audioRef} src={musicFile} loop />
    </>
  );
};