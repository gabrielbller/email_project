using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CotacaoManager.API.Models;
using CotacaoManager.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CotacaoManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailProcessingController : ControllerBase
    {
        private readonly ILLaMAService _llamaService;
        private readonly ILogger<EmailProcessingController> _logger;

        public EmailProcessingController(
            ILLaMAService llamaService,
            ILogger<EmailProcessingController> logger
        )
        {
            _llamaService = llamaService;
            _logger = logger;
        }

        [HttpPost("process")]
        public async Task<IActionResult> ProcessEmail([FromBody] EmailProcessingRequest request)
        {
            try
            {
                // Simular processamento com LLaMA
                var extractedData = new Dictionary<string, string>
                {
                    { "fornecedor", "Fornecedor Exemplo" },
                    { "valor_total", "1500.00" },
                    { "prazo_entrega", "15 dias" },
                };

                var result = new EmailProcessingResult
                {
                    EmailId = request.EmailId,
                    Subject = request.Subject,
                    Sender = request.Sender,
                    ReceivedDate = request.ReceivedDate,
                    ExtractedData = extractedData,
                    Success = true,
                    ErrorMessage = string.Empty,
                    Status = ProcessingStatus.Processed,
                    ProcessedDate = DateTime.UtcNow,
                };

                // TODO: Integrar com seu sistema ERP existente
                // await _erpService.CreateQuotationAsync(extractedData);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing email {EmailId}", request.EmailId);
                return StatusCode(
                    500,
                    new EmailProcessingResult
                    {
                        EmailId = request.EmailId,
                        Subject = request.Subject,
                        Sender = request.Sender,
                        ReceivedDate = request.ReceivedDate,
                        ExtractedData = new Dictionary<string, string>(),
                        Success = false,
                        ErrorMessage = ex.Message,
                        Status = ProcessingStatus.Failed,
                        ProcessedDate = DateTime.UtcNow,
                    }
                );
            }
        }
    }

    public class EmailProcessingRequest
    {
        public required string EmailId { get; set; }
        public required string Subject { get; set; }
        public required string Sender { get; set; }
        public DateTime ReceivedDate { get; set; }
        public required string EmailContent { get; set; }
    }
}
