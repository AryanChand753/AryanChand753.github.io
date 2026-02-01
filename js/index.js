// * ARYAN CHAND




"use strict";


document.addEventListener("DOMContentLoaded", () => {
  const iam = document.getElementById("title-data")
  const clickyTitle = document.getElementById("clicky-title")
  const arrowsPrompt = document.getElementById("arrows-prompt")
  const headerContactButton = document.getElementById("contact-button")
  const headerResumeButton = document.getElementById("resume-button")
  const cntEmail = document.getElementById("email")
  const cntLinkedIn = document.getElementById("linkedin")
  const cntGitHub = document.getElementById("github")
  const cntCodeberg = document.getElementById("codeberg")
  const cntInstagram = document.getElementById("instagram")
  const projectsButton = document.getElementById("projects-button")
  const hobbiesButton = document.getElementById("hobbies-button")
  const contactModal = document.getElementById("contact-modal")
  const modalClose = document.getElementById("modal-close")
  const cardAudio = new Audio('../public/pageturn.mp3')

  cardAudio.volume = .25;

  const titlesList = [
    "A Computer Engineer",
    "An Aerospace Enthusiast",
    "A Racer",
    "An E-Sports Athelete",
    "A Web Designer",
    "A Musician"
  ];

  let current = 0;

  function init() {
    if (iam) {
      iam.textContent = titlesList[0]
      iam.dataset.name = 0;
    }
    attachHanders();
    initLiveRegion();
  }

  const safeAdd = (element, event, func) => {
    if (element) element.addEventListener(event, func)
  }

  function attachHanders() {
    safeAdd(clickyTitle, "click", next);
    safeAdd(clickyTitle, "keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      }
    })
    safeAdd(clickyTitle, "mouseover", () => {
      arrowsPrompt.textContent = "";
      if (iam) iam.style.textDecoration = "none";
      if (projectsButton) projectsButton.style.display = "none"; // TODO: IMPLEMENT projects on hover and click
    })

    safeAdd(headerContactButton, "click", openContact);
    safeAdd(headerResumeButton, "click", openResume);

    safeAdd(projectsButton, "click", openProjects);
    safeAdd(hobbiesButton, "click", openHobbies);

    addHoverAndKeyboard(cntEmail, "var(--gmail-red)");
    addHoverAndKeyboard(cntLinkedIn, "var(--linkedin-blue)");
    addHoverAndKeyboard(cntGitHub, "var(--github-gray-6)");
    addHoverAndKeyboard(cntCodeberg, "var(--codeberg-blue)");
    addHoverAndKeyboard(cntInstagram, "var(--instagram-pink)");

    const contactLinks = document.getElementById("contact-links");
    if (contactLinks) {
      contactLinks.addEventListener("click", () => {
        const li = e.target.closest("li.contact-link-list")
        if (!li) return;
        if (li.dataset.email) openEmail(li.dataset.email);
        else if (li.dataset.url) openUrl(li.dataset.url);
        closeContact();
      })
    }

    safeAdd(contactModal, "click", (e) => {
      if (e.target === contactModal) hideModal(contactModal);
    })

    safeAdd(modalClose, "click", () => {hideModal(contactModal)})
  }

  function addHoverAndKeyboard(element, color) {
    if (!element) return;
    element.addEventListener("mouseover", () => (element.style.borderColor = color))
    element.addEventListener("mouseleave", () => {element.style.borderColor = "transparent"})
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        element.click();
      }
    })
  }

  function next() {
    cardAudio.play();
    current = (current + 1) % titlesList.length;
    iam.textContent = titlesList[current];
    iam.dataset.name = current;
    announce(iam?.textContent || titlesList[current])
  }

  function showModal(modal) {
    if (!modal) return;
    modal.classList.add("show");
    modal._previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";

    const focusable = modal.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])')
    if (focusable.length) focusable[0].focus()
    document.addEventListener("keydown", handleKeyDown);
  }

  function hideModal(modal) {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeyDown);
    if (modal._previouslyFocused) modal._previouslyFocused.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      if (contactModal && contactModal.classList.contains("show"))
        hideModal(contactModal);
    }

    if (e.key === "Tab") {
      const modal = document.querySelector(".modal.show");
      if (!modal) return;
      const focusable = Array.from(
        modal.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openContact() {
    showModal(contactModal);
  }
  function closeContact() {
    hideModal(contactModal);
  }

  function openResume() {
    window.open("./public/resume.pdf", "_blank", "noopener,noreferrer");
  }

  function openProjects() {
    const anchor = document.querySelector("#projects");
    if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
    else showTemporaryOverlay("Projects coming soon");
  }
  function openHobbies() {
    const anchor = document.querySelector("#hobbies");
    if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
    else showTemporaryOverlay("Hobbies coming soon");
  }

  function showTemporaryOverlay(text = "", ms = 1400) {
    const overlay = document.createElement("div");
    overlay.className = "temporary-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "50%";
    overlay.style.top = "10%";
    overlay.style.transform = "translateX(-50%)";
    overlay.style.background = "rgba(0,0,0,0.7)";
    overlay.style.color = "white";
    overlay.style.padding = "10px 16px";
    overlay.style.borderRadius = "8px";
    overlay.style.zIndex = "12000";
    overlay.style.fontWeight = "600";
    overlay.textContent = text;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), ms);
  }

  function openURL(url) {
    const normalized =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    window.open(normalized, "_blank", "noopener,noreferrer");
  }

  function openEmail(email, subject = "", body = "") {
    const params = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    const query = params.length ? `?${params.join("&")}` : "";
    window.location.href = `mailto:${encodeURIComponent(email)}${query}`;
  }

  let liveRegion = null;
  function initLiveRegion() {
    liveRegion = document.createElement("div");
    liveRegion.className = "hidden";
    document.body.appendChild(liveRegion);

    announce(iam?.textContent || titleList[0]);

    if (iam) {
      const observer = new MutationObserver(() => announce(iam.textContent));
      observer.observe(iam, {
        childList: true,
        characterData: true,
        subtree: true,
      });
      window.addEventListener("beforeunload", () => observer.disconnect());
    }
  }

  function announce(text) {
    if (!liveRegion) return;
    liveRegion.textContent = text;
  }

  window.openURL = openURL;
  window.openEmail = openEmail;
  window.openContact = openContact;
  window.closeContact = closeContact;
  window.nextTitle = next;

  const INACTIVITY_MS = 7000;
  let inactivityTimer = null;

  function startInactivityTimer() {
    stopInactivityTimer();
    if (contactModal && contactModal.classList.contains("show")) return;
    inactivityTimer = setTimeout(() => {
      if (document.visibilityState === "visible") {
        next();
      }
      startInactivityTimer();
    }, INACTIVITY_MS);
  }

  function stopInactivityTimer() {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  }

  function resetInactivityTimer() {
    startInactivityTimer();
  }

  startInactivityTimer();

  document.addEventListener("click", () => {
    resetInactivityTimer();
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key.length === 1 ||
      [
        "Enter",
        " ",
        "Escape",
        "Tab",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.key)
    ) {
      resetInactivityTimer();
    }
  });

  const observerForModal = new MutationObserver(() => {
    if (!contactModal) return;
    if (contactModal.classList.contains("show")) {
      stopInactivityTimer();
    } else {
      startInactivityTimer();
    }
  });
  if (contactModal) {
    observerForModal.observe(contactModal, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("beforeunload", () =>
      observerForModal.disconnect(),
    );
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") stopInactivityTimer();
    else startInactivityTimer();
  });
  init();
})