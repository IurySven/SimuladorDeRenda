function enviarDadosEWhatsapp() {
    
    const linkWhatsapp = `https://wa.me/5511962831954`;

    enviarDadosParaSheetMonkey();

    window.location.href = linkWhatsapp;
}

function formatarTelefone(input) {
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

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

    input.value = value;
}

// Adicionar evento oninput ao campo de número
document.getElementById('numero').addEventListener('input', function() {
    formatarTelefone(this);
});

