import SearchForm from "../../SearchForm";
import { Button } from "../../ui/button";

export default function CustomersButtonsAndSearch() {
  return (
    <div
      id='buttons-and-search'
      className='flex flex-col-reverse tablet:flex-row justify-center tablet:justify-between'
    >
      <div
        id='buttons'
        className='flex gap-2'
      >
        <Button
          id='new-change-order-button'
          className=''
          variant={"outline"}
        >
          New Customer
        </Button>
        <Button
          id='filter-button'
          className=''
          variant={"outline"}
        >
          Filter
        </Button>
        <Button
          id='sort-button'
          className=''
          variant={"outline"}
        >
          Sort
        </Button>
      </div>
      <SearchForm />
    </div>
  )
}
