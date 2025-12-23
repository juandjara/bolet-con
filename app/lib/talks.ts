import type { ParsedMarkdown } from "~/lib/content.server";

export type Year = {
  title: string;
  date: string;
  body: string;
  year: number;
};

export type Talk = {
  id: string;
  order: any;
  duration: any;
  title: any;
  description: string;
  startDate: number;
  endDate: number;
  speaker: {
    name: any;
    img: any;
  };
};

const START_DATE = new Date("2025-12-30T19:00:00+01:00");
const DEFAULT_TALK_DURATION = 35; // minutes
const GAP_TIME = 1000 * 60 * 10;

export function processTalkDates(talks: Talk[]) {
  return talks.map((talk, index) => {
    const prevTalk = talks[index - 1];
    const prevTalkEndDate = prevTalk
      ? prevTalk.endDate + GAP_TIME
      : START_DATE.getTime();
    const durationMs = (talk.duration || DEFAULT_TALK_DURATION) * 60 * 1000;
    talk.startDate = prevTalkEndDate;
    talk.endDate = prevTalkEndDate + durationMs;
    talk.duration = talk.duration || DEFAULT_TALK_DURATION;
    return talk;
  });
}

export function parseTalkFile(file: ParsedMarkdown) {
  const { title, speaker_name, speaker_img, order, duration } =
    file.frontmatter;
  return {
    id: file.filename,
    order,
    duration,
    title,
    description: file.body,
    startDate: 0,
    endDate: 0,
    speaker: {
      name: speaker_name,
      img: speaker_img,
    },
  };
}
