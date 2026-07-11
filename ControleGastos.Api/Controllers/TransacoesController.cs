using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Models.Dtos;
using ControleGastos.Api.Services;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacoesController(TransacaoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<TransacaoDto>>> Listar()
        {
            return Ok(await _service.ListarAsync());
        }

        [HttpPost]
        public async Task<ActionResult<TransacaoDto>> Criar([FromBody] CriarTransacaoDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Descricao))
                return BadRequest("A descrição é obrigatória.");

            if (dto.Valor <= 0)
                return BadRequest("O valor deve ser maior que zero.");

            var resultado = await _service.CriarAsync(dto);

            if (resultado.PessoaNaoEncontrada)
                return NotFound("Pessoa não encontrada.");

            if (!resultado.Sucesso)
                return BadRequest(resultado.Erro);

            return CreatedAtAction(nameof(Listar), new { id = resultado.Transacao!.Id }, resultado.Transacao);
        }
    }
}