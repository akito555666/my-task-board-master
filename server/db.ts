import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export { sql };
export const query = async (text: string, params: any[] = []) => {
  // @ts-ignore
  const result = await sql.query(text, params);
  // resultは配列そのもの
  return { 
    rows: result as any[], 
    rowCount: Array.isArray(result) ? result.length : 0
  };
};