const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};

export default formatDate;
