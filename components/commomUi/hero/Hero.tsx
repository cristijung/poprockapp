"use client";

import { useState, useEffect } from "react";
import styles from "./Hero.module.scss";
import Header from "../header/Header";

export default function Hero() {
  // estado da visibilidade
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // timeout p evitar o erro de renderização síncrona
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer); // limpa ao desmontar
  }, []); // [] garante q o React re-renderize somente 1x

  return (
    <>
      <Header />
      <section className={styles.hero}>
        <div className={`${styles.content} ${isVisible ? styles.appear : ""}`}>
          <h1 className={styles.title}>
            Onde o <span className={styles.highlight}>Pop</span> encontra o{" "}
            <span className={styles.highlight}>Rock</span>
          </h1>
          <p className={styles.subtitle}>
            Sinta a energia dos maiores shows e as bandas que estão definindo a
            cena atual.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Ver Agenda</button>
            <button className={styles.secondaryBtn}>Conhecer Bandas</button>
          </div>
        </div>
        <div className={styles.overlay}></div>
      </section>
    </>
  );
}
