CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);


CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL
);

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    nota INTEGER NOT NULL,
    comentario TEXT
);