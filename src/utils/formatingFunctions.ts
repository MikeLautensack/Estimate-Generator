export const formatTaxString = (num: number):string => {
    const number = num * 100;
    const roundedNumber = number.toFixed(2);
    const taxString = `${roundedNumber}%`;
    return taxString;
}

export const formatPriceString = (num: number):string => {
    const roundedNumber = num.toFixed(2);
    const priceString = `$${roundedNumber}`;
    return priceString;
}

export const formatPhoneNumber = (num: string):string | null => {
    let cleaned = ("" + num).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
}

export const formatName = (name: string): string => {
    return name.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}