import { IEvent } from '@/utils/interface'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'

interface IProps {
    isOpen: Function
    user: {
        nome:string,
        senha:string,
        foto:string,
        email:string
    }
    previewSrc: string | null // Adicionando a imagem nas props
}

export function PopUpUpdateProfile({ isOpen, user, previewSrc }: IProps) {
    const route =useRouter()
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

    const updateEvent = async () => {
        const formData = new FormData();
        formData.append('name', user.nome);
        formData.append('password', user.senha);
        formData.append('isadmin','false');        
        if (!user.foto.includes('/media/banners/')) {
            const file = dataURLtoFile(user.foto, 'profile-image.png');  // Transformando a imagem em arquivo
            formData.append('imagefield', file);  // Enviando o arquivo
        }

        if (user.foto.includes('/media/banners/')) {
            const imageUrl = `http://127.0.0.1:8000${user.foto}`;
    
            try {
                const response = await fetch(imageUrl); // Faz a requisição para a URL da imagem
                if (!response.ok) {
                    throw new Error("Falha ao carregar a imagem");
                }
    
                const blob = await response.blob();  // Converte a resposta em um Blob
    
                // Agora, converta o Blob em um File
                const file = new File([blob], 'profile-image.png', { type: blob.type });
    
                // Anexar o arquivo ao FormData
                formData.append('imagefield', file);
            } catch (error) {
                console.error('Erro ao processar a imagem:', error);
            }
        } 
    
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/users/${user.email}/`, {
                method: 'PUT', 
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update event: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Event updated successfully:', result);
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            route.push('/auth/organizador')
            isOpen(); // Fechar o modal ou fazer algo após a atualização
    
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };
    
    return (
        <div
            className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center bg-[#000000a1] items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
            id="modal-id"
        >
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
                {/* Content */}
                <div>
                    {/* Body */}
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-xl font-bold py-4">Tem certeza que deseja atualizar seu perfil?</h2>
                        <p className="text-sm text-gray-500 px-8">
                            Essa ação é irreversível
                        </p>
                    </div>

                    <div className="p-3 mt-2 text-center space-x-4 md:block">
                        <div onClick={() => { updateEvent() }} className='inline-block cursor-pointer rounded-lg bg-cian px-5 py-3 text-sm font-medium text-white'>
                           Atualizar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
