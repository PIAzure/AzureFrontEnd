'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const eventsPerPage = 6;
    const [horarios, setHorarios] = useState([]);
    const [selectedHorary, setSelectedHorary] = useState<number | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    const [isModalOpenWait, setIsModalOpenWait] = useState(false);
    const [isConfirmModalOpenWait, setIsConfirmModalOpenWait] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/auth/usuario');
            return;
        }
        
        fetchEventos();
    }, [router]);

    const currentEvents = events
        .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

        const fetchEventos = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/events/admin/all/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                if (!response.ok) {
                    throw new Error('Erro ao buscar eventos.');
                }
        
                const data = await response.json();
        
                setEvents(data);
                setTotalPages(Math.ceil(data.length / eventsPerPage));
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Ocorreu um erro ao buscar eventos.');
            } finally {
                setLoading(false);
            }
        };    

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    
    const handleInscreverParticipante = async (eventId: number) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userEmail = user?.email;
        if (!userEmail) {
            alert('Não foi possível obter o email do usuário.');
            return;
        }
    
        try {
            const checkResponse = await fetch(`https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/participant/event/${userEmail}/`);
            if (!checkResponse.ok) {
                throw new Error('Erro ao verificar inscrição do usuário.');
            }
    
            const checkData = await checkResponse.json();
            
            const isAlreadyRegistered = checkData.some((participant: any) => participant.events.id === eventId);
            if (isAlreadyRegistered) {
                console.log('Você já está inscrito nesse evento!');
                alert('Você já está inscrito nesse evento!');
                return;
            }

            const checkEvents = await fetch(`https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/events/admin/all/`);
            if (!checkEvents.ok) {
                throw new Error('Erro ao verificar eventos do usuário.');
            }
            const dataEvents = await checkEvents.json();

            const selectedEvent = dataEvents.find((event: any) => event.id === eventId);
            const selectedEventStartDate = selectedEvent.begin;
            const selectedEventEndDate = selectedEvent.end;
 
            const isConflicting = checkData.some((participant: any) => {
                const participantEvent = participant.events;
                const participantStartDate = participantEvent.begin;
                const participantEndDate = participantEvent.end;
                
                return (
                   (selectedEventStartDate < participantEndDate && selectedEventEndDate > participantStartDate)
                );
            });

            if (isConflicting) {
                console.log('Não foi possível realizar a inscrição, pois o evento selecionado tem um horário que conflita com outro evento no qual você já está inscrito.');
                alert('Não foi possível realizar a inscrição, pois o evento selecionado tem um horário que conflita com outro evento no qual você já está inscrito.');
                return;
            }
            
    
            const response = await fetch('https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/participant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: userEmail,
                    event: eventId
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao inscrever-se no evento: ${response.statusText}`);
            }
    
            console.log("Parabéns, Inscrição realizada com sucesso!");
        alert('Inscrição realizada com sucesso!');
    } catch (err: any) {
        console.error("Erro na inscrição:", err.message || err);
        alert(`Ocorreu um erro: ${err.message || 'Tente novamente mais tarde.'}`);
    }
    };
    
    const fetchHorarios = async (eventId: number) => {
        try {
            setSelectedEventId(eventId); // Salva o eventId no estado
            const response = await fetch(`https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/scale/${eventId}/`);
            if (!response.ok) {
                throw new Error('Erro ao buscar horários do evento.');
            }
    
          const data = await response.json();
          setHorarios(data[0]?.horarys || []);
        } catch (err: any) {
          console.error(err);
          alert('Erro ao carregar os horários.');
        }
      };

    const openModal = (event: any) => {
        setSelectedEvent(event);
        fetchHorarios(event.id);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setSelectedEvent(null);
        setHorarios([]);
        setIsModalOpen(false);
    };

    const closeModalWait = () => {
        setSelectedEvent(null);
        setHorarios([]);
        setIsModalOpenWait(false);
    };

    const openConfirmModal = (horaryId: number) => {
        setSelectedHorary(horaryId);
        setIsConfirmModalOpen(true);
    };

    const openConfirmModalWait = (horaryId: number) => {
        setSelectedHorary(horaryId);
        setIsConfirmModalOpenWait(true);
    };

    const closeConfirmModalWait = () => {
        setIsConfirmModalOpenWait(false);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    const handleConfirmRegistration = async () => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userEmail = userData?.email;
        const horaryId = selectedHorary;
        const eventID = selectedEventId;
        console.log(userEmail);
        console.log(eventID);
        console.log(horaryId);  
    
        if (!userEmail) {
            alert('Não foi possível obter o email do usuário.');
            closeConfirmModal();
            return;
        }
    
        if (!horaryId) {
            alert('Não foi possível obter o ID do horário.');
            closeConfirmModal();
            return;
        }
    
        if (!eventID) {
            alert('Não foi possível obter o ID do evento.');
            closeConfirmModal();
            return;
        }
    
        const eventsResponse = await fetch('https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/events/admin/all/');
        if (!eventsResponse.ok) {
            throw new Error('Erro ao buscar eventos.');
        }
    
        const events = await eventsResponse.json();
        console.log('Eventos:', events);
    
        const response = await fetch(`https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/scale/${eventID}/`);
        if (!response.ok) {
            throw new Error('Erro ao buscar escala do evento.');
        }
    
        const eventData = await response.json();
    
        if (!Array.isArray(eventData[0]?.horarys)) {
            throw new Error('Horários não encontrados ou formato inválido.');
        }
    
        const horary = eventData[0].horarys.find((horary: { id: number; }) => horary.id === horaryId);
        if (!horary) {
            throw new Error('Horário não encontrado.');
        }
    
        const selectedDatetime = horary.datetime;
        console.log("Datetime do Horário Selecionado:", selectedDatetime);
        
         // Verifique se há vagas restantes (max_voluntary_scale)
         if (horary.max_voluntary_scale === 0) {
            let isAlreadyRegistered = false;
        
            const scaleResponse = await fetch(`http://127.0.0.1:8000/scale/${eventID}/`);
            if (!scaleResponse.ok) {
                console.error('Erro ao buscar a escala do evento.');
                closeConfirmModalWait();
                closeModal();
                return;
            }
        
            const scaleData = await scaleResponse.json();
            console.log("Dados da Escala:", scaleData);
        
            for (const horary of scaleData[0]?.horarys || []) {
                if (horary.id === horaryId) {
                    console.log("Horário encontrado:", horary);
        
                    const userInVoluntarys = horary.voluntarys.some(
                        (voluntary: { user: { email: any; }; }) => voluntary.user.email === userEmail
                    );
        
                    if (userInVoluntarys) {
                        console.log('Você já está inscrito nesse horário!');
                        alert('Você já está inscrito nesse horário!');
                        isAlreadyRegistered = true;
                        
                        break;
                    }
                }
            }
        
            if (isAlreadyRegistered) {
                closeConfirmModalWait();
                return;
            }
        
            alert('Parabéns, você está na fila de espera!');


        let hasConflict = false;
        for (const event of events) {
            const scaleResponse = await fetch(`http://127.0.0.1:8000/scale/${event.id}/`);
            if (!scaleResponse.ok) {
                continue;
            }
    
            const scaleData = await scaleResponse.json();
            
            for (const horaryItem of scaleData[0]?.horarys) {
                const userInVoluntarys = horaryItem.voluntarys.some((voluntary: { user: { email: any; }; }) => voluntary.user.email === userEmail);
    
                if (userInVoluntarys) {
                    const eventStart = horaryItem.datetime;
                    const selectedStart = selectedDatetime;
                    console.log("Horario verificar:", eventStart);
                    console.log("Horário selecionado para inscrição:", selectedStart);
                    if (selectedStart == eventStart) {
                        alert('Você já está inscrito em outro horário que conflita com o horário selecionado. Por favor, escolha um horário diferente.');
                        hasConflict = true;
                        break;
                    }
                }
            }
    
            if (hasConflict) {
                break;
            }
        }
    
        if (hasConflict) {
            closeConfirmModalWait();
            return;
        }
    
        const url = `http://127.0.0.1:8000/scale/${horaryId}/horary/${userEmail}/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        closeConfirmModalWait();
        closeModal();

       
        return;
    }

        let isAlreadyRegistered = false;

        const scaleResponse = await fetch(`https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/scale/${eventID}/`);
        if (!scaleResponse.ok) {
            console.error('Erro ao buscar a escala do evento.');
            closeConfirmModal();
            return;
        }

        const scaleData = await scaleResponse.json();
        console.log("Dados da Escala:", scaleData);

        for (const horary of scaleData[0]?.horarys || []) {
            if (horary.id === horaryId) {
                console.log("Horário encontrado:", horary);

                const userInVoluntarys = horary.voluntarys.some(
                    (voluntary: { user: { email: any; }; }) => voluntary.user.email === userEmail
                );

                if (userInVoluntarys) {
                    console.log('Você já está inscrito nesse horário!');
                    alert('Você já está inscrito nesse horário!');
                    isAlreadyRegistered = true;
                    break;
                }
            }
        }

        if (isAlreadyRegistered) {
            closeConfirmModal();
            return;
        }


        let hasConflict = false;
        for (const event of events) {
            const scaleResponse = await fetch(`https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/scale/${event.id}/`);
            if (!scaleResponse.ok) {
                continue;
            }
    
            const scaleData = await scaleResponse.json();
            
            for (const horaryItem of scaleData[0]?.horarys) {
                const userInVoluntarys = horaryItem.voluntarys.some((voluntary: { user: { email: any; }; }) => voluntary.user.email === userEmail);
    
                if (userInVoluntarys) {
                    const eventStart = horaryItem.datetime;
                    const selectedStart = selectedDatetime;
                    console.log("Horario verificar:", eventStart);
                    console.log("Horário selecionado para inscrição:", selectedStart);
                    if (selectedStart == eventStart) {
                        alert('Você já está inscrito em outro horário que conflita com o horário selecionado. Por favor, escolha um horário diferente.');
                        hasConflict = true;
                        break;
                    }
                }
            }
    
            if (hasConflict) {
                break;
            }
        }
    
        if (hasConflict) {
            closeConfirmModal();
            return;
        }
    
        const url = `https://d6c7-2804-828-f231-4a76-bec-a9e-373a-2dd4.ngrok-free.app/scale/${horaryId}/horary/${userEmail}/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao realizar o cadastro.');
            }
            alert('Cadastro realizado com sucesso!');
            closeConfirmModal();
            closeModal();
        })
        .catch((error) => {
            console.error(error);
            alert('Erro ao realizar o cadastro.');
            closeConfirmModal();
        });
    };
    
    
    const baseUrl = "http://127.0.0.1:8000";
    //const imageUrl = events.banner ? `${baseUrl}${events.banner}` : "https://images.unsplash.com/photo-1498353430211-35e63516f347";

    return (
        <div className="flex h-screen border border-white justify-">
            <div className="absolute top-0 left-64 right-0 z-10 border border-white h-16">
                <section className="relative flex justify-between items-center p-4 bg-cian text-white h-full">
                    <Link href="/dashboard/usuario" passHref>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                            />
                            </svg>
                        </div>
                    </Link>
                    <h1 className="text-lg font-semibold">Eventos Disponíveis para Inscrição</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="flex items-center space-x-3">
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="w-64 flex flex-col justify-between border border-white bg-cian">
                <div className="flex flex-col items-left p-4 bg-cian border border-cian">
                    <div className="mb-7 mx-auto bg-light-gray p-4 rounded-lg">
                        <Image
                            className="object-contain object-left"
                            src="/images/logo_sem_fundo.png"
                            height={120}
                            width={120}
                            alt="Logo Azure"
                        />
                    </div>
                    <div className="border-t text-white border-white bg-cian">
                        <div className="px-1 mt-2">
                            <ul className="space-y-4">
                            <li>
                                    <Link
                                        href="/dashboard/usuario"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                        <span className="text-sm">Início</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/eventos"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>
                                        <span className="text-sm">Eventos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/inscricoes_voluntario"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                                        </svg>

                                        <span className="text-sm">Inscrições como voluntariado</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/inscricoes_participante"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>

                                        <span className="text-sm">Inscrições como participante</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/convites"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 16.5v-9m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 7.5m19.5 0L12 13.5 2.25 7.5" />
                                        </svg>
                                        <span className="text-sm">Convites</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/usuario/configuracoes"
                                        className="group relative flex items-center space-x-2 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 opacity-75"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span className="text-sm">Configurações</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-white text-white" style={{ marginTop: '15rem' }}>
                {loading ? (
                    <p className="text-flex text-gray-600">Carregando eventos...</p>
                ) : error ? (
                    <p className="text-flex text-red-500">{error}</p>
                ) : (
                    <>
                        <div className="p-8 mx-auto max-w-7xl">
                            <div className="grid grid-cols-3 grid-rows-2 gap-4">
                                {currentEvents.map((event: any) => (
                                    <a
                                        key={event.id}
                                        href="#"
                                        className="group relative block overflow-hidden border border-gray-200 rounded-lg border border-gray bg-cian"
                                        style={{ maxWidth: '300px',height: '300px'}}
                                    >   
                                        <img
                                            src={event.banner ? `${baseUrl}${event.banner}` : "https://images.unsplash.com/photo-1498353430211-35e63516f347"}
                                            alt="Banner do Evento"
                                            className="h-32 w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="relative bg-light-gray p-4">
                                            <p className="mt-1 text-xs text-black"><strong>Descrição:</strong> {event.description}</p>
                                            <p className="mt-1 text-xs text-black"><strong>Localização:</strong> {event.location}</p>
                                            
                                            <p className="mt-1 text-xs text-black"><strong>Data de Início:</strong> 
                                            {new Date(event.begin).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} 
                                                <strong> Horário: </strong>
                                                {new Date(event.begin).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'})}
                                            </p>
                                            <p className="mt-1 text-xs text-black"><strong>Data de Término: </strong>
                                                {new Date(event.end).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                                <strong> Horário: </strong>
                                                {new Date(event.end).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'})}
                                            </p>
                                            <form className="mt-1 flex gap-2">
                                                <button
                                                        className="w-full flex items-center justify-center rounded bg-gray-900 px-2 py-2 text-xs font-medium transition hover:scale-105 border border-black text-ice bg-cian"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleInscreverParticipante(event.id);
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-11 h-11 mr-2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V9.75M8.25 21h8.25" />
                                                        </svg>
                                                        Inscrever-se como Participante
                                                </button>
                                                <button
                                                    type="button"
                                                    className="w-full flex items-center justify-center rounded bg-gray-900 px-2 py-2 text-xs font-medium transition hover:scale-105 border border-black text-ice bg-cian"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openModal(event);
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-11 h-11 mr-2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                        />
                                                    </svg>
                                                    Inscrever-se como Voluntário
                                                </button>
                                            </form>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            {totalPages >= 1 && (
                                <div className="flex justify-center items-center mt-2 text-cian">
                                    <div className="inline-flex items-center justify-center gap-3 bg-white p-2 rounded text-cian">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className="inline-flex items-center justify-center rounded border border-gray-100 bg-light-gray text-gray-900"
                                            title="Página anterior"
                                        >
                                            🢠
                                        </button>
                                            <p className="text-xs text-cian">
                                                {currentPage} / {totalPages}
                                            </p>
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className="inline-flex items-center justify-center rounded bg-cian border border-gray-100 bg-light-gray text-cian"
                                            title="Próxima página"
                                            >
                                            🢡
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 h-[600px]">
            <div className="flex justify-between items-center border-b pb-4 text-gray">
                <h2 className="text-2xl text-green-500 font-bold">Agendamento</h2>
                <button className="text-red-500 font-bold hover:text-gray-700" onClick={closeModal}>✕</button>
            </div>

            <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto">
                {horarios.length > 0 ? (
                    horarios.map((horario: any) => {
                        const datetime = new Date(horario.datetime);
                        return (
                            <div key={horario.id} className="p-4 bg-gray-100 rounded shadow border border-gray flex justify-between items-center">
                                <div>
                                    <p className="max-w-xs truncate">
                                        <strong>Data:</strong>{" "}
                                        {datetime.toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                                    </p>
                                    <p className="max-w-xs truncate">
                                        <strong>Horário:</strong>{" "}
                                        {datetime.toLocaleTimeString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                            timeZone: "UTC",
                                        })}
                                    </p>
                                    <p className="max-w-xs truncate">
                                        <strong>Vagas Restantes:</strong> {horario.max_voluntary_scale}
                                    </p>
                                </div>
                                <button
                                    className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        if (horario.max_voluntary_scale === 0) {
                                            openConfirmModalWait(horario.id);
                                        } else {
                                            openConfirmModal(horario.id);
                                        }
                                    }}
                                >
                                    Selecionar
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-600"><strong>Nenhum horário disponível para este evento.</strong></p>
                )}

                {isConfirmModalOpen && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                            <p className="text-lg font-bold">Tem certeza que deseja se cadastrar nesse horário?</p>
                            <div className="flex justify-end mt-4 space-x-4">
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-400"
                                    onClick={closeConfirmModal}
                                >
                                    Não
                                </button>
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                    onClick={handleConfirmRegistration}
                                >
                                    Sim
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isConfirmModalOpenWait && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                            <p className="text-lg font-bold">O Evento está lotado. Deseja participar da Fila de Espera?</p>
                            <div className="flex justify-end mt-4 space-x-4">
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-400"
                                    onClick={closeConfirmModalWait}
                                >
                                    Não
                                </button>
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                    onClick={handleConfirmRegistration}
                                >
                                    Sim
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
                    </div>
                </div>
            )}
        </div>
    );
}

