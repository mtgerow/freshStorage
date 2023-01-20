import {
  DateParser, DAYS_TO_MILLI,
  HOURS_TO_MILLI,
  MINUTES_TO_MILLI,
  SECONDS_TO_MILLI, WEEKS_TO_MILLI
} from '../../src/support/DateParser';

const dateParser = new DateParser();
describe('DateParser functionality tests.', ()=>{
  it('returns original date if date object passed in.', ()=>{
    const now = new Date();
    const result = dateParser.parse(now);
    expect(result).toEqual(now);
  });

  it('returns date object if millisecond time is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse(now.getTime());
    expect(result).toEqual(now);
  });

  it('returns date object if relative time offset by milliseconds is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse("1000ms");
    expect(result.getTime()).toEqual(now.getTime()+1000);
  });

  it('returns date object if relative time offset by seconds is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse("20s");
    expect(result.getTime()).toEqual(now.getTime()+(20*SECONDS_TO_MILLI));
  });

  it('returns date object if relative time offset by minutes is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse("2m");
    expect(result.getTime()).toEqual(now.getTime()+(2*MINUTES_TO_MILLI));
  });

  it('returns date object if relative time offset by hours is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse("36h");
    expect(result.getTime()).toEqual(now.getTime()+(36*HOURS_TO_MILLI));
  });

  it('returns date object if relative time offset by days is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse("4d");
    expect(result.getTime()).toEqual(now.getTime()+(4*DAYS_TO_MILLI));
  });

  it('returns date object if relative time offset by weeks is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse("12w");
    expect(result.getTime()).toEqual(now.getTime()+(12*WEEKS_TO_MILLI));
  });

  it('returns date object if relative time offset by months is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse("5M");
    expect(result).toEqual(new Date(now.setMonth(now.getMonth()+5)));
  });

  it('returns date object if relative time offset by years is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse("2y");
    expect(result).toEqual(new Date(now.setFullYear(now.getFullYear()+2)));
  });

  it('returns date object if relative time offset by negative days is passed in.', () =>{
    const now = new Date();
    const result = dateParser.parse('-2d');
    expect(result.getTime()).toEqual(now.getTime()+(-2*DAYS_TO_MILLI));
  });
});
