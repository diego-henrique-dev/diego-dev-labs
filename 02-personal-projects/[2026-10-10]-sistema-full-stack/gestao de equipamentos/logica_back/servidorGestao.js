const express = require('express');
const cors = require('cors');

const app = express();
const PORTA = 3000;
const dados = [];

app.use(express.json());
app.use(cors());


//POST - Cadastrar 

app.post('/api/cadastro' , (req, res) => {
    const mensagemRecebidaPost = req.body; 
  
    console.log("O Front-end me enviou esses dados:" , mensagemRecebidaPost);

    dados.push(mensagemRecebidaPost);

    res.json({ respostaPost: "Recebi os dados com sucesso." })
})

// GET - Pegar o que ja está cadastrado


app.get('/api/lista' , (req, res) => {
  
    console.log("O Front-end solicitou esses dados:" , dados);

    res.json(dados);
})

app.listen(PORTA, () => {
    console.log(`Servidor (API) rodando em: http://localhost:${PORTA}`);
})