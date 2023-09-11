const ReplaceWithPolyfill = function () {
  const parent = this.parentNode;
  if (!parent) return;

  if (!arguments.length) {
    parent.removeChild(this);
    return;
  }

  Array.from(arguments).forEach((currentNode, i) => {
    if (typeof currentNode !== "object") {
      currentNode = this.ownerDocument.createTextNode(currentNode);
    } else if (currentNode.parentNode) {
      currentNode.parentNode.removeChild(currentNode);
    }

    if (i === 0) {
      parent.replaceChild(currentNode, this);
    } else {
      parent.insertBefore(currentNode, this.previousSibling);
    }
  });
};

if (!Element.prototype.replaceWith)
  Element.prototype.replaceWith = ReplaceWithPolyfill;
if (!CharacterData.prototype.replaceWith)
  CharacterData.prototype.replaceWith = ReplaceWithPolyfill;
if (!DocumentType.prototype.replaceWith)
  DocumentType.prototype.replaceWith = ReplaceWithPolyfill;

function scrollTo(element, to, duration) {
  const start = element.scrollTop;
  const change = to - start;
  let startTime = null;

  function animateScroll(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    element.scrollTop = easeInOutQuad(elapsed, start, change, duration);
    if (elapsed < duration) {
      window.requestAnimationFrame(animateScroll);
    }
  }

  window.requestAnimationFrame(animateScroll);
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

const scrollToActiveNavItem = () => {
  const nav = document.querySelector("#index nav");
  if (nav) {
    nav.focus();
    scrollTo(
      document.querySelector(".layout"),
      document.querySelector("nav .active").offsetTop,
      550,
    );
  }
};

function scrollViewActiveNavItem() {
  // Get the active nav item
  let activeItem = document.querySelector("#index nav ol li .active");

  // If the active nav item exists
  if (activeItem) {
    // Scroll the active item into view within the container
    activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// List of labs (as provided earlier)
const labs = [
  "Introduction",
  "Requirements",
  "Setup GitHub",
  "Setup Visual Studio Code",
  "Setup Git",
  "Version Control",
  "Git",
  "Create a Project",
  "Checking Status",
  "Tracking Files",
  "Making Changes",
  "Staging Changes",
  "Staging and Committing",
  "Committing Changes",
  "HyperText Markup Language",
  "Tags, Attributes, and Elements",
  "Sections",
  "Page Titles",
  "Paragraphs and Headings",
  "Spans and Divs",
  "Lists, Links, and Images",
  "Tables and Forms",
  "Semantic HTML",
  "Accessible Links",
  "Accesisble Forms",
  "Embedded Content",
  "Applying CSS",
  "Selectors, Properties, and Values",
  "Class and ID Selectors",
  "Grouping and Nesting",
  "Psuedo Classes",
  "Pseudo Elements",
  "Specificity",
  "Display",
  "Colors",
  "Text",
  "Margins and Padding",
  "Borders",
  "You Did It!",
  "Acknowledgements, References, and Resources",
];

function generateNav() {
  const navContainer = document.querySelector("#index nav ol");
  labs.forEach((lab, index) => {
    // Create list item and anchor tag
    const li = document.createElement("li");
    const a = document.createElement("a");

    // Setting attributes
    li.id = `lab_${index + 1}_link`;
    a.href = `lab_0${index + 1}.html`;
    a.textContent = lab;

    // Append anchor to list item and list item to navigation container
    li.appendChild(a);
    navContainer.appendChild(li);
  });
}

function generateFooterNavigation() {
  const footerContainer = document.querySelector("#content");
  const currentLabId = Number(document.body.getAttribute("data-lab-id"));
  const footerNav = document.createElement("nav");
  footerNav.className = "foot-navigation";

  if (currentLabId > 1) {
    const prevAnchor = createFooterNavLink(
      `lab_0${currentLabId - 1}.html`,
      "Previous",
    );
    footerNav.appendChild(prevAnchor);
  } else {
    footerNav.appendChild(document.createElement("span"));
  }

  if (currentLabId < labs.length) {
    const nextAnchor = createFooterNavLink(
      `lab_0${currentLabId + 1}.html`,
      "Next",
    );
    footerNav.appendChild(nextAnchor);
  }

  footerContainer.appendChild(footerNav);
}

function createFooterNavLink(href, label) {
  const anchor = document.createElement("a");
  anchor.href = href;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "36");
  svg.setAttribute("preserveaspectratio", "xMidYMid meet");
  svg.setAttribute("version", "1.1");
  svg.setAttribute("viewbox", "0 0 36 36");
  svg.setAttribute("width", "36");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M27.66,15.61,18,6,8.34,15.61A1,1,0,1,0,9.75,17L17,9.81V28.94a1,1,0,1,0,2,0V9.81L26.25,17a1,1,0,0,0,1.41-1.42Z",
  );

  svg.appendChild(path);
  anchor.appendChild(svg);
  anchor.appendChild(document.createTextNode(label));

  return anchor;
}

document.addEventListener("DOMContentLoaded", () => {
  generateNav();
  generateFooterNavigation();

  async function copyTextToClipboard(text) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error("Oops, unable to copy", err);
      }
    } else {
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.value = text;
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Oops, unable to copy", err);
      }
      document.body.removeChild(textarea);
    }
  }

  document.querySelector(".link-menu").addEventListener("click", (e) => {
    const nav = document.querySelector("#index nav");
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
      setTimeout(scrollToActiveNavItem, 200);
    }
  });

  document.querySelectorAll(".instructions").forEach((pre) => {
    const lines = pre.innerHTML.split("\n");
    const container = document.createElement("div");
    container.classList.add("instructions");
    lines.forEach((line) => {
      const preElement = document.createElement("pre");
      preElement.innerHTML = line;
      container.appendChild(preElement);
    });
    pre.replaceWith(container);
  });

  document.querySelectorAll(".instructions pre").forEach((i) => {
    i.setAttribute("tabindex", "0");
    i.setAttribute("title", "Click to copy");
    i.classList.add("clickable");
    i.addEventListener("click", () => {
      copyTextToClipboard(i.textContent.trim());
    });
  });

  document.querySelectorAll(".file-heading").forEach((heading) => {
    const next = heading.nextElementSibling;
    if (
      next.nodeName.toLowerCase() === "pre" &&
      next.classList.contains("file")
    ) {
      next.setAttribute("tabindex", 0);
      heading.setAttribute("title", "Click to copy");
      heading.classList.add("clickable");
      heading.addEventListener("click", () => {
        copyTextToClipboard(next.textContent.trim());
      });
    }
  });

  const labID = document.body.getAttribute("data-lab-id");
  document.querySelector(`#lab_${labID}_link a`).classList.add("active");

  scrollToActiveNavItem();
  scrollViewActiveNavItem();
});
