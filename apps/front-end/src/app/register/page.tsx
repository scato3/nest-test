import styles from "./register.module.scss";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className={styles.register}>
      <h1>회원가입</h1>
      <RegisterForm />
    </div>
  );
}
