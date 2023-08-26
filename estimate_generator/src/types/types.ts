import { Dispatch } from "react"

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> { 
    children?: string | JSX.Element | JSX.Element[],
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