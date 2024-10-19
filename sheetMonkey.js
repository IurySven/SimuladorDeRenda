// sheetMonkey.js

function enviarDadosParaSheetMonkey(totalRenda, totalFinanciamento, parcelas, subsidio) {
    const renda = document.getElementById('renda').value;
    const fgts = document.querySelector('input[name="fgts"]:checked') ? document.querySelector('input[name="fgts"]:checked').value : '';
    const fgtsValor = document.getElementById('fgts-valor').value;
    const filhos = document.querySelector('input[name="filhos"]:checked') ? document.querySelector('input[name="filhos"]:checked').value : '';
    const compor = document.querySelector('input[name="compor"]:checked') ? document.querySelector('input[name="compor"]:checked').value : '';
    const comporValor = document.getElementById('compor-valor').value;
    const comporFgts = document.querySelector('input[name="compor-fgts"]:checked') ? document.querySelector('input[name="compor-fgts"]:checked').value : '';
    const comporFgtsValor = document.getElementById('compor-fgts-valor').value;
    const nome = document.getElementById('nome').value;
    const numero = document.getElementById('numero').value;
    const email = document.getElementById('email').value;

    const data = {
        renda,
        fgts,
        fgtsValor,
        filhos,
        compor,
        comporValor,
        comporFgts,
        comporFgtsValor,
        nome,
        numero,
        email,
        totalRenda: formatNumber(totalRenda),
        totalFinanciamento: formatNumber(totalFinanciamento),
        parcelas: formatNumber(parcelas),
        subsidio: formatNumber(subsidio)
    };

    const url = 'https://api.sheetmonkey.io/form/hEVgf45af1zuYu8xiCVk5D';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}