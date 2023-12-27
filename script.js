const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter")

function displayItems () {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDom(item))
    checkUI();
}

function onAddItemSubmit(e){
e.preventDefault();

const newItem = itemInput.value;
// validate input
if (newItem === " "){
    alert("please add an item");
    return;
}
// create  list item
addItemToDom(newItem);

//add itme to local storage
addItemToStorage(newItem);

checkUI();

itemInput.value= "";
}
function addItemToDom(item){
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    
    const button = createButton ("remove-item btn-link text-red");
    li.appendChild(button);
    itemList.appendChild(li);
}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage //use of dry dont, repeat yourself

    if (localStorage.getItem("items")=== null){
        itemsFromStorage = [];
    }else {
        itemsFromStorage =JSON.parse(localStorage.getItem("items"));
    }
//Add new item to array
itemsFromStorage.push(item);

// convert to json string and set it to local storage
localStorage.setItem("items", JSON.stringify(itemsFromStorage));

}
function createButton(classes){
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}
function createIcon(classes){
    const icon = document.createElement("i");
    icon.className =classes;
    return icon;
}
function onClickItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")){
        removeItem(e.target.parentElement.parentElement);
        }
}

function removeItem(item){
   if (confirm("Are you sure")){
   //remove item from DOM
    item.remove();
    //Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();

   }
    
 //note that you would only delete the button if it is not speficified 
}
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();// using const will create  a error
// filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
// re-set to localstorage
localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
  
    if (localStorage.getItem('items') === null) {
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
  
    return itemsFromStorage;
  }
function clearItems(){
    // or  itemList.innerHTML = " ";
    while (itemList.firstChild) {
         itemList.removeChild(itemList.firstChild);
    }
   
    checkUI();
}
function filterItems (e){
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();

   // console.log(text); was checking to see if the filter item works in the console log 
   items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
console.log(itemName)
if (itemName.indexOf(text) != -1){
    item.style.display= "flex";
}else{
    item.style.display = "none";
}
   });// we will loop thru the item because it is a  node list but html collect would have to be turned into an array
}

function checkUI(){
const items = itemList.querySelectorAll("li");
//console.log(items);
if (items.length === 0){
clearBtn.style.display = "none";
itemFilter.style.display = "none";
} else{
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
}
}
function init(){
    //Event Listeners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems)
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
}
init();





