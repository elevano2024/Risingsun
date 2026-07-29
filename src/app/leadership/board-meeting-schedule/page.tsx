import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const links = [
  {
    title: "2025-26 Board of Directors Meeting Schedule (updated)",
    link: "/wp-content/uploads/2026/05/RISING-SUN-MONTESSORI-SCHOOL-BOARD-OF-DIRECTORS-CALENDAR-2025-26-1.pdf",
  },
  {
    title: "2025-26 Board of Directors Meeting Schedule",
    link: "/wp-content/uploads/2025/06/RISING-SUN-MONTESSORI-SCHOOL-BOARD-OF-DIRECTORS-CALENDAR-2025-26.pdf",
  },
];

const EducationProtectionAccount = () => {
  return (
    <Layout header="Board Of Directors Meeting Schedule">
      <div className="container" style={{ paddingTop: "80px" }}>
        {links.map((item) => (
          <ListItem
            key={item.link}
            variant="nobborder"
            title={item.title}
            link={item.link}
          />
        ))}
      </div>
    </Layout>
  );
};

export default EducationProtectionAccount;
