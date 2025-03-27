import { useEffect, useState } from "react";
import "./botao.css";

 function BotaoTema() {
  const [temaEscuro, setTemaEscuro] = useState(() => {
    return localStorage.getItem("tema") === "escuro";
  });

  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.classList.add("modo-escuro");
      localStorage.setItem("tema", "escuro");
    } else {
      document.documentElement.classList.remove("modo-escuro");
      localStorage.setItem("tema", "claro");
    }
  }, [temaEscuro]);

  return (
    <button onClick={() => setTemaEscuro(!temaEscuro)} className="botao-tema">
      {temaEscuro ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
}

export default BotaoTema;