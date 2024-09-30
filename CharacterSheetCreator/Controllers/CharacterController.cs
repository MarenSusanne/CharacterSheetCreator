using CharacterSheetCreator.Data;
using Microsoft.AspNetCore.Mvc;

namespace CharacterSheetCreator.Controllers
{
    [Route("api/character")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public CharacterController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var character = _context.Characters.ToList();

            return Ok(character);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var character = _context.Characters.Find(id);

            if (character == null)
            {
                return NotFound();
            }

            return Ok(character);
        }

    }


}
