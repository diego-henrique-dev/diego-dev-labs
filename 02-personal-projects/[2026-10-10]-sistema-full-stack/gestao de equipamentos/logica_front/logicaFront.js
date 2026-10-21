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
                    "Content-Type": "application/json"
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
        console.log("Erro ao conectar com o servidor: " , erro);
        respostaParagrafo.innerText = "Erro ao conectar com o servidor!";
    }
})




// GET - Buscar todos os registros

document.getElementById('btnListar').addEventListener('click', async () => {

    const listaServico = document.getElementById('listaServicos');
    const itemLista = document.createElement('li');
    listaServico.appendChild(itemLista);

    try {

        const respostaGet = await fetch('http://localhost:3000/api/servicos');

        const respostaServidorGet = await respostaGet.json();

        if (respostaServidorGet.erro == "Erro ao buscar os dados no banco:") {
            
            itemLista.innerText = "Erro ao buscar os dados no banco!";

        } else if (respostaServidorGet.erro == "Banco de dados vazio!") {
           
            itemLista.innerText = "Banco de dados vazio!";

        } else {
            respostaServidorGet.forEach((item) => {

                if (item.cliente === "" && item.pc === "" && item.problema === "") {
                    return
                } else {
                    
                    itemLista.innerText = `Cliente: ${item.cliente} | Modelo: ${item.pc} | Problema: ${item.problema}`;
                  
                }
            })
        }

    } catch (erro) {
        console.log("Erro ao conectar com o servidor: ", erro);
        itemLista.innerText = "Erro ao conectar com o servidor!";
        
    }
})