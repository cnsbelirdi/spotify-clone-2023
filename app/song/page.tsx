import getLyricsBySongId from "@/actions/getLyricsBySongId";
import getSongById from "@/actions/getSongById";
import Header from "@/components/Header";
import useLoadLyrics from "@/hooks/useLoadLyrics";
import SongContent from "./components/SongContent";
import SongHeader from "./components/SongHeader";

interface SongProps {
  searchParams: { id: string };
}

const Song = async ({ searchParams }: SongProps) => {
  const lyrics = await getLyricsBySongId(searchParams.id);
  if (lyrics) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    lyrics.lines = useLoadLyrics(lyrics);
  }
  const song = await getSongById(searchParams.id);
  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-pink-800 ">
        <SongHeader song={song} />
      </Header>
      <div className="mt-2 mb-7 px-6">
        <SongContent lyrics={lyrics} song={song} />
      </div>
    </div>
  );
};

export default Song;
