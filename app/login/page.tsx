"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const fazerLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "admin@poprock.com" && password == "123") {
      localStorage.setItem("user_token", "rock-token-2026");
      router.push("/admin");
    } else {
      alert("Credenciais inválidas!!");
    }
  };

  return (
    <>
      <main className={styles.container}>
        <form onSubmit={fazerLogin} className={styles.form}>
          <h1>Acesso Backstage</h1>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </main>
    </>
  );
}
