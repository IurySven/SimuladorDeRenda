function enviarDadosEWhatsapp() {
    
    const linkWhatsapp = `https://wa.me/5511945764317`;

    enviarDadosParaSheetMonkey();

    window.location.href = linkWhatsapp;
}

