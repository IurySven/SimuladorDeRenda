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
        document.getElementById('compor-fgts-group').classList.remove('hidden');
    } else if (nome === 'compor' && valor === 'nao') {
        document.getElementById('compor-valor-group').classList.add('hidden');
        document.getElementById('compor-valor').removeAttribute('required');
        document.getElementById('compor-fgts-group').classList.add('hidden');
    }

    if (nome === 'fgts' && valor === 'sim') {
        document.getElementById('fgts-valor-group').classList.remove('hidden');
        document.getElementById('fgts-valor').setAttribute('required', 'required');
    } else if (nome === 'fgts' && valor === 'nao') {
        document.getElementById('fgts-valor-group').classList.add('hidden');
        document.getElementById('fgts-valor').removeAttribute('required');
    }

    if (nome === 'compor-fgts' && valor === 'sim') {
        document.getElementById('compor-fgts-valor-group').classList.remove('hidden');
        document.getElementById('compor-fgts-valor').setAttribute('required', 'required');
    } else if (nome === 'compor-fgts' && valor === 'nao') {
        document.getElementById('compor-fgts-valor-group').classList.add('hidden');
        document.getElementById('compor-fgts-valor').removeAttribute('required');
    }
}
// Adicione esses elementos para capturar as escolhas
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
    if (!rendaInput.checkValidity()) {
        rendaInput.reportValidity();
        return;
    }
    if (!filhosSim && !filhosNao) {
        alert('Por favor, selecione uma opção sobre filhos.');
        return;
    }
    if (!comporSim && !comporNao) {
        alert('Por favor, selecione uma opção sobre compor renda.');
        return;
    }
    
    mostrarProximoFormulario();
}

function validarFormulario2() {
    const fgtsSim = document.getElementById('fgts-sim').checked;
    const fgtsNao = document.getElementById('fgts-nao').checked;
    if (!fgtsSim && !fgtsNao) {
        alert('Por favor, selecione uma opção de FGTS.');
        return;
    }
    mostrarFormularioContato();
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
    const formContainer2 = document.getElementById('form-container-2');
    const formContainer3 = document.getElementById('form-container-3');
    formContainer2.classList.add('hidden');
    formContainer3.classList.remove('hidden');
}


function voltarFormulario2() {
    const formContainer2 = document.getElementById('form-container-2');
    const formContainer3 = document.getElementById('form-container-3');
    formContainer3.classList.add('hidden');
    formContainer2.classList.remove('hidden');
}


function validarFormularioContato() {
    const nomeInput = document.getElementById('nome');
    const numeroInput = document.getElementById('numero');
    const emailInput = document.getElementById('email');

    if (!nomeInput.checkValidity()) {
        nomeInput.reportValidity();
        return;
    }

    if (!numeroInput.checkValidity()) {
        numeroInput.reportValidity();
        return;
    }

    if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
    }

    calcular();
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

        // Corrigindo a consulta para considerar totalRenda corretamente
        for (const [key, value] of Object.entries(valores).reverse()) {
            if (totalRenda >= parseFloat(key)) {
                const totalFinanciamento = value[0] + totalFgts;
                const parcelas = value[1];
                const subsidio = (filhosNao && comporNao) ? value[3] : value[2];
                resultado = `
                <div class="result-container">
                    <div class="result-header">Sua Renda de:
                        <span class="value">${formatNumber(totalRenda)}</span>
                    </div>
                    <div class="result-item">Seu Financiamento:
                        <span class="value">${formatNumber(totalFinanciamento)}</span>
                    </div>
                    <div class="result-item">Parcelas:
                        <span class="value">${formatNumber(parcelas)}</span>
                    </div>
                    <div class="result-spacer"></div> <!-- Espaçamento vertical -->
                    <div class="result-item">Subsídio do Governo
                        <span class="value">${formatNumber(subsidio)}</span>
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

function formatarTelefone(input) {
    let value = input.value.replace(/\D/g, '').slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
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
