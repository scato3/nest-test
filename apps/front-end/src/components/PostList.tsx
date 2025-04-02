"use client";

import Link from "next/link";
import styles from "./PostList.module.scss";
import { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className={styles.grid}>
      {posts.map((post: Post) => (
        <article key={post.id} className={styles.post}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className={styles.meta}>
            <span>작성자: {post.author?.name}</span>
            <span>작성일: {post.createdAt?.split("T")[0]}</span>
          </div>
          <div className={styles.actions}>
            <Link href={`/posts/${post.id}/edit`} className="btn">
              수정
            </Link>
            <form action={`/api/posts/${post.id}/delete`} method="POST">
              <button type="submit" className="btn">
                삭제
              </button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
