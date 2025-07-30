import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const links = [
  {
    title: "Back to School Supply List TK/Kindergarten",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/07/TK-K-Back-to-School-Supply-List.docx-1.pdf",
  },
  {
    title: "Back to School Supply List 1st – 3rd & Magellan",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/07/1st-3rd-and-Magellan-Advanced-K-Back-to-School-Supply-List.docx.pdf",
  },
  {
    title: "Back to School Supply List Phoenix",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/07/Phoenix-Back-to-School-Supply-List.docx-1.pdf",
  },
  {
    title: "Back to School Supply List Taurus",
    link: "https://risingsunmontessori.org/wp-content/uploads/2024/08/Back-to-School-Supply-List-for-Taurus.docx.pdf",
  },
];

const Component = () => {
  return (
    <Layout header="School Supplies Lists">
      <div className="container" style={{ paddingTop: "80px" }}>
        {links.map((_) => {
          return <ListItem key={_.title} title={_.title} link={_.link} />;
        })}
      </div>
    </Layout>
  );
};

export default Component;
