"use client";
import Layout from "@/components/common/MainLayout";
import "./index.scss";
import ListItem from "@/components/common/list-item/list-item";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";
import { useEffect, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const previousAgenda = [
  {
    year: "2024 – 2025",
    agendas: [
      {
        name: "REGULAR AGENDA 6.18.25",
        link: "https://risingsunmontessori.org/wp-content/uploads/2025/06/BOD-Agenda-6.18.2025-1.pdf",
      },
      {
        name: "REGULAR AGENDA 6.3.25",
        link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/RSMS-board-agenda-June-3-2025.pdf",
      },
      {
        name: "REGULAR AGENDA 5.6.25",
        link: "https://risingsunmontessori.org/wp-content/uploads/2025/05/RSMS-board-agenda-May-6-2025.pdf",
      },
      {
        name: "REGULAR AGENDA 3.4.25",
        link: "https://risingsunmontessori.org/wp-content/uploads/2025/03/RSMS-board-agenda-March-4-25.pdf",
      },
      {
        name: "REGULAR AGENDA 2.4.25",
        link: "https://risingsunmontessori.org/wp-content/uploads/2025/02/RSMS-board-agenda-Feb-4-25.pdf",
      },
      {
        name: "REGULAR AGENDA 1.7.25",
        link: "https://risingsunmontessori.org/wp-content/uploads/2025/01/board-agenda-1.7.25.pdf",
      },
      {
        name: "REGULAR AGENDA 12.11.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/12/RSMS-board-agenda-Dec-11-2024-1.pdf",
      },
      {
        name: "REGULAR AGENDA 11.5.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/11/RSMS-board-agenda-Nov-5-2024.pdf",
      },
      {
        name: "REGULAR AGENDA 10.8.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/10/RSMS-board-agenda-Oct-2024.pdf",
      },
      {
        name: "REGULAR AGENDA 9.3.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/08/RSMS-board-agenda-Sept-2024.pdf",
      },
      {
        name: "REGULAR AGENDA 8.6.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/08/RSMS-Board-Agenda-8-6-24.pdf",
      },
    ],
  },
  {
    year: "2023 – 2024",
    agendas: [
      {
        name: "REGULAR AGENDA 6.25.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/06/RSMS-board-agenda-June-25-2024.docx.pdf",
      },
      {
        name: "REGULAR AGENDA 6.4.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/06/RSMS-board-agenda-June-4-2024.docx.pdf",
      },
      {
        name: "REGULAR AGENDA 5.7.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/05/RSMS-board-agenda-May-2024.docx.pdf",
      },
      {
        name: "REGULAR AGENDA 3.5.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/03/Board-Agenda-3.5.24.pdf",
      },
      {
        name: "REGULAR AGENDA 2.6.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/02/RSMS-board-agenda-Feb-2024.pdf",
      },
      {
        name: "REGULAR AGENDA 1.9.24",
        link: "https://risingsunmontessori.org/wp-content/uploads/2024/01/RSMS-board-agenda-Jan2024.docx-Copy.pdf",
      },
      {
        name: "REGULAR AGENDA 12.5.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/12/Copy-of-Copy-of-RSMS-board-agenda-template-dec.docx.pdf",
      },
      {
        name: "REGULAR AGENDA 11.7.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/11/RSMS-REGULAR-AGENDA-11.7.23.pdf",
      },
      {
        name: "REGULAR AGENDA 9.5.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/09/RSMS-REGULAR-AGENDA-9.5.23.pdf",
      },
      {
        name: "REGULAR AGENDA 8.15.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/08/RSMS-REGULAR-AGENDA-8.15.23.pdf",
      },
    ],
  },
  {
    year: "2022 – 2023",
    agendas: [
      {
        name: "REGULAR AGENDA 6.27.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/06/RSMS-REGULAR-AGENDA-6.27.2023.pdf",
      },
      {
        name: "REGULAR AGENDA 6.6.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/06/RSMS-REGULAR-AGENDA-6.6.2023.pdf",
      },
      {
        name: "REGULAR AGENDA 5.9.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/05/RSMS-REGULAR-AGENDA-5.9.2023.pdf",
      },
      {
        name: "REGULAR AGENDA 3.7.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/03/RSMS-REGULAR-AGENDA-3.7.23.pdf",
      },
      {
        name: "REGULAR AGENDA 1.31.23",
        link: "https://risingsunmontessori.org/wp-content/uploads/2023/01/RSMS-REGULAR-AGENDA-1.31.23.pdf",
      },
      {
        name: "REGULAR AGENDA 12.6.22",
        link: "https://risingsunmontessori.org/wp-content/uploads/2022/12/RSMS-REGULAR-AGENDA-12.6.22.pdf",
      },
      {
        name: "REGULAR AGENDA 9.6.22",
        link: "https://risingsunmontessori.org/wp-content/uploads/2022/09/RSMS-REGULAR-AGENDA-9.6.22.pdf",
      },
      {
        name: "REGULAR AGENDA 8.16.22",
        link: "https://risingsunmontessori.org/wp-content/uploads/2022/08/RSMS-REGULAR-AGENDA-8.16.22.pdf",
      },
      {
        name: "REGULAR AGENDA 8.9.22",
        link: "https://risingsunmontessori.org/wp-content/uploads/2022/08/RSMS-REGULAR-AGENDA-8.9.22.pdf",
      },
    ],
  },
];

const EducationProtectionAccount = () => {
  const [epaWidth, setEpaWidth] = useState(0);

  useEffect(() => {
    setEpaWidth(document.getElementsByClassName("EPA")[0].clientWidth);
  }, [document.getElementsByClassName("EPA")]);

  return (
    <Layout header="Board Agendas">
      <div className="container agendas">
        <div className="EPA">
          <Document file="/webAssets/BOD-Agenda-6.18.2025-1.pdf">
            <Page
              pageNumber={1}
              width={epaWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>

        <div className="previousAgenda">
          <h1>Previous Agendas</h1>
          {previousAgenda.map((item) => (
            <div key={item.year}>
              <h2>{item.year}</h2>
              <div className="agendaItems">
                {item.agendas.map((agenda) => (
                  <ListItem
                    key={agenda.name}
                    title={agenda.name}
                    link={agenda.link}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default EducationProtectionAccount;
