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

    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const email = user?.email;
    
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
        formData.append('isadmin', 'true');
        formData.append('isactive', 'true');
        if (previewSrc) {
            const file = dataURLtoFile(previewSrc, 'profile-image.png');
            formData.append('imagefield', file);
        }

        try {
            const url = ` http://127.0.0.1:8000/users/${email}/`;
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


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.push('/auth/administrador');
                return;
            }

            const storedUserData = localStorage.getItem('user');
            if (storedUserData) {
                const user = JSON.parse(storedUserData);
                setDados(user);
                setPreviewSrc(user.image);
            }
        }
    }, [router]);

    const handleEditClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="flex h-screen overflow-hidden border border-white">
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
            </div>

            <div className="flex-1 bg-white text-black pl-64 pr-6 pt-20 overflow-auto" style={{ marginTop: '4rem' }}>
                <div className="flex justify-center items-center h-full">
                    <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray">
                        <img
                            src="/images/usuario1.png"
                            alt="Usuário"
                            className="mx-auto h-24 w-24 rounded-full object-cover mb-4"
                        />
                        <div>
                            <p className="font-bold text-sm"> {dados?.name || 'Administrador'} </p>
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

