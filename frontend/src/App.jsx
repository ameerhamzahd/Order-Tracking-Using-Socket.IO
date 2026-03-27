import { useSocket } from "./hooks/useSocket"

function App() {
  const { socket, connected } = useSocket();

  return (
    <div>
      {`this is socket.io-client testing ${connected}`}
      {/* <h1>{socket.id}</h1> */}
    </div>
  )
}

export default App
