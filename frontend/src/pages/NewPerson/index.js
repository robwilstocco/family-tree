import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'
import logoTree from '../../assets/logo_tree.png';

export default function NewPerson() {
  const idRelation = localStorage.getItem("idRelation");
  const namePerson = localStorage.getItem("namePerson");
  const personBirthdate = localStorage.getItem("personBirthdate");
  console.log(idRelation,namePerson,personBirthdate);
  return (
    <div className="background">
    <div className="newperson-container">
      <div className="content">
        <section>
          <div className="logo">
            <img src={logoTree} alt="Family Tree"/>
            <h1>Family Tree</h1>
          </div>
          <h2>Cadastrar nova pessoa</h2>
          <p>Insira o nome da pessoa e sua data de nascimento</p>
          <Link to="/tree" className="new">
            <FiArrowLeft size={16} color="#de1581"/>
            Voltar
          </Link>
        </section>
        <form>
          <input placeholder="Nome"/>
          <input type="date" placeholder="Data de nascimento"/>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
    </div>
  );
}