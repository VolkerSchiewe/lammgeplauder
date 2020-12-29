import React from "react";
import TextField from "./forms/TextField";
import { useForm } from "react-hook-form";
import { Episode } from "../types/models";
import ModalBody from "./modal/ModalBody";
import ModalActions from "./modal/ModalActions";
import Button from "./Button";
import CheckboxField from "./forms/CheckboxField";
import notifier from "simple-react-notifications2";
import "simple-react-notifications2/dist/index.css";
import uploadFile from "../utils/db/uploadFile";
import getAudioDuration from "../utils/auth/getAudioDuration";
import { getShortHash } from "../utils/hash";

interface Props {
  episode?: Episode
  onClose: () => void
}

interface EditEpisode {
  name: string
  description: string
  publishingDate: string
  published: boolean
  audio: FileList
}


const EditEpisode: React.FC<Props> = ({ episode, onClose }) => {
  const isNewEpisode = !episode
  const { audio, ...defaultValues } = episode || {}
  const { errors, handleSubmit, register } = useForm<Episode>({ defaultValues })

  async function uploadAudio(file: File): Promise<{ url: string, duration: number, hash: string }> {
    const audioUrl = await uploadFile(file)
    const duration = await getAudioDuration(file)
    return { url: audioUrl, duration, hash: await getShortHash("md5", file) }
  }

  async function onSubmit(data: EditEpisode) {
    const audio = isNewEpisode ? await uploadAudio(data.audio[0]) : undefined
    const res = await fetch(`/api/episodes/${ episode ? episode.id : "" }`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        audio: isNewEpisode && audio ? {
          duration: audio.duration,
          url: audio.url,
          size: data.audio[0].size,
          md5Hash: audio.hash,
          mimeType: data.audio[0].type,
        } : undefined
      })
    })
    if (res.ok)
      notifier.success(isNewEpisode ? "Created" : "Updated")
    else
      notifier.error("Fehler")
    onClose()
  }

  return (
    <>
      <ModalBody>
        <form onSubmit={ handleSubmit(onSubmit) }
              id={ `edit-episode-${ episode ? episode.id : "new" }` }>
          <div className="mt-3 flex flex-col">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              { `Episode ${ episode ? "bearbeiten" : "erstellen" }` }
            </h3>
            <div className="mt-2 flex flex-col space-y-2">
              <TextField ref={ register({ required: "Required" }) } name={ "name" } errors={ errors }
                         label={ "Titel" }/>
              <TextField ref={ register({ required: true }) } name={ "description" } errors={ errors }
                         label={ "Beschreibung" } multiline
                         lines={ 3 }/>
              <TextField ref={ register({ required: true }) } name={ "publishingDate" } errors={ errors }
                         label={ "Startdatum" }
                         type={ "date" }/>
              <CheckboxField label={ "Veröffentlichen" } name={ "published" } ref={ register }/>
              <input disabled={ !isNewEpisode } type={ "file" } name={ "audio" }
                     ref={ isNewEpisode ? register({ required: true }) : undefined } accept={ "audio/mp3" }/>
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalActions>
        <Button label={ "Speichern" } type={ "submit" } form={ `edit-episode-${ episode ? episode.id : "new" }` }/>
        <Button label={ "Abbrechen" } onClick={ onClose }/>
      </ModalActions>
    </>
  )
}

export default EditEpisode
