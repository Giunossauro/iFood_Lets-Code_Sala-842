export enum TipoOrdenacao {
  Asc = 0,
  Desc = 1
}

export class LoremGenService {
  getLorem = (qtdDePalavras: number): string[] => {

    const loremText = [
      'Lorem',      'ipsum',       'dolor',        'sit',
      'amet',       'consectetur', 'adipiscing',   'elit',
      'sed',        'do',          'eiusmod',      'tempor',
      'incididunt', 'ut',          'labore',       'et',
      'dolore',     'magna',       'aliqua',       'Ut',
      'enim',       'ad',          'minim',        'veniam',
      'quis',       'nostrud',     'exercitation', 'ullamco',
      'laboris',    'nisi',        'aliquip',      'ex',
      'ea',         'commodo',     'consequat',    'Duis',
      'aute',       'irure',       'in',           'reprehenderit',
      'voluptate',  'velit',       'esse',         'cillum',
      'eu',         'fugiat',      'nulla',        'pariatur',
      'Excepteur',  'sint',        'occaecat',     'cupidatat',
      'non',        'proident',    'sunt',         'culpa',
      'qui',        'officia',     'deserunt',     'mollit',
      'anim',       'id',          'est',          'laborum'
    ];
    
    return loremText.slice(0,qtdDePalavras);
  }
}

/* correcao
export class LoremIpsumService {
  constructor() {}

  gerar(quantidade: number): string {
    if (!Number.isInteger(quantidade)) {
      throw Error('Apenas números são permitidos.')
    }

    if (Number.isNaN(quantidade)) {
      throw Error('Apenas números validos são permitidos.')
    }

    if (quantidade < 0) {
      throw Error('Apenas números positivos são permitidos.')
    }

    let result = []
    const palavras = ['p1', 'p2', 'p3', 'p4']

    while (result.length < quantidade) {
      const palavra = palavras[Math.floor(Math.random() * palavras.length)]

      result.push(palavra)
    }

    return result.join(' ');
  }
}
*/