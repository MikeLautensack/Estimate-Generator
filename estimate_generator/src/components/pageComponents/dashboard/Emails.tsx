import EmailsTable from "../../tables/emailsTable/EmailsTable";
import EmailsButtonAndSearch from "./EmailsButtonAndSearch";
import { columns } from '../../tables/emailsTable/columns'

export default function Emails() {
  return (
    <div>
      <EmailsButtonAndSearch />
      <EmailsTable columns={columns} data={[]} />
    </div>
  )
}
