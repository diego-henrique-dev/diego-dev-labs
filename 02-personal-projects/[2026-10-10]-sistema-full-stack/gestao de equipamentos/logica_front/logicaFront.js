// POST - Criar novo registro

document.getElementById('btnCriar').addEventListener('click', async () => {

    const cliente = document.getElementById('nomeCliente').value;
    const pc = document.getElementById('modeloPc').value;
    const problema = document.getElementById('problema').value;
    const respostaParagrafo = document.getElementById('respostaParagrafo');

    try {

        const respostaPost = await fetch('http://localhost:3000/api/servicos',
            {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        cliente: cliente,
                        pc: pc,
                        problema: problema
                    })
            });


        const respostaServidorPost = await respostaPost.json();

        if (respostaServidorPost.erro == "Não tem dados para serem salvos!") {
            respostaParagrafo.innerText = "Necessário preencher com os dados!";
        } else if (respostaServidorPost.erro == "Erro ao salvar") {
            respostaParagrafo.innerText = "Erro ao salvar no banco!";
        } else if (respostaServidorPost.mensagem) {
            respostaParagrafo.innerText = "Cadastro realizado com sucesso!";
        }

    } catch (erro) {
        console.log("Erro ao conectar com o servidor: ", erro);
        respostaParagrafo.innerText = "Erro ao conectar com o servidor!";
    }
})




// GET - Buscar todos os registros

document.getElementById('btnListar').addEventListener('click', async () => {

    const listaServico = document.getElementById('listaServicos');


    try {

        const respostaGet = await fetch('http://localhost:3000/api/servicos');

        const respostaServidorGet = await respostaGet.json();



        if (respostaServidorGet.erro == "Erro ao buscar os dados no banco:") {

            itemLista.innerText = "Erro ao buscar os dados no banco!";

        } else if (respostaServidorGet.erro == "Banco de dados vazio!") {

            itemLista.innerText = "Banco de dados vazio!";

        } else {

            listaServico.innerHTML = "";

            respostaServidorGet.forEach((item) => {

                if (item.cliente === "" && item.pc === "" && item.problema === "" && item.status === "") {
                    return
                } else {
                    const itemLista = document.createElement('li');
                    itemLista.innerText = `ID: ${item.id} | Cliente: ${item.cliente} | Modelo: ${item.pc} | Problema: ${item.problema} | Status: ${item.status}`;
                    listaServico.appendChild(itemLista);
                }
            })
        }

    } catch (erro) {
        console.log("Erro ao conectar com o servidor: ", erro);
        itemLista.innerText = "Erro ao conectar com o servidor!";

    }
});


// PATCH - Atualizar o status 

document.getElementById('btnAtualizar').addEventListener('click', async () => {

    const ValueID = document.getElementById('idAtualizar').value;
    const ValueStatus = document.getElementById('novoStatus').value;
    const paragrafoRespostaPatch = document.getElementById('mensagemPatch');

    try {

        const updateStatus = await fetch('http://localhost:3000/api/patch/servicos',
            {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(
                    {
                        id: ValueID,
                        novoStatus: ValueStatus
                    }
                )
            });

        const respostaPatch = await updateStatus.json();

        if (respostaPatch.erro === "Valor do ID vazio!") {

            paragrafoRespostaPatch.innerText = "Erro! Valor do ID vazio.";

        } else if (respostaPatch.erro === "Erro ao tentar atualizar!") {

            paragrafoRespostaPatch.innerText = "Erro ao tentar atualizar no banco de dados!";

        } else if (respostaPatch.erro === "Nenhum registro encontrado com esse ID.") {

            paragrafoRespostaPatch.innerText = "Nenhum registro encontrado com esse ID.";
        } else {
            paragrafoRespostaPatch.innerText = "Status atualizado com sucesso!";
        }



    } catch (error) {
        console.log(error);
        paragrafoRespostaPatch.innerText = "Erro ao se conectar com o servidor!";
    }
});





