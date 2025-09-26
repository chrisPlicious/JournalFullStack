using JournalAPI.Models;
using JournalAPI.Data;
using Microsoft.EntityFrameworkCore;

// HANDLING DATA ACCESS (SRP)
namespace JournalAPI.Repositories
{
    public class JournalRepository : IJournalRepository
    {
        private readonly JournalDbContext _context;

        public JournalRepository(JournalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<JournalModels>> GetAllEntriesAsync()
        {
            return await _context.JournalEntries.ToListAsync();
        }

        public async Task<JournalModels?> GetEntryByIdAsync(int id)
        {
            return await _context.JournalEntries.FindAsync(id);
        }

        public async Task<IEnumerable<JournalModels>> GetEntriesByCategoryAsync(string category)
        {
            return await _context.JournalEntries.Where(x => x.Category == category).ToListAsync();
        }

        public async Task<JournalModels> CreateEntryAsync(JournalModels entry)
        {
            _context.JournalEntries.Add(entry);
            await _context.SaveChangesAsync();
            return entry;
        }

        public async Task UpdateEntryAsync(JournalModels entry)
        {
            _context.Entry(entry).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEntryAsync(int id)
        {
            var entry = await _context.JournalEntries.FindAsync(id);
            if (entry != null)
            {
                _context.JournalEntries.Remove(entry);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<JournalModels>> GetJournalsByCategoryAsync(string category)
        {
            return await _context.JournalEntries
                .Where(j => j.Category == category)
                .ToListAsync();
        }

    }
}