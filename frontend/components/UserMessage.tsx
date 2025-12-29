import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";

/* INLINE MESSAGE TYPE */
type Message = {
  id: number;
  sender: "bot" | "user";
  type: "text" | "pdf" | "voice";
  data: any;
};

export default function UserMessage({ message }: { message: Message }) {
  const soundRef = useRef<Audio.Sound | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  /* CLEANUP */
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  /* PLAY / PAUSE VOICE */
  const togglePlay = async () => {
    const uri = message.data?.uri;

    if (!uri) {
      Alert.alert(
        "No audio file",
        "Voice recording is not yet saved."
      );
      return;
    }

    try {
      // FIRST TIME LOAD
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true }
        );

        soundRef.current = sound;
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;

          setDuration(status.durationMillis ?? 0);
          setPosition(status.positionMillis ?? 0);

          if (status.didJustFinish) {
            setIsPlaying(false);
            setPosition(0);
          }
        });

        return;
      }

      // TOGGLE
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (err) {
      Alert.alert("Playback error");
    }
  };

  const formatTime = (ms: number) => {
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${min}:${rem < 10 ? "0" : ""}${rem}`;
  };

  return (
    <View className="w-full flex-row justify-end mb-3">
      <View className="max-w-[80%] bg-[#53389E] px-6 py-3 rounded-2xl rounded-br-none">
        {/* TEXT */}
        {message.type === "text" && (
          <Text className="text-white text-[15px] leading-5">
            {message.data}
          </Text>
        )}

        {/* PDF */}
        {message.type === "pdf" && (
          <View className="flex-row items-center">
            <Ionicons name="document-text" size={18} color="#fff" />
            <Text className="text-white ml-2 text-[14px]">
              {message.data.name}
            </Text>
          </View>
        )}

        {/* VOICE */}
        {message.type === "voice" && (
          <TouchableOpacity
            onPress={togglePlay}
            className="flex-row items-center"
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={18}
              color="#fff"
            />
            <Text className="text-white ml-3 text-[13px]">
              {formatTime(position)} / {formatTime(duration)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
