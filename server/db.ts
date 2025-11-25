import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export { sql };
export const query = async (text: string, params?: any[]) => {
  const rows = await sql(text, params);
  return { rows, rowCount: rows.length };
};