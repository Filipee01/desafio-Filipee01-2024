class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
    ];

    this.animais = {
      LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana e rio'], carnivoro: false },
    };
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) {
      return { erro: 'Animal inválido' };
    }
    if (quantidade <= 0 || isNaN(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    const especieAnimal = this.animais[animal];
    const recintosViaveis = [];

    for (let recinto of this.recintos) {
      if (this.isRecintoViavel(recinto, especieAnimal, quantidade)) {
        const espacoOcupado = this.calculaEspacoOcupado(recinto);
        const espacoNecessario = especieAnimal.tamanho * quantidade;
        const espacoDisponivel = recinto.tamanho - espacoOcupado;

        if (espacoDisponivel >= espacoNecessario) {
          recintosViaveis.push({
            numero: recinto.numero,
            descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - especieAnimal.tamanho * quantidade} total: ${recinto.tamanho})`,
          });
        }
      }
    }

    recintosViaveis.sort((a, b) => a.numero - b.numero);

    return recintosViaveis.length > 0
      ? { recintosViaveis: recintosViaveis.map(r => r.descricao) }
      : { erro: 'Não há recinto viável' };
  }

  isRecintoViavel(recinto, especieAnimal, quantidade) {
    if (!especieAnimal.bioma.includes(recinto.bioma)) {
      return false;
    }

    if (especieAnimal.carnivoro) {
      for (let animalExistente of recinto.animais) {
        if (animalExistente.especie !== especieAnimal.especie) {
          return false;
        }
      }
    }

    if (especieAnimal.especie === 'MACACO' && recinto.animais.length === 0 && quantidade < 2) {
      return false;
    }

    if (especieAnimal.especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
        return false; 
    }

    return true;
  }

  calculaEspacoOcupado(recinto) {
    let espacoOcupado = 0;

    for (let animalExistente of recinto.animais) {
      espacoOcupado += this.animais[animalExistente.especie].tamanho * animalExistente.quantidade;
    }
    return espacoOcupado;
  }
  
}

export { RecintosZoo as RecintosZoo };


