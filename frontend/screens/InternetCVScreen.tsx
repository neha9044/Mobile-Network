import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image as ExpoImage } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* ---------------- TYPES ---------------- */

interface Experience {
  id: string;
  role: string;
  company: string;
  logo: string;
  duration: string;
  location: string;
  description: string[];
  certificateImage?: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  grade: string;
  year: string;
  description: string[];
  certificateImage?: string;
}

interface LinkItem {
  id: string;
  icon: any;
  title: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  license: string;
  image?: string;
}

/* ---------------- MOCK DATA ---------------- */

const MOCK_DATA = {
  profile: {
    name: "Sheshasai Dusa",
    title: "SDE - II @Google",
    subtitle: "Senior Software Engineer.\nEntrepreneur. Educator.",
    bio: "Indie hacker mentoring the next generation of builders.",
    avatar: "https://i.pravatar.cc/300?img=11",
    skills: [
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "Flutter", color: "#02569B" },
      { name: "NodeJS", color: "#339933" },
      { name: "Design", color: "#E91E63" },
      { name: "Marketing", color: "#9C27B0" },
      { name: "Business Development", color: "#00BCD4" },
    ],
  },
  experience: [
    {
      id: "1",
      role: "Ui/Ux Developer",
      company: "SalesForce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png",
      duration: "Dec 2021 - July 2024",
      location: "",
      description: [
        "At Beetle, we've reported 1.2k issues across 1.2 million lines of code in the past 2 weeks.",
        "Led end-to-end design for core workflows across web and desktop platforms, balancing usability with deeply opinionated technical constraints.",
        "Collaborated closely with PMs and engineers to translate vague strategy slides into actual, shippable interfaces.",
        "Designed and iterated on complex dashboards, improving task completion time and reducing user friction through research-backed decisions.",
        "Ran usability studies, synthesized insights, and advocated for user needs in rooms full of people who loved metrics more than humans.",
      ],
      certificateImage: "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-gold-elegant-certificate-of-appreciation-wa_CHFi1gpM.jpg",
    },
  ],
  education: [
    {
      id: "1",
      school: "SIES Graduate School Of Technology",
      degree: "AIML Engineering",
      grade: "8.2 CGPA",
      year: "2021 - 2025",
      description: [
        "Worked on enterprise-scale products used by millions, where \"simple\" usually meant twelve edge cases and three review meetings.",
        "Led end-to-end design for core workflows across web and desktop platforms, balancing usability with deeply opinionated technical constraints.",
      ],
      certificateImage: "https://img.freepik.com/free-vector/gradient-certificate-template-appreciation_23-2149021677.jpg",
    },
  ],
  links: [
    { id: "1", icon: "github", title: "www.github.com/username", url: "https://github.com" },
    { id: "2", icon: "twitter", title: "www.x.com/username", url: "https://x.com" },
    { id: "3", icon: "facebook", title: "www.facebook.com/username", url: "https://facebook.com" },
  ],
  projects: [
    {
      id: "1",
      title: "Github Project name v01",
      description: "This is the description of the project that has to be showcased in the following section I am making it bigger...",
      link: "https://github.com",
    },
  ],
  certificates: [
    {
      id: "1",
      name: "Postman API Fundamentals - HackerRank",
      issuer: "HackerRank",
      license: "1223456",
      image: "https://img.freepik.com/free-vector/gradient-certificate-template-appreciation_23-2149021677.jpg",
    },
    {
        id: "2",
        name: "Postman API Fundamentals - HackerRank",
        issuer: "HackerRank",
        license: "1223456",
        image: "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-gold-elegant-certificate-of-appreciation-wa_CHFi1gpM.jpg",
    }
  ],
  others: [
    { id: "1", icon: "language", title: "Languages", value: "Hindi, English And Marathi" },
    { id: "2", icon: "gamepad-variant-outline", title: "Hobbies", value: "Cricket, Reading And Travelling" },
  ],
};

/* ---------------- COMPONENT ---------------- */

