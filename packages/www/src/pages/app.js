/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "preact/hooks";
import { Fragment } from "preact";
import stripe from "@stripe/stripe-js";
const { loadStripe } = stripe;

const bgRoll = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

const awsconfig = {
  Auth: {
    region: "us-west-2",
    userPoolId: "us-west-2_VlhGdjlD1",
    userPoolWebClientId: "njl7s0gq3i03qlhkt681kbckl",
    authenticationFlowType: "CUSTOM_AUTH"
  },
  API: {
    endpoints: [
      {
        name: "all-endpoint",
        endpoint: "https://azgfjq0awg.execute-api.us-west-2.amazonaws.com",
        region: "us-west-2",
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(
              await window.AMPLIFY.Auth.currentSession()
            )
              .getIdToken()
              .getJwtToken()}`
          };
        }
      }
    ]
  }
};

function getRandomString(bytes) {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map(intToHex)
    .join("");
}

function intToHex(nr) {
  return nr.toString(16).padStart(2, "0");
}

const finishSignin = async challenge => {
  try {
    const [email, code] = challenge.split(",");
    const user = await window.AMPLIFY.Auth.signIn(email);
    await window.AMPLIFY.Auth.sendCustomChallengeAnswer(user, code);
    const currentSession = await window.AMPLIFY.Auth.currentSession();
    console.log(currentSession);
  } catch (e) {
    console.log(e);
  }
};

async function signUp({ email }) {
  try {
    const user = await window.AMPLIFY.Auth.signUp({
      username: email,
      password: getRandomString(29) + "A",
      attributes: {
        email
      }
    });
    return user;
  } catch (error) {
    console.log("error signing up:", error);
  }
}
const login = email => {
  return fetch(
    "https://oew6rcrg5k.execute-api.us-west-2.amazonaws.com/dev/login",
    { method: "POST", body: JSON.stringify({ email }) }
  )
    .then(v => {
      return v.json();
    })
    .catch(e => {
      console.log(e);
      throw e;
    });
};

const SignupLoginForm = ({ setPostLoginEmailSent }) => {
  return (
    <Fragment>
      <div>
        <h1>The Edge Newsletter</h1>
        <p
        //  css={{ marginTop: ".75rem" }}
        >
          A weekly newsletter with curated infomation from the bleeding edge. I
          spend my week drinking from the firehose so you don't have to
        </p>
        <p
        // css={{ marginTop: ".75rem" }}
        >
          The newsletter covers topics from hard tech (Rust, SwiftUI, JS) to
          evolving indie business models
        </p>
      </div>
      <form
        css={{
          justifyContent: "space-evenly",
          alignSelf: "center",
          position: "relative",
          "&:before": {
            borderLeft: "1px solid #ffffffcc",
            content: "''",
            position: "absolute",
            height: "100%",
            marginLeft: "-2rem"
          }
        }}
        onSubmit={async e => {
          e.preventDefault();
          if (!window.AMPLIFY) {
            alert(
              "The auth lib has not loaded yet :grimace: sorry! try again or check the console and send me a message @chrisbiscardi on twitter"
            );
            return;
          }
          const formData = new FormData(e.target);
          const email = formData.get("email");
          // console.log(email);

          try {
            const user = await signUp({
              email
            });
            console.log({ user });
            const url = await login(email);
            console.log(url);
            setPostLoginEmailSent(true);
          } catch (e) {
            console.warn(e);
            if (e.code === "UsernameExistsException") {
              // send login request
              console.warn(
                "Send user to /login so they get the email with the challenge link"
              );
              const url = await login(email);
              console.log(url);
              setPostLoginEmailSent(true);
            }
            // setSignupError(e.message)
          }
        }}
      >
        <label
          css={{
            display: "flex",
            flexDirection: "column",
            fontSize: ".8rem",
            color: "#19202c"
          }}
        >
          <span css={{ fontWeight: "bold" }}>Email</span>
          <input
            name="email"
            placeholder="chris@christopherbiscardi.com"
            css={{
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)",
              paddingLeft: ".75rem",
              paddingRight: ".75rem",
              paddingTop: ".5rem",
              paddingBottom: ".5rem",
              marginTop: ".75rem",
              lineHeight: 1.25,
              borderRadius: ".25rem",
              appearance: "none"
            }}
          />
        </label>
        <div
          css={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-end",
            marginTop: "1.5rem"
          }}
        >
          <button
            disabled
            type="submit"
            css={{
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)",
              paddingLeft: ".75rem",
              paddingRight: ".75rem",
              paddingTop: ".5rem",
              paddingBottom: ".5rem",
              lineHeight: 1.25,
              borderRadius: ".25rem",
              appearance: "none",
              border: "1px solid #ffffffcc",
              background: "#ffffff44"
            }}
          >
            Log in
          </button>
        </div>
        <div>
          <p
            css={{
              fontSize: ".8rem",
              marginTop: "1rem"
            }}
          >
            You will receive a link that will enable you to sign in. If you
            didn't have an account, this link will confirm your new account.
          </p>
        </div>
      </form>
    </Fragment>
  );
};

const fetchCheckoutSessionId = () => {
  return window.AMPLIFY.API.post(
    "all-endpoint",
    "/create-stripe-checkout"
  ).catch(error => {
    console.log(error.response);
  });
};
const App = props => {
  const [stripe, setStripe] = useState();
  useEffect(async () => {
    console.log(process.env.TOAST_STRIPE_PK);
    const s = await loadStripe(process.env.TOAST_STRIPE_PK);
    setStripe(s);
  }, []);
  return (
    <div>
      <span>Billing portal buttons</span>
      <button
        onClick={async () => {
          const { checkoutId } = await fetchCheckoutSessionId();
          const result = stripe.redirectToCheckout({
            sessionId: checkoutId
          });
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `error.message`.
        }}
      >
        {stripe ? "checkout" : "loading stripe"}
      </button>
      <button
        onClick={async e => {
          const json = await window.AMPLIFY.API.post(
            "all-endpoint",
            "/goto-billing-portal"
          ).catch(error => {
            console.log(error.response);
          });

          if (json.url) {
            window.location = json.url;
          }
        }}
      >
        click me
      </button>
    </div>
  );
};

let handle = null;
export default props => {
  const [amplifyExists, setAmplify] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState("logged-out");
  const [waitingForEmail, setPostLoginEmailSent] = useState(false);
  useEffect(() => {
    // console.log("aaaa");
    handle = setInterval(() => {
      // console.log("asfkljasfklj");
      if (window.AMPLIFY) {
        console.log("configured");
        window.AMPLIFY.Auth.configure(awsconfig);
        window.AMPLIFY.API.configure(awsconfig);
        setAmplify(true);
      }
    }, 1000);
  }, []);
  useEffect(() => {
    if (amplifyExists) {
      clearInterval(handle);
    }
  }, [amplifyExists]);

  // useEffect(() => {
  //   if (amplifyExists) {
  //     console.log("amplify succeeded");
  //     window.AMPLIFY.Amplify.Hub.listen("auth", data => {  -
  //       const { payload } = data;
  //       this.onAuthEvent(payload);
  //       console.log(
  //         "A new auth event has happened: ",
  //         data.payload.data.username + " has " + data.payload.event
  //       );
  //     });
  //   }
  // }, amplifyExists);

  const getSession = async () => {
    try {
      await window.AMPLIFY.Auth.currentSession();
      setLoggedIn("logged-in");
    } catch (e) {
      setLoggedIn("loading");
    }
  };

  useEffect(async () => {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("code")) {
      const challenge = urlParams.get("code");
      if (!amplifyExists) {
        // setLoadingLogin(true);
        return;
      }

      try {
        const user = await finishSignin(challenge);
        await getSession();
      } catch (e) {
        console.warn(e);
      }
    }
  }, [amplifyExists]);
  if (isLoggedIn === "logged-in") {
    return <App />;
  }
  return (
    <div>
      <div
        css={{
          background: `linear-gradient(270deg, #fb594a, #ffde4b, #70e470, #33b7ff)`,
          backgroundSize: `800% 800%`,
          animation: `${bgRoll} 30s ease infinite`,
          position: "relative"
        }}
      >
        <div css={{ height: 800, display: "flex", justifyContent: "center" }}>
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "minmax(200px,400px) 300px",
              gridGap: "4rem",
              position: "relative",
              background: "#ffffff22",
              border: "1px solid #ffffffdd",
              borderRadius: "3px",
              marginTop: "50px",
              padding: "2rem"
            }}
          >
            {Boolean(waitingForEmail) ? (
              <div>
                <h1>The Edge Newsletter</h1>
                <p css={{ marginTop: ".75rem" }}>
                  Check your email for the link that will sign you in
                </p>
              </div>
            ) : (
              <SignupLoginForm setPostLoginEmailSent={setPostLoginEmailSent} />
            )}
            <form
              css={{
                justifyContent: "space-evenly",
                alignSelf: "center",
                position: "relative",
                "&:before": {
                  borderLeft: "1px solid #ffffffcc",
                  content: "''",
                  position: "absolute",
                  height: "100%",
                  marginLeft: "-2rem"
                }
              }}
              onSubmit={async e => {
                e.preventDefault();
                if (!window.AMPLIFY.Amplify) {
                  alert(
                    "The auth lib has not loaded yet :grimace: sorry! try again or check the console and send me a message @chrisbiscardi on twitter"
                  );
                  return;
                }
                const formData = new FormData(e.target);
                const challenge = formData.get("code");

                try {
                  const user = await finishSignin(challenge);
                  console.log({ user });
                } catch (e) {
                  console.warn(e);
                }
              }}
            >
              <label
                css={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: ".8rem",
                  color: "#19202c"
                }}
              >
                <span css={{ fontWeight: "bold" }}>code</span>
                <input
                  name="code"
                  placeholder="email,uuid"
                  css={{
                    boxShadow:
                      "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)",
                    paddingLeft: ".75rem",
                    paddingRight: ".75rem",
                    paddingTop: ".5rem",
                    paddingBottom: ".5rem",
                    marginTop: ".75rem",
                    lineHeight: 1.25,
                    borderRadius: ".25rem",
                    appearance: "none"
                  }}
                />
              </label>

              <div
                css={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                  marginTop: "1.5rem"
                }}
              >
                <button
                  type="submit"
                  css={{
                    boxShadow:
                      "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)",
                    paddingLeft: ".75rem",
                    paddingRight: ".75rem",
                    paddingTop: ".5rem",
                    paddingBottom: ".5rem",
                    lineHeight: 1.25,
                    borderRadius: ".25rem",
                    appearance: "none",
                    border: "1px solid #ffffffcc",
                    background: "#ffffff44"
                  }}
                >
                  Code
                </button>
              </div>
              <div>
                <p
                  css={{
                    fontSize: ".8rem",
                    marginTop: "1rem"
                  }}
                >
                  You will receive a link that will enable you to sign in. If
                  you didn't have an account, this link will confirm your new
                  account.
                </p>
              </div>
            </form>
            <div
              css={{
                gridColumn: "1/3",
                borderTop: "1px solid #ffffffcc",
                paddingTop: "1rem"
              }}
            ></div>
          </div>
        </div>

        <div
          css={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            overflow: "hidden",
            lineHeight: 0,
            transform: "rotate(180deg)",
            "& svg": {
              position: "relative",
              display: "block",
              width: "calc(100% + 1.3px)",
              height: "150px"
            },
            "& .shape-fill": {
              fill: "#19202c"
            }
          }}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
