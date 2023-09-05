import Button from './Button'
import MenuNav from './MenuNav'
import MenuSearch from './MenuSearch'
import { BsPerson } from 'react-icons/bs'
import { FcSettings } from 'react-icons/fc'
import { IoMdNotificationsOutline } from 'react-icons/io'

export default function Menu() {
  return (
    <div className='w-[256px] flex flex-col gap-4 bg-primary100 p-4'>
        <h1 className='text-2xl font-bold font-sans text-primary500'>Estimate Generator</h1>
        <div className='flex gap-4 justify-center items-center'>
            <Button
                id='profile-button'
                className='bg-primary200 aspect-square rounded-full p-2'
            >
                <BsPerson className='text-primary300'/>
            </Button>
            <Button
                id='settings-button'
                className=''
            >
                <FcSettings />
            </Button>
            <Button
                id='notifications-button'
                className=''
            >
                <IoMdNotificationsOutline />
            </Button>
        </div>
        <MenuSearch />
        <MenuNav />
        <Button
            id='logout-button'
            className=''
        >

        </Button>
    </div>
  )
}
