"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Playlist, Song } from "@/types";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import Image from "next/image";
import Link from "next/link";
import usePlaylistModal from "@/hooks/usePlaylistModal";
import useLoadImage from "@/hooks/useLoadImage";

interface LibraryProps {
  playlists: Playlist[];
}

const Playlists: React.FC<LibraryProps> = ({ playlists }) => {
  const { user } = useUser();
  const playlistModal = usePlaylistModal();
  const authModal = useAuthModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return playlistModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Playlists</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
            text-neutral-400 
            cursor-pointer 
            hover:text-white 
            transition
          "
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        <Link
          href={"/liked"}
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
              src="/images/liked.png"
              alt="MediaItem"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="text-white truncate">Liked Songs</p>
            <p className="text-neutral-400 text-sm truncate">Playlist</p>
          </div>
        </Link>
        {playlists.map((item) => (
          <Link
            key={item.id}
            href={`/playlist?id=${item.id}`}
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
                  item.image_path == ""
                    ? "/images/default-playlist.png"
                    : // eslint-disable-next-line react-hooks/rules-of-hooks
                      (useLoadImage(item) as string)
                }
                alt="MediaItem"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
              <p className="text-white truncate">{item.name}</p>
              <p className="text-neutral-400 text-sm truncate">Playlist</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
