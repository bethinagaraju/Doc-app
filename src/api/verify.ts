import apiConfig from '../../apiConfig';

type SendResult = { ok: boolean; data: any };

export async function sendEmailOtp(accessToken?: string, email?: string): Promise<SendResult> {
  const headers: any = { 'Content-Type': 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  // According to API notes, this endpoint may not require a body. If an email is provided, include it.
  const body = email ? JSON.stringify({ email }) : undefined;

  const res = await fetch(apiConfig.API_ENDPOINTS.sendEmailOtp, {
    method: 'POST',
    headers,
    body,
  });

  let data = null;
  try { data = await res.json(); } catch (e) { /* ignore */ }
  return { ok: res.ok, data };
}

export async function verifyEmailOtp(userOtp: string, email: string, accessToken?: string): Promise<SendResult> {
  const headers: any = { 'Content-Type': 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const res = await fetch(apiConfig.API_ENDPOINTS.verifyEmail, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ userOtp, email }),
  });

  let data = null;
  try { data = await res.json(); } catch (e) { /* ignore */ }
  return { ok: res.ok, data };
}

export default { sendEmailOtp, verifyEmailOtp };
