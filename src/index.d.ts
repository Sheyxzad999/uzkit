export type Script = 'latn' | 'cyrl';

// Telefon
export declare const OPERATORS: Readonly<Record<string, string>>;
export declare function isValidPhone(input: unknown): boolean;
export declare function normalizePhone(input: unknown): string | null;
export declare function formatPhone(input: unknown): string | null;
export declare function getOperator(input: unknown): string | null;

// Transliteratsiya
export interface LatinOptions { apostrophe?: string }
export declare function toCyrillic(text: string): string;
export declare function toLatin(text: string, options?: LatinOptions): string;
export declare function isCyrillic(text: string): boolean;
export declare function transliterate(text: string, options?: LatinOptions): string;

// Pul
export interface FormatSumOptions {
  currency?: boolean;
  separator?: string;
  decimals?: number;
  script?: Script | 'ru';
}
export declare function formatSum(amount: number, options?: FormatSumOptions): string;
export declare function parseSum(text: string | number | null | undefined): number | null;

// Son -> so'z
export declare function numberToWords(n: number, options?: { script?: Script }): string;
export declare function sumToWords(amount: number, options?: { script?: Script }): string;

// Hujjatlar
export declare const REGIONS: Readonly<Record<string, string>>;
export interface CarPlate {
  region: string;
  regionName: string;
  type: 'individual' | 'legal';
  formatted: string;
}
export declare function parseCarPlate(input: unknown): CarPlate | null;
export declare function isValidCarPlate(input: unknown): boolean;
export declare function isValidPassport(input: unknown): boolean;
export interface Pinfl { gender: 'male' | 'female'; birthDate: string }
export declare function parsePinfl(input: unknown): Pinfl | null;
export declare function isValidPinfl(input: unknown): boolean;
