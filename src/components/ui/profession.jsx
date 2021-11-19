import { useProfessions } from '../../hooks/useProfessions';

const Profession = ({id}) => {
    // const profession = useProfessions();
    // console.log('Prof ID', id);
    // console.log('Prof ByID', profession.getProfession(id));

    const {isLoading, getProfession} = useProfessions();

    const profession = getProfession(id);

    return (isLoading ? 'loading...': profession.name);
};

export default Profession;
