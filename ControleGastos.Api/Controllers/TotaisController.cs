using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Models.Dtos;
using ControleGastos.Api.Services;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TotaisController : ControllerBase
    {
        private readonly TotaisService _service;

        public TotaisController(TotaisService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ConsultaTotaisDto>> Consultar()
        {
            return Ok(await _service.ConsultarAsync());
        }
    }
}