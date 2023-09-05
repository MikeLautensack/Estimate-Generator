import Button from "../../Button";
import SearchForm from "../../SearchForm";

export default function ChangeOrders() {
  return (
    <div>
      <div
        id='buttons-and-search'
        className=''
      >
        <div className=''>
          <Button
            id='new-change-order-button'
            className=''
          >
            New Change Order
          </Button>
          <Button
            id='filter-button'
            className=''
          >
            Filter
          </Button>
          <Button
            id='sort-button'
            className=''
          >
            Sort
          </Button>
        </div>
        <SearchForm />
      </div>
      <div
        id='change-order-list'
        className=''
      >

      </div>
      <div
        id='pagination-buttons'
        className=''
      >

      </div>
    </div>
  )
}
