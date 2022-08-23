import React, { useState, useEffect, ReactNode, ReactElement } from 'react';
import './styles.css';
import api from '../../services/api';
import Header from './components/Header';
import { Person } from './types';
import ReactDOM  from 'react-dom';

export default function Tree() {

  const [persons, setPersons] = useState<Person[]>([]);
  let personName;

  useEffect(() => {
  const treeId = localStorage.getItem('treeId');
    console.log(treeId)
    api.get('profile', {
      headers: {
        Authorization: treeId,
      }
    }).then(response => {
      setPersons(response.data);
    })
  }, []);

  function newPerson(id: Person) {
    localStorage.setItem('namePerson', id.person_name);
    localStorage.setItem('personBirthdate', id.person_birthdate.toString());
    localStorage.setItem('idRelation', id.id_relation.toString());
    return
  }

  // function fillTree(pessoa: Person): any {
  //   personName = persons[0].person_name;

  //   if (pessoa.person_name === personName && pessoa.id_relation === 1) {
  //     const family = (
  //       <ul className='family'>
  //         <li className='parents'>
  //           <div className='person' id={`${'relation_' + pessoa.id_relation}`}>
  //             <a href="/newperson" onClick={() => newPerson(pessoa)}>
  //               <h6 className="primary">{pessoa.person_name}</h6>
  //             </a>
  //           </div>
  //           <ul className="sons" id={`${'sons_' + pessoa.id_relation}`}>

  //           </ul>
  //         </li>
  //       </ul>
  //     );

  //     ReactDOM.render(family, document.getElementById('tree'));

  //   }
  //   if (pessoa.id_parents === null) {
  //     const companion = (
  //       <a href="/newperson" onClick={() => newPerson(pessoa)}>
  //         <h6 className="primary">{pessoa.person_name}</h6>
  //       </a>
  //     )

  //     ReactDOM.render(companion, document.getElementById(`${'relation_' + pessoa.id_relation}`));
  //   }
  //   else{
  //     const sons = (
  //       <li className='family'>
  //         <li className='parents'>
  //           <div className='person' id={`${'relation_' + pessoa.id_relation}`}>
  //             <a href="/newperson" onClick={() => newPerson(pessoa)}>
  //               <h6 className="primary">{pessoa.person_name}</h6>
  //             </a>
  //           </div>
  //           <ul className="sons" id={`${'sons_' + pessoa.id_relation}`}>

  //           </ul>
  //         </li>
  //       </li>
  //     )
  //     ReactDOM.render(sons, (document.getElementById(`${'sons_' + pessoa.id_parents}`)!));
  //   }
  // }

  function fill(pessoa: Person): ReactNode {
    personName = persons[0].person_name;
    if (pessoa.person_name === personName && pessoa.id_relation === 1) {

      const root = document.getElementById('tree')!;
      const div_family = document.createElement('ul');
      div_family.className = "family"
      root.appendChild(div_family);

      const div_parents = document.createElement('li');
      div_parents.className = "parents";
      div_family.appendChild(div_parents);

      const div_persons = document.createElement('div');
      div_persons.className = "person";
      div_persons.setAttribute('id', `${'relation_' + pessoa.id_relation}`);
      div_parents.appendChild(div_persons);

      const div_sons = document.createElement('ul');
      div_sons.className = "sons";
      div_sons.setAttribute('id', `${'sons_' + pessoa.id_relation}`);
      div_parents.appendChild(div_sons);

      const a = document.createElement('a');
      a.setAttribute('href', '/newperson');
      a.onclick = () => newPerson(pessoa);
      div_persons.appendChild(a);

      const h6 = document.createElement('h6');
      h6.className = "primary"
      h6.append(pessoa.person_name);
      a.appendChild(h6);

      return
    }
    else if (pessoa.id_parents === null) {

      const relation = document.getElementById(`${'relation_' + pessoa.id_relation}`)!;
      const a = document.createElement('a');
      a.setAttribute('href', '/newperson')
      a.onclick = () => newPerson(pessoa);
      relation.appendChild(a);

      const h6 = document.createElement('h6');
      h6.className = "foreign"
      h6.append(pessoa.person_name);
      a.appendChild(h6);
      return
    }
    else {
      const leaf = document.getElementById(`${'sons_' + pessoa.id_parents}`)!;
      const div_family = document.createElement('li');
      div_family.className = "family"
      leaf.appendChild(div_family);

      const div_parents = document.createElement('li');
      div_parents.className = "parents";

      const div_persons = document.createElement('div');
      div_persons.className = "person";
      div_persons.setAttribute('id', `${'relation_' + pessoa.id_relation}`);
      div_family.appendChild(div_persons);

      const div_sons = document.createElement('ul');
      div_sons.className = "sons";
      div_sons.setAttribute('id', `${'sons_' + pessoa.id_relation}`);
      div_family.appendChild(div_sons);

      const a = document.createElement('a');
      a.setAttribute('href', '/newperson')
      a.onclick = () => newPerson(pessoa);
      div_persons.appendChild(a);

      const h6 = document.createElement('h6');
      h6.className = "primary"
      h6.append(pessoa.person_name);
      a.appendChild(h6);

      return
    }
  };

  return (
    <div className="tree-container">
      <Header />
      <div className="tree-diagram" id='tree'>
        {persons.map((person) => {
          return fill(person)
        })
        }
      </div>
    </div>
  );
}