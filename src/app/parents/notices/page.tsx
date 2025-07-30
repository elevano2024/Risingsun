import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";
import "./index.scss";

const links = [
  {
    title:
      "El Dorado County Charter SELPA Governance Council Public Hearing May 2025",
    link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/Charter-Notice-of-CEO-Public-Hearing-2025-26-1.pdf",
  },
  {
    title: "Section 504 Procedures",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/10/Section-504-Procedures.pdf",
  },
  {
    title: "Dangers of Synthetic Drugs",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/10/Dangers-of-Synthetic-Drugs.pdf",
  },
  {
    title: "CDE Charter Complaint Form",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/10/RSMS-Charter-School-Complaint-Form-CDE.pdf",
  },
  {
    title: "Annual Notification on Safe Storage of Firearms",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/10/Annual-Notification-on-Safe-Storage-of-Firearms.pdf",
  },
  {
    title: "Student Mental Health Services",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/09/Student-Mental-Health-Annual-Notification.pdf",
  },
  {
    title: "Prop 28 Certification – Arts Education",
    link: "https://risingsunmontessori.org/arts-education/",
  },
  {
    title: "El Dorado Charter SELPA Governance Council Public Hearing May 2024",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/05/Charter-Notice-of-CEO-Public-Hearing-2024-25.pdf",
  },
  {
    title: "Charter Notice of CEO Public Hearing 2021-22",
    link: "https://risingsunmontessori.org/wp-content/uploads/2022/04/Charter-Notice-of-CEO-Public-Hearing-2021-22.pdf",
  },
  {
    title: "Comprehensive School Safety Plan",
    link: "https://risingsunmontessori.org/wp-content/uploads/2022/04/doc03115620210210131324.pdf",
  },
  {
    title: "2020 Learning Continuity and Attendance Plan",
    link: "https://risingsunmontessori.org/wp-content/uploads/2022/04/2020_Learning_Continuity_and_Attendance_Plan_Rising_Sun_Montessori_School_20201001-Adopted.pdf",
  },
  {
    title: "SELPA Governance, Budget and SELPA Plan",
    link: "https://charterselpa.org/governance/",
  },
  {
    title: "Title IX",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/10/Title-IX-2024.pdf",
  },
];

const Component = () => {
  return (
    <Layout
      header="Homelessness Services (McKinney-Vento Act)"
      subHeader="The McKinney-Vento Homeless Assistance Act is a federal law that protects the educational rights of children and youth experiencing homelessness."
    >
      <div className="container" style={{ paddingTop: "80px" }}>
        {links.map((_) => {
          return <ListItem key={_.title} title={_.title} link={_.link} />;
        })}
      </div>
    </Layout>
  );
};

export default Component;
