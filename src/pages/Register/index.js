import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      phone,
      city,
      state
    };

    try {
      const response = await api.post('ongs', data);

      alert(`Seud ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch (error) {
      alert(`Erro no cadastro, tente novamente`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o Login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail da ONG"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <input
            placeholder="Telefone da ONG"
            value={phone}
            onChange={event => setPhone(event.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={event => setCity(event.target.value)}
            />

            <input
              placeholder="UF"
              style={{ width: 120 }}
              value={state}
              onChange={event => setState(event.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
