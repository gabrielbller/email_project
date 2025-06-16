using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CotacaoManager.API.Services
{
    public interface ILLaMAService
    {
        Task<Dictionary<string, object>> ExtractDataFromEmailAsync(string emailContent);
    }

    public class LLaMAService : ILLaMAService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<LLaMAService> _logger;
        private readonly string _llamaApiUrl;

        public LLaMAService(
            HttpClient httpClient,
            IConfiguration configuration,
            ILogger<LLaMAService> logger
        )
        {
            _httpClient = httpClient;
            _logger = logger;
            _llamaApiUrl = configuration["LLaMA:ApiUrl"] ?? "http://192.168.220.30:9100";
        }

        public async Task<Dictionary<string, object>> ExtractDataFromEmailAsync(string emailContent)
        {
            try
            {
                var request = new { text = emailContent, task = "extract_quotation_data" };

                var content = new StringContent(
                    JsonSerializer.Serialize(request),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = await _httpClient.PostAsync($"{_llamaApiUrl}/extract", content);
                response.EnsureSuccessStatusCode();

                var responseContent = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<Dictionary<string, object>>(
                    responseContent
                );

                return result ?? new Dictionary<string, object>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error extracting data from email using LLaMA API");
                throw;
            }
        }
    }
}
