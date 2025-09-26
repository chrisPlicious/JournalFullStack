using JournalAPI.DTOs;


// small and specific (ISP)
namespace JournalAPI.Services
{
    public interface IJournalService
    {
        Task<IEnumerable<JournalSummaryDto>> GetAllEntriesAsync();
        Task<JournalDetailDto?> GetEntryByIdAsync(int id);
        Task<IEnumerable<JournalSummaryDto>> GetEntriesByCategoryAsync(string category);
        Task<JournalDetailDto> CreateEntryAsync(JournalCreateDto dto);
        Task<bool> UpdateEntryAsync(int id, JournalUpdateDto dto);
        Task DeleteEntryAsync(int id);
    }
}