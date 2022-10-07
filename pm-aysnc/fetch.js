let url = 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-all'
let d;

function addTag(label, content) {
    let p = document.createElement('p')
    p.innerHTML = `${label}: ${content}`
    document.body.appendChild(p)
}


(async () => {
    try {
        const response = await fetch(url);
        // const data = await response.json();
        d = await response.json();
        console.log(response.status);
        // d = data[0]
        console.log(d[0])
        // console.log(d[0].new_case)
        for(let i in d[0]){
            addTag(i, d[0][i])
            // console.log(`${i}: ${d[0][i]}`)
        }
    } catch (error) {
        console.error('incomplete fetch: ' + error)
    }
}) ()