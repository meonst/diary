"use client";
import hidePost from "@/app/lib/dbAction/hidePost";
import { EventHandler, MouseEventHandler } from "react";

export default function DeleteConfirmationModal({
  postId,
  onClose,
}: {
  postId: string;
  onClose: MouseEventHandler;
}) {
  function hidePostElement(postId: string) {
    document.getElementById(postId)?.setAttribute("hidden", "1");
    hidePost(postId);
  }
  return (
    <div>
      Delete?
      <button
        onClick={(event) => {
          hidePostElement(postId);
          onClose(event);
        }}
      >
        Yes
      </button>
      <button onClick={onClose}>No</button>
    </div>
  );
}
