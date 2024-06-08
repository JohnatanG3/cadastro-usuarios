// Importa os hooks useEffect, useState e useRef da biblioteca React
import { useEffect, useState, useRef } from 'react'
// Importa o arquivo de estilos CSS
import './style.css'
// Importa a imagem de um ícone de lixeira
import Trash from '../../assets/trash.svg'
// Importa a instância do axios configurada para fazer requisições à API
import api from '../../services/api'

// O useEffect é um hook que permite realizar efeitos colaterais em componentes funcionais.
// Isso inclui tarefas como buscar dados, configurar subscrições e manipular o DOM.
// Ele é similar aos métodos de ciclo de vida componentDidMount, componentDidUpdate e 
// componentWillUnmount em componentes de classe.

// O useState é um hook que permite adicionar o estado a componentes funcionais.
// Ele retorna um par de valores: o estado atual e uma função que permite atualizá-lo.

// O useRef é um hook que retorna um objeto mutável cuja propriedade .current é inicializada 
// com o valor passado (ou null, se nenhum valor for passado). Ele é geralmente utilizado para 
// acessar elementos DOM diretamente ou para armazenar valores mutáveis que não causam uma nova renderização quando atualizados.

function Home() {
  // Define o estado 'users' para armazenar a lista de usuários e a função 'setUsers' para atualizá-lo
  const [users, setUsers] = useState([]);

  // Cria referências para os inputs do formulário
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // Função assíncrona para buscar usuários da API
  async function getUsers() {

    try {
      // Faz uma requisição GET para obter os usuários
      const usersFromApi = await api.get('/usuarios');
      // Atualiza o estado 'users' com os dados obtidos
      setUsers(usersFromApi.data);
    } catch (error) {
      // Exibe um erro no console se a requisição falhar
      console.error("Erro ao Buscar Usuários:", error);
    }
  }

  // Função assíncrona para criar um novo usuário
  async function createUsers() {
    // Obtém os valores dos inputs e remove espaços em branco
    const name = inputName.current.value.trim();
    const age = inputAge.current.value.trim();
    const email = inputEmail.current.value.trim();

    // Verifica se todos os campos estão preenchidos
    if (!name || !age || !email) {
      console.error("Todos os Campos São Obrigatórios");
      return;
    }

    try {
      // Faz uma requisição POST para criar um novo usuário
      await api.post('/usuarios', { name, age, email });
      console.log("Usuário Criado Com Sucesso");
      // Limpar os inputs após a criação
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';
    } catch (error) {
      // Exibe um erro no console se a requisição falhar
      console.error("Erro ao Criar Usuário:", error);
    }

    // Atualiza a lista de usuários na tela
    getUsers();
  }

  // Função assíncrona para deletar um usuário
  async function deleteUsers(id) {
    try{
      // Faz uma requisição DELETE para remover o usuário
      await api.delete(`/usuarios/${id}`);
      getUsers(); // Atualiza a lista de usuários após deletar um usuário
    } catch(error) {
      // Exibe um erro no console se a requisição falhar
      console.error("Erro ao Deletar Usuário:", error);
    }
  }

  // useEffect para buscar usuários ao montar o componente
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="nome" type='text' placeholder='Nome' ref={inputName}/>
        <input name="idade" type='number' placeholder='Idade' ref={inputAge}/>
        <input name="email" type='email' placeholder='E-mail' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      
      {/* No React, o método map é frequentemente utilizado para renderizar listas de elementos de forma eficiente. Ele é um método padrão do JavaScript que está disponível em arrays e permite transformar cada item de um array em um novo item, retornando um novo array. */}
      {/* Todo código entre {} debtro de ract seria um código JavaScript dentro do noss HTML */}
      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          {/* Botão para deletar o usuário, chama a função deleteUsers com o ID do usuário */}
          <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="Lixeira" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home