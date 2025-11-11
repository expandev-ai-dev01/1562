# HORTifruti

Página para hortifruti com exibição de produtos, promoções e informações do estabelecimento para clientes.

## Tecnologias

- React 19.2.0
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 7.9.3
- TanStack Query 5.90.2
- Axios 1.12.2
- Zustand 5.0.8
- React Hook Form 7.63.0
- Zod 4.1.11

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── domain/               # Domínios de negócio
├── core/                 # Componentes e utilitários globais
│   ├── components/       # Componentes reutilizáveis
│   ├── lib/             # Configurações de bibliotecas
│   ├── utils/           # Funções utilitárias
│   ├── types/           # Tipos globais
│   └── constants/       # Constantes globais
└── assets/              # Recursos estáticos
    └── styles/          # Estilos globais
```

## Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## Configuração

1. Copie `.env.example` para `.env`
2. Configure as variáveis de ambiente conforme necessário
3. Execute `npm install`
4. Execute `npm run dev`

## Features

- Exibição de Catálogo de Produtos
- Destaque de Promoções
- Informações do Estabelecimento
- Filtro por Categorias

## Licença

Privado