import { useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import Header from './components/Header';
import { Person } from './types';

export default function Tree() {

  useEffect(() => {
  const treeId = localStorage.getItem('treeId');
    api.get('profile', {
      headers: {
        Authorization: treeId,
      }
    }).then(response => {
      renderTree(response.data)
    })
  }, []);

  function newPerson(id: Person) {
    localStorage.setItem('namePerson', id.person_name);
    localStorage.setItem('personBirthdate', id.person_birthdate.toString());
    localStorage.setItem('idRelation', id.id_relation.toString());
    return
  }

  function renderTree(persons: Person[]){
    let personName = persons[0].person_name;
    persons.map((person) => {
      if(person.person_name === personName && person.id_relation === 1){

        const root = document.getElementById('tree')!;
        const div_family = document.createElement('ul');
        div_family.className = "family"
        root.appendChild(div_family);
  
        const div_parents = document.createElement('li');
        div_parents.className ="parents";
        div_family.appendChild(div_parents);
  
        const div_persons = document.createElement('div');
        div_persons.className ="person";
        div_persons.setAttribute('id',`${'relation_'+person.id_relation}`);
        div_parents.appendChild(div_persons);
  
        const div_sons = document.createElement('ul');
        div_sons.className = "sons";
        div_sons.setAttribute('id',`${'sons_'+person.id_relation}`);
        div_parents.appendChild(div_sons);
  
        const a = document.createElement('a');
        a.setAttribute('href','/newperson');
        a.onclick = () => newPerson(person);
        div_persons.appendChild(a);
  
        const h6 = document.createElement('h6');
        h6.className = "primary"
        h6.append(person.person_name);
        a.appendChild(h6);
      }
      else if (person.id_parents === null){
  
        const relation = document.getElementById(`${'relation_'+person.id_relation}`)!;
        
        const a = document.createElement('a');
        a.setAttribute('href','/newperson')
        a.onclick = () => newPerson(person);
        relation.appendChild(a);
  
        const h6 = document.createElement('h6');
        h6.className = "foreign"
        h6.append(person.person_name);
        a.appendChild(h6);
      }
      else{
        const leaf = document.getElementById(`${'sons_'+person.id_parents}`)!;
        const div_family = document.createElement('li');
        div_family.className = "family"
        leaf.appendChild(div_family);
  
        const div_parents = document.createElement('li');
        div_parents.className ="parents";
  
        const div_persons = document.createElement('div');
        div_persons.className ="person";
        div_persons.setAttribute('id',`${'relation_'+person.id_relation}`);
        div_family.appendChild(div_persons);
  
        const div_sons = document.createElement('ul');
        div_sons.className = "sons";
        div_sons.setAttribute('id',`${'sons_'+person.id_relation}`);
        div_family.appendChild(div_sons);
  
        const a = document.createElement('a');
        a.setAttribute('href','/newperson')
        a.onclick = () => newPerson(person);
        div_persons.appendChild(a);
  
        const h6 = document.createElement('h6');
        h6.className = "primary"
        h6.append(person.person_name);
        a.appendChild(h6);
      }
    })
  }

  return (
    <div className="tree-container">
      <Header />
      <div className="tree-diagram" id='tree'/>
    </div>
  );
}