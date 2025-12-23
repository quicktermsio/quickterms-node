const API_BASE_URL = 'https://api.quickterms.io';

export interface QuickTermsDocument {
  title: string;
  content: string;
  last_updated: string | null;
  company_name: string;
  app_name: string;
  document_type: string;
}

export interface QuickTermsError {
  error: string;
  upgrade_url?: string;
}

/**
 * Fetch a QuickTerms document by ID
 */
export async function getDocument(docId: string): Promise<QuickTermsDocument> {
  const response = await fetch(`${API_BASE_URL}/embed/${docId}`);

  if (!response.ok) {
    const errorData: QuickTermsError = await response.json().catch(() => ({
      error: 'Failed to load document',
    }));
    throw new Error(errorData.error);
  }

  return response.json();
}

/**
 * QuickTerms client for fetching documents
 */
export class QuickTerms {
  /**
   * Fetch a document by ID
   */
  static async getDocument(docId: string): Promise<QuickTermsDocument> {
    return getDocument(docId);
  }
}

export default QuickTerms;
