"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./RegisterForm.module.scss";

const schema = yup
  .object({
    email: yup
      .string()
      .email("유효한 이메일을 입력해주세요")
      .required("이메일은 필수입니다"),
    password: yup
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다")
      .required("비밀번호는 필수입니다"),
    name: yup.string().required("이름은 필수입니다"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function RegisterForm() {
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
      await auth.register(data.email, data.password, data.name);
      router.push("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="name">이름</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <button type="submit" className="btn">
        회원가입
      </button>
      <Link href="/login" className={styles.link}>
        이미 계정이 있으신가요? 로그인하기
      </Link>
    </form>
  );
}
