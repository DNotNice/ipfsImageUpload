const express = require('express')
const dotenv = require('dotenv').config();
const pinataSDK = require("@pinata/sdk")
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./des.png');



const metadata = {
    name: 'First Image',
    description: 'This is an image uploaded to IPFS via Pinata',
    image: 'https://gateway.pinata.cloud/ipfs/QmYwKkexjzcrWjUYVThbGjqeaPPsaw4DSSZHS1f2XWsDWa',
    attributes: [
        {
            trait_type: 'NFT',
            value: 'Metadata'
        }
    ]
};

const options = {
    pinataMetadata: {
        name: 'MyMetadataFile'
    },
    pinataOptions: {
        cidVersion: 0
    }
};

const pinata = new pinataSDK({pinataJWTKey : process.env.pinataJWTKey})


const app = express();

app.get('/upload' , async(req, res)=>{
    const response = await pinata.pinJSONToIPFS(metadata, options).then((result) => {
        //handle results here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
    
    return res.json({response})
})
app.get('/' , (req, res)=>{
         return res.json(hello = "listening")
})
app.listen(3000 , ()=>{console.log("server up")})