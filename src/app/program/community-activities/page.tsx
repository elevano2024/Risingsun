import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ImageText from "@/components/common/image-text-combo/image-text-combo";

const Component = () => {
  return (
    <Layout header="Building Connections: Community Activities at Rising Sun Montessori" subHeader="At Rising Sun Montessori, we believe that a strong sense of community is the cornerstone of a thriving school environment. Our community activities bring together students, families, and staff to celebrate, collaborate, and connect. These events not only strengthen relationships but also provide meaningful opportunities for learning, service, and fun.">
      <div className="programs programdetail" style={{ paddingTop: "80px" }}>
        <div className="container">
          <div className="">
            <h1>
              Why Community Matters
            </h1>
            <p style={{ marginBottom: "40px" }}>
              Community activities enrich our school culture by:
            </p>
            <ImageText
              img="/images/child.png"
              tags={[
                "Fostering Connection: Bringing families together to build friendships and support networks.",
                "Inspiring Collaboration: Encouraging teamwork between students, parents, and educators.",
                "Promoting Engagement: Inviting families to play an active role in their child’s education.",
              ]}
              variant="right"
            />
          </div>

          <div className="">
            <h1>Signature Community Activities</h1>
            <p style={{ marginBottom: "40px" }}>
              We offer a variety of events and initiatives throughout the year, designed to engage families and celebrate our shared journey.
            </p>
            <ImageText
              img="/images/child.png"
              title="Family Events"
              tags={[
                "Back-to-School Night: Meet teachers, tour classrooms, and learn about the exciting year ahead.",
                "Back-to-School Night: Meet teachers, tour classrooms, and learn about the exciting year ahead.",
                "Family Fun Nights: Bond over activities like game nights, movie nights, or seasonal celebrations."
              ]}
              variant="left"
            />
          </div>

          <div className="">
            <ImageText
              img="/images/child.png"
              title="Service Projects"
              tags={[
                "School-Wide Volunteer Days: Join forces to beautify the campus, plant gardens, or organize donation drives.",
                "Community Outreach: Participate in service-learning projects, like food drives, clothing donations, or environmental clean-ups.",
              ]}
              variant="right"
            />
          </div>

          <div className="">
            <ImageText
              img="/images/child.png"
              title="Student Showcases"
              tags={[
                "Art Shows: Celebrate creativity by displaying student artwork for families and friends to enjoy.",
                "Science and Culture Fairs: Engage with student projects that highlight their academic achievements and interests.",
              ]}
              variant="left"
            />
          </div>

          <div className="">
            <ImageText
              img="/images/child.png"
              title="Parent Engagement Opportunities"
              tags={[
                "Parent Education Nights: Learn more about Montessori philosophy, child development, or parenting strategies.",
                "Volunteer Programs: Get involved in the classroom, on field trips, or during special events.",
                "Parent-Teacher Committees: Collaborate with other parents to support school initiatives and activities."
              ]}
              variant="right"
            />
          </div>
        </div>
        <div className="home-section-2">
          <div className="container">
            <h1>Annual Highlights</h1>
            <p>
              Some of our most beloved traditions include:
            </p>
            <p className="item">
              <b>Harvest Festival</b>
              <br />
              A fun-filled day with games, crafts, and seasonal activities for the whole family.
            </p>
            <p className="item">
              <b>Spring Events</b>
              <br />
              An exciting time to celebrate and raise funds for school programs.
            </p>
            <p className="item">
              <b>Field Day</b>
              <br />
              A day of outdoor games and activities that encourage teamwork and friendly competition.
            </p>
          </div>
        </div>
        <div style={{ paddingTop: "120px" }}>
          <div className="container">
            <h1>The Montessori Spirit of Community</h1>
            <p>
              Our community activities are designed to reflect the Montessori values of collaboration, respect, and lifelong learning. Whether through service projects, cultural celebrations, or family events, these opportunities help students grow as compassionate, engaged citizens who understand the importance of giving back and working together.
            </p>
            <br />
            <p>
              We invite you to be an active part of our vibrant community at Rising Sun Montessori. Together, we create a nurturing environment where every child—and family—can thrive.
            </p>
            <br />
            <p>
              For more details about upcoming events or ways to get involved, visit our website or contact us today!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Component;
