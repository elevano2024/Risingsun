"use client";
import Layout from "@/components/common/MainLayout";
import "./index.scss";
import { useState } from "react";

const gallery = [
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7067-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7015-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4543-2-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/RSMSDSC_4447-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/RSMSDSC_4431-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4843-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4893-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/RSMSDSC_4448-1-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_6894-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7025-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4824-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_6890-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7347-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7469-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7200-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7157-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4794-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_6915-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7116-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/RSMSDSC_4464-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7302-1-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/RSMSDSC_4515-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4531-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7130-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_6911-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/RSMSDSC_4430-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4548-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4801-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_5117-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7519-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_6989-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7476-1-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_6892-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7337-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7519-1-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_6951-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/04/DSC_4533-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_7476-scaled.jpg",
  "https://risingsunmontessori.org/wp-content/uploads/2022/05/DSC_6920-scaled.jpg",
];

const Component = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const nextImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev! + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev! - 1 + gallery.length) % gallery.length);
    }
  };

  const closeModal = () => setActiveIndex(null);

  return (
    <Layout header="Gallery">
      <div className="container gallery">
        {gallery.map((image, index) => (
          <div
            className="gallery-image-container"
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            <div className="gallery-image">
              <img src={image} alt={`Gallery Image ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
      {activeIndex !== null && (
        <div className="gallery-modal">
          <div className="overlay" onClick={closeModal}></div>
          <img
            key={activeIndex} // triggers animation on change
            src={gallery[activeIndex]}
            className="modal-image"
            alt={`Selected Image ${activeIndex + 1}`}
          />
          <button className="nav-btn left" onClick={prevImage}>
            &#10094;
          </button>
          <button className="nav-btn right" onClick={nextImage}>
            &#10095;
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Component;
