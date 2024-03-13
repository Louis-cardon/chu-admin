import { Challenge } from '@/types/challenge';
import { createClient } from './client';
import { Notification } from '@/types/notification';
import { User } from '@/types/user';

interface SupabaseData {
  data: Challenge[] | null;
  error?: string | null;
}

export async function fetchAllChallenges(): Promise<Challenge[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('challenge').select('*');

  if (error) {
    console.error('Erreur lors de la récupération des données', error);
    return null;
  }
  console.log('data', data);
  return data;
}

export async function fetchAllNotificationChallenges(
  idChallenge: number
): Promise<Notification[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('notification')
    .select('*')
    .eq('id_challenge', idChallenge);

  if (error) {
    console.error('Erreur lors de la récupération des données', error);
    return null;
  }
  console.log('data', data);
  console.log('data', idChallenge);
  return data;
}

export async function deleteNotification(
  notificationId: number
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('notification')
    .delete()
    .eq('id', notificationId);

  if (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
  console.log('Notification deleted successfully');
}

export async function insertNotification(content: string, challengeId: number) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error('Error getting user:', userError);
    return null;
  }

  const { error } = await supabase.from('notification').insert([
    {
      content,
      send_date: new Date().toISOString(),
      sent: false,
      creation_date: new Date().toISOString(),
      author: user.user.id,
      id_challenge: challengeId,
    },
  ]);

  if (error) {
    console.error('Error inserting notification:', error);
    return null;
  }
  console.log('Notification inserted successfully:');
}

export async function fetchAllUser(
  challengeId: number
): Promise<User[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_challenge')
    .select('user(*)')
    .eq('challenge_id', challengeId)
    .eq('user.is_active', true);

  if (error) {
    console.error('Erreur lors de la récupération des données', error);
    return null;
  }
  console.log('data', data);
  return data.map((item) => item.user).flat() || [];
}

export async function updateUserIsActive(
  userId: number,
  isActive: boolean
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user')
    .update({ is_active: isActive })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user is_active:', error);
    throw error;
  }
  console.log('User is_active updated successfully');
}
