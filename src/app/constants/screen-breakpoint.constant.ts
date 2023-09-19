import { Breakpoints } from "@angular/cdk/layout";

export enum BreakpointName {
  xs = "XSmall",
  s = "Small",
  m = "Medium",
  l = "Large",
  xl = "XLarge",
}

export const BREAKPOINTS_TO_OBSERVE: Readonly<string[]> = Object.freeze([
  Breakpoints.XSmall,
  Breakpoints.Small,
  Breakpoints.Medium,
  Breakpoints.Large,
  Breakpoints.XLarge,
]);

export const BREAKPOINT_DISPLAY_NAME_MAP: ReadonlyMap<string, BreakpointName> =
  new Map<string, BreakpointName>([
    [Breakpoints.XSmall, BreakpointName.xs],
    [Breakpoints.Small, BreakpointName.s],
    [Breakpoints.Medium, BreakpointName.m],
    [Breakpoints.Large, BreakpointName.l],
    [Breakpoints.XLarge, BreakpointName.xl],
  ]);
