/* @jsx jsx */
import { render, h } from "/web_modules/preact.js";
// import { jsx, Global } from "@emotion/preact-core";
// import { MDXProvider } from "@mdx-js/preact";
// window.componentPath = "./pages/starting-a-new-node-project.js";

// const PageWrapper = ({ children }) => (
//   <MDXProvider
//     components={{
//       p: props => (
//         <p css={{ marginTop: "1rem", color: "#efefef" }} {...props} />
//       ),
//       li: props => (
//         <li
//           css={{ marginTop: "1rem", color: "#efefef", marginLeft: "1rem" }}
//           {...props}
//         />
//       )
//     }}
//   >
//     <div>
//       <Global
//         styles={{
//           "*": { margin: 0, padding: "0" },
//           body: { background: "#1fa9f4", padding: "1rem" }
//         }}
//       />
//       {children}
//     </div>
//   </MDXProvider>
// );
async function renderPage() {
  const PageModule = await import(window.componentPath);
  const Page = PageModule.default;
  render(
    // <PageWrapper>
    h(Page),
    //</PageWrapper>
    document.getElementById("toast-page-section")
  );
}

renderPage();
