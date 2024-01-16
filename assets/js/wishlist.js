const div=document.getElementById('products')

function getWishlist() {

    div.innerHTML=''
    let wishlist=JSON.parse(localStorage.getItem('wishlist'))||[]

    wishlist.map((item,index)=>{
        const box=document.createElement('div')
        box.className='boxDiv col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 '
        box.innerHTML=`
        <img src="${item.image}" alt="">
        <p class="title">${item.name}</p>
        <p class="title">${item.title}</p>
        <button onclick="remove(${index})">remove</button>
        
        `;
        div.appendChild(box);
    })  
}

function remove(index) {
    let wishlist=JSON.parse(localStorage.getItem('wishlist'))||[];
    wishlist.splice(index,1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    getWishlist()
}

window.onload = () => {
    getWishlist()
}
