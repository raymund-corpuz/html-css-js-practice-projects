// const content = document.getElementById("content-area");
// const shoppingInput = document.getElementById("shopping-input");
// const shoppingForm = document.getElementById("shopping-form");

// shoppingForm.addEventListener("submit", addItemToShoppingList);

// function addItemToShoppingList(e) {
//   e.preventDefault();
//   const [input, category] = e.target;
//   const date = new Date(Date.now());
//   date.toString();

//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();

//   content.innerHTML += `<div class="item-section">
//     <div class="details">
//       <div class="date-details">
//       <h6>Date: ${month}/${day}/${year}</h6>
//       </div >
//       <div class="main-details">
//       <p>Item: ${input.value}</p>

//       <p>Category: ${category.value}</p></div>
//     </div>
//     <div class="details-btn">
//       <button class="edit-btn">✅ Complete</button>
//       <button class="delt-btn">❌ Delete</button>
//     </div> `;

//   input.value = "";
//   category.value = "";

//   // let dataObj = { Item: input.value, Category: category.value };
//   // data.push(dataObj);

//   // localStorage.setItem("Item", input.value);
//   // localStorage.setItem("Category", category.value);

//   // const myItem = localStorage.getItem("Item");
//   // const myCategory = localStorage.getItem("Category");

//   // console.log(myItem, myCategory);

//   // const savedMyItem = JSON.parse(localStorage.getItem("Item"));
//   // const savedMyCategory = JSON.parse(localStorage.getItem("Category"));
// }

// content.addEventListener("click", (e) => {
//   console.log(e);
//   if (e.target.classList.contains("delt-btn")) {
//     const itemSection = e.target.closest(".item-section");
//     if (itemSection) {
//       itemSection.remove();
//     }
//   }
// });

// content.addEventListener("click", (e) => {
//   if (e.target.classList.contains("edit-btn")) {
//     const itemSection = e.target.closest(".item-section");

//     if (itemSection) {
//       itemSection.classList.toggle("complete-task");
//     }
//   }
// });

const content = document.getElementById("content-area");
const shoppingInput = document.getElementById("shopping-input");
const shoppingForm = document.getElementById("shopping-form");

// Initialize shoppingList from localStorage or empty array
let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

// Render items when the page loads
renderShoppingList();

shoppingForm.addEventListener("submit", addItemToShoppingList);

function addItemToShoppingList(e) {
  e.preventDefault();

  const [input, category] = e.target;

  // ✅ Check if input or category is empty
  if (input.value.trim() === "" || category.value.trim() === "") {
    alert("Please enter both an item and a category.");
    return; // Stop the function if inputs are invalid
  }

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const itemData = {
    id: Date.now(), // unique id for each item
    item: input.value,
    category: category.value,
    date: `${month}/${day}/${year}`,
    completed: false,
  };

  shoppingList.push(itemData); // Add new item to list
  saveToLocalStorage(); // Save updated list
  renderShoppingList(); // Re-render list

  // Clear inputs
  input.value = "";
  category.value = "";
}

// Save array to localStorage
function saveToLocalStorage() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Render the shopping list from array
function renderShoppingList() {
  content.innerHTML = ""; // Clear current items

  shoppingList.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-section";
    if (item.completed) {
      itemDiv.classList.add("complete-task");
    }

    itemDiv.innerHTML = `
      <div class="details">
        <div class="date-details">
          <h6>Date: ${item.date}</h6>
        </div>
        <div class="main-details">
          <p>Item: ${item.item}</p>
          <p>Category: ${item.category}</p>
        </div>
      </div>
      <div class="details-btn">
        <button class="edit-btn" data-id="${item.id}">✅ Complete</button>
        <button class="delt-btn" data-id="${item.id}">❌ Delete</button>
      </div>
    `;
    content.appendChild(itemDiv);
  });
}

// Delete item
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("delt-btn")) {
    const id = Number(e.target.dataset.id);
    shoppingList = shoppingList.filter((item) => item.id !== id);
    saveToLocalStorage();
    renderShoppingList();
  }
});

// Toggle complete
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = Number(e.target.dataset.id);
    const item = shoppingList.find((item) => item.id === id);
    if (item) {
      item.completed = !item.completed;
      saveToLocalStorage();
      renderShoppingList();
    }
  }
});
