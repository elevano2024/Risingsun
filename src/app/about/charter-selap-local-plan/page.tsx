import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ListItem from "@/components/common/list-item/list-item";

const list = [
  {
    title: "Charter Notice of CEO Public Hearing 2026-27",
    link: "/wp-content/uploads/2026/04/Charter-Notice-of-CEO-Public-Hearing-2026-27.pdf",
  },
  {
    title: "El Dorado Charter SELPA – Governance",
    link: "https://charterselpa.org/governance/",
  },
];

const CharacterSELPA = () => {
  return (
    <Layout header="Charter SELPA Local Plan">
      <div className="container EPA">
        {list.map((_) => {
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

export default CharacterSELPA;
