import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ListItem from "@/components/common/list-item/list-item";

const Component = () => {
  return (
    <Layout header="Parent Committee" subHeader="">
      <div className="container parent-committee">
        <p>
          The purpose of the RSMS Parent Committee is to serve the school’s best
          interests by supporting the school’s mission, programs, and
          activities. The RSMS Parent Committee should mirror the goals of the
          Board of Directors, operating like task units rather than
          bureaucracies, with the end goal of creating significant contributions
          to the school for the benefit of all students.
        </p>
        <p>
          Participation in the RSMS Parent Committee is open to all Rising Sun
          families. There are no costs to participate. The Parent Committee
          General Meetings are held once per month, in a designated classroom on
          campus.
        </p>
        <div>
          <h2>Parent Committee Officers</h2>
          <p>
            An excellent school is made up of the efforts of many individuals:
            teachers, administrators, board members, and families are what make
            our community thrive. The following are the Parent Committee Officer
            descriptions. If you feel you would like to serve in one of these
            capacities, please contact the Head of School to discuss how you can
            make make a significant contribution to Rising Sun.
          </p>
        </div>
        <div>
          <h4>President</h4>
          <p>
            The Parent Committee President plays a lead role in fostering an
            environment where parent involvement is encouraged and respected.
            The president organizes meetings, fosters and welcomes inclusiveness
            and diversity of volunteers and their contributions, and supports
            the growth and retention of the group. Main responsibilities
            include:
          </p>
          <ul>
            <li>Organizing and presiding over all meetings</li>
            <li>General Supervision and leadership of the Parent Committee</li>
            <li>Be versed in the Parent Committee Guidelines</li>
            <li>Work with Secretary to set the meeting agenda</li>
            <li>
              Serve as liaison between parents, school community, and the Board
              of Directors
            </li>
            <li>
              Report on Parent Committee activities at monthly Board of Director
              meetings
            </li>
            <li>Perform other duties as may be assigned</li>
            <li>Support various school functions</li>
          </ul>
        </div>
        <div>
          <h4>Vice President</h4>
          <p>
            The Parent Committee Vice-President acts as an aide to the president
            in fostering an environment where parent involvement is encouraged
            and respected. The vice-president will perform the duties in the
            absence of the president. Other main responsibilities include:
          </p>
          <ul>
            <li>Attendance at Parent Committee meetings</li>
            <li>Be versed in the Parent Committee Guidelines</li>
            <li>Perform other duties as may be assigned</li>
            <li>Support various school functions</li>
          </ul>
        </div>
        <div>
          <h4>Treasurer</h4>
          <p>
            The Parent Committee Treasurer is responsible for ensuring
            fundraising activity goals match money available to spend, and
            budgets accordingly. The treasurer ensures the safe-keeping of the
            monies raised by the Parent Committee on behalf of Rising Sun
            Montessori School. Other main responsibilities include:
          </p>
          <ul>
            <li>Attendance at Parent Committee meetings</li>
            <li>Verifies, along with event chair, all monies received</li>
            <li>Keeps accurate record of receipts and expenditures</li>
            <li>Works with President to create budgets</li>
            <li>
              Prepares financial statements each month, distributing copies to
              officers and Head of School
            </li>
            <li>Be versed in the Parent Committee Guidelines</li>
            <li>Perform other duties as may be assigned</li>
            <li>Support various school functions</li>
          </ul>
        </div>
        <div>
          <h4>Secretary</h4>
          <p>
            The Parent Committee Secretary is responsible for keeping an
            accurate record of the proceedings of all Parent Committee meetings.
            Main responsibilities include:
          </p>
          <ul>
            <li>Attendance at all Parent Committee meetings</li>
            <li>Work with President to set the agenda</li>
            <li>Send out announcement of the meeting (date and time)</li>
            <li>
              Sends out agenda and any pertinent documents necessary prior to
              the meeting
            </li>
            <li>Distribute attendance sheet at meetings</li>
            <li>
              Type minutes shortly after meeting and email to President for
              approval
            </li>
            <li>
              Upon approval of minutes, distribute to other officers and Head of
              School
            </li>
            <li>Be versed in the Parent Committee Guidelines</li>
            <li>Perform other duties as may be assigned</li>
            <li>Support various school functions</li>
          </ul>
        </div>
        <p className="note">
          All Parent Committee Officers should be able to commit a reasonable
          amount of personal volunteer time to attend regular monthly meetings,
          conduct follow-up business, and attend various school functions.
        </p>
        <div>
          <ListItem
            title="Parent Committee Guidelines"
            link="https://risingsunmontessori.org/wp-content/uploads/2022/04/RSMS-PARENT-COMMITTEE-GUIDELINES.pdf"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Component;