export default function InternetCVScreen({ onEdit, onBack, data }: { onEdit?: (section: string) => void, onBack?: () => void, data: any }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#18181b");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View className="flex-1 bg-[#171717]">
      <View className="flex-1 relative">
        {/* HEADER */}
        <View 
          className="absolute top-0 left-0 right-0 z-50"
          style={{ paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 30) : insets.top }}
        >
          <LinearGradient
            colors={["#8086FF", "#6b71e3"]}
            className="absolute top-0 left-0 right-0 bottom-0"
          />
          <View className="px-4 pb-3 pt-2 flex-row items-center">
            <TouchableOpacity onPress={onBack} className="p-2 mr-2">
              <Ionicons name="chevron-back" size={24} color="#e5e7eb" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold font-sans">My Profile</Text>
            <View className="flex-1" />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60, paddingTop: 100 }}>
          <LinearGradient
              colors={["#8086FF", "#171717"]}
              className="absolute top-0 left-0 right-0 h-[600px]"
          />
        
        {/* BASIC DETAILS - moved up logic handled by padding */}
        <View className="items-center px-4 mt-12 mb-8">
            <View className="relative mb-4">
              <View className="w-28 h-28 rounded-full border-4 border-[#27272a] overflow-hidden shadow-2xl">
                 <ExpoImage 
                    source={{ uri: data.cv.profilePhoto || data.user.profilePhoto }} 
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                 />
              </View>
              <View className="absolute bottom-0 right-0 bg-[#a78bfa] w-8 h-8 rounded-full border-4 border-[#171717] items-center justify-center">
                 <Ionicons name="checkmark" size={16} color="white" />
              </View>
            </View>

            <Text className="text-white text-2xl font-bold mb-1 tracking-tight text-center relative">
              {data.user.firstName} {data.user.lastName} 
            </Text>
            
            <TouchableOpacity 
                onPress={() => onEdit?.("basic")}
                className="absolute top-0 right-4 p-2 bg-[#27272a] rounded-full border border-gray-700"
            >
                <SimpleLineIcons name="pencil" size={14} color="#a78bfa" />
            </TouchableOpacity>
            <Text className="text-[#8b5cf6] font-medium mb-1 text-center">
              {data.cv.profession}
            </Text>
            {/* Subtitle removed */}
            <Text className="text-gray-400 text-sm leading-5 mb-4 text-center px-4">
              {data.cv.profileSummary}
            </Text>

            <View className="flex-row flex-wrap gap-2 justify-center">
              {data.cv.skills.map((skill: string, index: number) => (
                <View
                  key={index}
                  className="bg-[#27272a] px-3 py-1.5 rounded-lg border border-gray-800 flex-row items-center"
                >
                  <Text className="text-gray-300 text-xs font-medium">
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          </View>

        {/* EXPERIENCE */}
        <View className="px-5 mt-8">
          <SectionHeader title="EXPERIENCE" onEdit={() => onEdit?.("experience")} />
          {data.cv.experiences.map((item: any, index: number) => (
            <View key={item.id || index} className="mt-4 mb-6">
              <View className="flex-row mb-2">
                <View className="w-10 h-10 bg-white rounded-lg items-center justify-center mr-3">
                   <FontAwesome5 name="salesforce" size={24} color="#00A1E0" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-base font-bold">{item.role}</Text>
                  <Text className="text-gray-400 text-sm">{item.organization}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center mb-3">
                 <Text className="text-gray-500 text-xs mr-1">
                    {item.startDate} - {item.endDate} 
                    {item.type ? ` • ${item.type}` : ""}
                 </Text>
                 <TouchableOpacity onPress={() => toggleExpand(item.id)} className="flex-row items-center">
                    <Text className="text-gray-300 text-xs font-medium">
                        {expandedItems[item.id] ? "See Less" : "See More"}
                    </Text>
                    <Ionicons 
                        name={expandedItems[item.id] ? "chevron-up" : "chevron-down"} 
                        size={12} 
                        color="#d1d5db" 
                        style={{marginLeft: 2}} 
                    />
                 </TouchableOpacity>
              </View>

              {expandedItems[item.id] && (
                  <View className="pl-0 mb-4">
                      {item.technology && (
                          <Text className="text-[#a78bfa] text-xs font-semibold mb-2">
                              Stack: {item.technology}
                          </Text>
                      )}
                      
                      {(item.description ? item.description.split('\n') : []).map((line: string, idx: number) => (
                          <Text key={idx} className="text-gray-400 text-sm leading-5 mb-3">
                            {line}
                          </Text>
                      ))}
                      
                      {item.link && (
                          <TouchableOpacity onPress={() => Linking.openURL(item.link)} className="flex-row items-center mt-2">
                               <Ionicons name="link-outline" size={14} color="#a78bfa" />
                               <Text className="text-[#a78bfa] text-xs ml-1 font-medium">Visit Organization</Text>
                          </TouchableOpacity>
                      )}
                  </View>
              )}

              {item.certificateImage && (
                 <Image 
                    source={{ uri: item.certificateImage }}
                    className="w-full h-48 rounded-lg border border-gray-800"
                    resizeMode="cover"
                 />
              )}
            </View>
          ))}
        </View>

        {/* EDUCATION (QUALIFICATIONS) */}
        <View className="px-5 mt-8">
            <SectionHeader title="EDUCATION" onEdit={() => onEdit?.("education")} />
            <View className="mt-4 relative pl-4 border-l border-gray-800 ml-2">
                {data.cv.qualifications.map((item: any, index: number) => (
                    <View key={item.id || index} className="mb-8 relative">
                         <View className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-[#a78bfa] rounded-full ring-4 ring-[#171717]" />
                         <Text className="text-white text-base font-bold">{item.institution}</Text>
                         {item.board && <Text className="text-gray-500 text-xs italic">{item.board}</Text>}
                         <Text className="text-gray-400 text-sm mt-0.5">{item.degree} • {item.score}</Text>
                         <Text className="text-gray-500 text-xs mt-1">{item.startYear} - {item.endYear}</Text>
                    </View>
                ))}
            </View>
        </View>

        {/* LINKS */}
        <View className="px-5 mt-8">
          <SectionHeader title="LINKS" onEdit={() => onEdit?.("links")} />
          <View className="mt-4 gap-3 flex-row flex-wrap">
            {data.user.socialLinks.map((link: string, index: number) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => openLink(link)}
                    className="flex-row items-center bg-[#27272a] p-3 rounded-xl border border-gray-800"
                >
                    <Ionicons name="link" size={18} color="#9ca3af" style={{marginRight: 10}} />
                    <Text className="text-gray-200 text-sm font-medium" numberOfLines={1}>
                        {link.replace("https://", "").replace("www.", "").split("/")[0]}
                    </Text>
                     <Ionicons name="arrow-forward-outline" size={16} color="#9ca3af" style={{marginLeft: 8}} />
                </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PROJECTS */}
        <View className="px-5 mt-8">
             <SectionHeader title="PROJECTS" onEdit={() => onEdit?.("projects")} />
             <View className="mt-4 gap-4">
                 {data.cv.projects.map((item: any, index: number) => (
                     <View key={item.id || index} className="bg-[#27272a] rounded-xl p-4 border border-gray-800">
                         <Text className="text-white font-bold text-base mb-1">{item.name}</Text>
                         <Text className="text-gray-400 text-sm mb-3" numberOfLines={2}>
                             {item.description}
                         </Text>
                         {item.links && item.links.length > 0 && (
                            <TouchableOpacity onPress={() => Linking.openURL(item.links[0])}>
                                <Text className="text-[#a78bfa] text-xs font-semibold">View Project ↗</Text>
                            </TouchableOpacity>
                         )}
                     </View>
                 ))}
             </View>
        </View>
        
        {/* CERTIFICATIONS */}
        <View className="px-5 mt-8">
             <SectionHeader title="CERTIFICATIONS" onEdit={() => onEdit?.("certificates")} />
             <View className="mt-4 gap-4">
                 {data.cv.certifications.map((item: any, index: number) => (
                     <View key={item.id || index} className="flex-row items-center justify-between bg-[#27272a] p-3 rounded-xl border border-gray-800">
                         <View className="flex-1">
                             <Text className="text-white font-semibold text-sm">{item.name}</Text>
                             <Text className="text-gray-500 text-xs">{item.issuedBy}</Text>
                         </View>
                         {item.link && (
                             <TouchableOpacity onPress={() => Linking.openURL(item.link)} className="bg-[#3f3f46] p-2 rounded-lg">
                                  <Ionicons name="link-outline" size={16} color="white" />
                             </TouchableOpacity>
                         )}
                     </View>
                 ))}
             </View>
        </View>

        {/* OTHERS (Languages/Hobbies) */}
        <View className="px-5 mt-8">
            <SectionHeader title="OTHERS" onEdit={() => onEdit?.("others")} />
            <View className="mt-4 gap-4">
                {/* Languages */}
                <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-[#27272a] items-center justify-center mr-3 border border-gray-700">
                         <ExpoImage 
                           source={require("../assets/images/language_sign.svg")}
                           style={{ width: 16, height: 16 }}
                           contentFit="contain"
                         />
                    </View>
                    <View>
                         <Text className="text-gray-400 text-xs font-semibold mb-0.5">Languages</Text>
                         <Text className="text-white text-sm">{data.cv.languages.join(", ")}</Text>
                    </View>
                </View>
                {/* Hobbies */}
                <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-[#27272a] items-center justify-center mr-3 border border-gray-700">
                         <MaterialCommunityIcons name="gamepad-variant-outline" size={16} color="#a78bfa" />
                    </View>
                    <View>
                         <Text className="text-gray-400 text-xs font-semibold mb-0.5">Hobbies</Text>
                         <Text className="text-white text-sm">{data.cv.hobbies.join(", ")}</Text>
                    </View>
                </View>
            </View>
        </View>

        <View className="h-20" />
      </ScrollView>
      </View>
    </View>
  );
}

const SectionHeader = ({ title, onEdit }: { title: string, onEdit?: () => void }) => (
  <View className="flex-row items-center justify-between border-b border-gray-800 pb-2">
    <Text className="text-[#a78bfa] text-xs font-bold tracking-widest uppercase">
      {title}
    </Text>
    <TouchableOpacity onPress={onEdit}>
      <SimpleLineIcons name="pencil" size={14} color="#9ca3af" />
    </TouchableOpacity>
  </View>
);

