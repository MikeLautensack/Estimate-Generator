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
            id: data.id == null || undefined ? Math.floor(Math.random() * 100000000).toString() : data.id,
            name: data.name,
            email: data.email,
            password: data.password == null || undefined ? null : bcrypt.hashSync(data.password, 10),
            role: data.role,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return 
    } catch (error) {
        console.log(error)
    }
}

const editUserAccount = async (user: Users, id: string) => {
    try {
        await db.update(users)
                .set({
                    name: user.name,
                    email: user.email,
                })
                .where(eq(users.id, id))
    } catch (error) {
        console.log(error)
    }
}

const deleteUserAccount = async (id: string) => {
    try {        
        await db.delete(users)
                .where(eq(users.id , id))
    } catch (error) {
        console.log(error)
    }
}

export {
    createUserAccount,
    editUserAccount,
    deleteUserAccount
}