namespace JournalAPI.Models
{
    // ENCAPSILATING JOURNAL ENTRY DATA
    // internal details hidden but allow conttrlled access (Encapsulation)
    public class JournalModels
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? Category { get; set; } = "General";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }
}