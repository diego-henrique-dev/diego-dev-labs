// POST - Criar novo registro

document.getElementById('btnCriar').addEventListener('click', async () => {

    const nomeCliente = document.getElementById('nomeCliente').value;
    const modeloPC = document.getElementById('modeloPc').value;
    const problema = document.getElementById('problema').value;
    const respostaParagrafo = document.getElementById('respostaParagrafo');

    try {

        const respostaPost = await fetch('http://localhost:3000/api/cadastro',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        nomeCliente: nomeCliente,
                        modeloPC: modeloPC,
                        problema: problema
                    })
            });

        const respostaServidorPost = await respostaPost.json();

        respostaParagrafo.innerText = "Cadastro realizado com sucesso!";

    } catch (erro) {
        respostaParagrafo.innerText = "Erro ao conectar com o servidor!";
        console.error(erro);
    }
})


// GET - Buscar todos os registros

document.getElementById('btnListar').addEventListener('click', async () => {

    const listaServico = document.getElementById('listaServicos');

    try {

        const respostaGet = await fetch('http://localhost:3000/api/lista');

        const respostaServidorGet = await respostaGet.json();

        listaServico.innerText = "";

        respostaServidorGet.forEach((item) => {

            if (item.nomeCliente ==="" && item.modeloPC ==="" && item.problema === "") {
                return
            } else {
                const itemLista = document.createElement('li');
                const quebraLinha = document.createElement('br');

                itemLista.innerText = `Cliente: ${item.nomeCliente} | Modelo: ${item.modeloPC} | Problema: ${item.problema}`;
                listaServico.appendChild(itemLista);
                listaServico.appendChild(quebraLinha);
                
            }
        })

    } catch (erro) {
        listaServico.innerText = "Erro ao conectar com o servidor!";
        console.error(erro)
    }
})