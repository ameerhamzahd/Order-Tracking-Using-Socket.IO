// ORDER VALIDATION
export function validateOrder(data) {
    if (!data.customerName?.trim()) {
        return {
            valid: false,
            message: `Customer name is required.`
        }
    }

    if (!data.customerPhone?.trim()) {
        return {
            valid: false,
            message: `Customer phone is required.`
        }
    }

    if (!data.customerAddress?.trim()) {
        return {
            valid: false,
            message: `Customer address is required.`
        }
    }

    if (!Array.isArray(data.items)) {
        return {
            valid: false,
            message: `Order must have at least one item.`
        }
    }

    return {
        valid: true
    }
}

// ORDER ID GENERATOR -> FORMAT: ORD-20260321-001
export function generateOrderId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const orderId = Math.floor(Math.random() * 1000).toString().padStart(3, "0");

    return `ORD-${year}${month}${day}-${orderId}`
}

export function calculateTotal(items) {
    const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subTotal * 0.10;
    const deliveryFee = 35.00;
    const total = subTotal + tax + deliveryFee;

    return {
        subTotal: Math.round(subTotal * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        deliveryFee,
        totalAmount: Math.round(total * 100) / 100
    }
}

export function createOrder(orderData, orderId, totals) {
    return {
        orderId,
        customerName: orderData.customerName.trim(),
        customerPhone: orderData.customerPhone.trim(),
        customerAddress: orderData.customerAddress.trim(),
        items: orderData.items,
        subtotal: totals.subtotal,
        tax: totals.tax,
        deliveryFee: totals.deliveryFee,
        totalAmount: totals.totalAmount,
        specialNotes: orderData.specialNotes || '',
        paymentMethod: orderData.paymentMethod || 'cash',
        paymentStatus: 'pending',
        status: 'pending',
        statusHistory: [{
            status: 'pending',
            timestamp: new Date(),
            by: 'customer',
            note: 'Order placed'
        }],
        estimatedTime: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}