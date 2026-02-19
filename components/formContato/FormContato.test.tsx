import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import userEvent from "@testing-library/user-event";
import FormContato from "./FormContato";
import "@testing-library/jest-dom";

// mock do window.alert já que o Jest/JSDOM não o implementa
const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe("FormContato", () => {
  beforeEach(() => {
    alertMock.mockClear();
  });

  test("deve renderizar todos os campos do formulário", () => {
    render(<FormContato />);
    
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar mensagem/i })).toBeInTheDocument();
  });

  test("deve exibir mensagens de erro para campos vazios após o submit", async () => {
    render(<FormContato />);
    const user = userEvent.setup();

    const submitBtn = screen.getByRole("button", { name: /enviar mensagem/i });
    await user.click(submitBtn);

    // react hook form valida de forma assíncrona com o Zod
    expect(await screen.findByText(/o nome deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
    expect(await screen.findByText(/digite um e-mail válido/i)).toBeInTheDocument();
    expect(await screen.findByText(/a mensagem deve ter pelo menos 10 caracteres/i)).toBeInTheDocument();
  });

  test("deve exibir erro se o e-mail for inválido", async () => {
    render(<FormContato />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/e-mail/i);
    await user.type(emailInput, "email-invalido");
    
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByText(/digite um e-mail válido/i)).toBeInTheDocument();
  });

  test("deve enviar o formulário com sucesso quando os dados são válidos", async () => {
    render(<FormContato />);
    const user = userEvent.setup();

    // preenchendo os campos
    await user.type(screen.getByLabelText(/nome/i), "João Silva");
    await user.type(screen.getByLabelText(/e-mail/i), "joao@email.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Olá, gostaria de saber mais sobre o projeto.");

    const submitBtn = screen.getByRole("button", { name: /enviar mensagem/i });
    await user.click(submitBtn);

    // verifica o estado de "Enviando..."
    expect(submitBtn).toHaveTextContent(/enviando.../i);
    expect(submitBtn).toBeDisabled();

    // aguarda o alert de sucesso --> o setTimeout no componente é de 2s
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Mensagem enviada com sucesso!");
    }, { timeout: 3000 });

    // verifica se o formulário foi resetado
    expect(screen.getByLabelText(/nome/i)).toHaveValue("");
    expect(screen.getByLabelText(/e-mail/i)).toHaveValue("");
  });
});