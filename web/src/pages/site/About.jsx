import ContentPage from '../../components/ContentPage';
import body from '../../content/pages/about.md';

export default function About() {
  return (
    <ContentPage
      eyebrow="About"
      title="About All Aboard Planning"
      lead="An independent planning practice. Our first offering is a complete, honest course for the AICP Certification Exam."
      body={body}
    />
  );
}
