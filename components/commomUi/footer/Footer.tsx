import styles from './Footer.module.scss';
import { FaInstagram, FaYoutube, FaSpotify, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* logo */}
        <div className={styles.column}>
          <img src="/logoRock.png" alt="PopRock Logo" className={styles.logo} width={100}/>
          <p className={styles.tagline}>A batida que move a tua alma.</p>
        </div>

        {/* explorar */}
        <div className={styles.column}>
          <h3>Explorar</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#bandas">Bandas</a></li>
            <li><a href="#agenda">Agenda</a></li>
          </ul>
        </div>

        {/* redes sociais */}
        <div className={styles.column}>
          <h3>Siga-nos</h3>
          <div className={styles.socialIcons}>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaSpotify /></a>
          </div>
        </div>

        {/* contato */}
        <div className={styles.column}>
          <h3>Contato</h3>
          <p><FaEnvelope /> contato@poprock.pt</p>
          <p><FaMapMarkerAlt /> Porto Alegre, Brasil</p>
        </div>

      </div>
      
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} PopRock. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}