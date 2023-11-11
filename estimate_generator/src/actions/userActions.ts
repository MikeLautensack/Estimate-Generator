'use server'

import { db } from "@/db";
import { users } from "@/db/schemas/auth"
import { eq } from "drizzle-orm"
import bcrypt from 'bcrypt'
import { Customers, createUserAccountAction } from "@/types/customers";
import { Users } from "@/types/users";

const createUserAccount = async (data: createUserAccountAction) => {
    try {
        const existingUser = await db
                             .select()
                             .from(users)
                             .where(eq(data.email as any, users.email));
    
        if (existingUser.length === 1) {
            return 'User already registered'
        }
    
        await db.insert(users).values({
            id: Math.floor(Math.random() * 100000000).toString(),
            name: data.name,
            email: data.email,
            password: bcrypt.hashSync(data.password, 10),
            role: data.role,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return 
    } catch (error) {
        console.log(error)
    }
}

const editUserAccount = async (user: Users, id: number) => {
    try {
        await db.update(users)
                .set({
                    name: user.name,
                    email: user.email,
                    password: bcrypt.hashSync(user.password as string, 10),
                    role: '',
                })
                .where(eq(users.id as any, id))
    } catch (error) {
        console.log(error)
    }
}

const deleteUserAccount = async (id: number) => {
    try {        
        await db.delete(users)
                .where(eq(users.id as any, id))
    } catch (error) {
        console.log(error)
    }
}

export {
    createUserAccount,
    editUserAccount,
    deleteUserAccount
}