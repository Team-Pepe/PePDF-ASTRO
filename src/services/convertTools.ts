const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(import.meta.env.PUBLIC_API_TIMEOUT || '30000', 10);

class ConvertToolsService {
  private readonly baseUrl = API_URL;
  private readonly timeout = API_TIMEOUT;

  private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async imageToPdf(files: File[]): Promise<Blob> {
    if (!files.length) {
      throw new Error('Please select at least one image');
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    let response: Response;
    try {
      response = await this.fetchWithTimeout(`${this.baseUrl}/convert-tools/image-to-pdf`, {
        method: 'POST',
        body: formData,
      });
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        throw new Error('Conversion request timed out');
      }
      throw new Error('Unable to connect to conversion service');
    }

    if (!response.ok) {
      const fallback = `Conversion failed with status ${response.status}`;
      let message = fallback;
      try {
        const data = await response.json();
        if (typeof data?.detail === 'string') {
          message = data.detail;
        }
      } catch {
        // Keep fallback message when JSON parsing fails.
      }
      throw new Error(message);
    }

    return response.blob();
  }

  async pdfToImages(files: File[]): Promise<Blob> {
    if (!files.length) {
      throw new Error('Please select at least one PDF');
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    let response: Response;
    try {
      response = await this.fetchWithTimeout(`${this.baseUrl}/convert-tools/pdf-to-image`, {
        method: 'POST',
        body: formData,
      });
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        throw new Error('Conversion request timed out');
      }
      throw new Error('Unable to connect to conversion service');
    }

    if (!response.ok) {
      const fallback = `Conversion failed with status ${response.status}`;
      let message = fallback;
      try {
        const data = await response.json();
        if (typeof data?.detail === 'string') {
          message = data.detail;
        }
      } catch {
        // Keep fallback message when JSON parsing fails.
      }
      throw new Error(message);
    }

    return response.blob();
  }
}

export const convertToolsService = new ConvertToolsService();
