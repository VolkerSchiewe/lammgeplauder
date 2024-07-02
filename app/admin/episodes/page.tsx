'use client'

import { useEffect, useState } from "react";
import { Episode } from "../../../types/models";
import { toast } from "react-toastify";
import Modal from "./modal/Modal";
import EditEpisode from "./EditEpisode";
import formatBytes from "../../../utils/formatBytes";
import formatDuration from "../../../utils/formatDuration";

export default function EpisodesPage() {
  const [modalEpisode, setModalEpisode] = useState<Episode | null | undefined>(
    null
  );
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);

  function closeModal() {
    fetchEpisodes();
    setModalEpisode(null);
  }

  function fetchEpisodes() {
    fetch("/api/episodes", { method: "GET" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Unauthorized");
      })
      .then((data) => setEpisodes(data))
      .catch((e) => {
        toast.error(e.message);
      });
  }

  useEffect(() => {
    fetchEpisodes();
  }, []);
  return (
    <>
      <Modal open={modalEpisode !== null} onClose={closeModal}>
        {modalEpisode !== null && (
          <EditEpisode
            episode={modalEpisode ?? undefined}
            onClose={closeModal}
          />
        )}
      </Modal>

      <div className={"p-5 space-y-5"}>
        <div>
          <button
            className={"border rounded py-1 px-3 inline-flex"}
            onClick={() => setModalEpisode(undefined)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {"Neue Episode"}
          </button>
        </div>
        {episodes.map((episode) => {
          const { name, description, audio, published, publishingDate } =
            episode;
          return (
            <div
              key={name}
              className={`grid grid-cols-2 gap-3 border rounded shadow-sm p-5 ${
                published ? "bg-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <div className={"flex flex-col space-y-3"} key={name}>
                <div className={"flex items-center space-x-5"}>
                  <span className={"text-2xl font-bold"}>{name}</span>
                  {!published && (
                    <span
                      className={"border-2 border-red-800 rounded px-2 py-1"}
                    >
                      {"Unveröffentlicht"}
                    </span>
                  )}
                </div>
                <span>
                  {Intl.DateTimeFormat("de").format(new Date(publishingDate))}
                </span>
                <span>{`${formatBytes(audio.size)} - ${formatDuration(
                  audio.duration
                )}`}</span>
              </div>
              <div>
                <p className={"truncate"}>{description}</p>
              </div>
              <div className={"col-start-2 flex justify-end space-x-3"}>
                <button
                  className={"border rounded py-1 px-3"}
                  onClick={() => setModalEpisode(episode)}
                >
                  {"Bearbeiten"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
