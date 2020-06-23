/*import React, {useState, useEffect} from 'react';
//import {Link} from 'react-router-dom';
import logoTree from '../../assets/logo_tree.png';
import { FiPower } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Tree(){
  const [persons, setPersons] = useState([]);
  const treeId = localStorage.getItem('treeId');
  const familyName = localStorage.getItem('familyName');

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
        <button type="button">
          <FiPower size={18} color = "#de1581"/>
        </button>
      </header>
      <div className="tree">
        {persons.map(person => (
          <div className="family">
            {console.log('parents_'+person.id_relation)}
            <div className="parents" id={'parents_'+person.id_relation}>
              <h6>{person.person_name}</h6>
              <h6>Mãe</h6>
            </div>
            <div className="sons" id = {'sons_'+person.id_relation}>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}*/