"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const player = usePlayer();
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <div
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        py-2 
        pr-4
        rounded-md
        group/play
      "
    >
      <div
        onClick={handleClick}
        className="h-4 w-4 flex items-center justify-center ml-4 "
      >
        <FaPlay
          className="text-neutral-400 hidden group-hover/play:inline transition "
          size={16}
        />
      </div>
      <div
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill
          src={
            data.image_path == ""
              ? "/images/default-song.png"
              : // eslint-disable-next-line react-hooks/rules-of-hooks
                (useLoadImage(data) as string)
          }
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <Link
          href={{
            pathname: "/song",
            query: { id: data.id },
          }}
          className="text-white truncate hover:underline"
        >
          {data.title}
        </Link>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
