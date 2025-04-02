import Link from "next/link";
import styles from "./page.module.scss";
import PostList from "@/components/PostList";
async function getPosts() {
  const res = await fetch("http://localhost:3000/posts", {
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className={styles.posts}>
      <div className={styles.header}>
        <h1>게시글 목록</h1>
        <Link href="/posts/new" className="btn">
          글쓰기
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
