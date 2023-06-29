"use client";
import useAuthModal from "@/hooks/useAuthModal";
import usePlaylistModal from "@/hooks/usePlaylistModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Playlist, Song } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { BiDotsVerticalRounded, BiChevronRight } from "react-icons/bi";

interface DropdownProps {
  song: Song;
  playlists: Playlist[];
  isPlaylist?: boolean;
  playlistId?: string;
  isLibrary?: boolean;
}

const Dropdown: React.FC<DropdownProps> = async ({
  song,
  playlists,
  isPlaylist = false,
  playlistId,
  isLibrary = false,
}) => {
  const router = useRouter();
  const playlistModal = usePlaylistModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return playlistModal.onOpen();
  };

  const handleAddToPlaylist = async (_playlistId: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    const { data: existingData } = await supabaseClient
      .from("playlist_songs")
      .select("*")
      .eq("playlist_id", _playlistId)
      .eq("song_id", song.id);

    if (!existingData || existingData.length === 0) {
      const { error } = await supabaseClient
        .from("playlist_songs")
        .insert({ playlist_id: _playlistId, song_id: song.id });

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Song is added successfully to the playlist");
    } else {
      toast.error("Song is already exist in this playlist");
    }
  };

  const handleRemoveFromPlaylist = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    const { error } = await supabaseClient
      .from("playlist_songs")
      .delete()
      .eq("playlist_id", playlistId)
      .eq("song_id", song.id);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Song is removed successfully from the playlist");
    router.refresh();
  };

  const handleUpdateSong = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    uploadModal.onOpen(song);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="hover:opacity-75 transition outline-none"
          aria-label="Customise options"
        >
          <BiDotsVerticalRounded size={25} className="rotate-90" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-neutral-800 rounded-md p-1 w-40"
          sideOffset={5}
        >
          <DropdownMenu.Item className="text-sm px-3 py-2 outline-none hover:bg-neutral-700 transition cursor-pointer rounded-md">
            Go to song page
          </DropdownMenu.Item>
          {isLibrary && (
            <DropdownMenu.Item
              onClick={handleUpdateSong}
              className="text-sm px-3 py-2 outline-none hover:bg-neutral-700 transition cursor-pointer rounded-md"
            >
              Edit Song
            </DropdownMenu.Item>
          )}
          {isPlaylist && (
            <DropdownMenu.Item
              onClick={handleRemoveFromPlaylist}
              className="text-sm px-3 py-2 outline-none hover:bg-neutral-700 transition cursor-pointer rounded-md"
            >
              Remove from this playlist
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger
              className={`${
                user ? "flex" : "hidden"
              } items-center justify-between text-sm pl-3 py-2 outline-none hover:bg-neutral-700 transition cursor-pointer rounded-md data-[state=open]:bg-neutral-700`}
            >
              Add to playlist
              <div>
                <BiChevronRight size={20} />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="bg-neutral-800 rounded-md p-1"
                sideOffset={2}
              >
                <DropdownMenu.Item
                  onClick={onClick}
                  className="text-sm px-3 py-2 outline-none hover:bg-neutral-700 transition cursor-pointer rounded-md"
                >
                  Create playlist
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-[1px] bg-neutral-700 my-1" />
                {playlists.map((playlist) => (
                  <DropdownMenu.Item
                    key={playlist.id}
                    onClick={() => handleAddToPlaylist(playlist.id)}
                    className="text-sm px-3 py-2 outline-none hover:bg-neutral-700 transition cursor-pointer rounded-md"
                  >
                    {playlist.name}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          {/* <DropdownMenu.Item className="text-sm px-3 py-2 outline-none hover:bg-neutral-700 transition cursor-pointer rounded-md">
            Share
          </DropdownMenu.Item> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
