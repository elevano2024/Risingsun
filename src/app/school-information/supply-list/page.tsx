import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const links = [
  {
    title: "Back to School Supply List TK/Kindergarten",
    link: "/wp-content/uploads/2026/07/Back-to-School-Supply-List-TK.K.docx.pdf",
  },
  {
    title: "Back to School Supply List 1st – 3rd",
    link: "/wp-content/uploads/2026/07/Back-to-School-Supply-List-1st.-2nd.-3rd.docx.pdf",
  },
  {
    title: "Back to School Supply List 4th – 5th",
    link: "/wp-content/uploads/2026/07/Back-to-School-Supply-List-4th-5th.docx.pdf",
  },
  {
    title: "Back to School Supply List Taurus",
    link: "/wp-content/uploads/2026/07/Back-to-School-Supply-List-for-Taurus.docx.pdf",
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
