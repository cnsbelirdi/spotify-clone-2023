"use client";

import Dropdown from "@/components/Dropdown";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useAuthModal from "@/hooks/useAuthModal";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Playlist, Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";

interface LibraryContentProps {
  songs: Song[];
  playlists: Playlist[];
}

const LibraryContent: React.FC<LibraryContentProps> = ({
  songs,
  playlists,
}) => {
  const { user, subscription } = useUser();
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const onPlay = useOnPlay(songs);

  const newSong = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Songs</h1>
        <div
          onClick={newSong}
          className="
          flex items-center justify-center gap-x-2
          bg-neutral-800/50 
          rounded-md
          p-2
            text-neutral-400 
            cursor-pointer 
            hover:text-white 
            transition"
        >
          <AiOutlinePlus size={20} />
          <p>New song</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 w-full">
        {songs.length === 0 && <div>No songs found.</div>}
        {songs.length !== 0 &&
          songs.map((song: Song) => (
            <div key={song.id} className="flex items-center gap-x-4 w-full">
              <div className="flex-1">
                <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
              </div>
              <LikeButton songId={song.id} />
              <Dropdown song={song} playlists={playlists} isLibrary />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LibraryContent;
