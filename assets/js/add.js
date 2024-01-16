const form = document.getElementById('form')
const example = document.getElementById('example')
const examplepass = document.getElementById('examplepass')
const exampleadress = document.getElementById('exampleadress')


function axiosPost(e) {
    e.preventDefault();
    axios.post("https://655c30f2ab37729791aa0509.mockapi.io/products", {
        name: example.value,
        title: examplepass.value,
        price: exampleadress.value
    })
        .then(res => {
            console.log(res);
            form.reset()
        })
}
form.addEventListener("submit", axiosPost)


const div = document.getElementById('products')
const btn = document.getElementById('btn')


let page = 1
let limit = 4


async function getProduct() {
    const res = await axios.get(`https://655c30f2ab37729791aa0509.mockapi.io/products?page=${page}&limit=${limit}`);
    const data = res.data;
    db = data;


    db.map(item => {
        const box = document.createElement('div')
        box.className = 'boxDiv col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 '
        box.innerHTML = `
        <img src="${item.image}" alt="">
        <p class="title">${item.name}</p>
        <p class="title">${item.title}</p>
        <p class="title">${item.price}</p>
        <button onclick="removeItem(${item.id})">Remove</button>
        `;
        div.appendChild(box);
    })
    page++;
}
btn.addEventListener('click', getProduct)


function removeItem(id) {
    axios.delete(`https://655c30f2ab37729791aa0509.mockapi.io/products/${id}`);
    getProduct();

}


const inpload=document.getElementById('inpload')
const btnload=document.getElementById('btnload')

function getSearch() {
    div.innerHTML = ''
    axios.get(`https://655c30f2ab37729791aa0509.mockapi.io/products`)
        .then(res => {
            db=res.data
            const filterdata = db.filter(item=>item.name.toLowerCase().startsWith(inpload.value.toLowerCase()))
            filterdata.map(item=>{
            const box = document.createElement('div');
            box.className = 'boxDiv col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12'
            box.innerHTML = `
            <img src="${item.image}" alt="">
            <p class='title'>${item.name}</p>
            <p class='title'>${item.title}</p>
            <p class='title'>${item.price}$</p>
           
            `;
                div.appendChild(box);
            })
        })
}

btnload.addEventListener('click', getSearch)



getProduct();


