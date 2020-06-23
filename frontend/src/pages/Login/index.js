import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import {GiFamilyTree} from 'react-icons/gi'
import treeImg from '../../assets/family_tree.jpg';
import logoTree from '../../assets/logo_tree.png';
import api from '../../services/api';

export default function Login(){

  const [trees,setTrees] = useState([]);

  useEffect(()=>{
    api.get('trees').then(response =>{
      setTrees(response.data);
    })
  },[]);
  
  function handleList(info){
    localStorage.setItem('treeId',info.id);
    console.log(info.id);
    localStorage.setItem('familyName',info.family_name);
    console.log(info.family_name);
    return 
  }


  return (
    <div className="body">
      <div className="login-container">
        <section className="form">
          <div className="logo">
            <img src={logoTree} alt="Family Tree"/>
            <h1>Family Tree</h1>
          </div>
          <form>
            <h2>Árvores Cadastradas:</h2>
            <div className="list">

              <ul>
              {trees.map(tree => {
                return(
                <li key={tree.id}>
                  <Link to="/tree" onClick={() => handleList(tree)}>{`${tree.family_name} (${tree.id})`}</Link>
                </li>
                )}
              )} 
              </ul>
              
            </div>
            <Link to="/newtree" className="new">
              <GiFamilyTree size={16} color="#de1581"/>
              Cadastrar nova Árvore
            </Link>
          </form> 
        </section>
        <img src={treeImg} alt="Family Tree"></img>
      </div>
    </div>  
  );
}