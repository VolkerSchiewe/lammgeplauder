import React from "react";
import { GetStaticProps, NextPage } from "next";
import LayoutAdmin from "../../components/LayoutAdmin";
import TexField from "../../components/forms/TextField";
import TextField from "../../components/forms/TextField";
import getPodcast from "../../utils/db/podcast";
import { Podcast } from "../../types/models";
import { useForm } from "react-hook-form";
import { getContrastColor } from "../../utils/contrast-color";
import notifier from "simple-react-notifications2";
import "simple-react-notifications2/dist/index.css";
import { ValidationError } from "../../utils/db/validation";

interface Props {
  podcast: Podcast
}

const AdminPage: NextPage<Props> = ({ podcast }) => {
  const { register, handleSubmit, watch, setError, errors } = useForm<Podcast>({ defaultValues: podcast })

  async function onSubmit(data: Podcast) {
    const res = await fetch("/api/podcast", { method: "POST", body: JSON.stringify(data) })
    if (res.status === 200)
      notifier.success("Podcast updated");
    else {
      notifier.error("Fehler")
      const errors = await res.json()
      errors.forEach((error: ValidationError) => setError(error.field as any, {
        type: "backend",
        message: error.message
      }))
    }
  }

  const color = watch("homepageBackgroundColor")
  return (
    <LayoutAdmin className={ "flex flex-col" }>
      <form className={ "p-5 flex flex-col flex-grow" } onSubmit={ handleSubmit(onSubmit) }>
        <div className={ "text-xl" }>{ "Podcast" }</div>
        <div className={ "space-y-5" }>
          <TexField ref={ register } name={ "name" } label={ "Name" } errors={ errors }/>
          <TexField ref={ register } name={ "description" } label={ "Beschreibung" } multiline lines={ 3 }
                    errors={ errors }/>
          {/*<FileField name={"logoUrl"} label={ "Logo" }/>*/ }
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
                className={ "border rounded py-2 px-4 self-end bg-gray-800 text-white" }>{ "Speichern" }</button>
      </form>
    </LayoutAdmin>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const podcast = await getPodcast()
  return {
    props: {
      podcast: podcast,
    },
    revalidate: 1
  }
}

export default AdminPage
