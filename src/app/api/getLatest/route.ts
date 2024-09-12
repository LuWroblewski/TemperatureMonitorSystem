import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import pg from '../connection';

export async function GET(req: NextRequest) {
  try {
    const latestData = await pg('readings_temperature').select('*').limit(1).orderBy('id', 'desc').first();

    if (!latestData) {
      return NextResponse.json({ status: 404, message: 'No data found.' }, { status: 404 });
    }

    return NextResponse.json(
      {
        status: 200,
        message: 'Successfully received the latest data.',
        data: latestData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error occurred:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ status: 500, message: 'Failed to load data', error: errorMessage }, { status: 500 });
  }
}
