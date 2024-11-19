import React, { useState } from "react";

interface IModalProps {
    onClose: () => void;
    onSubmit: (data: { data: string; qtdeVoluntarios: number; comeco: string; fim: string }) => void;
}

const CronogramaModal: React.FC<IModalProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        data: "",
        qtdeVoluntarios: 0,
        comeco: "",
        fim: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log(formData)
        onSubmit(formData); // Chama o método de envio
        setFormData({
            data: "",
            qtdeVoluntarios: 0,
            comeco: "",
            fim: "",
        })
        onClose(); // Fecha o modal
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Adicionar Cronograma</h2>
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Data</label>
                        <input
                            type="date"
                            name="data"
                            value={formData.data}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantidade de Voluntários</label>
                        <input
                            type="number"
                            name="qtdeVoluntarios"
                            value={formData.qtdeVoluntarios}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Início</label>
                        <input
                            type="time"
                            name="comeco"
                            value={formData.comeco}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Fim</label>
                        <input
                            type="time"
                            name="fim"
                            value={formData.fim}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <div
                            className="px-4 cursor-pointer py-2 bg-gray-200 text-gray-700 rounded-lg"
                            onClick={onClose}
                        >
                            Cancelar
                        </div>
                        <div
                            onClick={() => { handleSubmit() }}
                            className="px-4 cursor-pointer py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Adicionar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CronogramaModal