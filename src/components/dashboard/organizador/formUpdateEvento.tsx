import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { IEvent } from '@/utils/interface';
import { PopUpdate } from './popUpAtualizar';
interface IProps {
    isOpen: Function
    evento: IEvent
}
export function FormUpdateEvento({ isOpen, evento }: IProps) {
    const [popUppdateEvent, setPopUpUpdateEvent] = useState(false);
    const url = process.env.NEXT_PUBLIC_BE_URL;
    const [event, setEvent] = useState<IEvent>({
        description: evento?.description,
        location: evento.location,
        begin: evento.begin,
        banner: `${url}${evento.banner}`,
        organizator: "teste2111@gmail.com",
        id: evento.id,
        max_particpant: evento?.max_particpant,
        max_voluntary_per_horary: evento.max_particpant,
        end: evento.end,
        escale: convertToTime(evento.escale),
        bscale: convertToTime(evento.bscale)
    });
    function convertToTime(dateTime: string): string {
        const date = new Date(dateTime);
        const hours = date.getHours().toString().padStart(2, '0'); // Obtém as horas e adiciona um zero à esquerda, se necessário
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Obtém os minutos e adiciona um zero à esquerda, se necessário
        return `${hours}:${minutes}`; // Retorna no formato HH:mm
    }
    const [listaCronograma, setListaCronograma] = useState();
    const [previewSrc, setPreviewSrc] = useState<string | null>(`${url}${evento.banner}`);

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
            setEvent((prevEvent) => ({
                ...prevEvent,
                'banner': reader.result as string, // Atualiza o campo específico do estado
            }));
        };
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value, // Atualiza o campo específico do estado
        }));
    };

    function dataInput(date: string) {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate
    }

    function isOpenUpdateCadastro(status:string) {
        setPopUpUpdateEvent(false)
        if(status=='atualizado'){
            isOpen()
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            const email = userObj.email;
            setEvent((prevEvent) => ({
                ...prevEvent,
                organizator: email, // Atualiza o campo específico do estado
            }));
        }
    }, [])

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
                    <h1 className="text-2xl font-bold text-indigo-600 sm:text-3xl">Edite seu evento</h1>

                    <p className="mb-[32px] max-w-md text-gray-500">
                        Preencha corretamente todos os campos.
                    </p>

                    <form action="">
                        <label htmlFor="nome_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Banner do evento:</label>
                        <div
                            className="w-full mb-[12px] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
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
                        {/* <div className='mb-[12px]'>
                            <label htmlFor="nome_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do evento:</label>
                            <input type="text" name="nome_evento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div> */}
                        <div className='mb-[12px]'>
                            <label htmlFor="descricao_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do evento:</label>
                            <textarea value={event.description} onChange={handleInputChange} name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        {/* <label htmlFor="categoria_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do evento:</label> */}
                        {/* <select name="categoria_evento" className="bg-gray-50 mb-[12px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select> */}
                        <div className='mb-[12px]'>
                            <label htmlFor="localizacao_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localização do evento:</label>
                            <input value={event.location} onChange={handleInputChange} type="text" name="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[12px]'>
                            <label htmlFor="data_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data do evento:</label>
                            <input value={dataInput(event.begin)} onChange={handleInputChange} type="date" name="timeDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[12px]'>
                            <label htmlFor="final_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de encerramento:</label>
                            <input value={dataInput(event.end)} onChange={handleInputChange} type="date" name="end" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[12px]'>
                            <label htmlFor="final_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horário que o evento se inicia:</label>
                            <input onChange={handleInputChange} value={event.bscale} type="time" name="bscale" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[12px]'>
                            <label htmlFor="final_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horário que o evento se encerra:</label>
                            <input value={event.escale} onChange={handleInputChange} type="time" name="escale" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[12px]'>
                            <label htmlFor="max_particpant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade máxima de participantes:</label>
                            <input value={event.max_particpant} onChange={handleInputChange} type="number" name="max_particpant" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[12px]'>
                            <label htmlFor="max_voluntary_per_horary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade máxima de voluntários por escalas de horas:</label>
                            <input value={event.max_voluntary_per_horary} onChange={handleInputChange} type="number" name="max_voluntary_per_horary" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        {/* <div className='mb-[12px]'>
                            <label htmlFor="termino_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Termino do evento:</label>
                            <input  type="date" name="termino_evento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div> */}
                        <div onClick={() => { setPopUpUpdateEvent(true) }} className="w-[48%] text-center text-16px cursor-pointer inline-block rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
                            Atualizar
                        </div>
                    </form>
                </div>
            </div>
            {
                popUppdateEvent ?
                    <PopUpdate isOpen={isOpenUpdateCadastro} evento={event} previewSrc={previewSrc} />
                    : null
            }
        </section>
    )
}
