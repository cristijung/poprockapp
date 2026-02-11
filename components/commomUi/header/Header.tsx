"use client"; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'; 
import styles from './Header.module.scss';
import { useModal } from '@/hooks/useModal';
import TicketModal from '../ticketModal/TicketModal'; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  // lazy initializer: evita o erro de renderização em cascata
  const [isLogged, setIsLogged] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("user_token");
    }
    return false;
  });

  // sincroniza o estado se o usuário deslogar em outra aba
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogged(!!localStorage.getItem("user_token"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    setIsLogged(false);
    closeMenu();
    router.push('/');
  };

  return (
    <header className={styles.header}>      
      <Link href="/" className={styles.logoContainer} onClick={closeMenu}>
        <Image 
          src="/logoRock.png" 
          alt="Pop Rock Logo"
          width={180} height={60} 
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
        
        <div className={styles.authMobile}>
          {isLogged ? (
            <>
              <Link href="/admin" onClick={closeMenu} className={styles.userLink}>
                <FaUserCircle size={22} /> Área VIP
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <FaSignOutAlt size={20} /> Sair
              </button>
            </>
          ) : (
            <Link href="/login" onClick={closeMenu} className={styles.userLink}>
              <FaSignInAlt size={20} /> Entrar
            </Link>
          )}
        </div>
        <button className={styles.ctaButtonMobile} onClick={() => { openModal(); closeMenu(); }}>
          Ingressos
        </button>
      </nav>

      <div className={styles.actionsDesktop}>
        {isLogged ? (
          <div className={styles.userActions}>
            <Link href="/admin" title="Área VIP">
              <FaUserCircle className={styles.userIcon} size={30} />
            </Link>
            <button onClick={handleLogout} className={styles.iconBtn} title="Sair">
              <FaSignOutAlt size={24} />
            </button>
          </div>
        ) : (
          <Link href="/login" className={styles.iconBtn} title="Login">
            <FaSignInAlt size={24} />
          </Link>
        )}
        <button className={styles.ctaButton} onClick={openModal}>Ingressos</button>
      </div>

      <button className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      <TicketModal isOpen={isOpen} onClose={closeModal} />
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </header>
  );
}