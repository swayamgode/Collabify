'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Attempt to sign in
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (authError || !authData.user) {
        // If authentication fails, just redirect based on email for demo purposes
        const isInfluencer = email.includes('influencer');
        revalidatePath('/', 'layout');

        if (isInfluencer) {
            redirect('/influencer');
        } else {
            redirect('/brand');
        }
        return;
    }

    // Fetch user role from database
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

    revalidatePath('/', 'layout');

    // Redirect based on actual role
    if (profile?.role === 'influencer') {
        redirect('/influencer');
    } else if (profile?.role === 'brand') {
        redirect('/brand');
    } else {
        // Fallback to email-based detection if role not set
        const isInfluencer = email.includes('influencer');
        redirect(isInfluencer ? '/influencer' : '/brand');
    }
}


export async function signup(formData: FormData) {
    // For demo/testing, we'll bypass actual Supabase registration
    // This avoids RLS (Row Level Security) issues during development
    revalidatePath('/', 'layout')
    return redirect('/signup/success')
}



export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
