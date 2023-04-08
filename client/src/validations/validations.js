import * as Yup from 'yup'

export const validateLogin = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters').max(20, 'Password cannot be longer than 20 characters')
})

export const validateRegister = Yup.object().shape({
    username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters').max(20, 'Username cannot be longer than 20 characters'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters').max(20, 'Password cannot be longer than 20 characters'),
    password1: Yup.string().required('Password is required').oneOf([Yup.ref('password'), null], "Passwords do not match")
})

export const validateCustomer = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    phoneNumber: Yup.string(),
    address: Yup.string()
})

export const validateEstimate = Yup.object().shape({
    estimateName: Yup.string().required('Estimate name is required'),
    customerName: Yup.string().required('Customer name is required'),
    customerEmail: Yup.string().email('Please enter a valid email').required('Customer email is required'),
    address: Yup.string()
})

export const validateTask = Yup.object().shape({
    taskName: Yup.string().required('Task name is required').max(80, 'Task name must be less than 80 characters'),
    taskDescription: Yup.string().max(200, 'Task description must be less than 200 characters')
})

export const validateSubtask = Yup.object().shape({
    subtaskName: Yup.string().required('Subask name is required').max(50, 'Subtask name must be less than 80 characters'),
    subtaskDescription: Yup.string().max(200, 'Subtask description must be less than 200 characters')
})