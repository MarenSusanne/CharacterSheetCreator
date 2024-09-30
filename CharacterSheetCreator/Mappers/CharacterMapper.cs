using CharacterSheetCreator.Dtos.Character;
using CharacterSheetCreator.Models;

namespace CharacterSheetCreator.Mappers;

public static class CharacterMapper
{
    public static CharacterDto ToCharacterDto(this Character characterModel)
    {
        return new CharacterDto()
        {
            Id = characterModel.Id,
            Name = characterModel.Name,
            Class = characterModel.Class,
            Race = characterModel.Race,
            Level = characterModel.Level,
            Strength = characterModel.Strength,
            Dexterity = characterModel.Dexterity,
            Constitution = characterModel.Constitution,
            Intelligence = characterModel.Intelligence,
            Wisdom = characterModel.Wisdom,
            Charisma = characterModel.Charisma,
        };
    }

    public static Character ToCharacterFromCreateDTO(this CreateCharacterRequestDto characterDto)
    {
        return new Character
        {
            Name = characterDto.Name,
            Class = characterDto.Class,
            Race = characterDto.Race,
            Level = characterDto.Level,
            Strength = characterDto.Strength,
            Dexterity = characterDto.Dexterity,
            Constitution = characterDto.Constitution,
            Intelligence = characterDto.Intelligence,
            Wisdom = characterDto.Wisdom,
            Charisma = characterDto.Charisma,
        };
    }
}