import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ImageText from "@/components/common/image-text-combo/image-text-combo";
import DetailCard from "@/components/common/detailCard/detailCard";
import { title } from "process";
const data = [
  {
    title: "Language Arts",
    data: "Students refine their reading and writing skills, delve into grammar, and explore creative and expository writing.",
  },
  {
    title: "Mathematics",
    data: "Concrete materials guide children through operations, fractions, geometry, and problem-solving, building a deep understanding of mathematical concepts.",
  },
  {
    title: "Cultural Studies",
    data: "A cornerstone of Montessori, this interdisciplinary approach combines history, geography, science, and cultural awareness to help children see themselves as part of a larger world.",
  },
  {
    title: "Science",
    data: "Students investigate the natural world through hands-on experiments and lessons, covering biology, physics, and earth sciences.",
  },
  {
    title: "Arts and Music",
    data: "Creative expression is integrated into the curriculum, allowing children to explore visual arts, music, and movement.",
  },
];

const Component = () => {
  return (
    <Layout
      header="Lower Elementary"
      subHeader="Our Lower Elementary program, designed for children aged 6–9 (grades 1–3), builds upon the strong foundation established in earlier Montessori years, fostering a deeper sense of curiosity, independence, and responsibility."
    >
      <div
        className="lowerElementry programdetail"
        style={{ paddingTop: "80px" }}
      >
        <div className="container">
          <p>
            In this critical stage of development, children transition from
            concrete learning to more abstract thinking. They are driven by a
            desire to explore, connect ideas, and understand the “why” behind
            concepts. Our program is carefully crafted to nurture this growing
            intellectual curiosity while continuing to respect each child’s
            individual learning journey.
          </p>
          <div>
            <h1>The Montessori Approach</h1>
            <p>
              In a Montessori Lower Elementary classroom, children are part of a
              mixed-age community that promotes collaboration, leadership, and
              mutual respect. Younger students are inspired by older peers,
              while older students solidify their understanding by mentoring and
              supporting younger classmates.
              <br />
              <br />
              Our hands-on, child-centered approach allows students to progress
              at their own pace, exploring subjects in depth and developing
              mastery. Instead of traditional grades and tests, students are
              assessed through observation, portfolios, and individualized
              learning plans, ensuring their growth is celebrated and supported.
            </p>
          </div>
          <div>
            <h1>The Prepared Environment</h1>
            <p>
              The Montessori classroom is designed to spark curiosity and
              promote independence. Shelves are filled with beautifully crafted
              materials that encourage exploration and discovery in core
              academic areas and beyond:
            </p>
            <br />
            {data.map((item: any, index: number) => (
              <DetailCard key={index} title={item.title} data={item.data} />
            ))}
          </div>
        </div>
        <div className="home-section-2">
          <div className="bgtest">
            {" "}
            <div className="container">
              <h1>Nurturing the Whole Child</h1>
              <p>
                Lower Elementary is a time when children develop socially and
                emotionally as well as academically. Our program emphasizes:
              </p>
              <div className="grid3x">
                <ImageText
                  img="/images/child.png"
                  title="Collaboration and Teamwork"
                  data="Group projects and discussions help students practice communication, cooperation, and conflict resolution."
                  variant="main"
                />
                <ImageText
                  img="/images/child.png"
                  title="Character Development"
                  data="Grace and courtesy lessons foster empathy, respect, and responsibility within the classroom community and beyond."
                  variant="main"
                />
                <ImageText
                  img="/images/child.png"
                  title="Executive Function Skills"
                  data="Time management, organization, and goal-setting are naturally woven into their daily work."
                  variant="main"
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "120px" }}>
          <div className="container">
            <h1>Independence and Responsibility</h1>
            <p>
              Montessori students are encouraged to take ownership of their
              learning. With guidance from the teacher, they set goals, plan
              their work, and evaluate their progress. This process builds
              self-discipline, time management skills, and a sense of
              accountability.
            </p>
          </div>
          <div className="container">
            <h1>Collaboration and Social Learning</h1>
            <p>
              Social development is a key focus of the Lower Elementary years.
              Students work in small groups, learning to collaborate, solve
              problems, and respect one another’s perspectives. Mixed-age
              classrooms allow younger students to learn from older peers, while
              older students reinforce their knowledge by mentoring younger
              classmates.
            </p>
          </div>
          <div className="container">
            <h1>The Big Picture: Cosmic Education</h1>
            <p>
              At this stage, Montessori introduces children to the concept of
              Cosmic Education, which helps them understand their place in the
              universe. Through lessons on the interconnectedness of all things,
              students develop a sense of wonder, responsibility, and
              appreciation for the natural world and human contributions.
            </p>
          </div>
          <div className="container">
            <ImageText
              img="/images/child.png"
              title="Why Choose Montessori for Lower Elementary?"
              data="Why Choose Montessori for Lower Elementary?
A love for learning and curiosity about the world.
Confidence in their ability to tackle challenges.
Skills for independent thinking and problem-solving.
Respect for themselves, others, and their environment."
              variant="left"
            />
          </div>
          <div className="container">
            <p style={{ fontStyle: "italic" }}>
              At Rising Sun Montessori, we prepare children not just
              academically but holistically, ensuring they are ready to thrive
              as compassionate, inquisitive, and capable individuals.
            </p>
          </div>
          <div className="container">
            <ImageText
              img="/images/child.png"
              title="Preparing for the Future"
              data="Our Lower Elementary program not only meets academic benchmarks but also cultivates skills that prepare children for life: critical thinking, creativity, resilience, and a passion for learning.

By the time they transition to Upper Elementary, our students are not just academically prepared—they are confident, compassionate, and capable individuals who see themselves as active contributors to their community and the world."
              variant="left"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Component;
