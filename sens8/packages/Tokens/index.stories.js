import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "react-emotion";

import Text from "@sens8/component-typography/linear";
import Heading from "@sens8/component-typography/display";

import tokens from ".";

storiesOf("Tokens|colors", module).add("raw", () => (
  <div>
    {Object.entries(tokens.colors.raw).map(
      ([k, c]) =>
        !console.log(c) && (
          <div>
            <h1>{k}</h1>
            <ul
              css={`
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 1em;
                list-style-type: none;
              `}
            >
              {c.map ? (
                c.map((v, i) => (
                  <li>
                    <div
                      css={`
                        margin: 0px;
                        padding-left: 32px;
                        padding-right: 32px;
                        padding-top: 32px;
                        padding-bottom: 32px;
                        background-color: ${v};
                      `}
                    />
                    <div
                      css={`
                        display: flex;
                        justify-content: space-between;
                      `}
                    >
                      <Text>
                        {k}.{i}
                      </Text>
                      <Text>{v}</Text>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <div
                    css={`
                      margin: 0px;
                      padding-left: 32px;
                      padding-right: 32px;
                      padding-top: 32px;
                      padding-bottom: 32px;
                      background-color: ${c};
                    `}
                  />
                  <div
                    css={`
                      display: flex;
                      justify-content: space-between;
                    `}
                  >
                    <strong>{k}</strong>
                    {c}
                  </div>
                </li>
              )}
            </ul>
          </div>
        )
    )}
  </div>
));
