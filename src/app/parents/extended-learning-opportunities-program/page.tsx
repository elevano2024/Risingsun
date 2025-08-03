import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const Component = () => {
  return (
    <Layout
      header="Extended Learning Opportunities Program (ELOP)"
      subHeader=""
    >
      <div className="container" style={{ paddingTop: "80px" }}>
        <ListItem
          title="Extended Learning Opportunities Program Plan Guide"
          link="/wp-content/uploads/2024/04/RSMS-ELOP-Plan-Guide-1.pdf"
          variant="nobborder"
        />
      </div>
    </Layout>
  );
};

export default Component;
