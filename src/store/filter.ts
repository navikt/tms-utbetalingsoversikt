import { getDateThreemonthsBack } from "./../utils";
import { atom } from "nanostores";
export const isErrorAtom = atom<boolean>(false);

export const selctedPeriode = atom<string>("Siste 3 måneder");

export function setSlectedPeriode(label: string) {
  console.log(label);
  selctedPeriode.set(label);
}

export const periodeFilterAtom = atom<{ fom: string; tom: string }>(
  getDateThreemonthsBack()
);

export function setPeriodeFilter(date: { tom: string; fom: string }) {
  periodeFilterAtom.set(date);
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
