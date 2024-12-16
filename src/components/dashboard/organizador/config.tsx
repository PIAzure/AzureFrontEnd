import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UpdateProfile } from './updateProfile'
import { IUser } from '@/utils/interface'
interface IProps {
    user: IUser | null
}
export function Config({ user }: IProps) {
    console.log(user, 'O usuarioo')
    const [popUp, setPopUp] = useState(false);
    function isOpenView() {
        setPopUp(false)
    }
    const url = process.env.NEXT_PUBLIC_BE_URL;
    return (
        <section className='w-full flex items-center justify-center py-[100px]'>
            {
                popUp ?
                    <UpdateProfile isOpen={isOpenView} /> :
                    <div className=" bg-blue p-[40px] text-white rounded-2xl w-full text-center max-w-[600px] mx-auto">
                        <div className='bg-white p-[20px] rounded-2xl mb-[32px]'>
                            <div className='mb-[25px] relative overflow-hidden w-full max-w-[200px] h-[200px] mx-auto'>
                                <Image src={`${url}${user?.imagefield}`} fill className='object-cover' alt='' />
                            </div>
                        </div>
                        <h2 className='font-bold text-center'> {user?.name}</h2>
                        <h3 className='mb-[20px] mx-auto'><span>E-mail:</span>{user?.email}</h3>
                        <button onClick={() => { setPopUp(true) }} className='px-4 mx-auto cursor-pointer py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'>Atualizar</button>
                    </div>
            }
        </section>
    )
}
