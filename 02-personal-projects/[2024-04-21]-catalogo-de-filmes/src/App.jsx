import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import * as S from "./Styled"


export default function App() {
  const [dado, setDado] = useState([]);
  const [categoria, setCategoria] = useState("comedy");
  const [filmes, setFilmes] = useState("");

  async function buscaDados() {
    const Dados = await axios.get(`https://api.sampleapis.com/movies/${categoria}`)

    console.log(Dados.data)
    setDado(Dados.data)
  }

  useEffect(() => {
    buscaDados()
  }, [categoria])


<<<<<<< HEAD
  const filtrados = dado.filter((item) =>
    item.title.toLowerCase().includes(filmes.toLowerCase())
  );

=======
      const filtrados = dado.filter( (item) =>
      item.title.toLowerCase().includes(filmes.toLowerCase())
    );

    
     
>>>>>>> be1ec6f628faeda0fd795a6c8d9984969e319f92
  return (
    <>
      <S.sectionNav>
        <h2 onClick={() => setCategoria("comedy")}>Filmes</h2>
        <nav>
          <button onClick={() => setCategoria("horror")}>Terror</button>
          <button onClick={() => setCategoria("comedy")}>Comédia</button>
          <button onClick={() => setCategoria("family")}>Familia</button>
          <input
            type="text"
            placeholder="Digite um filme"
            onChange={(e) => setFilmes(e.target.value)}
          />
        </nav>
      </S.sectionNav>

<<<<<<< HEAD
      <S.sectionFilmes>
        {

          filtrados.map((item) => (
            <div className="divPoster">
              <img src={item.posterURL} alt="" />
              <figcaption>{item.title}</figcaption>
            </div>
          ))
        }
=======
    <S.sectionFilmes>
      {
      
        filtrados.map((item) => (
          <div>
            <img src={item.posterURL} alt="" />
            <figcaption>{item.title}</figcaption>
          </div> 
        ))
      }
>>>>>>> be1ec6f628faeda0fd795a6c8d9984969e319f92
      </S.sectionFilmes>

      <S.footer>
        <p>Copywriting todos os direitos reservados - Diego Henrique | VaiNaWeb</p>
      </S.footer>
    </>
  )
}