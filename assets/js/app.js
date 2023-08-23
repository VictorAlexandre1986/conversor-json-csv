const converterForm = document.querySelector("#converterForm");
const converterInput = document.querySelector("#converterInput");
const jsonTocsvButton = document.querySelector("#jsonTocsvButton");
const csvTojsonButton = document.querySelector("#csvTojsonButton");
const resultadoElement = document.querySelector(".resultado");




function jsonTocsv(json){

    const headers = Object.keys(json[0]);
    const csvRows = []

    csvRows.push(headers.join(','));

    for (const row of json){
        const values = headers.map((header)=>{
            let value = row[header];
            
            
            if(value === null || value === undefined){
                value=""
            } else if(typeof value === "object"){
                    value = JSON.stringify(value);
            }
            
            return value
        });

        csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
}

function csvTojson(csv){

    const lines = csv.split('\n')

    const headers = lines[0].split(',')

    const json = []

    for(let i = 1; i < lines.length; i++){

        const values = lines[i].split(',');
      
        let row = {};

        for(let j = 0; j < headers.length; j++){

            let value = values[j];

            if(value[0] === "{" || value[0] === "["){
                value = JSON.parse(value);
            }

            row[headers[j]] = value ;
        }
        
        json.push(row);
        console.log(json)
    } 
    
    return json
    
}



function downloadCsv(csv){
    const downloadLink = document.createElement('a');

    downloadLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));

    downloadLink.setAttribute('download', 'data.csv');

    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
}

function displayJson(json){
    const resultArea = document.createElement("pre");

    //2 é o espaçamento
    resultArea.textContent = JSON.stringify(json,null,2);

    resultadoElement.appendChild(resultArea);

    document.body.appendChild(resultadoElement);
}


jsonTocsvButton.addEventListener("click", () => {
    const json = JSON.parse(converterInput.value.trim());
    const csv = jsonTocsv(json);

    downloadCsv(csv)
})


csvTojsonButton.addEventListener('click', () =>{
    const csv = converterInput.value.trim();

    const json = csvTojson(csv)

    displayJson(json)
})


