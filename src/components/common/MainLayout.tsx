import Footer from "./footer/Footer";
import Header from "./header/Header";
import "./../../styles/global.scss";

const Layout = ({
  children,
  header,
  subHeader,
  carouselData = [],
}: {
  children: React.ReactNode;
  header?: string;
  subHeader?: string;
  carouselData?: any[];
}) => {
  return (
    <div>
      <Header
        header={header}
        subHeader={subHeader}
        carouselData={carouselData}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
