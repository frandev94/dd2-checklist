/* eslint-disable @typescript-eslint/no-explicit-any */
interface RequestLib {
  get<T = any>(url: string, options?: RequestInit): Promise<T>
  post<T = any>(url: string, body: BodyInit, options?: RequestInit): Promise<T>
}

const requestLib: RequestLib = {
  get: async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await fetch(url, { ...options, method: 'GET' })
    return await res.json()
  },
  post: async <T>(
    url: string,
    body: BodyInit,
    options?: RequestInit
  ): Promise<T> => {
    const res = await fetch(url, { ...options, body, method: 'POST' })
    return await res.json()
  },
}

export default requestLib
