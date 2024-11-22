'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Page() {
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/auth/usuario');
            return;
        }

        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.push('/auth/usuario');
    };

    return (
        <div className="flex h-screen border border-white">
            <div className="absolute top-0 left-64 right-0 z-10 border border-white h-16">
                <section className="relative flex justify-between items-center p-4 bg-cian text-white h-full">
                    <h1 className="text-lg font-semibold">Bem-vindo à Azure!</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white">
                                    <Image
                                        src='/images/usuario1.png'
                                        alt= "Foto do Usuário"
                                        width= {48}
                                        height= {48}
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-sm"> {userData?.name || 'Usuário'} </p>
                                    <p className="text-xs text-gray-300"> {userData?.email || 'email@exemplo.com'} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="w-64 flex flex-col justify-between border border-white bg-cian">
                <div className="flex flex-col items-left p-4 bg-cian border border-cian">
                    <div className="mb-7 mx-auto bg-light-gray p-4 rounded-lg">
                        <Image
                            className="object-contain object-left"
                            src="/images/logo_sem_fundo.png"
                            height={120}
                            width={120}
                            alt="Logo Azure"
                        />
                    </div>
                    <div className="border-t text-white border-white bg-cian">
                        <div className="px-1 mt-2">
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href="/dashboard/administrador"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                        <span className="text-sm">Início</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/administrador/listar-organizadores"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                        </svg>
                                        <span className="text-sm">Gerenciar organizadores</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/administrador/listar-usuarios"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                        </svg>
                                        <span className="text-sm">Gerenciar usuários</span>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="/dashboard/administrador/configuracoes"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 opacity-75"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span className="text-sm">Configurações</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sticky inset-x-0 bottom-0 border-t border-white p-2 text-red-500">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="group relative flex w-full justify-center space-x-2 rounded-xl px-4 py-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span className="text-sm text-red-500">Sair</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white text-black " style={{ marginTop: '4rem' }}>
            </div>
        </div>
    );
}