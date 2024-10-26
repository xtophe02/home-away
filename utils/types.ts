export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string; error?: boolean }>;

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  slug: string;
  tagline: string;
  country: string;
  price: number;
};
