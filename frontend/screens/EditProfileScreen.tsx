import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
  BackHandler,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

type EditSection = "basic" | "experience" | "education" | "links" | "projects" | "certificates" | "others";

interface EditProfileScreenProps {
  section: EditSection;
  data: any;
  onBack: () => void;
  onSave: (updatedData: any) => void;
}

const InputLabel = ({ label, required }: { label: string; required?: boolean }) => (
  <Text className="text-gray-400 text-xs font-semibold mb-1">
    {label} {required && <Text className="text-red-500">*</Text>}
  </Text>
);

const InputField = ({ value, onChangeText, multiline, placeholder }: any) => (
  <TextInput
    className={`bg-[#27272a] text-white p-3 rounded-xl border border-gray-800 ${multiline ? 'h-24 text-top' : ''}`}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor="#52525b"
    multiline={multiline}
    textAlignVertical={multiline ? "top" : "center"}
  />
);

export default function EditProfileScreen({
  section,
  data,
  onBack,
  onSave,
}: EditProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<any>(JSON.parse(JSON.stringify(data))); // Deep copy to avoid mutating prop directly before save

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#171717");
      NavigationBar.setButtonStyleAsync("light");

       const backAction = () => {
         onBack();
         return true;
       };
       const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
       return () => backHandler.remove();
    }
  }, [onBack]);

  const updateProfileField = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const getTitle = () => {
    switch (section) {
      case "basic": return "Basic Details";
      case "experience": return "Experience";
      case "education": return "Education";
      case "links": return "Links";
      case "projects": return "Projects";
      case "certificates": return "Certificates";
      default: return "Edit Profile";
    }
  };

  const renderContent = () => {
    switch (section) {
      case "basic":
        return <BasicDetailsForm 
            user={formData.user} 
            cv={formData.cv}
            onChangeUser={(updates: any) => setFormData({...formData, user: {...formData.user, ...updates}})}
            onChangeCV={(updates: any) => setFormData({...formData, cv: {...formData.cv, ...updates}})}
        />;
      case "experience":
         return <ExperienceForm 
            data={formData.cv.experiences} 
            onChange={(newExp: any) => setFormData({...formData, cv: {...formData.cv, experiences: newExp}})} 
         />;
      case "education":
          return <EducationForm 
            data={formData.cv.qualifications} 
            onChange={(newEdu: any) => setFormData({...formData, cv: {...formData.cv, qualifications: newEdu}})} 
          />;
      case "links":
          return <LinksForm 
            data={formData.user.socialLinks} 
            onChange={(newLinks: any) => setFormData({...formData, user: {...formData.user, socialLinks: newLinks}})} 
          />;
      case "projects":
          return <ProjectsForm 
            data={formData.cv.projects} 
            onChange={(newProj: any) => setFormData({...formData, cv: {...formData.cv, projects: newProj}})} 
          />;
      case "certificates":
          return <CertificatesForm 
            data={formData.cv.certifications} 
            onChange={(newCert: any) => setFormData({...formData, cv: {...formData.cv, certifications: newCert}})} 
          />;
      case "others": 
          return <OthersForm 
            languages={formData.cv.languages} 
            hobbies={formData.cv.hobbies} 
            onChangeLanguages={(val: any) => setFormData({...formData, cv: {...formData.cv, languages: val}})}
            onChangeHobbies={(val: any) => setFormData({...formData, cv: {...formData.cv, hobbies: val}})} 
          />;
      default:
        return (
            <View>
                <Text className="text-gray-500 text-center mt-10">Section editing coming soon...</Text>
            </View>
        );
    }
  };

  return (
    <View className="flex-1 bg-[#171717]" style={{ paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 30) : insets.top }}>
      {/* HEADER */}
      <View className="px-4 py-3 flex-row items-center justify-between border-b border-gray-800">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={onBack} className="mr-3">
            <Ionicons name="chevron-back" size={24} color="#e5e7eb" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold font-sans">{getTitle()}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => onSave(formData)}
          className="bg-[#a78bfa] px-4 py-1.5 rounded-lg"
        >
          <Text className="text-white font-bold font-sans">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View className="h-20" /> 
      </ScrollView>
    </View>
  );
}
/* ---------------- FORMS ---------------- */



