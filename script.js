function toggleFgts(show) {
    const fgtsValorGroup = document.getElementById('fgts-valor-group');
    const fgtsValorInput = document.getElementById('fgts-valor');
    if (show) {
        fgtsValorGroup.classList.remove('hidden');
        fgtsValorInput.setAttribute('required', 'required');
    } else {
        fgtsValorGroup.classList.add('hidden');
        fgtsValorInput.removeAttribute('required');
    }
}

function formatNumber(num) {
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseNumber(str) {
    return parseFloat(str.replace(/\./g, '').replace(',', '.').replace('R$', ''));
}

function selecionarOpcao(botao, nome, valor) {
    const botoes = botao.parentNode.querySelectorAll('button');
    botoes.forEach(b => b.classList.remove('active'));
    botao.classList.add('active');
    document.getElementById(`${nome}-${valor}`).checked = true;

    if (nome === 'compor' && valor === 'sim') {
        document.getElementById('compor-valor-group').classList.remove('hidden');
        document.getElementById('compor-valor').setAttribute('required', 'required');
        document.getElementById('compor-valor').addEventListener('invalid', function() {
            highlightErrorInput(this);
        });
        document.getElementById('compor-fgts-group').classList.remove('hidden');
    } else if (nome === 'compor' && valor === 'nao') {
        document.getElementById('compor-valor-group').classList.add('hidden');
        document.getElementById('compor-valor').removeAttribute('required');
        document.getElementById('compor-fgts-group').classList.add('hidden');
    }

    if (nome === 'fgts' && valor === 'sim') {
        document.getElementById('fgts-valor-group').classList.remove('hidden');
        document.getElementById('fgts-valor').setAttribute('required', 'required');
        document.getElementById('fgts-valor').addEventListener('invalid', function() {
            highlightErrorInput(this);
        });
    } else if (nome === 'fgts' && valor === 'nao') {
        document.getElementById('fgts-valor-group').classList.add('hidden');
        document.getElementById('fgts-valor').removeAttribute('required');
    }

    if (nome === 'compor-fgts' && valor === 'sim') {
        document.getElementById('compor-fgts-valor-group').classList.remove('hidden');
        document.getElementById('compor-fgts-valor').setAttribute('required', 'required');
        document.getElementById('compor-fgts-valor').addEventListener('invalid', function() {
            highlightErrorInput(this);
        });
    } else if (nome === 'compor-fgts' && valor === 'nao') {
        document.getElementById('compor-fgts-valor-group').classList.add('hidden');
        document.getElementById('compor-fgts-valor').removeAttribute('required');
    }
}

// Adicion esses elementos para capturar as escolhas
document.body.insertAdjacentHTML('beforeend', `
    <input type="radio" id="filhos-sim" name="filhos" value="sim" class="hidden">
    <input type="radio" id="filhos-nao" name="filhos" value="nao" class="hidden">
    <input type="radio" id="compor-sim" name="compor" value="sim" class="hidden">
    <input type="radio" id="compor-nao" name="compor" value="nao" class="hidden">
    <input type="radio" id="fgts-sim" name="fgts" value="sim" class="hidden">
    <input type="radio" id="fgts-nao" name="fgts" value="nao" class="hidden">
    <input type="radio" id="compor-fgts-sim" name="compor-fgts" value="sim" class="hidden">
    <input type="radio" id="compor-fgts-nao" name="compor-fgts" value="nao" class="hidden">
`);

function toggleComporRenda(show) {
    const comporValorGroup = document.getElementById('compor-valor-group');
    const comporValorInput = document.getElementById('compor-valor');
    const comporFgtsGroup = document.getElementById('compor-fgts-group');
    if (show) {
        comporValorGroup.classList.remove('hidden');
        comporValorInput.setAttribute('required', 'required');
        comporFgtsGroup.classList.remove('hidden');
    } else {
        comporValorGroup.classList.add('hidden');
        comporValorInput.removeAttribute('required');
        comporFgtsGroup.classList.add('hidden');
    }
}


function validarFormulario1() {
    const rendaInput = document.getElementById('renda');
    const filhosSim = document.getElementById('filhos-sim').checked;
    const filhosNao = document.getElementById('filhos-nao').checked;
    const comporSim = document.getElementById('compor-sim').checked;
    const comporNao = document.getElementById('compor-nao').checked;
    const comporValorInput = document.getElementById('compor-valor');

    if (!rendaInput.checkValidity()) {
        highlightErrorInput(rendaInput);
        return;
    }

    if (!comporSim && !comporNao) {
        highlightErrorButtons('compor');
        return;
    }

    if (comporSim && !comporValorInput.checkValidity()) {
        highlightErrorInput(comporValorInput);
        return;
    }

    if (!filhosSim && !filhosNao) {
        highlightErrorButtons('filhos');
        return;
    }

    mostrarProximoFormulario();
}

function highlightErrorButtons(groupName) {
    const buttons = document.querySelectorAll(`button[onclick*='${groupName}']`);
    buttons.forEach(button => button.classList.add('error'));
    setTimeout(() => {
        buttons.forEach(button => button.classList.remove('error'));
    }, 1500); // Duração em milissegundos
}

function highlightErrorInput(input) {
    input.classList.add('error-input');
    setTimeout(() => {
        input.classList.remove('error-input');
    }, 1500); // Duração em milissegundos
}


function validarFormulario2() {
    const fgtsSim = document.getElementById('fgts-sim').checked;
    const fgtsNao = document.getElementById('fgts-nao').checked;
    const comporFgtsSim = document.getElementById('compor-fgts-sim').checked;
    const comporFgtsNao = document.getElementById('compor-fgts-nao').checked;
    const fgtsValorInput = document.getElementById('fgts-valor');
    const comporFgtsValorInput = document.getElementById('compor-fgts-valor');

    // Verifica se os botões FGTS Sim ou Não foram selecionados
    if (!fgtsSim && !fgtsNao) {
        highlightErrorButtons('fgts');
        return;
    }

    // Verifica se os botões Compor FGTS Sim ou Não foram selecionados, se aparecerem
    if (document.getElementById('compor-fgts-group').classList.contains('hidden') == false) {
        if (!comporFgtsSim && !comporFgtsNao) {
            highlightErrorButtons('compor-fgts');
            return;
        }
    }

    // Verifica se os campos de valor FGTS são válidos
    if (fgtsSim && !fgtsValorInput.checkValidity()) {
        highlightErrorInput(fgtsValorInput);
        return;
    }

    if (comporFgtsSim && !comporFgtsValorInput.checkValidity()) {
        highlightErrorInput(comporFgtsValorInput);
        return;
    }

    // Se todas as validações forem bem-sucedidas, avança para o próximo formulário
    mostrarFormularioOcupacao();
}

function mostrarFormularioOcupacao() {
    const formContainer2 = document.getElementById('form-container-2');
    const formContainerOcupacao = document.getElementById('form-container-ocupacao');
    formContainer2.classList.add('hidden');
    formContainerOcupacao.classList.remove('hidden');
}

function validarFormularioOcupacao() {
    const ocupacao = document.querySelectorAll('input[name="ocupacao"]:checked');

    if (ocupacao.length === 0) {
        highlightErrorInputs('ocupacao');
        return;
    }

    mostrarFormularioContato();
}

function highlightErrorInputs(name) {
    const inputs = document.querySelectorAll(`input[name='${name}']`);
    inputs.forEach(input => {
        const label = input.parentElement;
        input.classList.add('error-input');
        label.classList.add('error-text');
    });

    setTimeout(() => {
        inputs.forEach(input => {
            const label = input.parentElement;
            input.classList.remove('error-input');
            label.classList.remove('error-text');
        });
    }, 1500); // Duração em milissegundos
}


function validarFormularioContato() {
    const nomeInput = document.getElementById('nome');
    const numeroInput = document.getElementById('numero');
    const emailInput = document.getElementById('email');

    if (!nomeInput.checkValidity()) {
        highlightErrorInput(nomeInput);
        return;
    }

    if (!validarNumeroTelefone(numeroInput.value)) {
        highlightErrorInput(numeroInput);
        return;
    }

    if (!emailInput.checkValidity()) {
        highlightErrorInput(emailInput);
        return;
    }

    calcular();
}

function validarNumeroTelefone(numero) {
    const telefonePattern = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato (XX) XXXXX-XXXX
    return telefonePattern.test(numero);
}


function highlightErrorButtons(groupName) {
    const buttons = document.querySelectorAll(`button[onclick*='${groupName}']`);
    buttons.forEach(button => button.classList.add('error'));

    setTimeout(() => {
        buttons.forEach(button => button.classList.remove('error'));
    }, 1500); // Duração em milissegundos
}

function mostrarProximoFormulario() {
    const formContainer = document.getElementById('form-container');
    const formContainer2 = document.getElementById('form-container-2');
    formContainer.classList.add('hidden');
    formContainer2.classList.remove('hidden');
}

function voltarFormulario() {
    const formContainer = document.getElementById('form-container');
    const formContainer2 = document.getElementById('form-container-2');
    formContainer2.classList.add('hidden');
    formContainer.classList.remove('hidden');
}

function voltarFormulario2() {
    const formContainer2 = document.getElementById('form-container-2');
    const formContainerOcupacao = document.getElementById('form-container-ocupacao');
    const formContainer3 = document.getElementById('form-container-3'); // Adicionado
    formContainerOcupacao.classList.add('hidden');
    formContainer3.classList.add('hidden'); // Adicionado para esconder o formulário de contato
    formContainer2.classList.remove('hidden');
}

function voltarFormularioOcupacao() {
    const formContainer2 = document.getElementById('form-container-2');
    const formContainerOcupacao = document.getElementById('form-container-ocupacao');
    formContainerOcupacao.classList.add('hidden');
    formContainer2.classList.remove('hidden');
}

function voltarFormularioContato() {
    const formContainerOcupacao = document.getElementById('form-container-ocupacao');
    const formContainer3 = document.getElementById('form-container-3');
    formContainer3.classList.add('hidden');
    formContainerOcupacao.classList.remove('hidden');
}


function toggleComporFgts(show) {
    const comporFgtsValorGroup = document.getElementById('compor-fgts-valor-group');
    const comporFgtsValorInput = document.getElementById('compor-fgts-valor');
    if (show) {
        comporFgtsValorGroup.classList.remove('hidden');
        comporFgtsValorInput.setAttribute('required', 'required');
    } else {
        comporFgtsValorGroup.classList.add('hidden');
        comporFgtsValorInput.removeAttribute('required');
    }
}

function mostrarFormularioContato() {
    const formContainerOcupacao = document.getElementById('form-container-ocupacao');
    const formContainer3 = document.getElementById('form-container-3');
    formContainerOcupacao.classList.add('hidden');
    formContainer3.classList.remove('hidden');
}

function validarFormularioContato() {
    const nomeInput = document.getElementById('nome');
    const numeroInput = document.getElementById('numero');
    const emailInput = document.getElementById('email');

    if (!nomeInput.checkValidity()) {
        highlightErrorInput(nomeInput);
        return;
    }

    if (!numeroInput.checkValidity()) {
        highlightErrorInput(numeroInput);
        return;
    }

    if (!emailInput.checkValidity()) {
        highlightErrorInput(emailInput);
        return;
    }

    calcular();
}

function highlightErrorInput(input) {
    input.classList.add('error-input');

    setTimeout(() => {
        input.classList.remove('error-input');
    }, 1500); // Duração em milissegundos
}


function calcular() {
    const rendaInput = document.getElementById('renda');
    const fgtsSim = document.getElementById('fgts-sim').checked;
    const fgtsNao = document.getElementById('fgts-nao').checked;
    const fgtsValorInput = document.getElementById('fgts-valor');
    const filhosSim = document.getElementById('filhos-sim').checked;
    const filhosNao = document.getElementById('filhos-nao').checked;
    const comporSim = document.getElementById('compor-sim').checked;
    const comporNao = document.getElementById('compor-nao').checked;
    const comporValorInput = document.getElementById('compor-valor');
    const comporFgtsSim = document.getElementById('compor-fgts-sim').checked;
    const comporFgtsNao = document.getElementById('compor-fgts-nao').checked;
    const comporFgtsValorInput = document.getElementById('compor-fgts-valor');
    const ocupacoes = Array.from(document.querySelectorAll('input[name="ocupacao"]:checked')).map(el => el.value);
    const loadingContainer = document.getElementById('loading-container');
    const resultContainer = document.getElementById('result-container');
    const result = document.getElementById('result');
    const formContainer3 = document.getElementById('form-container-3');
    formContainer3.classList.add('hidden');
    loadingContainer.classList.remove('hidden');

    setTimeout(() => {
        loadingContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        let renda = parseNumber(rendaInput.value);
        let fgts = fgtsSim ? parseNumber(fgtsValorInput.value) : 0;
        let comporRenda = comporSim ? parseNumber(comporValorInput.value) : 0;
        let comporFgts = comporFgtsSim ? parseNumber(comporFgtsValorInput.value) : 0;
        let totalRenda = renda + comporRenda;
        let totalFgts = fgts + comporFgts;
        let resultado = "Valor não encontrado para a renda informada.";
        let found = false;

        for (const [key, value] of Object.entries(valores).reverse()) {
            if (totalRenda >= parseFloat(key)) {
                const financiamento = value[0];
                const totalFinanciamento = value[0] + totalFgts;
                const parcelas = value[1];
                const subsidio = (filhosNao && comporNao) ? value[3] : value[2];
                resultado = `
                <div class="result-container">
                    <div class="result-header">Renda Total
                        <span class="value">R$${formatNumber(totalRenda)}</span>
                    </div>
                    <div class="result-occupation">Ocupação:</div>
                    <div class="result-occupation">${ocupacoes.join(', ')}</div>
                    <div class="result-row">
                        <div class="result-item">
                            <div><b>Financiamento:</b></div>
                            <span class="value">R$${formatNumber(financiamento)}</span>
                        </div>
                        <div class="result-item">
                            <div><b>Seu FGTS:</b></div>
                            <span class="value">R$${formatNumber(totalFgts)}</span>
                        </div>
                    </div>
                    <div class="result-row">
                        <div class="result-item">
                            <div><b>Total Financiamento:</b></div>
                            <span class="value">R$${formatNumber(totalFinanciamento)}</span>
                        </div>
                        <div class="result-item">
                            <div><b>Subsídio do Governo:</b></div>
                            <span class="value">R$${formatNumber(subsidio)}</span>
                        </div>
                    </div>
                </div>
                `;
                found = true;
                // Atualize os valores que queremos enviar
                enviarDadosParaSheetMonkey(totalRenda, totalFinanciamento, parcelas, subsidio);
                break;
            }
        }

        result.innerHTML = resultado;
        if (!found) {
            result.classList.add('error');
        } else {
            result.classList.remove('error');
        }
    }, 2000);
}



function voltar() {
    location.reload(); // Recarrega a página
}

function formatarNumero(input) {
    let value = input.value.replace(/\D/g, '');
    input.value = value;
}


        function formatarValorMonetario(input) {    
            let value = input.value.replace(/\D/g, '');
            let formattedValue = '';
            let length = value.length;
        
            if (length > 2) {
                formattedValue = value.slice(0, length - 2) + ',' + value.slice(length - 2);
            } else if (length === 2) {
                formattedValue = value;
            } else if (length === 1) {
                formattedValue = value;
            }
        
            formattedValue = 'R$ ' + formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            input.value = formattedValue;
        }
        
        // Adicionando o evento de input para os campos monetários
        document.getElementById('renda').addEventListener('input', function() {
            formatarValorMonetario(this);
        });
        
        document.getElementById('fgts-valor').addEventListener('input', function() {
            formatarValorMonetario(this);
        });
        
        document.getElementById('compor-valor').addEventListener('input', function() {
            formatarValorMonetario(this);
        });
        
        document.getElementById('compor-fgts-valor').addEventListener('input', function() {
            formatarValorMonetario(this);
        });
//Bizury
