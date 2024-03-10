export const image_url =
  "https://res.cloudinary.com/dac48s3os/image/upload/v1709974981/xxruvtiwasux3jkvdl92.png";

export const placeholderImg =
  "https://res.cloudinary.com/dac48s3os/image/upload/v1709976853/1000_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75_dvuwhc.jpg";

const baseURL = "http://40.113.162.230:8081";

console.log("baseURL", baseURL);
export const getImage = async () => {
  try {
    const response = await fetch(`${baseURL}/api/contest/target`);
    const data = await response.json();
    return data;
  } catch (error) {
    return image_url;
  }
};
