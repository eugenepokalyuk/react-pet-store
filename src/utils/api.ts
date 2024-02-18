import products from '../data/products.json';

export const getProductById = (productId: symbol) => {
    const filteregProduct: string[] = products.filter((product: any) => product.id === productId);
    return filteregProduct;
}