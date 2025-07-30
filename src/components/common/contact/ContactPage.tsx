import "./contact.scss";

const ContactPage = ({ variant }: { variant?: string }) => {
  return (
    <div className="contact-page">
      <div className="container contact-container">
        <h1>
          Have questions about Rising Sun Montessori School or our programs?{" "}
        </h1>
        <div className="contact-contact">
          <span className="giveCall">Give us a call</span>
          <div className="contact-phone">
            <div className="contact-numbers">
              <img src="/images/phone-call.svg" alt="Phone Icon" />
              <a href="tel:+19169362333" className="contact-number">
                +1 (916) 936-2333
              </a>
            </div>
            <hr />
            <div className="contact-numbers">
              <img src="/images/phone-call.svg" alt="Phone Icon" />
              <a href="tel:+15303509500" className="contact-number">
                +1 (530) 350-9500
              </a>
            </div>
          </div>
        </div>
        <div className="contact-data">
          or
          <br />
          <br />
          {variant == "home"
            ? " fill up the form to send us a message."
            : "Visit us at this location:"}
        </div>
        {variant != "home" && (
          <div className="contact-address">
            4940 Robert J Mathews Parkway,
            <br /> El Dorado Hills, CA 95762
          </div>
        )}
        <div className="contact-buttons">
          {variant === "home" && (
            <a
              href="mailto:jshort@risingsunmontessori.org"
              className="fill-form-button"
            >
              Email Us
            </a>
          )}
          <a
            className="direction-button"
            target="_blank"
            href="https://www.google.com/maps/place/4940+Robert+J+Mathews+Pkwy,+El+Dorado+Hills,+CA+95762,+USA/data=!4m2!3m1!1s0x809af0124888de07:0x6a49eafc448d8855?sa=X&ved=1t:242&ictx=111"
          >
            <img src="/images/map.svg" alt="Location Icon" />
            Get Direction
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
