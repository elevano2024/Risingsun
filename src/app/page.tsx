import Layout from "@/components/common/MainLayout";
import HomeComponent from "@/components/pages/home";

export default function Home() {
  const caroselData = [
    {
      title: "Our Campus",
      subTitle:
        "Nestled in the golden foothills of southeast El Dorado County, Rising Sun Montessori School is located in El Dorado Hills off Latrobe Road.",
      image:
        "https://risingsunmontessori.org/wp-content/uploads/2022/04/campus-scaled.jpg",
      link: "/our-campus",
    },
    {
      title: "Our Classrooms",
      subTitle:
        "Rising Sun Montessori classrooms are designed to meet the needs of each child, allowing them to learn at their own pace and in their own way.",
      image:
        "https://risingsunmontessori.org/wp-content/uploads/2022/04/Montessori-Classroom.jpg",
      link: "/our-classroom",
    },
    {
      title: "Our Students",
      subTitle:
        "At Rising Sun Montessori School we are committed to enrolling a diverse student population and creating a school community that reflects the diversity of our students and parents.",
      image:
        "https://risingsunmontessori.org/wp-content/uploads/2022/04/students-scaled.jpg",
      link: "/our-students",
    },
  ];

  return (
    <Layout carouselData={caroselData}>
      <HomeComponent />
    </Layout>
  );
}
