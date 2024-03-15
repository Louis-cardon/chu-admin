import { Challenge } from '@/types/challenge';
import { createClient } from './client';
import { Notification } from '@/types/notification';
import { User, UserWithSteps } from '@/types/user';
import { redirect, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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

export async function fetchChallenge(id: number): Promise<Challenge | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('challenge')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching challenge:', error);
    return null;
  }

  return data as Challenge;
}

export async function updateChallenge(
  id: number,
  updatedChallenge: Partial<Challenge>
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('challenge')
    .update(updatedChallenge)
    .eq('id', id);

  if (error) {
    console.error('Error updating challenge:', error);
    throw error;
  }

  console.log('Challenge updated successfully');
}

export async function insertChallenge(challengeData: Omit<Challenge, 'id'>) {
  const supabase = createClient();
  const { error } = await supabase.from('challenge').insert([challengeData]);

  if (error) {
    console.error('Error inserting challenge:', error);
    return null;
  }

  console.log('Challenge inserted successfully:', challengeData);
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
}

export async function fetchAllUserWithSteps(challengeId: number) {
  const supabase = createClient();

  // Étape 1 : Récupérer tous les utilisateurs liés au défi
  let { data: users, error: usersError } = await supabase
    .from('user_challenge')
    .select('user(*)')
    .eq('challenge_id', challengeId)
    .eq('user.is_active', true);

  if (usersError || !users) {
    console.error(
      'Erreur lors de la récupération des utilisateurs',
      usersError
    );
    return null;
  }

  // Simplification : transformer les utilisateurs en un format plus gérable
  const simplifiedUsers = users.map((uc) => uc.user).flat();

  // Étape 2 : Récupérer les daily_users_steps pour l'ensemble des utilisateurs récupérés
  // Cette approche suppose que vous avez un grand nombre d'utilisateurs et nécessitez donc d'optimiser les requêtes
  const userIds = simplifiedUsers.map((user) => user.id);

  // Étape 2.1 : Récupérer les steps en une seule requête (si possible, sinon par lot)
  let { data: steps, error: stepsError } = await supabase
    .from('daily_users_steps')
    .select('*')
    .in('user_id', userIds); // Utilisez 'in' pour filtrer par un ensemble d'ID

  if (stepsError || !steps) {
    console.error(
      'Erreur lors de la récupération des daily users steps',
      stepsError
    );
    return null;
  }

  // Étape 3 : Associer les steps à chaque utilisateur
  const usersWithSteps: UserWithSteps[] = simplifiedUsers.map((user) => ({
    ...user,
    dailySteps: steps?.filter((step) => step.user_id === user.id) || [], // Assurez-vous que cela ne sera jamais `undefined`
  }));

  //return usersWithSteps;

  console.log('data', usersWithSteps);

  // const usersWithSteps: UserWithSteps[] = data.map((uc) => {
  //   // Ici, vous devez vous assurer que chaque objet a bien toutes les propriétés attendues par UserWithSteps
  //   const userWithStepss: UserWithSteps = {
  //     ...uc.user, // Cela suppose que uc.user contient déjà toutes les propriétés nécessaires, à part dailySteps
  //     dailySteps: uc.user.daily_users_steps // Assurez-vous que cette propriété existe et est correctement formatée
  //   };

  //   return userWithStepss;
  // });

  return usersWithSteps;
}
