import { API_URL } from "@config/index"

type SessionProps = {
  id: string
  name: string
  email: string
  isAdmin: boolean
  role: string
}
export async function getUser(req: { headers: { cookie: any } }): Promise<SessionProps> {
  try {
    const userRes = await fetch(`${API_URL}/api/users/getMe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: req ?  `Bearer ${req.headers.cookie}`: '',
      },
    })
    const user = await userRes.json()
    return user
  } catch (error) {
    throw new Error('Unable to fetch user: ' + error.message)
  }
}
