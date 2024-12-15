import { IEvent } from '@/utils/interface'
import Link from 'next/link'
import React, { useState } from 'react'

interface IProps {
    isOpen: Function
    evento: IEvent
}

export function FormInvate({ isOpen, evento }: IProps) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [finish, setFinish] = useState(false);
    const sendInvate = async () => {
        const url = process.env.NEXT_PUBLIC_BE_URL;
        if (email !== '') {
            const formData = new FormData();
            formData.append('user', email);
            formData.append('event', evento.id.toString());

            try {
                const response = await fetch(`${url}/invite`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Failed to update event: ${response.status}`);
                }

                const result = await response.json();
                console.log('Event updated successfully:', result);
                if (result.msg == 'error invite') {
                    setError(true)
                }
                else {
                    setFinish(true)
                }
            } catch (error) {
                console.error('Error updating event:', error);
            }
        }
    };

    return (
        <div
            className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center bg-[#000000a1] items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
            id="modal-id"
        >
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">

                {
                    error == false && finish == false ?
                        <div>
                            {/* Body */}
                            <div className="mb-[24px]">
                                <h2 className="text-xl font-bold py-4">Você está preste a enviar um convite!</h2>
                                <p className="text-sm text-gray-500 ">
                                    Adicione o email da conta do participante que deseja enviar o convite.
                                </p>
                            </div>

                            <div className='mb-[12px]'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email da conta do convidado:</label>
                                <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>

                            <div className='flex gap-2 justify-end'>
                                <div onClick={() => { isOpen() }} className='cursor-pointer inline-block rounded-lg border border-cian px-5 py-3 text-sm font-medium text-cian'>
                                    Cancelar
                                </div>
                                <div onClick={() => { sendInvate() }} className='cursor-pointer inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white'>
                                    Enviar
                                </div>
                            </div>
                        </div> : error && finish == false ?
                            <div>
                                <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                                    <strong className="block font-medium text-red-800">Erro ao enviar convite! </strong>

                                    <p className="mt-2 text-sm text-red-700 mb-[24px]">
                                        Esse e-mail pode não ter uma conta cadastrada em nossa plataform.
                                    </p>
                                    <div className='flex gap-2 justify-end'>
                                        <div onClick={() => { isOpen() }} className='cursor-pointer inline-block rounded-lg border border-cian px-5 py-3 text-sm font-medium text-cian'>
                                            Fechar
                                        </div>
                                        <div onClick={() => { setError(false) }} className='cursor-pointer inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white'>
                                            Tentar novamente
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <div>
                                <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
                                    <div className="flex items-start gap-4">
                                        <span className="text-green-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </span>

                                        <div className="flex-1">
                                            <strong className="block font-medium text-gray-900">Convite enviado! </strong>

                                            <p className="mt-1 text-sm text-gray-700 mb-[24px]">
                                                Pronto seu convite foi enviado com sucesso.
                                            </p>
                                            <div className='flex gap-2 justify-end'>
                                                <div onClick={() => { isOpen() }} className='cursor-pointer inline-block rounded-lg border border-cian px-5 py-3 text-sm font-medium text-cian'>
                                                    Fechar
                                                </div>
                                                <div onClick={() => { setFinish(false) }} className='cursor-pointer inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white'>
                                                    Enviar mais convite
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}
