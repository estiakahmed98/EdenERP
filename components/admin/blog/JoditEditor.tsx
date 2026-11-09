//components/richTextEditor.tsx

import React, { useState, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// Jodit ships UI packs for these locales; others fall back to English.
const JODIT_LANGUAGES: Record<string, string> = {
  ar: "ar",
  tr: "tr",
  ja: "ja",
  vi: "vi",
  zh: "zh_cn",
};

interface JoditEditorProps {
  placeholder?: string;
  initialValue?: string;
  onContentChange?: (content: string) => void; // eslint-disable-line no-unused-vars
  height?: string | number;
  width?: string | number;
}

const JoditEditorComponent: React.FC<JoditEditorProps> = ({
  placeholder,
  initialValue = "",
  onContentChange,
  height = "400px",
  width = "100%",
}) => {
  const t = useTranslations("admin.blogForm");
  const locale = useLocale();
  const editor = useRef(null);
  const [content, setContent] = useState(initialValue);

  const config = useMemo(
    () => ({
      readonly: false,
      toolbar: true,
      placeholder: placeholder ?? t("editorPlaceholder"),
      language: JODIT_LANGUAGES[locale] ?? "en",
      direction: locale === "ar" ? ("rtl" as const) : ("ltr" as const),
      height,
    }),
    [placeholder, height, locale, t]
  );

  const handleBlur = (newContent: string) => {
    setContent(newContent);
    onContentChange?.(newContent);
  };

  return (
    <div style={{ width, height }}>
      {" "}
      {/* Apply width and height to parent container */}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleBlur}
        onChange={() => {}}
      />
    </div>
  );
};

export default JoditEditorComponent;
