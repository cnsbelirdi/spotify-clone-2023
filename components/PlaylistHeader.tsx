"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";
import Image from "next/image";

interface PlaylistHeaderProps {
  playlist: Playlist;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ playlist }) => {
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
              playlist.image_path == ""
                ? "/images/default-playlist.png"
                : // eslint-disable-next-line react-hooks/rules-of-hooks
                  (useLoadImage(playlist) as string)
            }
            alt="Playlist"
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
          <p className="hidden md:block font-semibold text-sm">Playlist</p>
          <h1
            className="
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
          >
            {playlist.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
