export const getUsername = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const username = searchParams.get("u");
  const match = /@([a-zA-Z]+)\.([a-zA-Z]+)/.exec(username || "");
  if (!match) {
    return undefined;
  }
  return username;
};

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const dateTimeFormat = new Intl.DateTimeFormat("pt-BR", options);

// ex: 12:10:11
export const getOnlyHours = (date: string) => {
  const dateObj = new Date(date);
  const parts = dateTimeFormat.formatToParts(dateObj);
  const timeParts = parts.filter(
    (part) =>
      part.type === "hour" || part.type === "minute" || part.type === "second"
  );
  return timeParts
    .slice(0, -1)
    .map((part) => part.value)
    .join(":");
};
