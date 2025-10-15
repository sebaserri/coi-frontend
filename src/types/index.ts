export interface Subdivision {
  id: number;
  name: string;
  description?: string;
  url: string;
}

export interface Division {
  id: number;
  name: string;
  description: string;
  logo: string;
  imgBg: string;
  carrouselTitle?: string;
  carrouselSubtitle?: string;
  carrouselImages?: string[];
  url: string;
  subdivisions: Subdivision[];
}

export interface Statistics {
  value: string;
  label: string;
}

export interface Card {
  bgColor: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface Group {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  linkText1: string;
  link1?: string;
  linkText2: string;
  link2?: string;
  linkText3?: string;
  link3?: string;
  disclaimerFooter?: string;
}

interface Slice {
  bgColor?: string;
  title: string;
  title2?: string;
  titleColor?: string;
  subtitle?: string;
  subtitleColor?: string;
  paragraph1?: string;
  paragraph2?: string;
  statistics?: Statistics[];
  image?: string;
  video?: string;
  cards?: Card[];
  group1?: Group;
  group2?: Group;
  group3?: Group;
  group4?: Group;
  optionalFooterText1?: string;
  optionalFooterText2?: string;
}

interface SEOConfig {
  description: string;
  keywords: string;
  googleAnalyticsId: string;
}

export interface CompanyConfig {
  name: string;
  seo: SEOConfig;
  colors: {
    primary: string;
    secondary: string;
    third: string;
    footer: string;
    navHomeBackground: string;
    navHomeTextColor: string;
    navDivisionBackground: string;
    navDivisionTextColor: string;
  };
  logo: string;
  logoDivision: string;
  mainButtonText: string;
  mainButtonLink: string;
  divisionFooter: string;
  slice1: Slice;
  slice2: Slice;
  slice3: Slice;
  slice4: Slice;
  slice5: Slice;
  slice6: Slice;
  divisions: Division[];
}
