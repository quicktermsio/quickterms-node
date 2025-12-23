# @quickterms/sdk

Official SDK for embedding [QuickTerms](https://quickterms.io) privacy policies and terms of service in your application.

## Installation

```bash
npm install @quickterms/sdk
```

## Usage

### React

```tsx
import { QuickTermsEmbed } from '@quickterms/sdk/react';

function PrivacyPage() {
  return (
    <QuickTermsEmbed
      docId="your-document-id"
      showTitle={true}
      showFooter={true}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `docId` | `string` | required | The document ID from QuickTerms |
| `showTitle` | `boolean` | `false` | Show the document title |
| `showFooter` | `boolean` | `true` | Show "Powered by QuickTerms" footer |
| `className` | `string` | `''` | Custom class name for the container |
| `loadingComponent` | `ReactNode` | - | Custom loading component |
| `errorComponent` | `(error: string) => ReactNode` | - | Custom error component |
| `onLoad` | `(document) => void` | - | Callback when document loads |
| `onError` | `(error) => void` | - | Callback when document fails to load |

### Vanilla JavaScript / Node.js

```typescript
import { QuickTerms } from '@quickterms/sdk';

// Fetch a document
const doc = await QuickTerms.getDocument('your-document-id');
console.log(doc.title);
console.log(doc.content); // HTML content

// Or use the function directly
import { getDocument } from '@quickterms/sdk';
const doc = await getDocument('your-document-id');
```

### Document Response

```typescript
interface QuickTermsDocument {
  title: string;           // "Privacy Policy" or "Terms of Service"
  content: string;         // HTML content
  last_updated: string;    // ISO date string
  company_name: string;    // Your company name
  app_name: string;        // Your app name
  document_type: string;   // "privacy_policy" or "terms_of_service"
}
```

## Getting Your Document ID

1. Log in to [QuickTerms](https://quickterms.io)
2. Navigate to your product
3. Click "Embed HTML" on a document
4. Copy the document ID from the embed code

## License

MIT
