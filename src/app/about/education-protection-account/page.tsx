import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ListItem from "@/components/common/list-item/list-item";

const EducationProtectionAccount = () => {
  return (
    <Layout header="Education Protection Account (EPA)">
      <div className="container EPA">
        <p>
          The Education Protection Account (EPA) was created in November 2012 by
          Proposition 30, The Schools and Local Public Safety Protection Act of
          2012, and it was implemented in 2013. The EPA is governed by Section
          36 of Article XIII of the California Constitution, which was amended
          by Proposition 55 in November 2016. The revenues generated from
          Section 36 of Article XIII of the California Constitution are
          deposited into a state account called the Education Protection
          Account. Of the funds in the account, 89 percent is provided to K-12
          education and 11 percent to community colleges.
        </p>
        <br />
        <p>
          Article XIII, Section 36, Subdivision (e), Paragraph (6) of the
          California Constitution requires all districts, counties and charter
          schools to report on their Web sites an accounting of how much money
          was received from the EPA and how that money was spent.
        </p>
        <div className="EPA-list">
          <ListItem
            variant="nobborder"
            title="2024 – 2025 EPA Resolution & Summary"
            link="/wp-content/uploads/2024/09/RSMS-2024-25-EPA-Resolution-and-Summary-Updated.pdf"
          />
        </div>
      </div>
    </Layout>
  );
};

export default EducationProtectionAccount;
