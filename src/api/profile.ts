import apiConfig from '../../apiConfig';

type Result = { ok: boolean; data: any };

export async function completeGeneralUserProfile(payload: { date_of_birth?: string; gender?: string; profile_picture_url?: string }, accessToken?: string): Promise<Result> {
  const headers: any = { 'Content-Type': 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const res = await fetch(apiConfig.API_ENDPOINTS.completeGeneralUserProfile, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });

  let data = null;
  try { data = await res.json(); } catch (e) { /* ignore */ }
  return { ok: res.ok, data };
}

export default { completeGeneralUserProfile };
