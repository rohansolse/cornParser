function parseCronExpression(cronString) {
  const seperatedString = cronString.split(" ");
  if (seperatedString.includes("") || seperatedString.length < 6) {
    throw new Error("Invalid cron format.");
  }
  console.log(seperatedString);
  console.log(formatField("minute", valueExtractor(seperatedString[0], 0, 59)));
  console.log(formatField("hour", valueExtractor(seperatedString[1], 0, 23)));
  console.log(
    formatField("day of month", valueExtractor(seperatedString[2], 1, 31))
  );
  console.log(formatField("month", valueExtractor(seperatedString[3], 0, 12)));
  console.log(
    formatField("day of week", valueExtractor(seperatedString[4], 0, 6))
  );
  console.log(formatField("Command", seperatedString[5]));
}

function valueExtractor(value, min, max) {
  if (value == "*") {
    return getRange(min, max).join(" ");
  }
  if (value.includes("/")) {
    const [start, end] = value.split("/");
    const stepValue = parseInt(end);
    if (start == "*") {
      return getIntervalRange(min, max, stepValue).join(" ");
    }
  }
  if (value.includes("-")) {
    const [start, end] = value.split("-");
    return getRange(start, end).join(" ");
  }
  if (value.includes(",")) {
    const [start, end] = value.split(",");
    return [start, end].map((no) => parseInt(no)).join(" ");
  }
  return parseInt(value);
}

function getRange(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

function getIntervalRange(start, end, intercal) {
  const result = [];
  for (let i = start; i <= end; i += intercal) {
    result.push(i);
  }
  return result;
}

// I search this on internet
function formatField(name, value) {
  return name.padEnd(15) + value;
}

parseCronExpression("*/15 0 1,15 * 1-5 /usr/bin/find");

// min hour dayofmonth month dayofweek-startfromsunday
// min 0-59

//[ROHAN] i understood this from internet
// * for every
// */value at every value
// / at every
// , this, this
// - range

