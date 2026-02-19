"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "./FormContato.module.scss";

// definindo a validação com Zod
const contactSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um email válido"),
  mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

// extrair os tipos do schema ... tem a mesma fn de uma interface
// aqui declaramos uma fn do zod
type ContactFormData = z.infer<typeof contactSchema>;

export default function FormContato() {
  const {
    register, //({ ...register('nome')})
    handleSubmit, //se tudo estiver ok, ele envia
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Dados do formulário", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("mensagem enviada com sucesso!");
    reset();
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="nome">Nome</label>
          <input
            {...register("nome")}
            id="nome"
            placeholder="Seu nome"
            className={errors.nome ? styles.inputError : ""}
          />
          {errors.nome && (
            <span className={styles.errorText}>{errors.nome.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">E-mail</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            {...register("mensagem")}
            id="mensagem"
            rows={4}
            className={errors.mensagem ? styles.inputError : ""}
          />
          {errors.mensagem && (
            <span className={styles.errorText}>{errors.mensagem.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>
    </div>
  );
}
