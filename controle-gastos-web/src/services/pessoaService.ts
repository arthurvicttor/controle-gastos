import request from "./api";
import type { Pessoa, CriarPessoaDto } from "../types";

export const pessoaService = {
  listar: () => request<Pessoa[]>("/pessoas"),

  criar: (dto: CriarPessoaDto) =>
    request<Pessoa>("/pessoas", {
      method: "POST",
      body: JSON.stringify(dto),
    }),

  deletar: (id: string) =>
    request<void>(`/pessoas/${id}`, { method: "DELETE" }),
};
