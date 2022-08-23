import React, {useState, ChangeEvent} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'
import logoTree from '../../assets/logo_tree.png';
import api from '../../services/api';
import formatDate from '../../utils/formatDate';
import { Relation } from './types';

export default function NewPerson() {
  const [person_name, setPersonName] = useState('');
  const [person_birthdate, setBirthdate] = useState('');
  const [relation, setRelation] = useState('');

  const tree_id = localStorage.getItem("treeId");
  const namePerson = localStorage.getItem("namePerson");
  const personBirthdate = localStorage.getItem("personBirthdate");

  const history = useHistory();
  async function handlePersons(e : ChangeEvent<HTMLFormElement>){
    e.preventDefault();
    
    if(relation === "" || person_name === "" || person_birthdate === ""){
      alert("Preencha todos os campos!")
      return
    }
    try{
      if( relation === "partner" ){
        const id_relation = localStorage.getItem("idRelation");
        const newPerson = {
          tree_id,
          person_name,
          person_birthdate,
          id_relation
        }
        await api.post('persons',newPerson);
        history.push('/tree')
      }
      if( relation === "son" ){
        
        const id_parents = localStorage.getItem("idRelation")
        const last : Relation[] = (await api.get('profile', {
                headers: {
                Authorization: tree_id,
              }})).data;
        let id_relation = 0;
        
        last.forEach(element => {
          if(element.id_relation >= id_relation){
            id_relation = element.id_relation;
          }else{
            return
          }
        });
        id_relation++;

        const newPerson = {
          tree_id,
          person_name,
          person_birthdate,
          id_parents,
          id_relation
        }

        await api.post('persons',newPerson);
        history.push('/tree')
      }  
    }catch(err){
      alert("Erro no cadastro!")
    }
  }


  return (
    <div className="background">
      <div className="newperson-container">
        <div className="content">
          <section>
            <div className="logo">
              <img src={logoTree} alt="Family Tree"/>
              <h1>Family Tree</h1>
            </div>
            <h2>Nome: {namePerson}</h2>
            <p>Data de Nascimento: {formatDate(personBirthdate)}</p>
            <Link to="/tree" className="new">
              <FiArrowLeft size={16} color="#de1581"/>
              Voltar
            </Link>
          </section>

          <form onSubmit={handlePersons}>
            <h2>Cadastrar nova pessoa</h2>
            <p>Insira os dados da nova pessoa</p>
            <div className="radioB">
              <div>
                <input 
                  type="radio"
                  id="ok" 
                  name="relation" 
                  value="partner"
                  onChange={e => setRelation(e.target.value)}/>
                <label>Esposo(a)</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  id="nok"
                  name="relation" 
                  value="son"
                  onChange={e => setRelation(e.target.value)}/>
                <label>Filho(a)</label>
              </div>
            </div>
            <input 
              placeholder="Nome"
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