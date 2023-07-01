const fs = require('fs');

const data = 'off';
const filePath = '/Users/rober/Desktop/gateState.txt';

function writeToFile(){
fs.writeFile(filePath, data, (err) => {
  if (err){console.log(err.message);} 
 else{
  console.log('Data written to file')
 }
})
}

module.exports = writeToFile;