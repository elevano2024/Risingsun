import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const EducationProtectionAccount = () => {
  return (
    <Layout header="Board Of Directors Meeting Schedule">
      <div className="container" style={{ paddingTop: "80px" }}>
        <ListItem
          variant="nobborder"
          title="2025-26 Board of Directors Meeting Schedule"
          link="https://risingsunmontessori.org/wp-content/uploads/2025/06/RISING-SUN-MONTESSORI-SCHOOL-BOARD-OF-DIRECTORS-CALENDAR-2025-26.pdf"
        />
      </div>
    </Layout>
  );
};

export default EducationProtectionAccount;
