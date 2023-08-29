import { getDateThreemonthsBack } from "./../utils";
import { atom } from "nanostores";

export type SelectedYtelser = { [key: string]: boolean };

export const selctedPeriode = atom<string>("Siste 3 måneder");

export function setSlectedPeriode(label: string) {
  selctedPeriode.set(label);
}

export const periodeFilterAtom = atom<{ fom: string; tom: string }>(
  getDateThreemonthsBack()
);

export function setPeriodeFilter(date: { tom: string; fom: string }) {
  periodeFilterAtom.set(date);
}

export const ytelserFilterAtom = atom<SelectedYtelser>({});

export function setYtelseFilter(ytelser: SelectedYtelser) {
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
