export interface Order {
    items: [];
    status: string;
    payment: string;
    user: {
        userId: string;
        name: string;
    };
    billingAddress: string;
    shippingAddress: string;
    review: string;
}
