import styles from "./new.module.scss";
import NewPostForm from "@/components/NewPostForm";

export default function NewPostPage() {
  return (
    <div className={styles.newPost}>
      <h1>새 게시글 작성</h1>
      <NewPostForm />
    </div>
  );
}
