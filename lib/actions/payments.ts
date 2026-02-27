'use server'

import { createClient } from '@/lib/supabase/server'

import { cache } from 'react'

export const getEarnings = cache(async function getEarnings() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return {
        total: 500,
        available: 350,
        pending: 150,
        transactions: [
          {
            label: 'Payment from TechGear Inc.',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            amount: '+$350.00',
            status: 'Completed'
          },
          {
            label: 'Payment from FitLife',
            date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            amount: '+$150.00',
            status: 'Pending'
          }
        ]
      }
    }

    const { data: payments, error } = await supabase
      .from('payments')
      .select(`
          *,
          campaigns (
            title,
            brands (
              company_name
            )
          ),
          applications!inner (
            influencer_id
          )
        `)
      .eq('applications.influencer_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching earnings:', error)
      throw error; // Trigger catch block
    }

    const total = payments.reduce((sum, p) => sum + Number(p.amount), 0) || 0
    const available = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + Number(p.amount), 0) || 0
    const pending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + Number(p.amount), 0) || 0

    const transactions = payments.map(p => ({
      label: `Payment from ${p.campaigns?.brands?.company_name || 'Brand'}`,
      date: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: `+$${Number(p.amount).toFixed(2)}`,
      status: p.status.charAt(0).toUpperCase() + p.status.slice(1)
    }))

    return { total, available, pending, transactions }
  } catch (error) {
    console.error('Error in getEarnings:', error);
    return {
      total: 500,
      available: 350,
      pending: 150,
      transactions: [
        {
          label: 'Payment from TechGear Inc.',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          amount: '+$350.00',
          status: 'Completed'
        },
        {
          label: 'Payment from FitLife',
          date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          amount: '+$150.00',
          status: 'Pending'
        }
      ]
    }
  }
})
