import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";
import "./index.scss";

const Component = () => {
  return (
    <Layout header="About Us">
      <div className="container about" style={{ paddingTop: "80px" }}>
        <h2>Mission and Vision</h2>
        <p>
          The Mission of Rising Sun Montessori School is to provide an authentic
          Montessori school that embraces the diversity of our students,
          parents, and teachers. Our school community will nurture the
          individual needs of each child in a learning environment that
          encourages students to be self-directed, avid learners who are
          prepared for a diverse world.
        </p>
        <p>
          The Vision of RSMS is to implement an effective educational program
          that will sustain the Charter School’s mission for continued
          generations of RSMS students and families. To achieve this we envision
          a school that has:
        </p>

        <h3>High Standards</h3>
        <p>
          Students are expected to adhere to high standards of student behavior
          and academic achievement; life-long guidelines are directly taught and
          modeled by staff. Students are expected to demonstrate these values in
          their schoolwork as well as their interactions with peers and adults.
        </p>

        <h3>Significant Student Support</h3>
        <p>
          Smaller class sizes, and strong academic, social, and intervention
          support programs.
        </p>

        <h3>Talented Staff Sustained by Extensive Professional Development</h3>
        <p>
          Our staff will improve their performance with a high emphasis on
          professional development goals, training and evaluation tools.
        </p>

        <h3>Parent and Community Involvement</h3>
        <p>
          Parents will support their children and the Charter School by
          encouraging studying and reading at home, supporting good behavior at
          school, and participating in school activities and committees. Parents
          will be valued and included as members of the school culture. Parental
          input will be actively solicited. The school will continue to develop
          meaningful community partnerships to help sustain and deliver its
          educational mission.
        </p>

        <p>
          The Vision of RSMS is to implement an effective educational program
          that will sustain the Charter School’s mission for continued
          generations of RSMS students and families. To achieve this we envision
          a school that has:
        </p>
        <div className="about-list">
          <ListItem
            title="Title IX 2019"
            link="/wp-content/uploads/2022/04/Title-IX-2019.pdf"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Component;
