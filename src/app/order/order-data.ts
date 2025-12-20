export interface OrderData {
    id: number;
    userId: number;
    createdAt: string;
    status: string;
    total: number;
    items: OrderItem[];
}

export interface OrderItem {
    id: number;
    orderId: number;
    name: string;
    menuItemId: number;
    quantity: number;
    price: number;
    menuItem?: menuItem;
}

export interface menuItem {
    id: number;
    name: string;
}

export interface OrderRequest {
    items: {
        menuItemId: number;
        name: string;
        quantity: number;
    }[];
}

export const sharedOrder: OrderItem[] = [];