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
    // const sid = "AC3451171da11a280e5ec14ca0e4e55dc2";
    // const token = "7cca95c720728c32ea203aa3079fa810";
    // const client = require('twilio')(sid,token);

    // const firebaseConfig = {
    //     apiKey: "AIzaSyCfkkaERgAZphA_rqe9jOLNJxSXsmk2hEI",
    //     authDomain: "jafar-test.firebaseapp.com",
    //     projectId: "jafar-test",
    //     storageBucket: "jafar-test.appspot.com",
    //     messagingSenderId: "152756947668",
    //     appId: "1:152756947668:web:4965c9e95185f07f86c941",
    //     measurementId: "G-GRC408D5BL"
    // };

    // const firebase = require('firebase/app');
    // const admiin = require('firebase-admin');
    
    // const service = require('../../jafar-test-firebase-adminsdk-negpv-f3a86b59dc.json');
    // firebase.initializeApp({firebaseConfig,storageBucket:firebaseConfig.storageBucket});
    
    // const {getStorage,ref,getDownloadURL} = require('firebase/storage');

    // const storage = getStorage();

    // const url = await getDownloadURL(ref(storage,'files/test'));

    // const data = await request.json();
    // const message = await client.messages
    //     .create({
    //         from: 'whatsapp:+14155238886',
    //         mediaUrl: url,
    //         to: `whatsapp:+972${data.id}`
    //     });


    const qrcode = require('qrcode-terminal');

    const { Client } = require('whatsapp-web.js');
    const client = new Client();
    
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
    });
    
    client.initialize();
     
     

    

    return NextResponse.json({ response: Response });

    return NextResponse.json({message:"suc134543543cess"},{status:200});


}

