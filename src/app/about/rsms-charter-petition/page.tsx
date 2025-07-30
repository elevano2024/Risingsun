import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ListItem from "@/components/common/list-item/list-item";

const list = [
  {
    title: "RSMS 2025-2030 Charter Renewal Petition",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/RSMS-Renewal-Charter-2025-2030.pdf",
  },
  {
    title: "Appendix 1: Finance Budget Plan",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-1-Finance-Budget-Plan.pdf",
  },
  {
    title: "Appendix 2: Educational Program",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-2-Educational-Program.pdf",
  },
  {
    title: "Appendix 3: Employee Handbook",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-3-Employee-Handbook.pdf",
  },
  {
    title: "Appendix 4: Family Handbook",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-4-Family-Handbook-.pdf",
  },
  {
    title: "Appendix 5: Governance",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-5-Governance.pdf",
  },
  {
    title: "Appendix 6: Local Control and Accountability",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-6-Local-Control-and-Accountability-Plan-LCAP.pdf",
  },
  {
    title: "Appendix 7: Facility Leases and Assurance",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-7-Facility-Leases-and-Assurances-4940-and-4958-RJM.pdf",
  },
  {
    title: "Appendix 8: 2023 Dashboard and Prior 3 years of CAASPP Results",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-8-2023-Dashboard-and-Prior-3-years-of-CAASPP-Results.pdf",
  },
  {
    title:
      "Appendix 9: Approval From Latrobe District to Operate in Latrobe District Boundaries",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Appendix-9-Approval-From-Latrobe-District-to-Operate-in-Latrobe-District-Boundaries.pdf",
  },
];

const list2 = [
  {
    title: "Title IX",
    link: "https://risingsunmontessori.org/wp-content/uploads/2022/04/Title-IX-2019.pdf",
  },
];

const RSMSCharacterPetition = () => {
  return (
    <Layout
      header="RSMS Charter Petition"
      subHeader="The charter petition, complete with appendices, can be viewed as a hard copy in the RSMS Administrative office at 4958 Robert J Mathews Parkway, El Dorado Hills, CA 95762."
    >
      <div className="container EPA">
        {list.map((_) => {
          return <ListItem key={_.title} title={_.title} link={_.link} />;
        })}
        <div className="titleEPA">Title Nine Information</div>
        {list2.map((_) => {
          return (
            <ListItem
              key={_.title}
              title={_.title}
              link={_.link}
              variant="nobborder"
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default RSMSCharacterPetition;
