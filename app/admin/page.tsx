'use client'

import { useCallback, useEffect, useState } from "react";
import FileField from "../../components/forms/FileField";
import TexField from "../../components/forms/TextField";
import { Podcast } from "../../types/models";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import uploadFile from "../../libs/db/uploadFile";
import { ValidationError } from "../../libs/db/validation";
import { FirebaseError } from "firebase/app";
import getImageDimensions from "../../utils/getImageDimensions";
import Image from "next/image"
import TextField from "../../components/forms/TextField";
import { getContrastColor } from "../../utils/contrast-color";

interface EditPodcast extends Omit<Podcast, "logoUrl"> {
    logo: FileList;
  }
export default function AdminPage(){
    const [podcast, setPodcast] = useState<Podcast | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    control,
    reset,
  } = useForm<EditPodcast>();
  const fetchPodcast = useCallback(()=> fetch("/api/podcast", { method: "GET" })
  .then((res) => {
    if (res.ok) return res.json();
    else throw Error("Unauthorized");
  })
  .then((data) => {
    reset({ ...data, logo: "" });
    setPodcast(data);
  })
  .catch((e) => {
    toast.error(e.message);
  }), [reset])

  useEffect(() => {
    fetchPodcast();
  }, [fetchPodcast]);

  async function onSubmit(data: EditPodcast) {
    try {
      const logoUrl = data.logo.length
        ? await uploadFile(data.logo[0])
        : podcast?.logoUrl;

      const res = await fetch("/api/podcast", {
        method: "POST",
        body: JSON.stringify({ ...data, logo: undefined, logoUrl }),
      });
      if (res.status === 200) {
        fetchPodcast();
        toast.success("Podcast geändert");
      } else {
        toast.error("Fehler");
        const errors = await res.json();
        errors.forEach((error: ValidationError) =>
          setError(error.field as any, {
            type: "backend",
            message: error.message,
          })
        );
      }
    } catch (e) {
      if (e instanceof FirebaseError) toast.error("Unauthorized");
      else throw e;
    }
  }

  async function checkImageSize(
    fileList?: FileList
  ): Promise<string | boolean> {
    if (fileList && fileList.length > 0) {
      const { width, height } = await getImageDimensions(fileList[0]);
      if (width > 3000 || width < 1400 || height > 3000 || height < 1400) {
        return "Invalid dimensions! Image dimensions should be between 1400px and 3000px";
      }
      return true;
    } else if (podcast?.logoUrl) {
      return true;
    }
    return "Image missing";
  }

  const file = watch("logo");

  const previewUrl =
    file?.length > 0 ? URL.createObjectURL(file[0]) : podcast?.logoUrl;
  const color = watch("homepageBackgroundColor");
    return <>
    {podcast && (
        <form
          className={"p-5 flex flex-col flex-grow"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={"text-xl"}>{"Podcast"}</div>
          <div className={"space-y-5"}>
            <TexField
              name="name"
              register={register}
              label={"Name"}
              errors={errors}
            />
            <TexField
              name="description"
              register={register}
              label={"Beschreibung"}
              multiline
              lines={3}
              errors={errors}
            />
            <div className={"flex items-center space-x-2"}>
              <FileField
                name="logo"
                validate={checkImageSize}
                register={register}
                label={"Logo"}
                accept={"image/png,image/jpeg"}
                errors={errors}
                control={control}
              />
              <Image
                className={"border rounded"}
                width={100}
                height={100}
                src={previewUrl ?? podcast.logoUrl}
                alt={"logoPreview"}
              />
            </div>
            <TextField
              name="logoAlt"
              register={register}
              label={"Logo Alt-Text"}
              errors={errors}
            />
          </div>
          <div className={"text-xl mt-8"}>{"Website"}</div>
          <div className={"flex items-end space-x-5"}>
            <TexField
              name="homepageBackgroundColor"
              register={register}
              className={"flex-grow"}
              label={"Homepage Hintergrundfarbe"}
              placeholder={"#FFFFFF"}
              errors={errors}
            />
            <div
              style={{ backgroundColor: color, color: getContrastColor(color) }}
              className={
                "w-10 h-10 rounded-full flex justify-center items-center"
              }
            ></div>
          </div>
          <div className={"flex-grow"} />
          <button
            type={"submit"}
            className={
              "border rounded py-2 px-4 self-end bg-gray-800 text-white mt-5"
            }
          >
            {"Speichern"}
          </button>
        </form>
      )}
      </>
}