'use client'

import { ButtonProps } from '../../types/types'
import { signOut } from 'next-auth/react'
import { FaSignOutAlt } from "react-icons/fa"

const LogoutButton = ({ children, ...props }: ButtonProps) => {
    return (
      <button
        {...props}
        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
      >
        <FaSignOutAlt className={`text-secondary500`}/>
        Logout
      </button>
    )
}

export default LogoutButton