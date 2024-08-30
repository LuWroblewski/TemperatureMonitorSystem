import { NextRequest, NextResponse } from 'next/server';

function paginate(req: NextRequest, next: (page: number, limit: number) => Promise<NextResponse>) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    if (isNaN(page) || page < 1) {
      throw new Error('Invalid page number');
    }
    if (isNaN(limit) || limit < 1) {
      throw new Error('Invalid limit number');
    }

    return next(page, limit);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';

    return NextResponse.json({ status: 400, message: errorMessage }, { status: 400 });
  }
}

export default paginate;
