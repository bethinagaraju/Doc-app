import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Alert } from 'react-native'

type DoctorProfile = {
  id: number
  date_of_birth: string | null
  gender: string | null
  specialization: string | null
  experience_years: number | null
  organisation_id: number | null
  consultation_fee: string | null
  availability_schedule: string | null
  license_number: string | null
  verified_status: boolean | null
  profile_picture: string | null
  appointment_time: number | null
  rzp_account_id: string | null
  joined_at: string | null
  kyc_status: string | null
  description: string | null
  account_number: string | null
  beneficiary_name: string | null
  ifsc_code: string | null
  createdAt: string | null
  updatedAt: string | null
}

type UserData = {
  id: number
  username: string
  email: string
  phone_number: string | null
  role: string | null
  is_email_verified: boolean
  is_phone_verified: boolean
  doctorProfile?: DoctorProfile | null
}

type UserProfileContextType = {
  userData: UserData | null
  setUserData: (u: UserData | null) => void
  fetchAndStoreUserData: (token: string) => Promise<UserData | null>
  clearUserData: () => void
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null)

  const fetchAndStoreUserData = async (token: string): Promise<UserData | null> => {
    const res = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const json = await res.json()
    if (res.ok && json && json.userData) {
      setUserData(json.userData as UserData)
      console.log('Fetched user data from the context:', json.userData)
      return json.userData as UserData
    }

    throw new Error(json?.message || 'Failed to fetch user data')
  }

  const clearUserData = () => setUserData(null)

  return (
    <UserProfileContext.Provider value={{ userData, setUserData, fetchAndStoreUserData, clearUserData }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfile = (): UserProfileContextType => {
  const ctx = useContext(UserProfileContext)
  if (!ctx) throw new Error('useUserProfile must be used within UserProfileProvider')
  return ctx
}

export default UserProfileContext
