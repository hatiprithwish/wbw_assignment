import { atom } from "recoil";

const currentStepState = atom<number>({
  key: "currentStepState",
  default: 1,
});

export default currentStepState;
