'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const isInfluencer = email.includes('influencer');

    revalidatePath('/', 'layout')

    if (isInfluencer) {
        redirect('/influencer/browse')
    } else {
        redirect('/brand/campaigns')
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
