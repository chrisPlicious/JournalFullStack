using JournalAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JournalAPI.Data;
// INHERITANCE FROM DbContext
public class JournalDbContext : DbContext
{
    public JournalDbContext(DbContextOptions<JournalDbContext> options) : base(options) { }

    public DbSet<JournalModels> JournalEntries { get; set; }  // ✅ must match what repo uses

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries<JournalModels>();

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
