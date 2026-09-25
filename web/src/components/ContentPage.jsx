import PageHeader from './PageHeader';
import LessonBody from './LessonBody';
import usePageTitle from '../hooks/usePageTitle';

// A long-form page whose body is a Markdown module (content/pages/*.md).
export default function ContentPage({ title, pageTitle, eyebrow, lead, body, before, after, wide = false, ...art }) {
  usePageTitle(pageTitle || title);
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} narrow={!wide} {...art} />
      <div className={wide ? 'container prose-wide' : 'container-narrow'} style={{ paddingBottom: 72 }}>
        {before}
        <LessonBody html={body.html} />
        {after}
      </div>
    </>
  );
}
