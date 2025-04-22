"use client";

import { createPortal } from "react-dom";
import DeletePostConfirmationModal from "@/app/ui/posts/delete/deletePostConfirmationModal";
import { useState } from "react";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setShowModal(true);
        }}
        className="text-red-300 hover:text-red-500"
      >
        삭제하기
      </button>
      {showModal &&
        createPortal(
          <DeletePostConfirmationModal
            postId={postId}
            onClose={(event) => {
              event.preventDefault();
              setShowModal(false);
            }}
          />,
          document.body,
        )}
    </div>
  );
}
