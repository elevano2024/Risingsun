import ListItem from "@/components/common/list-item/list-item";
import Layout from "@/components/common/MainLayout";
import "./index.scss";

const Component = () => {
  return (
    <Layout
      header="Homelessness Services (McKinney-Vento Act)"
      subHeader="The McKinney-Vento Homeless Assistance Act is a federal law that protects the educational rights of children and youth experiencing homelessness."
    >
      <div
        className="container homelessness-services"
        style={{ paddingTop: "80px" }}
      >
        <ListItem
          title="El Dorado County Office of Education, Placerville | Resources For Parents"
          link="https://www.edcoe.org/educational-services/support-services/mckinney-vento-resources-to-support-students-experiencing-homelessness/resources-for-parents"
        />
        <p>
          Click below to watch a brief video about the McKinney-Vento Act and
          how it helps students and families experiencing homelessness.
        </p>
        <iframe
          className="homelessness-video"
          src="https://www.youtube.com/embed/Owwwztok2pQ?feature=oembed"
          title="Homelessness Services (McKinney-Vento Act)"
        ></iframe>
      </div>
    </Layout>
  );
};

export default Component;
