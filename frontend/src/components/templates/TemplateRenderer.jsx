import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ClassicTemplate from "./ClassicTemplate";

const TemplateRenderer = ({ template, form }) => {
  if (template.layout === "modern") {
    return <ModernTemplate form={form} theme={template} />;
  }

  if (template.layout === "minimal") {
    return <MinimalTemplate form={form} theme={template} />;
  }

  if (template.layout === "classic") {
    return <ClassicTemplate form={form} theme={template} />;
  }

  return null;
};

export default TemplateRenderer;
