export type SocialLink = {
  media: "twitter" | "facebook" | "instagram" | "linkedin" | "youtube";
  url: string;
};

export type Settings = {
  _id: string;
  _createdAt: string;
  title: string;
  url: string;
  copyright: string;
  logo: {
    alt?: string;
  };
  logoalt: {
    alt?: string;
  };
  email: string;
  phone: string;
  w3ckey: string;
  social: SocialLink[];
  description: string;
  openGraphImage: {
    alt?: string;
  };
};
