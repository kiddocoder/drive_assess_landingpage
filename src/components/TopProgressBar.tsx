"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 300,
})

export default function TopProgressBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        NProgress.start()

        const timeout = setTimeout(() => {
            NProgress.done()
        }, 500)

        return () => {
            clearTimeout(timeout)
            NProgress.done()
        }
    }, [pathname, searchParams])

    return null
}