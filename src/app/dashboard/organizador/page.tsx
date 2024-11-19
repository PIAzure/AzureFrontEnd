'use client'
import { Config } from '@/components/dashboard/organizador/config';
import { Eventos } from '@/components/dashboard/organizador/eventos';
import { SideMenu } from '@/components/dashboard/organizador/sideMenu'
import React, { useState } from 'react'

export default function Page() {
    const [defaultChild,setDefaultChild]= useState('Home');
    function changeChild(child:string){
        setDefaultChild(child)
    }
    return (
        <main className='flex flex-col lg:flex-row min-h-[100vh]'>
            <SideMenu changeChild={changeChild} />
            {
                defaultChild=='Eventos'?
                <Eventos/>:
                defaultChild=='Configurações'?<Config/>:
                null
            }
        </main>
    )
}
