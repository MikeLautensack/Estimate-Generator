const formatDateObj = async (req, res, next) => {
     const clientDateCreatedObj = req.body.dateCreated
     const clientDateModifiedObj = req.body.dateModified
     try {
        //const sqlDateCreatedString = clientDateCreatedObj.toISOString().slice(0, 19).replace('T', ' ')
        //const sqlDateModifiedString = clientDateModifiedObj.toISOString().slice(0, 19).replace('T', ' ')
        //req.body.dateCreated = sqlDateCreatedString
        //req.body.dateModified = sqlDateModifiedString
        console.log(clientDateCreatedObj)
        console.log(clientDateModifiedObj)
     } catch(error) {
        console.log(error)
     }
     next()
}

export default formatDateObj