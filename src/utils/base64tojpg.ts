export function base64ToImage(base64String: string) {
  const img = document.createElement("img");
  img.src = base64String;
  return img;
}
