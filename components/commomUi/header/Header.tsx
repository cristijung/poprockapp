"use client"; 

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useModal } from '@/hooks/useModal';
import TicketModal from '../ticketModal/TicketModal'; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // ativando o hook para controlar o modal de ingressos
  const { isOpen, openModal, closeModal } = useModal();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // fn p abrir o modal e fechar o menu mobile simultaneamente
  const handleTicketClick = () => {
    openModal();
    closeMenu();
  };

  return (
    <header className={styles.header}>      
      <Link href="/" className={styles.logoContainer} onClick={closeMenu}>
        <Image 
          src="/logoRock.png" 
          alt="Pop Rock Logo"
          width={180} 
          height={60} 
          className={styles.logoImage}
          priority 
        />
      </Link>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/artistas" onClick={closeMenu}>Artistas</Link>
        <Link href="/bandas" onClick={closeMenu}>Bandas</Link>
        <Link href="/agenda" onClick={closeMenu}>Agenda</Link>
        <Link href="/contato" onClick={closeMenu}>Contato</Link>
        
        {/* CTA mobile */}
        <button className={styles.ctaButtonMobile} onClick={handleTicketClick}>
          Ingressos
        </button>
      </nav>

      {/* CTA desktop */}
      <button className={styles.ctaButton} onClick={openModal}>
        Ingressos
      </button>

      <button 
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`} 
        onClick={toggleMenu}
        aria-label="Abrir menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      {/* modal de form de compra */}
      <TicketModal isOpen={isOpen} onClose={closeModal} />

      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </header>
  );
}