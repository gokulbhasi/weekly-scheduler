import React from "react"
import AppRoute from "./routes/AppRoute"
import { Provider } from "react-redux"
import store from "./store/store"

function App() {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  )
}

export default App
