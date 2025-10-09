import { useSelector } from 'react-redux';

const useUserProfile = () => {
  const { user } = useSelector(state => state.auth);

  let skills = [];
  try {
    let parsedSkills;
    // First, check if skills is a string that looks like a JSON array and parse it.
    if (typeof user?.profile?.skills === 'string' && user.profile.skills.startsWith('[')) {
        parsedSkills = JSON.parse(user.profile.skills);
    } else if (Array.isArray(user?.profile?.skills)) {
        parsedSkills = user.profile.skills;
    } else {
        parsedSkills = [];
    }

    // Next, clean up each item in the array, as it might be a stringified string itself.
    if (Array.isArray(parsedSkills)) {
        skills = parsedSkills.map(skill => {
            if (typeof skill === 'string') {
                // Remove leading/trailing quotes and escaped quotes
                return skill.replace(/^\"|\"$/g, '').replace(/^"|"$/g, '');
            }
            return skill;
        });
    }
  } catch (error) {
      console.error("Failed to parse skills:", error);
      // If parsing fails at any stage, default to an empty array.
      skills = [];
  }

  return { user, skills };
};

export default useUserProfile;
