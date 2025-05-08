import MakeCommentForm from "@/app/ui/posts/comments/makeCommentForm";
import { CommentContainer } from "@/app/ui/posts/comments/commentContainer";
import { CommentData } from "@/app/lib/definitions";
export default function CommentCluster({
  id,
  commentData,
}: {
  id: string;
  commentData: CommentData[];
}) {
  return (
    <div className="w-full">
      <MakeCommentForm postId={id}></MakeCommentForm>
      <CommentContainer comments={commentData}></CommentContainer>
    </div>
  );
}
