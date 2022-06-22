import * as React from "react"
import axios from "axios"
import { API_BASE_URL } from "../../constants"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home(props) {

  React.useEffect(() => {
    const getData = async () => {
    
      props.setIsLoading(true)
      try {
        const transactionsResponse = await axios.get(API_BASE_URL + "/bank/transactions")
        console.log("transactions response", transactionsResponse.data.transactions)
        if (transactionsResponse?.data?.transactions) {
          props.setTransactions(transactionsResponse.data.transactions)
        }
        const transfersResponse = await axios.get(API_BASE_URL + "/bank/transfers")
        if (transfersResponse?.data?.transactions) {
          props.setTransfers(transfersResponse.data.transfers)
        }
      } catch (err) {
        props.setError(err)
      } finally {
        props.setIsLoading(false)
      }
    }
    getData();
  }, []);

  const filteredTransactions = (props.filterInputValue
    ? props.transactions?.filter(transaction => {
        return transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase())})
    : props.transactions)
  
  console.log("filter input val", props.filterInputValue)
  console.log(filteredTransactions)

  return (
    <div className="home">
      {props.isLoading
        ? <h1>Loading...</h1>
        : <BankActivity
          transactions={filteredTransactions}/>}
      {props.error ? <h2 className="error">Error message</h2> : null}
      <AddTransaction />
    </div>
  )
}
