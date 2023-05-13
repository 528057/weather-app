import { useEffect } from "react";
import { useTranslation } from "./useTranslation";

const usePageTitle = (title: string) => {
  const t = useTranslation();

  useEffect(() => {
    document.title = `${title} | ${t("app.title")}`;
  }, [title, t]);
};

export default usePageTitle;
