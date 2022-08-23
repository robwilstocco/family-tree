import React from 'react'
import { useHistory } from 'react-router-dom';
import logoTree from '../../../../assets/logo_tree.png';
import { FiPower } from 'react-icons/fi';

export default function Header() {
    const familyName = localStorage.getItem('familyName');
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <header>
            <div className="logo">
                <img src={logoTree} alt="Family Tree" />
                <h1>Family Tree</h1>
            </div>
            <span>Bem vindo família: {familyName}</span>
            <button type="button" onClick={handleLogout}>
                <FiPower size={18} color="#de1581" />
            </button>
        </header>
    )
}