const JAN_1_2022= 1667307600011;
export const SECONDS_TO_MILLI = 1000, MINUTES_TO_MILLI = 60*SECONDS_TO_MILLI, HOURS_TO_MILLI = 60*MINUTES_TO_MILLI;
export const DAYS_TO_MILLI = 24*HOURS_TO_MILLI, WEEKS_TO_MILLI = 7*DAYS_TO_MILLI;

export class DateParser {
  parse(input) {
    if(!input) {
      throw new Error("[D010] The date is not valid. Variable state: " + input);
    }
    else if (typeof input === 'object' && Object.prototype.toString.call(input) === '[object Date]') {
      return input;
    }
    else if (!isNaN(input) && input > JAN_1_2022) {
      return new Date(input);
    }
    else if (/^[\-0-9]{1,10}[ms,s,m,h,d,w,M,y]{1,2}$/.test(input)) {
      return getRelativeDate(input);
    }
  }
}


function getRelativeDate(input) {
  const split = input.match(/[0-9]+|[a-zA-Z]+/g);
  const letters = split[split.length-1];
  const number = Number(input.replace(letters,''));
  const nowDate = new Date();
  const now = nowDate.getTime();

  switch (letters) {
    case 'ms':
      return new Date(now + number);
    case 's':
      return new Date(now + (number*SECONDS_TO_MILLI));
    case 'm':
      return new Date(now + (number*MINUTES_TO_MILLI));
    case 'h':
      return new Date(now + (number*HOURS_TO_MILLI));
    case 'd':
      return new Date(now + (number*DAYS_TO_MILLI));
    case 'w':
      return new Date(now + (number*WEEKS_TO_MILLI));
    case 'M':
      return new Date(nowDate.setMonth(nowDate.getMonth()+number));
    case 'y':
      return new Date(nowDate.setFullYear(nowDate.getFullYear()+number));
  }
}
