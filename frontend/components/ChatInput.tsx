import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

interface Props {
  onSend: (payload: {
    type: "text" | "pdf" | "voice";
    data: any;
  }) => void;
}

type PdfFile = {
  name: string;
  uri: string;
  size?: number;
};

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [pdf, setPdf] = useState<PdfFile | null>(null);
  const [recording, setRecording] = useState(false);

  /* ---------------- PDF PICK ---------------- */
  const handlePickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];

    if (file.mimeType !== "application/pdf") {
      Alert.alert("Only PDF allowed");
      return;
    }

    setPdf({
      name: file.name,
      uri: file.uri,
      size: file.size,
    });
  };

  /* ---------------- MIC (UI ONLY FOR NOW) ---------------- */
  const startRecording = () => {
    setRecording(true);
  };

  const sendVoice = () => {
    onSend({
      type: "voice",
      data: { placeholder: true },
    });
    resetAll();
  };

  /* ---------------- SEND ---------------- */
  const sendTextOrPdf = () => {
    if (pdf) {
      onSend({ type: "pdf", data: pdf });
      resetAll();
      return;
    }

    if (text.trim()) {
      onSend({ type: "text", data: text.trim() });
      resetAll();
    }
  };

  const resetAll = () => {
    setText("");
    setPdf(null);
    setRecording(false);
  };

  const hasText = text.trim().length > 0;
  const hasPdf = pdf !== null;
  const showSend = hasText || hasPdf || recording;

  const handleActionPress = () => {
    if (recording) {
      sendVoice();
    } else if (showSend) {
      sendTextOrPdf();
    } else {
      startRecording();
    }
  };

  return (
    <View className="bg-[#1c1c1e] rounded-full px-3 py-2">
      {/* PDF PREVIEW */}
      {pdf && (
        <View className="flex-row items-center bg-black/40 rounded-full px-3 py-1 mb-2">
          <Ionicons name="document-text" size={16} color="#7c5cff" />
          <Text numberOfLines={1} className="text-white text-xs ml-2 flex-1">
            {pdf.name}
          </Text>
          <TouchableOpacity onPress={() => setPdf(null)}>
            <Ionicons name="close" size={16} color="#aaa" />
          </TouchableOpacity>
        </View>
      )}

      {/* INPUT ROW */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={handlePickPdf} className="mr-4">
          <Ionicons name="add" size={25} color="#7c5cff" />
        </TouchableOpacity>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={recording ? "Recording voice…" : "Enter your response"}
          placeholderTextColor="#9ca3af"
          className="flex-1 text-white text-[15px]"
          editable={!recording}
        />

        <TouchableOpacity onPress={handleActionPress} className="ml-5">
          <Ionicons
            name={showSend ? "send" : "mic-outline"}
            size={23}
            color={showSend ? "#7c5cff" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
