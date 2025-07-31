import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const links = [
  {
    title: "Family Handbook 2024 – 2025",
    link: "/wp-content/uploads/2024/11/2024-25-Family-Handbook-approved-11.5.24.pdf",
  },
];

const Component = () => {
  return (
    <Layout header="RSMS Family Handbook">
      <div className="container" style={{ paddingTop: "80px" }}>
        {links.map((_) => {
          return <ListItem key={_.title} title={_.title} link={_.link} />;
        })}
      </div>
    </Layout>
  );
};

export default Component;
