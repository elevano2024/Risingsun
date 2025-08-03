import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const links = [
  {
    title: "2024 – 2025 RSMS Academic Calendar",
    link: "/wp-content/uploads/2024/03/FINAL-RSMS-2024-25-Academic-Calendar-v1-2.pdf",
  },
  {
    title: "2025 – 2026 RSMS Academic Calendar",
    link: "/wp-content/uploads/2025/05/RSMS-2025-26-Academic-Calendar-final.pdf",
  },
];

const Component = () => {
  return (
    <Layout header="Academic Calendar">
      <div className="container" style={{ paddingTop: "80px" }}>
        {links.map((_) => {
          return <ListItem key={_.title} title={_.title} link={_.link} />;
        })}
      </div>
    </Layout>
  );
};

export default Component;
