(() => {
  const menuData = [
    { name: "Home", link: "/" },
    {
      name: "About",
      link: "/about",
      subMenu: [
        { name: "About Us", link: "/about" },
        { name: "Meet Our Staff", link: "/about/meet-our-staff" },
        { name: "School Metric & Performance", link: "/about/school-metric-performance" },
        { name: "Education Protection Account (EPA)", link: "/about/education-protection-account" },
        { name: "Accountability Plan (LCAP)", link: "/about/accountability-plan" },
        { name: "RSMS Charter Petition", link: "/about/rsms-charter-petition" },
        { name: "Charter SELPA Local Plan", link: "/about/charter-selap-local-plan" },
        { name: "Facts About Charter Schools", link: "/about/facts-about-charter-schools" },
      ],
    },
    {
      name: "Programs",
      link: "/program",
      subMenu: [
        { name: "Programs", link: "/program" },
        { name: "Why Montessori?", link: "/program/the-montessori-method" },
        { name: "Transitional Kindergarten / Kindergarten", link: "/program/tk-kindergarten" },
        { name: "Lower Elementary", link: "/program/lower-elementary" },
        { name: "Upper Elementary", link: "/program/upper-elementary" },
        { name: "Middle School", link: "/program/middle-school" },
        { name: "Electives & Clubs", link: "/program/electives-clubs" },
        { name: "Learning Beyond the Classroom: Field Trips", link: "/program/learning-beyond-the-classroom-field-trips" },
        { name: "Community Activities", link: "/program/community-activities" },
      ],
    },
    { name: "Enrollment & School Tours", link: "/enrollment-school-tours" },
    { name: "Gallery", link: "/gallery" },
    {
      name: "School Info",
      link: "/school-information/academic-calendar",
      subMenu: [
        { name: "Academic Calendar", link: "/school-information/academic-calendar" },
        { name: "Daily Schedule", link: "/school-information/daily-schedule" },
        { name: "Family Handbook", link: "/school-information/family-handbook" },
        { name: "Supply List", link: "/school-information/supply-list" },
      ],
    },
    {
      name: "Parents",
      link: "/parents/extended-learning-opportunities-program",
      subMenu: [
        { name: "Extended Learning Opportunities Program (ELOP)", link: "/parents/extended-learning-opportunities-program" },
        { name: "Suicide Awareness & Prevention", link: "/parents/suicide-awareness-prevention" },
        { name: "RSMS Meal Program", link: "https://rsmsmeals.com/" },
        { name: "Homelessness Services (McKinney-Vento Act)", link: "/parents/homelessness-services" },
        { name: "Parent Committee", link: "/parents/parent-committee" },
        { name: "Notices", link: "/parents/notices" },
      ],
    },
    {
      name: "Leadership",
      link: "/leadership/board-of-directors",
      subMenu: [
        { name: "Board of Directors", link: "/leadership/board-of-directors" },
        { name: "Board Agendas", link: "/leadership/board-agendas" },
        { name: "Board Meeting Schedule", link: "/leadership/board-meeting-schedule" },
        { name: "Board Policies", link: "/leadership/board-policies" },
      ],
    },
  ];

  /** Featured bar tabs (VCS-style: only key destinations upfront). */
  const primaryNames = ["Programs", "Leadership"];

  const chevron = "/wp-content/uploads/rsms-static/images/chevron-down.svg";
  let openDrawerSection = null;
  let drawerOpen = false;

  const url = (link) => {
    if (link.startsWith("http")) return link;
    if (link === "/") return "/";
    return link.endsWith("/") ? link : `${link}/`;
  };

  const externalAttrs = (link) =>
    link.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";

  const normalizePath = (path) => {
    if (!path || path === "/") return "/";
    const withSlash = path.endsWith("/") ? path : `${path}/`;
    return withSlash;
  };

  const currentPath = normalizePath(window.location.pathname);

  const pathMatches = (link) => {
    if (!link || link.startsWith("http")) return false;
    const target = normalizePath(url(link));
    if (target === "/") return currentPath === "/";
    return currentPath === target || currentPath.startsWith(target);
  };

  /** Longest matching link wins (e.g. /program/tk-… over /program/). */
  function findActiveTrail() {
    let best = { section: null, item: null, len: -1 };

    menuData.forEach((section) => {
      const consider = (item, parent) => {
        if (!pathMatches(item.link)) return;
        const len = normalizePath(url(item.link)).length;
        if (len > best.len) {
          best = { section: parent || section, item, len };
        }
      };

      consider(section, section);
      (section.subMenu || []).forEach((sub) => consider(sub, section));
    });

    return best.section ? best : null;
  }

  const activeTrail = findActiveTrail();
  const activeSectionName = activeTrail?.section?.name || null;
  const activeItemLink = activeTrail?.item ? normalizePath(url(activeTrail.item.link)) : null;

  const isCurrentLink = (link) =>
    !!link && !link.startsWith("http") && normalizePath(url(link)) === activeItemLink;

  const isSectionCurrent = (menu) => menu.name === activeSectionName;

  openDrawerSection = activeSectionName;

  const primaryNav = document.getElementById("rsms-primary-nav");
  const drawerNav = document.getElementById("rsms-drawer-nav");
  const drawer = document.getElementById("rsms-nav-drawer");
  const overlay = document.getElementById("rsms-nav-overlay");
  const hamburger = document.getElementById("rsms-hamburger");
  const closeBtn = document.getElementById("rsms-nav-close");

  if (!primaryNav || !drawerNav || !drawer || !overlay || !hamburger || !closeBtn) return;

  function primaryItems() {
    return menuData.filter((m) => primaryNames.includes(m.name));
  }

  function renderNestedSub(subItem) {
    if (!subItem.subMenu || !subItem.subMenu.length) return "";
    return `<div class="header_main__headMenu__links__dropdown__subMenu">
      <div class="sub-menu">
        ${subItem.subMenu
          .map(
            (leaf) =>
              `<a href="${url(leaf.link)}"${externalAttrs(leaf.link)}>${leaf.name}</a>`
          )
          .join("")}
      </div>
    </div>`;
  }

  function renderPrimary() {
    primaryNav.innerHTML = primaryItems()
      .map((menu) => {
        const chev = menu.subMenu
          ? `<img src="${chevron}" alt="" />`
          : "";
        const dropdown = menu.subMenu
          ? `<div class="dropdown-menu">${menu.subMenu
              .map((s) => {
                const nested = s.subMenu && s.subMenu.length;
                const nestedChev = nested
                  ? `<img src="${chevron}" alt="" />`
                  : "";
                return `<div class="dropdown-menu__item"><a href="${url(s.link)}"${externalAttrs(s.link)}>${s.name}${nestedChev}</a>${renderNestedSub(s)}</div>`;
              })
              .join("")}</div>`
          : "";
        return `<div class="header_main__headMenu__links__dropdown">
          <a href="#" data-primary-menu-trigger="${menu.name}" aria-haspopup="true">${menu.name}${chev}</a>
          ${dropdown}
        </div>`;
      })
      .join("");

    primaryNav.querySelectorAll("a[data-primary-menu-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => event.preventDefault());
    });

    const primaryDropdowns = [
      ...primaryNav.querySelectorAll(".header_main__headMenu__links__dropdown"),
    ];
    const closeOtherPrimaryMenus = (active) => {
      primaryDropdowns.forEach((item) => {
        item.classList.toggle("is-open", item === active);
      });
    };

    primaryDropdowns.forEach((dropdown) => {
      dropdown.addEventListener("mouseenter", () => closeOtherPrimaryMenus(dropdown));
      dropdown.addEventListener("mouseleave", () => dropdown.classList.remove("is-open"));
      dropdown.addEventListener("focusin", () => closeOtherPrimaryMenus(dropdown));
      dropdown.addEventListener("focusout", (event) => {
        if (!dropdown.contains(event.relatedTarget)) dropdown.classList.remove("is-open");
      });
    });
  }

  function renderDrawer() {
    drawerNav.innerHTML =
      menuData
        .map((menu) => {
          const expanded = openDrawerSection === menu.name;
          const sectionOn = isSectionCurrent(menu);
          const leafCurrent = !menu.subMenu && isCurrentLink(menu.link);
          const chev = menu.subMenu
            ? `<img src="${chevron}" alt="" />`
            : "";
          const sub =
            menu.subMenu && expanded
              ? `<div class="header_main__navDrawer__submenu">${menu.subMenu
                  .map((s) => {
                    const cur = isCurrentLink(s.link);
                    return `<a href="${url(s.link)}" class="${cur ? "is-current" : ""}"${cur ? ' aria-current="page"' : ""}${externalAttrs(s.link)}>${s.name}</a>`;
                  })
                  .join("")}</div>`
              : "";
          const topClass = [
            expanded ? "active" : "",
            sectionOn || leafCurrent ? "is-current" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return `<div class="header_main__navDrawer__item${sectionOn ? " is-current" : ""}">
            <a href="${url(menu.link)}" data-drawer-menu="${menu.name}" class="${topClass}" ${menu.subMenu ? 'aria-expanded="' + (expanded ? "true" : "false") + '"' : ""}${leafCurrent ? ' aria-current="page"' : ""}>${menu.name}${chev}</a>
            ${sub}
          </div>`;
        })
        .join("") +
      `<a class="header_main__navDrawer__contact${isCurrentLink("/contact") ? " is-current" : ""}" href="/contact/">Contact Us</a>`;

    drawerNav.querySelectorAll("a[data-drawer-menu]").forEach((a) => {
      a.addEventListener("click", (e) => {
        const name = a.getAttribute("data-drawer-menu");
        const item = menuData.find((m) => m.name === name);
        if (item?.subMenu) {
          e.preventDefault();
          openDrawerSection = openDrawerSection === name ? null : name;
          renderDrawer();
        } else {
          setDrawer(false);
        }
      });
    });
  }

  function setDrawer(open) {
    drawerOpen = open;
    if (open) {
      drawer.removeAttribute("hidden");
      overlay.removeAttribute("hidden");
      // Re-open the section for the page the user is on
      openDrawerSection = activeSectionName;
    } else {
      drawer.setAttribute("hidden", "");
      overlay.setAttribute("hidden", "");
    }
    drawer.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);
    document.body.classList.toggle("rsms-nav-lock", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    hamburger.querySelectorAll("span").forEach((span) => {
      span.classList.toggle("active", open);
    });
    if (open) {
      renderDrawer();
      closeBtn.focus();
    }
  }

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    setDrawer(!drawerOpen);
  });

  closeBtn.addEventListener("click", () => setDrawer(false));
  overlay.addEventListener("click", () => setDrawer(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawerOpen) setDrawer(false);
  });

  renderPrimary();
  renderDrawer();
})();
