import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse, formData: FormData) => {
    const url = process.env.NEXT_PUBLIC_BE_URL
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const response = await fetch(
            `${url}/organization/`,
            {
                method: 'POST',
                body: formData,
            });
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json({ message: "Usuário criado com sucesso", data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export default handler;
