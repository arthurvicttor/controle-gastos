using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastos.Api.Models
{
    // Representa uma transação financeira no sistema
    public class Transacao
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(200, MinimumLength = 1)]
        public string Descricao { get; set; } = string.Empty;

        // Valor monetário da transação é sempre positivo;
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }

        [Required]
        // Tipo da transação: Receita ou Despesa
        public TipoTransacao Tipo { get; set; }

        // Chave estrangeira para a pessoa associada à transação
        [Required]
        public Guid PessoaId { get; set; }

        // Relacionamento com a entidade Pessoa
        public Pessoa? Pessoa { get; set; }
    }
}