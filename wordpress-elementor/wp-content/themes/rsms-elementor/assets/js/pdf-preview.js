/**
 * RSMS editable PDF preview widget.
 */
(function () {
  const PDF_JS_VERSION = "3.11.174";
  let pdfJsPromise;

  function loadPdfJs() {
    const existing = window["pdfjs-dist/build/pdf"] || window.pdfjsLib;
    if (existing) return Promise.resolve(existing);
    if (pdfJsPromise) return pdfJsPromise;

    pdfJsPromise = new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" +
        PDF_JS_VERSION +
        "/pdf.min.js";
      script.onload = function () {
        const pdfjsLib = window["pdfjs-dist/build/pdf"] || window.pdfjsLib;
        if (!pdfjsLib) {
          reject(new Error("PDF.js did not initialize"));
          return;
        }
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" +
          PDF_JS_VERSION +
          "/pdf.worker.min.js";
        resolve(pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return pdfJsPromise;
  }

  function iframeFallback(preview, url, title, bakedText) {
    const iframe = document.createElement("iframe");
    iframe.title = title;
    iframe.src = url + "#toolbar=1&navpanes=0";
    preview.innerHTML = "";
    preview.appendChild(iframe);
    if (bakedText) {
      const text = document.createElement("div");
      text.className = "rsms-pdf-a11y";
      text.textContent = bakedText;
      preview.appendChild(text);
    }
  }

  function initializeWidget(mount) {
    if (!mount || mount.dataset.rsmsPdfInit === "1") return;
    mount.dataset.rsmsPdfInit = "1";

    const url = mount.dataset.rsmsPdfSrc || "";
    const title = mount.dataset.rsmsPdfTitle || "PDF preview";
    const preview = mount.querySelector(".rsms-pdf-preview");
    const existingText = mount.querySelector(".rsms-pdf-a11y");
    const bakedText = existingText ? existingText.textContent : "";
    if (!url || !preview) return;

    const canvas = document.createElement("canvas");
    const a11y = document.createElement("div");
    a11y.className = "rsms-pdf-a11y";
    a11y.textContent = bakedText;
    preview.innerHTML = "";
    preview.appendChild(canvas);
    preview.appendChild(a11y);

    loadPdfJs()
      .then(function (pdfjsLib) {
        return pdfjsLib.getDocument(url).promise;
      })
      .then(function (pdf) {
        return pdf.getPage(1);
      })
      .then(function (page) {
        const width = Math.max(mount.clientWidth || 0, 640);
        const unscaled = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: width / unscaled.width });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        return page
          .render({ canvasContext: canvas.getContext("2d"), viewport: viewport })
          .promise.then(function () {
            return page.getTextContent();
          })
          .then(function (content) {
            a11y.textContent = content.items
              .map(function (item) {
                return item.str;
              })
              .join(" ");
          });
      })
      .catch(function () {
        iframeFallback(preview, url, title, bakedText);
      });
  }

  function initializeAll(scope) {
    const root = scope && scope.querySelectorAll ? scope : document;
    root.querySelectorAll("[data-rsms-pdf-src]").forEach(initializeWidget);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeAll(document);
    });
  } else {
    initializeAll(document);
  }

  window.addEventListener("elementor/frontend/init", function () {
    if (!window.elementorFrontend || !window.elementorFrontend.hooks) return;
    window.elementorFrontend.hooks.addAction(
      "frontend/element_ready/rsms-pdf-preview.default",
      function (scope) {
        initializeAll(scope && scope[0] ? scope[0] : scope);
      },
    );
  });
})();
