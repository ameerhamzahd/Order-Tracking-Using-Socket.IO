export const orderHandler = (io, socket) => {
    console.log("A user connected", socket.id);

    // EMIT -> TRIGGER -> ON -> LISTEN

    socket.on("placeOrder", async(data, callback) => {
        try {
            console.log(`Placed order from ${socket.id}`);

            const validation = validateOrder(data);
        } catch (error) {
            console.log(error);
        }
    })
};