import { NextRequest, NextResponse } from 'next/server';
import pg from '../../connection';

function calculateMedian(values: number[]) {
  values.sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  return values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!startDate || !endDate) {
    return NextResponse.json({ status: 400, message: 'Missing startDate or endDate in query.' }, { status: 400 });
  }

  try {
    const data = await pg('readings_temperature')
      .select('temperature', 'humidity', 'created_at')
      .whereBetween('created_at', [startDate, endDate]);

    const temperatures = data.map((item) => parseFloat(item.temperature));
    const humidities = data.map((item) => parseFloat(item.humidity));

    const tempStats = {
      min: Math.min(...temperatures),
      max: Math.max(...temperatures),
      median: calculateMedian(temperatures),
    };

    const humidityStats = {
      min: Math.min(...humidities),
      max: Math.max(...humidities),
      median: calculateMedian(humidities),
    };

    return NextResponse.json(
      {
        status: 200,
        message: 'Dados gerados com sucesso.',
        data: {
          temperature: tempStats,
          humidity: humidityStats,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido.';
    return NextResponse.json({ status: 500, message: 'Erro interno do servidor.', error: errorMessage }, { status: 500 });
  }
}
