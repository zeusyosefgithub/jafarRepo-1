import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import twilio from 'twilio';

export async function POST(request) {
    const sid = "AC3451171da11a280e5ec14ca0e4e55dc2";
    const token = "7d7a414312714900bec9e4c6832ebe99";
    const client = require('twilio')(sid,token);


    // const message = await client.messages
    //     .create({
    //         from: 'whatsapp:+14155238886',
    //         body: 'Hello, there!',
    //         to: 'whatsapp:+972503209026'
    //     });
    // return console.log(message.sid);
    request : NextApiRequest;

    const ss = await request.body;
    console.log(ss)

    return NextResponse.json({message:"suc134543543cess"},{status:200});


}

