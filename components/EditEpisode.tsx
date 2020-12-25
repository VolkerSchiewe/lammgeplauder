import React from "react";
import TextField from "./forms/TextField";

const EditEpisode: React.FC = () => (
  <div className="sm:flex sm:items-start">
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
        { "Episode bearbeiten" }
      </h3>
      <div className="mt-2">
        <TextField label={ "Titel" }/>
        <TextField label={ "Beschreibung" } multiline lines={ 3 }/>
        <TextField label={ "Startdatum" } type={ "date" }/>
      </div>
    </div>
  </div>
)

export default EditEpisode
