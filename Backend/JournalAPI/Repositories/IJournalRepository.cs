using JournalAPI.Models;
// OPEN FOR EXTENSIONS CLOSED FOR MODIFICATION (OCP)

namespace JournalAPI.Repositories;

//abstraction 
//Controller doesn’t know how entries are created, just that it can call CreateEntryAsync.

public interface IJournalRepository
{
    Task<IEnumerable<JournalModels>> GetAllEntriesAsync();
    Task<JournalModels?> GetEntryByIdAsync(int id);
    Task<IEnumerable<JournalModels>> GetEntriesByCategoryAsync(string category);
    Task<JournalModels> CreateEntryAsync(JournalModels entry);
    Task UpdateEntryAsync(JournalModels entry);
    Task DeleteEntryAsync(int id);
    
}