const BasicDetailsForm = ({ user, cv, onChangeUser, onChangeCV }: { user: any, cv: any, onChangeUser: (d: any) => void, onChangeCV: (d: any) => void }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onChangeCV({ profilePhoto: result.assets[0].uri }); 
      // User might want to update USER photo too? 
      // Schema has profilePhoto in User AND InternetCv. I'll update CV for now as that's what's shown.
    }
  };

  return (
    <View>
      {/* Avatar */}
      <View className="flex-row justify-center mb-6">
        <View className="relative">
          <Image
            source={{ uri: cv.profilePhoto || user.profilePhoto }}
            className="w-24 h-24 rounded-full border-2 border-[#a78bfa]"
          />
          <TouchableOpacity 
            onPress={pickImage}
            className="absolute bottom-0 right-0 bg-[#3f3f46] p-2 rounded-full border border-[#171717]"
          >
             <MaterialCommunityIcons name="pencil" size={16} color="#e5e7eb" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="gap-4">
        <View className="flex-row gap-4">
            <View className="flex-1">
                <InputLabel label="First Name" required />
                <InputField 
                    value={user.firstName} 
                    onChangeText={(text: string) => onChangeUser({ firstName: text })}
                    placeholder="First Name" 
                />
            </View>
            <View className="flex-1">
                <InputLabel label="Last Name" />
                <InputField 
                    value={user.lastName} 
                    onChangeText={(text: string) => onChangeUser({ lastName: text })}
                    placeholder="Last Name" 
                />
            </View>
        </View>
        <View>
            <InputLabel label="Profession" required />
            <InputField 
                value={cv.profession}
                onChangeText={(text: string) => onChangeCV({ profession: text })}
                placeholder="e.g. SDE II" 
            />
        </View>
        
        <View>
            <InputLabel label="Profile Summary" required />
            <View className="bg-[#27272a] border border-gray-700 rounded-xl p-3 h-32">
                 <TextInput 
                    value={cv.profileSummary}
                    onChangeText={(text: string) => onChangeCV({ profileSummary: text })}
                    placeholder="Tell us about yourself..." 
                    placeholderTextColor="#52525b"
                    className="text-white flex-1 text-sm leading-5"
                    multiline
                    textAlignVertical="top"
                 />
                 <Text className="text-gray-500 text-xs text-right mt-1">{cv.profileSummary?.length || 0}/200 ✏️</Text>
            </View>
        </View>

        <View>
            <InputLabel label="Skills" />
            <SkillsForm 
                data={cv.skills}
                onChange={(newSkills) => onChangeCV({ skills: newSkills })}
            />
        </View>
      </View>
    </View>
  );
};

