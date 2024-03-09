export const image_url =
  "https://res.cloudinary.com/dac48s3os/image/upload/v1709974981/xxruvtiwasux3jkvdl92.png";

export const placeholderImg =
  "https://res.cloudinary.com/dac48s3os/image/upload/v1709976853/1000_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75_dvuwhc.jpg";

const baseURL = "http://localhost:3000";

export const getImage = async () => {
  const response = await fetch(`${baseURL}/api/target`);

  return response ? response.json() : placeholderImg;
};
