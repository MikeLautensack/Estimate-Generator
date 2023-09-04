import Button from "./Button";
import SideMenuNav from "./SideMenuNav";
import SideMenuSearch from "./SideMenuSearch";

export default function SideMenu() {
  return (
    <div>
        <h1>Estimate Generator</h1>
        <div>
            <Button
                id='profile-button'
                className=''
            >
                
            </Button>
            <Button
                id='settings-button'
                className=''
            >
                
            </Button>
            <Button
                id='notifications-button'
                className=''
            >
                
            </Button>
            <SideMenuSearch />
            <SideMenuNav />
            <Button
                id='logout-button'
                className=''
            >

            </Button>
        </div>
    </div>
  )
}
