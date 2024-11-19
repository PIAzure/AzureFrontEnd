import React, { useState } from 'react'
import Image from 'next/image';
import { IEscala } from '@/utils/interface';
import CronogramaModal from './escala';
interface IProps {
    isOpen: Function
}
export function FormCadastraEvento({ isOpen }: IProps) {
    const [listaCronograma, setListaCronograma] = useState<IEscala[]>([
    ]);
    const [showModal, setShowModal] = useState(false);

    const handleAddCronograma = (data: { data: string; qtdeVoluntarios: number; comeco: string; fim: string }) => {
        const newCronograma = {
            id: listaCronograma.length + 1,
            ...data,
        };
        setListaCronograma((prev) => [...prev, newCronograma]);
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
    return (
        <section className=' px-[20px] top-0 bg-[#ffffff]'>
            <div className="relative w-full mx-auto max-w-padrao px-padrao">
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
                    <h1 className="text-2xl font-bold text-indigo-600 sm:text-3xl">Cadastre seu evento</h1>

                    <p className="mb-[32px] max-w-md text-gray-500">
                        Preencha corretamente todos os campos.
                    </p>

                    <div>
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
                        <div className='mb-[12px]'>
                            <label htmlFor="nome_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do evento:</label>
                            <input type="text" id="nome_evento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[12px]'>
                            <label htmlFor="descricao_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do evento:</label>
                            <textarea id="descricao_evento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <label htmlFor="categoria_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do evento:</label>
                        <select id="categoria_evento" className="bg-gray-50 mb-[12px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                        <div className='mb-[12px]'>
                            <label htmlFor="localizacao_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localização do evento:</label>
                            <input type="text" id="localizacao_evento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[12px]'>
                            <label htmlFor="data_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data do evento:</label>
                            <input type="date" id="data_evento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div className='mb-[32px]'>
                            <label htmlFor="termino_evento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Termino do evento:</label>
                            <input type="date" id="termino_evento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <span className="flex items-center mb-[20px]">
                            <span className="h-px flex-1 bg-black"></span>
                            <span className="shrink-0 px-6">Escala de voluntários</span>
                            <span className="h-px flex-1 bg-black"></span>
                        </span>
                        {
                            listaCronograma != undefined && listaCronograma?.length > 0 ?
                                <div className='mb-[20px] flex flex-wrap justify-between gap-5'>
                                    {
                                        listaCronograma.map((escala, index) => {
                                            return (
                                                <div className='w-full md:w-[48%]' key={index}>
                                                    <div className='flex'>
                                                        <span className='p-[10px] border w-[50%] text-center rounded-tl-2xl'>Data:</span>
                                                        <span className='p-[10px] border w-[50%] text-center border-l-0 rounded-tr-2xl'>{escala.data}</span>
                                                    </div>
                                                    <div className='flex justify-center'>
                                                        <span className='p-[10px] border w-[50%] text-center border-t-0'>Quantidade de pessoas:</span>
                                                        <span className='p-[10px] border w-[50%] text-center border-l-0 border-t-0'>{escala.qtdeVoluntarios} pessoas</span>
                                                    </div>
                                                    <div className='flex justify-center'>
                                                        <span className='p-[10px] border w-[50%] text-center border-t-0'>Inicio:</span>
                                                        <span className='p-[10px] border w-[50%] text-center border-l-0 border-t-0'>{escala.comeco}</span>
                                                    </div>
                                                    <div className='flex justify-center'>
                                                        <span className='p-[10px] border w-[50%] text-center border-t-0'>Fim:</span>
                                                        <span className='p-[10px] border w-[50%] text-center border-l-0 border-t-0'>{escala.fim}</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span className='p-[10px] border w-[50%] text-center border-t-0 border-r-0 rounded-bl-2xl'>
                                                            <div
                                                                onClick={() => {
                                                                    setListaCronograma((prevLista) => {
                                                                        const novaLista = [...prevLista]; // Cria uma cópia do array
                                                                        novaLista.splice(index, 1);           // Remove o item no índice 0
                                                                        return novaLista;                 // Retorna a nova lista
                                                                    });
                                                                }}
                                                                className="ml-auto cursor-pointer max-w-[100px] text-center rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                            >
                                                                Deletar
                                                            </div>
                                                        </span>
                                                        <span className='p-[10px] border w-[50%] text-center border-t-0 border-l-0 rounded-br-2xl'></span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                : null
                        }
                    </div>
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        onClick={() => setShowModal(true)}
                    >
                        Adicionar Cronograma
                    </button>
                    {showModal && (
                        <CronogramaModal
                            onClose={() => setShowModal(false)}
                            onSubmit={handleAddCronograma}
                        />
                    )}
                </div>
            </div>
            {

            }
        </section>
    )
}
