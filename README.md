# 🤖 My Robot

**My Robot** é um projeto de código aberto cujo objetivo é construir um agente de Inteligência Artificial pessoal executado localmente, capaz de aprender continuamente, armazenar memória de longo prazo e auxiliar em tarefas do dia a dia.

O projeto utiliza modelos locais através do **Ollama**, permitindo privacidade, independência de serviços externos e total controle sobre os dados do usuário.

O objetivo não é apenas criar um chatbot, mas sim desenvolver uma arquitetura completa para um assistente inteligente que evolui com o tempo.

---

# Objetivos

* Executar modelos LLM localmente.
* Possuir memória de longo prazo.
* Aprender informações sobre o usuário.
* Consultar documentos e bases de conhecimento.
* Automatizar tarefas.
* Integrar diferentes ferramentas.
* Possuir personalidade configurável.
* Evoluir continuamente sem perder conhecimento.

---

# Arquitetura (Planejamento)

```
Usuário
    │
    ▼
Agente Principal
    │
    ├── Memória
    │      ├── Curto prazo
    │      └── Longo prazo
    │
    ├── RAG
    │
    ├── Banco Vetorial
    │
    ├── Banco Relacional
    │
    ├── Ferramentas
    │      ├── Internet
    │      ├── Arquivos
    │      ├── E-mail
    │      ├── Agenda
    │      ├── Automações
    │      └── APIs
    │
    └── LLM (Ollama)
```

---

# Tecnologias previstas

* Ollama
* PostgreSQL
* pgvector
* Node.js
* TypeScript
* LangChain (quando necessário)
* Docker
* Redis (opcional)
* Python (módulos específicos de IA)
* GitHub Actions

---

# Estrutura inicial

```
my-robot/

docs/
src/
memory/
rag/
database/
models/
tools/
prompts/
scripts/
tests/
docker/

README.md
LICENSE
.gitignore
```

---

# Roadmap

## Fase 1 — Fundação

* [ ] Configurar ambiente
* [ ] Instalar PostgreSQL
* [ ] Instalar pgvector
* [ ] Conectar ao Ollama
* [ ] Primeira conversa com o modelo

---

## Fase 2 — Memória

* [ ] Histórico das conversas
* [ ] Resumos automáticos
* [ ] Memória permanente
* [ ] Busca semântica

---

## Fase 3 — RAG

* [ ] Indexação de documentos
* [ ] PDFs
* [ ] Markdown
* [ ] Código-fonte
* [ ] Pesquisa vetorial

---

## Fase 4 — Ferramentas

* [ ] Pesquisa na Web
* [ ] Controle de arquivos
* [ ] Calendário
* [ ] E-mail
* [ ] Automações

---

## Fase 5 — Inteligência

* [ ] Planejamento de tarefas
* [ ] Execução em múltiplas etapas
* [ ] Cadeias de raciocínio
* [ ] Agentes especializados

---

## Fase 6 — Evolução

* [ ] Plugins
* [ ] Interface Web
* [ ] Aplicativo Desktop
* [ ] API REST
* [ ] Dashboard

---

# Filosofia do projeto

O projeto busca desenvolver um agente de IA que funcione como uma extensão do conhecimento do usuário, preservando contexto, aprendendo continuamente e executando tarefas de forma autônoma.

Toda a arquitetura foi planejada para ser modular, permitindo substituir modelos, bancos de dados e ferramentas sem alterar a estrutura principal do sistema.

---

# Estado atual

🚧 Em desenvolvimento.

Este repositório documenta toda a evolução do projeto, desde os primeiros experimentos até uma arquitetura completa de um agente de IA pessoal executado localmente.
