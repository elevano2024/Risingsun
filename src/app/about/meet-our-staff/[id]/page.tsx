import Layout from "@/components/common/MainLayout";
import "./index.scss";
import { staffList } from "../staffData";

const StaffDetails = ({ params }: { params: { id: string } }) => {
  const staff = staffList.find(
    (staff) =>
      staff.name.toLowerCase().replace(/\s+/g, "-") === params.id.toLowerCase()
  );

  const staff_name = staff?.name;

  return (
    <Layout header={`${staff_name} (${staff?.position})`}>
      <div className="container staff-details" style={{ marginTop: "80px" }}>
        <div className="staff-details-head">
          <div className="staff-image-container">
            <img src={staff?.photo} alt={staff_name} className="staff_photo" />
          </div>
          <div className="staff-info">
            <h2 className="staff-name">{staff_name}</h2>
            <p className="staff-position">{staff?.position}</p>
          </div>
        </div>
        <div>
          {staff?.details?.map((detail) => {
            return <p key={detail}>{detail}</p>;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default StaffDetails;
