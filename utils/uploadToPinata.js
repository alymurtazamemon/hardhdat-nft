//we would want to pin our file and json files(file = picture, jsonfile --> meta data)
const pinataSDK = require("@pinata/sdk")
const fs = require("fs")
const path = require("path")
require("dotenv").config()
const pinataApiKey = process.env.PINATA_API || ""
const pinataSecretApiKey = process.env.PINATA_API_SECRET || ""
const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey)

async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(imagesFilePath) //gets the full path
    //like /home/alexk/wsl/ubuntu  ..... you get the idea
    console.log(fullImagesPath)
    const files = fs.readdirSync(fullImagesPath) //read everthing in that dir...
    console.log(files)
    let reponses = []
    for (fileIndex in files) {
        //for each of the file
        const readableStream = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
        //we stream all the data in the images, images are full of bytes and data
        try {
            const reponses = await pinata.pinFileToIPFS(readableStream)
            reponses.push(reponses)
        } catch (error) {
            console.error(error)
        }
    }

    return { reponses, files }
}

module.exports = { storeImages }