const ExperienceForm = ({ data, onChange }: { data: any[], onChange: (d: any[]) => void }) => {
    const handleChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleAdd = () => {
        onChange([...data, { id: Date.now().toString(), role: "", organization: "", startDate: "", endDate: "", description: "" }]);
    };

    const handleRemove = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <View>
            {data.map((item, index) => (
                <View key={index} className="mb-6 border-b border-gray-800 pb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-gray-400 font-semibold">Experience {index + 1}</Text>
                        <TouchableOpacity onPress={() => handleRemove(index)}>
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Role" required />
                        <InputField 
                            value={item.role} 
                            onChangeText={(text: string) => handleChange(index, "role", text)}
                            placeholder="e.g. Senior Developer" 
                        />
                    </View>
                    <View className="flex-row gap-4 mb-4">
                        <View className="flex-1">
                             <InputLabel label="Organization" required />
                             <InputField 
                                 value={item.organization} 
                                 onChangeText={(text: string) => handleChange(index, "organization", text)}
                                 placeholder="e.g. Google" 
                             />
                        </View>
                        <View className="flex-1">
                             <InputLabel label="Type" />
                             <InputField 
                                 value={item.type} 
                                 onChangeText={(text: string) => handleChange(index, "type", text)}
                                 placeholder="Full-time / Remote" 
                             />
                        </View>
                    </View>
                    <View className="flex-row gap-4 mb-4">
                         <View className="flex-1">
                            <InputLabel label="Start Date" required />
                            <InputField 
                                value={item.startDate} 
                                onChangeText={(text: string) => handleChange(index, "startDate", text)}
                                placeholder="e.g. Jan 2022" 
                            />
                         </View>
                         <View className="flex-1">
                            <InputLabel label="End Date" />
                            <InputField 
                                value={item.endDate} 
                                onChangeText={(text: string) => handleChange(index, "endDate", text)}
                                placeholder="e.g. Present" 
                            />
                         </View>
                    </View>
                    <View className="mb-4">
                         <InputLabel label="Technologies used" />
                         <InputField 
                             value={item.technology} 
                             onChangeText={(text: string) => handleChange(index, "technology", text)}
                             placeholder="React, Node.js, AWS..." 
                         />
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Company Link" />
                        <InputField 
                            value={item.link} 
                            onChangeText={(text: string) => handleChange(index, "link", text)}
                            placeholder="https://..." 
                        />
                    </View>
                    <View className="mb-4">
                         <InputLabel label="Description" required />
                         <InputField 
                            value={item.description} 
                            onChangeText={(text: string) => handleChange(index, "description", text)}
                            placeholder="Describe your role..."
                            multiline
                         />
                    </View>
                </View>
            ))}

            <TouchableOpacity 
                onPress={handleAdd}
                className="border border-dashed border-gray-600 rounded-xl p-4 flex-row items-center justify-center mt-2"
            >
                 <Ionicons name="add" size={20} color="#e5e7eb" />
                 <Text className="text-gray-300 ml-2">Add New Experience</Text>
            </TouchableOpacity>
        </View>
    );
};

const EducationForm = ({ data, onChange }: { data: any[], onChange: (d: any[]) => void }) => {
    const handleChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleAdd = () => {
        onChange([...data, { id: Date.now().toString(), institution: "", degree: "", score: "", startYear: "", endYear: "", board: "" }]);
    };

    const handleRemove = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <View>
             {data.map((item, index) => (
                <View key={index} className="mb-6 border-b border-gray-800 pb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-gray-400 font-semibold">Education {index + 1}</Text>
                        <TouchableOpacity onPress={() => handleRemove(index)}>
                             <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                     <View className="mb-4">
                        <InputLabel label="Institution Name" required />
                        <InputField 
                            value={item.institution} 
                            onChangeText={(text: string) => handleChange(index, "institution", text)}
                            placeholder="e.g. MIT" 
                        />
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Board / University" />
                        <InputField 
                            value={item.board} 
                            onChangeText={(text: string) => handleChange(index, "board", text)}
                            placeholder="e.g. CBSE / University of Mumbai" 
                        />
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Degree" required />
                        <InputField 
                            value={item.degree} 
                            onChangeText={(text: string) => handleChange(index, "degree", text)}
                            placeholder="e.g. B.S. Computer Science" 
                        />
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Score" />
                        <InputField 
                            value={item.score} 
                            onChangeText={(text: string) => handleChange(index, "score", text)}
                            placeholder="e.g. 8.5 CGPA" 
                        />
                    </View>
                    <View className="flex-row gap-4 mb-4">
                        <View className="flex-1">
                            <InputLabel label="Start Year" required />
                            <InputField 
                                value={item.startYear ? String(item.startYear) : ""} 
                                onChangeText={(text: string) => handleChange(index, "startYear", text)}
                                placeholder="e.g. 2020" 
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <InputLabel label="End Year" required />
                            <InputField 
                                value={item.endYear ? String(item.endYear) : ""} 
                                onChangeText={(text: string) => handleChange(index, "endYear", text)}
                                placeholder="e.g. 2024" 
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>
             ))}

             <TouchableOpacity 
                onPress={handleAdd}
                className="border border-dashed border-gray-600 rounded-xl p-4 flex-row items-center justify-center mt-2"
            >
                 <Ionicons name="add" size={20} color="#e5e7eb" />
                 <Text className="text-gray-300 ml-2">Add New Education</Text>
            </TouchableOpacity>
        </View>
    );
};

