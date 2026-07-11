
using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models
{
    // Representa uma pessoa no sistema.
    public class Pessoa
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(150, MinimumLength = 1)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "A idade é obrigatória.")]
        [Range(0, 130, ErrorMessage = "Idade inválida.")]
        public int Idade { get; set; }

        public List<Transacao> Transacoes { get; set; } = new();

        public bool EhMenorDeIdade => Idade < 18;
    }
}