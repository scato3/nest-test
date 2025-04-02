import styles from "./login.module.scss";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.login}>
      <h1>로그인</h1>
      <LoginForm />
    </div>
  );
}
