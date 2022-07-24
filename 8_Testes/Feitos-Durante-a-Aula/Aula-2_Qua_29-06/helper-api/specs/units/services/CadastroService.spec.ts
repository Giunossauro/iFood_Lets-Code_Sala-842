import { CadastroService } from "../../../src/services/CadastroService"

describe('Executando teste na classe CadastroService', () => {
  const cpf: string = "111.111.112-41"

  const user = CadastroService.getUser(cpf)

  /**
   * -nome
   * -cpf
   * -niver
   * prof
   * comoConheceu
   * tel
   * -cel
   * -email
   * obs
   * dtInclusao
   */

  it ('não deve ser um nome vazio', () => {
    expect(user.nome).not.toEqual("")
  })

  it ('o campo nome deve sobrenome (deve ter algum caractere de espaço)', () => {
    expect(user.nome).toMatch(/\ /)
  })

  it ('o nome não deve ter nenhum caractere especial', () => {
    expect(user.nome).toMatch(/\ /)
  })
})
