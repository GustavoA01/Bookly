# 📚 Bookly

> Sua biblioteca pessoal inteligente — encontre, salve e organize seus livros com o apoio de IA.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12-orange?style=flat-square&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwindcss)

**[🚀 Acesse o projeto](https://bookly-gustavo.vercel.app/)**

---

## 📖 Sobre o Projeto

O **Bookly** é uma aplicação web de biblioteca pessoal que permite ao usuário buscar livros pela API do Google Books, salvá-los em sua coleção, organizá-los em listas personalizadas e receber recomendações inteligentes através do **Bookly IA** — um chat alimentado pelo modelo Gemini da Google.

### ✨ Funcionalidades

- 🔍 **Explorar livros** — busca de livros pela Google Books API com paginação
- 📚 **Biblioteca pessoal** — adicione e gerencie seus livros com datas de início/fim de leitura, páginas lidas e capa personalizada
- 📋 **Listas** — crie listas temáticas e adicione livros a elas
- 🤖 **Bookly IA** — chat com IA (Gemini) que sugere novos livros com base na sua coleção
- 🖼️ **Upload de capa** — envie imagens de capa dos seus livros via Cloudinary
- 🔐 **Autenticação** — login, cadastro e redefinição de senha com Firebase Auth
- 🌙 **Tema escuro** — interface com dark mode ativo por padrão
- 📱 **Responsivo** — layout adaptado para mobile e desktop

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework | Next.js 16 |
| Linguagem | TypeScript |
| UI | React 19, Tailwind CSS, shadcn/ui |
| Backend / DB | Firebase (Firestore + Auth) |
| IA | Google Gemini (`@google/genai`) |
| Busca de livros | Google Books API |
| Upload de imagens | Cloudinary |
| Gerenciamento de estado/cache | TanStack React Query v5 |
| Formulários | React Hook Form + Zod |
| Testes | Jest + Testing Library |
| Linting / Formatação | ESLint + Prettier + Husky |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/bookly.git
cd bookly
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com base no `.env.example`:

```bash
cp .env.example .env.local
```

Preencha os valores conforme a seção [Variáveis de Ambiente](#-variáveis-de-ambiente).

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🔑 Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | API Key do Firebase |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth Domain do Firebase |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID do Firebase |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage Bucket do Firebase |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID do Firebase |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID do Firebase |
| `GEMINI_API_KEY` | Chave da API do Google Gemini |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Nome do cloud no Cloudinary |
| `CLOUDINARY_API_KEY` | API Key do Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret do Cloudinary |

---

## 📁 Estrutura do Projeto

```
src/
├── actions/              # Server Actions (ex: delete de imagem no Cloudinary)
├── app/                  # App Router do Next.js
│   ├── (app)/            # Rotas autenticadas (layout com header/nav)
│   │   ├── page.tsx      # Home — biblioteca do usuário
│   │   ├── explorar/     # Busca de livros
│   │   └── bookly-ia/    # Chat com IA
│   ├── api/
│   │   └── suggestions/  # Endpoint da Bookly IA (Gemini)
│   ├── detalhes/[id]/    # Detalhes de um livro da Google Books
│   ├── livro/[id]/       # Detalhes de um livro da biblioteca pessoal
│   ├── lista/[id]/       # Detalhes de uma lista
│   ├── login/            # Página de login
│   ├── signup/           # Página de cadastro
│   └── redefinir-senha/  # Redefinição de senha
├── components/           # Componentes globais reutilizáveis
├── data/
│   ├── types/            # Tipos TypeScript globais
│   └── hooks/            # Hooks de dados (React Query)
├── features/             # Módulos de feature (estrutura por domínio)
│   ├── Auth/
│   ├── BookDetailsPage/
│   ├── BookTab/
│   ├── BookTable/
│   ├── BooklyiaPage/
│   ├── ListDetails/
│   ├── ListTab/
│   ├── MenuOptions/
│   └── NewBook/
├── hooks/                # Hooks globais
├── lib/                  # Utilitários (queryClient, cn)
└── services/
    ├── firebase/         # Serviços do Firestore (books, lists, chat)
    └── google/           # Google Books API e Gemini config
```

---

## 🧪 Testes

O projeto utiliza **Jest** com **Testing Library** para testes de componentes e hooks.

```bash
# Rodar todos os testes
npm run test

# Modo watch
npm run test:watch
```

---

## 📦 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint |
| `npm run test` | Executa os testes |
| `npm run test:watch` | Executa os testes em modo watch |

---

## ☁️ Deploy

O projeto está hospedado na **Vercel**. Para fazer seu próprio deploy:

1. Faça o fork/clone do repositório
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente no painel da Vercel
4. O deploy será feito automaticamente a cada push na branch principal

---

## 👨‍💻 Autor

Feito por **Gustavo Aguiar**

Linkedin: https://www.linkedin.com/in/aguiar-gustavo/
