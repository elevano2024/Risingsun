# Rising Sun website — staff editing guide (Elementor)

A plain-language guide so school staff can update **text, photos, links, PDFs, and pages** without a developer for everyday changes.

**Builder:** [Elementor](https://elementor.com/) — visual drag-and-drop editor  
**Official overview:** [Explore the Elementor Editor](https://elementor.com/help/explore-the-elementor-editor/)

---

## 1. Log in

| What | Link |
| --- | --- |
| **Website admin (login)** | [risingsunmontessori.org/wp-admin](https://risingsunmontessori.org/wp-admin) |
| **All pages** | [Pages list](https://risingsunmontessori.org/wp-admin/edit.php?post_type=page) |
| **Photos & files** | [Media Library](https://risingsunmontessori.org/wp-admin/upload.php) |
| **Public website** | [risingsunmontessori.org](https://risingsunmontessori.org/) |

Ask your site admin for a username and password. Do not share it.

---

## 2. What you can edit vs what needs a developer

Use **Elementor** for everyday **page content**. Some site-wide pieces (menu, logo, footer) are handled by IT.

| Task | Who | Notes |
| --- | --- | --- |
| Change wording on a page | **Staff** | Heading / Text Editor |
| Change a photo or PDF on a page | **Staff** | Image widget / Media Library |
| Change a button or text link | **Staff** | Link field in the widget |
| Add a simple new section (heading + text + image) | **Staff** | Keep Style changes minimal |
| Create a new page | **Staff** | Then ask IT to add it to the **menu** |
| Unpublish / trash a page | **Staff** | Then ask IT to clean menu links |
| Top menu (Programs, Leadership, ☰ menu…) | **Developer** | Ask IT |
| Logo | **Developer** | Ask IT |
| Footer (address, social, copyright) | **Developer** | Ask IT |
| Home carousel / complex Home blocks | **Ask IT** | Often special HTML layout blocks |
| Gallery / Contact complex layouts | **Ask IT** for structure | Text/link tweaks may still be OK |
| School Information / Parents / Leadership hub links | **Developer** | These can redirect to a child page on purpose |

**Rule of thumb:** If you are changing **words, links, or pictures on a normal page**, use Elementor. If you are changing **the menu, logo, or footer**, call IT.

---

## 3. Open a page in Elementor (do this every time)

1. Log in at [risingsunmontessori.org/wp-admin](https://risingsunmontessori.org/wp-admin).
2. Left menu → **Pages** → **All Pages**.
3. Find the page (use the search box).
4. Hover the title → click **Edit with Elementor**.  
   Or open **Edit**, then click the big **Edit with Elementor** button.
5. Wait until the editor loads.

You will see three areas ([official layout](https://elementor.com/help/explore-the-elementor-editor/)):

| Area | What it is |
| --- | --- |
| **Top bar** | Publish / Update, undo history, responsive (desktop/tablet/phone) |
| **Left panel** | Widgets list, or settings for the thing you clicked (**Content** / **Style** / **Advanced**) |
| **Canvas** | Live preview of the page |

**Staff tip:** Stay on the **Content** tab for almost all edits. Avoid **Style** / **Advanced** unless IT showed you exactly what to change (fonts and colors are controlled by the school theme).

---

## 4. Edit text

Official help: [Heading widget](https://elementor.com/help/heading-widget/) · [Text Editor widget](https://elementor.com/help/text-editor-widget/)

1. Click the text on the canvas.
2. Left panel → **Content** → edit the words.
3. Click **Publish** or **Update** (top bar).
4. Open the public page in a new tab and confirm.

**Tips**

- The **green hero title** on interior pages is usually a **Heading** — click it to edit.
- Body paragraphs are usually **Text Editor**.
- Prefer pasting as plain text (**Cmd/Ctrl + Shift + V**) so Word/Google formatting does not break the look.
- Do not change the **HTML Tag** (H1/H2) unless IT asked you to — that affects search results and layout.

---

## 5. Edit a list with icons (About and similar pages)

Many lists use the **Icon List** widget. Official help: [Icon List widget](https://elementor.com/help/icon-list-widget/)

1. Click the list on the page.
2. Left panel → **Content** → expand an item.
3. Edit **Text** and optional **Link**.
4. Use **Add Item** for a new row; use the trash/duplicate icons on an item to remove/copy.
5. **Publish**.

---

## 6. Change a link (button or text)

Official help: [Button widget](https://elementor.com/help/button-widget/)

1. Click the button or linked text.
2. Find **Link** in the Content panel.
3. Paste a full web address, for example:
   - A page on our site: `https://risingsunmontessori.org/about/`
   - An outside site: `https://rsmsmeals.com/`
4. For outside sites, open link settings (gear) and choose **Open in new window** when available.
5. **Publish**, then click the link on the live page to test.

---

## 7. Change or add images

Official help: [Image widget](https://elementor.com/help/image-widget/)

### Replace an image on the page

1. Click the image.
2. Content → click the image thumbnail → **Upload Files** or pick from **Media Library**.
3. Fill in **Alternative Text** (alt text), e.g. `Kindergarten students at outdoor work`.
4. **Select** → **Publish**.

### Add a new image

1. Left panel widgets (**+**) → drag **Image** onto the page.
2. Choose / upload the file → set alt text → **Publish**.

### Upload files only

1. Dashboard → **Media** → **Add New Media File**.
2. Drop files; attach them to pages later as above.

**Photo guidelines**

- Prefer JPG / PNG / WebP, ideally under a few MB.
- Keep staff photos similar in crop and size to existing ones.
- Always add **alt text** (helps accessibility). You can also set alt text in **Media Library** by clicking the file → **Alternative Text**.

**Note:** Uploading a new file creates a **new link**. Old links to the previous file do not change automatically. To swap a PDF/image everywhere while keeping the same link, ask IT.

---

## 8. Add or update a PDF (handbook, agenda, form)

1. **Media** → **Add New** → upload the PDF.
2. Click the file → copy **File URL**.
3. On the page in Elementor, select the download/view link or button.
4. Paste the URL into **Link** → **Publish** → test the download.

---

## 9. Add a simple new section

1. Hover between sections on the canvas → click **+**.
2. Choose a simple layout (one column, or two columns).
3. Drag **Heading**, **Text Editor**, **Image**, and/or **Button**.
4. Match nearby wording style; avoid inventing new colors/fonts in **Style**.
5. Check **tablet** and **mobile** icons in the top/bottom bar.
6. **Publish**.

Official help: [Add elements to a page](https://elementor.com/help/add-elements-to-a-page/) · [Mobile editing](https://elementor.com/help/mobile-editing/)

**Hard pages:** Home, Gallery, and Contact may show one large **HTML** block instead of separate widgets. Do **not** edit HTML code yourself. Ask IT for layout changes there. (Broken HTML can hide the whole page — see [Changes don’t appear online](https://elementor.com/help/changes-dont-appear-online/).)

---

## 10. Remove a section or widget

1. Click the widget or section.
2. Right-click → **Delete** (or use the trash icon).
3. Do **not** delete the green hero title area unless IT asked you to.
4. **Publish** and review the full page.

**Undo:** Top bar → **History** (clock) → restore an earlier save.  
Official help: [Revision history](https://elementor.com/help/elementor-revision-history/)

**Find buried items:** Top bar → **Structure** (Navigator), or **Cmd/Ctrl + I**.  
Official help: [Navigator / Structure](https://elementor.com/help/navigator/)

---

## 11. Create a new page

1. **Pages** → **Add New**  
   Direct link: [Add New Page](https://risingsunmontessori.org/wp-admin/post-new.php?post_type=page)
2. Enter a clear **title**.
3. Set a **Parent** if it belongs under About / Programs / etc.:
   - Open page settings (gear) in the editor.
   - **Parent** → choose the parent page.
4. Click **Edit with Elementor** → add Heading + content.
5. **Publish**.
6. Copy the public web address from the browser.

**Important:** New pages do **not** appear in the top menu automatically. Email IT with:

- Page title  
- Public web address  
- Where it should sit in the menu (e.g. under About)

---

## 12. Hide or remove a page

| Goal | Steps |
| --- | --- |
| Hide temporarily | Pages → hover page → **Quick Edit** → Status **Draft** → Update |
| Remove | Pages → **Trash** (recoverable from Trash for a while) |
| Remove from the top menu only | Ask developer |

After drafting/trashing, ask IT to remove leftover menu links so visitors do not get errors.

---

## 13. Before you finish — checklist

- [ ] Clicked **Publish** / **Update**
- [ ] Viewed the public page while logged out or in a private window
- [ ] Checked **mobile** view in Elementor
- [ ] Tested every changed link and PDF
- [ ] Names, dates, phone numbers, emails double-checked
- [ ] Images have **alt text**
- [ ] If you created/removed a page, emailed IT about the **menu**

Keyboard shortcut while editing: **Cmd/Ctrl + S** often saves/updates in Elementor.

---

## 14. “My changes don’t show” — fix in order

Official help: [My changes do not appear online](https://elementor.com/help/changes-dont-appear-online/)

1. Confirm you clicked **Publish** / **Update**.
2. Hard refresh the public page: Mac **Cmd+Shift+R** · Windows **Ctrl+F5**.
3. Try a private/incognito window.
4. Ask an admin to clear Elementor cache: **Elementor → Tools → Clear Files & Data** (wording may say Regenerate / Clear cache), then save.  
   Related: [Custom CSS / regenerate](https://elementor.com/help/custom-css-not-working/)
5. If still wrong, use Elementor **History** to restore, or contact IT with the page address and a screenshot.

---

## 15. Do / Don’t

| Do | Don’t |
| --- | --- |
| Edit **Content** text, links, images | Redesign fonts/colors on **Style** without guidance |
| Publish, then verify on the public site | Assume the editor preview alone is enough |
| Use History to undo | Panic-delete whole sections |
| Ask IT for menu / logo / footer | Expect Elementor to edit the header menu/logo |
| Ask IT before editing big HTML blocks | Paste complex HTML into the HTML widget |
| Keep one person editing a page at a time | Have two people Edit with Elementor on the same page at once |

---

## 16. When to email a developer

Send this template:

```text
Page address (URL):
What I want to change:
Screenshot (before):
Deadline:
I already tried: Publish / hard refresh / History (yes/no)
```

Typical IT-only work: menu, logo, footer, redirects, Home/Gallery structure, site-wide style, plugins, broken layout after an edit.

---

## 17. Practice drill (15 minutes)

1. Log in at [risingsunmontessori.org/wp-admin](https://risingsunmontessori.org/wp-admin).
2. Open **About** → **Edit with Elementor**.
3. Change one harmless word → **Publish** → view the page.
4. Open **History** and restore if you want.
5. Replace one image with itself (practice Media Library + alt text) → **Publish**.

When that feels easy, you are ready for real updates. (If you are practicing, restore any test wording afterward.)

---

## 18. Official Elementor help links (bookmark)

- [Explore the Editor](https://elementor.com/help/explore-the-elementor-editor/)
- [Heading](https://elementor.com/help/heading-widget/)
- [Text Editor](https://elementor.com/help/text-editor-widget/)
- [Image](https://elementor.com/help/image-widget/)
- [Button](https://elementor.com/help/button-widget/)
- [Icon List](https://elementor.com/help/icon-list-widget/)
- [Navigator / Structure](https://elementor.com/help/navigator/)
- [Mobile editing](https://elementor.com/help/mobile-editing/)
- [Revision history](https://elementor.com/help/elementor-revision-history/)
- [Changes don’t appear online](https://elementor.com/help/changes-dont-appear-online/)

---

*Written for Rising Sun Montessori staff. Everyday page content is edited in Elementor. Menu, logo, and footer changes go through IT.*

**IT / developers:** see [wordpress-elementor/README.md](../wordpress-elementor/README.md) for local setup and theme deploy (git → SFTP staging → production).
