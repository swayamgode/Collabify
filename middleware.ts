import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/signup', '/signup/success'];
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/api'));

    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Check if user is authenticated
    // const supabase = await createClient();
    // const { data: { user } } = await supabase.auth.getUser();

    // // Redirect to login if not authenticated
    // if (!user) {
    //     const loginUrl = new URL('/login', request.url);
    //     loginUrl.searchParams.set('redirectTo', pathname);
    //     return NextResponse.redirect(loginUrl);
    // }

    // // Get user role for dashboard-specific routes
    // if (pathname.startsWith('/brand') || pathname.startsWith('/influencer')) {
    //     const { data: profile } = await supabase
    //         .from('profiles')
    //         .select('role')
    //         .eq('id', user.id)
    //         .single();

    //     const userRole = profile?.role;

    //     // Redirect brand users trying to access influencer routes
    //     if (pathname.startsWith('/influencer') && userRole === 'brand') {
    //         return NextResponse.redirect(new URL('/brand', request.url));
    //     }

    //     // Redirect influencer users trying to access brand routes
    //     if (pathname.startsWith('/brand') && userRole === 'influencer') {
    //         return NextResponse.redirect(new URL('/influencer', request.url));
    //     }

    //     // If user has no role set, redirect to login
    //     if (!userRole) {
    //         return NextResponse.redirect(new URL('/login', request.url));
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

