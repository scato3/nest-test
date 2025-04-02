"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { posts } from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "./NewPostForm.module.scss";

const schema = yup
  .object({
    title: yup.string().required("제목은 필수입니다"),
    content: yup.string().required("내용은 필수입니다"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function NewPostForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await posts.create(data.title, data.content);
      router.push("/");
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input type="text" id="title" {...register("title")} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea id="content" {...register("content")} rows={10} />
        {errors.content && <p className="error">{errors.content.message}</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" className="btn" onClick={() => router.back()}>
          취소
        </button>
        <button type="submit" className="btn">
          작성
        </button>
      </div>
    </form>
  );
}
