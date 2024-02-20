export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    additionalImages?: string[]
}