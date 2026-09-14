// // // import React from 'react';
// // // import { View, Text } from 'react-native';
// // // import tw from 'twrnc';

// // // const AIPatientChat = ({ navigation }) => {
// // //   return (
// // //     <View style={tw`flex-1 justify-center items-center bg-white`}>
// // //       <Text style={tw`text-3xl font-bold text-green-700`}>AI PATIENT CHATS</Text>
// // //     </View>
// // //   );
// // // };

// // // export default AIPatientChat;







// // import React, { useState, useRef, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// //   ActivityIndicator,
// //   KeyboardAvoidingView,
// //   Platform
// // } from 'react-native';
// // import tw from 'twrnc';

// // const API_URL = 'http://10.0.2.2:8080/api/patient/symptom-intake';

// // const AIPatientChat = () => {
// //   const scrollRef = useRef();

// //   const [message, setMessage] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const [conversation, setConversation] = useState([
// //     {
// //       role: 'assistant',
// //       content:
// //         'Hello 👋 I am your AI health assistant.\nPlease tell me what symptoms you or your child are experiencing.'
// //     }
// //   ]);

// //   useEffect(() => {
// //     scrollRef.current?.scrollToEnd({ animated: true });
// //   }, [conversation]);

// //   const sendMessage = async () => {
// //     if (!message.trim()) return;

// //     const updatedConversation = [
// //       ...conversation,
// //       { role: 'user', content: message }
// //     ];

// //     setConversation(updatedConversation);
// //     setMessage('');
// //     setLoading(true);

// //     try {
// //       const response = await fetch(API_URL, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'x-docapp-role': 'patient'
// //         },
// //         body: JSON.stringify({ conversation: updatedConversation })
// //       });

// //       const data = await response.json();

