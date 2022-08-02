// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // category:
  categoriesUrl: 'http://localhost:3001/api/categories/',

  // products:
  productsUrl: 'http://localhost:3001/api/products/',
  productsByCategoryUrl: 'http://localhost:3001/api/products-by-category/',
  productsImageUrl: 'http://localhost:3001/api/products/images/',

  // auth:
  registerStepOneUrl: 'http://localhost:3001/api/auth/register/1/',
  registerStepTwoUrl: 'http://localhost:3001/api/auth/register/2',
  loginUrl: 'http://localhost:3001/api/auth/login/',


  // cart:
  cartByUserUrl: 'http://localhost:3001/api/cart/',
  cartProductsUrl: 'http://localhost:3001/api/cart/products/',
  updateCartProductUrl: 'http://localhost:3001/api/cart-product/',
  cartAmount: 'http://localhost:3001/api/cart/perUser/',

  // order:
  ordersUrl: 'http://localhost:3001/api/orders/',


};
