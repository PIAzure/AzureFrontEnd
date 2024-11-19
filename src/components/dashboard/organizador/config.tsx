import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function Config() {
    return (
        <section className='w-full flex items-center justify-center py-[100px]'>
            <div className="w-full text-center max-w-[600px] mx-auto px-padrao">
                <div className='mb-[25px] relative overflow-hidden w-full max-w-[200px] h-[200px] mx-auto rounded-full'>
                    <Image src={''} fill className='object-cover' alt='' />
                </div>
                <h2 className='font-bold text-center'>Nome do usuário</h2>
                <h3 className='mb-[20px] mx-auto'><span>E-mail:</span>lucas@lucas.com</h3>
                <button className='px-4 mx-auto cursor-pointer py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'>Atualizar</button>
            </div>
        </section>
    )
}
