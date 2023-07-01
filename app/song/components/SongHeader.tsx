"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface SongHeaderProps {
  song: Song;
}

const SongHeader: React.FC<SongHeaderProps> = ({ song }) => {
  return (
    <div className="mt-20">
      <div
        className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
      >
        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
          <Image
            className="object-cover"
            fill
            src={
              song.image_path === ""
                ? "/images/default-song.png"
                : // eslint-disable-next-line react-hooks/rules-of-hooks
                  (useLoadImage(song) as string)
            }
            alt="Song"
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
          <p className="hidden md:block font-semibold text-sm">{song.author}</p>
          <h1
            className="
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
          >
            {song.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SongHeader;
