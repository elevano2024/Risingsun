import ListItem from "@/components/common/list-item/list-item";
import Layout from "@/components/common/MainLayout";
import "./index.scss";

const ArtsEducationPage = () => {
  return (
    <Layout header="Arts Education Program">
      <div className="container EPA" style={{ paddingTop: "80px" }}>
        <p>
          California Proposition 28, the “Arts and Music in Schools” initiative,
          has been successfully passed, securing a brighter future for arts
          education in our state. This landmark measure allocates 1% of the
          state’s budget for public schools to support arts programs, enabling
          us to further enrich our students’ educational experience.
        </p>
        <br />
        <p>
          Rising Sun Montessori School is proud to offer Culinary Arts and
          Classroom Art programs, providing students with creative outlets,
          skill-building opportunities, and a deeper appreciation for the arts.
        </p>

        <div className="EPA-list">
          <ListItem
            title="Prop 28 Certification"
            link="/wp-content/uploads/2024/09/23-24-RSMS-PADC-Prop-28-Certification-Validated.pdf"
          />
          <ListItem
            title="2023–2024 Prop 28 Annual Report"
            link="/wp-content/uploads/2024/09/23-24-RSMS-Annual-Report-AMS-V2.pdf"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ArtsEducationPage;
