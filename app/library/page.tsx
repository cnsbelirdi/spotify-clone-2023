import getSongsByUserId from "@/actions/getSongsByUserId";
import Header from "@/components/Header";
import React from "react";
import LibraryContent from "./components/LibraryContent";
import getPlaylists from "@/actions/getPlaylists";

export const revalidate = 0;

export default async function Library() {
  const userSongs = await getSongsByUserId();
  const userPlaylists = await getPlaylists();
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
      <Header className="from-sky-800 ">
        <div className="mb-2">
          <h1
            className="
            text-white 
              text-3xl 
              font-semibold
            "
          >
            Your Library
          </h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-4">
        <LibraryContent songs={userSongs} playlists={userPlaylists} />
      </div>
    </div>
  );
}
