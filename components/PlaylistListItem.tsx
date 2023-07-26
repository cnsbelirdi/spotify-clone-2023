"use client";
import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";

import PlayButton from "./PlayButton";
import Link from "next/link";

interface PlaylistListItemProps {
  data?: Playlist;
}

const PlaylistListItem: React.FC<PlaylistListItemProps> = async ({ data }) => {
  return (
    <div
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          fill
          alt="Image"
          src={
            data?.image_path == ""
              ? "/images/default-song.png"
              : // eslint-disable-next-line react-hooks/rules-of-hooks
                (useLoadImage(data) as string)
          }
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <Link
          href={{
            pathname: "/playlist",
            query: { id: data?.id },
          }}
          className="font-semibold truncate w-full hover:underline"
        >
          {data?.name}
        </Link>
        <p
          className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          Spotify
        </p>
      </div>
      <div
        className="
          absolute 
          bottom-24 
          right-5
        "
        onClick={() => {} /* onClick(data?.id as string) */}
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default PlaylistListItem;
