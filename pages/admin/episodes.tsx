import React, { useState } from "react";
import { NextPage } from "next";
import LayoutAdmin from "../../components/LayoutAdmin";
import formatDuration from "../../utils/formatDuration";
import Modal from "../../components/Modal";
import EditEpisode from "../../components/EditEpisode";

interface Episode {
  title: string
  description: string
  audio: {
    url: string
    filename: string
    duration: number
    hash: string
  }
  isHidden: boolean
}

const episodes: Array<Episode> = [
  {
    title: "Weihnachtsfolge Teaser",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n" +
      "\n" +
      "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    audio: {
      url: "http://test",
      filename: "final-cut.mp3",
      duration: 55,
      hash: "ukg24k3gk2"
    },
    isHidden: true
  }, {
    title: "Weihnachtsfolge",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n" +
      "\n" +
      "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    audio: {
      url: "http://test",
      filename: "final-cut.mp3",
      duration: 4500,
      hash: "ukg24k3gk2"
    },
    isHidden: false
  }
]
const EpisodesPage: NextPage = () => {
  const [open, setOpen] = useState(false)
  return (
    <LayoutAdmin>
      <Modal open={ open } onClose={ () => setOpen(false) }>
        <EditEpisode/>
      </Modal>

      <div className={ "p-5 space-y-5" }>
        <div>
          <button className={ "border rounded py-1 px-3 inline-flex" }>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            { "Neue Episode" }
          </button>
        </div>
        { episodes.map(({ title, description, audio, isHidden }) => (
          <div
            className={ `grid grid-cols-2 gap-3 border rounded shadow-sm p-5 ${ isHidden ? "bg-gray-100 text-gray-600" : "bg-white" }` }>
            <div className={ "flex flex-col space-y-3" } key={ title }>
              <span className={ "text-2xl font-bold" }>{ title }</span>
              <span>{ audio.filename + " - " + formatDuration(audio.duration) }</span>
            </div>
            <div>
              <p className={ "truncate" }>{ description }</p>
            </div>
            <div className={ "col-start-2 flex justify-end space-x-3" }>
              <button className={ "border rounded py-1 px-3" } onClick={ () => setOpen(true) }>{ "Bearbeiten" }</button>
              <button
                className={ "border rounded py-1 px-3 text-red-800" }>{ isHidden ? "Veröffentlichen" : "Verstecken" }</button>
            </div>
          </div>
        )) }
      </div>
    </LayoutAdmin>
  )
}

export default EpisodesPage
