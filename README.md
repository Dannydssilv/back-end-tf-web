# Back-End – Trabalho Final de Web

Este repositório contém o **back-end** desenvolvido para o trabalho final da disciplina de **Web**, com foco na criação de uma API REST para gerenciamento de administradores e flashcards educacionais.

---

## 👥 Integrantes

* [Ana Paula Souza Carvalho](https://github.com/anapaulaszc)
* [Daniely dos Santos Silva](https://github.com/Dannydssilv)
* [Lívia Oliveira Cunha](https://github.com/liviacunha14)
* [Maria Eloísa Costa Silva](https://github.com/maeloisaaa)

---

## 📌 Atividade 5

**URL da API:**
👉 [https://literate-space-garbanzo-4j64r7qwvvp93j75v-3000.app.github.dev](https://literate-space-garbanzo-4j64r7qwvvp93j75v-3000.app.github.dev)

---

## 🔐 Rotas de Administradores

### ➤ `[GET] /admin`

Retorna a lista de todos os administradores cadastrados.

```json
[
  {
    "id": 1,
    "nome": "Lívia Cunha",
    "email": "livia.cunha@email.com"
  },
  {
    "id": 2,
    "nome": "Franklin Eduardo",
    "email": "franklin.eduardo@email.com"
  },
  {
    "id": 3,
    "nome": "Daniely Silva",
    "email": "danny.silva@email.com"
  }
]
```

---

### ➤ `[GET] /admin/1`

Retorna um administrador específico pelo ID.

```json
{
  "id": 1,
  "nome": "Lívia Cunha",
  "email": "livia.cunha@email.com",
  "senha": "chatgpt1l0ve"
}
```

---

### ➤ `[POST] /admin`

Cria um novo administrador.

**Body:**

```json
{
  "id": 4,
  "nome": "Maria Eloisa",
  "email": "malo12sa.costa@email.com",
  "senha": "gbfgbfn"
}
```

**Resposta:**

```json
{
  "id": 4,
  "nome": "Maria Eloisa",
  "email": "malo12sa.costa@email.com"
}
```

---

### ➤ `[PUT] /admin/4`

Atualiza os dados de um administrador existente.

**Body:**

```json
{
  "id": 4,
  "nome": "Maria Eloisa",
  "email": "malo12sa.costa@email.com",
  "senha": "aqswswfgbfn"
}
```

**Resposta:**

```json
{
  "id": 4,
  "nome": "Maria Eloisa",
  "email": "malo12sa.costa@email.com"
}
```

---

### ➤ `[DELETE] /admin/2`

Remove um administrador pelo ID.

```json
"Administrador excluído com sucesso!"
```

---

## 📚 Rotas de Flashcards

### ➤ `[GET] /flashcards`

Retorna todos os flashcards cadastrados.

```json
[
  {
    "id": 1,
    "pergunta": "Qual é a segunda lei de Newton?",
    "resposta": "Força é igual a massa vezes a aceleração (F = m * a)."
  },
  {
    "id": 2,
    "pergunta": "O que diz a lei de Ohm?",
    "resposta": "A corrente em um circuito é diretamente proporcional à tensão e inversamente proporcional à resistência (V = R * i)."
  },
  {
    "id": 3,
    "pergunta": "Qual a fórmula da velocidade média?",
    "resposta": "Distância percorrida dividida pelo tempo gasto (Vm = Δs / Δt)."
  }
]
```

---

### ➤ `[GET] /flashcards/1`

Retorna um flashcard específico pelo ID.

```json
{
  "id": 1,
  "pergunta": "Qual é a segunda lei de Newton?",
  "resposta": "Força é igual a massa vezes a aceleração (F = m * a)."
}
```

---

### ➤ `[POST] /flashcards`

Cria um novo flashcard.

**Body:**

```json
{
  "pergunta": "Qual biblioteca usamos para criptografar senhas na rota /admin?",
  "resposta": "A biblioteca bcrypt."
}
```

**Resposta:**

```json
{
  "mensagem": "Flashcard criado com sucesso!",
  "id": 10
}
```

---

### ➤ `[PUT] /flashcards/10`

Atualiza um flashcard existente.

**Body:**

```json
{
  "resposta": "A biblioteca bcrypt, para garantir a segurança dos dados."
}
```

**Resposta:**

```json
{
  "mensagem": "Flashcard atualizado com sucesso!"
}
```

---

### ➤ `[DELETE] /flashcards/10`

Remove um flashcard pelo ID.

```json
{
  "mensagem": "Flashcard excluído com sucesso!"
}
```

---

## ✅ Observações

* A API segue o padrão REST.
* As senhas dos administradores são criptografadas utilizando a biblioteca **bcrypt**.
* O projeto foi desenvolvido exclusivamente para fins acadêmicos.
