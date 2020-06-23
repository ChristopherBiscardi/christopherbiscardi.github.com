/** @jsx jsx */
import { keyframes, jsx } from "@emotion/core";
import { Fragment } from "preact";
import { useState } from "preact/hooks";
// import Message from "./message";

// import { PleaseConfirmIllustration } from "./illustrations";

const maxWidth = "800px";

const gradientAnimation = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

const RainbowBorder = ({ children, ...props }) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      // width: "90%",
      margin: "auto",
      // maxWidth,

      position: "relative",
      padding: "2rem",
      boxSizing: "border-box",

      background: "#1b1f2a",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "1rem",

      "&:before": {
        animation: `${gradientAnimation} 10s ease infinite`,
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        margin: "-1px",
        // background: 'linear-gradient(to right, red, orange)',
        backgroundColor: "#ff1493",
        background:
          "linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)",
        backgroundSize: "200% 200%",
        borderRadius: "1rem"
      }
    }}
  >
    {children}
  </div>
);

const FORM_ID = process.env.GATSBY_CONVERTKIT_SIGNUP_FORM;

// const SubscribeSchema = Yup.object().shape({
//   email_address: Yup.string()
//     .email("Invalid email address")
//     .required("Required"),
//   first_name: Yup.string()
// });

// const PostSubmissionMessage = ({ response }) => {
//   return (
//     <div>
//       <Message
//         illustration={PleaseConfirmIllustration}
//         title={`Great, one last thing...`}
//         body={`I just sent you an email with the confirmation link.
//           **Please check your inbox!**`}
//       />
//     </div>
//   );
// };

const inputStyles = {
  boxSizing: "border-box",
  height: "48px",
  border: "2px solid #2B3748",
  borderRadius: "6px",
  boxShadow: `inset 0 0 8px  rgba(0,0,0,0.1),
      0 0 16px rgba(0,0,0,0.1)`,
  padding: `0 8px`,
  background: `transparent`,
  margin: `0`,
  fontSize: "1.5rem",
  color: "rgba(255,255,255,0.86)"
};

const labelStyles = {
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box"
};

const labelSpanStyles = {
  display: "block",
  marginBottom: "12px",
  fontSize: "1rem"
};

export default props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [successful, setSuccessful] = useState({});
  return (
    <RainbowBorder {...props}>
      {!successful.status && (
        <Fragment>
          <h2
            css={{
              margin: 0,
              marginBottom: "2rem",
              color: "#e7e9ea",
              fontFamily: '"InterDisplay var", system-ui, sans-serif'
              // fontWeight: 600
            }}
          >
            Join the Newsletter
          </h2>
          <p css={{ margin: 0, marginBottom: "2rem", color: "#e7e9ea" }}>
            My newsletter is where you'll find exclusive content from me. I
            write about technology, startups, and why you shouldn't call
            yourself a junior engineer
          </p>
        </Fragment>
      )}
      {successful.status === "success" && (
        <div>
          <p>You've Subscribed! Thanks :D Check your email!</p>
        </div>
      )}
      {successful.status !== "success" && (
        <form
          onSubmit={async e => {
            e.preventDefault();
            setSubmitting(true);
            const res = await fetch(
              `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`,
              {
                method: "post",
                body: JSON.stringify(
                  {
                    first_name: name,
                    email_address: email
                  },
                  null,
                  2
                ),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              }
            ).then(r => r.json());
            setSubmitting(false);
            setSuccessful(res);
            if (res.status === "failed") {
              console.error(res);
            }
          }}
          css={{
            color: "#e7e9ea",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "flex-end",
            "@media screen and (max-width: 800px)": {
              flexDirection: "column",
              flexWrap: "inherit",
              alignItems: "inherit"
            },
            flexDirection: "row",
            "& > * ": { marginTop: "1rem" },
            "& .field-error": {
              display: "block",
              color: "red",
              fontSize: "80%"
            }
          }}
        >
          <label htmlFor="first_name" css={labelStyles}>
            <span css={labelSpanStyles}>Preferred name</span>
            <input
              aria-label="preferred name"
              aria-required="true"
              name="first_name"
              placeholder="Jane"
              type="text"
              value={name}
              css={inputStyles}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </label>

          <label htmlFor="email" css={labelStyles}>
            <span css={labelSpanStyles}>Email address</span>
            <input
              aria-label="your email address"
              aria-required="true"
              name="email_address"
              placeholder="jane@acme.com"
              type="email"
              value={email}
              css={inputStyles}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </label>

          <button
            data-element="submit"
            type="submit"
            disabled={isSubmitting}
            css={{
              cursor: "pointer",
              boxSizing: "border-box",
              height: "48px",
              width: "140px",
              borderRadius: "6px",
              backgroundColor: "#28374A",
              alignSelf: "flex-end",
              color: "rgba(255,255,255,0.86)",
              fontWeight: 600,
              border: "2px solid #2B3748"
            }}
          >
            {!isSubmitting && "Subscribe"}
            {isSubmitting && "Submitting..."}
          </button>
          {successful.status === "failed" && (
            <div>
              {successful.errors.messages.map(str => (
                <p>{str}</p>
              ))}
            </div>
          )}
        </form>
      )}
    </RainbowBorder>
  );
};
