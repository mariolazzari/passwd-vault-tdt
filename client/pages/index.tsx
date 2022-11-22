import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Vault from "../components/Vault";

type Step = "login" | "register" | "vault";

export default function Home() {
  const [step, setStep] = useState<Step>("login");

  return (
    <div className={styles.container}>
      <Head>
        <title>Password Vault</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {step === "register" && <RegisterForm />}
        {step === "login" && <LoginForm />}
        {step === "vault" && <Vault />}
      </main>
    </div>
  );
}
