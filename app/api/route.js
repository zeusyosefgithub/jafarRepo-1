import { NextResponse } from 'next/server';

export async function GET(request) {
    const data = {
        name: 'Bishal Shrestha',
        age: '27'
    }
    return NextResponse.json({data})
    //return NextResponse.json({message:"suc134543543cess"},{status:200});
}

export async function POST(request) {
    const {Client, LocalAuth,MessageMedia, RemoteAuth,NoAuth} = require('whatsapp-web.js'); 
    const {MongoStore} = require('wwebjs-mongo');
    const mongoose = require('mongoose');
    const data = await request.json();

    const conniction = "mongodb+srv://yosefmidlig20:UooPUUjoXgvbiSKM@cluster0.7tvt3ji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    //123
    await mongoose.connect(conniction).then(() => {
        console.log('hellow from mongo db');
        const store = new MongoStore({ mongoose: mongoose });
        const client = new Client({
            puppeteer: { headless: false, },
            authStrategy: new RemoteAuth({
                store: store,
                backupSyncIntervalMs: 300000
            }),
        });
        client.on('qr', (qr) => {
            console.log("QR RECEVED", qr);
        })
        client.on("ready", async () => {
            const number = "+972506742582";
            const image = await new MessageMedia("image/jpeg", data.url, "image.jpg");
            const chatId = number.substring(1) + "@c.us";
            await client.sendMessage(chatId, image, { caption: "فاتورة " + data.name });
        })
        client.initialize();
    })
    return NextResponse.json({ response: Response });
    //return NextResponse.json({message:"suc134543543cess"},{status:200});
}

