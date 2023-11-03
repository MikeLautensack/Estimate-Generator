import ChangeOrderButtonsAndSearch from "./ChangeOrderButtonsAndSearch"
import ChangeOrdersTable from "../../tables/changeOrderTable/ChangeOrdersTable"
import ChangeOrdersPagination from "../../tables/changeOrderTable/ChangeOrdersPagination"
import { columns } from '../../tables/changeOrderTable/columns'
import { CHANGEORDERS } from '../../../utils/content'

export default function ChangeOrders() {
  return (
    <div>
      <ChangeOrdersTable columns={columns} data={CHANGEORDERS} />
    </div>
  )
}
