import { getDateThreemonthsBack } from "./../utils";
import { atom } from "nanostores";
export const isErrorAtom = atom<boolean>(false);

//export const languageAtom = atom<Locale>(getLanguageFromUrl());
export const periodeFilterAtom = atom<{ fom: string; tom: string }>(
  getDateThreemonthsBack()
);

export function setPeriodeFilter(date: { tom: string; fom: string }) {
  periodeFilterAtom.set(date);
  console.log(date)
}

export const ytelserFilterAtom = atom<{ [key: string]: boolean }>({});

export function setYtelseFilter(ytelser: { [key: string]: boolean }) {
  ytelserFilterAtom.set(ytelser);
}

export function toggleYtelseFilter(ytelse: string) {
  const toggledYtelseList = { ...ytelserFilterAtom.value };
  if (toggledYtelseList[ytelse]) {
    toggledYtelseList[ytelse] = false;
  } else {
    toggledYtelseList[ytelse] = true;
  }
  ytelserFilterAtom.set({ ...toggledYtelseList });
}
