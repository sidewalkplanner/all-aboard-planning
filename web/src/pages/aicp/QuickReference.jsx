import ContentPage from '../../components/ContentPage';
import body from '../../content/pages/quick-reference.md';

export default function QuickReference() {
  return (
    <ContentPage
      eyebrow="Study guides"
      title="Quick reference"
      lead="Landmark cases, federal laws, people, formulas, key numbers, and the pairs people mix up, all on one page."
      body={body}
      wide
    />
  );
}
