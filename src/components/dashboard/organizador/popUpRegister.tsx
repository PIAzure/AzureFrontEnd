import Link from 'next/link'
import React from 'react'

export function PopUpRegister() {


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
                       
                        <h2 className="text-xl font-bold py-4">Pronto sua conta foi criada</h2>
                        <p className="text-sm text-gray-500 px-8">
                            Agora você pode logar e gerenciar seus eventos.
                        </p>
                    </div>
                    {/* Footer */}
                    <div className="p-3 mt-2 text-center space-x-4 md:block">
                        <Link className='inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white' href={'/auth/organizador/'}>
                            Entrar na minha conta
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
