"use client";
import hidePost from "@/app/lib/dbAction/hidePost";
import { EventHandler, MouseEventHandler } from "react";
import Modal from "@/app/ui/modal";

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
    <Modal>
      <div>
        <div>Delete Post?</div>
        <div className="flex">
          <button
            className="w-1/2"
            onClick={(event) => {
              hidePostElement(postId);
              onClose(event);
            }}
          >
            Yes
          </button>
          <button className="w-1/2" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
