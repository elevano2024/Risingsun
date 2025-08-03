import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ImageText from "@/components/common/image-text-combo/image-text-combo";
import DetailCard from "@/components/common/detailCard/detailCard";

const data = [
  {
    title: "Language Arts",
    data: "Advanced reading, writing, public speaking, and literary analysis. Students create essays, research papers, and creative projects while honing their communication skills.",
  },
  {
    title: "Mathematics",
    data: "Algebra, geometry, and problem-solving are explored through real-world applications and hands-on materials to ensure conceptual understanding.",
  },
  {
    title: "Science",
    data: "Inquiry-based learning covers biology, chemistry, physics, and environmental science, with opportunities for lab work and experiments.",
  },
  {
    title: "History and Cultural Studies",
    data: "Students explore global history, social justice, and cultural diversity through timelines, research, and debates, connecting historical events to modern issues.",
  },
  {
    title: "Entrepreneurship and Economics",
    data: "Practical skills are taught through business ventures, market studies, and financial literacy projects, such as starting and managing small enterprises.",
  },
  {
    title: "The Arts",
    data: "Music, visual arts, and drama foster creativity and self-expression, with opportunities for performances and exhibitions.",
  },
  {
    title: "Practical Life Skills",
    data: "Time management, organization, and self-advocacy are integrated into daily activities.",
  },
];

const Component = () => {
  return (
    <Layout
      header="Middle School"
      subHeader="The transition to adolescence is a critical time in your child’s life.  At Rising Sun Montessori, our Middle School program (ages 12–14, grades 7–8) is thoughtfully designed to meet the developmental needs of young adolescents. "
    >
      <div
        className="middleSchool programdetail"
        style={{ paddingTop: "80px" }}
      >
        <div className="container">
          <p>
            We focus on nurturing intellectual curiosity, fostering
            independence, and supporting emotional and social growth during this
            transformative stage.
            <br />
            <br />
            Our program combines rigorous academics with real-world experiences,
            empowering students to discover their passions, develop critical
            thinking skills, and prepare for high school and beyond.
          </p>
          <ImageText
            img="/images/child.png"
            title="A Holistic Approach to Learning?"
            data="Montessori Middle School emphasizes the interconnectedness of academic subjects and the real world. Students engage in interdisciplinary studies, combining language arts, mathematics, science, history, and cultural studies into meaningful projects and research."
            variant="right"
          />{" "}
          <ImageText
            img="/images/child.png"
            title="Individualized Learning"
            data="In line with Montessori principles, students progress at their own pace, guided by a tailored learning plan that challenges and supports their unique abilities. Teachers act as mentors, helping students set goals, manage their time, and take ownership of their education."
            variant="left"
          />{" "}
          <ImageText
            img="/images/child.png"
            title="Social and Emotional Development"
            data="Recognizing the social nature of adolescents, our program fosters a collaborative, respectful community. Students participate in group projects, peer mentoring, and discussions, developing skills in teamwork, empathy, and leadership."
            variant="right"
          />
          <div>
            <h1>Curriculum Highlights</h1>
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
            <div className="container">
              <h1>Real-World Learning Opportunities</h1>
              <p>
                Montessori Middle School bridges classroom learning with
                real-world experiences:
              </p>
              <p className="item">
                <b> Field Studies</b>
                <br />
                Students engage in trips that bring their studies to life, such
                as visiting historical sites, nature reserves, or cultural
                institutions.
              </p>
              <p className="item">
                <b> Service Learning</b>
                <br />
                Community service projects allow students to contribute
                meaningfully to society, fostering empathy and civic
                responsibility.
              </p>
              <p className="item">
                <b> Micro-Economy</b>
                <br />
                Students run small businesses or participate in entrepreneurial
                projects, learning financial management, teamwork, and
                problem-solving.
              </p>
              <p className="item">
                <b> Outdoor Education</b>
                <br />
                Through gardening, environmental stewardship, and outdoor
                adventures, students connect with nature and develop a sense of
                responsibility for the planet.
              </p>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "120px" }}>
          <div className="container">
            <h1>Supporting Adolescents’ Development</h1>
            <p>
              We recognize that middle school students are navigating
              significant physical, emotional, and intellectual growth. Our
              program is designed to:
              <br />
              <br />- Build <b>resilience</b> and <b> self-confidence</b> by
              challenging students academically and socially.
              <br />- Encourage <b>self-reflection</b> and <b>goal setting</b>{" "}
              to help students understand their strengths and areas for growth.
              <br />- Foster <b>community</b> through shared experiences and
              respectful communication.
            </p>
          </div>
          <div className="container">
            <h1>Preparing for the Future</h1>
            <p>
              Our Montessori Middle School graduates are confident, capable, and
              compassionate individuals, ready to excel in high school and
              beyond. They leave with a strong academic foundation, practical
              skills, and the ability to think critically, collaborate
              effectively, and contribute meaningfully to the world.
              <br />
              <br />
              At Rising Sun Montessori, we inspire adolescents to dream big,
              work hard, and embrace their role as thoughtful, engaged citizens.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Component;
