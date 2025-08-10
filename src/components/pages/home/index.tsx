import ContactPage from "@/components/common/contact/ContactPage";
import ListItem from "@/components/common/list-item/list-item";
import "./index.scss";

const gallery = [
  "/wp-content/uploads/2022/05/DSC_7067-scaled.jpg",
  "/wp-content/uploads/2022/05/DSC_7015-scaled.jpg",
  "/wp-content/uploads/2022/04/DSC_4543-2-scaled.jpg",
  "/wp-content/uploads/2022/04/RSMSDSC_4447-scaled.jpg",
  "/wp-content/uploads/2022/04/RSMSDSC_4431-scaled.jpg",
];

const galleryAlt = [
  "Rising Sun Montessori campus courtyard",
  "Students participating in outdoor activity",
  "Hands-on learning in a Montessori classroom",
  "Students collaborating during class time",
  "Montessori materials arranged on classroom shelves",
];

const Home = () => {
  return (
    <div className="home">
      <div className="home-section-1">
        <div className="home-section-1-content-1 container">
          <div className="linksection">
            <img
              src="/wp-content/uploads/2022/05/wasc-logo-1-1.png"
              alt="WASC accreditation logo"
            />{" "}
            <div className="linksection-text">
              <h2>Fully Accredited by the</h2>
              <p>
                Accrediting Commission for Schools, Western Association of
                Schools and Colleges
              </p>
            </div>
          </div>
          <div className="linksection-link">
            <a
              href="https://directory.acswasc.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Metrics & Performance &gt;
            </a>
          </div>
        </div>
        <div className="home-section-1-content-2 container">
          <h1>The Montessori </h1>
          <h1>Advantage for a Changing World</h1>
          <div className="home-section-1-content-2-listitems">
            <div>
              <ListItem
                title="Transitional Kindergarten / Kindergarten"
                link="/program/tk-kindergarten"
              />
              <ListItem
                title="Lower Elementary"
                link="/program/lower-elementary"
              />
              <ListItem
                title="Upper Elementary"
                link="/program/upper-elementary"
              />
              <ListItem title="Middle School" link="/program/middle-school" />
            </div>
            <div>
              <p>
                Blending timeless principles with modern skills to prepare
                students for life, not just school. At Rising Sun Montessori, we
                go beyond traditional academics to nurture curious, independent,
                and compassionate learners.
              </p>
              <br />
              <p>
                Rooted in the proven Montessori Method, our approach encourages
                critical thinking, adaptability, and a deep love of learning.
                Students gain the confidence to lead, the creativity to
                innovate, and the empathy to make a difference in an
                ever-evolving world.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section-2">
        <div className="bgtest">
          <div className="container">
            <h1> Enrollment & School Tours </h1>
            <p>
              Blending timeless principles with modern skills to prepare
              students for life, not just school. At Rising Sun Montessori, we
              go beyond traditional academics to nurture curious, independent
            </p>
            <div className="clouds">
              <div className="cloudItem">
                <span className="cloudItem1">
                  Now Accepting Applications for the
                </span>
                <span className="cloudItem2">2025-26 school year!</span>
                <a
                  href="https://www.transparentclassroom.com/s/5246/online_applications/new?locale=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cloudItem3"
                >
                  Apply Now
                  <img src="/images/yellowchevrom.svg" alt="Chevron" />
                </a>
              </div>
              <div className="cloudItem">
                <span className="cloudItem1">Montessori Experience Form</span>
                <span className="cloudItem2">Verification</span>
                <a
                  className="cloudItem3"
                  href="/wp-content/uploads/2025/02/verification-of-montessori-exp.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Form
                  <img src="/images/yellowchevrom.svg" alt="Chevron" />
                </a>
              </div>
              <div className="cloudItem">
                <span className="cloudItem1">
                  School Tours by appointment only on
                </span>
                <span className="cloudItem2">Wednesday Morning</span>
                <a
                  href="mailto:jshort@risingsunmontessori.org?subject=School%20Tour%20Request"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cloudItem3"
                >
                  Book Appointment
                  <img src="/images/yellowchevrom.svg" alt="Chevron" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="home-section-5 container"
        style={{ marginBottom: "124px" }}
      >
        <h1>A Classroom That Nurtures the Whole Child</h1>
        <p>
          Hands-on, personalized learning in an environment designed for growth,
          independence, and joyful discovery.
        </p>
        <br />
        <p>
          At Rising Sun Montessori, every classroom is a carefully prepared
          space where students are free to explore, create, and learn at their
          own pace. Guided by Montessori-trained educators, children engage with
          tactile materials that spark curiosity and deepen understanding across
          subjects.
        </p>
        <br />
        <p>
          Our classrooms support both individual focus and group collaboration,
          fostering academic excellence while building confidence, emotional
          intelligence, and social skills. Students are encouraged to make
          thoughtful choices, work independently, and take responsibility for
          their learning—laying the foundation for lifelong success.
        </p>
        <br />
        <p>
          With flexible seating, access to learning tools, and dedicated areas
          for math, language, science, culture, and the arts, students are
          empowered to grow into self-directed, motivated learners in a
          peaceful, respectful setting.
        </p>
        <br />
        <a href="/our-classroom" className="yellowLink">
          Read More on our classrooms
          <img src="/images/yellowchevrom.svg" alt="Chevron" />
        </a>
      </div>
      <div className="gallery-section container">
        <div className="image-container" style={{ paddingTop: "80px" }}>
          <div className="image-item">
            <img src={gallery[0]} alt={galleryAlt[0]} className="image-item" />
          </div>
          <div className="image-item">
            <img src={gallery[1]} alt={galleryAlt[1]} className="image-item" />
          </div>
        </div>
        <div className="image-container" style={{ paddingTop: "40px" }}>
          <div className="image-item">
            <img src={gallery[2]} alt={galleryAlt[2]} className="image-item" />
          </div>
          <div className="image-item">
            <img src={gallery[3]} alt={galleryAlt[3]} className="image-item" />
          </div>
        </div>
        <div className="image-container">
          <div className="image-item">
            <img src={gallery[4]} alt={galleryAlt[4]} className="image-item" />
          </div>
          <a className="visitgallery" href="/gallery">
            View All Photos
          </a>
        </div>
      </div>
      <ContactPage variant="home" />
      <div className="home-section-5 container">
        <h1>A Classroom That Nurtures the Whole Child</h1>
        <p>
          Hands-on, personalized learning in an environment designed for growth,
          independence, and joyful discovery.
        </p>
        <br />
        <p>
          At Rising Sun Montessori, every classroom is a carefully prepared
          space where students are free to explore, create, and learn at their
          own pace. Guided by Montessori-trained educators, children engage with
          tactile materials that spark curiosity and deepen understanding across
          subjects.
        </p>
        <br />
        <p>
          Our classrooms support both individual focus and group collaboration,
          fostering academic excellence while building confidence, emotional
          intelligence, and social skills. Students are encouraged to make
          thoughtful choices, work independently, and take responsibility for
          their learning—laying the foundation for lifelong success.
        </p>
        <br />
        <p>
          With flexible seating, access to learning tools, and dedicated areas
          for math, language, science, culture, and the arts, students are
          empowered to grow into self-directed, motivated learners in a
          peaceful, respectful setting.
        </p>
        <br />
        <a href="/our-classroom" className="yellowLink">
          Read More on our classrooms
          <img src="/images/yellowchevrom.svg" alt="Chevron" />
        </a>
      </div>
    </div>
  );
};

export default Home;
