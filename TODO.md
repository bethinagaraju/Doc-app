# TODO: Add Global Consultation Mode Variable

## Steps to Complete:
1. Update UserContext.tsx to include consultationMode state ('online' or 'offline') and setter function.
2. Update src/screens/(tabs)/index.tsx to set consultationMode to 'online' when "Video Consult" is clicked and 'offline' when "Visit Clinic" is clicked, before navigating.
3. Update src/screens/doctor profile/[id].tsx to filter slots based on consultationMode from UserContext.
4. Test the changes to ensure the global variable is set correctly and slots are filtered.

## Progress:
- [x] Step 1: Update UserContext.tsx
- [x] Step 2: Update index.tsx
- [x] Step 3: Update DoctorProfileScreen
- [x] Step 4: Test changes
