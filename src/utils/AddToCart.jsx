
export default function AddToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkProductExist = cart.findIndex((e) => e.id === product.id)

    if (checkProductExist !== -1) {
        cart[checkProductExist].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))

}
