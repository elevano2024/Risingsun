import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ListItem from "@/components/common/list-item/list-item";

const AccountabilityPlan = () => {
  return (
    <Layout header="Local Control & Accountability Plan (LCAP)">
      <div className="container EPA">
        <ListItem
          title="2024-2025 Local Control & Accountability Plan"
          link="/wp-content/uploads/2024/06/2024-25-Local-Control-and-Accountability-Plan-LCAP.pdf"
        />
        <ListItem
          title="DRAFT 2024-27 Local Control and Accountability Plan (LCAP)"
          link="/wp-content/uploads/2024/06/DRAFT-2024-27-Local-Control-and-Accountability-Plan-LCAP.pdf"
        />
        <ListItem
          title="DRAFT 2023-24 (LCAP) Annual Update"
          link="/wp-content/uploads/2024/06/DRAFT-2023-24-LCAP-Annual-Update.pdf"
        />
        <ListItem
          title="DRAFT LCFF Budget Overview for Parents Template – 2024-25"
          link="/wp-content/uploads/2024/06/DRAFT-LCFF-Budget-Overview-for-Parents-Template-2024-25.pdf"
        />
      </div>
    </Layout>
  );
};

export default AccountabilityPlan;
