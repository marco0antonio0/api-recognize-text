class NameFilter {
    constructor(names) {
        this.priorityNames = names;
        this.nameParts = new Map(); // Alterando de Set para Map

        // Prepara as partes dos nomes para facilitar a busca, mapeando cada parte ao nome completo
        this.priorityNames.forEach(fullName => {
            fullName.split(' ').forEach(part => {
                this.nameParts.set(part.toLowerCase(), fullName);
            });
        });
    }

    filterPriorityNames(text) {
        const pessoas_presentes = new Set();
        const lines = text.split('\n');
        lines.forEach(line => {
            line.split(' ').forEach(word => {
                const key = word.toLowerCase();
                if (this.nameParts.has(key)) {
                    pessoas_presentes.add(this.nameParts.get(key)); // Adiciona o nome completo correspondente
                }
            });
        });
        return Array.from(pessoas_presentes); // Converte o Set em Array para resultado final
    }
}

module.exports = NameFilter