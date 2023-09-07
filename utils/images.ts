const pareUrlFile = (image: string, folder = "") => {
  if (!image) {
    return "/images/no-image.jpg";
  }

  const token = image.split("__");

  if (token[0]) {
    const time = token[0].replaceAll("-", "/");
    return folder + "/" + time + "/" + image;
  }
};

export { pareUrlFile };
