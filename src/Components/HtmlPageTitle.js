import { useMemo } from "react";
import { Helmet } from "react-helmet";

export default function HtmlPageTitle({ title }) {
  const titleString = useMemo(() => {
    if (title) {
      return `${title} - EdwardML`;
    } else {
      return "EdwardML";
    }
  }, [title]);

  return (
    <Helmet>
      <title>{titleString}</title>
    </Helmet>
  );
}
