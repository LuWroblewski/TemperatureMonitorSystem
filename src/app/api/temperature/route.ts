import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import pg from '../connection';
import validateSchema from '../middlewares/validateSchema';
import { sensorSchema } from '../models/models';
import paginate from '../middlewares/paginations';

const sensorValidation = validateSchema(sensorSchema);

interface DataItem {
  temperature: number;
  humidity: number;
}

export async function GET(req: NextRequest) {
  return paginate(req, async (page: number, limit: number) => {
    try {
      const offset = (page - 1) * limit;

      const countResult = await pg('readings_temperature').count('* as count').first();

      const count = Number(countResult?.count || 0);

      const data = await pg('readings_temperature').select('*').limit(limit).offset(offset);

      const totalPages = Math.ceil(count / limit);

      const pagination = {
        page,
        per_page: limit,
        first_page: 1,
        last_page: totalPages,
        total_pages: totalPages,
        total_records: count,
      };

      return NextResponse.json(
        {
          status: 200,
          message: 'Successfully received data.',
          pagination,
          data,
        },
        { status: 200 }
      );
    } catch (err) {
      console.error('Error occurred:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return NextResponse.json({ status: 500, message: 'Failed to load data', error: errorMessage }, { status: 500 });
    }
  });
}

export async function POST(req: NextRequest) {
  return sensorValidation(req, async (body: DataItem) => {
    try {
      console.log('Received data:', body);

      await pg('readings_temperature').insert({
        temperature: body.temperature,
        humidity: body.humidity,
      });

      return NextResponse.json({ status: 200, message: 'Successfully sent data.', data: [body] }, { status: 200 });
    } catch (err) {
      console.error('Error occurred:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return NextResponse.json({ status: 500, message: 'Failed to send data', error: errorMessage }, { status: 500 });
    }
  });
}
