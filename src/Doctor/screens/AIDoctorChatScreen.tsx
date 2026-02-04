// // import React from 'react';
// // import { View, Text } from 'react-native';
// // import tw from 'twrnc';

// // const AIDoctorChatScreen = () => {
// //   return (
// //     <View style={tw`flex-1 justify-center items-center bg-white`}>
// //       <Text style={tw`text-3xl font-bold text-green-700`}>AI DOCTOR CHAT</Text>
// //     </View>
// //   );
// // };

// // export default AIDoctorChatScreen;







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

// const API_URL = 'http://ai.docapp.co.in/api/doctor/chat';

// const AIDoctorChatScreen = () => {
//   const scrollRef = useRef(null);

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       content:
//         'Hello Doctor 👨‍⚕️\nI can help with pre-consult summaries, prescription drafts, and translations.\n\nPlease enter patient details.'
//     }
//   ]);

//   useEffect(() => {
//     scrollRef.current?.scrollToEnd({ animated: true });
//   }, [messages, loading]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     const updatedMessages = [
//       ...messages,
//       { role: 'user', content: message }
//     ];

//     setMessages(updatedMessages);
//     setMessage('');
//     setLoading(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-docapp-role': 'doctor'
//         },
//         body: JSON.stringify({
//           mode: 'pre_consult_summary',
//           messages: updatedMessages
//         })
//       });

//       const data = await response.json();

//       setMessages(prev => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: data.success
//             ? data.answer
//             : '⚠️ Unable to generate summary.'
//         }
//       ]);
//     } catch (error) {
//       setMessages(prev => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: '❌ Server not reachable. Please try again.'
//         }
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
//             AI Doctor Assistant
//           </Text>
//         </View>

//         {/* Chat */}
//         <ScrollView
//           ref={scrollRef}
//           contentContainerStyle={tw`px-4 py-3`}
//           style={tw`flex-1`}
//           showsVerticalScrollIndicator={false}
//         >
//           {messages.map((msg, index) => (
//             <View
//               key={index}
//               style={tw`mb-3 ${
//                 msg.role === 'user' ? 'items-end' : 'items-start'
//               }`}
//             >
//               <View
//                 style={tw`px-4 py-3 rounded-2xl max-w-[85%] ${
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

//         {/* Input */}
//         <View style={tw`flex-row items-center p-3 border-t border-gray-300 mb-4`}>
//           <TextInput
//             value={message}
//             onChangeText={setMessage}
//             placeholder="Enter patient case or instruction..."
//             multiline
//             style={tw`flex-1 border border-gray-300 rounded-2xl px-4 py-2`}
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

// export default AIDoctorChatScreen;








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
  SafeAreaView
} from 'react-native';
import tw from 'twrnc';

const API_URL = 'http://ai.docapp.co.in/api/doctor/chat';

/* -------------------- Helper: Parse Doctor AI Response -------------------- */
const parseDoctorResponse = (text) => {
  const sections = text.split('### ').filter(Boolean);

  return sections.map(section => {
    const [titleLine, ...contentLines] = section.split('\n');
    return {
      title: titleLine.trim(),
      content: contentLines.join('\n').trim()
    };
  });
};

/* -------------------- UI: Doctor Response Card -------------------- */
const DoctorResponseCard = ({ title, content }) => {
  const lines = content.split('\n').filter(Boolean);

  return (
    <View style={tw`bg-gray-100 rounded-2xl p-4 mb-4`}>
      <Text style={tw`text-green-700 text-lg font-bold mb-2`}>
        {title}
      </Text>

      {lines.map((line, index) => {
        // Section labels (**Chief Complaint:**)
        if (line.startsWith('**')) {
          return (
            <Text
              key={index}
              style={tw`text-green-800 font-semibold mt-3`}
            >
              {line.replace(/\*\*/g, '')}
            </Text>
          );
        }

        // Bullet points
        if (line.startsWith('-')) {
          return (
            <Text
              key={index}
              style={tw`text-gray-700 ml-3 mt-1`}
            >
              • {line.replace('-', '').trim()}
            </Text>
          );
        }

        return (
          <Text key={index} style={tw`text-gray-700 mt-1`}>
            {line}
          </Text>
        );
      })}
    </View>
  );
};

/* -------------------- MAIN SCREEN -------------------- */
const AIDoctorChatScreen = () => {
  const scrollRef = useRef(null);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello Doctor 👨‍⚕️\nI can help with pre-consult summaries, prescription drafts, and translations.\n\nPlease enter patient details.'
    }
  ]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages = [
      ...messages,
      { role: 'user', content: input }
    ];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-docapp-role': 'doctor'
        },
        body: JSON.stringify({
          mode: 'pre_consult_summary',
          messages: updatedMessages
        })
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.success
            ? data.answer
            : '⚠️ Unable to generate summary.'
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '❌ Server not reachable. Please try again.'
        }
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
        <View style={tw`bg-green-700 p-4`}>
          <Text style={tw`text-white text-lg font-bold text-center`}>
            AI Doctor Assistant
          </Text>
        </View>

        {/* Chat Area */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={tw`px-4 py-3`}
          style={tw`flex-1`}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => {
            // Structured doctor response
            if (msg.role === 'assistant' && msg.content.includes('###')) {
              const sections = parseDoctorResponse(msg.content);

              return (
                <View key={index} style={tw`mb-4`}>
                  {sections.map((section, idx) => (
                    <DoctorResponseCard
                      key={idx}
                      title={section.title}
                      content={section.content}
                    />
                  ))}
                </View>
              );
            }

            // Normal chat bubbles
            return (
              <View
                key={index}
                style={tw`mb-3 ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <View
                  style={tw`px-4 py-3 rounded-2xl max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-green-600 rounded-br-none'
                      : 'bg-gray-200 rounded-bl-none'
                  }`}
                >
                  <Text
                    style={tw`${
                      msg.role === 'user'
                        ? 'text-white'
                        : 'text-gray-900'
                    }`}
                  >
                    {msg.content}
                  </Text>
                </View>
              </View>
            );
          })}

          {loading && (
            <View style={tw`items-start`}>
              <View style={tw`bg-gray-200 px-4 py-2 rounded-2xl`}>
                <ActivityIndicator size="small" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={tw`flex-row items-center p-3 border-t border-gray-300 mb-4`}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter patient case or instruction..."
            multiline
            style={tw`flex-1 border border-gray-300 rounded-2xl px-4 py-2`}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={tw`ml-2 bg-green-700 px-5 py-2 rounded-full`}
          >
            <Text style={tw`text-white font-bold`}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIDoctorChatScreen;
