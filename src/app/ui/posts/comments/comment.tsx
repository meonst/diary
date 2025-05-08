import { CommentData, SessionInfo } from "@/app/lib/definitions";
import { shortDateString } from "@/app/lib/misc/time";
import { getSessionInfo } from "@/app/lib/authentication/dal";
import DeleteCommentButton from "@/app/ui/posts/comments/deleteCommentButton";
export default async function Comment({
  commentData,
}: {
  commentData: CommentData;
}) {
  const sessionInfo: SessionInfo = await getSessionInfo();
  return (
    <div className="mt-1 rounded-md border-2 border-gray-300 p-1 hover:border-gray-500">
      <div className="flex">
        <div className="text-s">{commentData.authorEmail}</div>
        <div className="flex-grow"></div>
        <div>
          {sessionInfo.userId == commentData.authorId && (
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
