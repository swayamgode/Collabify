import { ReactNode } from 'react';
import { requireRole } from '@/lib/auth/role';

export default async function BrandLayout({ children }: { children: ReactNode }) {
    // Ensure only brand users can access this layout
    await requireRole('brand');

    return <>{children}</>;
}
