import * as React from "react"
import axios from "axios"
import { formatAmount, formatDate } from "../../utils/format"
import { useParams } from "react-router-dom"
import { API_BASE_URL } from "../../constants"
import "./TransactionDetail.css"

export default function TransactionDetail() {

  const [hasFetched, setHasFetched] = React.useState(null)
  const [transaction, setTransaction] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const transactionId = useParams()?.transactionId

  React.useEffect(() => {
    const fetchTransactionById = async () => {
      
      setIsLoading(true)
      setHasFetched(false)

      try {
        const transactionResponse = await axios.get(API_BASE_URL + "/bank/transactions/" + transactionId)
        if (transactionResponse?.data?.transaction) {
          console.log(transactionResponse.data.transaction)
          setTransaction(transactionResponse.data.transaction)
        }
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
        setHasFetched(true)
      }
    }
    fetchTransactionById();
  }, [transactionId])


  return (
    <div className="transaction-detail">
      <TransactionCard
        transaction={transaction}
        transactionId={transactionId}
        hasFetched={hasFetched}
        isLoading={isLoading} />
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null, hasFetched, isLoading }) {

  const isNotValidTransaction = (Object.keys(transaction).length === 0) && hasFetched && (!isLoading)

  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        {isNotValidTransaction ? <h1>Not Found</h1> : null}
        <p className="category">{transaction.category}</p>
      </div>

      <div className="card-content">
        <p className="description">{transaction.description}</p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  )
}
