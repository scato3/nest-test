import styles from "./edit.module.scss";
import EditPostForm from "@/components/EditPostForm";

async function getPost(id: number) {
  const res = await fetch(`http://localhost:3000/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const postId = parseInt(params.id);
  const post = await getPost(postId);

  return (
    <div className={styles.editPost}>
      <h1>게시글 수정</h1>
      <EditPostForm postId={postId} initialPost={post} />
    </div>
  );
}
