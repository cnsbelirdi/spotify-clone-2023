"use client";

import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import useLyricsModal from "@/hooks/useLyricsModal";

const LyricsModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const lyricsModal = useLyricsModal();

  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      lyricsModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      if (lyricsModal.lyrics) {
        const { error: supabaseError } = await supabaseClient
          .from("lyrics")
          .update({
            song_id: lyricsModal.song_id,
            lyrics: values.lyrics,
          })
          .eq("id", lyricsModal.lyrics.id);

        if (supabaseError) {
          return toast.error(supabaseError.message);
        }
        toast.success("Lyrics updated!");
      } else {
        const { error: supabaseError } = await supabaseClient
          .from("lyrics")
          .insert({
            song_id: lyricsModal.song_id,
            lyrics: values.lyrics,
          });

        if (supabaseError) {
          return toast.error(supabaseError.message);
        }
        toast.success("Lyrics added!");
      }
      router.refresh();
      setIsLoading(false);
      reset();
      lyricsModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lyricsModal.lyrics) {
      setValue("lyrics", lyricsModal.lyrics.lyrics);
    }
  }, [lyricsModal.lyrics, setValue]);

  return (
    <Modal
      title={lyricsModal.lyrics ? "Edit the song lyrics" : "Add lyrics to song"}
      description="Don't forget to add '\n' end of the each line!"
      isOpen={lyricsModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
        autoComplete="off"
      >
        <textarea
          className="flex w-full h-64 rounded-md bg-neutral-700 border border-transparent p-3 text-sm outline-none resize-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
          placeholder="Lyrics"
          id="lyrics"
          {...register("lyrics", { required: false })}
        ></textarea>
        <Button disabled={isLoading} type="submit">
          {lyricsModal.lyrics ? "Edit" : "Add"} Lyrics
        </Button>
      </form>
    </Modal>
  );
};

export default LyricsModal;
