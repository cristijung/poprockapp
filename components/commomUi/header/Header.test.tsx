import { render, screen } from '@testing-library/react'
import Header from './Header'

// mockando o roteamento do Next.js
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

describe('Header Component', () => {
  it('deve renderizar o elemento principal de navegação', () => {
    render(<Header />)
    
    // verifica se a tag <header> ou o elemento com role banner está presente
    const headerElement = screen.getByRole('banner') 
    expect(headerElement).toBeInTheDocument()
  })

  it('deve exibir o logo ou título do sistema', () => {
    render(<Header />)
    
    // exs: buscando por um texto específico que sabemos que existe no Header
    // const logo = screen.getByText(/Meu App/i)
    // expect(logo).toBeInTheDocument()
  })

})