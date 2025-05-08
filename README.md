## 🧪 Teste Prático Backend ou FullStack — Alume

Este teste simula parte de um módulo interno que permite que estudantes se cadastrem e simulem financiamentos.

---

### Funcionalidades

- [x] Registro de estudante
- [x] Login
- [x] Consultar perfil
- [x] Editar perfil
- [x] Simular financiamento
- [x] Listar financiamentos
- [x] Editar financiamentos
- [x] Excluir financiamentos

---

### Tecnologias

- [x] Node.js + TypeScript
- [x] Prisma (ORM)
- [x] PostgreSQL com Docker Compose
- [x] JWT com expiração de 5 min
- [x] Arquitetura modular (controllers, services, middlewares...)
- [x] Validação com Zod
- [x] Tratamento de erros
- [x] Hash de senha com bcrypt

---

### Estudante

- [x] `id`: primary key
- [x] `nome`: obrigatório
- [x] `sobrenome`: obrigatório
- [x] `email`: obrigatório e único
- [x] `senha`: obrigatória (criptografada)

---

### Simulações de Financiamento

- [x] `id`: primary key
- [x] `id_estudante`: obrigatório
- [x] `valor_total`: obrigatório
- [x] `quantidade_parcelas`: obrigatório
- [x] `juros_ao_mes`: obrigatório
- [x] `valor_parcela_mensal`: calculado

---

### Endpoints

- [x] `POST /api/register` — Registrar estudante
- [x] `POST /api/login` — Login
- [x] `POST /api/me` — Obter dados do estudante logado
- [x] `PUT /api/me` — Atualizar dados do estudante

#### Simulações (Requer autenticação):

- [x] `POST /api/simulations` — Criar simulação
- [x] `GET /api/simulations` — Listar simulações

---

### Regras

- [x] Estudante só pode visualizar, editar ou excluir suas próprias simulações
- [x] `valor_parcela_mensal` deve ser calculado usando a fórmula abaixo

---

### Fórmula da Parcela (Price)

```text
PMT = PV * (i / (1 - (1 + i)^-n))
```

### Testes unitários

- [x] utils/calc.test.ts

---
