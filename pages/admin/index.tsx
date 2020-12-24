import React from "react";
import { NextPage } from "next";
import LayoutAdmin from "../../components/LayoutAdmin";
import TexField from "../../components/forms/TextField";
import FileField from "../../components/forms/FileField";


const AdminPage: NextPage = () => {
  // Todo get initial data
  return (
    <LayoutAdmin className={ "flex flex-col" }>
      <form className={ "p-5 flex flex-col flex-grow" }>
        <div className={ "text-xl" }>{ "Podcast" }</div>
        <div className={ "space-y-5" }>
          <TexField label={ "Podcast Name" }/>
          <TexField label={ "Podcast Beschreibung" } multiline lines={ 3 }/>
          <FileField label={ "Podcast Logo" }/>
        </div>
        <div className={ "text-xl mt-8" }>{ "Website" }</div>
        <TexField label={ "Homepage Hintergrundfarbe" } placeholder={ "#FFFFFF" }/>
        <div className={ "flex-grow" }/>
        <button type={ "submit" }
                className={ "border rounded py-2 px-4 self-end bg-gray-800 text-white" }>{ "Speichern" }</button>
      </form>
    </LayoutAdmin>
  )
}

export default AdminPage
