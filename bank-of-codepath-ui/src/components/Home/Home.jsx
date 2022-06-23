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

  async function handleOnCreateTransaction() {
    props.setIsCreating(true)
    
    axios.post(API_BASE_URL + "/bank/transactions", {transaction: props.newTransactionForm})
      .then((res) => {
        props.setTransactions(pastTransactions => [...pastTransactions, res.data.transaction])
      })
      .catch((error) => {
        props.setError(error)
        setIsCreating(false)
      })
      .finally(() => {
        props.setNewTransactionForm({category: "", description: "", amount: 0})
        props.setIsCreating(false)
      })
  }

  return (
    <div className="home">
      {props.error ? <h2 className="error">Error message</h2> : null}
      <AddTransaction
        isCreating={props.isCreating}
        setIsCreating={props.setIsCreating}
        form={props.newTransactionForm}
        setForm={props.setNewTransactionForm}
        handleOnSubmit={handleOnCreateTransaction}/>
      {props.isLoading
        ? <h1>Loading...</h1>
        : <BankActivity
          transactions={filteredTransactions}
          transfers={props.transfers} /> }
    </div>
  )
}
