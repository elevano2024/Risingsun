"use client";

import Carousel from "../carosel/Carousel";
import "./header.scss";
import React, { useEffect, useState } from "react";

// Define the structure of each menu item
const menuData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
    subMenu: [
      { name: "About Us", link: "/about" },
      { name: "Meet Our Staff", link: "/about/meet-our-staff" },
      {
        name: "School Metric & Performance",
        link: "/about/school-metric-performance",
      },
      {
        name: "Education Protection Account (EPA)",
        link: "/about/education-protection-account",
      },
      {
        name: "Accountability Plan (LCAP)",
        link: "/about/accountability-plan",
      },
      {
        name: "RSMS Charter Petition",
        link: "/about/rsms-charter-petition",
      },
      {
        name: "Charter SELAP Local Plan",
        link: "/about/charter-selap-local-plan",
      },
      {
        name: "Facts About Charter Schools",
        link: "/about/facts-about-charter-schools",
      },
    ],
  },
  {
    name: "Programs",
    link: "/program",
    subMenu: [
      { name: "Programs", link: "/program" },
      {
        name: "Transitional Kindergarten / Kindergarten",
        link: "/program/tk-kindergarten",
      },
      { name: "Lower Elementary", link: "/program/lower-elementary" },
      { name: "Upper Elementary", link: "/program/upper-elementary" },
      { name: "Middle School", link: "/program/middle-school" },
      { name: "Electives & Clubs", link: "/program/electives-clubs" },
      {
        name: "Learning Beyond the Classroom: Field Trips",
        link: "/program/learning-beyond-the-classroom-field-trips",
      },
      { name: "Community Activities", link: "/program/community-activities" },
    ],
  },
  { name: "Enrollment & School Tours", link: "/enrollment-school-tours" },
  { name: "Gallery", link: "/gallery" },
  {
    name: "School Info",
    link: "/school-information",
    subMenu: [
      {
        name: "Academic Calendar",
        link: "/school-information/academic-calendar",
      },
      {
        name: "Daily Schedule",
        link: "/school-information/daily-schedule",
      },
      {
        name: "Family Handbook",
        link: "/school-information/family-handbook",
      },
      { name: "Supply List", link: "/school-information/supply-list" },
    ],
  },
  {
    name: "Parents",
    link: "/parents",
    subMenu: [
      {
        name: "Extended Learning Opportunities Program (ELOP)",
        link: "/parents/extended-learning-opportunities-program",
      },
      {
        name: "Suicide Awareness & Prevention",
        link: "/parents/suicide-awareness-prevention",
      },
      { name: "RSMS Meal Program", link: "https://rsmsmeals.com/" },
      {
        name: "Homelessness Services (McKinney-Vento Act)",
        link: "/parents/homelessness-services",
      },
      { name: "Parent Committee", link: "/parents/parent-committee" },
      { name: "Notices", link: "/parents/notices" },
    ],
  },
  {
    name: "Leadership",
    link: "/leadership",
    subMenu: [
      {
        name: "Board of Directors",
        link: "/leadership/board-of-directors",
      },
      {
        name: "Board Agendas",
        link: "/leadership/board-agendas",
      },
      {
        name: "Board Meeting Schedule",
        link: "/leadership/board-meeting-schedule",
      },
      {
        name: "Board Policies",
        link: "/leadership/board-policies",
      },
    ],
  },
];

