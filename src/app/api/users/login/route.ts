import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        } 

        // check password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        // create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name
        }

        // create token
        const token = await jwt.sign(tokenData, process.
            env.TOKEN_SECRET!, {expiresIn: "1h"}) 

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

        return response
    }catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}