import { IEvent } from '@/utils/interface';
import React, { useEffect, useState } from 'react'

export  function Home() {
    const [data, setData] = useState<IEvent[] | null>(null);
    const [error, setError] = useState('');
    const url = process.env.NEXT_PUBLIC_BE_URL;
    useEffect(() => {
        console.log('useEffect executado');
        const user = localStorage.getItem('organizator');
        if (user) {
            const userObj = JSON.parse(user);
            const email = userObj.email;

            fetch(`${url}/events/event/organizator/${email}/`, {
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then((response) => {
                    console.log('Resposta bruta:', response);
                    return response.text(); // Alterado para text() para inspecionar o conteúdo
                })
                .then((data) => {
                    console.log('Resposta do servidor:', data);
                    // Converta o texto para JSON somente se for válido
                    try {
                        const jsonData = JSON.parse(data);
                        setData(jsonData);
                    } catch (error) {
                        console.error('Erro ao parsear JSON:', error, 'Dados recebidos:', data);
                    }
                })
                .catch((err) => console.error('Erro no fetch:', err));
        }
    }, []);
    return (
        <section className='py-[60px]'>
            <div className="flex flex-col items-center gap-4 mb-6  max-w-padrao mx-auto px-padrao">
                <div className="flex gap-4">
                    {/* Card 1 */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <h2 className="text-gray-500 font-medium text-sm">Eventos cadastrados</h2>
                        <p className="text-2xl font-bold">{data?.length}</p>
                    </div>

                 
                </div>

                {/* Centered Footnote */}
            </div>
        </section>
    )
}
