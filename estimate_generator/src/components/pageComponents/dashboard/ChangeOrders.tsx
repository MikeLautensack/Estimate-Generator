import ChangeOrdersTable from "../../tables/changeOrderTable/ChangeOrdersTable"
import { columns } from '../../tables/changeOrderTable/columns'
import { getChangeOrders } from "@/actions/changeOrders"
import { ChangeOrders } from "@/types/changeOrders"

export default async function ChangeOrders() {
  const data = await getChangeOrders()
  return (
    <div>
      <ChangeOrdersTable columns={columns} data={data} />
    </div>
  )
}
