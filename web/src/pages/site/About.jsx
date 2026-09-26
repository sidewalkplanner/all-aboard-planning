import ContentPage from '../../components/ContentPage';
import body from '../../content/pages/about.md';
import { CONTACT_EMAIL } from '../../content/site';

const photo = `${import.meta.env.BASE_URL}photos/bobby-and-dog.webp`;

function Intro() {
  return (
    <section className="about-intro" aria-labelledby="about-bobby">
      <figure className="snapshot" style={{ '--r': '-2deg' }}>
        <span className="tape tape--sky" aria-hidden="true" />
        <img
          src={photo}
          width={640}
          height={758}
          alt="Bobby Sells smiling on a couch, hugging a fluffy golden-brown dog"
        />
        <figcaption className="hand">Bobby and a very good study buddy</figcaption>
      </figure>
      <div>
        <h2 id="about-bobby" className="h2">Hi, I&rsquo;m Bobby</h2>
        <p className="body-text">
          My name is Bobby Sells. I&rsquo;m a federal planner, and I live in Denver, Colorado.
        </p>
        <p className="body-text">
          I created All Aboard Planning because there was a drought of structured, affordable AICP study
          materials out there.
        </p>
        <p className="body-text">
          All Aboard Planning is built on a simple idea: preparing for the AICP exam shouldn&rsquo;t cost
          hundreds of dollars. My hope is that this course lowers the cost of certification for planners
          while helping to strengthen our field.
        </p>
        <p className="body-text">
          If you have a question or just want to chat, you can reach me at{' '}
          <a className="link-underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <ContentPage
      eyebrow="About"
      title="About All Aboard Planning"
      lead="An AICP exam course built by a working planner, so studying for the exam doesn’t have to cost hundreds of dollars."
      before={<Intro />}
      body={body}
    />
  );
}
