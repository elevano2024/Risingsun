import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ListItem from "@/components/common/list-item/list-item";

const EducationProtectionAccount = () => {
  return (
    <Layout header="Our Campus">
      <div className="container EPA">
        <p>
          Nestled in the golden foothills of southeast El Dorado County, Rising
          Sun Montessori School’s campus is located in El Dorado Hills,
          California, off Latrobe Road.
        </p>
        <br />
        <p>
          Directions: Take Highway 50 traveling east from Sacramento. Exit at
          Latrobe Rd. heading south and continue 1.8 miles, then turn right onto
          Golden Foothill Pkwy. Take first left onto Robert J. Matthews Pkwy.
          Rising Sun Montessori is one block down on the right, number 4940.
        </p>
        <br />
        <p> Phone Numbers: You can call us at 916-936-2333 or 530-350-9500</p>
        <br />
      </div>
    </Layout>
  );
};

export default EducationProtectionAccount;
