import { IEvent } from '@/utils/interface'
import Link from 'next/link'
import React from 'react'

interface IProps {
    isOpen: Function
    idVoluntario: string
}

export function PopUpDeleteVoluntarioEvento({ isOpen, idVoluntario }: IProps) {
    const url= process.env.NEXT_PUBLIC_BE_URL;
    const deleteVoluntarioEscala = async () => {
        try {
            const response = await fetch(`${url}/scale/${idVoluntario}/`, {
                method: 'DELETE', // Método DELETE para remover o evento
                headers: {
                    'Content-Type': 'application/json',
                    // Se necessário, adicione tokens de autenticação ou outros cabeçalhos aqui
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete event: ${response.status}`);
            }

            const result = await response.json();
            console.log('Event deleted successfully:', result);
            isOpen();
            // Aqui você pode fazer algo depois de excluir o evento (por exemplo, atualizar a lista de eventos)

        } catch (error) {
            console.error('Error deleting event:', error);
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

                        <h2 className="text-xl font-bold py-4">Tem certeza que deseja deletar esse voluntário da escala?</h2>
                        <p className="text-sm text-gray-500 px-8">
                            Essa ação é irreversivél
                        </p>
                    </div>
                    {/* Footer */}
                    <div className='flex gap-2 justify-center'>
                        <div onClick={() => { isOpen() }} className='cursor-pointer inline-block rounded-lg border border-cian px-5 py-3 text-sm font-medium text-cian'>
                            Cancelar
                        </div>
                        <div onClick={() => { deleteVoluntarioEscala() }} className='cursor-pointer inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white'>
                            Deletar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
