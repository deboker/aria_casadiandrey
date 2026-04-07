const siteData = window.ariaSiteData;

const heroName = document.getElementById("hero-name");
const heroSubtitle = document.getElementById("hero-subtitle");
const heroIntro = document.getElementById("hero-intro");
const heroBirthDate = document.getElementById("hero-birth-date");
const heroAge = document.getElementById("hero-age");
const heroBreed = document.getElementById("hero-breed");
const heroVisual = document.getElementById("hero-visual");

const puppyGallery = document.getElementById("puppy-gallery");
const currentGallery = document.getElementById("current-gallery");
const videoGallery = document.getElementById("video-gallery");
const pedigreeDocuments = document.getElementById("pedigree-documents");
const healthDocuments = document.getElementById("health-documents");
const resultsList = document.getElementById("results-list");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

const birthDate = new Date(siteData.hero.birthDate);

heroName.textContent = siteData.hero.name;
heroSubtitle.textContent = siteData.hero.subtitle;
heroIntro.textContent = siteData.hero.intro;
heroBirthDate.textContent = formatDate(birthDate);
heroAge.textContent = formatAge(birthDate);
heroBreed.textContent = siteData.hero.breed;
renderHeroVisual(siteData.hero.panelImage);

renderImageCards(puppyGallery, siteData.puppyGallery);
renderImageCards(currentGallery, siteData.currentGallery);
renderVideoCards(videoGallery, siteData.videos);
renderDocumentCards(pedigreeDocuments, siteData.pedigreeDocuments);
renderDocumentCards(healthDocuments, siteData.healthDocuments);
renderResults(resultsList, siteData.results);

if (lightbox && typeof lightbox.showModal === "function") {
  lightboxClose.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    const dialogRect = lightbox.getBoundingClientRect();
    const clickedOutside =
      event.clientY < dialogRect.top ||
      event.clientY > dialogRect.bottom ||
      event.clientX < dialogRect.left ||
      event.clientX > dialogRect.right;

    if (clickedOutside) {
      lightbox.close();
    }
  });
}

function renderImageCards(target, items) {
  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "media-card";

    const visual = item.src
      ? `
        <button class="media-button" type="button" data-image="${item.src}" data-caption="${item.title}">
          <img src="${item.src}" alt="${item.alt || item.title}" loading="lazy" />
        </button>
      `
      : `
        <div class="media-placeholder">
          <div class="placeholder-stack">
            <strong>${item.title}</strong>
            <span>Add image to ${item.hint}</span>
          </div>
        </div>
      `;

    article.innerHTML = `
      ${visual}
      <div class="card-body">
        <h3>${item.title}</h3>
        <p class="media-description">${item.description}</p>
      </div>
    `;

    target.appendChild(article);
  });

  target.querySelectorAll("[data-image]").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button.dataset.image, button.dataset.caption));
  });
}

function renderVideoCards(target, items) {
  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "video-card";

    const visual = item.src
      ? `
        <video controls preload="metadata"${item.poster ? ` poster="${item.poster}"` : ""}>
          <source src="${item.src}" />
          Your browser does not support video playback.
        </video>
      `
      : `
        <div class="video-placeholder">
          <div class="placeholder-stack">
            <div class="video-play">▶</div>
            <strong>${item.title}</strong>
            <span>Add video to ${item.hint}</span>
          </div>
        </div>
      `;

    article.innerHTML = `
      ${visual}
      <div class="card-body">
        <h3>${item.title}</h3>
        <p class="media-description">${item.description}</p>
      </div>
    `;

    target.appendChild(article);
  });
}

function renderDocumentCards(target, items) {
  items.forEach((item) => {
    const isLink = Boolean(item.file);
    const element = document.createElement(isLink ? "a" : "article");
    element.className = `doc-card${isLink ? " is-link" : ""}`;

    if (isLink) {
      element.href = item.file;
      element.target = "_blank";
      element.rel = "noreferrer";
      element.setAttribute("aria-label", `${item.title} - open document`);
    }

    element.innerHTML = `
      <div class="doc-visual">
        <div class="doc-tag">${item.type}</div>
      </div>
      <div class="doc-body">
        <h3>${item.title}</h3>
        <p class="doc-description">${item.description}</p>
        <span class="doc-type">${isLink ? "Open document" : `Add file to ${item.hint}`}</span>
      </div>
    `;

    target.appendChild(element);
  });
}

function renderResults(target, items) {
  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "result-card";

    const resultVisual = item.image?.src
      ? `
        <button
          class="result-visual result-visual-button"
          type="button"
          data-image="${item.image.src}"
          data-caption="${item.event}"
        >
          <img src="${item.image.src}" alt="${item.image.alt || item.event}" loading="lazy" />
        </button>
      `
      : `
        <div class="result-visual result-visual-placeholder">
          <div class="placeholder-stack">
            <strong>${item.event}</strong>
            <span>Add document image to ${item.image?.hint || "media/docs/show-results/"}</span>
          </div>
        </div>
      `;

    article.innerHTML = `
      ${resultVisual}
      <div class="result-body">
        <span class="result-meta">${item.date || "Add date"}</span>
        <h3>${item.event}</h3>
        <div class="result-details">
          <span><strong>Class:</strong> ${item.className}</span>
          <span><strong>Judge:</strong> ${item.judge}</span>
          <span><strong>Result:</strong> ${item.placement}</span>
        </div>
      </div>
    `;

    target.appendChild(article);
  });

  target.querySelectorAll(".result-visual-button").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button.dataset.image, button.dataset.caption));
  });
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function formatAge(date) {
  const today = new Date();
  let years = today.getFullYear() - date.getFullYear();
  let months = today.getMonth() - date.getMonth();

  if (today.getDate() < date.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years <= 0) {
    return `${months} ${pluralize(months, "month", "months")}`;
  }

  if (months === 0) {
    return `${years} ${pluralize(years, "year", "years")}`;
  }

  return `${years} ${pluralize(years, "year", "years")} ${months} ${pluralize(months, "month", "months")}`;
}

function pluralize(value, singular, plural) {
  return value === 1 ? singular : plural;
}

function renderHeroVisual(image) {
  if (!heroVisual) {
    return;
  }

  if (image?.src) {
    heroVisual.className = "hero-visual has-image";
    heroVisual.innerHTML = `
      <img src="${image.src}" alt="${image.alt || `${siteData.hero.name} hero image`}" loading="eager" />
      ${image.date ? `<span class="hero-image-date">${image.date}</span>` : ""}
    `;
    return;
  }

  heroVisual.className = "hero-visual is-crest";
  heroVisual.innerHTML = '<div class="crest">A</div>';
}

function openLightbox(src, caption) {
  if (!lightbox || typeof lightbox.showModal !== "function") {
    return;
  }

  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.showModal();
}
