'use client'
import { Config } from '@/components/dashboard/organizador/config';
import { Eventos } from '@/components/dashboard/organizador/eventos';
import { Home } from '@/components/dashboard/organizador/home';
import { SideMenu } from '@/components/dashboard/organizador/sideMenu'
import { IUser } from '@/utils/interface';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [defaultChild, setDefaultChild] = useState('Home');
    const route = useRouter();
    function changeChild(child: string) {
        setDefaultChild(child)
    }
    const [user, setUser] = useState<IUser | null>(null)
    useEffect(() => {
        const localUser = localStorage.getItem('organizator');
        if (localUser != undefined) {
            const objUser = JSON.parse(localUser)
            setUser(objUser)
        }
        else {
            route.push('/auth/organizador/')
        }
    }, []);
    return (
        <main className='flex flex-col lg:flex-row min-h-[100vh]'>
            <SideMenu changeChild={changeChild} />
            {
                defaultChild == 'Eventos' ?
                    <Eventos /> :
                    defaultChild == 'Configurações' && user != null ? <Config user={user} /> :
                        defaultChild == 'Home' ? < Home /> : null
            }
        </main>
    )
}
