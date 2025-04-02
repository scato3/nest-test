"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./LoginForm.module.scss";

const schema = yup
  .object({
    email: yup
      .string()
      .email("유효한 이메일을 입력해주세요")
      .required("이메일은 필수입니다"),
    password: yup.string().required("비밀번호는 필수입니다"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await auth.login(data.email, data.password);
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("/");
    } catch (error) {
      setError("root", {
        message: "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
      });
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

      {errors.root && <p className="error">{errors.root.message}</p>}

      <button type="submit" className="btn">
        로그인
      </button>
      <Link href="/register" className={styles.link}>
        계정이 없으신가요? 회원가입하기
      </Link>
    </form>
  );
}
