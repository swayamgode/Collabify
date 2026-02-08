'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    // 1. Try to get role from Metadata (Fastest, no DB query)
    let role = authData.user.user_metadata?.role

    // 2. Fallback: Try to get role from Profiles table
    if (!role) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authData.user.id)
            .single()
        role = profile?.role
    }

    revalidatePath('/', 'layout')

    // Redirection based on role
    if (role === 'influencer') {
        redirect('/influencer/dashboard')
    } else {
        redirect('/brand/dashboard')
    }
}


export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string
    const fullName = formData.get('fullName') as string

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: role,
            },
        },
    })

    if (error) {
        redirect('/signup?error=' + encodeURIComponent(error.message))
    }

    // Note: Profile insertion is usually handled by a Supabase trigger 
    // linked to auth.users, but for this demo, we can manually insert or rely on trigger.
    // The schema.sql provided has a profiles table.

    revalidatePath('/', 'layout')
    redirect('/signup/success') // Redirect to a success page or dashboard
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
