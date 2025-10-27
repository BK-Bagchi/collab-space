const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};

export const formatISODate = (isoDate) => {
  const date = new Date(isoDate);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
};

export const formatDateWithTime = (isoString) => {
  const date = new Date(isoString);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  const time = date.toLocaleTimeString("en-US", options);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${time} ${day}/${month}/${year}`;
};

export default formatDate;
