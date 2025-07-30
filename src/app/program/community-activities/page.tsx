import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";
import "./index.scss";
import ImageText from "@/components/common/image-text-combo/image-text-combo";

const Component = () => {
  return (
    <Layout header="Learning Beyond the Classroom: Field Trips at Rising Sun Montessori" subHeader="At Rising Sun Montessori, we believe that learning doesn’t stop at the classroom door. Our field trips provide students of all ages with hands-on experiences that deepen their understanding of the world, ignite their curiosity, and create lasting memories.">
      <div className="programs programdetail" style={{ paddingTop: "80px" }}>
        <div className="container">
          <p>
            Whether exploring nature, engaging with history, or participating in
            community service, field trips are a vital part of our Montessori
            education, helping children connect classroom lessons to real-life
            applications.
          </p>
          <div className="">
            <h1>
              For Our Youngest Learners (Transitional Kindergarten/Kindergarten)
            </h1>
            <p style={{ marginBottom: "40px" }}>
              Our youngest students venture into their local community,
              discovering the world through age-appropriate, sensory-rich
              experiences. Past trips include:
            </p>
            <ImageText
              img="/images/child.png"
              tags={[
                "Visits to local farms to learn about animals and agriculture.",
                "Walks to nearby parks for nature exploration and hands-on environmental studies.",
                "Trips to children’s theaters or libraries to spark a love of storytelling and creativity.",
              ]}
              variant="right"
            />
          </div>

          <div className="">
            <h1>For Lower Elementary (Grades 1–3)</h1>
            <p style={{ marginBottom: "40px" }}>
              At this stage, students are eager to explore their expanding
              world. Field trips align with their studies, enhancing both
              academic and social development. Highlights include:
            </p>
            <ImageText
              img="/images/child.png"
              tags={[
                "Museum visits to explore art, history, and science exhibits.",
                "Aquarium trips to study marine life and ecosystems.",
                "Historical sites where they can immerse themselves in the stories of the past.",
              ]}
              variant="left"
            />
          </div>

          <div className="">
            <h1>For Upper Elementary (Grades 4–6)</h1>
            <p style={{ marginBottom: "40px" }}>
              Upper Elementary students engage in more complex studies, and
              field trips provide opportunities for hands-on, interdisciplinary
              learning. Examples include:
            </p>
            <ImageText
              img="/images/child.png"
              tags={[
                "Outdoor education programs focusing on ecology, geology, and teamwork.",
                "Visits to planetariums and science centers to expand their understanding of astronomy and physics.",
                "Cultural excursions to art galleries, music performances, or ethnic festivals to deepen their appreciation for diversity.",
              ]}
              variant="right"
            />
          </div>

          <div className="">
            <h1>For Middle School (Grades 7–8)</h1>
            <p style={{ marginBottom: "40px" }}>
              As adolescents, our middle schoolers crave independence and
              opportunities for critical thinking. Field trips challenge them to
              apply their knowledge in real-world settings. Memorable trips
              include
            </p>
            <ImageText
              img="/images/child.png"
              tags={[
                "Overnight retreats for team-building and leadership development.",
                "Service-learning trips to participate in community service and environmental stewardship.",
                "Career exploration visits to businesses, colleges, and innovation hubs.",
                "Historical reenactments and government facilities to experience civics in action.",
              ]}
              variant="left"
            />
          </div>
        </div>
        <div className="home-section-2">
          <div className="container">
            <h1>The Benefits of Field Trips</h1>
            <p>
              Field trips are more than just fun—they are transformative
              experiences that
            </p>
            <p className="item">
              Foster <b>hands-on learning</b>, making abstract concepts concrete
              and engaging.
            </p>
            <p className="item">
              Develop <b>social skills</b> through group collaboration and
              shared experiences.
            </p>
            <p className="item">
              Encourage <b>critical thinking</b> by asking questions, solving
              problems, and making connections.
            </p>
            <p className="item">
              Inspire a love for <b>lifelong learning</b> by showing students
              the world’s richness and diversity.
            </p>
          </div>
        </div>
        <div style={{ paddingTop: "120px" }}>
          <div className="container">
            <h1>Unforgettable Learning Adventures</h1>
            <p>
              At Rising Sun Montessori, we carefully plan field trips to enrich our curriculum and meet the developmental needs of each age group. These experiences allow students to see themselves as active participants in their community and the larger world.
            </p>
            <br />
            <p>
              Join us in creating a lifetime of memories and discovery for your child!
            </p>
            <br />
            <p>
              For more details about our field trips and how they support our Montessori approach, contact us or visit our website.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Component;
