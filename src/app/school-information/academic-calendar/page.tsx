import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const links = [
  {
    title: "2025 – 2026 RSMS Academic Calendar",
    link: "/wp-content/uploads/2025/05/RSMS-2025-26-Academic-Calendar-final.pdf",
  },
  {
    title: "2026 – 2027 RSMS Academic Calendar",
    link: "/wp-content/uploads/2026/06/2026-27-Academic-Calendar-1.pdf",
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
