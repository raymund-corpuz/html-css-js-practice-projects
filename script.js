const content = document.getElementById("content-area");
const shoppingInput = document.getElementById("shopping-input");
const shoppingForm = document.getElementById("shopping-form");

shoppingForm.addEventListener("submit", addItemToShoppingList);

function addItemToShoppingList(e) {
  e.preventDefault();
  const [input, category] = e.target;
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const time = hour >= 12 ? "pm" : "am";

  content.innerHTML += `<div class="item-section">
    <div class="details">
      <p>Date: ${hour}:${minutes} ${time}</p>
      <p>Item: ${input.value}</p>
      <span class="category-details">Category: ${category.value}</span>
    </div>
    <div class="details-btn">
      <button class="edit-btn">Edit</button>
      <button class="delt-btn">Delete</button>
    </div> `;
  input.value = "";
  category.value = "";
}

content.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.classList.contains("delt-btn")) {
    const itemSection = e.target.closest(".item-section");
    if (itemSection) {
      itemSection.remove();
    }
  }
});

function deleteItemFromShoppingList() {}
