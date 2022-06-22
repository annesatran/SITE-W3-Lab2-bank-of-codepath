import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionalDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"

export default function App() {

  const [isLoading, setIsLoading] = React.useState(false)
  const [transactions, setTransactions] = React.useState([])
  const [transfers, setTransfers] = React.useState([])
  const [error, setError] = React.useState(null)
  const [filterInputValue, setFilterInputValue] = React.useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <Home /> } />
            <Route path="/transactions/:transactionId" element={
              <TransactionalDetail /> } />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
