import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ImageText from "@/components/common/image-text-combo/image-text-combo";

const Component = () => {
  return (
    <Layout
      header="Electives & Clubs"
      subHeader="Middle school is a time for discovery, creativity, and growth. At Rising Sun Montessori, we offer a variety of electives and the development of clubs designed to enrich your child’s education and allow them to explore their interests beyond the core curriculum."
    >
      <div className="elective programdetail" style={{ paddingTop: "80px" }}>
        <div className="container" style={{ paddingBottom: "140px" }}>
          <p>
            Our community activities are designed to reflect the Montessori
            values of collaboration, respect, and lifelong learning. Whether
            through service projects, cultural celebrations, or family events,
            these opportunities help students grow as compassionate, engaged
            citizens who understand the importance of giving back and working
            together.
          </p>
        </div>
        <div className="container">
          <div className="">
            <h1>Exciting Elective Options</h1>
            <p style={{ marginBottom: "40px" }}>
              Electives at Rising Sun Montessori are designed to spark curiosity
              and empower students to develop skills in areas they are
              passionate about. Some of our popular electives include:
            </p>
            <div className="grid3x">
              <ImageText
                img="/images/child.png"
                title="Competitive Robotics Club"
                data="Learn coding, hardware, software and firmware integration in a fun and challenging environment.  Students participate in regional and local competitions throughout the year."
                variant="main"
              />
              <ImageText
                img="/images/child.png"
                title="STEM Lab"
                data="Dive into coding, robotics, engineering, and hands-on experiments in a collaborative, tech-driven environment."
                variant="main"
              />
              <ImageText
                img="/images/child.png"
                title="Photography and Digital Media"
                data="Master the art of photography, video production, and digital editing using professional tools and software."
                variant="main"
              />
              <ImageText
                img="/images/child.png"
                title="World Languages"
                data="Broaden horizons with introductory through advanced courses in Spanish or American Sign Language."
                variant="main"
              />
              <ImageText
                img="/images/child.png"
                title="Culinary Arts"
                data="Experiment with recipes, learn kitchen safety, and discover the joys of cooking and baking."
                variant="main"
              />
            </div>
          </div>
        </div>
        <div className="home-section-2">
          <div className="bgtest">
            <div className="container">
              <h1>Engaging Clubs</h1>
              <p>
                Our after-school clubs allow students to connect with peers who
                share similar interests, collaborate on projects, and develop
                leadership skills. Clubs are led by passionate teachers or
                students and provide an opportunity for fun and growth outside
                the classroom.
                <br />
                <br />
                Here are just a few of the clubs we offer:
              </p>
              <p className="item">
                <b>Student Government</b>
                <br />
                Develop leadership and organizational skills by planning school
                events and voicing student concerns.
              </p>
              <p className="item">
                <b>Chess Club</b>
                <br />
                Challenge your mind with strategy and problem-solving while
                competing with friends.
              </p>
              <p className="item">
                <b>Book Club</b>
                <br />
                Share your love of reading and engage in thoughtful discussions
                about favorite books and authors.
              </p>
              <p className="item">
                <b>Competitive Cross Country</b>
                <br />
                Students practice weekly and have competitions throughout the
                fall each year.
              </p>
              <p className="item">
                <b>Entrepreneurship Club</b>
                <br />
                Learn how to start and run a small business, from brainstorming
                ideas to marketing and sales.
              </p>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "120px" }}>
          <div className="container">
            <h1>Benefits of Electives and Clubs</h1>
            <p>Through electives and clubs, students:</p>
            <br />
            <div className="grid2x">
              <p>
                <b>Discover New Interests</b>
                <br />
                Explore areas they might not encounter in traditional academics.
              </p>
              <p>
                <b>Develop Skills</b>
                <br />
                Gain expertise in creative, academic, or technical areas that
                build confidence and future potential.
              </p>
              <p>
                <b>Build Friendships</b>
                <br />
                Connect with peers who share similar passions.
              </p>
              <p>
                <b>Prepare for the Future</b>
                <br />
                Strengthen time management, collaboration, and leadership
                skills.
              </p>
            </div>
          </div>
        </div>{" "}
        <div style={{ paddingTop: "120px" }}>
          <div className="container">
            <h1>Join the Fun and Start Exploring!</h1>
            <p>
              Our Montessori Middle School graduates are confident, capable, and
              compassionate individuals, ready to excel in high school and
              beyond. They leave with a strong academic foundation, practical
              skills, and the ability to think critically, collaborate
              effectively, and contribute meaningfully to the world.
            </p>
            <br />
            <p>
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
