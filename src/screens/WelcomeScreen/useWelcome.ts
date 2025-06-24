import useThemeColors from '../../hooks/useThemeColors';
import {deleteAllData} from '../../services/DeleteService';
import {navigate} from '../../utils/navigationUtils';

const useWelcome = () => {
  const colors = useThemeColors();
  const handleExistingUser = async () => {
    await deleteAllData();
    navigate('ExistingUserScreen');
  };

  const handleNewUser = async () => {
    await deleteAllData();
    navigate('PersonalizeScreen');
  };

  return {
    colors,
    handleExistingUser,
    handleNewUser,
  };
};

export default useWelcome;
