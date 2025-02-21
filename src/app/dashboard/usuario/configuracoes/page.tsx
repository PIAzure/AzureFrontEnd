'use client';
import Image from 'next/image';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    const [dados, setDados] = useState({ name: '',email:'', password: '', confirmSenha: '', imagefield: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState({ password: false, confirmSenha: false });
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [senhaError, setSenhaError] = useState<string | null>(null);
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            const storedUserData = localStorage.getItem('user');
            
            if (!token || !storedUserData) {
                router.push('/auth/usuario');
                return;
            }
        
            const user = JSON.parse(storedUserData);
            setDados(user);
            setPreviewSrc(user.image || '');
            setToken(token);
        }
    }, [router]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDados((prevDados) => ({
          ...prevDados,
          [name]: value,
        }));
      };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const maxFileSize = 10 * 1024 * 1024;
    
        if (!file) return;
    
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
          alert('Formato inválido!\nPor favor, envie um arquivo de imagem (PNG, JPEG, ou GIF).');
          return;
        }
    
        if (file.size > maxFileSize) {
          alert('Tamanho inválido!\nO tamanho máximo permitido é até 10MB.');
          return;
        }
    
        displayPreview(file);
    };

    const displayPreview = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreviewSrc(reader.result as string);
        };
    };

    const handleRemoveImage = () => {
        setPreviewSrc(null);
    };

    const email = dados.email;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSenhaError(null);

        if (!previewSrc) {
            alert("É necessário selecionar uma foto de perfil antes de prosseguir!");
            return;
        }

        if (dados.password !== dados.confirmSenha) {
            setSenhaError('As senhas não correspondem. Por favor, verifique e tente novamente.');
            return;
        }

        const formData = new FormData();
        formData.append('name', dados.name);
        formData.append('password', dados.password);
        formData.append('isadmin', 'false');
        formData.append('isactive', 'true');
        if (previewSrc) {
            const file = dataURLtoFile(previewSrc, 'profile-image.png');
            formData.append('imagefield', file);
        }

        try {
            const url = `http://127.0.0.1:8080/users/${email}/`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status !== 200) {
                throw new Error(`Falha ao atualizar usuário! Código de status: ${response.status}`);
            }

            setIsModalOpen(false);
            alert("Alteração realizada com sucesso!");
            
            setPreviewSrc(null);
            setSenhaError(null);
            setShowPassword({ password: false, confirmSenha: false });

        } catch (error) {
            console.error("Erro ao enviar dados para o backend", error);
            alert('Erro ao atualizar o usuário. Tente novamente mais tarde.');
        }
    };

    const dataURLtoFile = (dataurl: string, filename: string) => {
        const arr = dataurl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) {
            throw new Error("Formato de imagem inválido");
        }
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleEditClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="flex h-screen overflow-hidden border border-white">
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
                    <h1 className="text-lg font-semibold">Configurações do Perfil</h1>
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

            <div className="flex-1 bg-white text-black pl-64 pr-6 pt-20 overflow-auto" style={{ marginTop: '4rem', height: 'calc(100vh - 4rem)' }}>
                <div className="flex justify-center items-center h-full">
                    <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray ">
                        <img
                            src="/images/usuario1.png"
                            alt="Usuário"
                            className="mx-auto h-24 w-24 rounded-full object-cover mb-4"
                        />
                        <div>
                            <p className="font-bold text-sm"> {dados?.name || 'Usuário'} </p>
                            <p className="text-xs text-gray-300"> {dados?.email || 'email@exemplo.com'} </p>
                        </div>
                        
                        <button
                            className="mt-4 inline-flex items-center gap-2 rounded-md px-4 py-4 text-sm text-gray-500 hover:text-gray-700 focus:relative border border-dark-gray "
                            onClick={handleEditClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                            
                            Editar Dados
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && ( 
               <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
               <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
                 <h2 className="text-2xl font-bold mb-4">Alterar Dados do Usuário</h2>
                 <form onSubmit={handleSubmit} className="space-y-4">
                   <div
                     className="relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                     id="dropzone"
                   >
                     <input
                       type="file"
                       className="absolute inset-0 w-full min-h-full opacity-0 z-50"
                       onChange={handleFileChange}
                     />
                     {previewSrc ? (
                       <Image
                         src={previewSrc}
                         className="mt-4 mx-auto max-h-40"
                         alt="Preview"
                         width={160}
                         height={160}
                       />
                     ) : (
                       <div className="text-center">
                         <Image
                           className="mx-auto h-12 w-12"
                           src="https://www.svgrepo.com/show/357902/image-upload.svg"
                           alt="Upload Icon"
                           width={48}
                           height={48}
                         />
                         <h3 className="mt-2 text-sm font-medium text-gray-900">
                           <span>Arraste e solte</span>
                           <span className="text-indigo-600"> ou clique </span>
                           <span>para fazer upload da sua foto de perfil</span>
                         </h3>
                         <p className="mt-1 text-xs text-gray-500">PNG, JPEG ou GIF até 10MB</p>
                       </div>
                     )}
                   </div>
                   {previewSrc && (
                     <button
                       type="button"
                       onClick={handleRemoveImage}
                       className="inline-block rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white"
                     >
                       Remover
                     </button>
                   )}
                   <div>
                     <input
                       type="text"
                       className="w-full rounded-lg border border-gray-200 p-4 text-sm"
                       placeholder="Digite seu nome completo"
                       value={dados.name}
                       onChange={handleChange}
                       name="name"
                       required
                       minLength={8}
                     />
                   </div>
                   <div className="relative">
                        <input
                            type={showPassword.password ? 'text' : 'password'}
                            className="w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm"
                            placeholder="Digite sua senha"
                            value={dados.password}
                            onChange={handleChange}
                            name="password"
                            required
                            minLength={8}
                        />
                        <span
                            className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer"
                            onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                        >
                            {showPassword.password ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7a10.05 10.05 0 012.875-4.825M6.938 8.15A6.022 6.022 0 0112 6c2.84 0 5.148 1.826 5.875 4.261m-1.89 4.558A6.021 6.021 0 0112 18c-2.84 0-5.148-1.826-5.875-4.261"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3l18 18"
                                    />
                                </svg>
                            )}
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword.confirmSenha ? 'text' : 'password'}
                            className="w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm"
                            placeholder="Confirme sua senha"
                            value={dados.confirmSenha}
                            onChange={handleChange}
                            name="confirmSenha"
                            required
                            minLength={8}
                        />
                        <span
                            className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer"
                            onClick={() => setShowPassword({ ...showPassword, confirmSenha: !showPassword.confirmSenha })}
                        >
                            {showPassword.confirmSenha ? (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7a10.05 10.05 0 012.875-4.825M6.938 8.15A6.022 6.022 0 0112 6c2.84 0 5.148 1.826 5.875 4.261m-1.89 4.558A6.021 6.021 0 0112 18c-2.84 0-5.148-1.826-5.875-4.261"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3l18 18"
                                />
                            </svg>  
                            )}
                        </span>
                        <button
                       type="button"
                       onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                       className="absolute right-4 top-4 text-gray-400"
                     >
                     </button>
                   </div>
                   {senhaError && <p className="text-red-500 text-sm">{senhaError}</p>}
                   <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-4 py-2 bg-gray text-white rounded-md"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-cian text-white rounded-md">
                            Salvar Alterações
                        </button>
                    </div>
                 </form>
               </div>
             </div> 
            )}
        </div>
    );
}

