export const formatTaxString = (num: number):string => {
    const number = num * 100
    const roundedNumber = number.toFixed(2)
    const taxString = `${roundedNumber}%`
    return taxString
}

export const formatPriceString = (num: number):string => {
    const roundedNumber = num.toFixed(2)
    const priceString = `$${roundedNumber}`
    return priceString
}