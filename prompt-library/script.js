const form = document.getElementById('prompt-form');
const container = document.getElementById('prompts-container');

function getPrompts() {
    return JSON.parse(localStorage.getItem('prompts')) || [];
}

function savePrompts(prompts) {
    localStorage.setItem('prompts', JSON.stringify(prompts));
}

function truncateContent(content, wordCount = 8) {
    const words = content.split(/\s+/);
    if (words.length <= wordCount) return content;
    return words.slice(0, wordCount).join(' ') + '...';
}

function renderPrompts() {
    const prompts = getPrompts();
    container.innerHTML = '';

    prompts.forEach((prompt, index) => {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.innerHTML = `
            <h3>${prompt.title}</h3>
            <p>${truncateContent(prompt.content)}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        container.appendChild(card);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    const prompts = getPrompts();
    prompts.push({ title, content });
    savePrompts(prompts);

    form.reset();
    renderPrompts();
});

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.dataset.index);
        const prompts = getPrompts();
        prompts.splice(index, 1);
        savePrompts(prompts);
        renderPrompts();
    }
});

renderPrompts();
