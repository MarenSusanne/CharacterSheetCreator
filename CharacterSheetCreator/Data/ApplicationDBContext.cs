using CharacterSheetCreator.Models;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheetCreator.Data;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {

    }
    public DbSet<Character> Characters { get; set; }
    public DbSet<Equipment> Equipment { get; set; }
}