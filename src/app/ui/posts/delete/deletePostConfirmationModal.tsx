"use client";
import hidePost from "@/app/lib/dbAction/hidePost";
import { MouseEventHandler } from "react";
import Modal from "@/app/ui/modal";

export default function DeletePostConfirmationModal({
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
        <div>글을 삭제하시겠습니까??</div>
        <div className="flex">
          <button
            className="w-1/2 hover:text-green-300"
            onClick={(event) => {
              event.preventDefault();
              hidePostElement(postId);
              onClose(event);
            }}
          >
            네
          </button>
          <button className="w-1/2 hover:text-red-300" onClick={onClose}>
            아니요
          </button>
        </div>
      </div>
    </Modal>
  );
}
