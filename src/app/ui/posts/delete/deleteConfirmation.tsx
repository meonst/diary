'use client'
import hidePost from "@/app/lib/dbAction/hidePost"
import { EventHandler, MouseEventHandler } from "react";

function hidePostElement(postId: string) {
    document.getElementById(postId)?.setAttribute("hidden", "1");
    hidePost(postId);
}

export default function DeleteConfirmation({ postId, onClose }: { postId: string, onClose: MouseEventHandler }) {
    return (
        <div>
            Delete?
            <button onClick={() => { hidePostElement(postId) }}>Yes</button>
            <button onClick={onClose}>No</button>
        </div>

    )
}