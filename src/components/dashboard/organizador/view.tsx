import { IEvent, IEventWithHorary, IHorary } from '@/utils/interface'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PopUpDeleteVoluntarioEvento } from './popUpDeleteVoluntarioEvento'
import { FormInvate } from './formInvate'
interface IProps {
    isOpen: Function,
    evento: IEvent
}
export function View({ isOpen, evento }: IProps) {
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [invitePopUp, setInvatePopUp] = useState(false);
    const [idVoluntarioEs, setIdVoluntarioEs] = useState('');
    const [escala, setScala] = useState<IEventWithHorary[] | undefined>()
    const url = process.env.NEXT_PUBLIC_BE_URL;
    const [viewVoluntarios, setViewVoluntario] = useState<IHorary[] | undefined>(undefined);
    function formatDate(isoDate: string): string {
        const date = new Date(isoDate); // Converte a string ISO para um objeto Date
        const day = date.getDate().toString().padStart(2, '0'); // Obtém o dia e adiciona zero à esquerda, se necessário
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (0-11) e adiciona zero à esquerda
        const year = date.getFullYear(); // Obtém o ano
        return `${day}/${month}/${year}`; // Retorna no formato DD/MM/YYYY
    }
    function convertToTime(dateTime: string): string {
        const date = new Date(dateTime);
        const hours = date.getHours().toString().padStart(2, '0'); // Obtém as horas e adiciona um zero à esquerda, se necessário
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Obtém os minutos e adiciona um zero à esquerda, se necessário
        return `${hours}:${minutes}`; // Retorna no formato HH:mm
    }


    useEffect(() => {
        if (evento.id != undefined) {
            fetch(`${url}/scale/${evento.id}/`, {
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then((response) => {
                    return response.text(); // Alterado para text() para inspecionar o conteúdo
                })
                .then((data) => {
                    // Converta o texto para JSON somente se for válido
                    try {
                        const jsonData = JSON.parse(data);
                        setScala(jsonData)
                    } catch (error) {
                        console.error('Erro ao parsear JSON:', error, 'Dados recebidos:', data);
                    }
                })
                .catch((err) => console.error('Erro no fetch:', err));
        }
    }, []);

    function isOpenPopUpDelete() {
        setDeletePopUp(false)
    }
    function isOpenPopInvate() {
        setInvatePopUp(false)
    }

    useEffect(() => {
        console.log(viewVoluntarios)
    }, [viewVoluntarios])

    return (
        <section className='bg-[#ffffff] relative'>
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
                <div className='relative h-[50vh] w-full mb-[12px]'>
                    <Image className='object-contain' src={`${url}${evento.banner}`} fill alt='' />
                </div>
                <p className='mb-12px'><span className='font-bold'>Data inicio: </span>{formatDate(evento.begin)}</p>
                <p className='mb-12px'><span className='font-bold'>Data encerramento: </span>{formatDate(evento.end)}</p>
                <p className='mb-12px'><span className='font-bold'>Horário de inicio do evento nos dias que ocorreram: </span>{convertToTime(evento.begin)}</p>
                <p className='mb-12px'><span className='font-bold'>Horário de encerramento do evento nos dias que ocorreram: </span>{convertToTime(evento.escale)}</p>
                <h3 className='mb-[8px] font-bold'>Descrição:</h3>
                <p className='mb-12px'>
                    {evento.description}
                </p>
                <p className='mb-12px'><span className='font-bold'>Localização:</span> {evento.location}</p>
                <p className='mb-12px'><span className='font-bold'>Quantidade máxima de participantes:</span> {evento.max_particpant}</p>
                <p className='mb-12px'><span className='font-bold'>Quantidade máxima de voluntários:</span> {evento.max_voluntary_per_horary}</p>
                <span className="flex items-center mb-[20px]">
                    <span className="h-px flex-1 bg-black"></span>
                    <span className="shrink-0 px-6">Escala de voluntários</span>
                    <span className="h-px flex-1 bg-black"></span>
                </span>

                {
                    escala && escala?.length > 0 ?
                        <div>
                            {
                                escala.map((scale) => {
                                    return (
                                        <div key={scale.id}>
                                            {
                                                scale.horarys.map((item) => {
                                                    if (item.voluntarys.length > 0) {
                                                        return (
                                                            <div key={item.id}>
                                                                <h2 className='text-20px font-semibold mb-[20px]'>Escala: {item.datetime}</h2>
                                                                <h3 className='text-20px font-semibold'>Voluntários</h3>
                                                                <div>
                                                                    {
                                                                        item.voluntarys.map((voluntario) => {
                                                                            return (
                                                                                <div key={voluntario.id}>
                                                                                    <h2>{voluntario.user.name}</h2>
                                                                                    <div>
                                                                                        <h2 onClick={() => { setIdVoluntarioEs(voluntario.id.toString()), setTimeout(() => { setDeletePopUp(true) }, 1000), console.log(voluntario.id) }}>deletar voluntario</h2>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : null
                }
                <span className="flex items-center mb-[20px]">
                    <span className="h-px flex-1 bg-black"></span>
                    <span className="shrink-0 px-6">Convites enviados</span>
                    <span className="h-px flex-1 bg-black"></span>
                </span>
                <div
                    onClick={() => { setInvatePopUp(true) }}
                    className="mb-[30px] ml-auto cursor-pointer max-w-[100px] text-center rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                    Criar convite
                </div>

                {/* {
                    viewVoluntarios ?
                        <div className='fixed flex items-center justify-center top-[0px] left-0 z-[10]  right-0 bottom-0 bg-[#0000009c] p-[40px]'>
                            <div className="relative">
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Voluntário</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Data</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Inicio</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Fim</th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">14:00</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">17:00</td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                <div
                                                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                >
                                                    Remover
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div onClick={() => { setViewVoluntario(false) }} className='absolute top-[0px] right-[0px] border hover:cursor-pointer'>
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
                            </div>
                        </div> : null
                } */}
            </div>
            {
                (deletePopUp && idVoluntarioEs != '') ?
                    <PopUpDeleteVoluntarioEvento idVoluntario={idVoluntarioEs} isOpen={isOpenPopUpDelete} /> : null
            }
            {
                invitePopUp ?
                    <FormInvate isOpen={isOpenPopInvate} evento={evento} />
                    : null
            }
        </section>
    )
}
