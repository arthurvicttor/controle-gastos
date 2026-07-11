namespace ControleGastos.Api.Models.Dtos
{
    // Dados necessários para criar uma nova pessoa.
    public class CriarPessoaDto
    {
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }

    // Representação de pessoa retornada pela API.
    public class PessoaDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }
}