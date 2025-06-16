export interface EmailData {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  body: string;
}

export interface ProcessingResult {
  emailId: string;
  status: 'pending' | 'processing' | 'processed' | 'failed';
  extractedData?: Record<string, any>;
  errorMessage?: string;
  processedDate?: string;
}

export interface Settings {
  isMonitoringEnabled: boolean;
  processedFolderName: string;
  apiUrl: string;
  pollingInterval: number;
} 