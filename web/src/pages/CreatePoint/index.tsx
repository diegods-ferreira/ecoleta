/**
 * Imports de pacotes necessários.
 */
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
/**
 * Imports de arquivos necessários.
 */
import api from '../../services/api';
import Dropzone from '../../components/dropzone';
import './styles.css';
import logo from '../../assets/logo.svg';

/**
 * Interfaces para definição de tipos.
 * Quando usamos array ou objeto, devemos informar manualmente o tipo da variável.
 */

/**
 * Define o tipo de cada propriedade do item de coleta.
 */
interface Item {
  id: number;
  title: string;
  image_url: string;
}

/**
 * Define o tipo de cada propriedade do objeto de UFs retornado pela API do IBGE.  
 */
interface IBGEUFResponse {
  sigla: string;
}

/**
 * Define o tipo de cada propriedade do objeto de Cidades retornado pela API do IBGE.
 */
interface IBGECityResponse {
  nome: string;
}

/**
 * Componente CreatePoint escrito em forma de função.
 */
const CreatePoint = () => {
  /**
   * Definição de estados.
   */
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  /**
   * Requisita a lista de items de coleta à API.
   */
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, []);

  /**
   * Captura a localização atual do usuário.
   */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  /**
   * Requisita as informações de UFs à API do IBGE.
   */
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    });
  }, []);

  /**
   * Requisita as informações das Cidades pertencentes à UF selecionada.
   * Executa toda vez que o valor do estado selectedUf mudar.
   */
  useEffect(() => {
    if (selectedUf === '0')
      return;
    
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome);
      setCities(cityNames);
    });
  }, [selectedUf]);

  /**
   * Atualiza o valor do estado selectedUf para que o <select> de Cidades atualize também.
   */
  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  /**
   * Atualiza o valor do estado selectedCity.
   */
  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  /**
   * Atualiza a latitude e longitude gravada no estado selectedPosition.
   */
  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }

  /**
   * Atualiza os valores dos estados respectivos aos inputs.
   */
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  /**
   * Atualiza os ítens de coleta selecionados pelo usuário.
   */
  function handleSelectItem(id: number) {
    const alreadSelected = selectedItems.findIndex(item => item === id);

    if (alreadSelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    }
    else {
      setSelectedItems([ ...selectedItems, id ]);
    }
  }

  /**
   * Envia os dados para serem cadastrados pela API.
   */
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [ latitude, longitude ] = selectedPosition;
    const items = selectedItems;
    const image = selectedFile;

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', latitude.toString());
    data.append('longitude', longitude.toString());
    data.append('items', items.join(','));
    if (image) data.append('image', image);

    await api.post('/points', data);

    alert('Ponto de coleta criado!');
    history.push('/');    // Redireciona o usuário de volta à Home.
  }


  /**
   * Retorna o HTML da página.
   */
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br/> ponto de coleta</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li key={item.id.toString()} onClick={() => handleSelectItem(item.id)} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}

/**
 * Exporta o componente Home.
 */
export default CreatePoint;