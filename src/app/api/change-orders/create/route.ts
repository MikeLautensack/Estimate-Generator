import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { changeOrders } from "@/db/schemas/changeOrders";

export async function POST(request: NextRequest) {

    const data = await request.json();

    try {
        await db.insert(changeOrders)
                .values({
                    id: Math.floor(Math.random() * 100000000),
                    estimateName: data.estimateName,
                    changeOrderName: data.changeOrderName,
                    description: data.description,
                    customerName: data.customerName,
                    projectAddress: data.projectAddress,
                    status: "Pending Approval",
                    dateCreated: new Date(),
                    dateUpdated: new Date(),
                    estimate_id: data.estimate_id,
                    contractor_user_id: data.contractor_user_id,
                    customer_user_id: data.customer_user_id
                });

        return NextResponse.json("Customer sucsessfully created");
    } catch (error) {
        return NextResponse.json(error);
    }
}