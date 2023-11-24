import EmailsTable from "../../tables/contractorTables/emailsTable/EmailsTable";
import EmailsButtonAndSearch from "./EmailsButtonAndSearch";
import { columns } from '../../tables/contractorTables/emailsTable/columns'

export default function Emails() {
  return (
    <div>
      <EmailsButtonAndSearch />
      <EmailsTable columns={columns} data={[]} />
    </div>
  )
}
