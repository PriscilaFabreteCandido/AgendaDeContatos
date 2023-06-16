var agendaList = [];
var isEdit = false;
var row = null;
function exibirDialogo() {
    var dialogo = document.getElementById('dialogo');
    dialogo.style.display = 'block';
}

function fecharDialogo() {
    var dialogo = document.getElementById('dialogo');
    dialogo.style.display = 'none';
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
}

function createOrEditAgendaCont(type) {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    if(!isEdit){
        createAgendaCont(nome, email, telefone);
    }else{
        editAgendaCont(nome, email, telefone);
        
    }
  
}
function editAgendaCont(nome, email, telefone){
    console.log('veio aqui')
   if(row != null && isEdit){
        this.row.cells[0].textContent = nome;
        this.row.cells[1].textContent = telefone;
        this.row.cells[2].textContent = email;
        isEdit = false;
        row = null;
        limparCampos();
   }
}

function validarEmail(email) {
    // Expressão regular para validar o formato do e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function personalizarBotao(editarBtn, cor, textContent){
    editarBtn.textContent = textContent;
    editarBtn.style.margin = '0.5rem';
    editarBtn.style.color = 'white';
    editarBtn.style.backgroundColor = cor;
    editarBtn.style.border = 'none';
    editarBtn.style.fontFamily = "'Montserrat', sans-serif";
    editarBtn.style.fontWeight = '700';
    editarBtn.style.padding = '16px 36px';
    editarBtn.style.borderRadius = '8px';
}

function createAgendaCont(nome, email, telefone) {
    if (!nome || !telefone) {
      alert('Nome e telefone são campos obrigatórios.');
      return;
    }
  
    // Verifica se o e-mail é válido
    if (email && !validarEmail(email)) {
      alert('O e-mail informado não é válido.');
      return;
    }
  
    this.agendaList.push({ id: this.agendaList.length + 1, nome: nome, email: email, telefone: telefone });
    console.log('É para criar:', this.agendaList);
  
    var table = document.getElementById('agendaTable');
    var newRow = table.insertRow();
  
    var nomeCell = newRow.insertCell();
    nomeCell.textContent = nome;
  
    var telefoneCell = newRow.insertCell();
    telefoneCell.textContent = telefone;
  
    var emailCell = newRow.insertCell();
    emailCell.textContent = email;
  
    var acoesCell = newRow.insertCell();
  
    var editarBtn = document.createElement('button');
    personalizarBotao(editarBtn, '#F59E0B', 'Editar');

    editarBtn.classList.add('editarBtn');
    editarBtn.addEventListener('click', function () {
      // Lógica para a ação de editar
      row = this.parentNode.parentNode;
      var nomeAtual = row.cells[0].textContent;
      var telefoneAtual = row.cells[1].textContent;
      var emailAtual = row.cells[2].textContent;
  
      document.getElementById('nome').value = nomeAtual;
      document.getElementById('telefone').value = telefoneAtual;
      document.getElementById('email').value = emailAtual;
  
      isEdit = true;
      // ... Outras lógicas de edição, se necessário
    });
    acoesCell.appendChild(editarBtn);
  
    var excluirBtn = document.createElement('button');
    personalizarBotao(excluirBtn, '#EF4444', 'Excluir');

    excluirBtn.classList.add('excluirBtn');
    excluirBtn.addEventListener('click', function () {
      // Lógica para a ação de excluir
      if (confirm('Deseja realmente excluir este contato?')) {
        table.deleteRow(newRow.rowIndex);
      }
    });
    acoesCell.appendChild(excluirBtn);
  
    limparCampos();
}
  
function aplicarMascara(){
    
    var telefoneInput = document.getElementById('telefone');

    telefoneInput.addEventListener('input', function() {
        var telefone = this.value;
      
        // Remove todos os caracteres que não sejam dígitos
        telefone = telefone.replace(/\D/g, '');
      
        // Aplica a máscara a cada dígito inserido
        if (telefone.length <= 11) {
          telefone = telefone.replace(/(\d{2})(\d{0,5})(\d{0,4})/, "($1) $2-$3");
        } else {
          // Caso o telefone tenha mais de 11 dígitos, mantém apenas os primeiros 11
          telefone = telefone.slice(0, 11);
          telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
      
        this.value = telefone;
    });
}