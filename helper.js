function getCornParser(cronString) {
  const seperatedString = cronString.split(" ");
  if (seperatedString.includes("") || seperatedString.length < 6) {
    throw new Error("Invalid cron format.");
  }
  console.log("-------:", seperatedString);
  console.log(formatValue("minute", getParcerValue(seperatedString[0], 0, 59)));
  console.log(formatValue("hour", getParcerValue(seperatedString[1], 0, 23)));
  console.log(
    formatValue("day of month", getParcerValue(seperatedString[2], 1, 31))
  );
  console.log(formatValue("month", getParcerValue(seperatedString[3], 1, 12)));
  console.log(
    formatValue("day of week", getParcerValue(seperatedString[4], 0, 6))
  );
  console.log(formatValue("command", seperatedString[5]));
}

function getParcerValue(field, min, max) {
  if (field == "*") {
    return rangeExtractor(min, max, 1).join(" ");
  }

  if (field.includes(",")) {
    const parts = field.split(",");
    let result = [];
    for (let i = 0; i < parts.length; i++) {
      const expandedPart = expandPart(parts[i], min, max);
      result = result.concat(expandedPart);
    }
    return result.join(" ");
  }
  return expandPart(field, min, max).join(" ");
}

function expandPart(part, min, max) {
  if (part.includes("/")) {
    const [range, givenStep] = part.split("/");
    const intervalValue = parseInt(givenStep);
    const [start, end] =
      range === "*" ? [min, max] : range.split("-").map((str) => parseInt(str));
    return rangeExtractor(start, end, intervalValue);
  }

  if (part.includes("-")) {
    const [start, end] = part.split("-").map(Number);
    return rangeExtractor(start, end, 1);
  }
  return [parseInt(part)];
}

function rangeExtractor(start, end, intervalValue) {
  const result = [];
  for (let i = start; i <= end; i += intervalValue) {
    result.push(i);
  }
  return result;
}


//[ROHAN] i took this from internet
function formatValue(name, value) {
  return name.padEnd(14) + value;
}

getCornParser("*/15 0 1,15 * 1-5 /usr/bin/find");


//[ROHAN] i understood this from internet
// * for every
// */value at every value
// / at every
// , this, this
// - range
