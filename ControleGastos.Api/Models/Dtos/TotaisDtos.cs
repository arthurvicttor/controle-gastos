namespace ControleGastos.Api.Models.Dtos
{
    // Totais de receitas, despesas e saldo de uma pessoa específica.
    public class TotalPorPessoaDto
    {
        public Guid PessoaId { get; set; }
        public string PessoaNome { get; set; } = string.Empty;
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }

    // Totais gerais de receitas, despesas e saldo de todas as pessoas.
    public class ConsultaTotaisDto
    {
        public List<TotalPorPessoaDto> Pessoas { get; set; } = new();
        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }
        public decimal SaldoGeral { get; set; }
    }
}