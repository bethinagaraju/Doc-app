import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import VideoCall from './(tabs)/VideoCall';
import tw from 'twrnc';

const PatientVideoCall = () => {
  const route = useRoute<any>();
  const { appointmentId, callId } = route.params || {};

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        <VideoCall
          embeddedRole="patient"
          embeddedApptId={appointmentId ? String(appointmentId) : '30'}
          embeddedCallId={callId}
        />
      </View>
    </SafeAreaView>
  );
};

export default PatientVideoCall;



// I want to implement a WhatsApp-style minimized video call / Picture-in-Picture experience in my DocApp React Native video consultation module.

// IMPORTANT:
// Do not redesign or break the existing video calling UI, calling logic, WebRTC/SDK logic, navigation, or existing controls. First inspect the existing VC implementation and understand how the current call lifecycle and navigation work. Then integrate this feature into the existing architecture.

// FEATURE REQUIREMENTS

// 1. FULL-SCREEN VIDEO CALL
// - When a doctor/patient enters an active video consultation, keep the current full-screen VC UI exactly as it is.
// - Existing camera, microphone, speaker, switch camera, end call, participant video, connection status, etc. must continue working.

// 2. MINIMIZE VIDEO CALL
// Add a clear minimize button to the active VC screen.

// When the user taps Minimize:
// - Do NOT end the call.
// - Do NOT disconnect WebRTC.
// - Do NOT destroy the call session.
// - Change the VC from full-screen mode into a small floating video window.
// - The call must continue in the background while the user navigates inside the DocApp.

// 3. ANDROID BACK BUTTON BEHAVIOR
// This is very important.

// When a user is actively inside the full-screen VC and presses the Android hardware/system Back button:

// DO NOT end the call.

// Instead:
// - Automatically minimize the active VC into the floating mini-video window.
// - Keep the call connected.
// - Allow the user to continue using the rest of the DocApp.

// Example:

// Full VC
//     ↓
// Android Back
//     ↓
// Minimized floating VC
//     ↓
// User can browse Documents / Appointments / Dashboard / Profile / other tabs
//     ↓
// Call continues

// The Back button must behave as "minimize call" while the user is on the active full-screen VC screen.

// 4. FLOATING VIDEO WINDOW
// Create a reusable floating/minimized VC component.

// When minimized:
// - Show the remote participant's video as the main floating preview.
// - Keep the floating window above the current DocApp screen.
// - The window should have rounded corners.
// - It should have a small shadow/elevation.
// - It should be draggable around the screen.
// - Keep it inside safe screen boundaries.
// - It should not block important navigation controls unnecessarily.

// Recommended default size:
// - Approximately 30-35% of screen width.
// - Maintain the correct video aspect ratio.
// - Do not stretch or distort the video.

// 5. TAP FLOATING VIDEO
// When the user taps the minimized video:
// - Restore the VC to full-screen mode.
// - Return to the active consultation screen.
// - The call must continue without reconnecting.

// 6. NAVIGATION WHILE MINIMIZED
// While the VC is minimized, the user must be able to navigate normally through DocApp.

// For example:

// Active VC
// → press Back
// → minimized VC

// Then:

// Dashboard
// Documents
// Appointments
// Prescriptions
// Profile
// Other tabs/screens

// The floating VC should remain visible while navigating between these screens.

// Do NOT create duplicate VC connections when navigation occurs.

// There must be only ONE active call/session.

// 7. CALL STATE MANAGEMENT
// Create/modify the call state management so that the VC has explicit states such as:

// FULLSCREEN
// MINIMIZED
// ENDED

// Conceptually:

// ACTIVE + FULLSCREEN
// ACTIVE + MINIMIZED
// ENDED

// Minimizing must only change presentation state, not call connection state.

// Do not confuse:
// - minimize
// - navigation back
// - disconnect
// - end call

// Only the explicit "End Call" action should terminate the consultation.

// 8. END CALL
// When the user presses End Call:
// - terminate the actual call/session using the existing call logic.
// - remove the floating mini-video immediately.
// - clean up listeners/resources according to the existing implementation.
// - navigate to the existing post-call screen/flow.

// If the call ends remotely:
// - automatically remove the floating window.
// - update the existing call state correctly.

// 9. FULL-SCREEN RESTORE
// When tapping the floating VC:
// - restore the exact existing VC screen.
// - Preserve:
//   - microphone state
//   - camera state
//   - speaker state
//   - remote participant
//   - local participant video
//   - call duration
//   - connection state
//   - any existing consultation state

// Do not reconnect just because the UI changed from minimized to fullscreen.

