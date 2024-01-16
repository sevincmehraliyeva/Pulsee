const div = document.getElementById('products')
const btn = document.getElementById('btn')


let page = 1
let limit = 4


async function getProduct() {
    const res = await axios.get(`https://655c30f2ab37729791aa0509.mockapi.io/basket?page=${page}&limit=${limit}`);
    const data = res.data;
    db = data;


    db.map(item => {
        const box = document.createElement('div')
        box.className = 'boxDiv col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 '
        box.innerHTML = `
        <img src="${item.image}" alt="">
        <p class="title">${item.name}</p>
        <p class="title">${item.title}</p>
        <button onclick="addToBasket(${item.id})">Add to basket</button>
        <button onclick="addTowishlist(${item.id})">Add to wishlist</button>

        `;
        div.appendChild(box);
    })
    page++;
}
btn.addEventListener('click', getProduct)



function addToBasket(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(db.find(item => item.id == id));
    localStorage.setItem('cart', JSON.stringify(cart));

}

function addTowishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push(db.find(item => item.id == id));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

const btnAZ = document.getElementById('btnAZ')

function sortAZ() {
    div.innerHTML = ''
    axios.get('https://655c30f2ab37729791aa0509.mockapi.io/products')
        .then(res => {
            db = res.data
            const sortData = db.sort((a, b) => a.title.localeCompare(b.title))
            console.log(sortData);
            sortData.map(item => {
                const box = document.createElement('div')
                box.className = 'boxDiv col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 '
                box.innerHTML = `
        <img src="${item.image}" alt="">
        <p class="title">${item.name}</p>
        <p class="title">${item.title}</p>
        <button onclick="addToBasket(${item.id})">Add to basket</button>
        <button onclick="addTowishlist(${item.id})">Add to wishlist</button>

        `;
                div.appendChild(box);
            })
        })

}
btnAZ.addEventListener('click', sortAZ)

const btnZA = document.getElementById('btnZA')

function sortZA() {
    div.innerHTML = ''

    axios.get('https://655c30f2ab37729791aa0509.mockapi.io/products')
        .then(res => {
            db = res.data
            const sortData = db.sort((a, b) => b.title.localeCompare(a.title))
            sortData.map(item => {
                const box = document.createElement('div')
                box.className = 'boxDiv col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 '
                box.innerHTML = `
        <img src="${item.image}" alt="">
        <p class="title">${item.name}</p>
        <p class="title">${item.title}</p>
        <button onclick="addToBasket(${item.id})">Add to basket</button>
        <button onclick="addTowishlist(${item.id})">Add to wishlist</button>

        `;
                div.appendChild(box);
            })
        })

}
btnZA.addEventListener('click', sortZA)


getProduct();