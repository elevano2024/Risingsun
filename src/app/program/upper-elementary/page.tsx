import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ImageText from "@/components/common/image-text-combo/image-text-combo";
import DetailCard from "@/components/common/detailCard/detailCard";

const data = [
  {
    title: "Language Arts",
    data: "Advanced reading comprehension, literary analysis, research, and refined writing skills are emphasized, including essays, reports, creative writing, and public speaking.",
  },
  {
    title: "Mathematics",
    data: "Students explore abstract concepts such as algebra, geometry, and advanced problem-solving, with a focus on real-world applications.",
  },
  {
    title: "Cultural Studies",
    data: "A cornerstone of Montessori education, cultural studies integrate history, geography, science, and cultural awareness. Students study timelines, ancient civilizations, world religions, and human progress, connecting past and present.",
  },
  {
    title: "Science",
    data: "Through experiments and research, students delve into physics, chemistry, biology, and environmental science, fostering curiosity and a scientific mindset.",
  },
  {
    title: "Practical Life Skills",
    data: "Lessons in financial literacy, time management, and organization help students prepare for real-world challenges.",
  },
  {
    title: "The Arts",
    data: "Music, visual arts, drama, and creative projects provide opportunities for self-expression and innovation.",
  },
];

const Component = () => {
  return (
    <Layout
      header="Upper Elementary"
      subHeader="Our Upper Elementary program is designed for children aged 9–12 (grades 4–6), a time when students are ready to deepen their intellectual pursuits, take on greater responsibility, and engage in meaningful exploration."
    >
      <div
        className="upperElementry programdetail"
        style={{ paddingTop: "80px" }}
      >
        <div className="container">
          <p>
            Building on the foundation of earlier Montessori experiences, Upper
            Elementary prepares students for adolescence and beyond by fostering
            independence, critical thinking, and a strong sense of self. At this
            stage, children are driven by curiosity and a desire to understand
            complex concepts and their place in the world.
          </p>
          <div>
            <h1>The Montessori Approach</h1>
            <p>
              The Upper Elementary program nurtures a child’s innate desire to
              learn through a hands-on, interdisciplinary approach. The
              classroom environment promotes autonomy while encouraging
              collaboration and community.
              <br />
              <br /> Students are active participants in their education, taking
              ownership of their learning through self-directed projects,
              research, and exploration. Teachers act as guides, facilitating
              individualized learning paths and challenging students to reach
              their fullest potential.
            </p>
          </div>
          <div>
            <h1>The Prepared Environment</h1>
            <p>
              The Upper Elementary classroom is a dynamic space filled with
              resources and materials designed to inspire inquiry, exploration,
              and mastery. Key areas of focus include:
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
                As children enter this developmental stage, they are not only
                focused on academics but also on discovering their identity and
                values. Our program emphasizes:
              </p>
              <div className="grid3x">
                <ImageText
                  img="/images/child.png"
                  title="Critical Thinking and Problem Solving"
                  data="Encouraging students to analyze, evaluate, and synthesize information across disciplines."
                  variant="main"
                />
                <ImageText
                  img="/images/child.png"
                  title="Independence and Responsibility"
                  data="Supporting students as they plan their work, manage deadlines, and set personal goals."
                  variant="main"
                />
                <ImageText
                  img="/images/child.png"
                  title="Social and Emotional Growth"
                  data="Fostering respect, empathy, and resilience through group work and individual reflection."
                  variant="main"
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "120px" }}>
          <div className="container">
            <h1>Developing Leadership and Community</h1>
            <p>
              Upper Elementary students take on leadership roles within the
              classroom and the school community. They engage in group projects,
              mentor younger students, and collaborate with peers, honing their
              interpersonal and teamwork skills.
              <br />
              <br />
              They also participate in service-learning projects, field trips,
              and community activities, which cultivate empathy, social
              responsibility, and a sense of purpose
            </p>
          </div>
          <div className="container">
            <h1>Preparing for Adolescence and Beyond</h1>
            <p>
              Our Upper Elementary program equips students with the skills,
              confidence, and mindset needed for a successful transition to
              adolescence. By the time they graduate, they are not only
              academically prepared but also emotionally mature, socially
              responsible, and ready to embrace new challenges.
              <br />
              <br />
              At Rising Sun Montessori, we aim to inspire lifelong learners who
              see themselves as empowered individuals capable of making a
              difference in their communities and the world.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Component;
