import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as S from "./Styled"


export default function App() {
  const [dado, setDado] = useState([]);
  const [categoria, setCategoria] = useState("animation");
  const [filmes, setFilmes] = useState("");
  
  async function buscaDados () {
    const Dados = await axios.get(`https://api.sampleapis.com/movies/${categoria}`)

    console.log(Dados.data)
    setDado(Dados.data)
  } 

  useEffect (() => {
      buscaDados()
    },[categoria])


      const filtrados = dado.filter( (item) =>
      item.title.toLowerCase().includes(filmes.toLowerCase())
    );

    
     
  return (
    <>
    <S.sectionNav>
      <h2 onClick={() => setCategoria("animation")}>Filmes</h2>
      <nav>
        <button onClick={() => setCategoria("horror") }>Terror</button>
        <button onClick={() => setCategoria("comedy") }>Comédia</button>
        <button onClick={() => setCategoria("family") }>Familia</button>
    <input 
      type="text" 
      placeholder="Digite um filme"
      onChange={(e) => setFilmes(e.target.value)}
      />
       </nav>
    </S.sectionNav>

    <S.sectionFilmes>
      {
      
        filtrados.map((item) => (
          <div>
            <img src={item.posterURL} alt="" />
            <figcaption>{item.title}</figcaption>
          </div> 
        ))
      }
      </S.sectionFilmes>

    <S.footer>
      <p>Copywriting todos os direitos reservados - Diego Henrique | VaiNaWeb</p>
    </S.footer>
    </>
  )
}