import React from "react";

const CodeBlock = ({ lang, value }) => {
  return (
    <pre>
      <code>{value}</code>
    </pre>
  );
};
export default CodeBlock;
