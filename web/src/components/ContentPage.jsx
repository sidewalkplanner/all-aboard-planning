import PageHeader from './PageHeader';
import LessonBody from './LessonBody';
import usePageTitle from '../hooks/usePageTitle';

// A long-form page whose body is a Markdown module (content/pages/*.md).
export default function ContentPage({ title, pageTitle, eyebrow, lead, body, before, after }) {
  usePageTitle(pageTitle || title);
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} narrow />
      <div className="container-narrow" style={{ paddingBottom: 72 }}>
        {before}
        <LessonBody html={body.html} />
        {after}
      </div>
    </>
  );
}
