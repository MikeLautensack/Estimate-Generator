type emailProps = {
    url: string,
    host: string
}

type NewCustomerEmailProps = {
    url: string,
    host: string,
    customerName?: string,
    contractorName?: string
}

type NewEstimateEmailProps = {
    url: string,
    host: string,
    customerName?: string,
    contractorName?: string
}

type UpdatedEstimateEmailProps = {
    url: string,
    host: string,
    customerName?: string,
    contractorName?: string
}