using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Dtos;

namespace ControleGastos.Api.Services
{
    // Serviço responsável por calcular os totais de receitas, despesas e saldo geral.
    public class TotaisService
    {
        private readonly AppDbContext _context;

        public TotaisService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ConsultaTotaisDto> ConsultarAsync()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();

            var totaisPorPessoa = pessoas.Select(p => new TotalPorPessoaDto
            {
                PessoaId = p.Id,
                PessoaNome = p.Nome,
                TotalReceitas = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor),
                TotalDespesas = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor),
                Saldo = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor)
                      - p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor)
            }).ToList();

            return new ConsultaTotaisDto
            {
                Pessoas = totaisPorPessoa,
                TotalGeralReceitas = totaisPorPessoa.Sum(t => t.TotalReceitas),
                TotalGeralDespesas = totaisPorPessoa.Sum(t => t.TotalDespesas),
                SaldoGeral = totaisPorPessoa.Sum(t => t.Saldo)
            };
        }
    }
}