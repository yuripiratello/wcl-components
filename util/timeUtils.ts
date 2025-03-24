// Time formatting utilities
export const TimeUtils = {
  // Pads a number with leading zeros
  pad: (num: number, size: number): string => {
    return num.toString().padStart(size, "0");
  },

  // Formats milliseconds into a readable duration
  formatDuration: (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes}:${TimeUtils.pad(seconds, 2)}.${milliseconds}`;
  },

  // Formats a timestamp relative to the start of the fight
  formatTimestamp: (startFightTime: number, eventTime: number): string => {
    return TimeUtils.formatDuration(eventTime - startFightTime);
  },
};
