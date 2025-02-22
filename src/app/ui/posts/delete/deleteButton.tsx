'use client'

import { createPortal } from "react-dom"
import DeleteConfirmation from "@/app/ui/posts/delete/deleteConfirmationModal"
import { useState } from "react";


export default function DeleteButton({ postId }: { postId: string }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <button onClick={() => { setShowModal(true) }}>
                delete
            </button>
            {showModal && createPortal(
                <DeleteConfirmation
                    postId={postId}
                    onClose={() => { setShowModal(false) }}
                />,
                document.body
            )}
        </div>
    )
}