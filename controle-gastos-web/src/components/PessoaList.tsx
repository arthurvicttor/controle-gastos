import type { Pessoa } from "../types";
import { pessoaService } from "../services/pessoaService";

interface Props {
  pessoas: Pessoa[];
  onPessoaDeletada: () => void;
}

export function PessoaList({ pessoas, onPessoaDeletada }: Props) {
  async function handleDeletar(id: string, nome: string) {
    const confirmou = window.confirm(
      `Tem certeza que deseja excluir "${nome}"? Todas as transações dessa pessoa também serão apagadas.`,
    );
    if (!confirmou) return;

    try {
      await pessoaService.deletar(id);
      onPessoaDeletada();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao deletar pessoa.");
    }
  }

  if (pessoas.length === 0) {
    return <p>Nenhuma pessoa cadastrada.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pessoas.map((p) => (
          <tr key={p.id}>
            <td>{p.nome}</td>
            <td>{p.idade}</td>
            <td>
              <button onClick={() => handleDeletar(p.id, p.nome)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
