import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {

  function handleOnFormFieldChange(evt) {
    props.setForm({...props.form, [evt.target.name]: evt.target.value})
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        handleOnFormFieldChange={handleOnFormFieldChange}
        handleOnSubmit={props.handleOnSubmit}
        form={props.form}
        isCreating={props.isCreating}/>
    </div>
  )
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" placeholder="Enter a description..." type="string" onChange={props.handleOnFormFieldChange} value={props.form?.description} />
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" placeholder="Enter a category..." type="string" onChange={props.handleOnFormFieldChange} value={props.form?.category} />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount" type="number" onChange={props.handleOnFormFieldChange} value={props.form?.amount} />
        </div>

        <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
