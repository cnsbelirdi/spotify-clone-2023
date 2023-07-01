import { Lyrics } from "@/types";
import { create } from "zustand";

interface PlaylistModalStore {
  isOpen: boolean;
  lyrics?: Lyrics;
  song_id?: string;
  onOpen: (_lyrics?: Lyrics, _song_id?: string) => void;
  onClose: () => void;
}

const useLyricsModal = create<PlaylistModalStore>((set) => ({
  isOpen: false,
  onOpen: (_lyrics?: Lyrics, _song_id?: string) =>
    set({ isOpen: true, lyrics: _lyrics, song_id: _song_id }),
  onClose: () => set({ isOpen: false }),
}));

export default useLyricsModal;
