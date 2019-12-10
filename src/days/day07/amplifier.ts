import { getParameterModes, Mode } from "./mode";

export type IntCode = number[];

export class Amplifier {
  code: IntCode;
  pointer: number;
  inputs: number[];
  outputs: number[];
  done: boolean;

  constructor(code: IntCode, phaseSetting: number) {
    this.code = code;
    this.pointer = 0;
    this.inputs = [phaseSetting];
    this.outputs = [];
    this.done = false;
  }

  public run() {
    if (this.done) {
      console.error("Amplifier is done - `run` is not possible when done.");
    }

    let prevLen = this.outputs.length;
    while (!this.done && prevLen === this.outputs.length) {
      const opcode = this.code[this.pointer] % 100;
      const callback = this[`op${opcode}` as keyof Amplifier] as () => void;
      callback.bind(this)();
    }
  }

  public runAll() {
    while (!this.done) {
      this.run();
    }
  }

  public get Finished() {
    return this.done;
  }

  public get LastOutput() {
    return this.outputs[this.outputs.length - 1];
  }

  public addInput(...inputs: number[]) {
    this.inputs.push(...inputs);
  }

  consume(amount: number = 1): number[] {
    const result = this.code.slice(this.pointer, this.pointer + amount);
    this.pointer += amount;
    return result;
  }

  evalMode(mode: Mode, value: number) {
    if (mode === Mode.Reference) {
      return this.code[value];
    } else {
      return value;
    }
  }

  op1() {
    const [op, v1, v2, out] = this.consume(4);
    const [m1, m2] = getParameterModes(op, 2);
    this.code[out] = this.evalMode(m1, v1) + this.evalMode(m2, v2);
  }

  op2() {
    const [op, v1, v2, out] = this.consume(4);
    const [m1, m2] = getParameterModes(op, 2);
    this.code[out] = this.evalMode(m1, v1) * this.evalMode(m2, v2);
  }

  op3() {
    const [op, out] = this.consume(2);
    const value = this.inputs.splice(0, 1)[0];
    this.code[out] = value ?? 0;
  }

  op4() {
    const [op, inp] = this.consume(2);
    const [m1] = getParameterModes(op, 1);
    this.outputs.push(this.evalMode(m1, inp));
  }

  op5() {
    const [op, flag, pointer] = this.consume(3);
    const [m1, m2] = getParameterModes(op, 2);
    if (this.evalMode(m1, flag) !== 0) {
      this.pointer = this.evalMode(m2, pointer);
    }
  }

  op6() {
    const [op, flag, pointer] = this.consume(3);
    const [m1, m2] = getParameterModes(op, 2);
    if (this.evalMode(m1, flag) === 0) {
      this.pointer = this.evalMode(m2, pointer);
    }
  }

  op7() {
    const [op, v1, v2, out] = this.consume(4);
    const [m1, m2] = getParameterModes(op, 2);
    if (this.evalMode(m1, v1) < this.evalMode(m2, v2)) {
      this.code[out] = 1;
    } else {
      this.code[out] = 0;
    }
  }

  op8() {
    const [op, v1, v2, out] = this.consume(4);
    const [m1, m2] = getParameterModes(op, 2);
    if (this.evalMode(m1, v1) === this.evalMode(m2, v2)) {
      this.code[out] = 1;
    } else {
      this.code[out] = 0;
    }
  }

  op99() {
    const [op] = this.consume(1);
    this.done = true;
  }
}
