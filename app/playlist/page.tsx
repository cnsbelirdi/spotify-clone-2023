import React from "react";
import getPlaylistSongsById from "@/actions/getPlaylistSongsById";
import PlaylistContent from "./components/PlaylistContent";
import Header from "@/components/Header";
import getPlaylistById from "@/actions/getPlaylistById";
import getPlaylists from "@/actions/getPlaylists";
import PlaylistHeader from "./components/PlaylistHeader";

interface PlaylistProps {
  searchParams: { id: string };
}

const Playlist = async ({ searchParams }: PlaylistProps) => {
  const playlist = await getPlaylistById(searchParams.id);
  const songs = await getPlaylistSongsById(searchParams.id);
  const playlists = await getPlaylists();
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
      <Header className="from-violet-800 ">
        <PlaylistHeader playlist={playlist} />
      </Header>
      <PlaylistContent
        songs={songs}
        playlists={playlists}
        playlist={playlist}
      />
    </div>
  );
};

export default Playlist;
