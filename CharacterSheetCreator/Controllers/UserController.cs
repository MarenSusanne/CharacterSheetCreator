using CharacterSheetCreator.Data;
using CharacterSheetCreator.Dtos.User;
using CharacterSheetCreator.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace CharacterSheetCreator.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public UserController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var user = _context.Users.ToList()
                .Select(s => s.ToUserDto());

            return Ok(user);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.ToUserDto());
        }
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginRequestDto loginDto)
        {
            var user = _context.Users.SingleOrDefault(u => u.UserName == loginDto.Username && u.Password == loginDto.Password);

            if (user == null)
            {
                return Unauthorized(); // Return 401 if the user is not found
            }

            return Ok(user.ToUserDto()); // Or whatever data you want to return
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] CreateUserRequestDto UserDto)
        {
            var userModel = UserDto.ToUserFromCreateDTO();
            _context.Users.Add(userModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = userModel.Id }, userModel.ToUserDto());
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateUserRequestDto updateDto)
        {
            var userModel = _context.Users.FirstOrDefault(x => x.Id == id);

            if (userModel == null)
            {
                return NotFound();
            }

            userModel.UserName = updateDto.UserName;
            userModel.UserEmail = updateDto.UserEmail;
            userModel.Password = updateDto.Password;

            _context.SaveChanges();

            return Ok(userModel.ToUserDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var characterModel = _context.Users.FirstOrDefault(x => x.Id == id);
            if (characterModel == null)
            {
                return NotFound();
            }

            _context.Users.Remove(characterModel);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
