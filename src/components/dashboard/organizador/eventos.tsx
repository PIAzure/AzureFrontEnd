import React, { useEffect, useState } from 'react'
import { FormCadastraEvento } from './formCadastraEvento'
import { FormUpdateEvento } from './formUpdateEvento';
import { View } from './view';
import { IEvent } from '@/utils/interface';
import { PopUpDelete } from './popUpDelete';

export function Eventos() {
    const [popUpDelete, setDelete] = useState(false)
    const urlBE = 'https://3ed8-2804-828-f230-1639-a30c-b8a1-fc45-378.ngrok-free.app'
    const [eventoSelecionado, setEvento] = useState<IEvent | null>(null)
    const [formCadastro, setFormCadastro] = useState(false);
    const [updateCadastro, setUpdateCadastro] = useState(false);
    const [view, setView] = useState(false);
    function isOpenFormCadastro() {
        setFormCadastro(false)
    }
    function isOpenUpdateCadastro() {
        setUpdateCadastro(false)
    }
    function isOpenView() {
        setView(false)
    }
    function isOpenPopUpDelete() {
        setDelete(false)
    }

    function formateData(data: string) {
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
        return dataFormatada;
    }

    const [data, setData] = useState<IEvent[] | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('useEffect executado');
        const user = localStorage.getItem('user');
        if (user) {
            console.log('Usuário encontrado no localStorage:', user);
            const userObj = JSON.parse(user);
            const email = userObj.email;
            
            fetch('https://3ed8-2804-828-f230-1639-a30c-b8a1-fc45-378.ngrok-free.app/events/teste2111@gmail.com/', {
                headers: {
                    'Accept': 'application/json',
                },
            })
            .then((response) => {
                console.log('Resposta bruta:', response);
                return response.text(); // Alterado para text() para inspecionar o conteúdo
            })
            .then((data) => {
                console.log('Resposta do servidor:', data);
                // Converta o texto para JSON somente se for válido
                try {
                    const jsonData = JSON.parse(data);
                    setData(jsonData);
                } catch (error) {
                    console.error('Erro ao parsear JSON:', error, 'Dados recebidos:', data);
                }
            })
            .catch((err) => console.error('Erro no fetch:', err));
        }
    }, [popUpDelete, updateCadastro]);
    

    return (
        <section className='relative  w-full py-[40px] md:py-[60px] px-padrao'>
            <div className='flex max-w-padrao mx-auto mb-[30px]'>
                <h2 className='text-18px font-bold '>Veja todos os seus eventos cadastrados</h2>
                <div
                    onClick={() => { setFormCadastro(true) }}
                    className="mb-[30px] ml-auto cursor-pointer max-w-[100px] text-center rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                    + Evento
                </div>
            </div>
            {
                formCadastro == false && updateCadastro == false && view == false ?
                    <div className='w-full'>
                        {data != null ?
                            <div className='w-full flex flex-wrap gap-4'>
                                {
                                    data.map((evento, index) => {
                                        return (
                                            <div className="w-full md:w-[50%] 2xl:w-[30%]" key={index}>
                                                <div className='w-full relative block rounded-tr-3xl border border-gray-100'>


                                                    <img
                                                        src={`${urlBE}${evento.banner}`}
                                                        alt=""
                                                        className="h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
                                                    />

                                                    <div className="p-4">
                                                        <svg onClick={() => { setView(true) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                        <div className='mb-[30px]'>
                                                            <h2>Data: {formateData(evento.timeDate)}</h2>
                                                            <h2>Local: {evento.location}</h2>
                                                        </div>

                                                        <div className='w-full flex justify-between text-center'>
                                                            <div
                                                                onClick={() => {
                                                                    setUpdateCadastro(true)
                                                                    setEvento(evento)
                                                                }}
                                                                className="w-[48%] cursor-pointer inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                            >
                                                                Editar
                                                            </div>
                                                            <div
                                                                onClick={() => {
                                                                    setDelete(true)
                                                                    setEvento(evento)
                                                                }}
                                                                className="w-[48%] cursor-pointer inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                            >
                                                                deletar
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div> : null
                        }
                    </div>
                    : null
            }
            {
                formCadastro ?
                    <FormCadastraEvento isOpen={isOpenFormCadastro} /> : null
            }
            {
                updateCadastro && eventoSelecionado ?
                    <FormUpdateEvento isOpen={isOpenUpdateCadastro} evento={eventoSelecionado} /> : null
            }
            {
                view ?
                    <View isOpen={isOpenView} /> : null
            }
            {
                popUpDelete && eventoSelecionado ?
                    <PopUpDelete isOpen={isOpenPopUpDelete} evento={eventoSelecionado} /> : null
            }
        </section>
    )
}
