namespace JournalAPI.DTOs
{
    public class JournalSummaryDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Category { get; set; } = "General";
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}