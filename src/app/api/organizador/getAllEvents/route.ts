import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const { email } = params; // Captura o e-mail do caminho

  try {
    const response = await fetch(
      `https://5ccb-200-134-81-82.ngrok-free.app/events/${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Erro interno no servidor' }, { status: 500 });
  }
}
