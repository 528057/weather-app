import { useEffect } from "react";
import { LocalizationKeys, useTranslation } from "./useTranslation";

const usePageTitle = (title: LocalizationKeys) => {
    const t = useTranslation();

    useEffect(() => {
        document.title = t(title);
    }, [title, t]);
};

export default usePageTitle;
