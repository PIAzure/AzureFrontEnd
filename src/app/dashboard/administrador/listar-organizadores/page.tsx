'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    const [userData, setUserData] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const storedUser = localStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const usersPerPage = 6;
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (!storedUserData) {
            router.push('/auth/usuario');
            return;
        }

        setUserData(JSON.parse(storedUserData));
        fetchUsers();
    }, [router]);

    useEffect(() => {
        const filteredUsers = users.filter((user) => currentUser && user.email !== currentUser.email);
        setTotalPages(Math.ceil(filteredUsers.length / usersPerPage));
    }, [users, currentUser]);

    const currentUsers = users
    .filter((user) => currentUser && user.email !== currentUser.email)
    .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://27ce-200-134-81-82.ngrok-free.app/organization/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar os organizadores. Verifique suas credenciais.');
            }

            const data = await response.json();
            const normalizedUsers = data.map((org: any) => org.users);
            setUsers(normalizedUsers);

            setTotalPages(Math.ceil(data.length / usersPerPage));
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro ao buscar os organizadores.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.push('/auth/usuario');
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    
    const handleDeleteUser = (user: any) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    const confirmDelete = async () => {
        if (!selectedUser?.email) {
            setError('Usuário selecionado é inválido ou não foi encontrado.');
            return;
        }
    
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Token de autenticação não encontrado. Por favor, faça login novamente.');
            return;
        }
    
        try {
            const response = await fetch(`https://27ce-200-134-81-82.ngrok-free.app/users/${selectedUser.email}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.detail || 'Erro ao excluir o organizador. Verifique as permissões ou o servidor.';
                throw new Error(errorMessage);
            }
    
            setUsers((prevUsers) => prevUsers.filter((user) => user.email !== selectedUser.email));
    
            setShowModal(false);
    
            setTimeout(() => {
                alert(`Organizador "${selectedUser.email}" excluído com sucesso!`);
            }, 300);
        } catch (err: any) {
            setError(err.message || 'Erro ao excluir o organizador.');
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div className="flex h-screen border border-white">
            <div className="absolute top-0 left-64 right-0 z-10 border border-white h-16">
                <section className="relative flex justify-between items-center p-4 bg-cian text-white h-full">
                    <Link href="/dashboard/administrador" passHref>
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
                    <h1 className="text-lg font-semibold">Gerenciamento de Organizadores de Eventos</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="flex items-center space-x-3">
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
                                    <Link
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
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold text-center">Confirmar Exclusão</h2>
                        <p className="mt-4 text-center">Você tem certeza de que deseja excluir o organizador: <strong>{selectedUser?.name}</strong>?</p>
                        <div className="mt-6 flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray text-white rounded-lg"
                                onClick={cancelDelete}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                onClick={confirmDelete}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 bg-white text-white" style={{ marginTop: '15rem' }}>
                {loading ? (
                    <p className="text-flex text-gray-600">Carregando organizadores...</p>
                ) : error ? (
                    <p className="text-flex text-red-500">{error}</p>
                ) : (
                    <>
                        <div className="p-8">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                                {currentUsers
                                    .filter((user) => currentUser && user.email !== currentUser.email)
                                    .map((user) => (
                                    <div key={user.email} 
                                        className="h-32 rounded-lg bg-gray-200 bg-cian flex items-center justify-left px-4 py-2">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                                            <Image
                                                src={'/images/usuario1.png'}
                                                alt={`Logo organizador de ${user.name}`}
                                                width={48}
                                                height={48}
                                            />
                                            </div>
                                        
                                            <div className="ml-4 flex flex-col justify-between">
                                                <div className="flex items-center">
                                                    <p className="font-bold text-sm mr-2">Nome:</p>
                                                    <p className="text-sm text-white">{user.name}</p>
                                                </div>
                                        
                                                <div className="flex items-center mt-2">
                                                    <p className="font-bold text-sm mr-2">Email:</p>
                                                    <p className="text-sm text-white">{user.email}</p>
                                                </div>
                                            </div>
                                        
                                            <div className="ml-auto flex items-center justify-center text-white-600">
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="inline-block px-6 p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                                                    title="Deletar Usuário"
                                                >
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
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                    </div>
                                ))}
                                </div>
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-10 flex justify-center text-cian">
                                        <div className="bg-white text-cian inline-flex items-center justify-center gap-3 mt-6">
                                            <button
                                                disabled={currentPage === 1}
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className="inline-flex items-center justify-center rounded border border-gray-100 bg-light-gray text-gray-900"
                                                title="Página anterior"
                                            >
                                                🢠
                                            </button>
                                            <p className="text-xs text-cian">
                                                {currentPage} / {totalPages}
                                            </p>
                                            <button
                                                disabled={currentPage === totalPages}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className="inline-flex items-center justify-center rounded bg-cian border border-gray-100 bg-light-gray text-cian"
                                                title="Próxima página"
                                            >
                                                🢡
                                            </button>
                                        </div>
                                    </div>
                                )}
                    </>
                )}
            </div>
        </div>
    );
}