import React, { useState } from "react";
import TextField from "../../../components/forms/TextField";
import { useForm } from "react-hook-form";
import { Episode } from "../../../types/models";
import ModalBody from "./modal/ModalBody";
import ModalActions from "./modal/ModalActions";
import Button from "../../../components/Button";
import CheckboxField from "../../../components/forms/CheckboxField";
import uploadFile from "../../../libs/db/uploadFile";
import getAudioDuration from "../../../utils/getAudioDuration";
import { getHash } from "../../../utils/hash";
import FileField from "../../../components/forms/FileField";
import { FirebaseError } from "@firebase/util";
import { toast } from "react-toastify";

interface Props {
  episode?: Episode;
  onClose: () => void;
}

interface EditEpisode {
  name: string;
  description: string;
  publishingDate: string;
  published: boolean;
  audio: FileList;
}

const EditEpisode: React.FC<Props> = ({ episode, onClose }) => {
  const isNewEpisode = !episode;
  const { audio, ...defaultValues } = episode || {};
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<EditEpisode>({ defaultValues });
  const [loading, isLoading] = useState<boolean>(false);
  const [uploadState, setUploadState] = useState<number>(0);

  async function uploadAudio(
    file: File
  ): Promise<{ url: string; duration: number; hash: string }> {
    const audioUrl = await uploadFile(file, setUploadState);
    const duration = await getAudioDuration(file);
    return { url: audioUrl, duration, hash: await getHash("md5", file) };
  }

  async function onSubmit(data: EditEpisode) {
    try {
      isLoading(true);
      const audio = isNewEpisode ? await uploadAudio(data.audio[0]) : undefined;

      const res = await fetch(`/api/episodes/${episode ? episode.id : ""}`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
          audio:
            isNewEpisode && audio
              ? {
                  duration: audio.duration,
                  url: audio.url,
                  size: data.audio[0].size,
                  md5Hash: audio.hash,
                  mimeType: data.audio[0].type,
                }
              : undefined,
        }),
      });
      if (res.ok)
        toast.success(
          isNewEpisode ? "Episode erstellt" : "Episode geändert"
        );
      else toast.error("Fehler");
      onClose();
    } catch (e) {
      if (e instanceof FirebaseError) toast.error("Unauthorized");
      else throw e;
    } finally {
      isLoading(false);
    }
  }

  return (
    <>
      <ModalBody>
        {loading && (
          <div
            className={
              "fixed inset-0 bg-gray-800 opacity-75 flex justify-center items-center"
            }
          >
            <span
              className={"text-xl font-bold text-white"}
            >{`Loading: ${Math.floor(uploadState)}%`}</span>
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          id={`edit-episode-${episode ? episode.id : "new"}`}
        >
          <div className="mt-3 flex flex-col">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              {`Episode ${episode ? "bearbeiten" : "erstellen"}`}
            </h3>
            <div className="mt-2 flex flex-col space-y-2">
              <TextField
                name="name"
                required={true}
                register={register}
                errors={errors}
                label={"Titel"}
              />
              <TextField
                name="description"
                required={true}
                register={register}
                errors={errors}
                label={"Beschreibung"}
                multiline
                lines={3}
              />
              <TextField
                name="publishingDate"
                required={true}
                register={register}
                errors={errors}
                label={"Startdatum"}
                type={"date"}
              />
              <CheckboxField
                name="published"
                register={register}
                defaultChecked={!episode}
                label={"Veröffentlichen"}
              />
              <FileField
                name="audio"
                required={isNewEpisode}
                register={register}
                label={"Audio Datei"}
                disabled={!isNewEpisode}
                accept={"audio/mp3"}
                errors={errors}
                control={control}
              />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalActions>
        <Button
          label={"Speichern"}
          type={"submit"}
          form={`edit-episode-${episode ? episode.id : "new"}`}
        />
        <Button label={"Abbrechen"} onClick={onClose} />
      </ModalActions>
    </>
  );
};

export default EditEpisode;
