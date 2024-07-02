"use client"

import React, { useState } from "react";
import { Episode } from "../types/models";
import { getEpisodeGuid } from "../utils/getEpisodeGuid";

interface Props {
  episode: Episode
  className?: string
}

const EpisodePlayer: React.FC<Props> = ({ className, episode: { publishingDate, name, description, audio } }) => {
  const [expanded, setExpanded] = useState(false)

  function toggleExpand() {
    setExpanded(e => !e)
  }

  return (
    <div className={ 'space-y-3 ' + className } id={ getEpisodeGuid(name, audio.md5Hash) }>
      <div className={ 'w-full flex justify-between' }>
        <h3 className={ 'text-xl bold' }>{ name }</h3>
        <span>{ Intl.DateTimeFormat("de", {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(new Date(publishingDate)) }</span>
      </div>
      <p className={ `${ expanded ? '' : 'line-clamp-4' } text-sm` } onClick={ toggleExpand }>{ description }</p>
      <audio className={ 'w-full' } controls>
        <source src={ audio.url } type={ audio.mimeType }/>
      </audio>
    </div>
  )
}

export default EpisodePlayer
