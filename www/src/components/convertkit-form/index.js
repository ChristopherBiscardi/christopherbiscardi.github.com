import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { Styled } from "theme-ui";
import { css, keyframes } from "@emotion/core";
// import { Heading } from "sens8";
import Message from "./message";
import { PleaseConfirmIllustration } from "./illustrations";

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
      width: "90%",
      margin: "auto",
      maxWidth,

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

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  first_name: Yup.string()
});

const PostSubmissionMessage = ({ response }) => {
  return (
    <div>
      <Message
        illustration={PleaseConfirmIllustration}
        title={`Great, one last thing...`}
        body={`I just sent you an email with the confirmation link. 
          **Please check your inbox!**`}
      />
    </div>
  );
};

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

export default class SignUp extends React.Component {
  state = {
    submitted: false
  };

  async handleSubmit(values, { setSubmitting }) {
    this.setState({ submitted: true });
    try {
      const response = await fetch(
        `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`,
        {
          method: "post",
          body: JSON.stringify(values, null, 2),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );

      const responseJson = await response.json();
      setSubmitting(false);
      this.setState({
        submitted: true,
        response: responseJson,
        errorMessage: null
      });
    } catch (error) {
      this.setState({
        submitted: false,
        errorMessage: "Something went wrong!"
      });
    }
  }

  render() {
    const { submitted, response, errorMessage } = this.state;
    const successful = response && response.status === "success";
    return (
      <RainbowBorder {...this.props}>
        {!successful && (
          <>
            <h2 css={{ margin: 0, marginBottom: "2rem" }}>
              Join the Newsletter
            </h2>
            <p css={{ margin: 0, marginBottom: "2rem" }}>
              My newsletter is where you'll find exclusive content from me. I
              write about technology, startups, and why you shouldn't call
              yourself a junior engineer
            </p>
          </>
        )}

        <Formik
          initialValues={{
            email_address: "",
            first_name: ""
          }}
          validationSchema={SubscribeSchema}
          onSubmit={(values, { setSubmitting }) =>
            this.handleSubmit(values, { setSubmitting })
          }
          render={({ errors, touched, isSubmitting }) => (
            <>
              {!successful && (
                <Form
                  css={{
                    display: "flex",
                    justifyContent: "space-between",
                    "& .field-error": {
                      display: "block",
                      color: "red",
                      fontSize: "80%"
                    }
                  }}
                >
                  <label htmlFor="first_name" css={labelStyles}>
                    <span css={labelSpanStyles}>Preferred name</span>
                    <Field
                      aria-label="preferred name"
                      aria-required="true"
                      name="first_name"
                      placeholder="Jane"
                      type="text"
                      css={inputStyles}
                    />
                    <div>
                      <ErrorMessage
                        name="first_name"
                        component="span"
                        className="field-error"
                      />
                    </div>
                  </label>

                  <label htmlFor="email" css={labelStyles}>
                    <span css={labelSpanStyles}>Email address</span>
                    <Field
                      aria-label="your email address"
                      aria-required="true"
                      name="email_address"
                      placeholder="jane@acme.com"
                      type="email"
                      css={inputStyles}
                    />
                    <div>
                      <ErrorMessage
                        name="email_address"
                        component="span"
                        className="field-error"
                      />
                    </div>
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
                </Form>
              )}
              {submitted && !isSubmitting && (
                <PostSubmissionMessage response={response} />
              )}
              {errorMessage && <div>{errorMessage}</div>}
            </>
          )}
        />
      </RainbowBorder>
    );
  }
}
