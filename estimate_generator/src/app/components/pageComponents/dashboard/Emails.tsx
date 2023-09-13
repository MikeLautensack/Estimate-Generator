import EmailsTable from "../../tables/shadcn_ui_tables/emailsTable/EmailsTable";
import EmailsButtonAndSearch from "./EmailsButtonAndSearch";
import { columns } from '../../tables/shadcn_ui_tables/emailsTable/columns'

export default function Emails() {
  return (
    <div>
      <EmailsButtonAndSearch />
      <EmailsTable columns={columns} data={[]} />
    </div>
  )
}
