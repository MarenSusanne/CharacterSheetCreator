namespace CharacterSheetCreator.Models;

public class Equipment
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }

    public int? CharacterId { get; set; }
    public Character? Character { get; set; }
}