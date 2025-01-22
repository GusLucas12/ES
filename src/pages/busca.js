import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Busca() {
    const [filtros, setFiltros] = useState({
        palavrasChave: '',
        autor: '',
        ano: '',
        curso: '',
        tipo: '',
        status: ''
    });
    const [resultados, setResultados] = useState([]);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const validarFiltros = () => {
        if (!filtros.palavrasChave.trim() && !filtros.autor.trim()) {
            setErro('Por favor, preencha pelo menos um dos campos: Palavras-chave ou Autor.');
            return false;
        }
        setErro('');
        return true;
    };

    const buscarPublicacoes = async () => {
       // if (!validarFiltros()) return;

        setCarregando(true);
        setErro('');
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados. Tente novamente mais tarde.');
            }
            const data = await response.json();

            const filtrados = data
                .filter((item) => {
                    return (
                        item.name.toLowerCase().includes(filtros.palavrasChave.toLowerCase()) &&
                        item.email.toLowerCase().includes(filtros.autor.toLowerCase())
                    );
                })
                .slice(0, 10); // Limitar aos 10 primeiros resultados

            setResultados(filtrados);
        } catch (error) {
            setErro(error.message);
            setResultados([]);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Buscar Publicações</h1>

            <div className="card p-4 mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Palavras-chave</label>
                        <input
                            type="text"
                            className="form-control"
                            name="palavrasChave"
                            value={filtros.palavrasChave}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Autor</label>
                        <input
                            type="text"
                            className="form-control"
                            name="autor"
                            value={filtros.autor}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Ano</label>
                        <input
                            type="number"
                            className="form-control"
                            name="ano"
                            value={filtros.ano}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Curso</label>
                        <input
                            type="text"
                            className="form-control"
                            name="curso"
                            value={filtros.curso}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Tipo</label>
                        <select
                            className="form-select"
                            name="tipo"
                            value={filtros.tipo}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione...</option>
                            <option value="monografia">Monografia</option>
                            <option value="artigo_revista">Artigo de Revista</option>
                            <option value="artigo_congresso">Artigo de Congresso</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            name="status"
                            value={filtros.status}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione...</option>
                            <option value="em_andamento">Em Andamento</option>
                            <option value="concluida">Concluída</option>
                        </select>
                    </div>
                </div>

                {erro && <div className="alert alert-danger mt-3">{erro}</div>}

                <button className="btn btn-primary mt-4" onClick={buscarPublicacoes} disabled={carregando}>
                    {carregando ? 'Buscando...' : 'Buscar'}
                </button>
            </div>

            {/* Resultados da busca */}
            <div className="card p-4">
                <h2>Resultados</h2>
                {carregando ? (
                    <p>Carregando...</p>
                ) : resultados.length > 0 ? (
                    <ul className="list-group">
                        {resultados.map((item) => (
                            <li key={item.id} className="list-group-item">
                                <h5>{item.name}</h5>
                                <p>{item.body}</p>
                                <small>Email do Autor: {item.email}</small>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum resultado encontrado.</p>
                )}
            </div>
        </div>
    );
}

export default Busca;
