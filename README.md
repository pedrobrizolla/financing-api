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

- [ ] Node.js + TypeScript
- [ ] Prisma (ORM)
- [ ] PostgreSQL com Docker Compose
- [ ] JWT com expiração de 5 min
- [ ] Arquitetura modular (controllers, services, middlewares...)
- [ ] Validação com Zod, Joi ou similar
- [ ] Tratamento de erros

---

### Estudante

- [ ] `id`: primary key
- [ ] `nome`: obrigatório
- [ ] `sobrenome`: obrigatório
- [ ] `email`: obrigatório e único
- [ ] `senha`: obrigatória (criptografada)

---

### Simulações de Financiamento

- [ ] `id`: primary key
- [ ] `id_estudante`: obrigatório
- [ ] `valor_total`: obrigatório
- [ ] `quantidade_parcelas`: obrigatório
- [ ] `juros_ao_mes`: obrigatório
- [ ] `valor_parcela_mensal`: calculado

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
