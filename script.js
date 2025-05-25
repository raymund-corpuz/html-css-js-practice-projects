const content = document.getElementById("content-area");
const shoppingInput = document.getElementById("shopping-input");
const shoppingForm = document.getElementById("shopping-form");

shoppingForm.addEventListener("submit", addItemToShoppingList);

function addItemToShoppingList(e) {
  e.preventDefault();
  const [input, category] = e.target;
  const date = new Date(Date.now());
  date.toString();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  content.innerHTML += `<div class="item-section">
    <div class="details">
      <div class="date-details">
      <h6>Date: ${month}/${day}/${year}</h6>
      </div >
      <div class="main-details">
      <p>Item: ${input.value}</p>
     
      <p>Category: ${category.value}</p></div>
    </div>
    <div class="details-btn">
      <button class="edit-btn">✅ Complete</button>
      <button class="delt-btn">❌ Delete</button>
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

content.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const itemSection = e.target.closest(".item-section");

    if (itemSection) {
      itemSection.classList.toggle("complete-task");
    }
  }
});
