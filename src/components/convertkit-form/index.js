import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { css } from "@emotion/core";
import { Heading } from "sens8";
import Message from "./message";
import { PleaseConfirmIllustration } from "./illustrations";

const FORM_ID = process.env.CONVERTKIT_SIGNUP_FORM;

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

export default class SignUp extends React.Component {
  state = {
    submitted: false
  };

  async handleSubmit(values) {
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
      <>
        {!successful && <Heading>Join the Newsletter</Heading>}

        <Formik
          initialValues={{
            email_address: "",
            first_name: ""
          }}
          validationSchema={SubscribeSchema}
          onSubmit={values => this.handleSubmit(values)}
          render={({ errors, touched, isSubmitting }) => (
            <>
              {!successful && (
                <Form
                  css={css`
                    display: flex
                    align-items: flex-end
                    label:not(:first-of-type),
                    button {
                      margin-left: 10px
                    }
                    .field-error {
                      display: block
                      //position: absolute
                      color: red;
                      font-size: 80%
                    }
                    input,
                    label {
                      width: 100%
                    }
                   `}
                >
                  <label htmlFor="email">
                    <div
                      css={css`
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        color: #eceff4;
                      `}
                    >
                      Email
                      <ErrorMessage
                        name="email_address"
                        component="span"
                        className="field-error"
                      />
                    </div>
                    <Field
                      aria-label="your email address"
                      aria-required="true"
                      name="email_address"
                      placeholder="jane@acme.com"
                      type="email"
                    />
                  </label>
                  <button
                    data-element="submit"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {!isSubmitting && "Submit"}
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
      </>
    );
  }
}
