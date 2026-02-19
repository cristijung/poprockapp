import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

// mock do roteador --> importante p o Next.js 15/16
// dica: Se usarmos muitos mocks, pode ser útil movê-los para um arquivo __mocks__ 
// ou para o setupFilesAfterEnv do Jest...
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}));

// mockando o hook customizado useModal
const mockOpenModal = jest.fn();
jest.mock('@/hooks/useModal', () => ({
  useModal: () => ({
    isOpen: false,
    openModal: mockOpenModal,
    closeModal: jest.fn(),
  }),
}));

describe('Header Component - Interações', () => {
  it('deve renderizar o elemento principal de navegação', () => {
    render(<Header />);
    
    // verifica se a tag <header> ou o elemento com role banner está presente
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('deve exibir o logo ou título do sistema', () => {
    render(<Header />);
    
    // verifica se o logo está presente através do texto alternativo
    const logo = screen.getByAltText(/pop rock logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('deve chamar a função openModal ao clicar no botão de ingressos do desktop', () => {
    render(<Header />);

    // selecionando especificamente o botão com a classe 'ctaButton'....
    // apenas um deles possui a classe específica do Desktop.
    
    const ticketButton = screen.getByText(/ingressos/i, {
      selector: '.ctaButton'
    });
    
    // simulando o clique do usuário
    fireEvent.click(ticketButton);

    // verifica se a função disparada pelo clique foi chamada exatamente uma vez
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });
});