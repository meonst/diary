"use client";

import { createPortal } from "react-dom";
import DeleteCommentConfirmationModal from "@/app/ui/posts/comments/deleteCommentConfirmationModal";
import { useState } from "react";

export default function DeleteCommentButton({
  commentId,
}: {
  commentId: string;
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="text-red-300 hover:text-red-500"
      >
        삭제
      </button>
      {showModal &&
        createPortal(
          <DeleteCommentConfirmationModal
            commentId={commentId}
            onClose={() => {
              setShowModal(false);
            }}
          />,
          document.body,
        )}
    </div>
  );
}
