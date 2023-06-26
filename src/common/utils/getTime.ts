import * as moment from 'moment';
export const getTime = (lockedAt: Date) => {
  console.log(lockedAt);
  const now = moment();
  const difference = now.diff(moment(lockedAt), 'minutes');
  return difference;
};
