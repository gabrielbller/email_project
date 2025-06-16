import { EmailData } from '../types';

export class OutlookService {
  private static instance: OutlookService;
  private pollingInterval: NodeJS.Timeout | null = null;

  private constructor() { }

  static getInstance(): OutlookService {
    if (!OutlookService.instance) {
      OutlookService.instance = new OutlookService();
    }
    return OutlookService.instance;
  }

  async getCurrentEmail(): Promise<EmailData> {
    return new Promise((resolve, reject) => {
      Office.onReady(() => {
        const item = Office.context.mailbox.item;
        if (!item) {
          reject(new Error('Nenhum e-mail selecionado'));
          return;
        }
        item.body.getAsync('text', (result) => {
          if (result.status === Office.AsyncResultStatus.Failed) {
            reject(new Error('Erro ao obter o corpo do e-mail'));
            return;
          }
          const email: EmailData = {
            id: item.itemId,
            from: item.from.emailAddress,
            to: item.to.map(recipient => recipient.emailAddress).join(', '),
            subject: item.subject,
            date: item.dateTimeCreated.toISOString(),
            body: result.value
          };
          resolve(email);
        });
      });
    });
  }

  async getEmailsFromFolder(folderName: string): Promise<EmailData[]> {
    return new Promise((resolve, reject) => {
      Office.onReady(() => {
        const mailbox = Office.context.mailbox;
        if (!mailbox) {
          reject(new Error('Mailbox not available'));
          return;
        }

        mailbox.getCallbackTokenAsync({ isRest: true }, (result) => {
          if (result.status === Office.AsyncResultStatus.Failed) {
            reject(new Error('Failed to get token'));
            return;
          }

          const token = result.value;
          const restUrl = `${mailbox.restUrl}/v2.0/me/mailFolders/${folderName}/messages`;

          fetch(restUrl, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(data => {
              const emails: EmailData[] = data.value.map((item: any) => ({
                id: item.id,
                subject: item.subject,
                sender: item.sender.emailAddress.address,
                receivedDate: item.receivedDateTime,
                body: item.body.content
              }));
              resolve(emails);
            })
            .catch(reject);
        });
      });
    });
  }

  async moveEmailToFolder(emailId: string, targetFolderName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      Office.onReady(() => {
        const mailbox = Office.context.mailbox;
        if (!mailbox) {
          reject(new Error('Mailbox not available'));
          return;
        }

        mailbox.getCallbackTokenAsync({ isRest: true }, (result) => {
          if (result.status === Office.AsyncResultStatus.Failed) {
            reject(new Error('Failed to get token'));
            return;
          }

          const token = result.value;
          const restUrl = `${mailbox.restUrl}/v2.0/me/messages/${emailId}/move`;

          fetch(restUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              destinationId: targetFolderName
            })
          })
            .then(() => resolve())
            .catch(reject);
        });
      });
    });
  }

  startPolling(folderName: string, interval: number, callback: (emails: EmailData[]) => void): void {
    this.stopPolling();
    this.pollingInterval = setInterval(async () => {
      try {
        const emails = await this.getEmailsFromFolder(folderName);
        callback(emails);
      } catch (error) {
        console.error('Error polling emails:', error);
      }
    }, interval);
  }

  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
} 