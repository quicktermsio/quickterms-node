import { useState, useEffect } from 'react';
import { getDocument, QuickTermsDocument } from './index';

export interface QuickTermsEmbedProps {
  /** The document ID to embed */
  docId: string;
  /** Show the document title (default: false) */
  showTitle?: boolean;
  /** Show "Powered by QuickTerms" footer (default: true) */
  showFooter?: boolean;
  /** Custom class name for the container */
  className?: string;
  /** Custom loading component */
  loadingComponent?: React.ReactNode;
  /** Custom error component */
  errorComponent?: (error: string) => React.ReactNode;
  /** Callback when document loads successfully */
  onLoad?: (document: QuickTermsDocument) => void;
  /** Callback when document fails to load */
  onError?: (error: Error) => void;
}

/**
 * React component to embed a QuickTerms document
 *
 * @example
 * ```tsx
 * import { QuickTermsEmbed } from '@quickterms/sdk/react';
 *
 * function PrivacyPage() {
 *   return <QuickTermsEmbed docId="your-doc-id" />;
 * }
 * ```
 */
export function QuickTermsEmbed({
  docId,
  showTitle = false,
  showFooter = true,
  className = '',
  loadingComponent,
  errorComponent,
  onLoad,
  onError,
}: QuickTermsEmbedProps) {
  const [document, setDocument] = useState<QuickTermsDocument | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (docId) {
      loadDocument();
    }
  }, [docId]);

  const loadDocument = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const doc = await getDocument(docId);
      setDocument(doc);
      onLoad?.(doc);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load document';
      setError(message);
      onError?.(err instanceof Error ? err : new Error(message));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={className}>
        {loadingComponent || (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            Loading document...
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        {errorComponent?.(error) || (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#dc2626', fontWeight: 500 }}>Unable to load document</p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <div className={className}>
      {showTitle && (
        <header style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            {document.title}
          </h1>
          {document.last_updated && (
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Last updated:{' '}
              {new Date(document.last_updated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </header>
      )}

      <div dangerouslySetInnerHTML={{ __html: document.content }} />

      {showFooter && (
        <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
          <a
            href="https://quickterms.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#9ca3af', fontSize: '0.75rem', textDecoration: 'none' }}
          >
            Powered by QuickTerms
          </a>
        </footer>
      )}
    </div>
  );
}

// Re-export everything from index for convenience
export * from './index';
