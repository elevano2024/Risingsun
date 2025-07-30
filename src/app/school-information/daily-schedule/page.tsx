import Layout from "@/components/common/MainLayout";
import ListItem from "@/components/common/list-item/list-item";

const links = [
  {
    title: "RSMS Daily Schedule",
    link: "https://risingsunmontessori.org/wp-content/uploads/2023/02/Daily-Schedule.pdf",
  },
];

const Component = () => {
  return (
    <Layout header="Daily Schedule">
      <div className="container" style={{ paddingTop: "80px" }}>
        {links.map((_) => {
          return <ListItem key={_.title} title={_.title} link={_.link} />;
        })}
      </div>
    </Layout>
  );
};

export default Component;
