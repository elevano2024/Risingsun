import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ListItem from "@/components/common/list-item/list-item";
import ContactPage from "@/components/common/contact/ContactPage";

const EducationProtectionAccount = () => {
  return (
    <Layout header="Contact Us">
      <div className="contact">
        <ContactPage />
      </div>
    </Layout>
  );
};

export default EducationProtectionAccount;
