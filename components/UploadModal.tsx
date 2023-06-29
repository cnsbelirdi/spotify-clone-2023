"use client";

import uniqid from "uniqid";
import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>();

  const defaultFormValues = {
    author: "",
    title: "",
    song: null,
    image: null,
  };

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!uploadModal.song && (!songFile || !user)) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      const songPath = songFile
        ? `song-${values.title}-${uniqueID}`
        : uploadModal.song
        ? uploadModal.song.song_path
        : "";
      // Upload song
      if (!uploadModal.song && songFile) {
        const { data: songData, error: songError } =
          await supabaseClient.storage
            .from("songs")
            .upload(songPath, songFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (songError) {
          setIsLoading(false);
          return toast.error("Failed song upload");
        }
      }

      const imagePath = imageFile
        ? `image-${values.name}-${uniqueID}`
        : uploadModal.song
        ? uploadModal.song.image_path
        : "";

      console.log(imagePath);
      // Upload image
      if (!uploadModal.song && imageFile) {
        const { error: imageError } = await supabaseClient.storage
          .from("images")
          .upload(imagePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed image upload");
        }
      }

      // Create record
      if (uploadModal.song) {
        const { error: supabaseError } = await supabaseClient
          .from("songs")
          .update({
            title: values.title,
            author: values.author,
            image_path: imagePath,
            song_path: songPath,
          })
          .eq("id", uploadModal.song.id);
        if (supabaseError) {
          return toast.error(supabaseError.message);
        }
        toast.success("Song updated!");
      } else {
        const { error: supabaseError } = await supabaseClient
          .from("songs")
          .insert({
            user_id: user?.id,
            title: values.title,
            author: values.author,
            image_path: imagePath,
            song_path: songPath,
          });
        if (supabaseError) {
          return toast.error(supabaseError.message);
        }
        toast.success("Song created!");
      }
      router.refresh();
      setIsLoading(false);
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (uploadModal.song) {
      setValue("author", uploadModal.song.author);
      setValue("title", uploadModal.song.title);
    }
  }, [uploadModal.song, setValue]);

  return (
    <Modal
      title={uploadModal.song ? "Update the song" : "Create a new song"}
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
        autoComplete="off"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", {
            required: true,
          })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register("song", { required: uploadModal.song ? false : true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register("image", { required: false })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
