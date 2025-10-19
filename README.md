# MovieDB - React Movie Application

Aplicação web moderna para explorar filmes populares, buscar títulos e gerenciar favoritos utilizando a API do TMDB (The Movie Database).

## 🌐 Demo ao Vivo

🔗 **[https://movie-db-xi-six.vercel.app/](https://movie-db-xi-six.vercel.app/)**

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Redux Toolkit** - Gerenciamento de estado
- **RTK Query** - Data fetching e caching
- **React Router v6** - Roteamento
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **Vitest** - Testes unitários
- **React Icons** - Biblioteca de ícones

## 📋 Funcionalidades

- ✅ Listagem de filmes populares com paginação
- ✅ Busca de filmes com debounce
- ✅ Detalhes completos do filme
- ✅ Sistema de favoritos com persistência (localStorage)
- ✅ Ordenação de favoritos (título, data, avaliação)
- ✅ Tema dark/light mode com transições suaves
- ✅ Design responsivo
- ✅ Clean Architecture
- ✅ Type-safe com TypeScript strict mode

## 🏗️ Arquitetura

Projeto estruturado seguindo princípios de **Clean Architecture** e **SOLID**:

```
src/
├── infrastructure/     # Camada de infraestrutura
│   └── storage/       # localStorage wrapper
├── presentation/      # Camada de apresentação
│   ├── components/   # Componentes React
│   │   ├── common/   # Componentes reutilizáveis
│   │   ├── features/ # Componentes de features
│   │   └── layout/   # Componentes de layout
│   ├── contexts/     # React Contexts
│   ├── hooks/        # Custom hooks
│   ├── pages/        # Páginas da aplicação
│   ├── routes/       # Configuração de rotas
│   └── store/        # Redux store e slices
└── shared/           # Camada compartilhada
    ├── constants/    # Constantes da aplicação
    ├── types/        # TypeScript types
    └── utils/        # Funções utilitárias
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd movie_mb
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Adicione o Read Access Token do TMDB no arquivo `.env`:
```env
VITE_TMDB_READ_TOKEN=seu_bearer_token_aqui
```

> 📝 **Importante:** Use o "API Read Access Token" (v4)"
>
> Obtenha em: https://www.themoviedb.org/settings/api
>
> O Read Access Token é designed para aplicações client-side (SPAs).

## 🚀 Rodando o projeto

### Desenvolvimento
```bash
npm run dev
```

### Build de produção
```bash
npm run build
```

### Preview da build
```bash
npm run preview
```

### Testes
```bash
npm run test
```

### Validação completa (type-check + lint + format)
```bash
npm run pre-commit
```

## 📝 Scripts disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa ESLint
- `npm run format` - Formata código com Prettier
- `npm run format:check` - Verifica formatação
- `npm run type-check` - Verifica tipos TypeScript
- `npm run test` - Executa testes
- `npm run pre-commit` - Validação completa antes de commit

## 🎨 Decisões de Design

### State Management
- **Redux Toolkit** para estado global (favoritos)
- **RTK Query** para cache e sincronização de dados da API
- **React Context** para tema (dark/light mode)
- **localStorage** para persistência de favoritos e tema

### Routing
- **Nested routes** com `MainLayout` e `Outlet`
- **useRoutes** hook para configuração declarativa
- Redirecionamento automático para 404

### Componentes
- Componentes funcionais com hooks
- Separação clara entre common/features/layout
- Props tipadas com TypeScript
- Uso de barrel exports (index.ts)

### Performance
- Debounce na busca (500ms)
- Memoização com `createSelector` (Reselect)
- Lazy loading de imagens
- Paginação infinita

## 📦 Estrutura de Commits

Commits seguem Conventional Commits:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `refactor:` - Refatoração de código
- `chore:` - Mudanças em build, configs, etc
- `docs:` - Documentação

## 🔐 Boas Práticas

- ✅ TypeScript strict mode
- ✅ ESLint + Prettier configurados
- ✅ Pre-commit hooks com validação
- ✅ Clean Architecture
- ✅ SOLID principles
- ✅ Código autodocumentado (minimal comments)
- ✅ Type-safe API calls
- ✅ Error handling
- ✅ Loading states
- ✅ Empty states

## 📄 Licença

MIT

---

Desenvolvido com ❤️ usando React + TypeScript
