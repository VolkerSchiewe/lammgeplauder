import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import LayoutAdmin from "../../components/LayoutAdmin";
import TexField from "../../components/forms/TextField";
import TextField from "../../components/forms/TextField";
import { Podcast } from "../../types/models";
import { useForm } from "react-hook-form";
import { getContrastColor } from "../../utils/contrast-color";
import notifier from "simple-react-notifications2";
import "simple-react-notifications2/dist/index.css";
import { ValidationError } from "../../utils/db/validation";
import FileField from "../../components/forms/FileField";
import getImageDimensions from "../../utils/getImageDimensions";
import uploadFile from "../../utils/db/uploadFile";


interface EditPodcast extends Omit<Podcast, "logoUrl"> {
  logo: FileList
}

const EditPodcast: NextPage = () => {
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const { register, handleSubmit, watch, setError, errors, control, reset } = useForm<EditPodcast>()

  function fetchPodcast() {
    fetch("/api/podcast", { method: "GET" })
      .then(res => {
        if (res.ok)
          return res.json();
      })
      .then(data => {
        reset({ ...data, logo: "" })
        setPodcast(data);
      })
      .catch(console.error)
  }

  useEffect(() => {
    fetchPodcast()
  }, [])

  async function onSubmit(data: EditPodcast) {
    const logoUrl = await uploadFile(data.logo[0])

    const res = await fetch("/api/podcast", {
      method: "POST",
      body: JSON.stringify({ ...data, logo: undefined, logoUrl })
    })
    if (res.status === 200) {
      fetchPodcast()
      notifier.success("Podcast updated");
    } else {
      notifier.error("Fehler")
      const errors = await res.json()
      errors.forEach((error: ValidationError) => setError(error.field as any, {
        type: "backend",
        message: error.message
      }))
    }
  }

  async function checkImageSize(fileList?: FileList): Promise<string | boolean> {
    if (fileList && fileList.length > 0) {
      const { width, height } = await getImageDimensions(fileList[0])
      if (width > 3000 || width < 1400 || height > 3000 || height < 1400) {
        return "Invalid dimensions! Image dimensions should be between 1400 and 3000"
      }
      return true
    }
    return false
  }

  const file = watch("logo")
  const previewUrl = file?.length > 0 ? URL.createObjectURL(file[0]) : podcast?.logoUrl
  const color = watch("homepageBackgroundColor")
  return (
    <LayoutAdmin className={ "flex flex-col" }>
      { podcast && (
        <form className={ "p-5 flex flex-col flex-grow" } onSubmit={ handleSubmit(onSubmit) }>
          <div className={ "text-xl" }>{ "Podcast" }</div>
          <div className={ "space-y-5" }>
            <TexField ref={ register } name={ "name" } label={ "Name" } errors={ errors }/>
            <TexField ref={ register } name={ "description" } label={ "Beschreibung" } multiline lines={ 3 }
                      errors={ errors }/>
            <div className={ "flex items-center space-x-2" }>
              <FileField ref={ register({ validate: checkImageSize }) } name={ "logo" } label={ "Logo" }
                         accept={ "image/png,image/jpeg" } errors={ errors } control={ control }/>
              <img className={ "border rounded" } width={ 100 } height={ 100 } src={ previewUrl ?? podcast.logoUrl }
                   alt={ "logoPreview" }/>
            </div>
            <TextField ref={ register } name={ "logoAlt" } label={ "Logo Alt-Text" } errors={ errors }/>
          </div>
          <div className={ "text-xl mt-8" }>{ "Website" }</div>
          <div className={ "flex items-end space-x-5" }>
            <TexField className={ "flex-grow" } ref={ register } name={ "homepageBackgroundColor" }
                      label={ "Homepage Hintergrundfarbe" }
                      placeholder={ "#FFFFFF" } errors={ errors }/>
            <div style={ { backgroundColor: color, color: getContrastColor(color) } }
                 className={ "w-20 h-10 rounded flex justify-center items-center" }>
              Preview
            </div>
          </div>
          <div className={ "flex-grow" }/>
          <button type={ "submit" }
                  className={ "border rounded py-2 px-4 self-end bg-gray-800 text-white mt-5" }>{ "Speichern" }</button>
        </form>
      ) }

    </LayoutAdmin>
  )
}

export default EditPodcast
