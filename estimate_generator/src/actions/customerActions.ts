'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/db"
import { customers } from "@/db/schemas/customers"
import { Customers, createUserAccountAction } from "@/types/customers"
import { getServerSession } from "next-auth/next"
import { eq } from "drizzle-orm"
import { 
    createUserAccount,
    editUserAccount, 
    deleteUserAccount 
} from '../actions/userActions'

const addCustomer = (customer: Customers, data: createUserAccountAction) => {
    try {
        addCustomerObj(customer)
        createUserAccount({
            id: data.id,
            name: data.name as string,
            email: data.email as string,
            password: null,
            role: data.role == 'contractor' ? 'contractor' : 'customer'
        })
    } catch (error) {
        console.log(error)
    }
}

const editCustomer = (customer: Customers) => {
    try {
        editCustomerObj(customer, customer.id as number)
        editUserAccount({
            name: customer.name as string,
            email: customer.email as string,
        },
        customer.customer_user_id as string)
    } catch (error) {
        console.log(error)
    }
}

const deleteCustomer = (customer: Customers) => {
    try {
        deleteCustomerObj(customer.id as number)
        deleteUserAccount(customer.customer_user_id as string)
    } catch (error) {
        console.log(error)
    }
}

const addCustomerObj = async (customer: Customers) => {
    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) {
        throw Error("Session null or undefined");
    }
    if (!session.user) {
        throw Error("Session null or undefined");
    }
    try {
        await db.insert(customers).values({
            id: Math.floor(Math.random() * 100000000),
            name: customer.name,
            address: customer.address,
            phone: customer.phone,
            email: customer.email,
            contractor_user_id: session.user.id,
            customer_user_id: customer.customer_user_id,
        })
        return "Customer created"
    } catch (error) {
        console.log(error)
        return error
    }
}

const editCustomerObj = async (customer: Customers, id: number) => {
    try {
        await db.update(customers)
                .set({
                    name: customer.name,
                    address: customer.address,
                    email: customer.email,
                    phone: customer.phone,
                })
                .where(eq(customers.id, id))
    } catch (error) {
        console.log(error)
    }
}
const deleteCustomerObj = async (id: number) => {
    try {
        await db.delete(customers)
                .where(eq(customers.id, id))
    } catch (error) {
        console.log(error)
    }
}

export {
    addCustomer,
    editCustomer,
    deleteCustomer
}