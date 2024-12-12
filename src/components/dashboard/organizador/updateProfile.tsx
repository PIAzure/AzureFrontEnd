import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { IEvent } from '@/utils/interface';
import { PopUpRegisterEvent } from './popUpRegisterEvent';
import { PopUpUpdateProfile } from './popUpUpdateProfile';
// import CronogramaModal from './escala';
interface IProps {
    isOpen: Function
}
export function UpdateProfile({ isOpen }: IProps) {
    const [dados, setDados] = useState({ nome: '', senha: '', email: '', confirmSenha: '', foto: '' });
    const [showPassword, setShowPassword] = useState({ senha: false, confirmSenha: false });
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [senhaError, setSenhaError] = useState<string | null>(null);
    const [sucess, setSuccess] = useState(false)
    const [popUppdateProfile, setPopUpUpdateProfile] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDados((prevDados) => ({
            ...prevDados,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSenhaError(null);

        if (!previewSrc) {
            alert("É necessário selecionar uma foto de perfil antes de prosseguir!");
            return;
        }

        if (dados.senha !== dados.confirmSenha) {
            setSenhaError('As senhas não correspondem. Por favor, verifique e tente novamente.');
            return;
        }

        const formData = new FormData();
        formData.append('name', dados.nome);
        formData.append('password', dados.senha);
        formData.append('isadmin', 'false');
        formData.append('isactive', 'true');
        if (previewSrc) {
            const file = dataURLtoFile(previewSrc, 'profile-image.png');
            formData.append('imagefield', file);
        }

        try {
            const response = await fetch('/api/organizador/register/', {
                method: 'POST',
                body: formData,
            });

            setSuccess(true)
            setDados({ nome: '', email: '', senha: '', confirmSenha: '', foto: '' });
            setPreviewSrc(null);
            setSenhaError(null);
            setShowPassword({ senha: false, confirmSenha: false });
        } catch (error) {
            console.error("Erro ao enviar dados para o backend", error);
            alert('Erro ao criar o usuário. Tente novamente mais tarde.');
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
        const maxFileSize = 10 * 1024 * 1024;

        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Formato inválido!/nPor favor, envie um arquivo de imagem (PNG, JPEG, ou GIF).');
            return;
        }

        if (file.size > maxFileSize) {
            alert('Tamanho inválido!/nO tamanho máximo permitido é até 10MB.');
            return;
        }

        displayPreview(file);
    };

    const handleRemoveImage = () => {
        setPreviewSrc(null);
    };

    const displayPreview = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSrc(reader.result as string);
            setDados((prevEvent) => ({
                ...prevEvent,
                'foto': reader.result as string, // Atualiza o campo específico do estado
            }));
        };
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            console.log('Usuário encontrado no localStorage:', user);
            const userObj = JSON.parse(user);
            const email = userObj.email;
            setDados((prevDados) => ({
                ...prevDados,
                'email': email
            }));
        }
    }, [])

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            console.log('Usuário encontrado no localStorage:', user);
            const userObj = JSON.parse(user);
            const email = userObj.email;
            setDados((prevEvent) => ({
                ...prevEvent,
                foto: `http://127.0.0.1:8000${userObj.imagefield}`, // Atualiza o campo específico do estado
            }));
            setPreviewSrc(`http://127.0.0.1:8000${userObj.imagefield}`)
            setDados((prevEvent) => ({
                ...prevEvent,
                nome: userObj.name, // Atualiza o campo específico do estado
            }));
            setDados((prevEvent) => ({
                ...prevEvent,
                email: email, // Atualiza o campo específico do estado
            }));
            setDados((prevEvent) => ({
                ...prevEvent,
                senha: userObj.password, // Atualiza o campo específico do estado
            }));
            setDados((prevEvent) => ({
                ...prevEvent,
                confirmSenha: userObj.password, // Atualiza o campo específico do estado
            }));
        }
    }, [])

    function isOpenUpdateCadastro() {
        setPopUpUpdateProfile(false)
    }

    return (
        <section className='px-[20px] bg-[#ffffff]'>
            <div className="relative w-full max-w-padrao mx-auto px-padrao">
                <div onClick={() => { isOpen() }} className='absolute top-[0px] right-[0px] border hover:cursor-pointer'>
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
                </div>
                <div className="w-full max-w-lg">
                    <h1 className="text-2xl font-bold text-indigo-600 sm:text-3xl">Edite sua conta</h1>

                    <p className="mb-[32px] max-w-md text-gray-500">
                        Preencha corretamente todos os campos.
                    </p>
                    <form action="#" className="mx-auto mb-0 mt-8 max-w-lg space-y-4" onSubmit={(e)=>{e.preventDefault()}}>
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
                                previewSrc ? null :
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
                                                <span> Arraste e solte</span>
                                                <span className="text-indigo-600"> ou navegue até o arquivo</span>
                                                <span> para fazer upload da sua foto de perfil</span>
                                            </label>
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPEG ou GIF até 10MB</p>
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
                        {previewSrc && (
                            <div className="flex justify-start mt-4">
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="inline-block rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white"
                                >
                                    Remover
                                </button>
                            </div>
                        )}
                        <div>
                            <label htmlFor="Nome" className="sr-only">Nome</label>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    value={dados.nome}
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
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <div className="relative">
                                <input
                                    type={showPassword.senha ? "text" : "password"}
                                    name='senha'
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    value={dados.senha}
                                    placeholder="Digite sua senha"
                                    minLength={8}
                                    maxLength={8}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                    onClick={() => setShowPassword({ ...showPassword, senha: !showPassword.senha })}>

                                    {showPassword.senha ? (
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
                                    type={showPassword.confirmSenha ? "text" : "password"}
                                    name='confirmSenha'
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    value={dados.confirmSenha}
                                    placeholder="Confirme sua senha"
                                    minLength={8}
                                    maxLength={8}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                                    onClick={() => setShowPassword({ ...showPassword, confirmSenha: !showPassword.confirmSenha })}>

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
                                                d="M3 3l18 18" />
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </div>
                        {senhaError && <p className="text-red-500 text-sm">{senhaError}</p>}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={()=>{setPopUpUpdateProfile(true)}}
                                className="inline-block rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white"
                            >
                                Atualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {
                popUppdateProfile ?
                    <PopUpUpdateProfile isOpen={isOpenUpdateCadastro} user={{
                        nome: dados.nome,
                        senha: dados.senha,
                        foto: dados.foto,
                        email: dados.email
                    }} previewSrc={previewSrc} />
                    : null
            }
        </section>
    )
}
