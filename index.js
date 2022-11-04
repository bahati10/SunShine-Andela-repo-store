const form = document.querySelector(".inventory-form");
const grid = document.querySelector(".grid");


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});




const all_items = JSON.parse(localStorage.getItem("items"));

all_items?.map((item) => {
    grid.innerHTML += `
        <div class="card">
            <img class="card-img" src=${item.image} alt="">
            <div class="card-content">
                <h1 class="card-header">${item.title}</h1>
                <p> <b>Date added:<b> ${item.date}<br><br>
                ${item.description}<br><br>
                ${item.price} RWF each<br>
                ${item.quantity} Pieces
                 
                </p>
                <button class="buy-item">
                    Buy
                </button>

            </div>
        </div>
    </div>`
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
   const price = e.target.price.value;
   const title = e.target.title.value;
   const category = e.target.category.value;
const date = e.target.date.value;
const quantity = e.target.quantity.value;
const description = e.target.description.value;
console.log(e.target.image.files[0])
const image = await toBase64(e.target.image.files[0]) ;
console.log(image);

const data = {
    title, price, category, date, description, image, quantity
}
const items = localStorage.getItem("items");

if(items){
    const _items = JSON.parse(items);
    localStorage.setItem("items",JSON.stringify([..._items, data]));
    window.location.reload()
}

if(!items){
    localStorage.setItem("items", JSON.stringify([data]));
    window.location.reload();

}




})