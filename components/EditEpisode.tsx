import React from "react";
import TextField from "./forms/TextField";
import { useForm } from "react-hook-form";
import { Episode } from "../types/models";
import ModalBody from "./modal/ModalBody";
import ModalActions from "./modal/ModalActions";
import Button from "./Button";

interface Props {
  episode?: Episode
  onClose: () => void
}

interface EditEpisode {
  name: string
  description: string
  publishingDate: string
}

const EditEpisode: React.FC<Props> = ({ episode, onClose }) => {
  const { errors, handleSubmit, register } = useForm<Episode>({ defaultValues: episode })
  console.log(episode)

  async function onSubmit(data: EditEpisode) {
    const res = await fetch(`/api/episodes/${ episode ? episode.id : "" }`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    console.log(res)
  }

  return (
    <>
      <ModalBody>
        <form onSubmit={ handleSubmit(onSubmit) }
              id={ `edit-episode-${ episode ? episode.id : "new" }` }>
          <div className="mt-3 flex flex-col">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              { "Episode bearbeiten" }
            </h3>
            <div className="mt-2">
              <TextField ref={ register } name={ "name" } errors={ errors } label={ "Titel" }/>
              <TextField ref={ register } name={ "description" } errors={ errors } label={ "Beschreibung" } multiline
                         lines={ 3 }/>
              <TextField ref={ register } name={ "publishingDate" } errors={ errors } label={ "Startdatum" }
                         type={ "date" }/>
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
