import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

export const useSocket = () => {
    const socketRef = useRef(null);
    const [connected, setConnected] = useState(false);

    // SIDE-EFFECT
    useEffect(() => {
        // CREATE SOCKET CONNECTION
        socketRef.current = io(SOCKET_URL, {
            transports: ["websocket", "polling"]
        });

        // CONNECTION EVENT
        socketRef.current.on("connect", () => {
            setConnected(true);
            console.log("Connected to server", socketRef.current.id);
        });

        // DISCONNECTION EVENT
        socketRef.current.on("disconnect", () => {
            setConnected(false);
            console.log("Disconnected from server", socketRef.current.id);
        });

        // WELCOME MESSAGE
        socketRef.current.on("connected", (data) => {
            console.log("Server message: ", data.message)
        });

        // CLEANUP / UNMOUNT
        return() => {
            if(socketRef.current) {
                socketRef.current.disconnect();
            }
        }
    }, [])

    return {
        socket: socketRef.current,
        connected
    }
}