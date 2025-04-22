"use client";
import hideComment from "@/app/lib/dbAction/hideComment";
import { MouseEventHandler } from "react";
import Modal from "@/app/ui/modal";

export default function DeleteCommentConfirmationModal({
  commentId,
  onClose,
}: {
  commentId: string;
  onClose: MouseEventHandler;
}) {
  function hideCommentElement(commentId: string) {
    document.getElementById(commentId)?.setAttribute("hidden", "1");
    hideComment(commentId);
  }
  return (
    <Modal>
      <div>
        <div>댓글을 삭제하시겠습니까?</div>
        <div className="flex">
          <button
            className="w-1/2 hover:text-green-300"
            onClick={(event) => {
              hideCommentElement(commentId);
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
