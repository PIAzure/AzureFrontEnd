import React, { useState } from 'react'
import { FormCadastraEvento } from './formCadastraEvento'
import { FormUpdateEvento } from './formUpdateEvento';
import { View } from './view';
export function Eventos() {
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
    return (
        <section className='relative  w-full py-[40px] md:py-[60px] px-padrao'>
            {
                formCadastro == false && updateCadastro == false && view == false ?
                    <div className="max-w-padrao mx-auto px-padrao">
                        <h2 className='text-18px font-bold mb-[30px]'>Veja todos os seus eventos cadastrados</h2>
                        <div
                            onClick={() => { setFormCadastro(true) }}
                            className="mb-[30px] ml-auto cursor-pointer max-w-[100px] text-center rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                            + Evento
                        </div>
                        <div>
                            <div className='w-full md:w-[30%] relative block rounded-tr-3xl border border-gray-100'>
                                <span
                                    className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-blue px-6 py-4 font-medium uppercase tracking-widest text-white"
                                >
                                    Novidade
                                </span>

                                <img
                                    src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                    className="-ml-6 -mt-6 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
                                />

                                <div className="p-4">
                                    <svg onClick={() => { setView(true) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    <strong className="text-xl font-medium text-gray-900"> Evento X </strong>

                                    <div className='mb-[30px]'>
                                        <h2>Data: 18/12/2024</h2>
                                        <h2>Local: Rua jorge</h2>
                                    </div>

                                    <div className='w-full flex justify-between text-center'>
                                        <div
                                            onClick={() => {
                                                setUpdateCadastro(true)
                                            }}
                                            className="w-[48%] cursor-pointer inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            Editar
                                        </div>
                                        <div
                                            onClick={() => {

                                            }}
                                            className="w-[48%] cursor-pointer inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            deletar
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> : null
            }
            {
                formCadastro ?
                    <FormCadastraEvento isOpen={isOpenFormCadastro} /> : null
            }
            {
                updateCadastro ?
                    <FormUpdateEvento isOpen={isOpenUpdateCadastro} /> : null
            }
            {
                view ?
                    <View isOpen={isOpenView} /> : null
            }
        </section>
    )
}