const LinksForm = ({ data, onChange }: { data: string[], onChange: (d: string[]) => void }) => {
    const handleAdd = () => {
        onChange([...(data || []), ""]);
    };

    const handleChange = (index: number, value: string) => {
        const newData = [...data];
        newData[index] = value;
        onChange(newData);
    };

    const handleRemove = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <View>
            {data?.map((link, index) => (
                <View key={index} className="flex-row items-center mb-4">
                     <View className="flex-1">
                        <InputField 
                            value={link} 
                            onChangeText={(text: string) => handleChange(index, text)}
                            placeholder="https://..." 
                        />
                     </View>
                     <TouchableOpacity onPress={() => handleRemove(index)} className="ml-2">
                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                     </TouchableOpacity>
                </View>
            ))}
             <TouchableOpacity 
                onPress={handleAdd}
                className="border border-dashed border-gray-600 rounded-xl p-4 flex-row items-center justify-center mt-2"
            >
                 <Ionicons name="add" size={20} color="#e5e7eb" />
                 <Text className="text-gray-300 ml-2">Add Link</Text>
            </TouchableOpacity>
        </View>
    );
};

const ProjectsForm = ({ data, onChange }: { data: any[], onChange: (d: any[]) => void }) => {
    const handleChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleAdd = () => {
        onChange([...data, { id: Date.now().toString(), name: "", links: [], description: "" }]);
    };
    
    // Simplification for links in projects: just one link input for now, or comma separated?
    // User schema says String[] for links.
    // I'll assume one primary link for editing simplicity in this MVP, 
    // or parse comma separated string.
    // I'll treat it as a single link in UI for now `links[0]`.

    const handleProjectLinkChange = (index: number, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], links: [value] };
        onChange(newData);
    };

    const handleRemove = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <View>
             {data?.map((item, index) => (
                <View key={index} className="mb-6 border-b border-gray-800 pb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-gray-400 font-semibold">Project {index + 1}</Text>
                        <TouchableOpacity onPress={() => handleRemove(index)}>
                             <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Project Name" required />
                        <InputField 
                            value={item.name} 
                            onChangeText={(text: string) => handleChange(index, "name", text)}
                            placeholder="e.g. Portfolio Website" 
                        />
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Project Link" />
                        <InputField 
                            value={item.links?.[0] || ""} 
                            onChangeText={(text: string) => handleProjectLinkChange(index, text)}
                            placeholder="https://..." 
                        />
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Description" required />
                        <InputField 
                            value={item.description} 
                            onChangeText={(text: string) => handleChange(index, "description", text)}
                            placeholder="Describe your project..."
                            multiline
                        />
                    </View>
                </View>
             ))}

             <TouchableOpacity 
                onPress={handleAdd}
                className="border border-dashed border-gray-600 rounded-xl p-4 flex-row items-center justify-center mt-2"
            >
                 <Ionicons name="add" size={20} color="#e5e7eb" />
                 <Text className="text-gray-300 ml-2">Add New Project</Text>
            </TouchableOpacity>
        </View>
    );
};

