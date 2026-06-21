# 🚀 Fluency Path - AI-Powered English Learning Platform

<p align="center">
 <img width="2838" height="4076" alt="localhost_3000_ (1)" src="https://github.com/user-attachments/assets/192a0634-5310-4704-8af6-fb48cd00d3b3" />
</p>


## 📌 Sobre o Projeto

O **Fluency Path** é uma plataforma web moderna, minimalista e responsiva projetada para potencializar o aprendizado da língua inglesa do nível A1 ao C2. Utilizando uma metodologia baseada em conteúdo real do mundo real (como vídeos do TED-Ed e YouTube), a plataforma foca no aprendizado ativo através de resumos práticos, aquisição de vocabulário e análise de feedback.

>  **Nota Metodológica:**
>  O Fluency Path foi desenhado para ser um **método complementar** de estudos. Seu objetivo principal é acelerar o desenvolvimento da **compreensão auditiva (Listening)**, **gramática (Grammar)** e **leitura/escrita (Reading/Writing)**. A plataforma não aborda prática de conversação (Speaking).

O design foi severamente inspirado na estética premium e "clean" de produtos SaaS modernos como **Linear**, **Notion** e versões minimalistas do **Duolingo**.

---

##  Funcionalidades Principais (MVP V1)

*   **Adaptação de Nível em Tempo Real (UI Sync):** Todo o painel se adapta dinamicamente com base no nível selecionado (A1, A2, B1, B2, C1, C2). As instruções, vocabulários e feedbacks mudam de idioma (Português/Inglês) para garantir a melhor experiência de aprendizado.
*   **Checklist Diária & Calendário Interativo:** Sistema gamificado que monitora a consistência do usuário. Ao concluir o desafio do dia, o calendário marca a data automaticamente em **azul (concluído)**.
*   **Sistema de Vocabulário Interativo:** Permite salvar novas palavras e expressões diretamente no painel, atualizando os contadores de progresso em tempo real.
*   **Simulador de Feedback de IA:** Seção de correção gramatical, sugestões de vocabulário, pontuação de fluência (0 a 10) e uma "versão natural" do texto com estados de carregamento realistas.
*   **Seção Informativa "About Levels":** Um modal integrado que explica detalhadamente o escopo do projeto, como evoluir de nível e a proposta pedagógica do app.
*   **Persistência Local (Zero Atrito):** Não é necessário login ou criação de conta. Todo o progresso, dias estudados, palavras salvas e streaks são guardados com segurança no `LocalStorage` do navegador.

---

## 🛠️ Tecnologias Utilizadas

A stack do projeto foi escolhida para garantir performance, tipagem estática segura e estilização ágil:

*   **Frontend:** [React.js](https://reactjs.org/) (com Hooks para gerenciamento de estado)
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Garantindo robustez e tipagem estática)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (Layouts modernos e utilitários focados em responsividade)
*   **Componentes base:** [Shadcn UI](https://ui.shadcn.com/) / Radix Primitives (Estética Linear/Notion)
*   **Armazenamento:** Web Storage API (`LocalStorage`)
*   **Deploy:** [Render](https://render.com/)

---
https://fluency-path-dashboard.onrender.com

## 📁 Estrutura de Arquivos Resumida

```text
src/
├── components/          # Componentes visuais isolados (Cards, Calendário, Modais)
├── context/             # Gerenciamento de estado global do nível e progresso
├── hooks/               # Custom hooks para gerenciamento de LocalStorage
├── mock/                # Dados fictícios para simulação da inteligência artificial
├── App.tsx              # Componente principal (Single Page Application Layout)
└── main.tsx             # Ponto de entrada do React
```

---

## Autor
Matheus Henrique 
