import { PaletteMode, PaletteOptions, T, TokensDark, TokensLight } from "@lib/types"


const styles = {
  boxWidth: 'xl:max-w-[1280px] w-full',

  heading2:
    'font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full',
  paragraph:
    'font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]',

  flexCenter: 'flex justify-center items-center',
  flexStart: 'flex justify-center items-start',

  paddingX: 'sm:px-16 px-6',
  paddingY: 'sm:py-16 py-6',
  padding: 'sm:px-16 px-6 sm:py-12 py-4',

  marginX: 'sm:mx-16 mx-6',
  marginY: 'sm:my-16 my-6',
}

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
}

export const tokensDark: TokensDark = {
  grey: {
    0: '#ffffff', // manually adjusted
    10: '#f6f6f6', // manually adjusted
    50: '#f0f0f0', // manually adjusted
    100: '#e0e0e0',
    200: '#c2c2c2',
    300: '#a3a3a3',
    400: '#858585',
    500: '#666666',
    600: '#525252',
    700: '#3d3d3d',
    800: '#292929',
    900: '#141414',
    1000: '#000000', // manually adjusted
  },
  primary: {
    // blue
    100: '#efe8fd',
    200: '#dfd1fb',
    300: '#cfb9f9',
    400: '#bfa2f7',
    500: '#5515d4',
    600: '#4b12bc',
    700: '#4210a5',
    800: '#380e8d',
    900: '#2e0c76',
  },
  secondary: {
    // yellow
    50: '#f0f0f0', // manually adjusted
    100: '#fff6e0',
    200: '#ffedc2',
    300: '#ffe3a3',
    400: '#ffda85',
    500: '#ffd166',
    600: '#cca752',
    700: '#997d3d',
    800: '#665429',
    900: '#332a14',
  },
}

// function that reverses the color palette
function reverseTokens(tokensDark: TokensDark) {
  const reversedTokens: TokensLight = {}
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys: T[] = Object.keys(val)
    const values = Object.values(val)
    const length = keys.length
    const reversedObj: { [key: string]: string } = {}
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1]
    }
    reversedTokens[key] = reversedObj
  })
  return reversedTokens
}
export const tokensLight: TokensLight = reverseTokens(tokensDark)

// mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[600],
              light: tokensDark.primary[500],
              dark: tokensDark.primary[700],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
              light: tokensDark.secondary[200],
              contrastText: tokensDark.secondary[100],
            },
            info: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
              light: tokensDark.grey[300],
            },
            background: {
              default: tokensDark.primary[600],
              paper: tokensDark.primary[500],
              alt: tokensDark.primary[700],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensLight.grey[50],
              light: tokensLight.primary[900],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            info: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              paper: tokensDark.grey[50],
            },
          }),
    } as PaletteOptions,
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  }
}

export default styles
