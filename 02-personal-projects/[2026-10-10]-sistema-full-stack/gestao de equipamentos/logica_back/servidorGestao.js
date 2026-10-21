const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(cors());



// 1. Cria a conexão e o arquivo do banco no disco rígido.

const db = new sqlite3.Database('./manutencoes.db', (err) => {
    if (err) {
        console.error("Erro ao conectar:", err.message);
    } else {
        console.log("Banco SQLite conectado!");

        db.run(`
            CREATE TABLE IF NOT EXISTS servicos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cliente TEXT,
                pc TEXT,
                problema TEXT
            )
        `, (erro) => {
            if (erro) {
                console.error("Erro ao criar tabela:", erro.message);
            } else {
                console.log("Tabela servicos pronta!");
            }
        });
    }
});


// 2. rota POST: Salvar dados no banco.

app.post('/api/servicos', (req, res) => {
    
    const { cliente, pc, problema } = req.body;

    if (!cliente?.trim() && !pc?.trim() && !problema?.trim()) {
        return res.status(400).json({ erro: "Não tem dados para serem salvos!" })
    } else {

        const comandoSQL = `INSERT INTO servicos (cliente, pc, problema) VALUES (?, ?, ?)`;

        db.run(comandoSQL, [cliente, pc, problema], function (erro) {
            
            if (erro) {

                console.log("Erro ao salvar no banco:", erro)

                return res.status(500).json({ erro: "Erro ao salvar" });
            }

            console.log("Sucesso, dados recebidos do front-end: ", cliente, pc, problema)

            res.json({ mensagem: "Serviço cadastrado com sucesso!" });
        });
    }
});


// 3. rota GET: Pegar os dados no banco e retornar para o front.

app.get('/api/servicos', (req, res) => {
    const comandoSQL = 'SELECT * FROM servicos';

    db.all(comandoSQL, [], (erro, linhas) => {

        if (erro) {

            console.log("Erro ao buscar os dados no banco: ", erro);

            return res.status(500).json({ erro: "Erro ao buscar!" });

        } else if (linhas.length === 0) {

            console.log("Banco de dados vazio!");

            return res.json({ erro: "Banco de dados vazio!" })

        } else {

            //Envia o array de registros extraídos do banco de volta para o Front-end
            console.log("Sucesso, enviando os dados para o front: ", linhas);
            res.json(linhas);
        }
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
})
