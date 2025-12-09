# back-end-tf-web

Back-End do trabalho final da disciplina de WEB

## Integrantes
- [Ana Paula Souza Carvalho](https://github.com/anapaulaszc)
- [Daniely dos Santos Silva](https://github.com/Dannydssilv)
- [Lívia Oliveira Cunha](https://github.com/liviacunha14)
- [Maria Eloísa Costa Silva](https://github.com/maeloisaaa)

---

## Atividade 5

**URL da API:** [https://literate-space-garbanzo-4j64r7qwvvp93j75v-3000.app.github.dev](https://literate-space-garbanzo-4j64r7qwvvp93j75v-3000.app.github.dev)

---

## Rotas de Admin

### `[GET] /admin`
Retorna todos os administradores:
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

### `[GET] /admin/1`
Retorna um administrador específico:
```json
{
  "id": 1,
  "nome": "Lívia Cunha",
  "email": "livia.cunha@email.com",
  "senha": "chatgpt1l0ve"
}
```

[POST] /admin

Descrição:
[
{
    "id": 4,
    "nome":"Maria Eloisa",
    "email": "malo12sa.costa@email.com", 
}
]
Body:
[
{
    "id": 4,
    "nome":"Maria Eloisa",
    "email": "malo12sa.costa@email.com", 
    "senha": "gbfgbfn"
}
]
[PUT] /admin/4

Descrição:
[
{
    "id": 4,
    "nome":"Maria Eloisa",
    "email": "malo12sa.costa@email.com", 
}
]
Body:
[
{
    "id": 4,
    "nome":"Maria Eloisa",
    "email": "malo12sa.costa@email.com", 
    "senha": "aqswswfgbfn"
}
]
[DELETE] /admin/2
Descrição:
[ 
"Administrador excluído com sucesso!"
]
//Flashcards//

[GET] /flashcards:
Descrição:  
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
  },
  {
    "id": 4,
    "pergunta": "Quem escreveu \"Dom Quixote\"?",
    "resposta": "Miguel de Cervantes."
  },
  {
    "id": 5,
    "pergunta": "Qual é o maior planeta do Sistema Solar?",
    "resposta": "Júpiter."
  },
  {
    "id": 6,
    "pergunta": "O que é o Teorema de Pitágoras?",
    "resposta": "Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos ($a^2 + b^2 = c^2$)."
  },
  {
    "id": 7,
    "pergunta": "O que é o ciclo de vida de um software?",
    "resposta": "É o conjunto de fases que englobam o desenvolvimento, implantação e manutenção de um software (planejamento, análise, design, implementação, teste e implantação)."
  },
  {
    "id": 8,
    "pergunta": "Qual é a capital da Austrália?",
    "resposta": "Camberra."
  },
  {
    "id": 9,
    "pergunta": "Em qual ano a Lei Áurea foi assinada no Brasil?",
    "resposta": "1888."
  },
  {
    "id": 10,
    "pergunta": "O que é \"Machine Learning\"?",
    "resposta": "É um campo da Inteligência Artificial que permite aos sistemas aprender com dados, identificar padrões e tomar decisões com o mínimo de intervenção humana."
  },
  {
    "id": 11,
    "pergunta": "Qual o principal gás responsável pelo efeito estufa?",
    "resposta": "Dióxido de carbono ($CO_2$)."
  }
]

[GET] /flashcards/1

Descrição:
[
{
    "id": 1,
    "pergunta": "Qual é a segunda lei de Newton?",
    "resposta": "Força é igual a massa vezes a aceleração (F = m * a)."
}
]
[POST] /flashcards

Descrição:
[
{
  "mensagem": "Flashcard criado com sucesso!",
  "id": 10
}
]
Body:
[
{
  "pergunta": "Qual biblioteca usamos para criptografar senhas na rota /admin?",
  "resposta": "A biblioteca bcrypt."
}
]
[PUT] /flashcards/10

Descrição:
[
{
  "mensagem": "Flashcard atualizado com sucesso!"
}
]
Body:
[
{
  "resposta": "A biblioteca bcrypt, para garantir a segurança dos dados."
}
]
[DELETE] /flashcards/10
Descrição: 
[
{
"Flashcard excluído com sucesso!"
}
]