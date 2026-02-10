"use client";

import { useState } from 'react';
import styles from './TicketForm.module.scss';

export default function TicketForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    evento: '',
    quantidade: 1
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // validação calculada durante a renderização
  const isFormValid = 
    formData.nome.trim().length > 3 && 
    formData.email.includes('@') && 
    formData.evento !== '' && 
    formData.quantidade > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSuccess(true); // ativa a tela de sucesso 
    }
  };

  // se a compra for um sucesso, arrumadooooooooooooo
  if (isSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.checkIcon}></div>
        <h2>Reserva Confirmada!</h2>
        <div className={styles.summary}>
          <p><strong>Fã:</strong> {formData.nome}</p>
          <p><strong>Show:</strong> {formData.evento}</p>
          <p><strong>Ingressos:</strong> {formData.quantidade}</p>
        </div>
        <p className={styles.footerNote}>Enviamos os detalhes para {formData.email}</p>
      </div>
    );
  }

  return (
    <form className={styles.ticketForm} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="nome">Nome Completo</label>
        <input 
          type="text" 
          id="nome" 
          name="nome" 
          placeholder="Seu nome" 
          onChange={handleChange} 
        />
        {formData.nome.length > 0 && formData.nome.length <= 3 && (
          <span className={styles.errorMessage}>O nome está muito curto!</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">E-mail</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="email@exemplo.com" 
          onChange={handleChange} 
        />
        {formData.email.length > 0 && !formData.email.includes('@') && (
          <span className={styles.errorMessage}>Insira um e-mail válido</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="evento">Escolha o Show</label>
        <select id="evento" name="evento" onChange={handleChange}>
          <option value="">Selecione um evento...</option>
          <option value="PopRock Fest 2026">PopRock Fest 2026</option>
          <option value="Noite Indie">Noite Indie</option>
          <option value="Tributo Classic Rock">Tributo Classic Rock</option>
        </select>
      </div>

      <button 
        type="submit" 
        className={isFormValid ? styles.submitBtn : styles.disabledBtn} 
        disabled={!isFormValid}
      >
        {isFormValid ? "Finalizar Compra" : "Preencha todos os campos"}
      </button>
    </form>
  );
}