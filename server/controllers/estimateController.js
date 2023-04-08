import estimateModel from "../models/estimateModel.js"
import userModel from "../models/userModel.js"

export const getEstimate = async (req, res) => {
    try {
        const estimates = await estimateModel.find({ user: req.user })
        res.status(200).send(estimates)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const postEstimate = async (req, res) => {
    try {
        const estimate = await estimateModel.create({
            user: req.user,
            estimateName: req.body.estimateName,
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhone: req.body.customerPhone,
            address: req.body.address,
            dateCreated: req.body.dateCreated,
            dateModified: req.body.dateModified,
            tasks: req.body.tasks,
            total: req.body.total
        })
        res.status(200).send(estimate)
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const putEstimate = async (req, res) => {
    try {
        const estimate = await estimateModel.findById(req.params.id)

        if(!estimate) {
            res.status(400).send('Estimate not found')
        } else {
            const updatedEstimate = await estimateModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
    
            const user = await userModel.findById(req.user._id)
    
            if(!user) {
                res.status(401).send('User not found')
            }
    
            // Make sure logged in used matches goal user
            if(estimate.user.toString() !== user._id.toString()) {
                res.status(401).send('User not authorized')
            }
    
            res.status(200).send(updatedEstimate)
        }

        
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

export const deleteEstimate = async (req, res) => {
    try {
        const estimate = await estimateModel.findById(req.params.id)

        if(!estimate) {
            res.status(400).send('Estimate not found')
        } else {
            const user = await userModel.findById(req.user._id)

        if(!user) {
            res.status(401).send('User not found')
        }

        // Make sure logged in used matches goal user
        if(estimate.user.toString() !== user._id.toString()) {
            res.status(401).send('User not authorized')
        }

        await estimate.remove()

        res.status(200).send(`Deleted Estimate ${req.params.id}`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}