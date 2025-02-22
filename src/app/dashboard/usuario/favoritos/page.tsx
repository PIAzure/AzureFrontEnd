'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Page() {
    const [popUpDelete, setDelete] = useState(false)
    const url = process.env.NEXT_PUBLIC_BE_URL;
    const [updateCadastro, setUpdateCadastro] = useState(false);
    const [view, setView] = useState(false);
    const [data, setData] = useState<any>(null);
    const [follow, setFollow] = useState<any>(null);
    const [userData, setUser] = useState({ name: '', email: '' })
    const [error, setError] = useState(false);
    const [finish, setFinish] = useState(false);
    const followOrg = async (organizador: string) => {
        const user: string | null = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            const url = process.env.NEXT_PUBLIC_BE_URL;
            if (url) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/follow/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "user": userObj.email,
                            "organizator": organizador
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to update event: ${response.status}`);
                    }

                    const result = await response.json();
                    console.log('Event updated successfully:', result);
                    if (window) {
                        window.location.reload(); // Recarrega a página após seguir com sucesso
                    }
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
        }
    };
    const unfollow = async (organizador: string) => {
        const user: string | null = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            const url = process.env.NEXT_PUBLIC_BE_URL;
            if (url) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/follow/${userObj.email}/unfollow/${organizador}/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to update event: ${response.status}`);
                    }

                    const result = await response.json();
                    console.log('Event updated successfully:', result);
                    if (window) {
                        window.location.reload(); // Recarrega a página após seguir com sucesso
                    }
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
        }
    };
    useEffect(() => {
        console.log('useEffect executado');
        const user: string | null = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            const email = userObj.email;
            setUser({ name: userObj.name, email: userObj.email })


            fetch(`http://127.0.0.1:8000/organization/`, {
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
                        console.log(jsonData,  'empresas qaq')
                    } catch (error) {
                        console.error('Erro ao parsear JSON:', error, 'Dados recebidos:', data);
                    }
                })
                .catch((err) => console.error('Erro no fetch:', err));

            fetch(`http://127.0.0.1:8000/follow/${userObj.email}/`, {
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
                        setFollow(jsonData);
                    } catch (error) {
                        console.error('Erro ao parsear JSON:', error, 'Dados recebidos:', data);
                    }
                })
                .catch((err) => console.error('Erro no fetch:', err));
        }
    }, [popUpDelete, updateCadastro]);

    useEffect(()=>{
        console.log(follow, data)
    },[data,follow])

    return (
        <div className="flex h-screen border border-white">
            <div className="absolute top-0 left-64 right-0 z-10 border border-white h-16">
                <section className="relative flex justify-between items-center p-4 bg-cian text-white h-full">
                    <Link href="/dashboard/usuario" passHref>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                />
                            </svg>
                        </div>
                    </Link>
                    <h1 className="text-lg font-semibold items-center">Siga os melhores organizadores</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white">
                                    <Image
                                        src='/images/usuario1.png'
                                        alt="Foto do Usuário"
                                        width={48}
                                        height={48}
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
                                        href="/dashboard/usuario"
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
                                        href="/dashboard/usuario/eventos"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>
                                        <span className="text-sm">Eventos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/inscricoes_voluntario"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                                        </svg>

                                        <span className="text-sm">Inscrições como voluntariado</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/inscricoes_participante"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>

                                        <span className="text-sm">Inscrições como participante</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/lista_de_espera"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 3h12M6 21h12M8 3v2a6 6 0 0 0 4 5.659V13.34A6 6 0 0 0 8 19v2m8-18v2a6 6 0 0 1-4 5.659V13.34A6 6 0 0 1 16 19v2"/>
                                        </svg>
                                        <span className="text-sm">Lista de Espera</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/favoritos"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <Image src={'/images/cora.png'} width={30} height={30} alt='' />
                                        <span className="text-sm">Favoritos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/notificacoes"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <Image src={'/images/noti.png'} width={30} height={30} alt='' />
                                        <span className="text-sm">Notificações</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/convites"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 16.5v-9m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 7.5m19.5 0L12 13.5 2.25 7.5" />
                                        </svg>
                                        <span className="text-sm">Convites</span>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="/dashboard/usuario/configuracoes"
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
            </div>

            <div className="flex-1 bg-white text-black" style={{ marginTop: '4rem', overflow: 'auto' }}>
                <section className='py-pyMob md:py-pyDesk'>
                    <div className='max-w-padrao mx-auto px-padrao'>
                      <div>
                        {
                            data?
                            <div key={'sdfsdf'} className='flex flex-wrap gap-5'>
                                  {
                            data.map((org: any) => {
                                console.log(org)
                                const organizadoresExistentes = new Set(follow.map((fo: any) => fo.organizator));
                                return (
                                    <div key={org.name} className='p-[20px] w-[300px] text-center rounded-lg bg-blue text-white max-w-[300px] text-center'>
                                        <div className='relative mx-auto w-[50px] h-[50px] overflow-hidden rounded-lg mb-[12px]'>

                                            <Image src={`http://127.0.0.1:8000/${org?.users.imagefield}`} fill alt='' />
                                        </div>
                                        <h2 className='font-semibold mb-[12px]'>{org.users.name}</h2>
                                        <div className='flex gap-3 justify-center'>
                                            {
                                                !organizadoresExistentes.has(org.users.email) ?
                                                    <button onClick={()=>{followOrg(org.users.email)}} className='bg-white text-blue px-[20px] py-[8px] rounded-full'>
                                                        Seguir +
                                                    </button > : <button onClick={()=>{unfollow(org.users.email)}} className='bg-white text-blue px-[20px] py-[8px] rounded-full'>
                                                        Parar de seguir
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                )

                            })
                        }
                            </div>:null
                        }
                      </div>
                    </div>
                </section>
            </div>
        </div>
    );
}