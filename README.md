# App PopRock

## Instalações

- sass: `npm install --save-dev sass`
- React Icons: `npm install react-icons --save`

### Para Testes:
- Testing Library e Jest: `npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/dom ts-jest`

- `npm install -D ts-node`: O Jest, por padrão, é um ambiente Js. Como o arquivo de configuração (jest.config.ts) está em TypeScript, o Jest não consegue lê-lo diretamente. O ts-node permite que aplicações Node.js (como o Jest) executem arquivos TypeScript diretamente, convertendo-os em "tempo de execução" sem que você precise compilá-los manualmente primeiro.
- `npm install -D @types/jest`: O TypeScript por si só não conhece as funções globais do Jest (como describe, it, expect ou jest.fn()), porque elas não fazem parte da linguagem padrão. Este pacote instala as definições de tipos do Jest. Ele fornece ao compilador (e ao VS Code) um "mapa" de quais funções existem, quais argumentos elas aceitam e o que elas retornam.
- A flag `-D`: Esta flag significa que essas ferramentas são instaladas **apenas para o ambiente de desenvolvimento**. Elas não serão incluídas no pacote final quando fizermos o deploy do seu app PopRockApp para produção, mantendo o projeto leve.


### React Hook Form

Instalação no Projeto React/Next.js com Typescript:
`npm install react-hook-form @hookform/resolvers zod`