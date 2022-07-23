export class StringService {
  removerDuplicados = (palavras: string[]) => {
    return [...new Set(palavras)]
  }
}