'use client'

import { ButtonProps } from '../../types/types'
import { signOut } from 'next-auth/react'

const LogoutButton = ({ children, ...props }: ButtonProps) => {
    return (
      <button
        {...props}
        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
      >
        Logout
      </button>
    )
}

export default LogoutButton