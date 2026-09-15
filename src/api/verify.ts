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

  const payload = { userOtp, email };
  console.log('[verifyEmailOtp] Request Payload:', payload);

  const res = await fetch(apiConfig.API_ENDPOINTS.verifyEmail, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });

  let data = null;
  try { data = await res.json(); } catch (e) { /* ignore */ }
  console.log('[verifyEmailOtp] Response Status:', res.status, 'Response Data:', data);
  return { ok: res.ok, data };
}

export async function sendMobileOtp(accessToken?: string): Promise<SendResult> {
  const headers: any = { 'Content-Type': 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const res = await fetch(apiConfig.API_ENDPOINTS.sendMobileOtp || 'https://api.docapp.co.in/api/verify/sendMobileOtp', {
    method: 'POST',
    headers,
  });

  let data = null;
  try { data = await res.json(); } catch (e) { /* ignore */ }
  return { ok: res.ok, data };
}

export async function verifyMobileOtp(userOtp: string, phoneNumber: string, accessToken?: string): Promise<SendResult> {
  const headers: any = { 'Content-Type': 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const payload = { userOtp, phoneNumber };
  console.log('[verifyMobileOtp] Request Payload:', payload);

  const res = await fetch(apiConfig.API_ENDPOINTS.verifyMobileOtp || 'https://api.docapp.co.in/api/verify/verifyMobileOtp', {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });

  let data = null;
  try { data = await res.json(); } catch (e) { /* ignore */ }
  console.log('[verifyMobileOtp] Response Status:', res.status, 'Response Data:', data);
  return { ok: res.ok, data };
}

export default { sendEmailOtp, verifyEmailOtp, sendMobileOtp, verifyMobileOtp };
