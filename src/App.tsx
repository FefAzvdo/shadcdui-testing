import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

type Endereco = {
  cep: string;
  city: string;
  neighborhood: string;
  service: string;
  state: string;
  street: string;
};

function App() {
  const [cep, setCep] = useState("");
  const [dadosEndereco, setDadosEndereco] = useState<Endereco>();
  const [loading, setLoading] = useState(false);

  // Estado para controlar o tema
  const [darkMode, setDarkMode] = useState(false);

  // Carregar o tema do localStorage ou usar o tema padrão
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  // Mudar o tema e salvar a preferência no localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  const buscarCEP = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v1/${cep}`
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar o CEP ${response.statusText}`);
      }

      const data = await response.json();
      setDadosEndereco(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(`Erro desconhecido ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatarCEP = (cep: string) => {
    return cep
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/^(\d{5})(\d{0,3})/, "$1-$2") // Adiciona o hífen após os primeiros 5 dígitos
      .slice(0, 9); // Garante que o CEP tenha no máximo 9 caracteres
  };

  return (
    <div className={`${"w-screen h-screen"}  ${darkMode ? "dark" : "light"}`}>
      <header>
        <h1>Blog Post sobre Dark Mode em React</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </header>
      <main>
        <section>
          <h2>O que é Dark Mode?</h2>
          <p>
            O Dark Mode é uma configuração de interface que troca a paleta de
            cores para tons mais escuros, melhorando a leitura em ambientes com
            pouca luz.
          </p>
        </section>
        <div className="flex">
          <input
            style={{ background: darkMode ? "gray" : "white" }}
            className="min-w-12 mr-4"
            type="text"
            placeholder="CEP"
            value={formatarCEP(cep)}
            onChange={(e) => setCep(e.target.value)}
          />
          <Button onClick={buscarCEP}>Pesquisar</Button>
        </div>
        {dadosEndereco &&
          (loading ? (
            <p className="mt-4">"Carregando..."</p>
          ) : (
            <ul className="mt-4">
              {Object.entries(dadosEndereco).map((keyVal) => (
                <p>
                  {keyVal[0]} - {keyVal[1]}
                </p>
              ))}
            </ul>
          ))}
      </main>
    </div>
  );
}

export default App;
