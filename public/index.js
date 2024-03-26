const socket = io()

socket.on('products', (products) => {
    // Actualizar la lista de productos en la interfaz
    const productList = document.getElementById('product-list')
    productList.innerHTML = ''
    products.forEach(product => {
        const li = document.createElement('li')
        li.textContent = product.name
        productList.appendChild(li)
    })
})