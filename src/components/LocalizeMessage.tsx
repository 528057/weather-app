import { LocalizationKeys, useTranslation } from "../hooks/useTranslation";

type LocalizeMessageProps = {
    id: LocalizationKeys;
};

const LocalizeMessage = ({ id }: LocalizeMessageProps) => {
    const t = useTranslation();
    return <>{t(id)}</>;
};

export default LocalizeMessage;
