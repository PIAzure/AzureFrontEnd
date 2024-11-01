import React from 'react';

const CreateEvent: React.FC = () => {
    return (
        <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                            At the same time, the fact that we are wholly owned and totally independent from
                            manufacturer and other group control gives you confidence that we will only recommend what
                            is right for you.
                        </p>

                        <div className="mt-8">
                            <a href="#" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>
                            <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form action="#" className="space-y-5">
                            <div>
                                <label className="mb-[12px]" htmlFor="name">Titulo do evento:</label>
                                <input
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    placeholder="Nome do evento"
                                    type="text"
                                    id="name"
                                />
                            </div>
                            <div>
                                <label className="mb-[12px]" htmlFor="name">Local do evento:</label>
                                <input
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    placeholder="Nome do evento"
                                    type="text"
                                    id="name"
                                />
                            </div>
                            <div>
                                <label className="mb-[12px]" htmlFor="name">Data do evento:</label>
                                <input
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    placeholder="Nome do evento"
                                    type="date"
                                    id="name"
                                />
                            </div>
                            <div>
                                <label className="mb-[12px]" htmlFor="name">Descrição do evento:</label>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm h-[150px]"
                                    placeholder="Nome do evento"
                                    id="name"
                                />
                            </div>



                            <div className="mb-9 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                <div>
                                    <label
                                        htmlFor="Option1"
                                        className="block w-full cursor-pointer rounded-lg border border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                        tabIndex={0}
                                    >
                                        <input className="mb-[12px]" id="Option1" type="radio" tabIndex={-1} name="option" />
                                        <span className="text-sm"> Sociais </span>
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="Option2"
                                        className="block w-full cursor-pointer rounded-lg border border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                        tabIndex={0}
                                    >
                                        <input className="mb-[12px]" id="Option2" type="radio" tabIndex={-1} name="option" />
                                        <span className="text-sm"> Educacionais </span>
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="Option3"
                                        className="block w-full cursor-pointer rounded-lg border border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                        tabIndex={0}
                                    >
                                        <input className="mb-[12px]" id="Option3" type="radio" tabIndex={-1} name="option" />
                                        <span className="text-sm"> Cultural </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="">Faça o upload do banner do evento:</label>
                                <div className="mt-[10px] flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and
                                                drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                            </p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                >
                                    Send Enquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateEvent;
