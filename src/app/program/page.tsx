import ImageText from "@/components/common/image-text-combo/image-text-combo";
import Layout from "@/components/common/MainLayout";
import "./index.scss";

const items = [
  {
    image: "/images/child.png",
    title: "Building Independence and Responsibility",
    data: "Our students are guided to take ownership of their learning, manage their time effectively, and make thoughtful decisions. By fostering self-reliance and accountability, we help children develop the life skills needed for future success.",
    tag: "The Impact: Empowering children to take responsibility builds confidence and prepares them to be proactive, solution-oriented individuals.",
    variant: "left",
  },
  {
    image: "/images/child.png",
    title: "Strengthening Family and Community Values",
    data: "We partner closely with families to create a supportive environment where respect, courtesy, and collaboration are prioritized. Through service projects, community events, and real-world learning opportunities, our students learn the importance of contributing positively to their communities.",
    tag: "The Impact: A strong foundation of respect and service instills a sense of purpose and connection to the world around them.",
    variant: "right",
  },
  {
    image: "/images/child.png",
    title: "Promoting Academic Excellence and Practical Skills",
    data: "Our curriculum balances rigorous academics with hands-on, practical learning. Students engage in meaningful projects that encourage critical thinking, problem-solving, and creativity. From STEM activities to entrepreneurial endeavors, we equip children with the tools they need for success in any field.",
    tag: "The Impact: Academic strength and real-world readiness prepare students for higher education, career opportunities, and lifelong learning.",
    variant: "left",
  },
  {
    image: "/images/child.png",
    title: "Fostering Leadership and Character Development",
    data: "Leadership is cultivated naturally in our classrooms through collaboration, mentoring, and teamwork. Students learn to lead by example, make ethical decisions, and approach challenges with integrity and resilience.",
    tag: "The Impact: Strong character and leadership skills ensure students are prepared to navigate life’s opportunities and challenges with confidence.",
    variant: "right",
  },
  {
    image: "/images/child.png",
    title: "Nurturing Freedom and a Love of Learning",
    data: "At Rising Sun Montessori, education is about more than grades—it’s about igniting a passion for discovery. Our hands-on materials and child-centered approach allow students to delve deeply into subjects that inspire curiosity and mastery.",
    variant: "left",
    tag: "The Impact: Students develop a lifelong love of learning, driven by their own curiosity and a sense of accomplishment.",
  },
];

const Component = () => {
  return (
    <Layout header="Programs">
      <div className="programs" style={{ paddingTop: "80px" }}>
        <div className="container">
          <div className="programdetail">
            <h1>Rising Sun Montessori: A School Rooted in Timeless Values</h1>
            <p>
              At Rising Sun Montessori, we take pride in providing an
              educational environment that reflects the principles cherished by
              families who value responsibility, independence, and a strong
              sense of community. Our approach combines academic excellence with
              character development, preparing students to thrive as confident,
              capable, and compassionate individuals.
            </p>
          </div>
          {items.map((_) => {
            return (
              <ImageText
                key={_.title}
                title={_.title}
                data={_.data}
                img={_.image}
                tag={_.tag}
                variant={_.variant}
              />
            );
          })}
          <div className="programdetail">
            <h1>Join a School That Reflects Your Family’s Values</h1>
            <p>
              At Rising Sun Montessori, we provide an education that prepares
              students not only for academic success but for a life of purpose
              and contribution. With a focus on independence, freedom,
              responsibility, and community engagement, we help children grow
              into confident and capable young adults.
            </p>
            <br />
            <p>
              Come see how Rising Sun Montessori can make a difference for your
              child. Schedule a tour today and discover a school rooted in
              timeless principles and dedicated to preparing students for a
              bright future
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Component;
