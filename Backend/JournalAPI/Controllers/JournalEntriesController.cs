using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
using JournalAPI.Services;
using JournalAPI.DTOs;
// using Microsoft.Extensions.Logging;

// HANDLING HTTP REQUESTS FOR JOURNAL ENTRIES (SRP)
namespace JournalAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JournalEntriesController : ControllerBase
{
    private readonly IJournalService _service;
    private readonly ILogger<JournalEntriesController> _logger;

    public JournalEntriesController(IJournalService service, ILogger<JournalEntriesController> logger)
    {
        _service = service;
        _logger = logger;
    }

    // GET /api/journalentries
    [HttpGet]
    public async Task<ActionResult<IEnumerable<JournalSummaryDto>>> GetAll()
    {
        var list = await _service.GetAllEntriesAsync();
        return Ok(list);
    }

    // GET /api/journalentries/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<JournalDetailDto>> GetById(int id)
    {
        var dto = await _service.GetEntryByIdAsync(id);
        if (dto == null) return NotFound();
        return Ok(dto);
    }

    // POST /api/journalentries
    [HttpPost]
    public async Task<ActionResult<JournalDetailDto>> Create([FromBody] JournalCreateDto createDto)
    {
        try
        {
            var created = await _service.CreateEntryAsync(createDto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message, field = ex.ParamName ?? "Unknown" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating journal entry");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    // PUT /api/journalentries/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] JournalUpdateDto updateDto)
    {
        if (updateDto == null) return BadRequest(new { message = "Request body is required." });

        try
        {
            var updated = await _service.UpdateEntryAsync(id, updateDto);
            if (!updated) return NotFound();
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message, field = ex.ParamName ?? "Unknown" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating entry with ID {Id}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    // DELETE /api/journalentries/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _service.DeleteEntryAsync(id); // if your service returns bool, check it here instead
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting entry with ID {Id}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }
}
