using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Models.Dtos;
using ControleGastos.Api.Services;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly PessoaService _service;

        public PessoasController(PessoaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<PessoaDto>>> Listar()
        {
            return Ok(await _service.ListarAsync());
        }

        [HttpPost]
        public async Task<ActionResult<PessoaDto>> Criar([FromBody] CriarPessoaDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Nome))
                return BadRequest("O nome é obrigatório.");

            if (dto.Idade < 0 || dto.Idade > 130)
                return BadRequest("Idade inválida.");

            var pessoa = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(Listar), new { id = pessoa.Id }, pessoa);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(Guid id)
        {
            var sucesso = await _service.DeletarAsync(id);
            if (!sucesso) return NotFound("Pessoa não encontrada.");

            return NoContent();
        }
    }
}