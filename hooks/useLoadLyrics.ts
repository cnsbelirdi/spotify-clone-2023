import { Lyrics } from "@/types";

const useLoadLyrics = (lyrics: Lyrics) => {
  if (lyrics === null) {
    return [];
  }

  const lyricsLines: string[] = lyrics.lyrics.split("\\n");

  const cleanedLyricsLines: string[] = lyricsLines.map((line: string) =>
    line.replace(/\\n/g, "")
  );

  return cleanedLyricsLines;
};

export default useLoadLyrics;
