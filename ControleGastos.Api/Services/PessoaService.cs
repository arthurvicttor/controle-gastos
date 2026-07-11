using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Dtos;

namespace ControleGastos.Api.Services
{
    // Serviço responsável por gerenciar operações relacionadas a pessoas.
    public class PessoaService
    {
        private readonly AppDbContext _context;

        public PessoaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<PessoaDto>> ListarAsync()
        {
            return await _context.Pessoas
                .Select(p => new PessoaDto { Id = p.Id, Nome = p.Nome, Idade = p.Idade })
                .ToListAsync();
        }

        public async Task<PessoaDto> CriarAsync(CriarPessoaDto dto)
        {
            var pessoa = new Pessoa { Nome = dto.Nome, Idade = dto.Idade };
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return new PessoaDto { Id = pessoa.Id, Nome = pessoa.Nome, Idade = pessoa.Idade };
        }

        // Atualiza os dados de uma pessoa existente.
        // Retorna true se a atualização foi bem-sucedida, false caso contrário.
        public async Task<bool> DeletarAsync(Guid id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa is null) return false;

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Pessoa?> ObterEntidadeAsync(Guid id)
        {
            return await _context.Pessoas.FindAsync(id);
        }
    }
}