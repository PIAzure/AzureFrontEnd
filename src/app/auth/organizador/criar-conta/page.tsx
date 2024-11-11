'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [dados, setDados] = useState({ nome: '', email: '', senha: '', confirmSenha: '', foto: '' });
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDados((prevDados) => ({
            ...prevDados,
            [name]: value
        }));
    };
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add("border-indigo-600");
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-indigo-600");
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-indigo-600");
        const file = e.dataTransfer.files[0];
        if (file) {
            displayPreview(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            displayPreview(file);
        }
    };

    const displayPreview = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSrc(reader.result as string);
        };
    };

    useEffect(() => {
        console.log(dados)
    }, [dados])
    return (
        <main>
            <section className="relative flex flex-wrap lg:min-h-screen">
                <div className="w-full  py-[30px] md:py-[60px] lg:w-1/2 px-padrao">
                    <div className="mx-auto max-w-lg">
                        <div className='relative w-full mb-24px md:mb-32px'>
                            <Image className='object-contain object-left' src={'/images/logo_sem_fundo.png'} fill alt='logo Azure' />
                        </div>
                        <h1 className="text-28px md:text-32px lg:text-32px">Bem-vindo de volta à Azure!</h1>

                        <p className="mt-4 text-gray-500 max-w-[450px]">
                            Crie e gerencie seus eventos de forma simples e eficiente!
                            Faça login para organizar seus eventos, montar sua lista de participantes e recrutar voluntários.
                        </p>
                    </div>

                    <form action="#" className="mx-auto mb-0 mt-8 max-w-lg space-y-4">
                        <div
                            className="w-full max-w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                            id="dropzone"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 w-full min-h-full opacity-0 z-50"
                                onChange={handleFileChange}
                            />
                            {
                                previewSrc? null:
                                <div className="text-center">
                                <Image
                                    className="mx-auto h-12 w-12"
                                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                    alt="Upload Icon"
                                    width={48}
                                    height={48}
                                />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    <label htmlFor="file-upload" className="relative cursor-pointer">
                                        <span>Drag and drop</span>
                                        <span className="text-indigo-600"> or browse</span>
                                        <span> to upload</span>
                                    </label>
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                            }

                            {previewSrc && (
                                <Image
                                    src={previewSrc}
                                    className="mt-4 mx-auto max-h-40"
                                    alt="Preview"
                                    width={160}
                                    height={160}
                                />
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Nome</label>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Digite seu nome completo"
                                    required
                                    minLength={8}
                                    name='nome'
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>

                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Digite seu e-mail"
                                    required
                                    name='email'
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
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
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='senha'
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Digite sua senha"
                                    minLength={8}
                                    maxLength={8}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                    onClick={() => setShowPassword(!showPassword)}>

                                    {showPassword ? (
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
                                                d="M3 3l18 18" />
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='confirmSenha'
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Confirme sua senha"
                                    minLength={8}
                                    maxLength={8}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                    onClick={() => setShowPassword(!showPassword)}>

                                    {showPassword ? (
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
                                                d="M3 3l18 18" />
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Já possuí conta?{' '}
                                <a className="underline hover:text-cian" href="/auth/organizador/">login</a>
                            </p>

                            <button
                                type="submit"
                                className="inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white"
                            >
                                Cadastrar-se
                            </button>
                        </div>
                    </form>
                </div>
                <div className="relative order-first w-full  lg:w-1/2">
                    <Image className='object-cover' src={'/images/palestra.jpg'} fill alt='imagem de palestra' />
                </div>
            </section>
        </main>
    )
}
