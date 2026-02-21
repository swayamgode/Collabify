'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendConnectionRequest(influencerId: string, message?: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to send a connection request.' }
    }

    const { error } = await supabase
        .from('connection_requests')
        .insert({
            brand_id: user.id,
            influencer_id: influencerId,
            status: 'pending',
            message
        })

    if (error) {
        console.error('Error sending connection request:', error)
        return { error: error.message }
    }

    revalidatePath('/brand/influencers')
    return { success: true }
}
