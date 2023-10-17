import { ColumnDef, Table } from '@tanstack/react-table'
import { Dispatch } from 'react'


export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> { 
    children?: string | JSX.Element | JSX.Element[] | [ JSX.Element, string ]
}

export interface FeatureCardProps {
    icon: string, 
    heading: string,
    paragraph: string
}

export interface SubscriptionCardProps { 
    heading: string,
    paragraph: string,
    annualPrice: string,
    monthlyPrice: string,
    annualSubHeading: string,
    monthlySubHeading: string,
    featuresArray: string[],
    state: boolean
}

export interface FAQProps {
    _id: string,
    question: string,
    answer: string
    opened: boolean
    dispatch: Dispatch<Action>
}
export interface FAQItem  { 
    _id: string
    question: string,
    answer: string
    opened: boolean
}
export interface Action { 
    type: string
    payload: string
}

export interface LoginFormValues {
    email: string,
    password: string
}

export interface RegisterFormValues {
    name: string,
    email: string,
    password: string
    confirmPassword: string
}

export interface SideMenuSearchFormProps {
    search: string
}

export interface SmallStatCardProps {
    heading: string,
    data: string
}

export interface ChangeOrder {
    _id: string,
    estimateName: string,
    description: string,
    customerName: string,
    address: string,
    status: string
}

export interface TableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export interface lineItem {
    id: number,
    description: string,
    quantity:  number,
    rateType: string,
    unitType: string,
    unitRate: number,
    total: number,
    estimateId: number
}