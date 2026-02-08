'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should use a library like zod to validate data
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    revalidatePath('/', 'layout')
    redirect('/brand/dashboard') // Default redirect, actual logic might vary based on role
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
