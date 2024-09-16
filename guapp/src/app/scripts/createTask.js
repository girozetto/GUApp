document.addEventListener('DOMContentLoaded', function () {
    const priorityButtons = document.querySelectorAll('.priority-btn');
    const taskForm = document.getElementById('taskForm');
    const submitButton = document.querySelector('.submit-btn');
    const spinner = document.querySelector('.spinner');
    const taskMessage = document.getElementById('taskMessage');
    let selectedPriority = null;

    // Seleção de prioridade com animação
    priorityButtons.forEach(button => {
        button.addEventListener('click', function () {
            priorityButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('idPriority').value = this.dataset.value;
        });
    });

    // Envio do formulário
    taskForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        // Exibir o spinner
        spinner.classList.remove('hidden');
        submitButton.disabled = true;

        // Simular requisição ao servidor (criação de tarefa)
        setTimeout(() => {
            spinner.classList.add('hidden');
            submitButton.disabled = false;
            taskMessage.classList.remove('hidden', 'error');
            taskMessage.classList.add('success');
            taskMessage.innerHTML = 'Tarefa criada com sucesso!';
        }, 2000);
    });
});