const CertificatesForm = ({ data, onChange }: { data: any[], onChange: (d: any[]) => void }) => {
     const handleChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleAdd = () => {
        onChange([...data, { id: Date.now().toString(), name: "", issuedBy: "", description: "", link: "" }]);
    };

    const handleRemove = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <View>
             {data?.map((item, index) => (
                <View key={index} className="mb-6 border-b border-gray-800 pb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-gray-400 font-semibold">Certificate {index + 1}</Text>
                        <TouchableOpacity onPress={() => handleRemove(index)}>
                             <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Name" required />
                        <InputField 
                            value={item.name} 
                            onChangeText={(text: string) => handleChange(index, "name", text)}
                            placeholder="e.g. AWS Certified" 
                        />
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Issued By" required />
                        <InputField 
                            value={item.issuedBy} 
                            onChangeText={(text: string) => handleChange(index, "issuedBy", text)}
                            placeholder="e.g. Amazon" 
                        />
                    </View>
                    <View className="mb-4">
                        <InputLabel label="Description" />
                         <InputField 
                            value={item.description} 
                            onChangeText={(text: string) => handleChange(index, "description", text)}
                            placeholder="Brief description..."
                            multiline
                        />
                    </View>
                     <View className="mb-4">
                        <InputLabel label="Certificate Link" />
                        <InputField 
                            value={item.link} 
                            onChangeText={(text: string) => handleChange(index, "link", text)}
                            placeholder="https://..." 
                        />
                    </View>
                </View>
             ))}

             <TouchableOpacity 
                onPress={handleAdd}
                className="border border-dashed border-gray-600 rounded-xl p-4 flex-row items-center justify-center mt-2"
            >
                 <Ionicons name="add" size={20} color="#e5e7eb" />
                 <Text className="text-gray-300 ml-2">Add New Certificate</Text>
            </TouchableOpacity>
        </View>
    );
};

const SkillsForm = ({ data, onChange }: { data: any[], onChange: (d: any[]) => void }) => {
    const [newSkill, setNewSkill] = useState("");

    const handleAdd = () => {
        if (newSkill.trim()) {
            onChange([...(data || []), newSkill.trim()]);
            setNewSkill("");
        }
    };

    const handleRemove = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <View>
             <View className="mb-4">
                <InputLabel label="Add Skills" />
                <View className="flex-row gap-2">
                     <TextInput
                        className="flex-1 bg-[#27272a] border border-gray-800 rounded-xl p-3 text-white"
                        value={newSkill}
                        onChangeText={setNewSkill}
                        placeholder="e.g. React Native"
                        placeholderTextColor="#52525b"
                        onSubmitEditing={handleAdd}
                     />
                     <TouchableOpacity 
                        onPress={handleAdd}
                        className="bg-[#a78bfa] px-4 justify-center rounded-xl"
                     >
                        <Ionicons name="add" size={24} color="white" />
                     </TouchableOpacity>
                </View>
             </View>

             <View className="flex-row flex-wrap gap-2">
                {data?.map((skill, index) => (
                    <View key={index} className="bg-[#3f3f46] px-3 py-1.5 rounded-lg flex-row items-center border border-gray-600">
                        <Text className="text-gray-300 text-xs mr-2">{typeof skill === 'string' ? skill : skill.name}</Text>
                        <TouchableOpacity onPress={() => handleRemove(index)}>
                             <Ionicons name="close" size={14} color="#9ca3af" />
                        </TouchableOpacity>
                    </View>
                ))}
             </View>
        </View>
    );
};

const OthersForm = ({ languages, hobbies, onChangeLanguages, onChangeHobbies }: { languages: string[], hobbies: string[], onChangeLanguages: (d: string[]) => void, onChangeHobbies: (d: string[]) => void }) => {
    // Reusing the string array logic roughly
    return (
        <View>
            <Text className="text-white text-lg font-bold mb-4">Languages</Text>
            <SkillsForm data={languages} onChange={onChangeLanguages} />
            
            <View className="h-8" />
            
            <Text className="text-white text-lg font-bold mb-4">Hobbies</Text>
            <SkillsForm data={hobbies} onChange={onChangeHobbies} />
        </View>
    );
};
