import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import type { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NEXT_URL } from './config'

export function middleware(request: NextRequest) {
  const cookies = request.cookies.get('ss_refresh_token')
  if (
    (!cookies || cookies === undefined) &&
    request.nextUrl.pathname.startsWith('${NEXT_URL}/admin-portal')
  ) {
    return NextResponse.redirect(`${NEXT_URL}/auth/login`)
  }

  if (
    cookies &&
    request.nextUrl.pathname.startsWith('${NEXT_URL}/auth/login')
  ) {
    return NextResponse.redirect(`${NEXT_URL}/admin/admin-portal`)
  }
}
