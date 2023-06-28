"use client";
import Dropdown from "@/components/Dropdown";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Playlist, Song } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface PlaylistContentProp {
  songs: Song[];
  playlists: Playlist[];
  playlist: Playlist;
}
const PlaylistContent: React.FC<PlaylistContentProp> = ({
  songs,
  playlists,
  playlist,
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router, playlist]);

  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        No song in playlist.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: any) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id) => onPlay(id)} data={song} />
          </div>

          <LikeButton songId={song.id} />
          <Dropdown
            songId={song.id}
            playlists={playlists}
            isPlaylist={playlist.user_id === user?.id}
            playlistId={playlist.id}
          />
        </div>
      ))}
    </div>
  );
};

export default PlaylistContent;
