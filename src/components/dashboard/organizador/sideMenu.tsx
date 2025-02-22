'use client'
import Image from 'next/image';
import React, { useState } from 'react'
interface IProps{
    changeChild:Function
}
export function SideMenu({changeChild}:IProps) {
    const [isDashboard, setIsDashboard] = useState('Home');
    const [isOpen, setIsOpen] = useState(true);
    const sair =()=>{
        localStorage.removeItem('organizator');
        localStorage.removeItem('authTokenOrganizator')
        if (window) {
            window.location.reload(); // Recarrega a página após seguir com sucesso
        }
    }
    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                // Conditional class based on isOpen 
                // state to control width and visibility
                className={` bg-middle-blue text-white 
                      fixed h-screen transition-all 
                      duration-300 z-10 
                      ${isOpen ? 'w-60' : 'w-0 overflow-hidden'
                    }`}>
                <div className='relative mx-auto w-[50%] h-[30px] mt-[40px] mb-[20px]'>
                <Image src={'/images/azure_sem_fundo_branca.png'} className='object-contain' fill alt='logo azure'/>
                </div>
                <div className="flex w-full flex-col items-center">
                    <div onClick={()=>{changeChild('Home');setIsDashboard('Home')}} className={`py-[15px] text-center w-full ${isDashboard=='Home'?'bg-white text-middle-blue font-extrabold':''}`}>
                        <span>
                            Home
                        </span>
                    </div>
                    <div onClick={()=>{changeChild('Eventos');setIsDashboard('Eventos')}} className={`py-[15px] text-center w-full ${isDashboard=='Eventos'?'bg-white text-middle-blue font-extrabold':''}`}>
                        <span>
                            Eventos
                        </span>
                    </div>
                    <div onClick={()=>{changeChild('Configurações');setIsDashboard('Configurações')}} className={`py-[15px] text-center w-full ${isDashboard=='Configurações'?'bg-white text-middle-blue font-extrabold':''}`}>
                        <span>
                            Configurações
                        </span>
                    </div>
                    <div onClick={()=>{sair()}} className={`py-[15px] text-center w-full hover:cursor-pointer ${isDashboard=='Configurações'?'':''}`}>
                        <span>
                            Sair
                        </span>
                    </div>
                </div>
            </div>
            {/* Main content */}
            <div className={`flex-1 p-4 
                          ${isOpen ? 'ml-64 ' : 'ml-0'}`}>
                {/* Button to toggle sidebar */}
                <div className="ml-auto">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 
                         text-blue font-bold py-2 px-4 rounded"
                        onClick={() => setIsOpen(!isOpen)}>
                        {/* Toggle icon based on isOpen state */}
                        {isOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
