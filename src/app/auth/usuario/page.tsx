'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [dados, setDados] = useState({ email: '', senha: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDados((prevDados) => ({
            ...prevDados,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const url= process.env.NEXT_PUBLIC_BE_URL;
        e.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            const response = await fetch('http://127.0.0.1:8080/users/auth/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: dados.email,
                    password: dados.senha,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Falha na autenticação. Verifique seu nome de usuário e senha e tente novamente.');
                return;
            }

            const { Token, user } = await response.json();
            
            localStorage.setItem('authToken', Token.access);
            localStorage.setItem('user', JSON.stringify(user));
            
            if (user.isadmin) {
                router.push('/dashboard/administrador');
            } else {
                router.push('/dashboard/usuario');
            }
        } catch (error) {
            setErrorMessage('Erro de conexão com o servidor. Tente novamente mais tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main>
            <section className="relative flex flex-wrap lg:h-screen lg:items-center">
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-lg">
                        <div className="relative w-full h-[90px] mb-24px md:mb-32px">
                            <Image
                                className="object-contain object-left"
                                src={'/images/logo_sem_fundo.png'}
                                fill
                                alt="logo Azure"
                            />
                        </div>
                        <h1 className="text-28px md:text-32px lg:text-32px">Bem-vindo de volta à Azure!</h1>

                        <p className="mt-4 text-gray-500 max-w-[450px]">
                            Encontre e participe de eventos que fazem a diferença para você! Faça o login para
                            descobrir, participar e se voluntariar nos eventos que mais combinam com seus interesses.
                            Envolva-se em experiências enriquecedoras organizadas por especialistas e entusiastas de
                            diversas áreas.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto mb-0 mt-8 max-w-lg space-y-4"
                    >
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>

                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Digite seu e-mail"
                                    required
                                    name="email"
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
                            <label htmlFor="password" className="sr-only">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Digite sua senha"
                                    minLength={8}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
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
                                                d="M3 3l18 18"
                                            />
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </div>

                        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Não tem conta?{' '}
                                <a
                                    className="underline hover:text-cian"
                                    href="/auth/usuario/criar-conta"
                                >
                                    Cadastre-se
                                </a>
                            </p>

                            <button
                                type="submit"
                                className="inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Entrando...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="relative order-first h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                    <Image
                        className="object-cover"
                        src={'/images/usuário_eventos.jpg'}
                        fill
                        alt="imagem de participantes em um evento"
                    />
                </div>
            </section>
        </main>
    );
}
