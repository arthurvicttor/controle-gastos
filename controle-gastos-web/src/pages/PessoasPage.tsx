import { useEffect, useState } from "react";
import type { Pessoa } from "../types";
import { pessoaService } from "../services/pessoaService";
import { PessoaForm } from "../components/PessoaForm";
import { PessoaList } from "../components/PessoaList";

export function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarPessoas() {
    setCarregando(true);
    try {
      const dados = await pessoaService.listar();
      setPessoas(dados);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarPessoas();
  }, []);

  return (
    <div>
      <h2>Pessoas</h2>
      <PessoaForm onPessoaCriada={carregarPessoas} />
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <PessoaList pessoas={pessoas} onPessoaDeletada={carregarPessoas} />
      )}
    </div>
  );
}
