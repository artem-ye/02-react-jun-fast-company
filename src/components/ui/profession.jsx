import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions';

const Profession = ({id}) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionById(id));
    return (isLoading ? 'loading...': profession.name);
};

export default Profession;
