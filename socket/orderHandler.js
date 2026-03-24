import { getCollection } from "../config/database.js";
import { calculateTotal, createOrder, generateOrderId } from "../utils/helper.js";

export const orderHandler = (io, socket) => {
    console.log("A user connected", socket.id);

    // EMIT -> TRIGGER -> ON -> LISTEN

    // PLACE ORDER
    socket.on("placeOrder", async (data, callback) => {
        try {
            console.log(`Placed order from ${socket.id}`);

            const validation = validateOrder(data);

            if (!validation.valid) {
                callback({
                    success: false,
                    message: validation.message
                });
            }

            const totals = calculateTotal(data.items);
            const orderId = generateOrderId();
            const order = createOrder(data, orderId, totals);

            const ordersCollection = getCollection("orders");
            await ordersCollection.insertOne(order);

            socket.join(`order-${orderId}`);
            socket.join(`customers`);

            io.to("admins").emit("newOrder", {
                order
            });

            callback({
                success: true,
                order
            });
            console.log(`Order created: ${orderId}`)
        } catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Failed to place order..."
            })
        }
    });

    // TRACK ORDER
    socket.on("trackOrder", async (data, callback) => {
        try {
            const ordersCollection = getCollection("orders");
            const order = await ordersCollection.findOne({
                orderId: data, orderId
            });

            if (!order) {
                return callback({
                    success: false,
                    message: "Order not found"
                });
            }

            socket.join(`order-${data.orderId}`);
            callback({
                success: true,
                order
            });
        } catch (error) {
            console.error("Order tracking error", error);
            callback({
                success: false,
                message: error.message
            });
        }
    })
};