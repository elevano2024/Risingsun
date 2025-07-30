import Layout from "@/components/common/MainLayout";
import "./index.scss";
import { staffList } from "./staffData";

const MeetOurStaff = () => {
  return (
    <Layout
      header="Meet Our Staff"
      subHeader="Welcome to Rising Sun Montessori School! Get to know the passionate educators and dedicated team members who make our school a vibrant place to learn and grow. Each one brings their unique talents and heart to our community, we’re excited for you to meet them!"
    >
      <div className="meet-our-staff">
        <div className="container staff-list-container">
          {staffList.map((staff, i) => {
            return (
              <a
                key={i}
                className="staff-container"
                href={
                  staff.details
                    ? `/about/meet-our-staff/${staff.name
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`
                    : undefined
                }
              >
                <div className="staff_photo">
                  <img
                    src={staff?.photo}
                    alt={staff.name}
                    className="staff_photo"
                  />
                </div>
                <h3 className="staff_name">{staff.name}</h3>
                <p className="staff_position">{staff.position}</p>
              </a>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default MeetOurStaff;
