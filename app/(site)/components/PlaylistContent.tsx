import getPlaylistSongsById from "@/actions/getPlaylistSongsById";
import PlaylistListItem from "@/components/PlaylistListItem";
import { Playlist, Song } from "@/types";

interface PlaylistContentProps {
  playlists: Playlist[];
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({ playlists }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Spotify Playlists</h1>
      </div>
      <div
        className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
      >
        {playlists.map((item) => (
          <PlaylistListItem data={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default PlaylistContent;
