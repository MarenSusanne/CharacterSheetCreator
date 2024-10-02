using CharacterSheetCreator.Dtos.User;
using CharacterSheetCreator.Models;

namespace CharacterSheetCreator.Mappers;

public static class UserMapper
{
    public static UserDto ToUserDto(this User userModel)
    {
        return new UserDto()
        {
            Id = userModel.Id,
            UserName = userModel.UserName,
            UserEmail = userModel.UserEmail

        };
    }

    public static User ToUserFromCreateDTO(this CreateUserRequestDto userDto)
    {
        return new User
        {
            UserName = userDto.UserName,
            UserEmail = userDto.UserEmail,
            Password = userDto.Password
        };
    }
}