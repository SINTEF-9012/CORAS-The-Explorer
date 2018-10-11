const fs = require('fs');

const filelist = fs.readdirSync('.');
let jsFile = '';
let importStatement = 'import { ';

console.log('Converting files to base64 strings');

filelist.forEach((file, index) => {
    console.log(`Opening and converting ${file}`);

    const fileContent = fs.readFileSync(file).toString();
    const noNewlines = fileContent.replace(/\n/, '');
    const nnlBuffer = Buffer.from(noNewlines);
    const base64Version = nnlBuffer.toString('base64');
    
    const urlString = `data:image/svg+xml;base64,${base64Version}`;
    
    const importName = file.split('.')[0];
    console.log(`Export as ${importName}`);
    
    importStatement += `\t${importName}`;
    importStatement += index === filelist.length+1 ? '\n' : ',\n';
    
    jsFile += `export const ${importName} = '${urlString}';\n`;
});

console.log('Writing to file');
fs.writeFileSync('CorasSymbolsBase64.js', jsFile);
console.log('Finished');

console.log('\n==: Import Statement :==');
importStatement += ' } from "./CorasSymbolsBase64.js"';
console.log(importStatement);
