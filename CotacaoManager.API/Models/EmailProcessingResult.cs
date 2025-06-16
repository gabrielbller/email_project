using System;
using System.Collections.Generic;

namespace CotacaoManager.API.Models
{
    public class EmailProcessingResult
    {
        public required string EmailId { get; set; }
        public required string Subject { get; set; }
        public required string Sender { get; set; }
        public DateTime ReceivedDate { get; set; }
        public required Dictionary<string, string> ExtractedData { get; set; }
        public bool Success { get; set; }
        public required string ErrorMessage { get; set; }
        public ProcessingStatus Status { get; set; }
        public DateTime ProcessedDate { get; set; }
    }

    public enum ProcessingStatus
    {
        Pending,
        Processing,
        Processed,
        Failed,
    }
}
