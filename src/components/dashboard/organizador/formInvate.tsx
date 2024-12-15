import { IEvent } from '@/utils/interface'
import Link from 'next/link'
import React, { useState } from 'react'

interface IProps {
    isOpen: Function
    evento: IEvent
}

export function FormInvate({ isOpen, evento}: IProps) {
    const [email, setEmail]= useState('');
    
    const sendInvate = async () => {
        const url = process.env.NEXT_PUBLIC_BE_URL;
        if (email!== '') {
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
                isOpen('criado'); // Fechar o modal ou fazer algo após a atualização

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
                {/* Content */}
                <div>
                    {/* Body */}
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-xl font-bold py-4">Você está preste a enviar um convite!</h2>
                        <p className="text-sm text-gray-500 px-8">
                            Adicione o email da conta do participante que deseja enviar o convite.
                        </p>
                    </div>

                    <div className='mb-[12px]'>
                            <label htmlFor="localizacao_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email da conta do oonvidado:</label>
                            <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>

                    <div className='flex gap-2 justify-center'>
                        <div onClick={() => { isOpen() }} className='cursor-pointer inline-block rounded-lg border border-cian px-5 py-3 text-sm font-medium text-cian'>
                            Cancelar
                        </div>
                        <div onClick={() => { sendInvate() }} className='cursor-pointer inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white'>
                            Enviar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
