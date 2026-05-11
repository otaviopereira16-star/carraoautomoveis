const carCards = document.querySelectorAll(".car-card");
const modal = document.querySelector("#carousel-modal");
const modalTitle = document.querySelector("#carousel-title");
const modalImage = document.querySelector("#carousel-image");
const modalCarName = document.querySelector("#carousel-car-name");
const modalCarDetails = document.querySelector("#carousel-car-details");
const modalCarPrice = document.querySelector("#carousel-car-price");
const closeButton = document.querySelector(".carousel-close");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const searchIcon = document.querySelector("#search-icon");
const searchInput = document.querySelector("#search-input");
const catalogSection = document.querySelector("#catalogo");
const loader = document.querySelector("#loader");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

let currentImages = [];
let currentIndex = 0;

function showImage() {
  modalImage.src = currentImages[currentIndex];
}

function openCarousel(card) {
  currentImages = card.dataset.images.split(",").map((image) => image.trim());
  currentIndex = 0;

  modalTitle.textContent = card.dataset.title;
  modalCarName.textContent = card.querySelector("h3").textContent;
  modalCarDetails.textContent = card.querySelector("p").textContent;
  modalCarPrice.textContent = card.querySelector(".prince").textContent;
  showImage();
  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeCarousel() {
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

carCards.forEach((card) => {
  card.addEventListener("click", () => {
    openCarousel(card);
  });

  const contactButton = card.querySelector(".btn");

  contactButton.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

prevButton.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1;
  showImage();
});

nextButton.addEventListener("click", () => {
  currentIndex = currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1;
  showImage();
});

closeButton.addEventListener("click", closeCarousel);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeCarousel();
  }
});

searchIcon.addEventListener("click", () => {
  navbar.classList.remove("active");
  searchInput.classList.add("active");
  searchInput.focus();
  catalogSection.scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase().trim();

  carCards.forEach((card) => {
    const carName = card.querySelector("h3").textContent.toLowerCase();
    const carTitle = card.dataset.title.toLowerCase();
    const foundCar = carName.includes(searchText) || carTitle.includes(searchText);

    card.classList.toggle("hide", !foundCar);
  });
});

searchInput.addEventListener("blur", () => {
  if (searchInput.value.trim() === "") {
    searchInput.classList.remove("active");
  }
});

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1000);
});

menuIcon.addEventListener("click", () => {
  searchInput.classList.remove("active");
  navbar.classList.toggle("active");
});

navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

document.addEventListener("click", (event) => {
  const clickedMenu = navbar.contains(event.target) || menuIcon.contains(event.target);
  const clickedSearch = searchInput.contains(event.target) || searchIcon.contains(event.target);

  if (!clickedMenu) {
    navbar.classList.remove("active");
  }

  if (!clickedSearch && searchInput.value.trim() === "") {
    searchInput.classList.remove("active");
  }
});
