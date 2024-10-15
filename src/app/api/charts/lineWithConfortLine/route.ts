import { NextRequest, NextResponse } from 'next/server';
import pg from '../../connection';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ status: 400, message: 'Missing startDate or endDate in query.' }, { status: 400 });
    }

    const data = await pg('readings_temperature')
      .select(
        pg.raw("date_trunc('hour', created_at) as interval_time"),
        pg.raw('ROUND(AVG(temperature), 1) as avg_temperature'),
        pg.raw('ROUND(AVG(humidity), 1) as avg_humidity')
      )
      .whereBetween('created_at', [startDate, endDate])
      .groupBy('interval_time')
      .orderBy('interval_time', 'asc')
      .limit(24);

    return NextResponse.json(
      {
        status: 200,
        message: 'Successfully received data for chart.',
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error occurred:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ status: 500, message: 'Failed to load data', error: errorMessage }, { status: 500 });
  }
}