// 10. SELF-VIEW
// Keep the local user's camera preview as a small PiP/self-view inside the VC, similar to the existing VC implementation.

// When minimized, prioritize the remote participant's video as the floating window content.

// 11. DOCUMENT USE CASE
// This feature is especially important for the Doctor workflow.

// Example:

// Doctor is in video consultation
// → Doctor presses Back
// → VC minimizes
// → Doctor opens patient's medical report
// → Doctor reads the report while still seeing the patient's video
// → Doctor taps floating VC
// → VC becomes full-screen again

// Also support:

// Doctor opens a medical document while inside VC
// → document becomes the main content
// → VC remains as a floating mini-video
// → tapping mini-video restores VC.

// 12. APP TAB NAVIGATION
// The minimized VC must persist across the main DocApp tabs.

// For example:

// VC
//  ↓
// Minimize
//  ↓
// Home
//  ↓
// Appointments
//  ↓
// Patient Details
//  ↓
// Medical Reports

// The same floating VC must remain active.

// Do not create a new floating VC instance every time navigation changes.

// Use a single app-level/global VC overlay/container where appropriate.

// 13. ANDROID SYSTEM PICTURE-IN-PICTURE
// Inspect whether the existing application architecture can support native Android Picture-in-Picture.

// If appropriate for this project, implement Android native PiP support so that the video call can continue when the user leaves the VC Activity/app screen.

// However:
// - First determine whether the current React Native navigation architecture supports native Android PiP cleanly.
// - Do not blindly add native PiP if it conflicts with the existing in-app floating VC.
// - Prefer a robust architecture where:
//   a) In-app navigation uses a floating mini-video overlay.
//   b) Android system PiP is used when the user actually leaves/minimizes the application, if technically appropriate.

// Make the behavior consistent and avoid duplicate video renderers.

// 14. BACK BUTTON RULES
// Implement these rules exactly:

// CASE A:
// User is on full-screen active VC
// → Back
// → minimize VC
// → call continues

// CASE B:
// User is on minimized VC and navigating DocApp
// → Back
// → normal app navigation behavior
// → call continues

// CASE C:
// User taps floating VC
// → full-screen VC

// CASE D:
// User taps End Call
// → call terminates
// → floating VC disappears

// CASE E:
// Remote participant ends call
// → call terminates
// → floating VC disappears

// 15. UI/UX
// Use smooth animations when:
// - fullscreen → minimized
// - minimized → fullscreen

// The minimized window should animate to its new position instead of abruptly disappearing.

// Allow the user to drag the floating video.

// Snap the floating window to the nearest left/right edge when released, while respecting safe areas.

// Do not cover:
// - bottom tab navigation unnecessarily
// - important buttons
// - Android status/navigation areas.

// 16. PERFORMANCE
// This is critical.

// Do NOT:
// - create multiple WebRTC streams
// - create duplicate video renderers
// - reconnect the call during minimize/restore
// - recreate the call SDK instance during navigation
// - leak listeners
// - duplicate event handlers

// The video/call session should remain alive while only the presentation layer changes.

// 17. EXISTING CODE FIRST
// Before modifying anything:
// - inspect the current VC screen/component
// - inspect the current video calling service/provider/context
// - inspect navigation structure
// - inspect Android Activity configuration
// - inspect how the current call session is created/destroyed
// - identify the correct app-level location for the floating VC overlay

// Then implement the feature using the existing architecture rather than creating a parallel calling system.

// 18. IMPORTANT ACCEPTANCE TESTS

// Test all of these:

// Test 1:
// Start VC → press Back → VC minimizes → call continues.

// Test 2:
// Start VC → minimize → navigate between multiple DocApp screens → floating VC remains visible.

// Test 3:
// Minimized VC → tap floating window → full-screen VC → same call continues.

// Test 4:
// Minimized VC → tap End Call → call ends → floating window disappears.

// Test 5:
// Full-screen VC → End Call → call ends normally.

// Test 6:
// Remote user ends call → floating VC disappears.

// Test 7:
// During minimized state, microphone/camera state remains unchanged.

// Test 8:
// Doctor opens patient document while call is active → document can be viewed while floating VC remains visible.

// Test 9:
// Rotate/configuration changes should not create duplicate call sessions or duplicate floating windows.

// Test 10:
// App navigation must not accidentally disconnect the active call.

// IMPORTANT:
// Before coding, analyze the existing implementation and give me:
// 1. Which files/components need to change
// 2. Where the global floating VC container should live
// 3. How the current call lifecycle works
// 4. How Android Back is currently handled
// 5. Whether native Android PiP is appropriate for this project

// Then implement the feature.