"use client";
import getSongById from "@/actions/getSongById";
import useAuthModal from "@/hooks/useAuthModal";
import useLyricsModal from "@/hooks/useLyricsModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { Lyrics, Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import uniqid from "uniqid";
interface SongContentProps {
  lyrics: Lyrics;
  song: Song;
}

const SongContent: React.FC<SongContentProps> = async ({ lyrics, song }) => {
  const { subscription, user } = useUser();
  const lyricsModal = useLyricsModal();
  const handleLyrics = () => {
    lyricsModal.onOpen(lyrics, song.id);
  };
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Lyrics</h1>
        <div
          onClick={handleLyrics}
          className={`
          ${
            !subscription || user?.id !== song.user_id ? "hidden" : "flex"
          } items-center justify-center gap-x-2
          bg-neutral-800/50 
          rounded-md
          p-2
          text-neutral-400 
          cursor-pointer 
          hover:text-white 
          transition`}
        >
          <AiOutlinePlus size={20} />
          <p>{lyrics ? "Edit" : "Add"} Lyrics</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 w-full">
        {!lyrics ? (
          <div>No lyrics for song.</div>
        ) : (
          lyrics.lines?.map((line) => <div key={uniqid()}>{line}</div>)
        )}
      </div>
    </div>
  );
};

export default SongContent;
