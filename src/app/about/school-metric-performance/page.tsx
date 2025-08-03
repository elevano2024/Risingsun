import Layout from "@/components/common/MainLayout";
import "./index.scss";

const metrics = [
  {
    imageLink:
      "/wp-content/uploads/2022/05/wasc-logo-1.png",
    title: "WASC Logo",
    link: "https://directory.acswasc.org/",
  },
  {
    imageLink:
      "/wp-content/uploads/2022/04/CA-School-Dashboard-Logo-1.png",
    title: "CA-School-Dashboard-Logo-1",
    link: "https://www.caschooldashboard.org/reports/09618380129965/2019",
  },
  {
    imageLink:
      "/wp-content/uploads/2022/04/CAASPP-Logo-1.png",
    title: "CAASPP-Logo-1",
    link: "https://caaspp-elpac.cde.ca.gov/caaspp/DashViewReportSB?ps=true&lstTestYear=2021&lstTestType=B&lstGroup=1&lstSubGroup=1&lstGrade=13&lstSchoolType=A&lstCounty=09&lstDistrict=61838-0129965&lstSchool=0129965",
  },
  {
    imageLink:
      "/wp-content/uploads/2023/05/public-school-review-logo.png",
    title: "public-school-review-logo",
    link: "https://www.publicschoolreview.com/rising-sun-montessori-profile",
  },
  {
    imageLink:
      "/wp-content/uploads/2024/01/image-1000x190-1.png",
    title: "ca dept of education",
    link: "https://sarconline.org/public/summary/09618380129965/2022%E2%80%932023",
  },
];

const SchoolMetricPerformance = () => {
  return (
    <Layout
      header="School Metrics & Performance"
      subHeader="Rising Sun Montessori is proud to be fully accredited by the Western Association of Schools and Colleges (WASC). Our school is committed to academic excellence, student growth, and continuous improvement."
    >
      <div className="schoolMetricPerformance">
        <div className="container metricsListContainer">
          {metrics.map((metric, i) => {
            return (
              <div key={i} className="metric-container">
                <a
                  href={metric.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="metric-link"
                >
                  <div className="metric_logo">
                    <img
                      src={metric.imageLink}
                      alt={metric.title}
                      className="metric_image"
                      width={200}
                      height={80}
                    />
                    <span className="metric_title">View Details</span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default SchoolMetricPerformance;
