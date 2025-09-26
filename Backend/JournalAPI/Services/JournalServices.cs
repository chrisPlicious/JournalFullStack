using JournalAPI.Models;
using JournalAPI.Repositories;
using JournalAPI.DTOs;

// Buisiness Logic Layer
// HANDLING RULES AND VALIDATION (SRP)
namespace JournalAPI.Services;

//Dependency Injection (DI)
public class JournalService : IJournalService
{
    private readonly IJournalRepository _repository;

    public JournalService(IJournalRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<JournalSummaryDto>> GetAllEntriesAsync()
    {
        var entries = await _repository.GetAllEntriesAsync();

        return entries.Select(e => new JournalSummaryDto
        {
            Id = e.Id,
            Title = e.Title,
            Category = e.Category,
            CreatedAt = e.CreatedAt
        });
    }

    public async Task<JournalDetailDto?> GetEntryByIdAsync(int id)
    {
        var entry = await _repository.GetEntryByIdAsync(id);
        if (entry == null) return null;

        return new JournalDetailDto
        {
            Id = entry.Id,
            Title = entry.Title,
            Content = entry.Content,
            Category = entry.Category,
            CreatedAt = entry.CreatedAt,
            UpdatedAt = entry.UpdatedAt
        };
    }

    public async Task<JournalDetailDto> CreateEntryAsync(JournalCreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            throw new ArgumentException("Title cannot be empty");

        var entry = new JournalModels
        {
            Title = dto.Title,
            Content = dto.Content,
            Category = string.IsNullOrWhiteSpace(dto.Category) ? "General" : dto.Category,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        var created = await _repository.CreateEntryAsync(entry);

        return new JournalDetailDto
        {
            Id = created.Id,
            Title = created.Title,
            Content = created.Content,
            Category = created.Category,
            CreatedAt = created.CreatedAt,
            UpdatedAt = created.UpdatedAt
        };
    }

    public async Task<bool> UpdateEntryAsync(int id, JournalUpdateDto dto)
    {
        var entry = await _repository.GetEntryByIdAsync(id);
        if (entry == null) return false;

        entry.Title = dto.Title;
        entry.Content = dto.Content;
        entry.Category = dto.Category;
        entry.UpdatedAt = DateTime.Now;

        await _repository.UpdateEntryAsync(entry);
        return true;
    }

    public async Task DeleteEntryAsync(int id)
    {
        await _repository.DeleteEntryAsync(id);
        return;
    }

    public async Task<IEnumerable<JournalSummaryDto>> GetEntriesByCategoryAsync(string category)
    {
        var entries = await _repository.GetEntriesByCategoryAsync(category);

        return entries.Select(e => new JournalSummaryDto
        {
            Id = e.Id,
            Title = e.Title,
            Category = e.Category,
            CreatedAt = e.CreatedAt
        });
    }

}
