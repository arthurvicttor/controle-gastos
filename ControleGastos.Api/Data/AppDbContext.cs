using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.Data
{
    /// <summary>
    /// Define as tabelas e as regras de relacionamento entre pessoa e transacao.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Pessoa> Pessoas => Set<Pessoa>();
        public DbSet<Transacao> Transacoes => Set<Transacao>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Pessoa: Id gerado automaticamente
            modelBuilder.Entity<Pessoa>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            // Transacao: Id gerado automaticamente
            modelBuilder.Entity<Transacao>()
                .Property(t => t.Id)
                .ValueGeneratedOnAdd();

            // Configura o relacionamento entre Pessoa e Transacao
            modelBuilder.Entity<Transacao>()
                .HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacoes)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}