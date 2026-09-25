import ContentPage from '../../components/ContentPage';
import body from '../../content/pages/about.md';

export default function About() {
  return (
    <ContentPage
      eyebrow="About"
      title="About All Aboard Planning"
      art="page-conductor" artW={300} artH={340}
      artAlt="A friendly streetcar conductor waving and holding a lantern"
      lead="An independent planning practice. Our first offering is a complete, honest course for the AICP Certification Exam."
      body={body}
    />
  );
}
