const server = {
  url:            'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
  //url:            'http://localhost:8080',
  method:         'GET'
};

const query = {
    catalog:      'catalogData.json',
    basket: {
      get:        'getBasket.json',
      add:        'addToBasket.json',
      remove:     'deleteFromBasket.json'
    }
  };
