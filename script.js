const products = [
  { id: 1, name: "Chicken & Rice Dog Food", category: "Dogs",       price: 899 },
  { id: 2, name: "Rope Tug Toy",            category: "Dogs",       price: 249 },
  { id: 3, name: "Adjustable Dog Leash",    category: "Dogs",       price: 399 },
  { id: 4, name: "Salmon Cat Food",         category: "Cats",       price: 749 },
  { id: 5, name: "Cat Scratching Post",     category: "Cats",       price: 1299 },
  { id: 6, name: "Clumping Cat Litter",     category: "Cats",       price: 499 },
  { id: 7, name: "Hamster Exercise Wheel",  category: "Small Pets", price: 449 },
  { id: 8, name: "Timothy Hay for Rabbits", category: "Small Pets", price: 329 }
];

const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const contactForm = document.getElementById("contactForm");

function formatPrice(value) {
  return "₱" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function createCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const thumb = document.createElement("div");
  thumb.className = "thumb";
  thumb.dataset.category = product.category;
  thumb.setAttribute("aria-hidden", "true");
  thumb.textContent = product.name.charAt(0);

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = product.category;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = formatPrice(product.price);

  card.append(thumb, tag, title, price);
  return card;
}

function displayProducts(list) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    const message = document.createElement("p");
    message.className = "empty";
    message.textContent = "No products found in this category.";
    productGrid.appendChild(message);
    return;
  }

  list.forEach(function (product) {
    productGrid.appendChild(createCard(product));
  });
}

function filterProducts(category) {
  const filtered = category === "all"
    ? products
    : products.filter(function (product) { return product.category === category; });
  displayProducts(filtered);
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (other) {
      other.classList.remove("active");
      other.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    filterProducts(button.dataset.category);
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const errors = [];

  if (name.length < 3) {
    errors.push("Name must be at least 3 characters.");
  }
  if (!email.includes("@") || !email.includes(".")) {
    errors.push("Email must contain \"@\" and \".\".");
  }
  if (message.length < 10) {
    errors.push("Message must be at least 10 characters.");
  }

  if (errors.length > 0) {
    alert("Please fix the following:\n\n- " + errors.join("\n- "));
    return;
  }

  alert("Thank you, " + name + "! Your message was sent to PetLo.");
  contactForm.reset();
});

displayProducts(products);
