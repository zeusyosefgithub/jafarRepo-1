import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';


export async function GET(request) {
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

    // const ss = await request.json();
    // console.log(ss)

    const data = {
        name: 'Bishal Shrestha',
        age: '27'
    }

    return NextResponse.json({data})
    

    return NextResponse.json({message:"suc134543543cess"},{status:200});


}



export async function POST(request) {
    const {Client, LocalAuth,MessageMedia, RemoteAuth,NoAuth} = require('whatsapp-web.js'); 
    
    //const express = require('express');
    //const app = express();
    //const port = 3001;

    // app.listen(port, () => {
    //     console.log('server runnig');
    // })
    const data = await request.json();

    const client = new Client({
        puppeteer: { headless: false, }
    });

    client.on('qr', (qr) => {
        console.log("QR RECEVED", qr);
    })

    client.on("ready", async () => {
        console.log('Client is ready!');
        const number = "+972506742582";
        const image = await new MessageMedia("image/jpeg", data.url, "image.jpg");
        const chatId = number.substring(1) + "@c.us";
        await client.sendMessage(chatId, image, { caption: "فاتورة "+data.name }); 
    })

    try {
        client.initialize();
    }
    catch(e){
        console.log(e)
    }

    //client.initialize();
    return NextResponse.json({ response: Response });
    //return NextResponse.json({message:"suc134543543cess"},{status:200});
}

