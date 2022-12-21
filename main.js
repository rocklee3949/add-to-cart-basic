const products = [
    {
        id: 0,
        image: 'images/img1.jpg',
        title: 'Cellphone',
        price: 120,
        count: 1,
    },
    {
        id: 1,
        image: 'images/img2.jpg',
        title: 'Tablet',
        price: 100,
        count: 1,
    },
    {
        id: 2,
        image: 'images/img3.jpg',
        title: 'Headphone',
        price: 70,
        count: 1,
    },
    {
        id: 3,
        image: 'images/img4.jpg',
        title: 'Laptop',
        price: 180,
        count: 1,
    },
]
document.querySelector('.root').innerHTML = products.map(product => {
    var { id, image, title, price } = product
    return (
        `
        <div class="box">
            <img src="${image}">
            <p class="title">${title}</p>
            <h2 class="price">$ ${price}.00</h2>
            <button onclick = 'addCart(${id})'>Add to cart</button>
        </div>
        `
    )
}).join('')

const cart = []
const displayCart = () => {
    let totalProducts = cart.reduce((count, product) => count + product.count, 0)
    document.querySelector('.count-product').innerHTML = totalProducts
    let totalPriceProducts = cart.reduce((count, product) => count + product.count * product.price, 0)
    document.querySelector('.total').innerHTML = `Total: <span>$ ${totalPriceProducts}.00</span>`
    if (cart.length == 0) {
        document.querySelector('.cartItem').innerHTML = `<p class = 'empty-cart'>Your cart is empty</p>`
    }
    else {
        document.querySelector('.cartItem').innerHTML = cart.map(product => {
            var { id, image, title, price, count } = product
            let totalPrice = count * price
            return (
                `
                <div class="cart-item">
                    <img src="${image}">
                    <p class="title">${title} <span>(${count})</span></p>
                    <h2 class="price">$ ${totalPrice}.00</h2>
                    <i onclick = 'delProduct(id)' class="fa-solid fa-trash"></i>
                </div>
                `
            )
        }).join('')
    }
}
displayCart()
const addCart = (id) => {
    let idProducts = cart.map(product => product.id)
    if (idProducts.includes(id)) {
        for (let product of cart) {
            if (product.id == id) {
                product.count += 1
            }
        }
    }
    else {
        let indexProduct = products.findIndex(product => product.id == id)
        cart.push(products[indexProduct])
    }
    displayCart()
}
const delProduct = (id) => {
    let indexProduct = cart.findIndex(product => product.id == id)
    cart.splice(indexProduct, 1)
    displayCart()
}