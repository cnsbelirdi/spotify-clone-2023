import { useEffect, useState, useCallback, useMemo } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Howl } from "howler";

import { Song } from "@/types";
import { formatDuration } from "@/libs/helpers";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import DurationSlider from "./DurationSlider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [sound, setSound] = useState<Howl | null>(null);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = useCallback(() => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  }, [player]);

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  useEffect(() => {
    if (songUrl) {
      const newSound = new Howl({
        src: [songUrl],
        volume: volume,
        format: ["mp3"],
        onplay: () => {
          newSound.off("end");
          setIsPlaying(true);
        },
        onend: () => {
          setIsPlaying(false);
          onPlayNext();
        },
        onpause: () => setIsPlaying(false),
      });

      setSound(newSound);
      setDuration(newSound.duration());

      return () => {
        newSound.unload();
      };
    } else {
      setSound(null);
      setDuration(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPlayNext, songUrl]);

  useEffect(() => {
    if (sound) {
      sound.play();
      setDuration(sound.duration());
    }

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      sound?.play();
    } else {
      sound?.pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
      sound?.volume(1);
    } else {
      setVolume(0);
      sound?.volume(0);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);

    if (sound) {
      sound.volume(value);
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(sound?.seek() || 0);
      if (isPlaying) {
        setAnimationFrameId(requestAnimationFrame(updateCurrentTime));
      }
    };

    if (isPlaying && sound) {
      setAnimationFrameId(requestAnimationFrame(updateCurrentTime));
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animationFrameId, isPlaying, sound, setCurrentTime]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full items-center justify-between">
      <div className="flex w-full ">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden md:flex flex-col">
        <div className="flex items-center gap-x-3">
          <p>{formatDuration(currentTime)}</p>
          <DurationSlider
            value={currentTime}
            maxValue={sound ? sound.duration() : 1}
            onChange={(value) => {
              sound?.seek(value);
            }}
          />
          <p>{formatDuration(sound ? sound.duration() : 0)}</p>
        </div>
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>

      <div className="hidden md:flex justify-end">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value) => handleVolumeChange(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
