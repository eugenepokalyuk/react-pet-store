import products from '../data/products.json';

export const getProductById = (productId: symbol) => {
    const productList: any = products;
    const filteregProduct: any = productList.filter((product: any) => product.id === productId);
    return filteregProduct;
}