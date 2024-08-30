import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

function validateSchema(schema: yup.Schema<any>) {
  return async (req: NextRequest, next: (body: any) => Promise<NextResponse>) => {
    try {
      const body = await req.json();
      await schema.validate(body);

      return next(body);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      return NextResponse.json({ status: 400, message: errorMessage }, { status: 400 });
    }
  };
}

export default validateSchema;
