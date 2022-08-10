import React, {useState, useEffect, ReactNode} from 'react';
import {useHistory} from 'react-router-dom';
import logoTree from '../../assets/logo_tree.png';
import { FiPower } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Tree(){

  interface Person {
    id_person: number,
    tree_id: number,
    person_name: string,
    person_birthdate: Date,
    id_parents: number
    id_relation: number
  }

  const history = useHistory();
  const [persons, setPersons] = useState<Person[]>([]);
  const treeId = localStorage.getItem('treeId');
  const familyName = localStorage.getItem('familyName');
  let personName;
  

  function newPerson(id : Person){

    localStorage.setItem('namePerson',id.person_name);
    localStorage.setItem('personBirthdate',id.person_birthdate.toString());
    localStorage.setItem('idRelation',id.id_relation.toString());

    return
  }

  function fill(pessoa : Person) : ReactNode{
    personName = persons[0].person_name;
    
    if(pessoa.person_name === personName && pessoa.id_relation === 1){

      const root = document.getElementById('tree')!;
      const div_family = document.createElement('ul');
      div_family.className = "family"
      root.appendChild(div_family);

      const div_parents = document.createElement('li');
      div_parents.className ="parents";
      div_family.appendChild(div_parents);

      const div_persons = document.createElement('div');
      div_persons.className ="person";
      div_persons.setAttribute('id',`${'relation_'+pessoa.id_relation}`);
      div_parents.appendChild(div_persons);

      const div_sons = document.createElement('ul');
      div_sons.className = "sons";
      div_sons.setAttribute('id',`${'sons_'+pessoa.id_relation}`);
      div_parents.appendChild(div_sons);

      const a = document.createElement('a');
      a.setAttribute('href','/newperson');
      a.onclick = () => newPerson(pessoa);
      div_persons.appendChild(a);

      const h6 = document.createElement('h6');
      h6.className = "primary"
      h6.append(pessoa.person_name);
      a.appendChild(h6);

      return
    }
    else if (pessoa.id_parents === null){

      const relation = document.getElementById(`${'relation_'+pessoa.id_relation}`)!;
      
      const a = document.createElement('a');
      a.setAttribute('href','/newperson')
      a.onclick = () => newPerson(pessoa);
      relation.appendChild(a);

      const h6 = document.createElement('h6');
      h6.className = "foreign"
      h6.append(pessoa.person_name);
      a.appendChild(h6);

      return
    }
    else{
      const leaf = document.getElementById(`${'sons_'+pessoa.id_parents}`)!;
      const div_family = document.createElement('li');
      div_family.className = "family"
      leaf.appendChild(div_family);

      const div_parents = document.createElement('li');
      div_parents.className ="parents";
      // div_parents.setAttribute('id',`${'relation_'+pessoa.id_relation}`);
      // div_family.appendChild(div_parents);

      const div_persons = document.createElement('div');
      div_persons.className ="person";
      div_persons.setAttribute('id',`${'relation_'+pessoa.id_relation}`);
      div_family.appendChild(div_persons);

      const div_sons = document.createElement('ul');
      div_sons.className = "sons";
      div_sons.setAttribute('id',`${'sons_'+pessoa.id_relation}`);
      div_family.appendChild(div_sons);

      const a = document.createElement('a');
      a.setAttribute('href','/newperson')
      a.onclick = () => newPerson(pessoa);
      div_persons.appendChild(a);

      const h6 = document.createElement('h6');
      h6.className = "primary"
      h6.append(pessoa.person_name);
      a.appendChild(h6);

      return
    }
  };

  function handleLogout(){
    localStorage.clear();
    history.push('/')
  }

  useEffect(()=>{
    api.get('profile', {
      headers: {
        Authorization: treeId,
      }
    }).then(response =>{
      setPersons(response.data);
    })
  },[treeId]);  

  return(
    <div className="tree-container">
      <header>
        <div className="logo">
          <img src={logoTree} alt="Family Tree"/>
          <h1>Family Tree</h1>
        </div>
        <span>Bem vindo família: {familyName}</span>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color = "#de1581"/>
        </button>
      </header>
      <div className="tree-diagram" id='tree'>
        {persons.map((person) => {
              return fill(person)        
        })
      }      
      </div>
    </div>
  );
}