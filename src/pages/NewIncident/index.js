import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para aumentar as chances de encontrar um herói para ajudar.</p>

          <Link className="link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Profile
          </Link>
        </section>

        <form action="">
          <input
            placeholder="Título da Caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <input
            placeholder="Valor em reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}