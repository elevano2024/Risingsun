import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const Component = () => {
  return (
    <Layout header="Suicide Awareness & Prevention" subHeader="">
      <div className="container" style={{ paddingTop: "80px" }}>
        <ListItem
          title="Toolkits and Resources"
          link="https://risingsunmontessori.org/wp-content/uploads/2024/09/Suicide-Awareness.pdf"
          variant="nobborder"
        />
      </div>
    </Layout>
  );
};

export default Component;
