namespace ControleGastos.Api.Models.Dtos
{
    // Dados necessários para criar uma nova transação.
    public class CriarTransacaoDto
    {
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public Guid PessoaId { get; set; }
    }

    // Representação de transação retornada pela API.
    public class TransacaoDto
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public Guid PessoaId { get; set; }
        public string PessoaNome { get; set; } = string.Empty;
    }
}