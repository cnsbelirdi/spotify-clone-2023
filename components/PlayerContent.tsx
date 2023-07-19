"use client";

import {
  BsPauseFill,
  BsPlayFill,
  BsArrowRepeat,
  BsShuffle,
} from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { useAudio } from "react-use";

import { Song } from "@/types";
import { formatDuration } from "@/libs/helpers";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import DurationSlider from "./DurationSlider";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [isLooping, setIsLooping] = useState(false);

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

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

  const [audio, state, controls, ref] = useAudio({
    src: songUrl,
    autoPlay: true,
    onEnded: onPlayNext,
  });
  const Icon = state.playing ? BsPauseFill : BsPlayFill;
  const VolumeIcon = state.volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  useEffect(() => {
    if (ref.current) {
      ref.current.loop = isLooping;
    }
  }, [isLooping, ref]);

  const handlePlay = () => {
    if (!state.playing) {
      controls.play();
    } else {
      controls.pause();
    }
  };

  const toggleMute = () => {
    if (state.volume === 0) {
      controls.volume(1);
    } else {
      controls.volume(0);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="md:hidden absolute inset-0 -top-2">
        <DurationSlider
          value={state.time}
          maxValue={songUrl ? state.duration : 1}
          onChange={(value) => {
            controls.seek(value);
          }}
          isMobile
        />
      </div>
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} isPlayer />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
              gap-x-4
          "
      >
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={24}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex flex-col">
        <div>{audio}</div>
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <BsShuffle
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer active:scale-90 transition-all"
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <BsArrowRepeat
            onClick={toggleLoop}
            size={24}
            className={twMerge(
              "cursor-pointer transition",
              isLooping
                ? "text-emerald-600 hover:text-emerald-700"
                : "text-neutral-400 hover:text-white"
            )}
          />
        </div>
        <div className="flex items-center gap-x-3">
          <p>{formatDuration(state.time)}</p>
          <DurationSlider
            value={state.time}
            maxValue={songUrl ? state.duration : 1}
            onChange={(value) => {
              controls.seek(value);
            }}
          />
          <p>{formatDuration(songUrl ? state.duration : 0)}</p>
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={state.volume}
            onChange={(value) => controls.volume(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
