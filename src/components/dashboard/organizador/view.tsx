import { IEvent } from '@/utils/interface'
import Image from 'next/image'
import React, { useState } from 'react'
interface IProps {
    isOpen: Function,
    evento: IEvent
}
export function View({ isOpen ,evento}: IProps) {
    const [viewVoluntarios, setViewVoluntario] = useState(false)
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
                    <Image className='object-contain' src={''} fill alt='' />
                </div>
                <p className='mb-12px'><span className='font-bold'>Data inicio:</span>{evento.timeDate}</p>
                <h3 className='mb-[8px] font-bold text-18px md:text-20px'>Descrição</h3>
                <p className='mb-12px'>
                    {evento.description}
                </p>
                <p className='mb-12px'><span className='font-bold'>Localização:</span> {evento.location}</p>
                <span className="flex items-center mb-[20px]">
                    <span className="h-px flex-1 bg-black"></span>
                    <span className="shrink-0 px-6">Escala de voluntários</span>
                    <span className="h-px flex-1 bg-black"></span>
                </span>
                <div className='w-full md:w-[48%]'>
                    <div className='flex'>
                        <span className='p-[10px] border w-[50%] text-center rounded-tl-2xl'>Data:</span>
                        <span className='p-[10px] border w-[50%] text-center border-l-0 rounded-tr-2xl'>fdsf</span>
                    </div>
                    <div className='flex justify-center'>
                        <span className='p-[10px] border w-[50%] text-center border-t-0'>Quantidade de voluntários:</span>
                        <span onClick={() => { setViewVoluntario(true) }} className='p-[10px] border w-[50%] text-center border-l-0 border-t-0'>
                            1
                            <span className='ml-[20px] bg-middle-blue text-white rounded-lg px-[20px] py-[5px]'>Ver</span>
                        </span>
                    </div>
                    <div className='flex justify-center'>
                        <span className='p-[10px] border w-[50%] text-center border-t-0'>Inicio:</span>
                        <span className='p-[10px] border w-[50%] text-center border-l-0 border-t-0'>18:00</span>
                    </div>
                    <div className='flex justify-center'>
                        <span className='p-[10px] border w-[50%] text-center border-t-0 rounded-bl-2xl'>Fim:</span>
                        <span className='p-[10px] border w-[50%] text-center border-l-0 rounded-br-2xl border-t-0'>19:00</span>
                    </div>
                </div>
                {
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
                }
            </div>
        </section>
    )
}
