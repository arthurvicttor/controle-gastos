import { useState } from "react";
import type { FormEvent } from "react";
import { pessoaService } from "../services/pessoaService";

interface Props {
  onPessoaCriada: () => void;
}

export function PessoaForm({ onPessoaCriada }: Props) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");

    if (!nome.trim()) {
      setErro("Informe o nome.");
      return;
    }

    const idadeNumero = Number(idade);
    if (!idade || idadeNumero < 0 || idadeNumero > 130) {
      setErro("Informe uma idade válida.");
      return;
    }

    setCarregando(true);
    try {
      await pessoaService.criar({ nome: nome.trim(), idade: idadeNumero });
      setNome("");
      setIdade("");
      onPessoaCriada();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao criar pessoa.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar pessoa</h3>

      <div>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome completo"
        />
      </div>

      <div>
        <label>Idade</label>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
          min={0}
          max={130}
        />
      </div>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <button type="submit" disabled={carregando}>
        {carregando ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  );
}
