import React, {useState, ChangeEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi'
import './styles.css';
import logoTree from '../../assets/logo_tree.png';

export default function NewTree(){
  const [family_name, setFamilyName] = useState('');
  const [person_name, setPersonName] = useState('');
  const [person_birthdate, setBirthdate] = useState('');

  const history = useHistory();
  
  async function handleTrees(e : ChangeEvent<HTMLFormElement>){
    e.preventDefault();

    try{
      const tree_data = { family_name };
      await api.post('trees', tree_data);
      
      const id_relation = 1;
      const tree_id = (await api.get('session')).data;
      const person_data = {tree_id,person_name, person_birthdate,id_relation};
      await api.post('persons', person_data);
      alert ('Árvore cadastrada com sucesso !');
      
      localStorage.setItem('treeId',tree_id);
      localStorage.setItem('familyName',family_name);

      history.push('/tree');
    } catch(err) {
      alert ('Erro no cadastro da árvore, tente novamente!');
    }
  }

  return(
    <div className="background">
    <div className="newtree-container">
      <div className="content">
        <section>
          <div className="logo">
            <img src={logoTree} alt="Family Tree"/>
            <h1>Family Tree</h1>
          </div>
          <h2>Cadastro</h2>
          <p>Cadastre uma nova família: insira o nome da familia e as informações da pessoa mais velha de toda a família</p>
          <Link to="/" className="new">
            <FiArrowLeft size={16} color="#de1581"/>
            Voltar
          </Link>
        </section>

        <form onSubmit={handleTrees}>
          <input 
            placeholder="Nome da Família"
            value = {family_name}
            onChange={e => setFamilyName(e.target.value)}/>

          <input 
            placeholder="Nome do parente"
            value = {person_name}
            onChange={e => setPersonName(e.target.value)}/>

          <input 
            type="date"
            placeholder="Data de nascimento"
            value = {person_birthdate}
            onChange={e => setBirthdate(e.target.value)}/>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
    </div>
  );
}