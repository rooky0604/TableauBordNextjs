'use server';
import { query } from '@/lib/db';

export async function createTicket(title: string, description: string) {
  const result = await query(
    'INSERT INTO tickets (title, description, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
    [title, description, 'open']
  );
  return result.rows[0];
}
