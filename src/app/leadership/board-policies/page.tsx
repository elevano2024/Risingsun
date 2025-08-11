import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const EducationProtectionAccount = () => {
  return (
    <Layout header="Board Policies">
      <div className="container" style={{ paddingTop: "80px" }}>
        <ListItem
          title="Bullying Prevention – Policy"
          link="/wp-content/uploads/2022/04/Bullying-Prevention-Policy.pdf"
        />
        <ListItem
          title="Conflict Resolution – Policy"
          link="/wp-content/uploads/2022/04/Conflict-Resolution-Policy.pdf"
        />
      </div>
    </Layout>
  );
};

export default EducationProtectionAccount;
