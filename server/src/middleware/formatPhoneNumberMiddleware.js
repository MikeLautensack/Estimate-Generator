const formatPhoneNumber = async (req, res, next) => {
    const phone_number = req.body.phone_number
    const customerPhone = req.body.customerPhone
    try {
       if(phone_number !== undefined) {
         const phoneNumberConverted = parsePhoneNumber(phone_number)
         req.body.phone_number = parseInt(phoneNumberConverted)
         console.log(req.body.phone_number)
       }
       if(customerPhone !== undefined) {
         const phoneNumberConverted2 = parsePhoneNumber(customerPhone)                        
         req.body.customerPhone = parseInt(phoneNumberConverted2)   
       }
       console.log(phone_number)
       console.log(customerPhone)                         
    } catch(error) {
       console.log(error)
    }
    next()
}

const parsePhoneNumber = (formattedNumber) => {
    const digitsOnly = formattedNumber.replace(/\D/g, '')
    return digitsOnly
}

export default formatPhoneNumber