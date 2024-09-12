import { NextResponse } from 'next/server';
import pg from '../../connection';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const latestData = await pg('readings_temperature').select('*').orderBy('created_at', 'desc').first();

    if (!latestData) {
      return NextResponse.json(
        { status: 404, message: 'No data found.' },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: 'Successfully received the latest data.',
        data: latestData,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error('Error occurred:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { status: 500, message: 'Failed to load data', error: errorMessage },
      {
        status: 500,
      }
    );
  }
}
