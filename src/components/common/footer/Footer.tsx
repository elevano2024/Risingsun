import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer_container">
      <div className="container footer_container__content">
        <div className="footer_container__content__data">
          <img
            className="header_main__headMenu__logo"
            src="/images/footer-logo.svg"
            alt="Rising Sun Montessori School Logo"
          />
          <div className="footer_container__content__data__text">
            Rising Sun Montessori School
          </div>
          <div className="footer_container__content__data__subText">
            4940 Robert J Mathews Parkway El Dorado Hills, CA 95762
            <br />
            916-936-2333 or 530-350-9500
          </div>
        </div>
        <div className="footer_container__content__social">
          <a target="_blank" href="https://www.facebook.com/RisingSunMontessori"><img src="/images/Social.svg" alt="social" width={120} height={120} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
