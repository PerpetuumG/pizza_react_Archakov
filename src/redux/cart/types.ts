export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

// interface - работает только с объектами
export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}