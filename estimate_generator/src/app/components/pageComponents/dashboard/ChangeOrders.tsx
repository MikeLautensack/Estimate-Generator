import ChangeOrderButtonsAndSearch from "./ChangeOrderButtonsAndSearch"
import ChangeOrdersTable from "../../tables/shadcn_ui_tables/changeOrderTable/ChangeOrdersTable"
import ChangeOrdersPagination from "../../tables/shadcn_ui_tables/changeOrderTable/ChangeOrdersPagination"
import { columns } from '../../tables/shadcn_ui_tables/changeOrderTable/columns'
import { CHANGEORDERS } from '../../../../utils/content'

export default function ChangeOrders() {
  return (
    <div>
      <ChangeOrderButtonsAndSearch />
      <ChangeOrdersTable columns={columns} data={CHANGEORDERS} />
    </div>
  )
}
