import { Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  className = "",
  textClassName = "",
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      className={`
        w-full
        py-4
        rounded-xl
        px-4
        ${className}
      `}
    >
      <Text
        className={`
          text-base
          font-semibold
          ${textClassName}
        `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}