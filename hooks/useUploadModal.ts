import { Song } from "@/types";
import { create } from "zustand";

interface UploadModalStore {
  isOpen: boolean;
  song?: Song;
  onOpen: (_song?: Song) => void;
  onClose: () => void;
}

const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  onOpen: (_song?: Song) => set({ isOpen: true, song: _song }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
