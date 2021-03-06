import numeral from "numeral";

const NumberFormat = new Intl.NumberFormat("ru");
const DateFormat = new Intl.DateTimeFormat("ru", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

const DateChartFormat = new Intl.DateTimeFormat("ru", {
  month: "numeric",
  day: "numeric",
});

const DateChartLabelFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export const numberFormat = (value) => NumberFormat.format(value);

export const numeralFormat = (value, format) => numeral(value).format(format);

export const dateFormat = (value) => DateFormat.format(value);
export const dateChartFormat = (value) => DateChartFormat.format(value);
export const dateChartLabelFormat = (value) =>
  DateChartLabelFormat.format(value);

export const capitalize = (value) => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};