// //       if (data.success) {
// //         setConversation(prev => [
// //           ...prev,
// //           { role: 'assistant', content: data.answer }
// //         ]);
// //       } else {
// //         setConversation(prev => [
// //           ...prev,
// //           { role: 'assistant', content: '⚠️ Something went wrong.' }
// //         ]);
// //       }
// //     } catch (error) {
// //       setConversation(prev => [
// //         ...prev,
// //         { role: 'assistant', content: '❌ Unable to reach server.' }
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const ChatBubble = ({ role, content }) => {
// //     const isUser = role === 'user';

// //     return (
// //       <View
// //         style={tw`mb-3 ${
// //           isUser ? 'items-end' : 'items-start'
// //         }`}
// //       >
// //         <View
// //           style={tw`px-4 py-3 rounded-2xl max-w-[80%] ${
// //             isUser
// //               ? 'bg-green-600 rounded-br-none'
// //               : 'bg-gray-200 rounded-bl-none'
// //           }`}
// //         >
// //           <Text
// //             style={tw`${isUser ? 'text-white' : 'text-gray-900'}`}
// //           >
// //             {content}
// //           </Text>
// //         </View>
// //       </View>
// //     );
// //   };

// //   return (
// //     <KeyboardAvoidingView
// //       style={tw`flex-1 bg-white`}
// //       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
// //     >
// //       {/* Header */}
// //       <View style={tw`bg-green-700 p-4`}>
// //         <Text style={tw`text-white text-lg font-bold text-center`}>
// //           AI Patient Chat
// //         </Text>
// //       </View>

// //       {/* Messages */}
// //       <ScrollView
// //         ref={scrollRef}
// //         style={tw`flex-1 px-4 py-2`}
// //         showsVerticalScrollIndicator={false}
// //       >
// //         {conversation.map((msg, index) => (
// //           <ChatBubble
// //             key={index}
// //             role={msg.role}
// //             content={msg.content}
// //           />
// //         ))}

// //         {loading && (
// //           <View style={tw`items-start mt-2`}>
// //             <View style={tw`bg-gray-200 px-4 py-2 rounded-2xl`}>
// //               <ActivityIndicator size="small" color="gray" />
// //             </View>
// //           </View>
// //         )}
// //       </ScrollView>

// //       {/* Input */}
// //       <View style={tw`flex-row items-center p-3 border-t border-gray-200`}>
// //         <TextInput
// //           value={message}
// //           onChangeText={setMessage}
// //           placeholder="Type your symptoms..."
// //           style={tw`flex-1 border border-gray-300 rounded-full px-4 py-2`}
// //         />
// //         <TouchableOpacity
// //           onPress={sendMessage}
// //           style={tw`ml-2 bg-green-700 px-5 py-2 rounded-full`}
// //         >
// //           <Text style={tw`text-white font-bold`}>Send</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </KeyboardAvoidingView>
// //   );
// // };

// // export default AIPatientChat;











// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView
// } from 'react-native';
// import tw from 'twrnc';

// const API_URL = 'http://ai.docapp.co.in/api/patient/symptom-intake';

// const AIPatientChat = () => {
//   const scrollRef = useRef(null);

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [conversation, setConversation] = useState([
//     {
//       role: 'assistant',
//       content:
//         'Hello 👋 I am your AI health assistant.\nPlease tell me what symptoms you or your child are experiencing.'
//     }
//   ]);

//   useEffect(() => {
//     scrollRef.current?.scrollToEnd({ animated: true });
//   }, [conversation, loading]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     const updatedConversation = [
//       ...conversation,
//       { role: 'user', content: message }
//     ];

//     setConversation(updatedConversation);
//     setMessage('');
//     setLoading(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-docapp-role': 'patient'
//         },
//         body: JSON.stringify({ conversation: updatedConversation })
//       });

//       const data = await response.json();

//       setConversation(prev => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: data.success
//             ? data.answer
//             : '⚠️ Unable to process your request.'
//         }
//       ]);
//     } catch (error) {
//       setConversation(prev => [
//         ...prev,
//         { role: 'assistant', content: '❌ Server not reachable.' }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <KeyboardAvoidingView
//         style={tw`flex-1`}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//       >
//         {/* Header */}
//         <View style={tw`bg-green-700 p-4`}>
//           <Text style={tw`text-white text-lg font-bold text-center`}>
//             AI Patient Chat
//           </Text>
//         </View>

//         {/* Chat */}
//         <ScrollView
//           ref={scrollRef}
//           contentContainerStyle={tw`px-4 py-2`}
//           style={tw`flex-1`}
//           showsVerticalScrollIndicator={false}
//         >
//           {conversation.map((msg, index) => (
//             <View
//               key={index}
//               style={tw`mb-3 ${
//                 msg.role === 'user' ? 'items-end' : 'items-start'
//               }`}
//             >
//               <View
//                 style={tw`px-4 py-3 rounded-2xl max-w-[80%] ${
//                   msg.role === 'user'
//                     ? 'bg-green-600 rounded-br-none'
//                     : 'bg-gray-200 rounded-bl-none'
//                 }`}
//               >
//                 <Text
//                   style={tw`${
//                     msg.role === 'user'
//                       ? 'text-white'
//                       : 'text-gray-900'
//                   }`}
//                 >
//                   {msg.content}
//                 </Text>
//               </View>
//             </View>
//           ))}

//           {loading && (
//             <View style={tw`items-start`}>
//               <View style={tw`bg-gray-200 px-4 py-2 rounded-2xl`}>
//                 <ActivityIndicator size="small" />
//               </View>
//             </View>
//           )}
//         </ScrollView>

//         {/* Input Bar */}
//         <View style={tw`flex-row items-center p-3 border-t border-gray-300 mb-16`}>
//           <TextInput
//             value={message}
//             onChangeText={setMessage}
//             placeholder="Type your symptoms..."
//             style={tw`flex-1 border border-gray-300 rounded-full px-4 py-2`}
//           />
//           <TouchableOpacity
//             onPress={sendMessage}
//             style={tw`ml-2 bg-green-700 px-5 py-2 rounded-full`}
//           >
//             <Text style={tw`text-white font-bold`}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default AIPatientChat;














import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import ProfileTopBar from '../components/ProfileTopBar';

const INTAKE_API = 'http://ai.docapp.co.in/api/patient/symptom-intake';
const CHAT_API = 'http://ai.docapp.co.in/api/patient/chat';

const AIPatientChat = () => {
  const scrollRef = useRef(null);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isIntakeDone, setIsIntakeDone] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content:
        'Hello 👋 I am your AI health assistant.\nPlease tell me what symptoms you or your child are experiencing.'
    }
  ]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [conversation, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const updatedConversation = [
      ...conversation,
      { role: 'user', content: message }
    ];

    setConversation(updatedConversation);
    setMessage('');
    setLoading(true);

    try {
      let response;
      let data;

      // 🔹 FIRST CALL → Symptom Intake
      if (!isIntakeDone) {
        response = await fetch(INTAKE_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-docapp-role': 'patient'
          },
          body: JSON.stringify({
            conversation: updatedConversation
          })
        });

        data = await response.json();
        setIsIntakeDone(true); // ✅ switch after first call
      }
      // 🔹 FOLLOW-UP CALLS → Normal Chat
      else {
        response = await fetch(CHAT_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-docapp-role': 'patient'
          },
          body: JSON.stringify({
            messages: updatedConversation
          })
        });

        data = await response.json();
      }

      setConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.success
            ? data.answer
            : '⚠️ Unable to process your request.'
        }
      ]);
    } catch (error) {
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: '❌ Server not reachable.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <ProfileTopBar title="AI Patient Chat" />

        {/* Chat */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={tw`px-4 py-2`}
          style={tw`flex-1`}
          showsVerticalScrollIndicator={false}
        >
          {conversation.map((msg, index) => (
            <View
              key={index}
              style={tw`mb-3 ${msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
            >
              <View
                style={tw`px-4 py-3 rounded-2xl max-w-[80%] ${msg.role === 'user'
                  ? 'bg-[#124CB8] rounded-br-none'
                  : 'bg-[#F1F0F4] rounded-bl-none'
                  }`}
              >
                <Text
                  style={tw`${msg.role === 'user'
                    ? 'text-white'
                    : 'text-[#1A1B1F]'
                    }`}
                >
                  {msg.content}
                </Text>
              </View>
            </View>
          ))}

          {loading && (
            <View style={tw`items-start mt-2`}>
              <View style={tw`bg-[#F1F0F4] px-4 py-3 rounded-2xl rounded-bl-none`}>
                <ActivityIndicator size="small" color="#124CB8" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={tw`flex-row items-center p-4 border-t border-[#E5E7EB] bg-white ${isKeyboardVisible ? 'mb-0' : 'mb-16'}`}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your symptoms..."
            placeholderTextColor="#74777F"
            style={tw`flex-1 bg-[#F1F0F4] rounded-full px-5 py-3 text-[#1A1B1F]`}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={tw`ml-3 bg-[#124CB8] px-6 py-3 rounded-full shadow-sm`}
          >
            <Text style={tw`text-white font-bold`}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIPatientChat;
