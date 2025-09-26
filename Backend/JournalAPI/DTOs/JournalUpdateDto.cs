namespace JournalAPI.DTOs
{
    public class JournalUpdateDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? Category { get; set; } = "General";
    }
}