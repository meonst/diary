"use client";

import { createPortal } from "react-dom";
import DeleteConfirmationModal from "@/app/ui/posts/delete/deleteConfirmationModal";
import { useState } from "react";

export default function DeleteButton({ postId }: { postId: string }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Delete Post
      </button>
      {showModal &&
        createPortal(
          <DeleteConfirmationModal
            postId={postId}
            onClose={() => {
              setShowModal(false);
            }}
          />,
          document.body,
        )}
    </div>
  );
}
