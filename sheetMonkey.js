function enviarDadosParaSheetMonkey(totalRenda, totalFinanciamento, parcelas, subsidio) {
    const renda = formatCurrency(parseNumber(document.getElementById('renda').value));
    const fgts = document.querySelector('input[name="fgts"]:checked') ? document.querySelector('input[name="fgts"]:checked').value : '';
    const fgtsValor = formatCurrency(parseNumber(document.getElementById('fgts-valor').value));
    const filhos = document.querySelector('input[name="filhos"]:checked') ? document.querySelector('input[name="filhos"]:checked').value : '';
    const compor = document.querySelector('input[name="compor"]:checked') ? document.querySelector('input[name="compor"]:checked').value : '';
    const comporValor = formatCurrency(parseNumber(document.getElementById('compor-valor').value));
    const comporFgts = document.querySelector('input[name="compor-fgts"]:checked') ? document.querySelector('input[name="compor-fgts"]:checked').value : '';
    const comporFgtsValor = formatCurrency(parseNumber(document.getElementById('compor-fgts-valor').value));
    const nome = document.getElementById('nome').value;
    const numero = formatarTelefoneParaSheetMonkey(document.getElementById('numero').value);
    const email = document.getElementById('email').value;
    const now = new Date();
    const dataEnvio = now.toLocaleDateString('pt-BR');
    const horaEnvio = now.toLocaleTimeString('pt-BR');
    const empresa = "Cury";
    const ocupacao1 = Array.from(document.querySelectorAll('input[name="ocupacao"]:checked')).map(el => el.value).join(', ');
    const ocupacao2 = Array.from(document.querySelectorAll('input[name="ocupacao2"]:checked')).map(el => el.value).join(', ');

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
        numero: `"${numero}"`, // Enviar como texto
        email,
        dataEnvio,
        horaEnvio,
        empresa,
        totalRenda: formatCurrency(totalRenda),
        totalFinanciamento: formatCurrency(totalFinanciamento),
        parcelas: formatCurrency(parcelas),
        subsidio: `"${formatCurrency(subsidio)}"`, // Enviar como texto
        ocupacao1, // Adicionando ocupação 1
        ocupacao2 // Adicionando ocupação 2
    };

    const url = 'https://api.sheetmonkey.io/form/QJ2BgFDaALqHsqkgr6Yvu'; // URL da API do Sheet Monkey
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


function formatarTelefoneParaSheetMonkey(numero) {
    let value = numero.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.startsWith('1') && value.length >= 10) {
        // Formatação para números americanos (EUA)
        value = value.replace(/^1(\d{3})(\d{3})(\d{4})$/, '+1 ($1) $2-$3');
    } else if (value.startsWith('55') && value.length >= 11) {
        // Formatação para números brasileiros (BR)
        value = value.replace(/^55(\d{2})(\d{5})(\d{4})$/, '+55 ($1) $2-$3');
    } else if (value.startsWith('0') && value.length >= 10) {
        // Caso de omissão do código do país, para números brasileiros com DDD
        value = value.replace(/^0(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {
        // Para outros casos, apenas adiciona parênteses e hífen para tentar ajustar
        value = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
    }
    return value;
}

function formatCurrency(number) {
    if (isNaN(number)) {
        return 'R$ 0,00';
    }
    return 'R$ ' + number.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseNumber(str) {
    if (!str) {
        return 0;
    }
    return parseFloat(str.replace(/\./g, '').replace(',', '.').replace('R$', ''));
}