const Header = ({
  header,
  subHeader,
  carouselData = [],
}: {
  header?: string;
  subHeader?: string;
  carouselData?: any[];
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null); // Track the open menu
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null); // Track the open submenu
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the current index for the carousel
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false); // Track mobile menu state

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName); // Toggle the submenu
  };
  const toggleSubMenu = (menuName: string) => {
    setOpenSubMenu(openSubMenu === menuName ? null : menuName); // Toggle the submenu
  };

  const [updatedMenuData, setUpdatedMenuData] = useState(menuData);

  useEffect(() => {
    // Create a resize event listener to update state when window is resized
    const handleResize = () => {
      if (window.innerWidth > 1400) {
        setUpdatedMenuData(menuData);
      } else {
        setUpdatedMenuData([
          ...menuData.slice(0, 5),
          { name: "More", link: "/more", subMenu: menuData.slice(5) },
        ]);
      }

      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
        setOpenMenu(null);
      }
    };

    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileMenuOpen && !target.closest('.header_main__headMenu__mobileMenu') && !target.closest('.header_main__headMenu__hamburger')) {
        setMobileMenuOpen(false);
        setOpenMenu(null);
      }
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    handleResize();
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="header_main">
      <div className="header_main__subWrapper">
        {carouselData?.length > 0 ? (
          <img src="/images/IllustrationLine.svg" alt="Header Banner" />
        ) : (
          <img src="/images/header-banner.svg" alt="Header Banner" />
        )}
      </div>
      <div className="container header_main__headMenu">
        <img
          className="header_main__headMenu__logo"
          src="/images/logo.svg"
          alt="Rising Sun Montessori School Logo"
        />
        <div className="header_main__headMenu__links">
          {updatedMenuData.map((menu) => (
            <div
              key={menu.name}
              className="header_main__headMenu__links__dropdown"
            >
              <a
                href={menu.link}
                onClick={(e) => {
                  if (menu.subMenu) {
                    e.preventDefault(); // Prevent page reload
                    toggleMenu(menu.name);
                  }
                }}
                className={`${openMenu === menu.name ? "active" : ""} `}
              >
                {menu.name}
                {menu.subMenu && (
                  <img src="/images/chevron-down.svg" alt="Toggle Submenu" />
                )}
              </a>
              {menu.subMenu && openMenu === menu.name && (
                <div className="dropdown-menu">
                  {menu.subMenu.map((subItem) => (
                    <>
                      <a
                        key={subItem.name}
                        href={subItem.link}
                        onClick={(e) => {
                          if ((subItem as any).subMenu) {
                            e.preventDefault(); // Prevent page reload
                            toggleSubMenu(subItem.name);
                          }
                        }}
                      >
                        {subItem.name}
                        {(subItem as any).subMenu?.length && (
                          <img
                            src="/images/chevron-down.svg"
                            alt="Toggle Submenu"
                          />
                        )}
                        {(subItem as any).subMenu?.length &&
                          openSubMenu === subItem.name && (
                            <div className="header_main__headMenu__links__dropdown__subMenu">
                              {(subItem as any).subMenu &&
                                openSubMenu === subItem.name && (
                                  <div className="sub-menu">
                                    {(subItem as any).subMenu.map(
                                      (subSubItem: any) => (
                                        <a
                                          key={subSubItem.name}
                                          href={subSubItem.link}
                                          onClick={(e) => {
                                            e.preventDefault(); // Prevent page reload
                                            window.location.href =
                                              subSubItem.link;
                                          }}
                                        >
                                          {subSubItem.name}
                                        </a>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          )}
                      </a>
                    </>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="header_main__headMenu__hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={mobileMenuOpen ? "active" : ""}></span>
          <span className={mobileMenuOpen ? "active" : ""}></span>
          <span className={mobileMenuOpen ? "active" : ""}></span>
        </button>

        {/* Mobile Menu */}
        <div className={`header_main__headMenu__mobileMenu ${mobileMenuOpen ? "open" : ""}`}>
          {menuData.map((menu) => (
            <div key={menu.name} className="header_main__headMenu__mobileMenu__item">
              <a
                href={menu.link}
                onClick={(e) => {
                  if (menu.subMenu) {
                    e.preventDefault();
                    toggleMenu(menu.name);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className={`${openMenu === menu.name ? "active" : ""}`}
              >
                {menu.name}
                {menu.subMenu && (
                  <img src="/images/chevron-down.svg" alt="Toggle Submenu" />
                )}
              </a>
              {menu.subMenu && openMenu === menu.name && (
                <div className="header_main__headMenu__mobileMenu__submenu">
                  {menu.subMenu.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.link}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            className="header_main__headMenu__mobileMenu__contact"
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </a>
        </div>
        <div className="header_main__headMenu__links">
          <a
            className="header_main__headMenu__links__link__contact"
            href="/contact"
          >
            Contact Us
          </a>
        </div>
      </div>
      <div className="container header_main__content">
        {header && (
          <>
            <div className="header_main__content__title">
              <h2 className="text-2xl font-semibold">{header}</h2>
            </div>
            <div className="header_main__content__subtitle">
              <p className="text-lg">{subHeader}</p>
            </div>
          </>
        )}
        {carouselData.length > 0 && (
          <div className="header_main__content__carousel">
            {/* Render carousel items here */}
            <div className="header_main__content__carousel__content">
              <div className="title">
                <img src="/images/school.svg" alt="Carousel Icon" />
                {carouselData[currentIndex]?.title}
              </div>
              <div className="subtitle">
                {carouselData[currentIndex]?.subTitle}
              </div>
              <button
                onClick={() =>
                  (window.location.href = carouselData[currentIndex]?.link)
                }
              >
                {" "}
                Read More
              </button>
            </div>
            <div className="header_main__content__carousel__carousel">
              <Carousel
                carouselImages={carouselData}
                setCurrentIndex={setCurrentIndex}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
