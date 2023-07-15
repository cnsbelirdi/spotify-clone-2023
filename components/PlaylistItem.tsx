"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";

import PlayButton from "./PlayButton";
import Link from "next/link";

interface PlaylistItemProps {
  data: Playlist;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ data }) => {
  const imageUrl = useLoadImage(data) as string;
  return (
    <Link
      key={data.id}
      href={{
        pathname: "/playlist",
        query: { id: data.id },
      }}
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
    >
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
            data.image_path == "" ? "/images/default-playlist.png" : imageUrl
          }
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.name}</p>
        <p className="text-neutral-400 text-sm truncate">Playlist</p>
      </div>
    </Link>
  );
};

export default PlaylistItem;
