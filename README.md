## 🧪 Teste Prático Backend ou FullStack — Alume

Este teste simula parte de um módulo interno que permite que estudantes se cadastrem e simulem financiamentos.

---

### Funcionalidades

- [ ] Registro de estudante
- [ ] Login
- [ ] Consultar perfil
- [ ] Editar perfil
- [ ] Simular financiamento

---

### Tecnologias

- [x] Node.js + TypeScript
- [x] Prisma (ORM)
- [x] PostgreSQL com Docker Compose
- [ ] JWT com expiração de 5 min
- [x] Arquitetura modular (controllers, services, middlewares...)
- [ ] Validação com Zod, Joi ou similar
- [ ] Tratamento de erros

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

- [ ] `POST /api/register` — Registrar estudante
- [ ] `POST /api/login` — Login
- [ ] `POST /api/me` — Obter dados do estudante logado
- [ ] `PUT /api/me` — Atualizar dados do estudante

#### Simulações (Requer autenticação):

- [ ] `POST /api/simulations` — Criar simulação
- [ ] `GET /api/simulations` — Listar simulações

---

### Regras

- [ ] Estudante só pode visualizar, editar ou excluir suas próprias simulações
- [ ] `valor_parcela_mensal` deve ser calculado usando a fórmula abaixo

---

### Fórmula da Parcela (Price)

```text
PMT = PV * (i / (1 - (1 + i)^-n))
```
