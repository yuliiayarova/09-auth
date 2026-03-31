"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NotePreview() {
  const router = useRouter();
  const close = () => router.back();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <button type="button" className={css.backBtn} onClick={close}>
          Close
        </button>

        {isLoading && <p>Loading, please wait...</p>}

        {(error || !data) && !isLoading && <p>Something went wrong.</p>}

        {data && !isLoading && !error && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>
            <p className={css.tag}>{data.tag}</p>
            <p className={css.content}>{data.content}</p>
            <p className={css.date}>{data.createdAt}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
