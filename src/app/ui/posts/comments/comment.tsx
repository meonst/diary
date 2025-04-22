import { CommentData } from "@/app/lib/definitions";
import { shortDateString } from "@/app/lib/misc/time";
import { verifySession } from "@/app/lib/authentication/dal";
import DeleteCommentButton from "@/app/ui/posts/comments/deleteCommentButton";
export default async function Comment({
  commentData,
}: {
  commentData: CommentData;
}) {
  const { userId } = await verifySession();
  return (
    <div className="mt-1 rounded-md border-1 p-1">
      <div className="flex">
        <div className="text-s">{commentData.authorEmail}</div>
        <div className="flex-grow"></div>
        <div>
          {userId == commentData.authorId && (
            <DeleteCommentButton
              commentId={commentData.id}
            ></DeleteCommentButton>
          )}
        </div>
      </div>
      <div className="text-xl">{commentData.content}</div>
      <div className="flex">
        <div className="flex-grow"></div>
        <div className="text-s">{shortDateString(commentData.time)}</div>
      </div>
    </div>
  );
}
