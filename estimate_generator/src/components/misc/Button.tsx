'use client'

import { ButtonProps } from '../../types/types'

const Button = ({ children, ...props }: ButtonProps) => {
    return (
      <button
        {...props}
      >
        {children}
      </button>
    )
}

export default Button