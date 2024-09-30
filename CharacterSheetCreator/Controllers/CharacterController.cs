using CharacterSheetCreator.Data;
using CharacterSheetCreator.Dtos.Character;
using CharacterSheetCreator.Mappers;
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
            var character = _context.Characters.ToList()
                .Select(s => s.ToCharacterDto());

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

            return Ok(character.ToCharacterDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateCharacterRequestDto CharacterDto)
        {
            var characterModel = CharacterDto.ToCharacterFromCreateDTO();
            _context.Characters.Add(characterModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = characterModel.Id }, characterModel.ToCharacterDto());
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateCharacterRequestDto updateDto)
        {
            var characterModel = _context.Characters.FirstOrDefault(x => x.Id == id);

            if (characterModel == null)
            {
                return NotFound();
            }

            characterModel.Name = updateDto.Name;
            characterModel.Class = updateDto.Class;
            characterModel.Race = updateDto.Race;
            characterModel.Level = updateDto.Level;
            characterModel.Strength = updateDto.Strength;
            characterModel.Dexterity = updateDto.Dexterity;
            characterModel.Constitution = updateDto.Constitution;
            characterModel.Intelligence = updateDto.Intelligence;
            characterModel.Wisdom = updateDto.Wisdom;
            characterModel.Charisma = updateDto.Charisma;

            _context.SaveChanges();

            return Ok(characterModel.ToCharacterDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var characterModel = _context.Characters.FirstOrDefault(x => x.Id == id);
            if (characterModel == null)
            {
                return NotFound();
            }

            _context.Characters.Remove(characterModel);
            _context.SaveChanges();

            return NoContent();
        }

    }


}
