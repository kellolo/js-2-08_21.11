const server = {
  port: 3030,
  url:  'http://localhost'
}

const query = {
  catalog:      '/catalog',
  basket: {
    get:        '/basket',
    add:        '/addToBasket',
    remove:     '/removeFromBasket'
  }
}

export {server, query}