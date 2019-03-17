import React, { useContext } from "react";

export const Sens8Context = React.createContext();

export const useTheme = keys => {
  const theme = useContext(Sens8Context);

  // if no keys are passed in, return whole theme
  if (!keys) {
    return theme;
  } else {
    return keys.reduce((obj, key) => {
      if (!theme[key]) {
        console.warn(`key \`${key}\` does not exist in theme \`${keys}\``);
      }

      return { ...obj, key: theme[key] };
    }, {});
  }
};

export const useTextColor = () => {
  const { colors } = useTheme();
  return colors.text;
};

export const useLinkColor = () => {
  const { colors } = useTheme();
  return colors.link;
};

export const useLayers = i => {
  const { colors } = useTheme();
  return i || i === 0 ? colors.layers[i] : colors.layers;
};

export const useCodeTheme = () => {
  const { code } = useTheme();
  return code;
};
