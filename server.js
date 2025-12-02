import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 3000;
let pool = null;
const SALT_ROUNDS = 10;

app.use(express.json());

function conectarBD() {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.URL_BD,
        });
    }
    return pool;
}

app.get("/flashcards", async (req, res) => {
    const db = conectarBD();
    try {
        const resultado = await db.query("SELECT * FROM flashcards");
        res.json(resultado.rows);
    } catch (e) {
        console.error("Erro ao buscar flashcards:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.get("/flashcards/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const db = conectarBD();
        const consulta = "SELECT * FROM flashcards WHERE id = $1";
        const resultado = await db.query(consulta, [id]);
        const dados = resultado.rows;
        if (dados.length === 0) {
            return res.status(404).json({ mensagem: "Flashcard não encontrado" });
        }
        res.json(dados[0]);
    } catch (e) {
        console.error("Erro ao buscar flashcard:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.post("/flashcards", async (req, res) => {
    try {
        const { pergunta, resposta } = req.body; 
        
        if (!pergunta || !resposta) {
            return res.status(400).json({
                erro: "Dados inválidos",
                mensagem: "Todos os campos (pergunta, resposta) são obrigatórios.",
            });
        }
        const db = conectarBD();
        const consulta = "INSERT INTO flashcards (pergunta, resposta) VALUES ($1, $2) RETURNING id";
        const valores = [pergunta, resposta]; 
        
        const resultado = await db.query(consulta, valores);
        res.status(201).json({ mensagem: "Flashcard criado com sucesso!", id: resultado.rows[0].id });
    } catch (e) {
        console.error("Erro ao inserir flashcard:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.put("/flashcards/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const db = conectarBD();

        let consulta = "SELECT pergunta, resposta FROM flashcards WHERE id = $1";
        let resultado = await db.query(consulta, [id]);
        let flashcard = resultado.rows;

        if (flashcard.length === 0) {
            return res.status(404).json({ mensagem: "Flashcard não encontrado" });
        }

        const data = req.body;
        const pergunta = data.pergunta || flashcard[0].pergunta;
        const resposta = data.resposta || flashcard[0].resposta;

        consulta = "UPDATE flashcards SET pergunta = $1, resposta = $2 WHERE id = $3";
        await db.query(consulta, [pergunta, resposta, id]);

        res.status(200).json({ mensagem: "Flashcard atualizado com sucesso!" });
    } catch (e) {
        console.error("Erro ao atualizar flashcard:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.delete("/flashcards/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const db = conectarBD();

        const consulta = "DELETE FROM flashcards WHERE id = $1";
        const resultado = await db.query(consulta, [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: "Flashcard não encontrado para exclusão" });
        }

        res.status(200).json({ mensagem: "Flashcard excluído com sucesso!" });
    } catch (e) {
        console.error("Erro ao excluir flashcard:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.post("/admin", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: "Dados inválidos",
                mensagem: "Todos os campos (nome, email, senha) são obrigatórios.",
            });
        }

        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

        const db = conectarBD();
        const consulta = "INSERT INTO admin (nome, email, senha) VALUES ($1, $2, $3) RETURNING id AS id, nome, email";
        const resultado = await db.query(consulta, [nome, email, senhaHash]); 

        res.status(201).json({ mensagem: "Administrador criado com sucesso!", admin: resultado.rows[0] });
    } catch (e) {
        console.error("Erro ao criar administrador:", e);
        if (e.code === "23505") {
            return res.status(409).json({ erro: "Conflito", mensagem: "O email fornecido já está em uso." });
        }
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.get("/admin", async (req, res) => {
    const db = conectarBD();
    try {
        const resultado = await db.query("SELECT id AS id, nome, email FROM admin"); 
        res.json(resultado.rows);
    } catch (e) {
        console.error("Erro ao listar administradores:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.get("/admin/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const db = conectarBD();
        const consulta = "SELECT id AS id, nome, email FROM admin WHERE id = $1"; 
        const resultado = await db.query(consulta, [id]);
        const dados = resultado.rows;

        if (dados.length === 0) {
            return res.status(404).json({ mensagem: "Administrador não encontrado" });
        }
        res.json(dados[0]);
    } catch (e) {
        console.error("Erro ao buscar administrador:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.put("/admin/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Dados inválidos", mensagem: "Todos os campos (nome, email, senha) são obrigatórios para a atualização." });
        }
        
        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

        const db = conectarBD();
        const consulta = "UPDATE admin SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING id";
        const resultado = await db.query(consulta, [nome, email, senhaHash, id]); 

        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: "Administrador não encontrado para atualização" });
        }

        res.status(200).json({ mensagem: "Administrador atualizado com sucesso!" });
    } catch (e) {
        console.error("Erro ao atualizar administrador:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.delete("/admin/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const db = conectarBD();

        const consulta = "DELETE FROM admin WHERE id = $1";
        const resultado = await db.query(consulta, [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: "Administrador não encontrado para exclusão" });
        }

        res.status(200).json({ mensagem: "Administrador excluído com sucesso!" });
    } catch (e) {
        console.error("Erro ao excluir administrador:", e);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.get("/", async (req, res) => {
    const db = conectarBD();
    let dbStatus = "ok";
    try {
        await db.query("SELECT 1");
    } catch (e) {
        dbStatus = e.message;
    }
    res.json({ mensagem: "API para flashcards", autor: "Flash Up", dbStatus });
});

app.listen(port, () => {
    console.log(`Serviço rodando na porta ${port}`);
});

export default app;