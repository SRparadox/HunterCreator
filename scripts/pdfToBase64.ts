import * as fs from 'fs';
import * as path from 'path';

const pdfPath = path.join(__dirname, '../src/resources/WerewolfSheet.pdf')
const base64Path = path.join(__dirname, '../src/resources/WerewolfSheet.base64')

const main = () => {
    console.log(`Converting pdf to base64`)

    console.log(`Reading ${pdfPath}`)
    const base64File = fs.readFileSync(pdfPath, { encoding: "base64" })

    fs.writeFileSync(base64Path, base64File)
    console.log(`Done writing to ${base64Path}`)
}

main()