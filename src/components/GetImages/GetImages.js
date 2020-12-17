function GetImages(data) {
  return fetch(data).then(res => res.json());
}

export default GetImages;
