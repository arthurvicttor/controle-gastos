using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Dtos;

namespace ControleGastos.Api.Services
{
    // Resultado da tentativa de criar uma transação, incluindo sucesso, erro e dados da transação criada.
    public class ResultadoCriarTransacao
    {
        public bool Sucesso { get; set; }
        public string? Erro { get; set; }
        public bool PessoaNaoEncontrada { get; set; }
        public TransacaoDto? Transacao { get; set; }
    }

    public class TransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TransacaoDto>> ListarAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Select(t => new TransacaoDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo,
                    PessoaId = t.PessoaId,
                    PessoaNome = t.Pessoa!.Nome
                })
                .ToListAsync();
        }

        public async Task<ResultadoCriarTransacao> CriarAsync(CriarTransacaoDto dto)
        {
            var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);
            if (pessoa is null)
            {
                return new ResultadoCriarTransacao { Sucesso = false, PessoaNaoEncontrada = true };
            }

            // Regra de negócio: menor de idade só pode registrar despesas.
            if (pessoa.EhMenorDeIdade && dto.Tipo == TipoTransacao.Receita)
            {
                return new ResultadoCriarTransacao
                {
                    Sucesso = false,
                    Erro = "Pessoa menor de idade só pode cadastrar despesas, não receitas."
                };
            }

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId
            };

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return new ResultadoCriarTransacao
            {
                Sucesso = true,
                Transacao = new TransacaoDto
                {
                    Id = transacao.Id,
                    Descricao = transacao.Descricao,
                    Valor = transacao.Valor,
                    Tipo = transacao.Tipo,
                    PessoaId = transacao.PessoaId,
                    PessoaNome = pessoa.Nome
                }
            };
        }
    }
}