import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Image as ImageIcon, Eye, RefreshCw, Trash2, Plus } from 'lucide-react-native';
import tw from 'twrnc';

export interface DocumentItem {
    id: number;
    user_id?: number;
    appointment_id?: number;
    document_name?: string;
    document_url?: string;
    document_type?: string;
    uploaded_at?: string;
}

interface PatientDocumentsProps {
    documents?: DocumentItem[];
    onUpload?: () => void;
    onView?: (doc: DocumentItem) => void;
    onReplace?: (docId: number) => void;
    onDelete?: (docId: number) => void;
}

const PatientDocuments: React.FC<PatientDocumentsProps> = ({
    documents = [],
    onUpload,
    onView,
    onReplace,
    onDelete,
}) => {
    // Filter to include JPG / JPEG / PNG / image documents only
    const imageDocuments = documents.filter((doc) => {
        const url = (doc.document_url || '').toLowerCase();
        const name = (doc.document_name || '').toLowerCase();
        const type = (doc.document_type || '').toLowerCase();
        return (
            url.includes('.jpg') ||
            url.includes('.jpeg') ||
            url.includes('.png') ||
            name.includes('.jpg') ||
            name.includes('.jpeg') ||
            name.includes('.png') ||
            type.includes('image')
        );
    });

    return (
        /* Section - Documents Card Container */
        <View
            style={[
                tw`w-full bg-white rounded-[12px] p-4 md:p-6 border border-[#DAE1E7] gap-[16px]`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            {/* Header Row Container */}
            <View style={tw`w-full flex-row justify-between items-center h-[28px]`}>
                <Text
                    style={tw`text-[20px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}
                >
                    Patient Files
                </Text>

                {/* Right Header Group: Count Badge + Add File Button */}
                <View style={tw`flex-row items-center gap-[10px]`}>
                    {/* Count Pill Badge */}
                    <View style={tw`bg-[#DBE3F1] rounded-full px-[10px] py-[4px] justify-center items-center`}>
                        <Text
                            style={tw`text-[12px] font-semibold text-[#124CB8] font-['Inter'] tracking-[0.6px] leading-[16px]`}
                        >
                            {imageDocuments.length} {imageDocuments.length === 1 ? 'File' : 'Files'}
                        </Text>
                    </View>

                    {/* Plus Icon Button to Upload New File */}
                    {onUpload && (
                        <TouchableOpacity
                            onPress={onUpload}
                            activeOpacity={0.7}
                            style={tw`bg-[#124CB8] w-[28px] h-[28px] rounded-full justify-center items-center`}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Plus size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Documents Item List */}
            {imageDocuments.length === 0 ? (
                <View style={tw`py-4 items-center justify-center`}>
                    <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>
                        No JPG/Image files uploaded for this appointment.
                    </Text>
                </View>
            ) : (
                <View style={tw`w-full flex-col gap-[12px]`}>
                    {imageDocuments.map((doc) => {
                        const fileName = doc.document_name || `Document #${doc.id}.jpg`;
                        const uploadDate = doc.uploaded_at
                            ? new Date(doc.uploaded_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                            : 'Uploaded file';

                        return (
                            <View
                                key={doc.id}
                                style={tw`w-full border border-[#C3C6D5] rounded-[8px] p-[12px] flex-row items-center gap-[12px] bg-[#FAFBFD]`}
                            >
                                {/* Left Image Thumbnail / Icon */}
                                <TouchableOpacity onPress={() => onView?.(doc)} style={tw`justify-center items-center flex-shrink-0`}>
                                    {doc.document_url ? (
                                        <Image
                                            source={{ uri: doc.document_url }}
                                            style={tw`w-[40px] h-[40px] rounded-[6px] bg-[#DBE9FF] flex-shrink-0`}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <View style={tw`w-[40px] h-[40px] rounded-[6px] bg-[#EEF4FF] justify-center items-center flex-shrink-0`}>
                                            <ImageIcon size={20} color="#124CB8" />
                                        </View>
                                    )}
                                </TouchableOpacity>

                                {/* Document Name & Upload Metadata */}
                                <TouchableOpacity onPress={() => onView?.(doc)} style={tw`flex-1 flex-col justify-center min-w-0`}>
                                    <Text
                                        style={tw`text-[14px] font-semibold text-[#011D35] font-['Inter'] leading-[20px]`}
                                        numberOfLines={1}
                                    >
                                        {fileName}
                                    </Text>
                                    <Text
                                        style={tw`text-[11px] font-normal text-[#434653] font-['Inter'] leading-[16px]`}
                                        numberOfLines={1}
                                    >
                                        {uploadDate}
                                    </Text>
                                </TouchableOpacity>

                                {/* Right Action Buttons: View, Replace, Delete */}
                                <View style={tw`flex-row items-center gap-[10px] flex-shrink-0`}>
                                    {/* View Button */}
                                    <TouchableOpacity
                                        onPress={() => onView?.(doc)}
                                        style={tw`p-[6px] bg-[#EEF4FF] rounded-[6px]`}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <Eye size={18} color="#124CB8" />
                                    </TouchableOpacity>

                                    {/* Replace Button (Calls replace-document API) */}
                                    <TouchableOpacity
                                        onPress={() => onReplace?.(doc.id)}
                                        style={tw`p-[6px] bg-[#FFF3E0] rounded-[6px]`}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <RefreshCw size={18} color="#E65100" />
                                    </TouchableOpacity>

                                    {/* Delete Button (Calls delete-document API) */}
                                    <TouchableOpacity
                                        onPress={() => onDelete?.(doc.id)}
                                        style={tw`p-[6px] bg-[#FFEBEE] rounded-[6px]`}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <Trash2 size={18} color="#D32F2F" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default PatientDocuments;