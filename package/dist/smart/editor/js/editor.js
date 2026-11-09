/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "e577837dd70a"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calendarDayOffset: () => (/* binding */ calendarDayOffset),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   msUntilNextDay: () => (/* binding */ msUntilNextDay),
/* harmony export */   toDate: () => (/* reexport safe */ _format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)
/* harmony export */ });
/* harmony import */ var _format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("15b4e93ff6ed");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
// Dates in the page's language: formatDate, the calendar day offset and the
// next midnight, with no top-level side effects (format-intl.js). The same
// functions as core/js/format.js and SF.format; relative days and times are
// format-relative.js, so a bundle that writes a date does not carry them.


const DAY_MS = 86400000;

function hasDateStyle(style) {
  return style === 'short' || style === 'medium' || style === 'long' || style === 'full';
}
/**
 * A date, a time or both in the locale.
 *
 *   formatDate(at)                          3 нояб. 2026 г.  /  Nov 3, 2026
 *   formatDate(at, {date: 'short'})         03.11.2026       /  11/3/26
 *   formatDate(at, {date: 'long'})          3 ноября 2026 г. /  November 3, 2026
 *   formatDate(at, {time: 'short'})         3 нояб. 2026 г., 14:05
 *   formatDate(at, {date: null, time: 'short'})   14:05   /  2:05 PM
 *
 * `date` and `time` are Intl styles (short, medium, long, full); `intl` gives
 * Intl.DateTimeFormat options outright, for a form the styles do not name (a
 * chart's tick, «14:05» with two-digit hours). Anything that is not a date is
 * `gap`, '' by default.
 */


function formatDate(value, {
  date = 'medium',
  time = null,
  intl = null,
  gap = '',
  ...where
} = {}) {
  const moment = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(value);
  if (!moment) return gap;
  let options = intl;

  if (!options) {
    options = {};
    if (hasDateStyle(date)) options.dateStyle = date;
    if (hasDateStyle(time)) options.timeStyle = time;
    if (!options.dateStyle && !options.timeStyle) options.dateStyle = 'medium';
  }

  return (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('DateTimeFormat', (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale)(where), options).format(moment);
}
/**
 * Calendar days from `now` to the value in the reader's time zone: 0 today,
 * -1 yesterday, 1 tomorrow; NaN when the value is no date. Counted on
 * calendar dates, not 24-hour spans, so 23:59 yesterday is -1 at 00:01 and a
 * day of a clock change is still one day.
 */

function calendarDayOffset(value, {
  now = new Date()
} = {}) {
  const moment = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(value);
  const today = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(now);
  if (!moment || !today) return Number.NaN;
  const day = Date.UTC(moment.getFullYear(), moment.getMonth(), moment.getDate());
  const base = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((day - base) / DAY_MS);
}
/**
 * Milliseconds from `now` to the reader's next midnight, when every relative
 * day on the screen moves by one. A component that shows them sets a timer
 * for this long (plus a second's margin, so it wakes in the new day) and
 * draws them again; «сегодня» said yesterday is wrong by morning.
 */

function msUntilNextDay(now = new Date()) {
  const today = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(now) ?? new Date();
  const next = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  return next.getTime() - today.getTime();
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "c016c43b1452"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FILE_SIZE_UNITS: () => (/* binding */ FILE_SIZE_UNITS),
/* harmony export */   fileSizeUnits: () => (/* binding */ fileSizeUnits),
/* harmony export */   formatFileSize: () => (/* binding */ formatFileSize)
/* harmony export */ });
/* harmony import */ var _format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("15b4e93ff6ed");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
// File sizes in the page's language («1,4 МБ»), with no top-level side
// effects (format-intl.js). The same functions as core/js/format.js,
// composition/file-size.mjs and SF.format.fileSize.
 // The four words of a size, in the languages the SIMAI Framework ships; any
// other language reads the English words with its own digits. A component
// with words of its own passes them as `units`.

const FILE_SIZE_UNITS = /* @__PURE__ */Object.freeze({
  en: /* @__PURE__ */Object.freeze(['B', 'KB', 'MB', 'GB']),
  ru: /* @__PURE__ */Object.freeze(['Б', 'КБ', 'МБ', 'ГБ'])
});
/** The unit words for a locale: its language's, else English. */

function fileSizeUnits(locale = 'en') {
  const language = String(locale || 'en').toLowerCase().split('-')[0];
  return Object.hasOwn(FILE_SIZE_UNITS, language) ? FILE_SIZE_UNITS[language] : FILE_SIZE_UNITS.en;
}
/**
 * A size as people read it: «512 Б», «2 КБ», «1,4 МБ», «12 GB». Binary steps
 * of 1024; one digit after the point under ten of a unit, none above it or in
 * bytes. Text a host already formatted is returned as it came; anything that
 * is not a size is ''.
 *
 *   formatFileSize(size, {node, units?, locale?})
 *   formatFileSize(size, units, locale)   -- the form composition/file-size.mjs
 *                                            and sf-image-field 1.x published
 */

function formatFileSize(size, options = {}, legacyLocale) {
  const where = Array.isArray(options) ? {
    units: options,
    locale: legacyLocale ?? 'en'
  } : options ?? {};
  if (typeof size === 'string') return size;
  const bytes = Number(size);
  if (size === null || size === undefined || !Number.isFinite(bytes) || bytes < 0) return '';
  const locale = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale)(where);
  const units = where.units?.length ? where.units : fileSizeUnits(locale);
  let amount = bytes;
  let index = 0;

  while (amount >= 1024 && index < units.length - 1) {
    amount /= 1024;
    index += 1;
  }

  const digits = index === 0 || amount >= 10 ? 0 : 1;
  return `${(0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('NumberFormat', locale, {
    maximumFractionDigits: digits
  }).format(amount)} ${units[index]}`;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "15b4e93ff6ed"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatLocale: () => (/* binding */ formatLocale),
/* harmony export */   intlFormatter: () => (/* binding */ intlFormatter),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _page_language_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("43090d1c8307");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_page_language_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_page_language_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
/* harmony import */ var _page_language_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_page_language_js__WEBPACK_IMPORTED_MODULE_0__);
// The part every format module shares (core/js/format.js says what the
// helpers are): the locale a call formats in, a Date from what a host gives,
// and the Intl formatters, kept on a global every copy of these modules shares
// (bundles each carry their own module copy; page-language.js says why).
//
// No top-level side effects, here or in format-number.js, format-date.js,
// format-relative.js and format-file-size.js (ui-chart, 2026-11-05): a bundle
// that imports one function carries that function and what it calls, nothing
// else. The global is made on the first format, not on load, and SF.format is
// published by core's entry (index.js, publishFormat in format.js).

/** The locale a call formats in: the one it names, else its node's page language. */

function formatLocale({
  locale,
  node
} = {}) {
  return String(locale || '').trim() || (0,_page_language_js__WEBPACK_IMPORTED_MODULE_0__.pageLocale)(node);
}
/** A Date from a Date, a time in milliseconds or a date string; null when it is none. */

function toDate(value) {
  if (value === null || value === undefined || value === '') return null;
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(typeof value === 'string' && /^\d+$/u.test(value) ? Number(value) : value);
  return Number.isNaN(date.getTime()) ? null : date;
} // The formatters every copy shares, made on the first call.

function formatterCache() {
  const root = typeof globalThis !== 'undefined' ? globalThis : {};
  if (!root.__sfFormat) root.__sfFormat = {
    formatters: new Map()
  };
  return root.__sfFormat.formatters;
} // One formatter per kind, locale and options. An unknown locale falls back to
// the browser's, and options the platform refuses (an unknown unit or
// currency) to a plain number, so a typo in a page never throws at a reader.


function intlFormatter(kind, locale, options) {
  const key = `${kind}|${locale}|${JSON.stringify(options)}`;
  const cache = formatterCache();
  if (cache.has(key)) return cache.get(key);
  const Make = Intl[kind];
  let made;

  try {
    made = new Make(locale || undefined, options);
  } catch {
    try {
      made = new Make(undefined, options);
    } catch {
      made = new Make(locale || undefined, kind === 'NumberFormat' ? {
        maximumFractionDigits: 2
      } : {});
    }
  } // A page that formats in many locales does not grow the cache for ever.


  if (cache.size >= 256) cache.delete(cache.keys().next().value);
  cache.set(key, made);
  return made;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "c9ce0852ac73"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatNumber: () => (/* binding */ formatNumber),
/* harmony export */   numberOptions: () => (/* binding */ numberOptions)
/* harmony export */ });
/* harmony import */ var _format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("15b4e93ff6ed");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
// Numbers in the page's language by a format word: formatNumber and
// numberOptions alone, with no top-level side effects (format-intl.js). The
// same functions as core/js/format.js and SF.format.number; a bundle that
// formats numbers only imports them from here.

/**
 * The Intl options of a number format word (ui-chart's words, kept so a page
 * writes a format as an attribute):
 *
 *   number (default)  1 234,5   as many digits as `step` needs, at most 6; 2 without one
 *   integer           1 235
 *   decimal-<n>       n digits after the point, always (0 to 20)
 *   percent           a share 0..1 as 12 %
 *   compact           1,2 тыс.  /  1.2K
 *   currency-<CODE>   1 234,50 ₽ (an ISO 4217 code)
 *   unit-<unit>       45,3 ГБ (an Intl unit: gigabyte, megabit-per-second)
 *
 * Anything else reads as number.
 */

function numberOptions(format = 'number', step = 0) {
  const word = String(format || 'number').trim();
  if (word === 'integer') return {
    maximumFractionDigits: 0
  };
  if (word === 'percent') return {
    style: 'percent',
    maximumFractionDigits: 1
  };
  if (word === 'compact') return {
    notation: 'compact',
    maximumFractionDigits: 1
  };
  const decimal = /^decimal-(\d{1,2})$/u.exec(word);

  if (decimal) {
    const digits = Math.min(20, Number(decimal[1]));
    return {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    };
  }

  const unit = /^unit-([a-z]+(?:-per-[a-z]+)?)$/u.exec(word);
  if (unit) return {
    style: 'unit',
    unit: unit[1],
    unitDisplay: 'short',
    maximumFractionDigits: 1
  };
  const currency = /^currency-([A-Z]{3})$/u.exec(word);
  if (currency) return {
    style: 'currency',
    currency: currency[1]
  };
  const digits = step > 0 && step < 1 ? Math.min(6, Math.ceil(-Math.log10(step) - 1e-9)) : 2;
  return {
    maximumFractionDigits: digits
  };
}
/**
 * A number in the locale by a format word (numberOptions). `grouping: false`
 * writes it without thousands marks («2026»), `step` sets the digits of
 * `number`, and a value that is not a finite number is `gap`, '' by default
 * (a chart passes '—').
 */

function formatNumber(value, format = 'number', {
  step = 0,
  gap = '',
  grouping = true,
  ...where
} = {}) {
  const number = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  if (typeof number !== 'number' || !Number.isFinite(number)) return gap;
  const options = numberOptions(format, step);
  if (grouping === false) options.useGrouping = false;
  return (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('NumberFormat', (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale)(where), options).format(number);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "ee5c3aad2640"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatRelativeDay: () => (/* binding */ formatRelativeDay),
/* harmony export */   formatRelativeTime: () => (/* binding */ formatRelativeTime)
/* harmony export */ });
/* harmony import */ var _format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("15b4e93ff6ed");
/* harmony import */ var _format_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e577837dd70a");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__, _format_date_js__WEBPACK_IMPORTED_MODULE_1__]);
([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__, _format_date_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Relative days and times in the page's language («вчера», «5 минут назад»),
// with no top-level side effects (format-intl.js). The same functions as
// core/js/format.js and SF.format.relativeDay / relativeTime.

 // The first letter in capitals, by the locale's rule («вчера» → «Вчера»).

function capitalise(text, locale) {
  const first = Array.from(text)[0] ?? '';
  return first ? first.toLocaleUpperCase(locale || undefined) + text.slice(first.length) : text;
}
/**
 * The day a moment fell on, as a list says it: «сегодня», «вчера», «завтра»,
 * the weekday within the last week («понедельник»), else the date («3 ноября»,
 * with the year when it is not this one). The words are the platform's for
 * the locale (Intl.RelativeTimeFormat, numeric auto); a component that ships
 * its own passes them (`today`, `yesterday`, `tomorrow`) and they win.
 * `weekday: false` goes from yesterday straight to the date; `capital: true`
 * starts the word with a capital, as a heading or a divider does.
 *
 * The answer changes at the reader's midnight: msUntilNextDay (format-date.js)
 * says when.
 */


function formatRelativeDay(value, {
  now = new Date(),
  today,
  yesterday,
  tomorrow,
  weekday = true,
  capital = false,
  gap = '',
  ...where
} = {}) {
  const moment = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(value);
  if (!moment) return gap;
  const locale = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale)(where);
  const offset = (0,_format_date_js__WEBPACK_IMPORTED_MODULE_1__.calendarDayOffset)(moment, {
    now
  });
  const own = {
    0: today,
    [-1]: yesterday,
    1: tomorrow
  }[offset];
  let text;

  if (own) {
    text = String(own);
  } else if (offset >= -1 && offset <= 1) {
    text = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('RelativeTimeFormat', locale, {
      numeric: 'auto'
    }).format(offset, 'day');
  } else if (weekday && offset < -1 && offset > -7) {
    text = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('DateTimeFormat', locale, {
      weekday: 'long'
    }).format(moment);
  } else {
    const year = moment.getFullYear() === (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(now).getFullYear() ? {} : {
      year: 'numeric'
    };
    text = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('DateTimeFormat', locale, {
      day: 'numeric',
      month: 'long',
      ...year
    }).format(moment);
  }

  return capital ? capitalise(text, locale) : text;
} // The largest unit a span reaches is the one it is said in (mail-letters'
// steps, 2026-10): 90 seconds is «2 минуты назад», 40 days «в прошлом месяце».

const RELATIVE_STEPS = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
/** «5 минут назад», «через 2 часа»: a moment from `now`, in the locale. */

function formatRelativeTime(value, {
  now = new Date(),
  gap = '',
  ...where
} = {}) {
  const moment = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(value);
  const base = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(now);
  if (!moment || !base) return gap;
  const seconds = Math.round((moment.getTime() - base.getTime()) / 1000);
  const format = (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.intlFormatter)('RelativeTimeFormat', (0,_format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale)(where), {
    numeric: 'auto'
  });

  for (const [unit, size] of RELATIVE_STEPS) {
    if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
  }

  return format.format(seconds, 'second');
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "5b8371b87515"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FILE_SIZE_UNITS: () => (/* reexport safe */ _format_file_size_js__WEBPACK_IMPORTED_MODULE_4__.FILE_SIZE_UNITS),
/* harmony export */   calendarDayOffset: () => (/* reexport safe */ _format_date_js__WEBPACK_IMPORTED_MODULE_1__.calendarDayOffset),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fileSizeUnits: () => (/* reexport safe */ _format_file_size_js__WEBPACK_IMPORTED_MODULE_4__.fileSizeUnits),
/* harmony export */   formatDate: () => (/* reexport safe */ _format_date_js__WEBPACK_IMPORTED_MODULE_1__.formatDate),
/* harmony export */   formatFileSize: () => (/* reexport safe */ _format_file_size_js__WEBPACK_IMPORTED_MODULE_4__.formatFileSize),
/* harmony export */   formatLocale: () => (/* reexport safe */ _format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale),
/* harmony export */   formatNumber: () => (/* reexport safe */ _format_number_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber),
/* harmony export */   formatRelativeDay: () => (/* reexport safe */ _format_relative_js__WEBPACK_IMPORTED_MODULE_2__.formatRelativeDay),
/* harmony export */   formatRelativeTime: () => (/* reexport safe */ _format_relative_js__WEBPACK_IMPORTED_MODULE_2__.formatRelativeTime),
/* harmony export */   msUntilNextDay: () => (/* reexport safe */ _format_date_js__WEBPACK_IMPORTED_MODULE_1__.msUntilNextDay),
/* harmony export */   numberOptions: () => (/* reexport safe */ _format_number_js__WEBPACK_IMPORTED_MODULE_3__.numberOptions),
/* harmony export */   publishFormat: () => (/* binding */ publishFormat),
/* harmony export */   toDate: () => (/* reexport safe */ _format_intl_js__WEBPACK_IMPORTED_MODULE_0__.toDate)
/* harmony export */ });
/* harmony import */ var _format_intl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("15b4e93ff6ed");
/* harmony import */ var _format_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e577837dd70a");
/* harmony import */ var _format_relative_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ee5c3aad2640");
/* harmony import */ var _format_number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("c9ce0852ac73");
/* harmony import */ var _format_file_size_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("c016c43b1452");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__, _format_date_js__WEBPACK_IMPORTED_MODULE_1__, _format_relative_js__WEBPACK_IMPORTED_MODULE_2__, _format_number_js__WEBPACK_IMPORTED_MODULE_3__, _format_file_size_js__WEBPACK_IMPORTED_MODULE_4__]);
([_format_intl_js__WEBPACK_IMPORTED_MODULE_0__, _format_date_js__WEBPACK_IMPORTED_MODULE_1__, _format_relative_js__WEBPACK_IMPORTED_MODULE_2__, _format_number_js__WEBPACK_IMPORTED_MODULE_3__, _format_file_size_js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Dates, days, numbers and file sizes as people read them, in the page's
// language (reuse audit 2026-11-02, finding 7). About fourteen components
// wrote these themselves -- three relative-day rules (thread-list, chat-window
// with its own midnight refresh, mail-letters), file sizes in four places,
// numbers in the chart and the quantity -- and they disagreed: «Вчера» in one
// list, «вчера» in the next, «1.4MB» beside «1,4 МБ». One rule now, through
// Intl only; the most complete copy was ui-chart's chart-core/format.js, whose
// number words are kept as they were.
//
// The locale is the page's (page-language.js pageLocale): an explicit
// `locale`, else the language of `node` -- the nearest [lang] above it, the
// page's choice, <html lang>, English. Never a fixed ru-RU.
//
// This module gathers the helpers and the SF.format object; the helpers live
// in modules of their own with no top-level side effects (core.runtime 1.28.0;
// ui-chart, 2026-11-05), and a bundle imports what it calls from those:
//
//   format-number.js     formatNumber, numberOptions
//   format-date.js       formatDate, calendarDayOffset, msUntilNextDay, toDate
//   format-relative.js   formatRelativeDay, formatRelativeTime
//   format-file-size.js  formatFileSize, fileSizeUnits, FILE_SIZE_UNITS
//   format-intl.js       formatLocale, toDate (and the shared Intl formatters)
//
// Until 1.28.0 this module published SF.format on load, from whichever bundle
// ran it first; that kept every helper in every bundle that imported one (each
// chart bundle grew by 1.3-1.4 KB gzip). Core's entry publishes it now
// (index.js calls publishFormat), and importing this module changes nothing on
// the page. Its exports are as they were.






const Format = /* @__PURE__ */Object.freeze({
  locale: _format_intl_js__WEBPACK_IMPORTED_MODULE_0__.formatLocale,
  date: _format_date_js__WEBPACK_IMPORTED_MODULE_1__.formatDate,
  relativeDay: _format_relative_js__WEBPACK_IMPORTED_MODULE_2__.formatRelativeDay,
  relativeTime: _format_relative_js__WEBPACK_IMPORTED_MODULE_2__.formatRelativeTime,
  dayOffset: _format_date_js__WEBPACK_IMPORTED_MODULE_1__.calendarDayOffset,
  msUntilNextDay: _format_date_js__WEBPACK_IMPORTED_MODULE_1__.msUntilNextDay,
  number: _format_number_js__WEBPACK_IMPORTED_MODULE_3__.formatNumber,
  numberOptions: _format_number_js__WEBPACK_IMPORTED_MODULE_3__.numberOptions,
  fileSize: _format_file_size_js__WEBPACK_IMPORTED_MODULE_4__.formatFileSize
});
/**
 * Publishes SF.format on `root` (the page's global), unless something is there
 * already: core's entry calls it once; a component bundle never does.
 */

function publishFormat(root = typeof globalThis !== 'undefined' ? globalThis : undefined) {
  if (!root) return undefined;
  root.SF = root.SF || {};
  if (!root.SF.format) root.SF.format = Format;
  return root.SF.format;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Format);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "f28a9d913ce0"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Generated from the `tag` rows of src/smart/*/aliases.json and the element_aliases of
// src/core/contracts/packages/*.package.json by scripts/tag-alias-table.mjs; do not edit.
// The dated tag aliases of the Framework and of its component packages, read by core/js/tag-aliases.js.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.freeze([Object.freeze({
  from: 'sf-avatars',
  to: 'sf-avatar-group',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-button-group',
  to: 'sf-segmented',
  since: '2026-11-08',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-change-confirm',
  to: 'sf-confirm-change',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-close',
  to: 'sf-button-close',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-code-input',
  to: 'sf-input-code',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-color',
  to: 'sf-input-color',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-composition-overlay',
  to: 'sf-editor-overlay',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-content-editor',
  to: 'sf-editor-content',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-context-menu',
  to: 'sf-menu-context',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-copy-button',
  to: 'sf-button-copy',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-country-code',
  to: 'sf-input-country',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-data-view',
  to: 'sf-view',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-datepicker',
  to: 'sf-input-date',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-download-file',
  to: 'sf-file-download',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-icon-button',
  to: 'sf-button-icon',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-image-field',
  to: 'sf-input-image',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-inline-editor',
  to: 'sf-editor-inline',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-lookup',
  to: 'sf-input-lookup',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-page-header',
  to: 'sf-header-page',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-property-view',
  to: 'sf-view-properties',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-quantity',
  to: 'sf-input-quantity',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-range-slider',
  to: 'sf-slider-range',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-rich-text',
  to: 'sf-input-rich',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-site-header',
  to: 'sf-header-site',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-table',
  to: 'sf-view-table',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-textarea',
  to: 'sf-input-textarea',
  since: '2026-11-03',
  remove_after: '2027-01-01'
}), Object.freeze({
  from: 'sf-thread-list',
  to: 'sf-chat-threads',
  since: '2026-11-03',
  remove_after: '2027-01-01'
})]));

/***/ },

/***/ "4a85acfb05c1"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canonicalTag: () => (/* binding */ canonicalTag),
/* harmony export */   defineTagAliases: () => (/* binding */ defineTagAliases),
/* harmony export */   isTag: () => (/* binding */ isTag),
/* harmony export */   listTagAliases: () => (/* binding */ listTagAliases),
/* harmony export */   noteTagAlias: () => (/* binding */ noteTagAlias),
/* harmony export */   registerTagAliasRows: () => (/* binding */ registerTagAliasRows),
/* harmony export */   registerTagAliases: () => (/* binding */ registerTagAliases),
/* harmony export */   tagNames: () => (/* binding */ tagNames),
/* harmony export */   tagSelector: () => (/* binding */ tagSelector)
/* harmony export */ });
/* harmony import */ var _deprecations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d3818183b14c");
/* harmony import */ var _alias_table_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5dcef5de40cf");
/* harmony import */ var _tag_aliases_generated_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("f28a9d913ce0");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_deprecations_js__WEBPACK_IMPORTED_MODULE_0__, _alias_table_js__WEBPACK_IMPORTED_MODULE_1__]);
([_deprecations_js__WEBPACK_IMPORTED_MODULE_0__, _alias_table_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _deprecations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_deprecations_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _alias_table_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_alias_table_js__WEBPACK_IMPORTED_MODULE_1__);
// Dated tag aliases (rename plan R0, ui-control RENAME-PLAN-2026-11-03; change
// lifecycle: contracts/changes/journal.json, kind "tag"). When a Smart
// component takes a new tag, the old tag keeps working until its
// `remove_after` day:
//
// - Definition. defineTagAliases(Class, tag) defines each old tag as a trivial
//   subclass of the class that defines the new one (the Smart base calls it
//   from define()). The Loader's rule lists the old tag beside the new one, so
//   markup with the old tag alone loads the bundle.
// - Note. The first old-tag element a page connects is noted in
//   SF.deprecations (kind "tag") and named once on the console with the new tag
//   and the date, whatever the page opted into: an element name is the most
//   visible thing a page writes, and the old one is going.
// - Script. Code that finds a renamed element by name asks for both names
//   through one helper instead of a literal:
//
//     import {tagSelector, isTag} from '../../core/js/smart-base';
//     host.querySelector(`.sf-tag > ${tagSelector('sf-button-close')}`);
//     if (isTag(node, 'sf-button-close')) ...
//
// - Sheets. A selector that names the new tag names the old one beside it in
//   source, `:is(sf-button-close, sf-close)`, for as long as the alias lives
//   (scripts/rename-smart-tag.mjs writes it, --sweep takes it out; the
//   contract test tests/tag-aliases.contract.test.mjs holds both).
//
// The aliases are a static table (tag-aliases.generated.js, written by
// scripts/tag-alias-table.mjs from every component's aliases.json and from the
// element_aliases of the component package references,
// contracts/packages/*.package.json), so a lookup finds an old tag before the
// renamed component's bundle has run, a package's (sf-table, rename plan R2)
// as well as the Framework's. A package's component adds its rows again when it
// is defined, which matters only for a package the pair does not reference. Every copy of this
// module shares one state on the page (a global symbol); the Smart bundles
// reach it through the shared runtime (smart-base re-exports it).



const STATE = Symbol.for('simai.sf.tag-aliases');

function state() {
  if (!globalThis[STATE]) {
    const shared = {
      byOld: new Map(),
      byNew: new Map(),
      noted: new Set()
    };
    Object.defineProperty(globalThis, STATE, {
      value: shared,
      configurable: true
    });

    for (const row of _tag_aliases_generated_js__WEBPACK_IMPORTED_MODULE_2__["default"]) addRow(shared, row);
  }

  return globalThis[STATE];
}

function addRow(shared, row) {
  if (shared.byOld.has(row.from)) return;
  shared.byOld.set(row.from, row);
  shared.byNew.set(row.to, [...(shared.byNew.get(row.to) ?? []), row.from]);
} // Rows from a component's aliases.json (its `tag` rows); the Framework's are
// already known, a package's are added here.


function registerTagAliases(table, tag) {
  const {
    rows
  } = (0,_alias_table_js__WEBPACK_IMPORTED_MODULE_1__.readTagAliases)(table, {
    tag
  });
  const shared = state();

  for (const row of rows) addRow(shared, row);

  return rows;
} // Rows a component set gives at runtime (SF.RuleLoader.registerPackage(name,
// {aliases})): {from, to, since, remove_after}, the set's own former tags, so
// SIMAI Framework needs no table row for a set it does not know. Answers the
// rows taken; a row whose old tag is already known keeps the first.

function registerTagAliasRows(rows) {
  const shared = state();
  const taken = [];

  for (const row of Array.isArray(rows) ? rows : []) {
    if (!row || typeof row.from !== 'string' || typeof row.to !== 'string') continue;
    if (shared.byOld.has(row.from)) continue;
    const clean = Object.freeze({
      from: row.from,
      to: row.to,
      since: String(row.since ?? ''),
      remove_after: String(row.remove_after ?? '')
    });
    addRow(shared, clean);
    taken.push(clean);
  }

  return taken;
} // The open old names of a tag, its own first: ['sf-button-close', 'sf-close'].

function tagNames(tag) {
  const name = String(tag || '').toLowerCase();
  return [name, ...(state().byNew.get(name) ?? [])];
} // A selector for the tag that matches its old names too:
// ':is(sf-button-close, sf-close)', or the tag itself when it has none.

function tagSelector(tag) {
  const names = tagNames(tag);
  return names.length > 1 ? `:is(${names.join(', ')})` : names[0];
} // Whether an element is the tag, under its own or an old name.

function isTag(element, tag) {
  const name = element?.localName;
  return Boolean(name) && tagNames(tag).includes(name);
} // The current name of a tag: 'sf-button-close' for 'sf-close'. An old tag the
// page still has as an element of its own stays itself: a component package
// built before its rename (rules naming sf-table alone) beside a pair whose
// table already knows the new name, where the new tag would never upgrade.

function canonicalTag(tag) {
  const name = String(tag || '').toLowerCase();
  const row = state().byOld.get(name);
  if (!row) return name;
  const own = globalThis.customElements?.get?.(name);
  if (own && !own.sfTagAliasOf) return name;
  let rules = null;

  try {
    rules = globalThis.SF?.Loader?.getCustomElementRules?.() ?? null;
  } catch {
    rules = null;
  }

  if (rules && rules[name] && !rules[row.to]) return name;
  return row.to;
} // Every open row: [{from, to, since, remove_after}].

function listTagAliases() {
  return [...state().byOld.values()].map(row => ({ ...row
  }));
} // The page met an element under an old name: once per old tag.

function noteTagAlias(row) {
  const shared = state();
  const expired = (0,_alias_table_js__WEBPACK_IMPORTED_MODULE_1__.aliasExpired)(row);
  (0,_deprecations_js__WEBPACK_IMPORTED_MODULE_0__.noteDeprecated)({
    component: row.to,
    kind: 'tag',
    from: row.from,
    to: row.to,
    tag: row.to,
    since: row.since,
    remove_after: row.remove_after,
    expired
  });
  if (shared.noted.has(row.from)) return;
  shared.noted.add(row.from); // deprecations.js prints an expired name itself, and every name when the
  // page opted in; the note here is for the rest.

  const optedIn = globalThis.document?.documentElement?.dataset?.sfDeprecations === 'warn' || globalThis.SF?.deprecations?.warn === true;
  if (expired || optedIn) return;
  globalThis.console?.warn?.(`[SIMAI Framework] <${row.from}> is now <${row.to}>; the old tag works until ${row.remove_after}. Write <${row.to}>. See contracts/changes/journal.json.`);
} // Defines each old tag of `tag` as a subclass of `Base` (the class that
// defines `tag`), through `define(name, Class)`: the Smart base passes its
// definition queue, so both names are defined in the same batch. Returns the
// rows defined.

function defineTagAliases(Base, tag, {
  table = Base?.aliases,
  define
} = {}) {
  if (table) registerTagAliases(table, tag);
  const rows = (state().byNew.get(tag) ?? []).map(from => state().byOld.get(from));
  const registry = globalThis.customElements;
  const defined = [];

  for (const row of rows) {
    if (!registry || registry.get(row.from)) continue;

    class TagAlias extends Base {
      connectedCallback() {
        noteTagAlias(row);
        super.connectedCallback?.();
      }

    }

    Object.defineProperty(TagAlias, 'sfTagAliasOf', {
      value: row.to
    });
    (define ?? ((name, Class) => registry.define(name, Class)))(row.from, TagAlias);
    defined.push(row);
  }

  return defined;
}

if (typeof globalThis !== 'undefined') {
  globalThis.SF = globalThis.SF || {}; // For scripts that are not Smart bundles (class components, a page):
  // SF.tags.selector('sf-button-close').

  if (!globalThis.SF.tags) {
    globalThis.SF.tags = Object.freeze({
      names: tagNames,
      selector: tagSelector,
      is: isTag,
      canonical: canonicalTag,
      list: listTagAliases
    });
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "4ddf32352097"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deb1a4d61565");
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5b7d7695b41b");
/* harmony import */ var _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("32dfc4431a24");
/* harmony import */ var _core_js_composition_catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("76235de72516");
/* harmony import */ var _core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("e2cb52b018e5");
/* harmony import */ var _core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("f0e430451ca1");
/* harmony import */ var _core_js_page_language_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("50d340b22253");
/* harmony import */ var _js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("8d9331f1f24f");
/* harmony import */ var _js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("c584913fd94f");
/* harmony import */ var _js_templates_default_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("d62589d9772e");
/* harmony import */ var _component_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("b1c5d4f6dddd");
/* harmony import */ var _lang_en_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("5bf8f84cf5a8");
/* harmony import */ var _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("362a712abf5e");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__, _core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__, _core_js_page_language_js__WEBPACK_IMPORTED_MODULE_6__, _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__, _js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__, _js_templates_default_js__WEBPACK_IMPORTED_MODULE_10__]);
([_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__, _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__, _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__, _core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__, _core_js_page_language_js__WEBPACK_IMPORTED_MODULE_6__, _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__, _js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__, _js_templates_default_js__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var _core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_page_language_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_core_js_page_language_js__WEBPACK_IMPORTED_MODULE_6__);
// sf-editor: the one block editor (owner's decision of 2026-11-03, ui-control
// control/ui-editor/UNIFIED-BLOCK-EDITOR.md; Part B of ONE-EDITOR-ASSIGNMENT).
// Layout and text are one Composition Document and one editor: there are no
// modes, only depth. A click on text types; a click beside it chooses the
// block; Esc goes up a level and Enter down. One catalogue serves the + between
// blocks, / in text and the library on the left; one parameter panel shows
// where each value comes from (type, theme, variant, block, screen); one undo
// history holds typing and structure. Rights come from the host: the editor
// shows what follows from them (locked parts dimmed with a lock and a reason)
// and has no role switch. The theme is the host's and is only read. The site
// template and the block builder are separate, explicit edits.
//
// Built on the Part A contracts of SIMAI Framework (ui-source a0b7f2ec): the
// catalogue and variants, layout parameters as utilities, parameter sets,
// composed site blocks, named places and data from the host's source port.
// The model (js/model.mjs) holds the Document and every change; this element
// draws it with the Framework's own renderers and its own Smart components.















const applied = value => value === undefined ? {
  outcome: "applied"
} : {
  outcome: "applied",
  value
};

const refused = reason => ({
  outcome: "refused",
  reason
});

const ID = "data-sf-composition-id";
/**
 * The box an element is drawn in. A Framework button's host (sf-button,
 * sf-button-icon) is display: contents and has no box of its own, so its
 * rectangle is 0 at the window's top-left: the box is its button's (G-37).
 */

function boxOf(element) {
  if (!element?.getBoundingClientRect) return null;
  const own = element.getBoundingClientRect();
  if (own.width || own.height) return own;
  const inner = element.querySelector?.(":scope > button, button") ?? element.firstElementChild;
  return inner && inner !== element ? boxOf(inner) : own;
}

const INLINE_EVENTS = ["sf-editor-inline-input", "sf-editor-inline-change", "sf-editor-inline-cancel", "sf-inline-editor-input", "sf-inline-editor-change", "sf-inline-editor-cancel", "sf-inline-edit-input", "sf-inline-edit-commit", "sf-inline-edit-cancel"];
const TEXT_TAGS = new Set(["content.paragraph", "content.heading", "content.list-item"]); // The part of a block's width a drop near its side counts as a side drop.

const SIDE_ZONE = 0.18;
const DRAG_THRESHOLD = 4;
const SCREEN_ORDER = ["desktop", "tablet", "phone"];
const SCREEN_ICONS = {
  desktop: "desktop_windows",
  tablet: "tablet_mac",
  phone: "smartphone"
};
const STATES = ["auto", "empty", "error", "loading"];
const EditorElement = (0,_core_js_element_manifest__WEBPACK_IMPORTED_MODULE_1__.elementFromManifest)(_component_json__WEBPACK_IMPORTED_MODULE_11__, {
  base: (_core_js_smart_base__WEBPACK_IMPORTED_MODULE_0___default()),
  lang: {
    en: _lang_en_json__WEBPACK_IMPORTED_MODULE_12__,
    ru: _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__
  },
  source: "en",
  actions: {
    select({
      id
    } = {}) {
      if (id && !this.model.place(String(id))) return refused("unknown");
      this.choose(id ? String(id) : null);
      return applied();
    },

    edit({
      id
    } = {}) {
      const node = id ? this.model.textNode(String(id)) : null;
      if (!node) return refused("unknown");
      const started = this.model.startTyping(String(id));
      if (!started.ok) return refused(started.reason);
      this.refresh();
      this.afterDraw(() => this.activate(String(id), "end"));
      return applied();
    },

    insert({
      type,
      variant,
      after
    } = {}) {
      const choice = {
        type: String(type ?? ""),
        ...(variant ? {
          variant: String(variant)
        } : {})
      };
      if (!this.model.manifestOf(choice.type)) return refused("unknown");
      const place = after ? this.model.placeAfter(String(after)) : null;
      if (after && !place) return refused("unknown");
      const result = this.insertChoice(choice, place);
      return result.ok ? applied({
        id: result.id
      }) : refused(result.reason);
    },

    undo() {
      return this.history("undo");
    },

    redo() {
      return this.history("redo");
    },

    "set-parameter"({
      id,
      key,
      value,
      screen
    } = {}) {
      const breakpoint = _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.SCREENS[screen] ?? _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.SCREENS[this.screenName];
      const result = this.model.setParam(String(id ?? ""), String(key ?? ""), value, breakpoint);
      if (!result.ok) return refused(result.reason);
      this.redraw();
      return applied();
    },

    "edit-template"({
      on
    } = {}) {
      const result = this.toggleTemplate(on !== false);
      return result.ok ? applied() : refused(result.reason);
    },

    "build-block"({
      id,
      type
    } = {}) {
      const result = this.openBuilder({
        from: id ? String(id) : null,
        type: type ? String(type) : null
      });
      return result.ok ? applied() : refused(result.reason);
    },

    async output({
      format
    } = {}) {
      const value = await this.outputOf(String(format ?? "json"));
      return value === null ? refused("unknown") : applied(value);
    }

  }
});

class SfEditor extends EditorElement {
  constructor() {
    super();

    for (const name of ["document", "types", "editorManifests", "siteBlocks", "words", "rights", "theme", "renderers", "pageSettings"]) {
      if (Object.prototype.hasOwnProperty.call(this, name)) {
        const early = this[name];
        delete this[name];
        this[name] = early;
      }
    }

    this.model = new _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.EditorModel();
    this.main = this.model;
    this.builder = null;
    this.adopted = undefined;
    this.sent = "";
    this.session = null;
    this.sessionId = "";
    this.hoverId = "";
    this.gutterId = "";
    this.drag = null;
    this.pop = null;
    this.popQuery = "";
    this.popActive = 0;
    this.libraryQuery = "";
    this.leftTab = "blocks";
    this.rightTab = "parameters";
    this.lockNote = null;
    this.outputView = null;
    this.notice = "";
    this.dataState = new Map();
    this.dataCache = new Map();
    this.recent = [];
    this.favourites = [];
    this.drawToken = 0;
    this.pendingAfterDraw = [];
    this.listening = null;
    this.seen = {};
    this.pageLandmarks = false;
    this.dropped = null;
    this.librarySection = "";
    this.libraryClosed = new Set();
    this.helpOpen = null;
    this.codeCache = new Map();
    this.hintSeen = false;
  } // ------------------------------------------------------------ inputs


  get screenName() {
    return _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.SCREENS[this.screen] ? this.screen : "desktop";
  }

  get breakpoint() {
    return _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.SCREENS[this.screenName];
  }

  get locale() {
    return (0,_core_js_page_language_js__WEBPACK_IMPORTED_MODULE_6__.pageLocale)(this) || "en";
  }
  /** Takes what the host set: a new Document (not the one this editor sent), types, rights, theme. */


  adopt() {
    const seen = this.seen;
    const types = this.types;
    const siteBlocks = this.siteBlocks;
    const renderers = this.renderers;
    const editorManifests = this.editorManifests;
    let redraw = false;

    if (types !== seen.types || siteBlocks !== seen.siteBlocks || renderers !== seen.renderers || editorManifests !== seen.editorManifests) {
      Object.assign(seen, {
        types,
        siteBlocks,
        renderers,
        editorManifests
      });
      this.main.setTypes({
        types,
        siteBlocks,
        renderers,
        editorManifests
      });
      redraw = true;
    }

    if (this.rights !== seen.rights) {
      seen.rights = this.rights;
      this.main.setRights(this.rights);
      redraw = true;
    }

    if (this.theme !== seen.theme) {
      seen.theme = this.theme;
      this.main.setTheme(this.theme);
      redraw = true;
    }

    const given = this.document;

    if (given !== this.adopted) {
      this.adopted = given;

      if (!(given && this.sent && JSON.stringify(given) === this.sent)) {
        this.finishSession(false);
        this.main.setDocument(given);
        this.builder = null;
        this.model = this.main;
        redraw = true;
      }
    }

    if (this.screen !== seen.screen) {
      seen.screen = this.screen;
      redraw = true;
    }

    if (redraw) this.redraw();
  } // ------------------------------------------------------------ words

  /** A word: the editor's own, a host block's (words), the Framework's field words, else the key. */


  word(key, vars) {
    if (!key) return "";
    const locale = this.locale;
    const host = (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.isPlainObject)(this.words) ? this.words : {};
    const hosted = host[locale]?.[key] ?? host[locale.split("-")[0]]?.[key] ?? host.en?.[key];
    if (hosted !== undefined) return format(hosted, vars);
    const site = this.builderWords?.[locale]?.[key];
    if (site !== undefined) return site; // The Framework's words (sf.composition.*) are not the editor's own:
    // asked there first, so the editor's dictionary does not warn of them.

    if (String(key).startsWith("sf.")) {
      const framework = (0,_core_js_page_language_js__WEBPACK_IMPORTED_MODULE_6__.localeText)(_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__.EDITOR_FIELD_WORDS, key, locale, _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__.EDITOR_WORDS_OWNER);
      if (framework !== key) return framework;
    }

    const own = this.sfWord(key, vars ? {
      vars
    } : undefined);
    if (own !== key) return own;
    const field = (0,_core_js_page_language_js__WEBPACK_IMPORTED_MODULE_6__.localeText)(_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__.EDITOR_FIELD_WORDS, key, locale, _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__.EDITOR_WORDS_OWNER);
    if (field !== key) return field;
    return humanize(key);
  }
  /** A word in every language there is: the editor's own, the host's, the Framework's field words. */


  wordsOf(key) {
    const host = (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.isPlainObject)(this.words) ? this.words : {};
    const site = (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.isPlainObject)(this.builderWords) ? this.builderWords : {};
    const own = [_lang_en_json__WEBPACK_IMPORTED_MODULE_12__, _lang_ru_json__WEBPACK_IMPORTED_MODULE_13__].map(dictionary => dictionary.runtime?.[key]);
    const hosted = [...Object.values(host), ...Object.values(site)].map(dictionary => dictionary?.[key]);
    const field = ["en", "ru"].map(locale => _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__.EDITOR_FIELD_WORDS[locale]?.[key]);
    return [...own, ...hosted, ...field].filter(value => typeof value === "string");
  }

  typeLabel(type) {
    const manifest = this.model.manifestOf(type);
    const key = manifest?.catalogue?.label_key;
    return key ? this.word(key) : this.word((0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.typeWordKey)(type));
  } // ------------------------------------------------------------ lifecycle


  onConnected() {
    super.onConnected?.();
    this.readPreferences();
    this.listen();
  }

  onDisconnected() {
    this.finishSession(false);
    this.listening?.abort();
    this.listening = null;
    this.toolbarObserver?.disconnect();
    this.toolbarObserver = null;
    this.watchedToolbar = null;
    super.onDisconnected?.();
  }

  afterUpdate(...rest) {
    super.afterUpdate?.(...rest);
    if (this.main.listeners.size === 0) this.main.subscribe(event => this.onModelChange(event));
    this.adopt();
  }

  afterRender(...rest) {
    super.afterRender?.(...rest); // The first render made the page's element: the Document is drawn into it.

    if (this.pageElement && !this.drawToken) this.redraw();else this.placeOverlays();
    this.wireSearch();
    this.watchToolbar();
  }
  /** sf-input names its own input only: the catalogue's search is a combobox over the list, said on the native input. */


  wireSearch() {
    const input = this.querySelector(".sf-editor-pop sf-input input");

    if (!input) {
      // The search draws its input on its own update: wire it then.
      const host = this.querySelector(".sf-editor-pop sf-input");

      if (host && !host.sfEditorWired) {
        host.sfEditorWired = true;
        Promise.resolve(host.updateComplete).then(() => requestAnimationFrame(() => this.wireSearch()));
      }

      return;
    }

    const count = this.querySelectorAll(".sf-editor-pop [role=\"option\"]").length;
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-controls", "sf-editor-pop-list");
    input.setAttribute("aria-expanded", "true");
    input.setAttribute("aria-autocomplete", "list");
    if (count) input.setAttribute("aria-activedescendant", `sf-editor-pop-${Math.min(this.popActive, count - 1)}`);else input.removeAttribute("aria-activedescendant");
  }
  /** The host learns of every change: the whole Document, the reason, and whether it was the page or the template. */


  onModelChange(event) {
    if (event.silent) return;
    this.sent = JSON.stringify(this.main.doc);
    this.sfEmit("change", {
      document: JSON.parse(this.sent),
      reason: event.reason,
      scope: event.scope
    });
  }

  readPreferences() {
    const key = this.preferencesKey ? `sf-editor/${this.preferencesKey}` : "";
    const stored = key ? globalThis.SF?.Preferences?.read?.(key) : null;

    if ((0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.isPlainObject)(stored)) {
      this.recent = Array.isArray(stored.recent) ? stored.recent.map(String) : [];
      this.favourites = Array.isArray(stored.favourites) ? stored.favourites.map(String) : [];
      this.hintSeen = stored.hint_seen === true;
    }
  }

  writePreferences() {
    const key = this.preferencesKey ? `sf-editor/${this.preferencesKey}` : "";
    if (key) globalThis.SF?.Preferences?.write?.(key, {
      recent: this.recent,
      favourites: this.favourites,
      ...(this.hintSeen ? {
        hint_seen: true
      } : {})
    });
  }

  refresh() {
    this.requestComponentUpdate("state");
  }

  afterDraw(callback) {
    this.pendingAfterDraw.push(callback);
  } // ------------------------------------------------------------ the canvas


  get pageElement() {
    return this.querySelector(".sf-editor-page");
  }

  get canvasElement() {
    return this.querySelector(".sf-editor-canvas");
  }

  blockElement(id) {
    return id ? this.pageElement?.querySelector(`[${ID}="${cssEscape(id)}"]`) ?? null : null;
  }
  /** Draws the page again: the Framework's renderers over the Document as the chosen screen shows it. */


  async redraw() {
    const page = this.pageElement;
    this.refresh();
    if (!page) return;
    const token = ++this.drawToken;
    this.codeCache.clear();
    const typing = this.model.typing ? { ...this.model.typing,
      at: this.session ? this.caretOffset() : "end"
    } : null;
    this.finishSession(false);
    const {
      document,
      hidden
    } = this.model.canvasDocument(this.breakpoint);
    let result;

    try {
      // The canvas stands inside the editor's own page, which has its own
      // main landmark: the Document's layout.page and a main region are
      // drawn embedded, as <div data-sf-composition-landmark="main">
      // (Composition render options.embedded, SIMAI Framework pair
      // ui-0c23f6a0af12, ui-source #60). A pair before it ignores the
      // option. The HTML a site prints (toHTML) keeps the landmarks.
      result = await _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].render(document, {
        registry: this.model.canvasRegistry,
        preview: true,
        options: {
          embedded: true
        },
        resolveBinding: (binding, context) => this.previewBinding(binding, context)
      });
    } catch (error) {
      result = {
        html: "",
        diagnostics: [{
          code: "render_failed",
          message: String(error?.message ?? error)
        }]
      };
    }

    if (token !== this.drawToken || !page.isConnected) return;
    page.innerHTML = result.html;
    page.dataset.sfEditorDrawn = "true";

    for (const [name, value] of Object.entries((0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.isPlainObject)(this.model.theme?.attributes) ? this.model.theme.attributes : {})) {
      if (/^(?:data-[a-z0-9-]+|class|lang|dir)$/u.test(name)) page.setAttribute(name, String(value));
    }

    this.diagnostics = result.diagnostics ?? []; // A page with its own main landmark keeps its landmarks top level: the canvas around it is then no region.
    // Drawn embedded, that main is <div data-sf-composition-landmark="main">: the page still has one.

    const landmarks = Boolean(page.querySelector('main, [role="main"], [data-sf-composition-landmark="main"]'));

    if (landmarks !== this.pageLandmarks) {
      this.pageLandmarks = landmarks;
      this.refresh();
    }

    this.decorate(hidden);
    this.placeOverlays();
    if (typing && this.model.typing && typing.id === this.model.typing.id) this.activate(typing.id, typing.at);else if (this.model.typing) this.activate(this.model.typing.id, "end");
    const waiting = this.pendingAfterDraw.splice(0);

    for (const callback of waiting) callback();
  }
  /** What only editing needs on the drawn page: locks, faded hidden blocks, empty places, placeholders. */


  decorate(hidden) {
    const page = this.pageElement;

    for (const element of page.querySelectorAll(`[${ID}]`)) {
      const id = element.getAttribute(ID);
      const at = this.model.place(id);
      if (!at) continue;
      element.classList.add("sf-editor-node"); // A locked part is dimmed with a lock once, at its outermost element; the
      // frame of a page with a template (the regions) and a container that
      // holds an open place (an author's text area) only say why on a press.

      const lock = this.model.lockOf(id);

      if (lock) {
        element.dataset.sfEditorLock = lock; // Inactive for this person: said so, and its dimmed text is not
        // held to the contrast of what can be changed (WCAG 1.4.3).

        element.setAttribute("aria-disabled", "true");
        const marked = element.parentElement?.closest(".sf-editor-locked");
        const open = [...element.querySelectorAll(`[${ID}]`)].some(inner => !this.model.lockOf(inner.getAttribute(ID)));

        if (this.model.scopeOf(id) !== "frame" && !open && marked?.dataset.sfEditorLock !== lock) {
          element.classList.add("sf-editor-locked"); // A chip in the part's corner: a span (an sf-icon's own
          // display would put it on a line of its own), the lock and
          // the word for why.

          const mark = this.ownerDocument.createElement("span");
          mark.className = "sf-editor-lock-mark";
          mark.setAttribute("aria-hidden", "true");
          const icon = this.ownerDocument.createElement("sf-icon");
          icon.setAttribute("icon", "lock");
          icon.setAttribute("size", "1/3");
          const words = this.ownerDocument.createElement("span");
          words.textContent = this.sfWord(`lock-mark-${lock}`);
          mark.append(icon, words);
          element.append(mark);
        }
      }

      if (hidden.has(id)) {
        element.classList.add("sf-editor-hidden-here");
        element.dataset.sfEditorHidden = this.sfWord("hidden-here");
      }

      const node = this.model.textNode(id);
      if (node && TEXT_TAGS.has(node.type) && !element.textContent.trim()) element.dataset.placeholder = this.sfWord(node.type === "content.heading" ? "heading-placeholder" : "text-placeholder");
      if (id.includes(":")) element.classList.add("sf-editor-part");
      const own = (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(this.model.doc.root, id)?.node;
      if (own && !lock) this.drawEmptyPlaces(own, element);
    }
  }
  /**
   * The empty places of a block: an empty text area or region, and an empty
   * named place that declares its prompt (empty_key), such as a split
   * hero's picture. Each says what it takes and is its own +; it stands in
   * the renderer's element for that place (data-sf-composition-slot) when
   * there is one, else at the end of the block.
   */


  drawEmptyPlaces(node, element) {
    const manifest = this.model.manifestOf(node.type);
    if (!manifest || (0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_4__.isComposed)(manifest) || this.model.placeLock(node.id)) return;

    for (const [slot, rule] of Object.entries(manifest.slots ?? {})) {
      if (node.slots?.[slot]?.length) continue;
      const container = ["layout.area", "layout.region"].includes(node.type) && slot === "default";
      if (!container && !rule?.empty_key) continue;
      const holder = [...element.querySelectorAll(`[data-sf-composition-slot="${cssEscape(slot)}"]`)].find(candidate => candidate.closest(`[${ID}]`) === element) ?? element;
      const place = this.ownerDocument.createElement("div");
      place.className = "sf-editor-empty";
      place.dataset.sfEditorEmpty = node.id;
      place.dataset.sfEditorSlot = slot;
      const plus = this.ownerDocument.createElement("sf-icon");
      plus.setAttribute("icon", "add");
      plus.setAttribute("size", "1/2");
      plus.setAttribute("aria-hidden", "true");
      const words = this.ownerDocument.createElement("span");
      words.textContent = this.word(rule?.empty_key ?? "empty-place");
      place.append(plus, words);
      holder.append(place);
    }
  }
  /** Preview data for a binding: the host's source port, or demo data of its shape; a state the person chose to look at wins. */


  async previewBinding(binding, {
    node,
    shape,
    settings
  } = {}) {
    const state = this.dataState.get(node?.id);
    if (state === "loading") return undefined;
    if (state === "error") throw new Error(this.sfWord("state-error-text"));
    if (state === "empty") return _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].DATA_SHAPES[shape]?.list ? {
      [_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].DATA_SHAPES[shape].list]: []
    } : null;
    const port = this.sourcePort();

    if (port && binding?.ref) {
      try {
        return await port.resolveBinding(binding, {
          shape,
          settings
        });
      } catch {
        return _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].demoData(shape);
      }
    }

    return _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].demoData(shape);
  }

  sourcePort() {
    const port = this.sfPort;
    if (!port || ["sources", "fields", "preview"].some(name => typeof port[name] !== "function")) return null;
    if (this.wrappedPort?.from !== port) this.wrappedPort = {
      from: port,
      port: _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].createSourcePort(port)
    };
    return this.wrappedPort.port;
  }

  onPortConnected() {
    this.dataCache.clear();
    this.redraw();
  } // ------------------------------------------------------------ overlays

  /** The frame and gutter of the hovered block, the frame of the chosen one, placed over the drawn page. */


  placeOverlays() {
    const canvas = this.canvasElement;
    if (!canvas) return;
    const box = canvas.getBoundingClientRect();

    const place = (element, target, pad = 0) => {
      if (!element) return;

      if (!target) {
        element.hidden = true;
        return;
      }

      const rect = target.getBoundingClientRect();
      element.hidden = false;
      Object.assign(element.style, {
        insetBlockStart: `${rect.top - box.top + canvas.scrollTop - pad}px`,
        insetInlineStart: `${(this.isRtl ? box.right - rect.right : rect.left - box.left) + canvas.scrollLeft - pad}px`,
        inlineSize: `${rect.width + pad * 2}px`,
        blockSize: `${rect.height + pad * 2}px`
      });
    };

    const chosen = this.model.typing ? null : this.blockElement(this.model.selected);
    place(this.querySelector(".sf-editor-chosen"), chosen, 2);
    const hover = this.hoverId && this.hoverId !== this.model.selected ? this.blockElement(this.hoverId) : null;
    place(this.querySelector(".sf-editor-hover"), hover, 2);
    const gutter = this.querySelector(".sf-editor-gutter"); // The grip stays where it was pressed while it is held.

    const gutterTarget = this.blockElement(this.gutterId);

    if (gutter) {
      if (!gutterTarget) gutter.hidden = true;else {
        const rect = gutterTarget.getBoundingClientRect();
        gutter.hidden = false;
        const side = this.isRtl ? box.right - rect.right : rect.left - box.left;
        Object.assign(gutter.style, {
          insetBlockStart: `${rect.top - box.top + canvas.scrollTop}px`,
          insetInlineStart: `${Math.max(0, side + canvas.scrollLeft - gutter.offsetWidth - 4)}px`
        });
      }
    }

    this.placeToolbar(chosen, canvas, box);
    this.placeHint(gutter, gutterTarget, canvas, box);
  }
  /**
   * The chosen block's floating bar: above the block at its end edge, as
   * the prototype has it; below the block when there is no room above (the
   * first block of the page). Hidden while typing or dragging.
   */


  placeToolbar(chosen, canvas, box) {
    const bar = this.querySelector(".sf-editor-toolbar");
    if (!bar || !canvas || !box) return;

    if (!chosen || this.drag || this.model.typing || bar.hidden) {
      bar.style.visibility = "hidden";
      return;
    }

    const rect = chosen.getBoundingClientRect();
    const height = bar.offsetHeight;
    const width = bar.offsetWidth;
    const gap = 8;
    const top = rect.top - box.top + canvas.scrollTop;
    const room = rect.top - box.top;
    const above = room >= height + gap;
    const end = this.isRtl ? box.right - rect.left : rect.right - box.left;
    const start = Math.max(4, Math.min(end + canvas.scrollLeft - width, canvas.clientWidth + canvas.scrollLeft - width - 4));
    Object.assign(bar.style, {
      visibility: "visible",
      insetBlockStart: `${above ? top - height - gap : top + Math.min(rect.height, canvas.clientHeight) + gap}px`,
      insetInlineStart: `${start}px`
    });
    bar.dataset.side = above ? "above" : "below";
  }
  /** The floating bar's parts draw their buttons after it: it is placed again when its size changes. */


  watchToolbar() {
    const bar = this.querySelector(".sf-editor-toolbar");
    if (!bar || bar === this.watchedToolbar || typeof ResizeObserver !== "function") return;
    this.toolbarObserver?.disconnect();
    this.watchedToolbar = bar;
    this.toolbarObserver = new ResizeObserver(() => {
      const canvas = this.canvasElement;
      const box = canvas?.getBoundingClientRect();
      this.placeToolbar(this.model.typing ? null : this.blockElement(this.model.selected), canvas, box);
      const gutter = this.querySelector(".sf-editor-gutter");
      if (canvas && box) this.placeHint(gutter, this.blockElement(this.gutterId), canvas, box);
    });
    this.toolbarObserver.observe(bar);
  }
  /** The first-use hint beside the gutter: until the person first uses the grip or +. */


  placeHint(gutter, target, canvas, box) {
    const hint = this.querySelector(".sf-editor-gutter-hint");
    if (!hint) return;
    const show = !this.hintSeen && gutter && !gutter.hidden && target && !this.drag;
    hint.hidden = !show;
    if (!show) return; // Above the gutter, as the prototype has it; never over the gutter or
    // the chosen block's floating bar: above the bar, below the gutter or
    // below the bar, the first place that is free.

    const rect = gutter.getBoundingClientRect();
    const bar = this.querySelector(".sf-editor-toolbar");
    const barRect = bar && !bar.hidden && bar.style.visibility === "visible" ? bar.getBoundingClientRect() : null;
    const height = hint.offsetHeight;
    const width = hint.offsetWidth;
    const gap = 4;
    const tops = [rect.top - height - gap, ...(barRect ? [barRect.top - height - gap] : []), rect.bottom + gap, ...(barRect ? [barRect.bottom + gap] : [])];
    const left = this.isRtl ? rect.right - width : rect.left;

    const meets = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

    const free = top => top >= box.top && !meets({
      top,
      bottom: top + height,
      left,
      right: left + width
    }, rect) && !(barRect && meets({
      top,
      bottom: top + height,
      left,
      right: left + width
    }, barRect));

    const top = tops.find(free) ?? tops[0];
    Object.assign(hint.style, {
      insetBlockStart: `${Math.max(0, top - box.top + canvas.scrollTop)}px`,
      insetInlineStart: `${Math.max(0, (this.isRtl ? box.right - rect.right : rect.left - box.left) + canvas.scrollLeft)}px`
    });
  }
  /** The grip or + was used: the first-use hint is not shown again. */


  hintUsed() {
    if (this.hintSeen) return;
    this.hintSeen = true;
    this.writePreferences();
    const hint = this.querySelector(".sf-editor-gutter-hint");
    if (hint) hint.hidden = true;
  }

  get isRtl() {
    return getComputedStyle(this).direction === "rtl";
  }
  /** The block a page element stands for: the nearest drawn node a person can choose (a site block's part is its instance). */


  blockAt(target) {
    let element = target?.closest?.(`[${ID}]`);

    while (element && this.pageElement?.contains(element)) {
      const id = element.getAttribute(ID);
      const at = this.model.place(id);
      if (at && this.model.choosable(at.node)) return {
        element: this.blockElement(at.node.id) ?? element,
        id: at.node.id
      };
      element = element.parentElement?.closest(`[${ID}]`);
    }

    return null;
  }

  onPointerMove(event) {
    if (this.drag) return;
    if (!this.pageElement?.contains(event.target) && !event.target.closest?.(".sf-editor-gutter")) return;
    if (event.target.closest?.(".sf-editor-gutter")) return;
    const block = this.blockAt(event.target);
    const id = block?.id ?? "";
    if (id === this.hoverId) return;
    this.hoverId = id;
    const gutter = this.gutterFor(id);
    if (gutter && !this.model.placeLock(this.model.place(gutter)?.parent?.id ?? "")) this.gutterId = gutter;else if (!gutter) this.gutterId = this.gutterId && this.model.place(this.gutterId) ? this.gutterId : "";
    this.placeOverlays();
  }
  /**
   * The block whose gutter (+ and grip) a pointer over a block shows: the
   * hovered one, except over a block that fills the chosen block it stands
   * in. A section its hero fills has no point of its own, so its grip menu
   * was the hero's, and «Make a site block» on the chosen section made a
   * block of the hero alone (G-38); there the gutter stays the chosen
   * block's. Enter, or a press on the block inside, goes down to it. While
   * typing, the gutter is the hovered block's.
   */


  gutterFor(id) {
    const chosen = this.model.typing ? "" : this.model.selected;
    if (!id || !chosen || id === chosen) return id;
    let inside = false;

    for (let at = this.model.place(id); at?.parent; at = this.model.place(at.parent.id)) {
      if (at.parent.id === chosen) {
        inside = true;
        break;
      }
    }

    if (!inside) return id;
    const outer = this.blockElement(chosen)?.getBoundingClientRect();
    const inner = this.blockElement(id)?.getBoundingClientRect();
    if (!outer || !inner) return id;
    const fills = Math.abs(outer.left - inner.left) <= 4 && Math.abs(outer.right - inner.right) <= 4 && Math.abs(outer.top - inner.top) <= 4 && Math.abs(outer.bottom - inner.bottom) <= 4;
    return fills ? chosen : id;
  } // ------------------------------------------------------------ pressing on the page


  onPagePointerDown(event) {
    if (event.button !== 0 || !this.pageElement?.contains(event.target)) return;
    const empty = event.target.closest?.("[data-sf-editor-empty]");

    if (empty) {
      event.preventDefault();
      const place = this.model.placeInside(empty.dataset.sfEditorEmpty, empty.dataset.sfEditorSlot || undefined);
      this.openCatalogue(empty, place, "plus");
      return;
    }

    const raw = event.target.closest?.(`[${ID}]`);

    if (!raw) {
      this.choose(null);
      return;
    }

    const rawId = raw.getAttribute(ID);
    const lock = this.model.lockOf(rawId);
    const textNode = this.model.textNode(rawId);
    if (event.target.closest?.("a") && !(event.metaKey || event.ctrlKey)) event.preventDefault();

    if (lock) {
      event.preventDefault();
      const block = this.blockAt(raw);
      this.choose(block?.id ?? null);
      this.showLock(lock, event);
      return;
    }

    this.lockNote = null;

    if (textNode && TEXT_TAGS.has(textNode.type) && (raw === event.target || raw.contains(event.target)) && !event.target.closest?.(".sf-editor-empty")) {
      if (raw === this.sessionElement) return;
      const at = caretAt(this.ownerDocument, raw, event.clientX, event.clientY);
      const started = this.model.startTyping(rawId);

      if (started.ok) {
        this.activate(rawId, at);
        this.announce(rawId);
        return;
      }
    }

    event.preventDefault();
    const block = this.blockAt(raw); // A site block's instance is closed: its texts are typed in place.
    // A press on the chosen instance away from its texts types in the
    // nearest one (G-40); the first press only chooses it.

    if (block && block.id === this.model.selected && this.typeInInstance(block.id, {
      x: event.clientX,
      y: event.clientY
    })) return;
    this.choose(block?.id ?? null);
    this.canvasElement?.focus({
      preventScroll: true
    });
  }
  /** The drawn text parts of a site block's instance: the elements of its composed texts. */


  instanceTexts(id) {
    const node = this.model.node(id);
    if (!node || !(0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_4__.isComposed)(this.model.manifestOf(node.type))) return [];
    const element = this.blockElement(id);
    if (!element) return [];
    return [...element.querySelectorAll(`[${ID}^="${cssEscape(id)}:"]`)].filter(part => TEXT_TAGS.has(this.model.textNode(part.getAttribute(ID))?.type));
  }
  /**
   * Types in a text of a site block's instance (G-40): the one nearest a
   * point, at the point when it is on the text and at its end otherwise;
   * with no point, the first. The text is kept in the instance's
   * data.texts, through drawing again and undo. False when it has none.
   */


  typeInInstance(id, point = null) {
    const parts = this.instanceTexts(id);
    if (!parts.length) return false;
    let part = parts[0];
    let on = false;

    if (point) {
      let best = Infinity;

      for (const candidate of parts) {
        const box = candidate.getBoundingClientRect();
        const dx = Math.max(box.left - point.x, 0, point.x - box.right);
        const dy = Math.max(box.top - point.y, 0, point.y - box.bottom);
        const distance = Math.hypot(dx, dy);

        if (distance < best) {
          best = distance;
          part = candidate;
          on = distance === 0;
        }
      }
    }

    const partId = part.getAttribute(ID);
    if (!this.model.startTyping(partId).ok) return false;
    this.activate(partId, on ? caretAt(this.ownerDocument, part, point.x, point.y) : "end");
    this.announce(partId);
    return true;
  }

  showLock(lock, event) {
    this.lockNote = {
      lock,
      x: event.clientX,
      y: event.clientY,
      text: this.lockText(lock)
    };
    this.refresh();
  }

  lockText(lock) {
    const reason = this.model.rights.reasons?.[lock];
    if (reason) return String(reason);
    return this.sfWord(`lock-${lock}`);
  }
  /** Chooses a block (or none): the frame, the panel, the path; the host hears it. */


  choose(id) {
    this.finishSession(false);
    this.model.select(id); // The chosen block's gutter stands beside it, so its grip and + are
    // reached without a hover (the Structure tab, the arrows).

    const chosen = this.model.selected;
    if (chosen && this.blockElement(chosen) && !this.model.placeLock(this.model.place(chosen)?.parent?.id ?? "")) this.gutterId = chosen;
    this.closeCatalogue();
    this.lockNote = id && this.model.lockOf(id) ? this.lockNote : null;
    this.announce(this.model.selected);
    this.refresh();
    this.placeOverlays();
  }
  /** The host hears which block is chosen (select {ids}), once per change. */


  announce(id) {
    if (this.lastSelect === (id ?? "")) return;
    this.lastSelect = id ?? "";
    this.sfEmit("select", {
      ids: id ? [id] : []
    });
  } // ------------------------------------------------------------ typing

  /** Starts typing in a drawn text element through sf-editor-inline, at an offset or "end". */


  activate(id, at = "end") {
    const element = this.blockElement(id);
    if (!element) return;

    if (this.sessionElement === element && this.session) {
      setCaret(element, at);
      return;
    }

    this.finishSession(false);
    const content = this.model.textOf(id, "content");
    const carrier = this.querySelector("sf-editor-inline");
    const options = {
      content,
      nodeId: id,
      label: this.typeLabel(this.model.textNode(id)?.type),
      links: true,
      toolbar: "selection"
    };

    try {
      this.session = typeof carrier?.edit === "function" ? carrier.edit(element, options) : (0,_core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__.startInlineEdit)(element, options);
    } catch {
      return;
    }

    this.sessionElement = element;
    this.sessionId = id; // A heading being typed stays a heading: the textbox role the inline
    // session gives is not one a heading may take (its editable state says
    // enough); the session puts the attributes back when it ends.

    if (/^H[1-6]$/u.test(element.tagName)) {
      element.removeAttribute("role");
      element.removeAttribute("aria-multiline");
    }

    element.focus({
      preventScroll: true
    });
    setCaret(element, at);
    this.model.startTyping(id);
    this.gutterId = this.model.place(id)?.node.id ?? "";
    this.refresh();
    this.placeOverlays();
  }
  /** Ends the typing session; the text is already in the Document. */


  finishSession(redrawText = true) {
    const session = this.session;
    const element = this.sessionElement;
    const id = this.sessionId;
    this.session = null;
    this.sessionElement = null;
    this.sessionId = "";
    if (!session) return;

    try {
      session.commit();
    } catch {// the element left the page with its session
    }

    if (redrawText && element?.isConnected) element.replaceChildren((0,_core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__.renderInlineDom)(element.ownerDocument, this.model.textOf(id, "content")));
  }

  caretOffset() {
    const element = this.sessionElement;
    const selection = this.ownerDocument.getSelection();
    if (!element || !selection?.rangeCount || !element.contains(selection.anchorNode)) return "end";
    const range = selection.getRangeAt(0);
    return (0,_core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__.textOffset)(element, range.startContainer, range.startOffset);
  }

  onInlineInput(event) {
    event.stopPropagation();
    const element = event.target;
    if (element !== this.sessionElement) return;
    const id = this.sessionId;
    const content = event.detail?.content ?? (0,_core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__.readInlineDom)(element);
    this.model.setText(id, "content", content);
    this.refresh();
    const node = this.model.textNode(id);

    if (node?.type === "content.paragraph" && !id.includes(":")) {
      const made = this.model.markdownShortcut(id);

      if (made.ok) {
        this.redraw();
        this.afterDraw(() => this.activate(made.id, 0));
        return;
      }

      this.watchSlash(id, element);
    }

    this.placeOverlays();
  }
  /** / in an empty line opens the catalogue on the Text tab, filtered by what follows the slash. */


  watchSlash(id, element) {
    const words = this.model.textOf(id, "content").filter(entry => entry.type === "text").map(entry => entry.value).join("");
    const match = /^\/(\S*)$/u.exec(words);

    if (!match) {
      if (this.pop?.mode === "slash") this.closeCatalogue();
      return;
    }

    const at = (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(this.model.doc.root, id);
    if (!at?.parent) return;
    if (this.pop?.mode !== "slash") this.openCatalogue(element, {
      parent: at.parent.id,
      slot: at.slot,
      index: at.index + 1
    }, "slash", id);
    this.popQuery = match[1];
    this.popActive = 0;
    this.refresh();
  } // ------------------------------------------------------------ keys


  onKeydown(event) {
    if (event.defaultPrevented || event.isComposing) return;
    const mod = event.metaKey || event.ctrlKey;
    const key = event.key;
    const inPanel = event.target.closest?.(".sf-editor-left, .sf-editor-right, .sf-editor-bar, .sf-editor-pop, sf-modal, .sf-editor-menu, .sf-editor-toolbar, .sf-editor-help-pop");
    if (this.pop && this.onCatalogueKey(event)) return;

    if (this.helpOpen && key === "Escape") {
      event.preventDefault();
      this.helpOpen = null;
      this.refresh();
      this.querySelector(".sf-editor-help-open button")?.focus();
      return;
    }

    if (mod && key.toLowerCase() === "z" && !inPanel) {
      event.preventDefault();
      event.stopPropagation();
      this.history(event.shiftKey ? "redo" : "undo");
      return;
    }

    if (mod && key.toLowerCase() === "y" && !inPanel) {
      event.preventDefault();
      event.stopPropagation();
      this.history("redo");
      return;
    }

    if (inPanel) return;
    if (this.session) return this.onTypingKey(event);
    const id = this.model.selected;

    if (key === "Escape") {
      event.preventDefault();
      if (this.lockNote) this.lockNote = null;
      this.model.up();
      this.choose(this.model.selected);
      return;
    }

    if (!id) {
      if (key === "Enter") {
        event.preventDefault();
        this.model.down();
        this.choose(this.model.selected);
      } else if (key === "ArrowDown" || key === "ArrowUp") {
        event.preventDefault();
        this.chooseNeighbour(null, key === "ArrowUp" ? -1 : 1);
      }

      return;
    }

    if (key === "Enter") {
      event.preventDefault();
      const result = this.model.down();

      if (result.typing) {
        this.activate(result.id, "end");
        return;
      } // Enter on a site block's instance goes into its first text (G-40).


      if (result.reason === "closed" && this.typeInInstance(id)) return;
      this.choose(this.model.selected);
      return;
    }

    if (event.altKey && (key === "ArrowUp" || key === "ArrowDown")) {
      event.preventDefault();
      this.moveBy(id, key === "ArrowUp" ? -1 : 1);
      return;
    }

    if (key === "ArrowUp" || key === "ArrowDown") {
      event.preventDefault();
      this.chooseNeighbour(id, key === "ArrowUp" ? -1 : 1);
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      event.preventDefault();
      this.run(this.model.remove(id), "removed-text");
      return;
    }

    if (mod && key.toLowerCase() === "d") {
      event.preventDefault();
      this.run(this.model.duplicate(id), "duplicated-text");
    }
  }
  /** ↑ ↓: the block before or after (the first one when nothing is chosen), brought into view. */


  chooseNeighbour(id, delta) {
    const next = this.model.neighbour(id, delta);
    if (!next) return;
    this.choose(next);
    this.blockElement(next)?.scrollIntoView?.({
      block: "nearest",
      inline: "nearest"
    });
  }

  onTypingKey(event) {
    const key = event.key;
    const id = this.sessionId;

    if (key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.finishSession();
      this.model.up();
      this.choose(this.model.selected);
      this.canvasElement?.focus({
        preventScroll: true
      });
      return;
    }

    if (event.altKey && event.shiftKey && (key === "ArrowUp" || key === "ArrowDown")) {
      event.preventDefault();
      event.stopPropagation();
      this.moveBy(id, key === "ArrowUp" ? -1 : 1);
      return;
    }

    if (id.includes(":")) {
      if (key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
      }

      return;
    }

    if (key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      const offset = this.caretOffset();
      const result = this.model.splitText(id, offset === "end" ? Infinity : offset);

      if (result.ok) {
        this.redraw();
        this.afterDraw(() => this.activate(result.id, 0));
      }

      return;
    }

    if (key === "Backspace" && this.caretOffset() === 0 && this.ownerDocument.getSelection()?.isCollapsed) {
      const result = this.model.joinBack(id);

      if (result.ok) {
        event.preventDefault();
        event.stopPropagation();
        this.redraw();
        this.afterDraw(() => this.activate(result.id, result.offset));
      }
    }
  }

  history(direction) {
    this.finishSession(false);
    const result = direction === "redo" ? this.model.redo() : this.model.undo();
    if (!result.ok) return refused(result.reason);
    this.closeCatalogue();
    this.redraw();
    this.say(this.sfWord(direction === "redo" ? "redone-text" : "undone-text"));
    return applied();
  }

  moveBy(id, delta) {
    const typing = Boolean(this.session);
    const result = this.model.moveBy(id, delta);
    if (!result.ok) return;
    this.redraw();
    if (typing) this.afterDraw(() => this.activate(this.model.typing?.id ?? id, "end"));
    this.say(this.sfWord("moved-text"));
  }

  run(result, said) {
    if (!result.ok) {
      this.say(this.sfWord(`refused-${result.reason}`));
      return result;
    }

    this.redraw();
    if (this.model.typing) this.afterDraw(() => this.activate(this.model.typing.id, "end"));
    if (said) this.say(this.sfWord(said));
    return result;
  }
  /**
   * Says what happened in the status line. The line has no part of the
   * template inside it: its text is written here only, so a render never
   * meets nodes it did not make (writing into a template part broke every
   * later render, G-27).
   */


  say(text) {
    this.notice = text;
    const live = this.querySelector(".sf-editor-live");
    if (live) live.textContent = text;
  } // ------------------------------------------------------------ the catalogue


  catalogue(place) {
    return (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.catalogueAt)(this.model, place, {
      word: key => this.word(key),
      groups: _core_js_composition_catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__.CATALOGUE_GROUPS
    });
  }
  /** Opens the catalogue at a place: the + between blocks, / in text. */


  openCatalogue(anchor, place, mode, slashId = "") {
    // The + is an sf-button-icon, whose host is display: contents and has
    // no box: the catalogue stands by the button it draws (G-37).
    const rect = boxOf(anchor) ?? {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }; // The one list of sections (1.2.0): between blocks the + opens on the
    // sections, in a text flow and for / on Text, when the place takes some;
    // a place that takes one section only (a named place of media) opens it.

    const wanted = (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.sectionForPlace)(this.model, place, mode);
    const fitting = (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.sectionsOf)(this.catalogue(place).items);
    const section = wanted && fitting.some(entry => entry.id === wanted) ? wanted : fitting.length === 1 ? fitting[0].id : "";
    this.pop = {
      mode,
      place,
      slashId,
      x: rect.left,
      y: rect.bottom + 4,
      above: rect.top - 4,
      section
    };
    this.popQuery = "";
    this.popActive = 0;
    this.refresh();
    requestAnimationFrame(() => {
      this.keepPopInView();
      if (mode !== "slash") this.querySelector(".sf-editor-pop input, .sf-editor-pop sf-input")?.focus?.();
    });
  }
  /** The catalogue stays inside the window: moved left at the end edge, above its anchor at the bottom. */


  keepPopInView() {
    const element = this.querySelector(".sf-editor-pop");
    const view = this.ownerDocument.defaultView;
    if (!element || !this.pop || !view) return;
    const box = element.getBoundingClientRect();
    const margin = 8;
    let {
      x,
      y
    } = this.pop;
    let height = this.pop.height ?? null;
    if (x + box.width > view.innerWidth - margin) x = Math.max(margin, view.innerWidth - margin - box.width); // Below the + when it fits, else above it; when neither fits, the
    // larger room, the list capped to it and scrolled: every option can
    // be reached (G-41).

    const below = view.innerHeight - margin - this.pop.y;
    const above = this.pop.above - margin;
    if (box.height <= below) y = this.pop.y;else if (box.height <= above) y = this.pop.above - box.height;else if (below >= above) {
      y = this.pop.y;
      height = Math.floor(below);
    } else {
      height = Math.floor(above);
      y = this.pop.above - height;
    }
    if (x === this.pop.x && y === this.pop.y && height === (this.pop.height ?? null)) return;
    this.pop = { ...this.pop,
      x,
      y,
      ...(height ? {
        height
      } : {})
    };
    this.refresh();
  }

  closeCatalogue() {
    if (!this.pop) return;
    this.pop = null;
    this.refresh();
  }
  /** The sections the catalogue's place takes, as the library lists them. */


  popSections() {
    return this.pop ? (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.sectionsOf)(this.catalogue(this.pop.place).items) : [];
  }
  /**
   * What the catalogue lists: with a search, what it found in every
   * section, each block once under its own section, Text first; in an open
   * section, its blocks (a type there from another section too); else
   * nothing, the list of sections stands.
   */


  popItems() {
    if (!this.pop) return [];
    const at = this.catalogue(this.pop.place);

    if (this.popQuery) {
      const found = (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.searchItems)(at.items, this.popQuery, {
        word: key => this.word(key),
        words: key => this.wordsOf(key)
      });
      return (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.sectionsOf)(found, {
        own: true
      }).flatMap(section => section.types.flatMap(type => type.items));
    }

    if (!this.pop.section) return [];
    return (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.sectionsOf)(at.items).find(section => section.id === this.pop.section)?.types.flatMap(type => type.items) ?? [];
  }
  /** The options the keys move over: the sections, or the blocks. */


  popOptions() {
    if (!this.pop) return [];
    if (this.popQuery || this.pop.section) return this.popItems();
    return this.popSections().map(section => ({
      section: section.id
    }));
  }
  /** Opens a section of the catalogue in place («» goes back to the sections). */


  openPopSection(id) {
    if (!this.pop) return;
    this.pop = { ...this.pop,
      section: id
    };
    this.popActive = 0;
    this.refresh();
    requestAnimationFrame(() => {
      this.keepPopInView();
      if (this.pop?.mode !== "slash") this.querySelector(".sf-editor-pop sf-input input")?.focus();
    });
  }

  onCatalogueKey(event) {
    const items = this.popOptions();

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.closeCatalogue();
      return true;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      event.stopPropagation();
      this.popActive = (this.popActive + (event.key === "ArrowDown" ? 1 : -1) + items.length) % Math.max(1, items.length);
      this.refresh();
      return true;
    }

    if (event.key === "Enter" && items[this.popActive]) {
      event.preventDefault();
      event.stopPropagation();
      const option = items[this.popActive];
      if (option.section) this.openPopSection(option.section);else this.chooseItem(option);
      return true;
    } // Back to the sections: ← or Backspace in an empty search (the + only:
    // with / those keys edit the text).


    if (this.pop.mode !== "slash" && this.pop.section && !this.popQuery && (event.key === "ArrowLeft" || event.key === "Backspace")) {
      event.preventDefault();
      event.stopPropagation();
      this.openPopSection("");
      return true;
    }

    if (this.pop.mode !== "slash" && !this.popQuery && !this.pop.section && event.key === "ArrowRight" && items[this.popActive]?.section) {
      event.preventDefault();
      event.stopPropagation();
      this.openPopSection(items[this.popActive].section);
      return true;
    }

    return false;
  }

  chooseItem(item) {
    const pop = this.pop;
    this.closeCatalogue();
    const choice = {
      type: item.type,
      ...(item.variant ? {
        variant: item.variant
      } : {})
    };

    if (pop?.mode === "slash") {
      this.finishSession(false);
      const result = this.model.insertFromSlash(choice, pop.slashId);
      this.remember(item);
      return this.run(result, "inserted-text");
    }

    return this.insertChoice(choice, pop?.place ?? null, item);
  }

  insertChoice(choice, place, item = null) {
    this.finishSession(false);
    const result = this.model.insert(choice, place);
    if (result.ok) this.remember(item ?? choice);
    return this.run(result, "inserted-text");
  }

  remember(item) {
    this.recent = (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.pushRecent)(this.recent, (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.itemKey)(item));
    this.writePreferences();
  }

  favourite(item) {
    this.favourites = (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.toggleFavourite)(this.favourites, (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.itemKey)(item));
    this.writePreferences();
    this.refresh();
  } // ------------------------------------------------------------ the gutter, the grip and drag

  /** The grip from the keyboard: Enter or Space opens its menu; Alt+arrows move. */


  onGripKey(event, id = this.gutterId) {
    if (!id) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      this.hintUsed();
      this.openGripMenu(id, event.currentTarget);
    } else if (event.altKey && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault();
      event.stopPropagation();
      this.moveBy(id, event.key === "ArrowUp" ? -1 : 1);
    }
  }
  /** The floating bar's grip: a press opens the chosen block's menu, a pull moves it. */


  onToolbarGrip(event) {
    const id = this.model.selected;
    if (event.button !== 0 || !id) return;
    this.hintUsed();
    this.startDrag(event, {
      kind: "move",
      id
    });
  }

  onPlus(event) {
    this.hintUsed();
    const id = this.gutterId;
    const place = id ? this.model.placeAfter(id) : null;
    this.openCatalogue(event.currentTarget, place, "plus");
  }
  /** The grip: a press chooses the block and opens its menu; a pull moves it with drop lines. */


  onGripDown(event) {
    if (event.button !== 0 || !this.gutterId) return;
    this.hintUsed();
    this.startDrag(event, {
      kind: "move",
      id: this.gutterId
    });
  }

  onLibraryDown(event, item) {
    if (event.button !== 0) return;
    this.startDrag(event, {
      kind: "new",
      item
    });
  }

  startDrag(event, what) {
    const start = {
      x: event.clientX,
      y: event.clientY
    };
    const doc = this.ownerDocument;
    const pointer = event.pointerId;
    let moving = false;
    const controller = new AbortController();
    const signal = {
      signal: controller.signal
    };

    const move = next => {
      if (!moving && Math.hypot(next.clientX - start.x, next.clientY - start.y) < DRAG_THRESHOLD) return;

      if (!moving) {
        moving = true;
        this.drag = { ...what,
          target: null
        };
        this.finishSession(false);
        this.classList.add("sf-editor-dragging");
        this.placeOverlays();
      }

      next.preventDefault();
      this.drag.target = this.dropTarget(next.clientX, next.clientY);
      this.placeDropLine();
    };

    const end = last => {
      controller.abort();
      this.classList.remove("sf-editor-dragging");
      const drag = this.drag;
      this.drag = null;
      this.placeDropLine();

      if (!moving) {
        if (what.kind === "move") this.openGripMenu(what.id, event.target);else this.insertChoice({
          type: what.item.type,
          ...(what.item.variant ? {
            variant: what.item.variant
          } : {})
        }, null, what.item);
        return;
      }

      if (last.type === "pointercancel" || !drag?.target) {
        this.placeOverlays();
        return;
      }

      this.dropOn(drag, drag.target);
    };

    doc.addEventListener("pointermove", move, signal);
    doc.addEventListener("pointerup", end, signal);
    doc.addEventListener("pointercancel", end, signal); // A drag the browser lost (a window switch): the next move with no button clears it.

    doc.addEventListener("pointermove", next => {
      if (moving && next.buttons === 0 && next.pointerId === pointer) end(next);
    }, signal);
  }
  /**
   * Where a drop at a point lands: beside a block (its side), before or
   * after it in the nearest slot that takes the dragged type, or inside an
   * empty place. {place} or {beside: {id, side}}, with the line to draw.
   */


  dropTarget(x, y) {
    const doc = this.ownerDocument;
    const under = doc.elementFromPoint(x, y);
    if (!under || !this.pageElement?.contains(under)) return null;
    const type = this.drag.kind === "move" ? this.model.node(this.drag.id)?.type : this.drag.item.type;
    if (!type) return null;
    const empty = under.closest("[data-sf-editor-empty]");

    if (empty) {
      const place = this.model.placeInside(empty.dataset.sfEditorEmpty, empty.dataset.sfEditorSlot || undefined);
      if (place && this.model.accepts(place.parent, place.slot, type) && !this.model.placeLock(place.parent)) return {
        place,
        rect: empty.getBoundingClientRect(),
        edge: "inside"
      };
    }

    let block = this.blockAt(under);

    while (block) {
      const at = (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(this.model.doc.root, block.id);
      if (!at?.parent) return null;

      if (this.drag.kind === "move" && (block.id === this.drag.id || (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(this.model.node(this.drag.id), block.id))) {
        block = this.blockAt(block.element.parentElement);
        continue;
      }

      const rect = block.element.getBoundingClientRect();
      const ratio = (x - rect.left) / Math.max(1, rect.width);
      const sideways = this.model.rights.layout && (ratio < SIDE_ZONE || ratio > 1 - SIDE_ZONE) && rect.width > 160 && !["layout.section", "layout.columns"].includes(at.node.type); // A block inside another (a paragraph in a quote) gives its side to the outer block.

      const besideId = sideways ? this.model.besideTarget(block.id) ?? block.id : null;
      const beside = besideId && besideId !== block.id ? this.blockElement(besideId) : block.element;
      const outer = beside?.getBoundingClientRect();
      const outerRatio = outer ? (x - outer.left) / Math.max(1, outer.width) : 0.5;
      const besideAt = besideId ? (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(this.model.doc.root, besideId) : null;

      if (besideAt && (outerRatio < SIDE_ZONE || outerRatio > 1 - SIDE_ZONE) && (this.drag.kind === "move" ? !(0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(this.model.node(besideId), this.drag.id) : this.model.standsBeside(type)) && !this.model.placeLock(besideAt.parent.id)) {
        const left = outerRatio < SIDE_ZONE;
        return {
          beside: {
            id: besideId,
            side: left !== this.isRtl ? "left" : "right"
          },
          rect: outer,
          edge: left ? "start" : "end"
        };
      }

      const after = y > rect.top + rect.height / 2;
      const place = {
        parent: at.parent.id,
        slot: at.slot,
        index: at.index + (after ? 1 : 0)
      };

      if (this.model.accepts(place.parent, place.slot, type) || this.drag.kind === "move" && this.model.place(this.drag.id)?.parent?.id === place.parent) {
        if (!this.model.placeLock(place.parent)) return {
          place,
          rect,
          edge: after ? "after" : "before"
        };
      }

      block = this.blockAt(block.element.parentElement);
    }

    return null;
  }

  placeDropLine() {
    const line = this.querySelector(".sf-editor-drop");
    const canvas = this.canvasElement;
    if (!line || !canvas) return;
    const target = this.drag?.target;

    if (!target) {
      line.hidden = true;
      return;
    }

    const box = canvas.getBoundingClientRect();
    const rect = target.rect;
    line.hidden = false;
    line.dataset.edge = target.edge;
    const top = rect.top - box.top + canvas.scrollTop;
    const left = rect.left - box.left + canvas.scrollLeft;

    if (target.edge === "start" || target.edge === "end") {
      Object.assign(line.style, {
        top: `${top}px`,
        left: `${target.edge === "start" ? left - 2 : left + rect.width - 1}px`,
        width: "3px",
        height: `${rect.height}px`
      });
    } else if (target.edge === "inside") {
      Object.assign(line.style, {
        top: `${top}px`,
        left: `${left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`
      });
    } else {
      Object.assign(line.style, {
        top: `${(target.edge === "after" ? top + rect.height : top) - 1}px`,
        left: `${left}px`,
        width: `${rect.width}px`,
        height: "3px"
      });
    }
  }

  dropOn(drag, target) {
    if (drag.kind === "move") {
      const result = target.beside ? this.model.dropBeside(drag.id, target.beside.id, target.beside.side) : this.model.move(drag.id, target.place);
      this.run(result, "moved-text");
      return;
    }

    const choice = {
      type: drag.item.type,
      ...(drag.item.variant ? {
        variant: drag.item.variant
      } : {})
    };

    if (target.beside) {
      this.finishSession(false);
      const result = this.model.insertBeside(choice, target.beside.id, target.beside.side);
      if (result.ok) this.remember(drag.item);
      this.run(result, "columns-text");
      return;
    }

    this.insertChoice(choice, target.place, drag.item);
  } // ------------------------------------------------------------ the grip menu


  openGripMenu(id, anchor) {
    this.choose(id);
    const menu = this.querySelector(".sf-editor-menu");
    if (!menu) return;
    const node = this.model.node(id);
    const at = (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(this.model.doc.root, id);
    const columns = node?.type === "layout.columns";
    const entries = [{
      id: "up",
      text: this.sfWord("menu-up"),
      icon: "arrow_upward",
      shortcut: "Alt+↑",
      disabled: !at || at.index === 0
    }, {
      id: "down",
      text: this.sfWord("menu-down"),
      icon: "arrow_downward",
      shortcut: "Alt+↓",
      disabled: !at?.parent || at.index >= at.parent.slots[at.slot].length - 1
    }, {
      id: "duplicate",
      text: this.sfWord("menu-duplicate"),
      icon: "content_copy",
      shortcut: "⌘D"
    }, ...(this.model.rights.layout ? [{
      id: "columns",
      text: this.sfWord(columns ? "menu-add-column" : "menu-columns"),
      icon: "view_column",
      disabled: columns && node.slots?.columns?.length >= _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.MAX_COLUMNS
    }] : []), ...(this.model.rights.builder && !this.builder ? [{
      id: "build",
      text: this.sfWord((0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_4__.isComposed)(this.model.manifestOf(node?.type)) ? "menu-change-block" : "menu-make-block"),
      icon: "dashboard_customize"
    }] : []), {
      id: "remove",
      text: this.sfWord("menu-remove"),
      icon: "delete",
      danger: true,
      shortcut: "⌫"
    }];
    menu.entries = entries;
    menu.dataset.for = id; // sf-button-icon's host is display: contents: the menu stands by its button.

    const button = anchor?.closest?.("sf-button-icon")?.querySelector(":scope > button, button") ?? anchor;
    menu.openFor?.(button, {
      side: "block-end",
      align: "start"
    });
  }

  onMenuSelect(event) {
    event.stopPropagation();
    const menu = event.currentTarget;
    const id = menu.dataset.for;
    const action = event.detail?.entry?.id ?? event.detail?.id;
    queueMicrotask(() => {
      // The menu closes: the keys (⌘Z first) act where a person works, on the canvas.
      if (action !== "build") this.canvasElement?.focus({
        preventScroll: true
      });
      if (action === "up" || action === "down") this.moveBy(id, action === "up" ? -1 : 1);else if (action === "duplicate") this.run(this.model.duplicate(id), "duplicated-text");else if (action === "remove") this.run(this.model.remove(id), "removed-text");else if (action === "columns") {
        const node = this.model.node(id);
        this.run(node?.type === "layout.columns" ? this.model.addColumn(id) : this.model.splitColumns(id), "columns-text");
      } else if (action === "build") this.openBuilder({
        from: id
      });
    });
  } // ------------------------------------------------------------ template, builder, output


  toggleTemplate(on) {
    this.finishSession(false);
    const result = this.main.editTemplate(on);

    if (result.ok) {
      this.lockNote = null;
      this.redraw();
      this.say(this.sfWord(on ? "template-on-text" : "template-off-text"));
    }

    return result;
  }

  openBuilder({
    from = null,
    type = null
  } = {}) {
    this.finishSession(false);
    const started = this.main.startBuilder({
      from,
      type
    });
    if (!started.ok) return started;
    const builder = started.builder;
    const doc = {
      schema: "simai.composition.document",
      schema_version: 1,
      id: "builder",
      profile: "ui-layout",
      locale: this.main.doc.locale,
      root: {
        id: "builder-root",
        type: "layout.page",
        slots: {
          default: [builder.root]
        }
      }
    };
    this.builder = { ...builder,
      name: type ? this.typeLabel(type) : "",
      diagnostics: []
    };
    this.model = new _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.EditorModel({
      document: doc,
      types: this.main.types,
      siteBlocks: this.main.siteBlocks,
      renderers: this.main.renderers,
      editorManifests: this.main.editorManifests,
      theme: this.main.theme
    });
    this.model.select(builder.root.id);
    this.redraw();
    return {
      ok: true
    };
  }

  closeBuilder() {
    this.builder = null;
    this.model = this.main;
    this.redraw();
  }

  async saveBuilder() {
    const session = this.builder;
    if (!session) return;
    const root = this.model.doc.root.slots.default[0];
    const result = this.main.saveBuilder({ ...session,
      root,
      exposed: session.exposed.filter(entry => (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(root, entry.path))
    }, {
      name: session.name,
      locale: this.locale
    });

    if (!result.ok) {
      this.builder = { ...session,
        diagnostics: result.diagnostics ?? [{
          code: result.reason
        }]
      };
      this.refresh();
      return;
    }

    this.builderWords = mergeWords(this.builderWords, result.words);
    const detail = {
      manifest: result.manifest,
      words: result.words,
      changes: result.changes
    };
    this.sfEmit("block-save", detail);

    try {
      await this.sfPort?.saveBlock?.(result.manifest, result.words);
    } catch {
      this.say(this.sfWord("block-not-kept-text"));
    }

    this.builder = null;
    this.model = this.main;
    this.redraw();
    this.say(this.sfWord("block-saved-text"));
  }

  toggleExposed(path, field, on) {
    if (!this.builder) return;
    const target = `${field.plane}.${field.target}`;
    const others = this.builder.exposed.filter(entry => !(entry.path === path && entry.target === target));
    let key = field.target;
    const taken = new Set(others.map(entry => entry.key));

    for (let index = 2; taken.has(key); index += 1) key = `${field.target}_${index}`;

    this.builder.exposed = on ? [...others, {
      key,
      path,
      target
    }] : others;
    this.refresh();
  }

  async outputOf(format) {
    if (format === "json") return JSON.stringify(this.main.toJSON(), null, 2);
    if (format === "markdown") return this.main.toMarkdown().map(area => area.markdown).join("\n\n---\n\n");

    if (format === "html") {
      const port = this.sourcePort();
      const result = await this.main.toHTML({
        resolveBinding: port ? port.resolveBinding : undefined
      });
      return prettyHtml(result.html);
    }

    return null;
  }
  /**
   * The output dialog: drawn, then opened. sf-modal is fetched on the first
   * press (a lazy part), so its open() is waited for: the first press opens
   * the dialog (G-28). A tab switch only changes the text.
   */


  async openOutput(format = "json") {
    const shown = Boolean(this.outputView);
    this.outputView = {
      format,
      text: await this.outputOf(format)
    };
    this.refresh();
    await this.updateComplete?.catch?.(() => {});
    if (shown) return;
    const modal = await this.defined(() => this.querySelector(".sf-editor-output"), "sf-modal", "open");
    if (!modal || !this.outputView) return;
    await modal.updateComplete?.catch?.(() => {});
    await new Promise(resolve => requestAnimationFrame(resolve));
    if (this.outputView) modal.open();
  }
  /** An element of a lazy part once its definition has come: it, or null after a few seconds. */


  async defined(find, tag, method) {
    const ready = () => {
      const element = find();
      return element && typeof element[method] === "function" ? element : null;
    };

    if (ready()) return ready();
    const registry = this.ownerDocument.defaultView?.customElements ?? globalThis.customElements;
    await Promise.race([registry?.whenDefined?.(tag), new Promise(resolve => setTimeout(resolve, 5000))]).catch(() => {}); // An element made before its definition is upgraded with it.

    const element = find();
    if (element && typeof element[method] !== "function") registry?.upgrade?.(element);
    return ready();
  } // ------------------------------------------------------------ the panels

  /** The parameter form of the chosen block at the screen being edited. */


  formOf(id) {
    // The Document keeps `hidden`; the panel asks the positive question,
    // «show on this screen», with the value turned over (yes = not hidden).
    return this.model.fields(id, this.breakpoint).map(field => ({ ...field,
      ...(field.target === "hidden" && field.kind === "toggle" ? {
        shown: true
      } : {}),
      label: field.target === "hidden" && field.kind === "toggle" ? this.sfWord("show-on-screen") : this.word(field.label_key),
      originLabel: this.sfWord(`origin-${field.origin}`),
      choiceLabels: (field.choices ?? []).map(choice => ({
        value: String(choice),
        text: this.choiceWord(field, choice)
      })),
      screensLabel: field.screens.map(key => this.sfWord(`screen-${Object.keys(_js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.SCREENS).find(name => _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.SCREENS[name] === key) ?? key}`)).join(", ")
    }));
  }

  choiceWord(field, choice) {
    const key = `${field.label_key}.${choice}`;
    const said = this.word(key);
    return said === humanize(key) ? String(choice) : said;
  }

  onField(event, field) {
    event.stopPropagation();
    const id = this.model.selected;
    const element = event.currentTarget;
    let value = event.detail?.value ?? element.value;
    if (Array.isArray(value)) value = value[0];
    if (field.kind === "toggle") value = value === true || value === "true" || typeof value !== "string" && Boolean(event.detail?.checked ?? element.checked);
    if (field.shown) value = !value;
    if (Array.isArray(value)) value = value[0];
    const result = this.model.setParam(id, field.key, value, this.breakpoint);
    if (!result.ok) this.say(this.sfWord(`refused-${result.reason}`));
    this.redraw();
  }

  onReset(field) {
    this.model.resetParam(this.model.selected, field.key, this.breakpoint);
    this.redraw();
  }

  onModifiers(event) {
    event.stopPropagation();
    const value = event.detail?.value ?? event.currentTarget.value ?? "";
    const result = this.model.setModifiers(this.model.selected, String(value));
    this.dropped = {
      id: this.model.selected,
      groups: (0,_js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.refusedClasses)(result.dropped)
    };
    this.redraw();
  }

  setScreen(name) {
    if (!_js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.SCREENS[name]) return;
    this.screen = name;
  }

  setRightTab(tab) {
    this.rightTab = tab;
    this.refresh();
  }
  /**
   * The chosen block as code: its node in the Document (JSON), or as the
   * site prints it (HTML: the whole page printed, the block's element cut
   * out of it). Worked out once per drawing; null while it is printed.
   */


  codeOf(id, format) {
    const key = `${format}:${id}`;
    if (this.codeCache.has(key)) return this.codeCache.get(key);

    if (format === "json") {
      const node = (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(this.model.toJSON?.().root ?? this.model.doc.root, id)?.node ?? this.model.node(id);
      const text = JSON.stringify(node ?? null, null, 2);
      this.codeCache.set(key, text);
      return text;
    }

    this.codeCache.set(key, null);
    const port = this.sourcePort();
    Promise.resolve(this.model.toHTML({
      resolveBinding: port ? port.resolveBinding : undefined
    })).then(result => {
      const parsed = new DOMParser().parseFromString(`<body>${result?.html ?? ""}</body>`, "text/html");
      const element = parsed.body.querySelector(`[${ID}="${cssEscape(id)}"]`);
      return element ? prettyHtml(element.outerHTML) : this.sfWord("html-none");
    }, () => this.sfWord("html-none")).then(text => {
      this.codeCache.set(key, text);
      this.refresh();
    });
    return null;
  }
  /** The help popover under its button in the bar. */


  toggleHelp(event) {
    if (this.helpOpen) {
      this.helpOpen = null;
      this.refresh();
      return;
    }

    const rect = boxOf(event.currentTarget) ?? {
      bottom: 0,
      right: 0
    };
    const view = this.ownerDocument.defaultView;
    this.helpOpen = {
      y: rect.bottom + 4,
      x: Math.max(8, (view?.innerWidth ?? rect.right) - rect.right)
    };
    this.refresh();
  }
  /** The theme button: the site's theme settings when the host gave them, else the page panel that names the theme. */


  showTheme() {
    const url = this.main.theme?.settings_url;

    if (url) {
      this.ownerDocument.defaultView?.open(url, "_top");
      return;
    }

    this.choose(null);
  }
  /** Opens a library section in place («» closes it, back to the list of sections). */


  openSection(id) {
    this.librarySection = id;
    this.refresh();
    requestAnimationFrame(() => this.querySelector(id ? ".sf-editor-back button" : `.sf-editor-section-row[data-section] sf-button button`)?.focus({
      preventScroll: true
    }));
  }

  toggleVariants(type) {
    if (this.libraryClosed.has(type)) this.libraryClosed.delete(type);else this.libraryClosed.add(type);
    this.refresh();
  }
  /** The groups a site block may be filed under: the Framework's, in its order. */


  builderGroups() {
    return [..._core_js_composition_catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__.CATALOGUE_GROUPS];
  } // ------------------------------------------------------------ data

  /**
   * What the host's source port answered to a question, for drawing: the
   * answer once it came, null until then (the question is asked once and
   * the panel is drawn again when it is answered). The port's answers are
   * checked by createSourcePort; one it refuses reads as nothing.
   */


  answer(key, ask) {
    const port = this.sourcePort();
    if (!port) return null;
    const known = this.dataCache.get(key);
    if (known) return known.value;
    const entry = {
      value: null
    };
    this.dataCache.set(key, entry);
    Promise.resolve().then(() => ask(port)).then(value => {
      entry.value = Array.isArray(value) ? value : [];
    }, () => {
      entry.value = [];
    }).then(() => this.refresh());
    return null;
  }
  /** The fields of a data shape a mapping names: a list shape's item fields, else its own. */


  shapeFields(shape) {
    const entry = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].DATA_SHAPES[shape];
    if (!entry) return [];
    const schema = entry.list ? entry.schema?.properties?.[entry.list]?.items : entry.schema;
    return Object.keys(schema?.properties ?? {});
  }

  listShape(shape) {
    return Boolean(_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].DATA_SHAPES[shape]?.list);
  }

  onSource(event, entry) {
    event.stopPropagation();
    const ref = String(event.detail?.value ?? event.currentTarget.value ?? "");
    this.model.setSource(this.model.selected, entry.target, Array.isArray(ref) ? ref[0] : ref);
    this.redraw();
  }

  onSetting(event, entry, key, transform = value => value) {
    event.stopPropagation();
    let value = event.detail?.value ?? event.currentTarget.value;
    if (Array.isArray(value)) value = value[0];
    this.model.setSettings(this.model.selected, entry.target, {
      [key]: transform(value)
    });
    this.redraw();
  }

  onMapping(event, entry, field) {
    event.stopPropagation();
    let value = event.detail?.value ?? event.currentTarget.value;
    if (Array.isArray(value)) value = value[0];
    const mapping = { ...(entry.settings.mapping ?? {})
    };
    if (value) mapping[field] = String(value);else delete mapping[field];
    this.model.setSettings(this.model.selected, entry.target, {
      mapping
    });
    this.redraw();
  }

  onRuntime(event, entry) {
    event.stopPropagation();
    let value = event.detail?.value ?? event.currentTarget.value;
    if (Array.isArray(value)) value = value[0];
    const [id, state] = String(value ?? "").split("#");
    this.model.setRuntime(this.model.selected, entry.target, id || null, state);
    this.redraw();
  }

  onState(event) {
    event.stopPropagation();
    let value = event.detail?.value ?? event.currentTarget.value;
    if (Array.isArray(value)) value = value[0];
    if (!value || value === "auto") this.dataState.delete(this.model.selected);else this.dataState.set(this.model.selected, String(value));
    this.redraw();
  } // ------------------------------------------------------------ events


  listen() {
    if (this.listening) return;
    this.listening = new AbortController();
    const signal = {
      signal: this.listening.signal
    };
    this.addEventListener("keydown", event => this.onKeydown(event), { ...signal,
      capture: true
    });
    this.addEventListener("pointerdown", event => {
      if (this.pop && !event.target.closest?.(".sf-editor-pop")) this.closeCatalogue();
      if (this.pageElement?.contains(event.target)) this.onPagePointerDown(event);
    }, signal);
    this.addEventListener("pointermove", event => this.onPointerMove(event), { ...signal,
      passive: true
    });
    this.addEventListener("pointerleave", () => {
      if (this.drag) return;
      this.hoverId = "";
      this.placeOverlays();
    }, signal);

    for (const name of INLINE_EVENTS) {
      this.addEventListener(name, event => {
        event.stopPropagation();
        if (name === "sf-editor-inline-input") this.onInlineInput(event);

        if (name === "sf-editor-inline-change" && event.target === this.sessionElement) {
          const element = this.sessionElement;
          const id = this.sessionId;
          this.session = null;
          this.sessionElement = null;
          this.sessionId = "";
          queueMicrotask(() => {
            if (element?.isConnected) element.replaceChildren((0,_core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__.renderInlineDom)(element.ownerDocument, this.model.textOf(id, "content")));
            if (this.model.typing?.id === id) this.model.typing = null;
            this.refresh();
          });
        }
      }, signal);
    }

    this.addEventListener("click", event => {
      if (this.pageElement?.contains(event.target) && event.target.closest?.("a")) event.preventDefault();
    }, { ...signal,
      capture: true
    }); // A form drawn on the page (form.form, 1.2.0) is never sent from the
    // editor: its submit button chooses the block, as any element does.

    this.addEventListener("submit", event => {
      if (this.pageElement?.contains(event.target)) event.preventDefault();
    }, { ...signal,
      capture: true
    });

    const relayout = () => requestAnimationFrame(() => {
      this.placeOverlays();
      this.placeDropLine();
    });

    globalThis.addEventListener("resize", relayout, signal);
    this.addEventListener("scroll", relayout, { ...signal,
      capture: true,
      passive: true
    });
  } // ------------------------------------------------------------ drawing


  templateContext() {
    return {
      component: this,
      rootClass: this.getRootClass?.() ?? ""
    };
  }

  template() {
    return (0,_js_templates_default_js__WEBPACK_IMPORTED_MODULE_10__.renderEditorTemplate)(this);
  }
  /** Everything the template draws, worked out once per render. */


  view() {
    const model = this.model;
    const selected = model.selected ? model.node(model.selected) : null;
    const lock = selected ? model.lockOf(selected.id) : null;
    const typeManifest = selected ? model.manifestOf(selected.type) : null;
    const data = selected && !lock ? model.dataOf(selected.id) : {
      bindings: [],
      runtime: []
    };
    const libraryAt = this.catalogue(null);
    const libraryItems = this.libraryQuery ? (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.searchItems)(libraryAt.items, this.libraryQuery, {
      word: key => this.word(key),
      words: key => this.wordsOf(key)
    }) : libraryAt.items;
    const sections = (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.sectionsOf)(libraryAt.items);
    const section = sections.some(entry => entry.id === this.librarySection) ? this.librarySection : "";
    const entry = typeManifest ? (0,_core_js_composition_catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__.catalogueEntry)(typeManifest) : null;
    const manifestGroup = entry?.group;
    const at = selected ? (0,_js_tree_mjs__WEBPACK_IMPORTED_MODULE_9__.locate)(model.doc.root, selected.id) : null;
    return {
      model,
      selected,
      lock,
      typeManifest,
      data,
      hasData: data.bindings.length > 0 || data.runtime.length > 0,
      path: selected ? model.pathOf(selected.id) : [],
      form: selected && !lock ? this.formOf(selected.id) : [],
      modifiers: selected ? model.modifiersOf(selected.id).join(" ") : "",
      library: {
        sections,
        section,
        found: this.libraryQuery ? (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.sectionsOf)(libraryItems, {
          own: true
        }) : [],
        favourites: (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.pick)(libraryAt.items, this.favourites),
        recent: (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.pick)(libraryAt.items, this.recent)
      },
      typeIcon: selected ? entry?.icon ?? (manifestGroup ? (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.groupIcon)(manifestGroup) : "widgets") : "",
      sectionLabel: manifestGroup ? this.word((0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.groupWordKey)(manifestGroup)) : "",
      position: at?.parent ? {
        first: at.index === 0,
        last: at.index >= at.parent.slots[at.slot].length - 1
      } : null,
      pop: this.pop ? { ...this.pop,
        items: this.popItems(),
        sections: this.popSections()
      } : null,
      screens: SCREEN_ORDER.map(name => ({
        value: name,
        label: this.sfWord(`screen-${name}`),
        icon: SCREEN_ICONS[name],
        "icon-only": true
      })),
      states: STATES.map(value => ({
        value,
        label: this.sfWord(`state-${value}`)
      })),
      origins: _js_model_mjs__WEBPACK_IMPORTED_MODULE_7__.ORIGINS,
      hasTemplate: this.main.hasRegions(),
      heading: this.getAttribute("heading") || "",
      caption: this.getAttribute("caption") || "",
      page: this.pageSettings && typeof this.pageSettings === "object" && !Array.isArray(this.pageSettings) ? this.pageSettings : null,
      landmarks: Boolean(this.pageLandmarks),
      tree: this.treeOf(model.doc.root, 0)
    };
  }

  treeOf(node, depth) {
    const rows = [];

    const visit = (current, level) => {
      const choosable = this.model.choosable(current);
      if (choosable) rows.push({
        id: current.id,
        type: current.type,
        label: this.typeLabel(current.type),
        depth: level,
        lock: this.model.lockOf(current.id),
        excerpt: excerptOf(current)
      });

      for (const list of Object.values(current.slots ?? {})) for (const child of list) visit(child, choosable ? level + 1 : level);
    };

    visit(node, depth);
    return rows;
  }

  skeleton(item) {
    return (0,_js_catalogue_mjs__WEBPACK_IMPORTED_MODULE_8__.skeletonOf)(this.model, item);
  }

} // ------------------------------------------------------------ helpers


function format(text, vars) {
  return vars ? String(text).replace(/\{(\w+)\}/gu, (_, key) => String(vars[key] ?? "")) : String(text);
}

function humanize(key) {
  const last = String(key).replace(/^type-[a-z]+-/u, "").split(/[.]/u).pop().replace(/[_-]+/gu, " ");
  return last.charAt(0).toUpperCase() + last.slice(1);
}

function mergeWords(into = {}, add = {}) {
  const out = { ...into
  };

  for (const [locale, words] of Object.entries(add ?? {})) out[locale] = { ...(out[locale] ?? {}),
    ...words
  };

  return out;
}

function cssEscape(value) {
  return globalThis.CSS?.escape ? globalThis.CSS.escape(value) : String(value).replace(/["\\]/gu, "\\$&");
}

function excerptOf(node) {
  const content = node.data?.content ?? node.data?.title ?? node.data?.summary;
  if (!Array.isArray(content)) return "";
  return content.map(entry => entry.value ?? (entry.children ?? []).map(child => child.value).join("")).join("").slice(0, 40);
}
/** Where a press lands in a text element, as an offset of the inline model. */


function caretAt(doc, element, x, y) {
  const point = doc.caretPositionFromPoint?.(x, y);
  const range = point ? {
    node: point.offsetNode,
    offset: point.offset
  } : (() => {
    const legacy = doc.caretRangeFromPoint?.(x, y);
    return legacy ? {
      node: legacy.startContainer,
      offset: legacy.startOffset
    } : null;
  })();
  return range && element.contains(range.node) ? (0,_core_js_composition_inline_editor_mjs__WEBPACK_IMPORTED_MODULE_5__.textOffset)(element, range.node, range.offset) : "end";
}

function setCaret(element, at) {
  const doc = element.ownerDocument;
  const selection = doc.getSelection();
  if (!selection) return;
  const range = doc.createRange();

  if (at === "end" || at === Infinity) {
    range.selectNodeContents(element);
    range.collapse(false);
  } else {
    let left = Number(at) || 0;
    const walker = doc.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let placed = false;

    while (walker.nextNode()) {
      const length = walker.currentNode.textContent.length;

      if (left <= length) {
        range.setStart(walker.currentNode, left);
        placed = true;
        break;
      }

      left -= length;
    }

    if (!placed) {
      range.selectNodeContents(element);
      range.collapse(false);
    }

    range.collapse(true);
  }

  selection.removeAllRanges();
  selection.addRange(range);
}

const VOID = new Set(["img", "br", "hr", "input", "source", "meta", "link"]);
/** The HTML output, one element per line, for reading. */

function prettyHtml(markup) {
  const out = [];
  let depth = 0;

  for (const token of String(markup).split(/(<[^>]+>)/u).filter(part => part.trim())) {
    if (token.startsWith("</")) {
      depth = Math.max(0, depth - 1);
      out.push(`${"  ".repeat(depth)}${token}`);
    } else if (token.startsWith("<")) {
      out.push(`${"  ".repeat(depth)}${token}`);
      const tag = /^<([a-z0-9-]+)/iu.exec(token)?.[1]?.toLowerCase();
      if (tag && !VOID.has(tag) && !token.endsWith("/>")) depth += 1;
    } else out.push(`${"  ".repeat(depth)}${token.trim()}`);
  }

  return out.join("\n");
}

SfEditor.define("sf-editor");
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "d62589d9772e"
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderEditorTemplate: () => (/* binding */ renderEditorTemplate)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2a080a730149");
/* harmony import */ var lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("efa66f8927d1");
/* harmony import */ var _default_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("87cfda6b7364");
/* harmony import */ var _catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8d9331f1f24f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lit__WEBPACK_IMPORTED_MODULE_0__, lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__, _catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__]);
([lit__WEBPACK_IMPORTED_MODULE_0__, lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__, _catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__);



 // The editor's frame: the bar (screens, undo, the template, output), the
// library and the structure on the left, the page in the middle with what
// only editing draws over it (the hover and chosen frames, the gutter with
// + and the grip, the drop line), the parameter and data panel on the right,
// and the path of the chosen block under the page.
//
// 1.1.0 (visual parity with the accepted prototype, 2026-11-04): one bar row
// (undo and redo, the screens in the centre, help, output and the theme as
// icon buttons, the host's own controls in the slots start and actions);
// the library as sections with icons and counts that open in place; the
// page as a sheet on a quiet background; a frame and a floating bar over
// the chosen block; the parameter panel with the block's icon, name and
// section, tabs Parameters / JSON / HTML, fields under Content, Layout and
// More, each with where its value comes from and its Framework binding. The page itself is drawn
// by the Framework's renderers into .sf-editor-page (index.js redraw), so
// Lit leaves that element's children alone; so it does the status line's,
// which index.js say() writes.
//
// Landmarks: the bar is in a region of its own, the panels are asides and the
// path a nav. The canvas is a named region when the page brings no landmarks;
// a page with its own (banner, main, contentinfo) keeps them top level, and
// the canvas is then an unnamed group that says its role. Every control is a Framework
// part: sf-button, sf-button-icon, sf-segmented, sf-tabs, sf-input,
// sf-dropdown, sf-switch, sf-menu-context, sf-modal, sf-skeleton, sf-icon.

/** The word for each reason a class of «Extra classes» is not taken. */

const REFUSED = {
  modifier_unknown: "modifiers-unknown",
  modifier_invalid: "modifiers-invalid",
  modifier_rules_unavailable: "modifiers-unchecked",
  modifier_limit: "modifiers-limit"
};
function renderEditorTemplate(component) {
  const view = component.view();

  const w = (key, vars) => component.sfWord(key, vars ? {
    vars
  } : undefined);

  const stop = event => {
    if (event.target !== event.currentTarget) event.stopPropagation();
  };

  const classes = ["sf-editor", component.getRootClass?.() ?? "", component.builder ? "sf-editor--builder" : "", view.model.templateEditing ? "sf-editor--template" : ""].filter(Boolean).join(" ");
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class=${classes} @input=${stop} @change=${stop}>
            <div class="sf-editor-top" role="region" aria-label=${component.label || w("label")}>
                ${bar(component, view, w)}
                ${component.builder ? builderBar(component, w) : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                <p id="sf-editor-help" class="sf-editor-visually-hidden">${w("help-text")}</p>
                <div class="sf-editor-live sf-editor-visually-hidden" role="status" aria-live="polite"></div>
            </div>
            <div class="sf-editor-body">
                ${left(component, view, w)}
                <div class="sf-editor-stage">
                    <div class="sf-editor-canvas" tabindex="0" role=${view.landmarks ? "group" : "region"} aria-roledescription=${w("canvas-role")}
                         aria-label=${view.landmarks ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : component.label || w("label")} aria-describedby="sf-editor-help">
                        <div class="sf-editor-frame" data-screen=${component.screenName}>
                            <div class="sf-editor-page"></div>
                        </div>
                        <div class="sf-editor-hover" hidden aria-hidden="true"></div>
                        <div class="sf-editor-chosen" hidden aria-hidden="true"></div>
                        <div class="sf-editor-drop" hidden aria-hidden="true"></div>
                        <div class="sf-editor-gutter" role="region" aria-label=${w("gutter-label")} hidden>
                            <sf-button-icon class="sf-editor-plus" size="1/3" appearance="ghost" scheme="on-surface-variant" icon="add"
                                            aria-label=${w("plus-label")} title=${w("plus-label")}
                                            @click=${event => component.onPlus(event)}></sf-button-icon>
                            <sf-button-icon class="sf-editor-grip" size="1/3" appearance="ghost" scheme="on-surface-variant" icon="drag_indicator"
                                            aria-label=${w("grip-label")} title=${w("grip-label")} aria-haspopup="menu"
                                            @pointerdown=${event => component.onGripDown(event)}
                                            @keydown=${event => component.onGripKey(event)}></sf-button-icon>
                        </div>
                        <div class="sf-editor-gutter-hint" aria-hidden="true" hidden>${w("gutter-hint")}</div>
                        ${toolbar(component, view, w)}
                    </div>
                    ${pathBar(component, view, w)}
                </div>
                ${right(component, view, w)}
            </div>
            ${view.pop ? popover(component, view, w) : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            ${component.helpOpen ? helpPop(component, w) : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            ${component.lockNote ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-lock-note" role="status"
                    style=${`inset-block-start:${component.lockNote.y + 12}px;inset-inline-start:${component.lockNote.x}px`}>
                <sf-icon icon="lock" size="1/3"></sf-icon><span>${component.lockNote.text}</span></div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            <sf-menu-context class="sf-editor-menu" size="1/2" @sf-menu-context-select=${event => component.onMenuSelect(event)}></sf-menu-context>
            <sf-editor-inline></sf-editor-inline>
            ${component.outputView ? outputModal(component, w) : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        </div>
    `;
}
/** A host's own controls in a slot of the bar (the page list toggle, the language switch): one row, not two. */

function slotted(component, name) {
  return component.hasSlotContent?.(name) ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-slot" data-slot=${name}>${component.getSlotContent(name)}</div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing;
}

function bar(component, view, w) {
  const model = view.model;
  const template = view.hasTemplate && component.main.rights.template && !component.builder;
  const theme = component.main.theme;
  const themeName = theme?.label ?? theme?.name ?? "";
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-editor-bar" role="toolbar" aria-label=${w("bar-label")}>
            <div class="sf-editor-bar-start">
                ${slotted(component, "start")}
                ${view.heading ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-title"><strong class="sf-editor-title-name">${view.heading}</strong>${view.caption ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-title-caption">${view.caption}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                <sf-button-icon size="1/2" appearance="ghost" scheme="on-surface-variant" icon="undo" aria-label=${w("undo-label")} title=${`${w("undo-label")} (⌘Z)`}
                                ?disabled=${!model.canUndo} @click=${() => component.history("undo")}></sf-button-icon>
                <sf-button-icon size="1/2" appearance="ghost" scheme="on-surface-variant" icon="redo" aria-label=${w("redo-label")} title=${`${w("redo-label")} (⇧⌘Z)`}
                                ?disabled=${!model.canRedo} @click=${() => component.history("redo")}></sf-button-icon>
                ${template ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button class="sf-editor-template-toggle" size="1/3" appearance=${model.templateEditing ? "tonal" : "ghost"} scheme=${model.templateEditing ? "primary" : "on-surface-variant"}
                        icon-start=${model.templateEditing ? "check" : ""} text=${w(model.templateEditing ? "template-done" : "template-edit")}
                        @click=${() => component.toggleTemplate(!model.templateEditing)}></sf-button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                ${model.templateEditing ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-badge">${w("template-badge")}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            </div>
            <sf-segmented class="sf-editor-screens" size="1/2" appearance="track" plate="raised" aria-label=${w("screen-label")}
                             .items=${view.screens} .value=${component.screenName}
                             @change=${event => {
    event.stopPropagation();
    component.setScreen(event.detail?.value ?? event.currentTarget.value);
  }}></sf-segmented>
            <div class="sf-editor-bar-end">
                ${slotted(component, "actions")}
                <sf-button-icon class="sf-editor-help-open" size="1/2" appearance="ghost" scheme="on-surface-variant" icon="help"
                                aria-label=${w("help-label")} title=${w("help-label")} aria-haspopup="dialog" aria-expanded=${component.helpOpen ? "true" : "false"}
                                @click=${event => component.toggleHelp(event)}></sf-button-icon>
                <sf-button-icon class="sf-editor-output-open" size="1/2" appearance="ghost" scheme="on-surface-variant" icon="data_object"
                                aria-label=${w("output-open")} title=${w("output-open")} aria-haspopup="dialog"
                                @click=${() => component.openOutput("json")}></sf-button-icon>
                ${themeName ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button-icon class="sf-editor-theme-open" size="1/2" appearance="ghost" scheme="on-surface-variant" icon="palette"
                                aria-label=${w("theme-label", {
    name: themeName
  })} title=${`${w("theme-label", {
    name: themeName
  })}. ${w("theme-read-only")}`}
                                @click=${() => component.showTheme()}></sf-button-icon>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            </div>
        </div>
    `;
}

function helpPop(component, w) {
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-editor-help-pop" role="dialog" aria-label=${w("help-label")} style=${`inset-block-start:${component.helpOpen.y}px;inset-inline-end:${component.helpOpen.x}px`}>
            <h2 class="sf-editor-help-title">${w("help-title")}</h2>
            <ol class="sf-editor-help-list">
                ${["help-1", "help-2", "help-3", "help-4"].map(key => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<li>${w(key)}</li>`)}
            </ol>
        </div>
    `;
}

function builderBar(component, w) {
  const builder = component.builder;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-editor-builder-bar" role="region" aria-label=${w("builder-label")}>
            <sf-icon icon="dashboard_customize" size="1/3"></sf-icon>
            <strong>${w(builder.editing ? "builder-editing" : "builder-new")}</strong>
            <sf-input size="1/2" label=${w("builder-name")} .value=${builder.name ?? ""} ?readonly=${builder.editing}
                      @input=${event => {
    event.stopPropagation();
    builder.name = String(event.currentTarget.value ?? "");
    component.refresh();
  }}></sf-input>
            <sf-dropdown size="1/2" label=${w("builder-group")} .options=${component.builderGroups().map(id => ({
    value: id,
    text: component.word((0,_catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__.groupWordKey)(id))
  }))}
                         .value=${builder.catalogue?.group ?? "marketing"}
                         @change=${event => {
    event.stopPropagation();
    const value = event.detail?.value ?? event.currentTarget.value;
    builder.catalogue = { ...(builder.catalogue ?? {}),
      group: String(Array.isArray(value) ? value[0] : value)
    };
  }}></sf-dropdown>
            <span class="sf-editor-builder-note">${w("builder-note", {
    count: String(builder.exposed.length)
  })}</span>
            ${builder.diagnostics?.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-error" role="alert">${w("builder-invalid")}: ${builder.diagnostics.map(entry => entry.message ?? entry.code).join("; ")}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            <span class="sf-editor-spacer"></span>
            <sf-button size="1/2" appearance="ghost" scheme="on-surface" text=${w("cancel")} @click=${() => component.closeBuilder()}></sf-button>
            <sf-button size="1/2" scheme="primary" icon-start="save" text=${w(builder.editing ? "builder-save-everywhere" : "builder-save")}
                       ?disabled=${!builder.editing && !String(builder.name ?? "").trim()} @click=${() => component.saveBuilder()}></sf-button>
        </div>
    `;
} // ------------------------------------------------------------ the left panel


function left(component, view, w) {
  const tabs = [{
    id: "blocks",
    label: w("left-blocks")
  }, {
    id: "structure",
    label: w("left-structure")
  }];
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <aside class="sf-editor-left" aria-label=${w("left-label")}>
            <h2 class="sf-editor-visually-hidden">${w("left-label")}</h2>
            <sf-tabs type="underline" size="1/2" .items=${tabs} active-index=${component.leftTab === "structure" ? 1 : 0}
                     @sf-tabs-change=${event => {
    event.stopPropagation();
    component.leftTab = event.detail?.selected === "structure" ? "structure" : "blocks";
    component.refresh();
  }}></sf-tabs>
            <div class="sf-editor-left-body">
                ${component.leftTab === "structure" ? structure(component, view, w) : library(component, view, w)}
            </div>
        </aside>
    `;
}

const heading = (icon, text, id = undefined) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<h3 class="sf-editor-heading" id=${id ?? lit__WEBPACK_IMPORTED_MODULE_0__.nothing}><sf-icon icon=${icon} size="1/3" aria-hidden="true"></sf-icon><span>${text}</span></h3>`;
/**
 * The library: a search; Favourites and Recent; the sections, each with its
 * icon, word and count, opening in place with «Back»; a type with variants
 * shows them as cards with a picture drawn from each variant's tree. A
 * search lists what it found under the section each belongs to.
 */


function library(component, view, w) {
  const lib = view.library;
  const searching = Boolean(component.libraryQuery);
  const open = !searching && lib.section ? lib.sections.find(section => section.id === lib.section) : null;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <sf-input class="sf-editor-search" size="1/2" appearance="filled" input-type="search" icon-start="search" placeholder=${w("search-placeholder")}
                  aria-label=${w("search-placeholder")} .value=${component.libraryQuery}
                  @input=${event => {
    event.stopPropagation();
    component.libraryQuery = String(event.currentTarget.value ?? "");
    component.refresh();
  }}></sf-input>
        ${searching ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <div class="sf-editor-found" role="region" aria-label=${w("search-results")}>
                ${lib.found.length ? lib.found.map(section => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                    <section class="sf-editor-group" aria-labelledby=${`sf-editor-h-found-${section.id}`}>
                        ${heading(section.icon, component.word(section.labelKey), `sf-editor-h-found-${section.id}`)}
                        ${rows(component, section.types.flatMap(type => type.items), w, {
    note: item => item.variant ? item.typeLabel : ""
  })}
                    </section>`) : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-quiet">${w("nothing-found")}</p>`}
            </div>` : open ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <section class="sf-editor-group sf-editor-open-section" aria-labelledby="sf-editor-h-open">
                <div class="sf-editor-back">
                    <sf-button size="1/2" appearance="ghost" scheme="on-surface" icon-start="arrow_back" text-position="start" text=${component.word(open.labelKey)}
                               aria-label=${`${w("back")}: ${component.word(open.labelKey)}`}
                               @click=${() => component.openSection("")}></sf-button>
                </div>
                <h3 id="sf-editor-h-open" class="sf-editor-visually-hidden">${component.word(open.labelKey)}</h3>
                ${open.types.map(type => typeEntry(component, type, w, type.items[0]?.group !== open.id ? w("from-section", {
    name: component.word((0,_catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__.groupWordKey)(type.items[0].group))
  }) : ""))}
            </section>` : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <section class="sf-editor-group" aria-labelledby="sf-editor-h-favourites">${heading("star", w("favourites"), "sf-editor-h-favourites")}${lib.favourites.length ? rows(component, lib.favourites, w) : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-hint sf-editor-empty-list">${w("favourites-empty")}</p>`}</section>
            ${lib.recent.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<section class="sf-editor-group" aria-labelledby="sf-editor-h-recent">${heading("history", w("recent"), "sf-editor-h-recent")}${rows(component, lib.recent, w)}</section>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            ${component.main.rights.builder && !component.builder ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                <sf-button class="sf-editor-make" size="1/3" appearance="ghost" scheme="on-surface-variant" icon-start="add"
                           text=${w("builder-start")} @click=${() => component.openBuilder({
    from: null
  })}></sf-button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            <section class="sf-editor-group" aria-labelledby="sf-editor-h-sections">
                ${heading("category", w("sections"), "sf-editor-h-sections")}
                ${lib.sections.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<ul class="sf-editor-sections" role="list">${lib.sections.map(section => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                    <li class="sf-editor-section-row" data-section=${section.id} @click=${event => {
    if (event.target.closest?.("sf-button")) return;
    component.openSection(section.id);
  }}>
                        <sf-icon icon=${section.icon} size="1/2" aria-hidden="true"></sf-icon>
                        <sf-button class="sf-editor-section-name" size="1/2" appearance="ghost" scheme="on-surface" text-position="start" text=${component.word(section.labelKey)}
                                   aria-label=${w("section-open", {
    name: component.word(section.labelKey),
    count: String(section.count)
  })}
                                   @click=${() => component.openSection(section.id)}></sf-button>
                        <span class="sf-editor-count" aria-hidden="true">${section.count}</span>
                        <sf-icon class="sf-editor-chevron" icon="chevron_right" size="1/2" aria-hidden="true"></sf-icon>
                    </li>`)}</ul>` : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-quiet">${w("nothing-fits")}</p>`}
            </section>
        `}
        <p class="sf-editor-hint sf-editor-library-hint">${w("item-drag-hint")}</p>
    `;
}
/** A type in an open section: its row, and under it its variants as cards (open unless the person closed them). */


function typeEntry(component, type, w, from = "") {
  const variants = type.items.filter(item => item.variant);
  if (!variants.length) return rows(component, type.items, w, from ? {
    note: () => from
  } : undefined);
  const closed = component.libraryClosed.has(type.type);
  const first = variants[0];
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        ${rows(component, [{ ...first,
    label: type.label,
    variant: first.variant
  }], w, {
    note: () => [w("variants-count", {
      count: String(variants.length)
    }), from].filter(Boolean).join(" · "),
    toggle: {
      open: !closed,
      onToggle: () => component.toggleVariants(type.type)
    },
    favourite: false
  })}
        ${closed ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<ul class="sf-editor-variants" role="list" aria-label=${type.label}>${(0,lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__.repeat)(variants, item => item.variant, item => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <li class="sf-editor-item sf-editor-variant" data-item=${`${item.type}#${item.variant}`} title=${w("item-drag-hint")}
                @pointerdown=${event => component.onLibraryDown(event, item)}>
                <div class="sf-editor-preview" aria-hidden="true">${skeleton(component.skeleton(item))}</div>
                <sf-button class="sf-editor-item-name" size="1/3" appearance="ghost" scheme="on-surface" text-position="start" text=${item.label}
                           @click=${event => {
    if (event.detail === 0) component.insertChoice({
      type: item.type,
      variant: item.variant
    }, null, item);
  }}></sf-button>
            </li>`)}</ul>`}
    `;
}
/** Library rows: the type's icon, its name (a press inserts it), a note, the star. */


function rows(component, list, w, {
  note = item => item.variant ? item.typeLabel : "",
  toggle = null,
  favourite = true
} = {}) {
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<ul class="sf-editor-items" role="list">${(0,lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__.repeat)(list, item => `${item.type}#${item.variant ?? ""}`, item => {
    const key = `${item.type}${item.variant ? `#${item.variant}` : ""}`;
    const starred = component.favourites.includes(key);
    const said = [note(item), item.site ? w("site-block") : ""].filter(Boolean).join(" · ");
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <li class="sf-editor-item" data-item=${key} title=${w("item-drag-hint")}
                @pointerdown=${event => {
      if (event.target.closest?.("sf-button-icon")) return;
      component.onLibraryDown(event, item);
    }}>
                <sf-icon class="sf-editor-item-icon" icon=${item.icon ?? "widgets"} size="1/2" aria-hidden="true"></sf-icon>
                <span class="sf-editor-item-text">
                    <sf-button class="sf-editor-item-name" size="1/2" appearance="ghost" scheme="on-surface" text-position="start" text=${item.label}
                               @click=${event => {
      if (event.detail === 0) component.insertChoice({
        type: item.type,
        ...(item.variant ? {
          variant: item.variant
        } : {})
      }, null, item);
    }}></sf-button>
                    ${said ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-item-note">${said}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                </span>
                ${favourite ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button-icon class="sf-editor-star" size="1/3" appearance="ghost" scheme="on-surface-variant" icon="star"
                                ?filled=${starred} data-on=${starred ? "true" : "false"} aria-pressed=${starred ? "true" : "false"}
                                aria-label=${w(starred ? "unfavourite" : "favourite", {
      name: item.label
    })}
                                @click=${() => component.favourite(item)}></sf-button-icon>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                ${toggle ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button-icon class="sf-editor-variants-toggle" size="1/3" appearance="ghost" scheme="on-surface-variant" icon=${toggle.open ? "expand_less" : "expand_more"}
                                aria-expanded=${toggle.open ? "true" : "false"} aria-label=${w("variants-label", {
      name: item.label
    })}
                                @click=${() => toggle.onToggle()}></sf-button-icon>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            </li>`;
  })}</ul>`;
}
/**
 * A variant's picture from its own tree (skeletonOf): Framework skeleton
 * bars and boxes; a section draws its background and width, a grid its
 * columns, a button an accent pill (outlined when it is), an icon a dot, a
 * spacer a gap.
 */


function skeleton(shapes) {
  const draw = shape => {
    switch (shape.kind) {
      case "heading":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-skeleton kind="text" size="1/2" width=${shape.level <= 1 ? "75%" : shape.level === 2 ? "60%" : "45%"} height=${shape.level <= 2 ? "8px" : "6px"} animation="none"></sf-skeleton>`;

      case "text":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-skeleton kind="text" size="1/3" width="90%" height="4px" animation="none"></sf-skeleton>`;

      case "list":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-shape-stack">${(shape.children.length ? shape.children : [{
          kind: "text"
        }, {
          kind: "text"
        }]).slice(0, 3).map(draw)}</div>`;

      case "picture":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-skeleton kind="rounded" width="100%" height="20px" animation="none" class="sf-editor-shape-accent"></sf-skeleton>`;

      case "line":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-shape-line"></span>`;

      case "button":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-shape-button" data-look=${shape.look ?? "fill"}><span class="sf-editor-shape-pill"></span>${shape.icon ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-shape-dot"></span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}</span>`;

      case "dot":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-shape-dot sf-editor-shape-dot--large"></span>`;

      case "badge":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-shape-pill sf-editor-shape-pill--short"></span>`;

      case "gap":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-shape-gap"></span>`;

      case "field":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-shape-field" ?data-tall=${shape.tall}></span>`;

      case "cell":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-shape-cell"></span>`;

      case "card":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-shape-card"><sf-skeleton kind="rounded" width="100%" height="12px" animation="none" class="sf-editor-shape-accent"></sf-skeleton><sf-skeleton kind="text" width="80%" height="4px" animation="none"></sf-skeleton></div>`;

      case "row":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-shape-row" style=${`--sf-editor-shape-columns:${Math.max(1, shape.columns)}`}>${shape.children.slice(0, 4).map(draw)}</div>`;

      case "stack":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-shape-stack">${shape.children.slice(0, 5).map(draw)}</div>`;

      case "section":
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-shape-section" data-background=${shape.background} data-width=${shape.width}><div class="sf-editor-shape-box">${shape.children.slice(0, 4).map(draw)}</div></div>`;

      default:
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-skeleton kind="rounded" width="100%" height="14px" animation="none"></sf-skeleton>`;
    }
  };

  return shapes.map(draw);
}

function structure(component, view, w) {
  if (!view.tree.length) return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-quiet">${w("structure-empty")}</p>`;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<ul class="sf-editor-tree" role="tree" aria-label=${w("left-structure")}>${(0,lit_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__.repeat)(view.tree, row => row.id, row => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li role="treeitem" aria-level=${row.depth + 1} aria-selected=${row.id === view.model.selected ? "true" : "false"}
            class="sf-editor-tree-row" style=${`--sf-editor-depth:${row.depth}`}>
            <sf-button size="1/2" appearance=${row.id === view.model.selected ? "tonal" : "ghost"} scheme="on-surface"
                       icon-start=${row.icon} icon-end=${row.lock ? "lock" : ""} text=${row.excerpt ? `${row.label} · ${row.excerpt}` : row.label}
                       @click=${() => component.choose(row.id)}></sf-button>
        </li>`)}</ul>`;
} // ------------------------------------------------------------ the floating bar over the chosen block

/** The chosen block's bar: where it stands (the last three steps of its path), the grip, up, down, duplicate, more. */


function toolbar(component, view, w) {
  const node = view.selected;
  const show = node && !view.lock && !view.model.typing && !component.drag;
  const crumbs = node ? view.path.filter(entry => view.model.choosable(entry)).slice(-3) : [];
  const at = node ? view.position : null;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-editor-toolbar" role="region" aria-label=${w("toolbar-label")} ?hidden=${!show}>
            ${show ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-toolbar-row" role="toolbar" aria-label=${w("toolbar-label")}>
                <span class="sf-editor-crumbs">${crumbs.map((entry, index) => index === crumbs.length - 1 ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<strong class="sf-editor-crumb-here">${component.typeLabel(entry.type)}</strong>` : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button size="1/3" appearance="ghost" scheme="on-surface-variant" text=${component.typeLabel(entry.type)} @click=${() => component.choose(entry.id)}></sf-button>
                        <sf-icon class="sf-editor-path-sep" icon="chevron_right" size="1/3" aria-hidden="true"></sf-icon>`)}</span>
                <sf-button-icon class="sf-editor-toolbar-grip" size="1/3" appearance="ghost" scheme="on-surface-variant" icon="drag_indicator"
                                aria-label=${w("grip-label")} title=${w("grip-label")} aria-haspopup="menu"
                                @pointerdown=${event => component.onToolbarGrip(event)}
                                @keydown=${event => component.onGripKey(event, node.id)}></sf-button-icon>
                <sf-button-icon size="1/3" appearance="ghost" scheme="on-surface-variant" icon="arrow_upward" aria-label=${w("menu-up")} title=${`${w("menu-up")} (Alt+↑)`}
                                ?disabled=${!at || at.first} @click=${() => component.moveBy(node.id, -1)}></sf-button-icon>
                <sf-button-icon size="1/3" appearance="ghost" scheme="on-surface-variant" icon="arrow_downward" aria-label=${w("menu-down")} title=${`${w("menu-down")} (Alt+↓)`}
                                ?disabled=${!at || at.last} @click=${() => component.moveBy(node.id, 1)}></sf-button-icon>
                <sf-button-icon size="1/3" appearance="ghost" scheme="on-surface-variant" icon="content_copy" aria-label=${w("menu-duplicate")} title=${`${w("menu-duplicate")} (⌘D)`}
                                @click=${() => component.run(component.model.duplicate(node.id), "duplicated-text")}></sf-button-icon>
                <sf-button-icon class="sf-editor-toolbar-more" size="1/3" appearance="ghost" scheme="on-surface-variant" icon="more_horiz" aria-label=${w("menu-more")} title=${w("menu-more")} aria-haspopup="menu"
                                @click=${event => component.openGripMenu(node.id, event.currentTarget)}></sf-button-icon></div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        </div>
    `;
} // ------------------------------------------------------------ the path


function pathBar(component, view, w) {
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <nav class="sf-editor-path" aria-label=${w("path-label")}>
            <sf-button size="1/3" appearance="ghost" scheme="on-surface-variant" text=${w("path-page")} @click=${() => component.choose(null)}></sf-button>
            ${view.path.filter(node => view.model.choosable(node)).map(node => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                <sf-icon icon="chevron_right" size="1/3" class="sf-editor-path-sep" aria-hidden="true"></sf-icon>
                <sf-button size="1/3" appearance="ghost" scheme="on-surface-variant" class=${node.id === view.model.selected ? "sf-editor-path-here" : ""}
                           text=${component.typeLabel(node.type)} aria-current=${node.id === view.model.selected ? "true" : "false"}
                           @click=${() => component.choose(node.id)}></sf-button>`)}
            <span class="sf-editor-spacer"></span>
            <span class="sf-editor-keys">${w(view.model.typing ? "keys-typing" : view.selected ? "keys-chosen" : "keys-page")}</span>
        </nav>
    `;
} // ------------------------------------------------------------ the right panel

/** The panel's head: the block's (or the page's) icon, its name and the section it belongs to. */


function panelHead(icon, title, sub) {
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-editor-panel-head">
            <span class="sf-editor-panel-icon" aria-hidden="true"><sf-icon icon=${icon} size="1/2"></sf-icon></span>
            <div class="sf-editor-panel-names">
                <h2 class="sf-editor-panel-title">${title}</h2>
                ${sub ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-panel-sub">${sub}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            </div>
        </div>
    `;
}

function right(component, view, w) {
  if (!view.selected && !component.builder && (view.page || component.hasSlotContent?.("page"))) return pagePanel(component, view, w);

  if (!view.selected) {
    const theme = component.main.theme;
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <aside class="sf-editor-right" aria-label=${w("right-label")}>
                ${panelHead(component.builder ? "dashboard_customize" : "article", w(component.builder ? "builder-label" : "page-title"), "")}
                <p class="sf-editor-empty-state"><sf-icon icon="arrow_selector_tool" size="1/3" aria-hidden="true"></sf-icon><span>${w("nothing-chosen")}</span></p>
                <dl class="sf-editor-facts">
                    ${theme ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                        <div><dt>${w("theme-title")}</dt><dd><span>${theme.label ?? theme.name ?? ""}</span><span class="sf-editor-hint">${w("theme-read-only")}</span>
                            ${theme.settings_url ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<a class="sf-editor-link" href=${theme.settings_url} target="_top">${w("theme-settings")}</a>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}</dd></div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                    ${view.hasTemplate && !component.builder ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                        <div><dt>${w("template-title")}</dt><dd class="sf-editor-hint">${w(component.main.rights.template ? "template-help" : "template-no-rights")}</dd></div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                </dl>
            </aside>`;
  }

  const tabs = [{
    id: "parameters",
    label: w("tab-parameters")
  }, ...(view.hasData ? [{
    id: "data",
    label: w("tab-data")
  }] : []), {
    id: "json",
    label: w("tab-json")
  }, {
    id: "html",
    label: w("tab-html")
  }];
  const tab = tabs.some(entry => entry.id === component.rightTab) ? component.rightTab : "parameters";
  const sub = [view.sectionLabel, view.typeManifest?.composed ? w("site-block") : "", view.lock ? w("locked") : ""].filter(Boolean).join(" · ");
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <aside class="sf-editor-right" aria-label=${w("right-label")}>
            ${panelHead(view.typeIcon, component.typeLabel(view.selected.type), sub)}
            <sf-tabs class="sf-editor-right-tabs" type="underline" size="1/2" .items=${tabs} active-index=${Math.max(0, tabs.findIndex(entry => entry.id === tab))}
                     @sf-tabs-change=${event => {
    event.stopPropagation();
    component.setRightTab(String(event.detail?.selected ?? "parameters"));
  }}></sf-tabs>
            ${tab === "json" ? codeView(component, view, "json", w) : tab === "html" ? codeView(component, view, "html", w) : view.lock ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                <p class="sf-editor-locked-note" role="note"><sf-icon icon="lock" size="1/3"></sf-icon>${component.lockText(view.lock)}</p>
                ${view.lock === "template" && component.main.rights.template ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button size="1/2" appearance="outline" scheme="on-surface" text=${w("template-edit")}
                        @click=${() => component.toggleTemplate(true)}></sf-button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}` : tab === "data" ? dataPanel(component, view, w) : parameters(component, view, w)}
        </aside>
    `;
}
/**
 * Nothing chosen, and the host gave the page's settings (page-settings) or
 * markup in the slot page (1.2.0, the prototype's page panel): name and
 * address, the site template, the theme with the way to its settings,
 * publishing and history. The editor keeps none of it; every change and press
 * goes out as page-change or page-action and the host sets page-settings again.
 */


function pagePanel(component, view, w) {
  const page = view.page ?? {};
  const theme = page.theme ?? component.main.theme;
  const template = page.template;
  const options = Array.isArray(template?.options) ? template.options.map(option => ({
    value: String(option.value),
    text: String(option.text ?? option.label ?? option.value)
  })) : [];

  const change = key => event => {
    event.stopPropagation();
    const value = event.detail?.value ?? event.currentTarget.value ?? "";
    component.sfEmit("page-change", {
      key,
      value: String(Array.isArray(value) ? value[0] ?? "" : value)
    });
  };

  const action = name => () => component.sfEmit("page-action", {
    action: name
  });

  const history = page.history;
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <aside class="sf-editor-right" aria-label=${w("right-label")}>
            ${panelHead("article", page.name || w("page-title"), page.status ?? "")}
            <div class="sf-editor-page">
                ${"name" in page ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-input class="sf-editor-page-field" data-key="name" size="1/2" label=${w("page-name")} .value=${String(page.name ?? "")}
                        @change=${change("name")}></sf-input>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                ${"address" in page ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-input class="sf-editor-page-field" data-key="address" size="1/2" label=${w("page-address")} .value=${String(page.address ?? "")}
                        @change=${change("address")}></sf-input>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                ${template ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                    <div class="sf-editor-page-field" data-key="template">
                        ${options.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-dropdown size="1/2" label=${w("template-title")} .options=${options} .value=${String(template.value ?? "")}
                                @change=${change("template")}></sf-dropdown>` : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                            <span class="sf-editor-page-label">${w("template-title")}</span><span class="sf-editor-page-value">${template.label ?? template.value ?? ""}</span>`}
                        <span class="sf-editor-hint">${template.note ?? w(component.main.rights.template ? "template-help" : "template-no-rights")}</span>
                    </div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                ${theme ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                    <div class="sf-editor-page-field" data-key="theme">
                        <span class="sf-editor-page-label">${w("page-theme")}</span>
                        <div class="sf-editor-page-row">
                            <span class="sf-editor-page-value">${theme.label ?? theme.name ?? ""}</span>
                            ${theme.settings_url ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<a class="sf-editor-page-link" href=${theme.settings_url} target="_top">${w("theme-settings")}<sf-icon icon="open_in_new" size="1/3" aria-hidden="true"></sf-icon></a>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                        </div>
                        <span class="sf-editor-hint">${w("theme-read-only")}</span>
                    </div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                ${page.publish || history ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                    <div class="sf-editor-page-field" data-key="publish">
                        <span class="sf-editor-page-label">${w("page-publishing")}</span>
                        <div class="sf-editor-page-row">
                            ${page.publish ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button size="1/2" scheme="primary" text=${page.publish.label ?? w("page-publish")}
                                    ?disabled=${Boolean(page.publish.disabled)} @click=${action("publish")}></sf-button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                            ${history ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button size="1/2" appearance="outline" scheme="on-surface" icon-start="history"
                                    text=${history.label ?? (Number.isFinite(history.count) ? w("page-history", {
    count: String(history.count)
  }) : w("page-history-plain"))}
                                    @click=${action("history")}></sf-button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                        </div>
                        ${page.publish?.note ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-hint">${page.publish.note}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                    </div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                ${slotted(component, "page")}
                <p class="sf-editor-card"><sf-icon icon="arrow_selector_tool" size="1/3" aria-hidden="true"></sf-icon><span>${w("page-hint")}</span></p>
            </div>
        </aside>`;
}
/** The chosen block as the Document holds it (JSON) or as the site prints it (HTML). */


function codeView(component, view, format, w) {
  const text = component.codeOf(view.selected.id, format);
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <pre class="sf-editor-code" tabindex="0" aria-label=${w(`tab-${format}`)}>${text ?? "…"}</pre>
        <p class="sf-editor-hint">${w(`${format}-note`)}</p>
    `;
}

const SECTIONS = ["content", "layout", "extra"];

function parameters(component, view, w) {
  const bySection = Object.fromEntries(SECTIONS.map(id => [id, view.form.filter(field => field.section === id)])); // A site block's instance shows its author the exposed parameters only
  // (1.2.0, the ui-editor host's G-42): no own classes, nothing else.

  const instance = Boolean(view.typeManifest?.composed);
  const modifiers = component.main.rights.layout && !instance;
  if (!view.form.length && !modifiers) return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-hint">${w("no-parameters")}</p>`;
  const sets = [...new Set(view.form.map(field => /^sf\.composition\.set_([a-z_]+)\./u.exec(String(field.label_key ?? ""))?.[1]).filter(Boolean))];
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <p class="sf-editor-card sf-editor-sets"><sf-icon icon="link" size="1/3" aria-hidden="true"></sf-icon><span>${sets.length ? w("sets-note", {
    sets: sets.map(set => w(`set-${set.replace(/_/gu, "-")}`)).join(" · ")
  }) : w("sets-none")}</span></p>
        ${SECTIONS.map(id => bySection[id].length || id === "extra" && modifiers ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <section class="sf-editor-group sf-editor-fields" aria-labelledby=${`sf-editor-h-${id}`}>
                <h3 class="sf-editor-heading" id=${`sf-editor-h-${id}`}>${w(`section-${id}`)}</h3>
                ${bySection[id].map(field => fieldRow(component, field, w))}
                ${id === "extra" && modifiers ? modifiersRow(component, view, w) : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            </section>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing)}
        ${view.form.some(field => field.responsive) ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-card"><sf-icon icon="devices" size="1/3" aria-hidden="true"></sf-icon><span>${w("screens-note", {
    screen: w(`screen-${component.screenName}`)
  })}</span></p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        <p class="sf-editor-card sf-editor-origins" aria-label=${w("origins-label")}>${w("origins-note")}</p>
    `;
}

function modifiersRow(component, view, w) {
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-editor-modifiers-row">
            <div class="sf-editor-field-head"><span class="sf-editor-field-label">${w("modifiers-label")}</span></div>
            <sf-input class="sf-editor-modifiers" size="1/2" aria-label=${w("modifiers-label")} placeholder=${w("modifiers-placeholder")} .value=${view.modifiers}
                      @change=${event => component.onModifiers(event)}></sf-input>
            <span class="sf-editor-hint">${w("modifiers-hint")}</span>
            ${component.dropped?.id === view.selected.id ? component.dropped.groups.map(group => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-error" role="alert">${w(REFUSED[group.reason] ?? "modifiers-dropped", {
    classes: group.classes.join(" ")
  })}</p>`) : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        </div>
    `;
}
/** A short choice draws as a segmented switch, as the prototype does; a long one as a list. */


const segmented = field => field.choiceLabels.length >= 2 && field.choiceLabels.length <= 3 && field.choiceLabels.every(choice => String(choice.text).length <= 12);
/** A whole number of at most six steps (a heading's level) draws as a segmented switch too. */


const steps = field => field.kind === "integer" && Number.isInteger(field.min) && Number.isInteger(field.max) && field.max > field.min && field.max - field.min <= 5 ? Array.from({
  length: field.max - field.min + 1
}, (_, index) => ({
  value: String(field.min + index),
  label: field.target === "level" ? `H${field.min + index}` : String(field.min + index)
})) : null;

const ALIGN_ICONS = {
  start: "format_align_left",
  center: "format_align_center",
  end: "format_align_right"
};
/** The light segmented look of the prototype: a quiet track, the chosen segment a raised surface, not a primary fill. */

const segmentedSwitch = (field, items, value, component, extra = lit__WEBPACK_IMPORTED_MODULE_0__.nothing) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
    <div class="sf-editor-control sf-editor-switch-row">
        <sf-segmented class="sf-editor-segmented" size="1/2" appearance="track" plate="raised" full-width aria-label=${field.label}
                         .items=${items} .value=${String(value)}
                         @change=${event => component.onField(event, field)}></sf-segmented>
        ${extra}
    </div>`;

function fieldRow(component, field, w) {
  const id = `sf-editor-field-${field.key}`;
  const builder = component.builder;
  const exposed = builder?.exposed?.some(entry => entry.path === component.model.selected && entry.target === `${field.plane}.${field.target}`);
  const value = field.value === undefined || field.value === null ? "" : field.value;
  let control;

  if (field.kind === "toggle") {
    control = segmentedSwitch(field, [{
      value: "false",
      label: w("no")
    }, {
      value: "true",
      label: w("yes")
    }], (field.shown ? !field.value : field.value) ? "true" : "false", component);
  } else if (steps(field)) {
    // The first three steps as a switch, the rest behind «More» (a heading: H1–H3, then H4–H6).
    const all = steps(field);
    const shown = all.slice(0, 3);
    const rest = all.slice(3);
    const inRest = rest.some(item => item.value === String(value));
    control = segmentedSwitch(field, shown, inRest ? "" : value, component, rest.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <sf-dropdown class="sf-editor-more-steps" size="1/2" aria-label=${w("more-steps", {
      name: field.label
    })} placeholder=${w("more")}
                         .options=${rest.map(item => ({
      value: item.value,
      text: item.label
    }))} .value=${inRest ? String(value) : ""}
                         @change=${event => component.onField(event, field)}></sf-dropdown>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing);
  } else if (field.choiceLabels.length && segmented(field)) {
    // Alignment draws as the prototype's three icons; the words stay their names.
    const icon = field.target === "align" ? ALIGN_ICONS : null;
    control = segmentedSwitch(field, field.choiceLabels.map(choice => icon?.[choice.value] ? {
      value: choice.value,
      label: choice.text,
      icon: icon[choice.value],
      "icon-only": true
    } : {
      value: choice.value,
      label: choice.text
    }), value, component);
  } else if (field.choiceLabels.length) {
    control = (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-dropdown class="sf-editor-control" size="1/2" aria-label=${field.label} .options=${field.choiceLabels} .value=${String(value)}
                                    @change=${event => component.onField(event, field)}></sf-dropdown>`;
  } else {
    const numeric = field.kind === "number" || field.kind === "integer";
    control = (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-input class="sf-editor-control" size="1/2" aria-label=${field.label} inputmode=${numeric ? "numeric" : ""} .value=${String(value)}
                                 @change=${event => component.onField(event, field)}></sf-input>`;
  }

  const own = field.origin === "block" || field.origin === "screen";
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-editor-field" id=${id} data-key=${field.key} data-origin=${field.origin}>
            <div class="sf-editor-field-head">
                <span class="sf-editor-field-label">${field.label}</span>
                ${field.responsive ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-icon class="sf-editor-field-screen" icon=${SCREEN_ICON[component.screenName]} size="1/3" title=${w("per-screen")} aria-label=${w("per-screen")}></sf-icon>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                <span class="sf-editor-origin" data-origin=${field.origin} data-own=${own ? "true" : "false"} title=${w(`origin-${field.origin}-help`)}><span class="sf-editor-origin-dot" aria-hidden="true"></span>${field.originLabel}</span>
                ${field.set ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-button class="sf-editor-reset" size="1/3" appearance="ghost" scheme="on-surface-variant" text=${w("reset")}
                        aria-label=${w("reset-field", {
    name: field.label
  })} @click=${() => component.onReset(field)}></sf-button>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            </div>
            ${control}
            ${(field.min !== undefined || field.max !== undefined) && !steps(field) ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-hint">${w("range-hint", {
    min: String(field.min ?? ""),
    max: String(field.max ?? "")
  })}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            ${field.responsive && field.screens.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-hint">${w("set-for", {
    screens: field.screensLabel
  })}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            ${field.utility ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<code class="sf-editor-utility" title=${w("utility-help")}>${w("binding", {
    classes: field.utility
  })}</code>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            ${builder ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-switch size="1/2" class="sf-editor-expose" label=${w("expose")} .checked=${Boolean(exposed)}
                    @change=${event => {
    event.stopPropagation();
    component.toggleExposed(component.model.selected, field, Boolean(event.currentTarget.checked));
  }}></sf-switch>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        </div>
    `;
}

const SCREEN_ICON = {
  desktop: "desktop_windows",
  tablet: "tablet_mac",
  phone: "smartphone"
};

function dataPanel(component, view, w) {
  const id = view.selected.id;
  const state = component.dataState.get(id) ?? "auto";
  const port = component.sourcePort();
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        ${!port ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-quiet">${w("data-no-port")}</p>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
        ${view.data.bindings.map(entry => {
    const sources = component.answer(`sources:${entry.shape}`, p => p.sources(entry.shape)) ?? [];
    const ref = entry.binding?.ref ?? "";
    const source = sources.find(item => item.id === ref);
    const fields = ref ? component.answer(`fields:${ref}`, p => p.fields(ref)) ?? [] : [];
    const shapeFields = component.shapeFields(entry.shape);
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                <section class="sf-editor-group" aria-label=${entry.target}>
                    <h3>${w("data-binding", {
      target: component.word(entry.target)
    })}</h3>
                    <sf-dropdown size="1/2" label=${w("data-source")} placeholder=${w("data-none")} ?disabled=${!port}
                                 .options=${[{
      value: "",
      text: w("data-none")
    }, ...sources.map(item => ({
      value: item.id,
      text: item.label
    }))]} .value=${ref}
                                 @change=${event => component.onSource(event, entry)}></sf-dropdown>
                    ${source?.presets?.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-dropdown size="1/2" label=${w("data-preset")}
                                 .options=${[{
      value: "",
      text: w("data-own-mapping")
    }, ...source.presets.map(preset => ({
      value: preset.id,
      text: preset.label ?? preset.id
    }))]}
                                 .value=${entry.settings.preset ?? ""}
                                 @change=${event => component.onSetting(event, entry, "preset")}></sf-dropdown>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                    ${ref && !entry.settings.preset ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<div class="sf-editor-mapping">
                        <h4>${w("data-mapping")}</h4>
                        ${shapeFields.map(field => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-dropdown size="1/2" label=${field}
                                 .options=${[{
      value: "",
      text: w("data-none")
    }, ...fields.map(item => ({
      value: item.key,
      text: item.label
    }))]}
                                 .value=${entry.settings.mapping?.[field] ?? ""}
                                 @change=${event => component.onMapping(event, entry, field)}></sf-dropdown>`)}
                    </div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                    ${ref && component.listShape(entry.shape) ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<sf-input size="1/2" label=${w("data-limit")} inputmode="numeric" .value=${String(entry.settings.limit ?? "")}
                            @change=${event => component.onSetting(event, entry, "limit", value => value === "" ? undefined : Math.max(1, Math.min(500, Number.parseInt(value, 10) || 1)))}></sf-input>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                    <sf-input size="1/2" label=${w("data-empty-text")} placeholder=${entry.empty_key ? component.word(entry.empty_key) : ""} .value=${entry.settings.empty_text ?? ""}
                              @change=${event => component.onSetting(event, entry, "empty_text", value => String(value ?? "").slice(0, 500))}></sf-input>
                </section>`;
  })}
        ${view.data.runtime.map(entry => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <section class="sf-editor-group">
                <h3>${w("data-runtime", {
    target: component.word(entry.target)
  })}</h3>
                <sf-dropdown size="1/2" label=${w("data-follows")}
                             .options=${[{
    value: "",
    text: w("data-none")
  }, ...entry.publishers.map(item => ({
    value: `${item.id}#${item.state}`,
    text: `${component.typeLabel(item.type)} · ${item.state}`
  }))]}
                             .value=${entry.binding?.ref ?? ""}
                             @change=${event => component.onRuntime(event, entry)}></sf-dropdown>
                ${entry.publishers.length ? lit__WEBPACK_IMPORTED_MODULE_0__.nothing : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-quiet">${w("data-no-publishers")}</p>`}
            </section>`)}
        ${view.data.bindings.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
            <section class="sf-editor-group">
                <h3>${w("data-states")}</h3>
                <sf-segmented size="1/3" appearance="track" plate="raised" .items=${view.states} .value=${state}
                                 aria-label=${w("data-states")} @change=${event => component.onState(event)}></sf-segmented>
                <p class="sf-editor-quiet">${w("data-states-help")}</p>
            </section>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
    `;
} // ------------------------------------------------------------ the catalogue popover


function popover(component, view, w) {
  const pop = view.pop;
  const list = pop.items; // The one list of sections (1.2.0): the sections with their icons and
  // counts, a section opened in place with «Back», or what a search found,
  // each block naming its section.

  const listing = component.popQuery ? "found" : pop.section ? "section" : "sections";
  const open = listing === "section" ? pop.sections.find(section => section.id === pop.section) : null;
  const openName = open ? component.word(open.labelKey) : "";

  const option = (index, attributes, content) => (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <li role="option" id=${`sf-editor-pop-${index}`} aria-selected=${index === component.popActive ? "true" : "false"}
            class=${index === component.popActive ? "is-active" : ""} data-item=${attributes.item ?? lit__WEBPACK_IMPORTED_MODULE_0__.nothing} data-section=${attributes.section ?? lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            @pointerenter=${() => {
    if (component.popActive === index) return;
    component.popActive = index;
    component.refresh();
  }}
            @mousedown=${event => event.preventDefault()}
            @click=${attributes.click}>${content}</li>`;

  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <div class="sf-editor-pop" role="dialog" aria-label=${w(pop.mode === "slash" ? "slash-label" : "catalogue-label")} data-listing=${listing} data-section=${pop.section || ""}
             style=${`inset-block-start:${pop.y}px;inset-inline-start:${pop.x}px${pop.height ? `;max-block-size:${pop.height}px` : ""}`}>
            ${pop.mode === "slash" ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<p class="sf-editor-quiet">${component.popQuery ? w("slash-filter", {
    query: component.popQuery
  }) : w("slash-hint")}</p>` : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                <sf-input size="1/2" appearance="filled" input-type="search" icon-start="search" placeholder=${w("search-placeholder")} aria-label=${w("search-placeholder")}
                          .value=${component.popQuery}
                          @input=${event => {
    event.stopPropagation();
    component.popQuery = String(event.currentTarget.value ?? "");
    component.popActive = 0;
    component.refresh();
  }}></sf-input>`}
            ${open ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                <div class="sf-editor-back sf-editor-pop-back">
                    <sf-button size="1/2" appearance="ghost" scheme="on-surface" icon-start="arrow_back" text-position="start" text=${openName}
                               aria-label=${`${w("back")}: ${openName}`} @mousedown=${event => event.preventDefault()}
                               @click=${() => component.openPopSection("")}></sf-button>
                </div>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
            <ul id="sf-editor-pop-list" class="sf-editor-pop-list" role="listbox" tabindex="0" aria-label=${open ? openName : w("catalogue-label")}>
                ${listing === "sections" ? pop.sections.length ? pop.sections.map((section, index) => option(index, {
    section: section.id,
    click: () => component.openPopSection(section.id)
  }, (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                    <sf-icon class="sf-editor-option-icon" icon=${section.icon} size="1/2" aria-hidden="true"></sf-icon>
                    <span class="sf-editor-option-name" data-label=${component.word(section.labelKey)}>${component.word(section.labelKey)}</span>
                    <span class="sf-editor-count" aria-label=${w("section-count", {
    count: String(section.count)
  })}>${section.count}</span>
                    <sf-icon class="sf-editor-chevron" icon="chevron_right" size="1/2" aria-hidden="true"></sf-icon>`)) : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<li class="sf-editor-quiet" role="presentation">${w("nothing-fits")}</li>` : list.length ? list.map((item, index) => {
    // In an open section every block names it; one that stands
    // there from another section says which (also_in).
    const from = open && item.group !== open.id ? w("from-section", {
      name: component.word((0,_catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__.groupWordKey)(item.group))
    }) : "";
    return option(index, {
      item: `${item.type}${item.variant ? `#${item.variant}` : ""}`,
      click: () => component.chooseItem(item)
    }, (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
                        <div class="sf-editor-preview sf-editor-preview--small" aria-hidden="true">${skeleton(component.skeleton(item))}</div>
                        <span class="sf-editor-option-text">
                            <span class="sf-editor-option-name" data-label=${item.label}>${item.label}</span>
                            ${item.variant || from ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<span class="sf-editor-option-sub">${[item.variant ? item.typeLabel : "", from].filter(Boolean).join(" · ")}</span>` : lit__WEBPACK_IMPORTED_MODULE_0__.nothing}
                        </span>
                        <span class="sf-editor-quiet sf-editor-option-note">${open ? openName : component.word((0,_catalogue_mjs__WEBPACK_IMPORTED_MODULE_3__.groupWordKey)(item.group))}</span>`);
  }) : (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`<li class="sf-editor-quiet" role="presentation">${w(component.popQuery ? "nothing-found" : "nothing-fits")}</li>`}
            </ul>
        </div>
    `;
}

function outputModal(component, w) {
  const tabs = ["json", "html", "markdown"].map(id => ({
    id,
    label: w(`output-${id}`)
  }));
  const index = Math.max(0, ["json", "html", "markdown"].indexOf(component.outputView.format));
  return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
        <sf-modal class="sf-editor-output" heading=${w("output-title")} width="min(960px, 92vw)"
                  @sf-modal-closed=${() => {
    component.outputView = null;
    component.refresh();
  }}>
            <div slot="content" class="sf-editor-output-body">
                <sf-tabs type="underline" size="1/2" .items=${tabs} active-index=${index}
                         @sf-tabs-change=${event => {
    event.stopPropagation();
    component.openOutput(String(event.detail?.selected ?? "json"));
  }}></sf-tabs>
                <pre class="sf-editor-output-text" tabindex="0" aria-label=${w(`output-${component.outputView.format}`)}>${component.outputView.text ?? ""}</pre>
            </div>
        </sf-modal>
    `;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "87cfda6b7364"
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "5dcef5de40cf"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("alias-table", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("alias-table", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "d3818183b14c"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("deprecations", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("deprecations", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "5b7d7695b41b"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("element-manifest", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("element-manifest", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "efa66f8927d1"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("lit/directives/repeat.js", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("lit/directives/repeat.js", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "2a080a730149"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("lit", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("lit", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "43090d1c8307"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("page-language", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("page-language", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "deb1a4d61565"
(module) {

module.exports = (globalThis.SF && globalThis.SF.runtimeModule ? globalThis.SF.runtimeModule("smart-base", 1) : new Promise((resolve, reject) => globalThis.addEventListener("sf-runtime-ready", () => globalThis.SF.runtimeModule("smart-base", 1).then(resolve, reject), { once: true })));

/***/ },

/***/ "08e5033c490a"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUILTIN_EDITOR_MANIFESTS: () => (/* binding */ BUILTIN_EDITOR_MANIFESTS),
/* harmony export */   BUILTIN_PORT_ELEMENT_ALIASES: () => (/* reexport safe */ _routing_mjs__WEBPACK_IMPORTED_MODULE_4__.PORT_ELEMENT_ALIASES),
/* harmony export */   BUILTIN_PORT_MANIFESTS: () => (/* binding */ BUILTIN_PORT_MANIFESTS),
/* harmony export */   BUILTIN_TYPE_MANIFESTS: () => (/* binding */ BUILTIN_TYPE_MANIFESTS),
/* harmony export */   CONTENT_ALERT_APPEARANCES: () => (/* binding */ CONTENT_ALERT_APPEARANCES),
/* harmony export */   CONTENT_ALERT_STATUSES: () => (/* binding */ CONTENT_ALERT_STATUSES),
/* harmony export */   CONTENT_FILE_MIME: () => (/* binding */ CONTENT_FILE_MIME),
/* harmony export */   CONTENT_ITEM_PARENTS: () => (/* binding */ CONTENT_ITEM_PARENTS),
/* harmony export */   CONTENT_RATIOS: () => (/* binding */ CONTENT_RATIOS),
/* harmony export */   CONTENT_TABLE_HEADERS: () => (/* binding */ CONTENT_TABLE_HEADERS),
/* harmony export */   PORT_MANIFEST_SF_TABLE_1_0_0: () => (/* binding */ PORT_MANIFEST_SF_TABLE_1_0_0),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inline_model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e66d878fb4f8");
/* harmony import */ var _regions_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("68efac8c1b57");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ac24888e7d3e");
/* harmony import */ var _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("18b9c76994c9");
/* harmony import */ var _routing_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4aea5d6d49c7");





const SECTION_SETS = Object.freeze(['background', 'spacing', 'width', 'grid', 'alignment', 'breakout', 'visibility']);
// A heading's and a paragraph's own parameters (2026-11-04): how the text lines
// up and on which screens it shows, per screen.
const TEXT_SETS = Object.freeze(['alignment', 'visibility']);
// What a section prints when the Document leaves it unset (layout.section
// 1.2.0, visual parity 2026-11-04, as the accepted prototype draws it): space
// above and below (p-y-8) and the page container (width normal: frame
// container m-inline-auto), so in the default theme no text touches the
// page's edge. A section that sets its own values keeps them.
const SECTION_DEFAULTS = Object.freeze({ width: 'normal', padding_y: 8 });
// A layout grid keeps its columns on every screen, as the accepted prototype's
// features and cards grids do on the phone (layout.grid 1.1.0, 2026-11-04;
// measured there at 380: three columns, gap 20, its gap m). A Document sets
// the phone's own value where one column is wanted.
const GRID_DEFAULTS = Object.freeze({ columns: 3, gap: 5 });
const CONTAINER_DEFAULTS = Object.freeze({ width: 'narrow' });
const catalogueWord = (type) => `sf.composition.catalogue.type.${type.replace('.', '_').replaceAll('-', '_')}`;
const variantWord = (type, id) => `sf.composition.catalogue.variant.${type.replace('.', '_').replaceAll('-', '_')}.${id.replaceAll('-', '_')}`;

// Text runs, links of text runs, and since content.heading and
// content.paragraph 1.1.0 the inline component atoms: one shape per declared
// name, never inside a link and without marks.
const inlineContentSchema = {
  type: 'array',
  items: {
    oneOf: [
      {
        type: 'object',
        required: ['type', 'value'],
        additionalProperties: false,
        properties: {
          type: { const: 'text' },
          value: { type: 'string', maxLength: 100000 },
          marks: {
            type: 'array',
            uniqueItems: true,
            items: { enum: ['strong', 'em', 'code'] },
          },
        },
      },
      {
        type: 'object',
        required: ['type', 'href', 'children'],
        additionalProperties: false,
        properties: {
          type: { const: 'link' },
          href: { type: 'string', minLength: 1, maxLength: 2048 },
          children: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['type', 'value'],
              additionalProperties: false,
              properties: {
                type: { const: 'text' },
                value: { type: 'string', maxLength: 100000 },
                marks: {
                  type: 'array',
                  uniqueItems: true,
                  items: { enum: ['strong', 'em', 'code'] },
                },
              },
            },
          },
        },
      },
      ...(0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_0__.inlineComponentSchemas)(),
    ],
  },
};

const routeEnd = {
          type: 'object',
          required: ['endpoint', 'port'],
          additionalProperties: false,
          properties: {
            endpoint: { type: 'string', pattern: '^[a-z][a-z0-9-]{0,31}$' },
            port: { type: 'string', pattern: '^[a-z][a-z0-9-]{0,31}$' },
          },
        };

const emptyObjectSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {},
};

// The first edition of the structured-content types (owner's decision
// 2026-10-31, the content standard's step 3). Where a SIMAI Framework
// component already has a word, the type uses it (content.alert takes status
// and appearance as sf-alert does); elsewhere Docara's parameter names stand
// (details open and layout, figure ratio and fit, code lang and title, steps
// current and layout, grid columns and gap, card variant, media side and
// ratio). A type's renderer draws the existing display parts; card, figure
// and the numbered procedure are CSS components of their own.

// The blocks a content container holds: any content type, or a Smart type.
// The item types (content.list-item, content.tab, content.step) are content
// too; Document validation keeps each inside its own parent.
const contentSlot = (min, max) => ({ min, max, categories: ['content', 'smart'] });
const contentManifest = (type, fields) => ({
  ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
  type,
  version: '1.0.0',
  category: 'content',
  profiles: ['ui-layout', 'structured-content'],
  data_schema: emptyObjectSchema,
  props_schema: emptyObjectSchema,
  presentation: { views: ['default'], presets: [], modifiers: [] },
  slots: {},
  renderer: { kind: 'builtin', name: type },
  assets: [],
  capabilities: ['html'],
  ...fields,
});
const closed = (properties, required = []) => ({
  type: 'object',
  ...(required.length ? { required } : {}),
  additionalProperties: false,
  properties,
});
// A link target or an image source: the Document's URL rule (relative, a
// fragment, http(s), mailto, tel) is applied by validate on top of this.
const urlSchema = { type: 'string', minLength: 1, maxLength: 2048 };
const plainText = (maxLength) => ({ type: 'string', minLength: 1, maxLength });
const sourceText = { type: 'string', maxLength: 200000 };
const imageData = {
  src: urlSchema,
  // The empty text marks an image that only decorates.
  alt: { type: 'string', maxLength: 1000 },
  width: { type: 'integer', minimum: 1, maximum: 100000 },
  height: { type: 'integer', minimum: 1, maximum: 100000 },
};
const CONTENT_RATIOS = Object.freeze(['1/1', '4/3', '3/2', '16/9', '21/9']);
const CONTENT_ALERT_STATUSES = Object.freeze(['neutral', 'info', 'success', 'warning', 'error']);
const CONTENT_ALERT_APPEARANCES = Object.freeze(['default', 'outlined', 'flat']);
// A media type in its lowercase form: type/subtype, no parameters.
const CONTENT_FILE_MIME = '^[a-z0-9][a-z0-9!#$&^_.+-]{0,126}/[a-z0-9][a-z0-9!#$&^_.+-]{0,126}$';
const CONTENT_TABLE_HEADERS = Object.freeze(['row', 'column', 'both', 'none']);
// Which parent an item type stands in; validate reports any other place.
const CONTENT_ITEM_PARENTS = Object.freeze({
  'content.list-item': 'content.list',
  'content.tab': 'content.tabs',
  'content.step': 'content.steps',
});

// A SIMAI Framework icon name (Material Symbols): what sf-icon draws.
const iconName = { type: 'string', pattern: '^[a-z0-9][a-z0-9_]{0,63}$' };
// What a form field submits under: a form control name.
const fieldName = { type: 'string', pattern: '^[A-Za-z_][A-Za-z0-9_.\\[\\]-]{0,63}$' };
// A layout type of the one block editor: a ui-layout block with parameter sets.
const layoutManifest = (type, fields) => ({
  ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
  type,
  version: '1.0.0',
  category: 'layout',
  mode: 'composite',
  profiles: ['ui-layout'],
  data_schema: emptyObjectSchema,
  props_schema: emptyObjectSchema,
  presentation: { views: ['default'], presets: [], modifiers: [] },
  renderer: { kind: 'builtin', name: type },
  assets: [],
  capabilities: ['html'],
  ...fields,
});
// An element type: one smart element, printed from its inputs.
const elementManifest = (type, asset, fields) => ({
  ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
  type,
  version: '1.0.0',
  category: 'smart',
  mode: 'leaf',
  profiles: ['ui-layout'],
  presentation: { views: ['default'], presets: [], modifiers: [] },
  slots: {},
  renderer: { kind: 'builtin', name: type },
  assets: [asset],
  capabilities: ['html'],
  ...fields,
});

const BUILTIN_TYPE_MANIFESTS = Object.freeze([
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'layout.page',
    version: '1.0.0',
    category: 'layout',
    mode: 'composite',
    profiles: ['ui-layout'],
    data_schema: emptyObjectSchema,
    props_schema: emptyObjectSchema,
    presentation: { views: ['default'], presets: [], modifiers: [] },
    slots: {
      default: { min: 0, max: 500, categories: ['layout', 'content', 'smart'] },
    },
    renderer: { kind: 'builtin', name: 'layout.page' },
    assets: [],
    capabilities: ['html'],
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'layout.section',
    // 1.1.0 (2026-11-03): the parameter sets of the one block editor --
    // background, spacing, width, columns, alignment, edge to edge and
    // visibility, all SIMAI Framework utilities (parameter-sets.mjs).
    // 1.2.0 (2026-11-04): the section prints its spacing and width by default
    // (parameter_defaults: p-y-8, the page container), and offers variants.
    // A Document that sets them keeps its own values.
    // 1.3.0 (2026-11-04): the accent variant is the primary role's own fill
    // with on-primary text (background accent), as the prototype draws it,
    // not the primary container's light tint.
    version: '1.3.0',
    category: 'layout',
    mode: 'composite',
    profiles: ['ui-layout'],
    data_schema: emptyObjectSchema,
    props_schema: emptyObjectSchema,
    parameter_sets: SECTION_SETS,
    parameter_defaults: SECTION_DEFAULTS,
    variants: [
      { id: 'plain', label_key: variantWord('layout.section', 'plain') },
      { id: 'soft', label_key: variantWord('layout.section', 'soft'), props: { background: 'container' } },
      { id: 'accent', label_key: variantWord('layout.section', 'accent'), props: { background: 'accent' } },
      { id: 'text', label_key: variantWord('layout.section', 'text'), props: { width: 'narrow' }, slots: { default: [{ id: 'area', type: 'layout.area' }] } },
      { id: 'two-columns', label_key: variantWord('layout.section', 'two-columns'), props: { columns: { xs: 1, md: 2 }, gap: 6 } },
    ],
    presentation: {
      views: ['default'],
      presets: ['surface', 'contrast'],
      modifiers: ['contained', 'spacious'],
    },
    slots: {
      default: { min: 0, max: 500, categories: ['layout', 'content', 'smart'] },
    },
    renderer: { kind: 'builtin', name: 'layout.section' },
    assets: [],
    capabilities: ['html'],
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'layout.columns',
    // 1.1.0: columns and gap take a value per screen and print SIMAI Framework
    // grid utilities (one block editor, owner 2026-11-03); a 1.0.0 value (one
    // integer for every screen, no gap) stays valid.
    version: '1.1.0',
    category: 'layout',
    mode: 'composite',
    profiles: ['ui-layout'],
    data_schema: emptyObjectSchema,
    props_schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        columns: { type: 'integer', minimum: 1, maximum: 12, default: 1, 'x-simai-utility': { class: 'grid-col-{value}', responsive: true } },
        gap: { type: 'integer', minimum: 0, maximum: 8, 'x-simai-utility': { class: 'gap-{value}', responsive: true } },
      },
    },
    presentation: { views: ['default'], presets: [], modifiers: ['equal', 'responsive'] },
    slots: {
      columns: { min: 1, max: 12, categories: ['layout', 'content', 'smart'] },
    },
    renderer: { kind: 'builtin', name: 'layout.columns' },
    assets: ['composition/layout'],
    capabilities: ['html'],
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'content.heading',
    // 1.2.0 (2026-11-04, visual parity): alignment and visibility per screen,
    // the SIMAI Framework sets a section takes (text-*, hidden/block).
    version: '1.2.0',
    category: 'content',
    mode: 'leaf',
    profiles: ['ui-layout', 'structured-content'],
    data_schema: {
      type: 'object',
      required: ['content'],
      additionalProperties: false,
      properties: {
        level: { type: 'integer', minimum: 1, maximum: 6 },
        content: inlineContentSchema,
      },
    },
    props_schema: emptyObjectSchema,
    parameter_sets: TEXT_SETS,
    presentation: { views: ['default'], presets: [], modifiers: [] },
    slots: {},
    renderer: { kind: 'builtin', name: 'content.heading' },
    assets: [],
    capabilities: ['html', 'rich-text'],
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'content.paragraph',
    // 1.3.0 (2026-11-04): alignment and visibility per screen, as the heading.
    version: '1.3.0',
    category: 'content',
    mode: 'leaf',
    profiles: ['ui-layout', 'structured-content'],
    data_schema: {
      type: 'object',
      required: ['content'],
      additionalProperties: false,
      properties: { content: inlineContentSchema },
    },
    props_schema: emptyObjectSchema,
    parameter_sets: TEXT_SETS,
    // G-39 (1.2.0): the prototype's lead is 19/30 px in the variant ink; the
    // SIMAI Framework's large body text role (20/28 px, 16/24 on the phone) in
    // on-surface-variant. Muted is the variant ink alone.
    presentation: { views: ['default'], presets: [], modifiers: ['lead', 'muted'], modifier_utilities: { lead: ['text-large', 'color-on-surface-variant'], muted: ['color-on-surface-variant'] } },
    slots: {},
    renderer: { kind: 'builtin', name: 'content.paragraph' },
    assets: [],
    capabilities: ['html', 'rich-text'],
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'layout.regions',
    version: '1.0.0',
    category: 'layout',
    mode: 'composite',
    profiles: ['ui-layout'],
    data_schema: emptyObjectSchema,
    props_schema: emptyObjectSchema,
    presentation: { views: ['default'], presets: [], modifiers: [] },
    slots: {
      regions: { min: 1, max: 12, types: ['layout.region'] },
    },
    renderer: { kind: 'builtin', name: 'layout.regions' },
    assets: [],
    capabilities: ['html', 'regions'],
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'layout.region',
    version: '1.0.0',
    category: 'layout',
    mode: 'composite',
    profiles: ['ui-layout'],
    data_schema: emptyObjectSchema,
    props_schema: {
      type: 'object',
      required: ['name', 'landmark'],
      additionalProperties: false,
      properties: {
        name: { type: 'string', pattern: '^[a-z][a-z0-9-]{0,31}$' },
        landmark: { enum: [..._regions_mjs__WEBPACK_IMPORTED_MODULE_1__.REGION_LANDMARKS] },
        placement: { enum: [..._regions_mjs__WEBPACK_IMPORTED_MODULE_1__.REGION_PLACEMENTS] },
        label: { type: 'string', minLength: 1, maxLength: 120 },
        sticky: { type: 'boolean' },
        accepts: { type: 'array', minItems: 1, uniqueItems: true, items: { enum: [..._regions_mjs__WEBPACK_IMPORTED_MODULE_1__.REGION_ACCEPTS] } },
        min_items: { type: 'integer', minimum: 0, maximum: 500 },
        max_items: { type: 'integer', minimum: 0, maximum: 500 },
      },
    },
    presentation: { views: ['default'], presets: [], modifiers: [] },
    slots: {
      default: { min: 0, max: 500, categories: ['layout', 'content', 'smart'] },
    },
    renderer: { kind: 'builtin', name: 'layout.region' },
    assets: [],
    capabilities: ['html', 'regions'],
  },  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'layout.scope',
    version: '1.0.0',
    category: 'layout',
    mode: 'composite',
    profiles: ['ui-layout'],
    data_schema: emptyObjectSchema,
    props_schema: {
      type: 'object',
      required: ['routes'],
      additionalProperties: false,
      properties: {
        routes: {
          type: 'array',
          minItems: 1,
          maxItems: 32,
          items: {
            type: 'object',
            required: ['id', 'from', 'to'],
            additionalProperties: false,
            properties: {
              id: { type: 'string', pattern: '^[a-z][a-z0-9-]{0,63}$' },
              from: routeEnd,
              to: routeEnd,
            },
          },
        },
      },
    },
    presentation: { views: ['default'], presets: [], modifiers: [] },
    slots: {
      default: { min: 1, max: 500, categories: ['layout', 'content', 'smart'] },
    },
    renderer: { kind: 'builtin', name: 'layout.scope' },
    assets: [],
    capabilities: ['html', 'hydration', 'routing'],
  },
  // A text area of a layout (one block editor, owner 2026-11-03): where an
  // author writes. A page may hold several; the rest of the layout is the
  // designer's, and the host grants the rights. Its padding and visibility are
  // SIMAI Framework utilities per screen (x-simai-utility, utilities.mjs),
  // never inline styles.
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'layout.area',
    version: '1.0.0',
    category: 'layout',
    mode: 'composite',
    profiles: ['ui-layout'],
    data_schema: emptyObjectSchema,
    props_schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        padding: { type: 'integer', minimum: 0, maximum: 8, 'x-simai-utility': { class: 'p-{value}', responsive: true } },
        hidden: { type: 'boolean', default: false, 'x-simai-utility': { values: { true: 'hidden', false: 'block' }, responsive: true } },
      },
    },
    presentation: { views: ['default'], presets: [], modifiers: [] },
    slots: {
      default: { min: 0, max: 500, categories: ['content', 'smart'], label_key: 'sf.composition.layout_area.content', empty_key: 'sf.composition.layout_area.empty' },
    },
    renderer: { kind: 'builtin', name: 'layout.area' },
    assets: [],
    capabilities: ['html', 'content-area'],
  },
  // Layout types of the one block editor (visual parity, 2026-11-04; G-21):
  // a container that holds part of a section in its own width, a grid of
  // equal cells, and an empty space. Each prints SIMAI Framework utilities
  // only, through its parameter sets and props.
  layoutManifest('layout.container', {
    parameter_sets: ['width', 'spacing', 'background', 'visibility'],
    parameter_defaults: CONTAINER_DEFAULTS,
    slots: { default: { min: 0, max: 500, categories: ['layout', 'content', 'smart'] } },
    catalogue: { group: 'layout', icon: 'width_normal', label_key: catalogueWord('layout.container'), keywords: { en: ['container', 'width', 'wrapper'], ru: ['контейнер', 'ширина', 'обёртка'] }, order: 140 },
    variants: [
      { id: 'narrow', label_key: variantWord('layout.container', 'narrow') },
      { id: 'normal', label_key: variantWord('layout.container', 'normal'), props: { width: 'normal' } },
      { id: 'soft', label_key: variantWord('layout.container', 'soft'), props: { background: 'container', padding_y: 4, padding_x: 4 } },
    ],
  }),
  layoutManifest('layout.grid', {
    // 1.1.0 (2026-11-04): its columns hold on the phone (three, gap 5), and
    // its card variants keep theirs, as the prototype draws them at 380.
    version: '1.1.0',
    parameter_sets: ['grid', 'visibility'],
    parameter_defaults: GRID_DEFAULTS,
    slots: { default: { min: 0, max: 48, categories: ['layout', 'content', 'smart'] } },
    catalogue: { group: 'layout', icon: 'grid_on', label_key: catalogueWord('layout.grid'), keywords: { en: ['grid', 'tiles', 'gallery', 'cells'], ru: ['сетка', 'плитка', 'галерея', 'ячейки'] }, order: 150 },
    variants: [2, 3, 4].map((count) => ({
      id: `cards-${count}`,
      label_key: variantWord('layout.grid', `cards-${count}`),
      props: { columns: count },
      slots: { default: Array.from({ length: count }, (_, index) => ({ id: `card-${index + 1}`, type: 'content.card' })) },
    })),
  }),
  layoutManifest('layout.spacer', {
    mode: 'leaf',
    props_schema: closed({
      size: { type: 'integer', minimum: 1, maximum: 8, 'x-simai-utility': { class: 'p-top-{value}', responsive: true } },
    }),
    parameter_sets: ['visibility'],
    parameter_defaults: { size: 6 },
    slots: {},
    catalogue: { group: 'layout', icon: 'height', label_key: catalogueWord('layout.spacer'), keywords: { en: ['spacer', 'space', 'gap'], ru: ['пустое место', 'отступ', 'промежуток'] }, order: 160 },
  }),
  // Elements (visual parity, 2026-11-04; G-20): the smart elements a block
  // prints, each a type of its own so an author places it anywhere a block
  // goes. Its parameters are the element's inputs (smart.manifest.json, held
  // by elements.print); the type's defaults are the prototype's.
  elementManifest('element.button', 'smart/button', {
    // Unset, the button reads «Button» in the Document's language until the
    // author writes. With an address it is a link with the button's look
    // (sf-button 1.4.0 href); the Document's URL rule holds it.
    data_schema: closed({ text: plainText(200), href: urlSchema }),
    props_schema: closed({
      appearance: { enum: ['default', 'tonal', 'outline', 'link', 'surface'], default: 'default' },
      scheme: { enum: ['primary', 'secondary', 'on-surface', 'on-surface-variant'], default: 'primary' },
      size: { enum: ['1/2', '1', '2'], default: '1' },
      icon: iconName,
      icon_position: { enum: ['start', 'end'], default: 'start' },
    }),
    catalogue: { group: 'elements', icon: 'smart_button', label_key: catalogueWord('element.button'), keywords: { en: ['button', 'link', 'call to action', 'cta'], ru: ['кнопка', 'ссылка', 'призыв'] }, order: 100 },
    variants: [
      { id: 'plain', label_key: variantWord('element.button', 'plain') },
      { id: 'icon', label_key: variantWord('element.button', 'icon'), props: { icon: 'arrow_forward', icon_position: 'end' } },
      { id: 'outline', label_key: variantWord('element.button', 'outline'), props: { appearance: 'outline' } },
    ],
  }),
  elementManifest('element.button-icon', 'smart/button-icon', {
    // The label is what a screen reader says: an icon button has no words.
    // Unset, it says «Button» in the Document's language.
    data_schema: closed({ label: plainText(120) }),
    props_schema: closed({
      icon: { ...iconName, default: 'favorite' },
      appearance: { enum: ['default', 'tonal', 'outline', 'surface', 'ghost'], default: 'tonal' },
      scheme: { enum: ['primary', 'secondary', 'on-surface', 'on-surface-variant'], default: 'primary' },
      size: { enum: ['1/2', '1', '2'], default: '1' },
    }),
    catalogue: { group: 'elements', icon: 'add_circle', label_key: catalogueWord('element.button-icon'), keywords: { en: ['icon button', 'icon', 'button'], ru: ['кнопка-значок', 'значок', 'иконка', 'кнопка'] }, order: 110 },
  }),
  elementManifest('element.badge', 'smart/badge', {
    data_schema: closed({ text: plainText(120) }),
    props_schema: closed({
      appearance: { enum: ['main', 'tonal', 'outline'], default: 'tonal' },
      scheme: { enum: ['neutral', 'primary', 'secondary', 'tertiary'], default: 'primary' },
      size: { enum: ['1/3', '1/2', '1'], default: '1/2' },
      icon: iconName,
    }),
    catalogue: { group: 'elements', icon: 'label', label_key: catalogueWord('element.badge'), keywords: { en: ['badge', 'tag', 'status', 'label'], ru: ['метка', 'бейдж', 'тег', 'статус'] }, order: 120 },
  }),
  elementManifest('element.icon', 'smart/icon', {
    // The label names the icon for a screen reader; without it the icon only decorates.
    data_schema: closed({ label: plainText(120) }),
    props_schema: closed({
      icon: { ...iconName, default: 'star' },
      size: { enum: ['1', '2', '3', '4', '5'], default: '2' },
    }),
    catalogue: { group: 'elements', icon: 'star', label_key: catalogueWord('element.icon'), keywords: { en: ['icon', 'symbol', 'pictogram'], ru: ['значок', 'иконка', 'пиктограмма'] }, order: 130 },
  }),
  // Forms (2026-11-04; the ui-editor host's G-20): a form and its fields,
  // each field one SIMAI Framework Smart element printed from its inputs
  // (sf-input, sf-input-textarea, sf-checkbox, sf-switch, sf-dropdown,
  // sf-button with native-type submit). The form is a <form> around them;
  // where it is sent is the host's (action), checked by the Document's URL
  // rule. A field names what it submits (name); without a label, a field
  // whose name is a common one (name, phone, email, message) reads its word
  // in the Document's language, any other «Field»; so the variants carry
  // names, not words of one language.
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.type-manifest', 1),
    type: 'form.form',
    version: '1.0.0',
    category: 'smart',
    mode: 'composite',
    profiles: ['ui-layout'],
    data_schema: closed({ action: urlSchema }),
    props_schema: closed({ method: { enum: ['post', 'get'], default: 'post' } }),
    presentation: { views: ['default'], presets: [], modifiers: [] },
    slots: { default: { min: 0, max: 50, categories: ['content', 'smart'] } },
    renderer: { kind: 'builtin', name: 'form.form' },
    assets: [],
    capabilities: ['html'],
    catalogue: { group: 'forms', icon: 'contact_mail', label_key: catalogueWord('form.form'), keywords: { en: ['form', 'request', 'contact', 'feedback'], ru: ['форма', 'заявка', 'обратная связь', 'контакты'] }, order: 100 },
    variants: [
      {
        id: 'request',
        label_key: variantWord('form.form', 'request'),
        slots: { default: [
          { id: 'name', type: 'form.input', data: { name: 'name' } },
          { id: 'phone', type: 'form.input', data: { name: 'phone' }, props: { input_type: 'tel' } },
          { id: 'send', type: 'form.button-submit' },
        ] },
      },
      {
        id: 'message',
        label_key: variantWord('form.form', 'message'),
        slots: { default: [
          { id: 'name', type: 'form.input', data: { name: 'name' } },
          { id: 'email', type: 'form.input', data: { name: 'email' }, props: { input_type: 'email' } },
          { id: 'text', type: 'form.textarea', data: { name: 'message' } },
          { id: 'send', type: 'form.button-submit' },
        ] },
      },
    ],
  },
  elementManifest('form.input', 'smart/input', {
    data_schema: closed({ label: plainText(200), placeholder: plainText(200), hint: plainText(300), name: fieldName }),
    props_schema: closed({
      input_type: { enum: ['text', 'email', 'tel', 'url'], default: 'text' },
      required: { type: 'boolean', default: false },
      size: { enum: ['1/2', '1', '2'], default: '1' },
    }),
    catalogue: { group: 'forms', icon: 'input', label_key: catalogueWord('form.input'), keywords: { en: ['field', 'input', 'text field', 'email', 'phone'], ru: ['поле', 'ввод', 'текстовое поле', 'почта', 'телефон'] }, order: 110 },
  }),
  elementManifest('form.textarea', 'smart/input-textarea', {
    data_schema: closed({ label: plainText(200), placeholder: plainText(200), hint: plainText(300), name: fieldName }),
    props_schema: closed({
      rows: { type: 'integer', minimum: 2, maximum: 12, default: 3 },
      required: { type: 'boolean', default: false },
      size: { enum: ['1/2', '1', '2'], default: '1' },
    }),
    catalogue: { group: 'forms', icon: 'notes', label_key: catalogueWord('form.textarea'), keywords: { en: ['text area', 'message', 'comment', 'multiline'], ru: ['многострочное поле', 'сообщение', 'комментарий'] }, order: 120 },
  }),
  elementManifest('form.checkbox', 'smart/checkbox', {
    data_schema: closed({ label: plainText(300), hint: plainText(300), name: fieldName }),
    props_schema: closed({
      checked: { type: 'boolean', default: false },
      size: { enum: ['1/2', '1', '2'], default: '1' },
    }),
    catalogue: { group: 'forms', icon: 'check_box', label_key: catalogueWord('form.checkbox'), keywords: { en: ['checkbox', 'agree', 'consent', 'tick'], ru: ['флажок', 'галочка', 'согласие'] }, order: 130 },
  }),
  elementManifest('form.switch', 'smart/switch', {
    data_schema: closed({ label: plainText(300), hint: plainText(300), name: fieldName }),
    props_schema: closed({
      checked: { type: 'boolean', default: false },
      size: { enum: ['1/2', '1', '2'], default: '1' },
    }),
    catalogue: { group: 'forms', icon: 'toggle_on', label_key: catalogueWord('form.switch'), keywords: { en: ['switch', 'toggle', 'on off'], ru: ['переключатель', 'вкл выкл'] }, order: 140 },
  }),
  elementManifest('form.select', 'smart/dropdown', {
    // The options are words, one after another, separated by commas: what an
    // author writes in one field. Each option submits its own words.
    data_schema: closed({ label: plainText(200), placeholder: plainText(200), options: plainText(2000), name: fieldName }),
    props_schema: closed({
      required: { type: 'boolean', default: false },
      size: { enum: ['1/2', '1', '2'], default: '1' },
    }),
    catalogue: { group: 'forms', icon: 'arrow_drop_down_circle', label_key: catalogueWord('form.select'), keywords: { en: ['select', 'dropdown', 'choice', 'list'], ru: ['список', 'выбор', 'выпадающий список'] }, order: 150 },
  }),
  elementManifest('form.button-submit', 'smart/button', {
    // Unset, it reads «Send» in the Document's language.
    data_schema: closed({ text: plainText(200) }),
    props_schema: closed({
      appearance: { enum: ['default', 'tonal', 'outline'], default: 'default' },
      size: { enum: ['1/2', '1', '2'], default: '1' },
    }),
    catalogue: { group: 'forms', icon: 'send', label_key: catalogueWord('form.button-submit'), keywords: { en: ['submit', 'send', 'button'], ru: ['отправить', 'кнопка отправки', 'кнопка'] }, order: 160 },
  }),
  // The root of a structured-content Document: the page's blocks in order,
  // under the page's title (the accepted content editor prototype writes
  // this root).
  contentManifest('content.document', {
    mode: 'composite',
    profiles: ['structured-content'],
    data_schema: closed({ title: { type: 'string', maxLength: 300 } }),
    slots: { default: contentSlot(0, 500) },
  }),
  contentManifest('content.list', {
    mode: 'composite',
    props_schema: closed({
      ordered: { type: 'boolean' },
      start: { type: 'integer', minimum: 1, maximum: 1000000 },
    }),
    slots: { items: { min: 1, max: 500, types: ['content.list-item'] } },
  }),
  contentManifest('content.list-item', {
    mode: 'composite',
    data_schema: closed({ content: inlineContentSchema }, ['content']),
    // A nested list, or more paragraphs and code under the item's own line.
    slots: { default: contentSlot(0, 50) },
    capabilities: ['html', 'rich-text'],
  }),
  contentManifest('content.quote', {
    mode: 'composite',
    slots: { default: contentSlot(1, 100) },
  }),
  contentManifest('content.code', {
    mode: 'leaf',
    data_schema: closed({ code: sourceText }, ['code']),
    props_schema: closed({
      lang: { type: 'string', pattern: '^[a-z0-9][a-z0-9+#._-]{0,31}$' },
      title: plainText(200),
      numbers: { type: 'boolean' },
    }),
    assets: ['component/highlight'],
  }),
  contentManifest('content.divider', {
    mode: 'leaf',
    assets: ['component/contentDivider'],
  }),
  contentManifest('content.table', {
    mode: 'leaf',
    data_schema: closed({
      caption: inlineContentSchema,
      rows: {
        type: 'array',
        minItems: 1,
        maxItems: 1000,
        items: { type: 'array', minItems: 1, maxItems: 50, items: inlineContentSchema },
      },
    }, ['rows']),
    props_schema: closed({
      header: { enum: [...CONTENT_TABLE_HEADERS] },
      align: { type: 'array', maxItems: 50, items: { enum: ['start', 'center', 'end'] } },
    }),
    assets: ['utility/table-frame'],
    capabilities: ['html', 'rich-text'],
  }),
  contentManifest('content.figure', {
    mode: 'leaf',
    data_schema: closed({ ...imageData, caption: inlineContentSchema }, ['src', 'alt']),
    props_schema: closed({
      ratio: { enum: ['auto', ...CONTENT_RATIOS] },
      fit: { enum: ['cover', 'contain'] },
    }),
    assets: ['component/figure'],
    capabilities: ['html', 'rich-text'],
  }),
  contentManifest('content.alert', {
    mode: 'composite',
    data_schema: closed({ title: inlineContentSchema }),
    props_schema: closed({
      status: { enum: [...CONTENT_ALERT_STATUSES] },
      appearance: { enum: [...CONTENT_ALERT_APPEARANCES] },
    }),
    slots: { default: contentSlot(0, 100) },
    assets: ['component/alerts'],
    capabilities: ['html', 'rich-text'],
  }),
  contentManifest('content.details', {
    mode: 'composite',
    data_schema: closed({ summary: inlineContentSchema }, ['summary']),
    props_schema: closed({
      open: { type: 'boolean' },
      layout: { enum: ['surface', 'lines'] },
    }),
    slots: { default: contentSlot(0, 100) },
    capabilities: ['html', 'rich-text'],
  }),
  contentManifest('content.tabs', {
    mode: 'composite',
    // The accessible name of the row of tabs.
    data_schema: closed({ label: plainText(120) }),
    slots: { tabs: { min: 1, max: 20, types: ['content.tab'] } },
    assets: ['component/tabs'],
  }),
  contentManifest('content.tab', {
    mode: 'composite',
    data_schema: closed({ label: plainText(120) }, ['label']),
    slots: { default: contentSlot(0, 100) },
  }),
  contentManifest('content.steps', {
    mode: 'composite',
    props_schema: closed({
      current: { type: 'integer', minimum: 1, maximum: 100 },
      layout: { enum: ['timeline', 'list'] },
    }),
    slots: { steps: { min: 1, max: 100, types: ['content.step'] } },
    assets: ['component/procedure'],
  }),
  contentManifest('content.step', {
    mode: 'composite',
    data_schema: closed({ title: inlineContentSchema }),
    slots: { default: contentSlot(0, 100) },
    capabilities: ['html', 'rich-text'],
  }),
  contentManifest('content.grid', {
    mode: 'composite',
    props_schema: closed({
      columns: { type: 'integer', minimum: 1, maximum: 4 },
      gap: { type: 'integer', minimum: 0, maximum: 4 },
    }),
    slots: { default: contentSlot(1, 48) },
  }),
  contentManifest('content.card', {
    mode: 'composite',
    props_schema: closed({ variant: { enum: ['default', 'plain'] } }),
    slots: { default: contentSlot(0, 100) },
    assets: ['component/card'],
  }),
  contentManifest('content.media', {
    mode: 'composite',
    data_schema: closed({ ...imageData }, ['src', 'alt']),
    props_schema: closed({
      side: { enum: ['left', 'right'] },
      ratio: { enum: [...CONTENT_RATIOS] },
    }),
    slots: { default: contentSlot(0, 100) },
    assets: ['component/figure'],
  }),
  // A file to download, not to play in the page (content.media plays). Its
  // data is the shape the SIMAI Framework already uses for a stored file (the
  // property-view file type, sf-image-field's value): value the host's
  // reference, href the address it is fetched from, label the name shown
  // (else the address's last part), mime and size in bytes, both optional.
  // The renderer draws sf-download-file's row as a plain <a download>.
  contentManifest('content.file', {
    mode: 'leaf',
    data_schema: closed({
      value: { type: 'string', minLength: 1, maxLength: 2048 },
      href: urlSchema,
      label: plainText(300),
      mime: { type: 'string', maxLength: 255, pattern: CONTENT_FILE_MIME },
      size: { type: 'integer', minimum: 0, maximum: Number.MAX_SAFE_INTEGER },
    }, ['href']),
    assets: ['component/download-file'],
  }),
  // The escape hatch: markup in the html@1 subset of sf-rich-text, cleaned at
  // render by that subset's one rule. The key is not "html": that word is
  // refused anywhere in a Document.
  contentManifest('content.html', {
    mode: 'leaf',
    data_schema: closed({ markup: sourceText }, ['markup']),
  }),
  // Diagram and math draw with a runtime the SIMAI Framework does not carry
  // (a diagram engine, a TeX typesetter). They are registered types whose
  // renderer a host supplies -- createRegistry(manifests, {'content.diagram':
  // render}) -- and whose assets it loads on demand; without one, render
  // reports renderer_unavailable for the node.
  contentManifest('content.diagram', {
    mode: 'leaf',
    data_schema: closed({ source: sourceText }, ['source']),
    props_schema: closed({
      engine: { enum: ['mermaid'] },
      title: plainText(200),
    }),
    renderer: { kind: 'registered', name: 'content.diagram' },
    assets: ['composition/diagram'],
  }),
  contentManifest('content.math', {
    mode: 'leaf',
    data_schema: closed({ source: sourceText }, ['source']),
    props_schema: closed({ label: plainText(200) }),
    renderer: { kind: 'registered', name: 'content.math' },
    assets: ['composition/math'],
  }),
  // Where a layout puts the page's content: a layout document holds one, and
  // render(layout, {content: document}) draws the structured-content document
  // in its place. layout.region names an area whose nodes are the layout's
  // own; nothing in it stands for a document that comes from elsewhere.
  contentManifest('content.outlet', {
    mode: 'leaf',
    profiles: ['ui-layout'],
  }),
]);

// Published typed ports. Framework owns the element protocol; the product owns
// what a request means, data access and authorization.
//
// The list port is answered by sf-view-table (formerly sf-table), which lives
// in the SIMAI Framework Pro package since 2026-10-11 (the component folder in
// simai/ui-pro, package pro). The port stays here: it is a public contract of
// the free Framework (composition-ports.v1.json, the routing contract lock), and
// the package's tests read it from this file in their overlay of ui-source.

// The list port as the routing contract 1.0.0 published it, under the former
// tag. Frozen: its bytes are pinned by the lock (port:sf-table@1.0.0), so a
// consumer that pinned 1.0.0 stays valid. Not registered by default.
const PORT_MANIFEST_SF_TABLE_1_0_0 = Object.freeze({
  ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.port-manifest', 1),
  element: 'sf-table',
  version: '1.0.0',
  component: 'smart.data-view',
  component_version: '1.2.0',
  outputs: {
    selection: {
      value: 'record-ids.v1',
      summary: 'Explicit current-result selection of this instance, emitted once per change, including clearing.',
    },
  },
  inputs: {
    context: {
      value: 'record-ids.v1',
      effect: 'request',
      summary: 'Restricts this collection to records related to the given identities. The table clears its selection, enters loading and emits sf-table-query-intent with the route sequence; the host resolves the relation and access and answers with applyQueryResult.',
      request_event: 'sf-table-query-intent',
      result_method: 'applyQueryResult',
    },
  },
});

// 1.1.0 (2026-11-07): the same ports under the element's own tag sf-view-table
// (sf-view-table 1.14.0, rename plan R2) and its query event; values and
// effects unchanged.
const BUILTIN_PORT_MANIFESTS = Object.freeze([
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.port-manifest', 1),
    element: 'sf-view-table',
    version: '1.1.0',
    component: 'smart.view-table',
    component_version: '1.14.0',
    outputs: {
      selection: {
        value: 'record-ids.v1',
        summary: 'Explicit current-result selection of this instance, emitted once per change, including clearing.',
      },
    },
    inputs: {
      context: {
        value: 'record-ids.v1',
        effect: 'request',
        summary: 'Restricts this collection to records related to the given identities. The table clears its selection, enters loading and emits sf-view-table-query with the route sequence; the host resolves the relation and access and answers with applyQueryResult.',
        request_event: 'sf-view-table-query',
        result_method: 'applyQueryResult',
      },
    },
  },
]);

// Former port element names (routing.mjs PORT_ELEMENT_ALIASES): a binding to
// sf-table finds the sf-view-table manifest until the record's remove_after.




// One editor field of a first-edition content type: the label and help keys
// follow the type and the key, the owner is the SIMAI Framework.
const contentField = (type, key, plane, kind, fields) => {
  const name = type.replace('.', '_').replaceAll('-', '_');
  const property = kind === 'choice' || kind === 'text' ? { type: 'string', version: 2 }
    : kind === 'integer' ? { type: 'integer', version: 1 } : { type: 'boolean', version: 1 };
  return {
    key,
    plane,
    target: key,
    property,
    constraints: kind === 'toggle' ? {} : kind === 'choice' ? { min_length: 1, max_length: 16 } : {},
    group: 'basic',
    visibility: 'visible',
    label_key: `sf.composition.${name}.${key}`,
    help_key: `sf.composition.${name}.${key}_help`,
    capability_hints: [`composition.${plane}.${key}`],
    permission_hints: ['composition.node.update'],
    owner: 'simai/framework',
    ...fields,
  };
};
const contentEditor = (type, fields) => ({
  ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.editor-manifest', 1),
  type,
  type_version: '1.0.0',
  fields,
});
const advanced = { group: 'advanced', visibility: 'collapsed' };

const BUILTIN_EDITOR_MANIFESTS = Object.freeze([
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.editor-manifest', 1),
    type: 'layout.section',
    type_version: '1.3.0',
    fields: [
      {
        key: 'surface',
        plane: 'presentation',
        target: 'preset',
        property: { type: 'string', version: 2 },
        constraints: { min_length: 1, max_length: 32 },
        group: 'preset',
        visibility: 'visible',
        choices: ['surface', 'contrast'],
        default: 'surface',
        label_key: 'sf.composition.layout_section.surface',
        help_key: 'sf.composition.layout_section.surface_help',
        capability_hints: ['composition.presentation.preset'],
        permission_hints: ['composition.node.update'],
        owner: 'simai/framework',
      },
      // 1.1.0: the fields of its parameter sets; 1.2.0: width and the space
      // above and below default to what the section prints unset.
      ...(0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_3__.parameterSetFields)({ parameter_sets: SECTION_SETS, parameter_defaults: SECTION_DEFAULTS }),
    ],
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.editor-manifest', 1),
    type: 'layout.columns',
    type_version: '1.1.0',
    fields: [
      {
        key: 'columns',
        plane: 'props',
        target: 'columns',
        property: { type: 'integer', version: 1 },
        constraints: { min: 1, max: 12 },
        group: 'basic',
        visibility: 'visible',
        default: 2,
        label_key: 'sf.composition.layout_columns.columns',
        help_key: 'sf.composition.layout_columns.columns_help',
        capability_hints: ['composition.props.columns'],
        permission_hints: ['composition.node.update'],
        owner: 'simai/framework',
      },
      {
        key: 'gap',
        plane: 'props',
        target: 'gap',
        property: { type: 'integer', version: 1 },
        constraints: { min: 0, max: 8 },
        group: 'basic',
        visibility: 'visible',
        default: 4,
        label_key: 'sf.composition.layout_columns.gap',
        help_key: 'sf.composition.layout_columns.gap_help',
        capability_hints: ['composition.props.gap'],
        permission_hints: ['composition.node.update'],
        owner: 'simai/framework',
      },
    ],
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.editor-manifest', 1),
    type: 'content.heading',
    type_version: '1.2.0',
    fields: [
      {
        key: 'level',
        plane: 'data',
        target: 'level',
        property: { type: 'integer', version: 1 },
        constraints: { min: 1, max: 6 },
        group: 'advanced',
        visibility: 'collapsed',
        default: 2,
        label_key: 'sf.composition.content_heading.level',
        help_key: 'sf.composition.content_heading.level_help',
        capability_hints: ['composition.data.level'],
        permission_hints: ['composition.node.update'],
        owner: 'simai/framework',
      },
      ...(0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_3__.parameterSetFields)({ parameter_sets: TEXT_SETS }),
    ],
  },  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_2__.schemaFields)('simai.composition.editor-manifest', 1),
    type: 'layout.region',
    type_version: '1.0.0',
    fields: [
      {
        key: 'placement',
        plane: 'props',
        target: 'placement',
        property: { type: 'string', version: 2 },
        constraints: { min_length: 1, max_length: 16 },
        group: 'basic',
        visibility: 'visible',
        choices: [..._regions_mjs__WEBPACK_IMPORTED_MODULE_1__.REGION_PLACEMENTS],
        default: 'block',
        label_key: 'sf.composition.layout_region.placement',
        help_key: 'sf.composition.layout_region.placement_help',
        capability_hints: ['composition.props.placement'],
        permission_hints: ['composition.node.update'],
        owner: 'simai/framework',
      },
      {
        key: 'label',
        plane: 'props',
        target: 'label',
        property: { type: 'string', version: 2 },
        constraints: { min_length: 1, max_length: 120 },
        group: 'basic',
        visibility: 'visible',
        label_key: 'sf.composition.layout_region.label',
        help_key: 'sf.composition.layout_region.label_help',
        capability_hints: ['composition.props.label'],
        permission_hints: ['composition.node.update'],
        owner: 'simai/framework',
      },
      {
        key: 'landmark',
        plane: 'props',
        target: 'landmark',
        property: { type: 'string', version: 2 },
        constraints: { min_length: 1, max_length: 16 },
        group: 'advanced',
        visibility: 'collapsed',
        choices: [..._regions_mjs__WEBPACK_IMPORTED_MODULE_1__.REGION_LANDMARKS],
        label_key: 'sf.composition.layout_region.landmark',
        help_key: 'sf.composition.layout_region.landmark_help',
        capability_hints: ['composition.props.landmark'],
        permission_hints: ['composition.node.update'],
        owner: 'simai/framework',
      },
      {
        key: 'sticky',
        plane: 'props',
        target: 'sticky',
        property: { type: 'boolean', version: 1 },
        constraints: {},
        group: 'advanced',
        visibility: 'collapsed',
        default: false,
        label_key: 'sf.composition.layout_region.sticky',
        help_key: 'sf.composition.layout_region.sticky_help',
        capability_hints: ['composition.props.sticky'],
        permission_hints: ['composition.node.update'],
        owner: 'simai/framework',
      },
    ],
  },
  contentEditor('layout.area', [
    contentField('layout.area', 'padding', 'props', 'integer', { constraints: { min: 0, max: 8 } }),
    contentField('layout.area', 'hidden', 'props', 'toggle', { default: false }),
  ]),
  // The layout and element types of the one block editor (2026-11-04).
  { ...contentEditor('content.paragraph', (0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_3__.parameterSetFields)({ parameter_sets: TEXT_SETS })), type_version: '1.3.0' },
  contentEditor('layout.container', (0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_3__.parameterSetFields)({ parameter_sets: ['width', 'spacing', 'background', 'visibility'], parameter_defaults: CONTAINER_DEFAULTS })),
  { ...contentEditor('layout.grid', (0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_3__.parameterSetFields)({ parameter_sets: ['grid', 'visibility'], parameter_defaults: GRID_DEFAULTS })), type_version: '1.1.0' },
  contentEditor('layout.spacer', [
    contentField('layout.spacer', 'size', 'props', 'integer', { constraints: { min: 1, max: 8 }, default: 6 }),
    ...(0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_3__.parameterSetFields)({ parameter_sets: ['visibility'] }),
  ]),
  contentEditor('element.button', [
    contentField('element.button', 'text', 'data', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('element.button', 'href', 'data', 'text', { constraints: { min_length: 1, max_length: 2048 } }),
    contentField('element.button', 'appearance', 'props', 'choice', { choices: ['default', 'tonal', 'outline', 'link', 'surface'], default: 'default' }),
    contentField('element.button', 'size', 'props', 'choice', { choices: ['1/2', '1', '2'], default: '1' }),
    contentField('element.button', 'icon', 'props', 'text', { constraints: { min_length: 1, max_length: 64 } }),
    contentField('element.button', 'icon_position', 'props', 'choice', { choices: ['start', 'end'], default: 'start' }),
    contentField('element.button', 'scheme', 'props', 'choice', { ...advanced, choices: ['primary', 'secondary'], default: 'primary' }),
  ]),
  contentEditor('element.button-icon', [
    contentField('element.button-icon', 'icon', 'props', 'text', { constraints: { min_length: 1, max_length: 64 }, default: 'favorite' }),
    contentField('element.button-icon', 'label', 'data', 'text', { constraints: { min_length: 1, max_length: 120 } }),
    contentField('element.button-icon', 'appearance', 'props', 'choice', { choices: ['default', 'tonal', 'outline', 'surface', 'ghost'], default: 'tonal' }),
    contentField('element.button-icon', 'size', 'props', 'choice', { choices: ['1/2', '1', '2'], default: '1' }),
    contentField('element.button-icon', 'scheme', 'props', 'choice', { ...advanced, choices: ['primary', 'secondary'], default: 'primary' }),
  ]),
  contentEditor('element.badge', [
    contentField('element.badge', 'text', 'data', 'text', { constraints: { min_length: 1, max_length: 120 } }),
    contentField('element.badge', 'appearance', 'props', 'choice', { choices: ['main', 'tonal', 'outline'], default: 'tonal' }),
    contentField('element.badge', 'scheme', 'props', 'choice', { choices: ['neutral', 'primary', 'secondary', 'tertiary'], default: 'primary' }),
    contentField('element.badge', 'size', 'props', 'choice', { choices: ['1/3', '1/2', '1'], default: '1/2' }),
    contentField('element.badge', 'icon', 'props', 'text', { ...advanced, constraints: { min_length: 1, max_length: 64 } }),
  ]),
  contentEditor('element.icon', [
    contentField('element.icon', 'icon', 'props', 'text', { constraints: { min_length: 1, max_length: 64 }, default: 'star' }),
    contentField('element.icon', 'size', 'props', 'choice', { choices: ['1', '2', '3', '4', '5'], default: '2' }),
    contentField('element.icon', 'label', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 120 } }),
  ]),
  // Forms (2026-11-04).
  contentEditor('form.form', [
    contentField('form.form', 'action', 'data', 'text', { constraints: { min_length: 1, max_length: 2048 } }),
    contentField('form.form', 'method', 'props', 'choice', { ...advanced, choices: ['post', 'get'], default: 'post' }),
  ]),
  contentEditor('form.input', [
    contentField('form.input', 'label', 'data', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('form.input', 'placeholder', 'data', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('form.input', 'input_type', 'props', 'choice', { choices: ['text', 'email', 'tel', 'url'], default: 'text' }),
    contentField('form.input', 'required', 'props', 'toggle', { default: false }),
    contentField('form.input', 'hint', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 300 } }),
    contentField('form.input', 'name', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 64 } }),
    contentField('form.input', 'size', 'props', 'choice', { ...advanced, choices: ['1/2', '1', '2'], default: '1' }),
  ]),
  contentEditor('form.textarea', [
    contentField('form.textarea', 'label', 'data', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('form.textarea', 'placeholder', 'data', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('form.textarea', 'rows', 'props', 'integer', { constraints: { min: 2, max: 12 }, default: 3 }),
    contentField('form.textarea', 'required', 'props', 'toggle', { default: false }),
    contentField('form.textarea', 'hint', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 300 } }),
    contentField('form.textarea', 'name', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 64 } }),
    contentField('form.textarea', 'size', 'props', 'choice', { ...advanced, choices: ['1/2', '1', '2'], default: '1' }),
  ]),
  contentEditor('form.checkbox', [
    contentField('form.checkbox', 'label', 'data', 'text', { constraints: { min_length: 1, max_length: 300 } }),
    contentField('form.checkbox', 'hint', 'data', 'text', { constraints: { min_length: 1, max_length: 300 } }),
    contentField('form.checkbox', 'checked', 'props', 'toggle', { default: false }),
    contentField('form.checkbox', 'name', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 64 } }),
    contentField('form.checkbox', 'size', 'props', 'choice', { ...advanced, choices: ['1/2', '1', '2'], default: '1' }),
  ]),
  contentEditor('form.switch', [
    contentField('form.switch', 'label', 'data', 'text', { constraints: { min_length: 1, max_length: 300 } }),
    contentField('form.switch', 'hint', 'data', 'text', { constraints: { min_length: 1, max_length: 300 } }),
    contentField('form.switch', 'checked', 'props', 'toggle', { default: false }),
    contentField('form.switch', 'name', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 64 } }),
    contentField('form.switch', 'size', 'props', 'choice', { ...advanced, choices: ['1/2', '1', '2'], default: '1' }),
  ]),
  contentEditor('form.select', [
    contentField('form.select', 'label', 'data', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('form.select', 'options', 'data', 'text', { constraints: { min_length: 1, max_length: 2000 } }),
    contentField('form.select', 'placeholder', 'data', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('form.select', 'required', 'props', 'toggle', { default: false }),
    contentField('form.select', 'name', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 64 } }),
    contentField('form.select', 'size', 'props', 'choice', { ...advanced, choices: ['1/2', '1', '2'], default: '1' }),
  ]),
  contentEditor('form.button-submit', [
    contentField('form.button-submit', 'text', 'data', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('form.button-submit', 'appearance', 'props', 'choice', { choices: ['default', 'tonal', 'outline'], default: 'default' }),
    contentField('form.button-submit', 'size', 'props', 'choice', { choices: ['1/2', '1', '2'], default: '1' }),
  ]),
  contentEditor('content.list', [
    contentField('content.list', 'ordered', 'props', 'toggle', { default: false }),
    contentField('content.list', 'start', 'props', 'integer', { ...advanced, constraints: { min: 1, max: 1000000 }, default: 1 }),
  ]),
  contentEditor('content.code', [
    contentField('content.code', 'lang', 'props', 'text', { constraints: { min_length: 1, max_length: 32 }, default: 'text' }),
    contentField('content.code', 'title', 'props', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('content.code', 'numbers', 'props', 'toggle', { ...advanced, default: false }),
  ]),
  contentEditor('content.table', [
    contentField('content.table', 'header', 'props', 'choice', { choices: ['row', 'column', 'both', 'none'], default: 'row' }),
  ]),
  // src is the one field the type requires besides alt: a host draws a
  // complete form from the manifest alone (simai/ui-source#64). The address
  // is a text field; validate applies the Document's URL rule on top.
  contentEditor('content.figure', [
    contentField('content.figure', 'src', 'data', 'text', { constraints: { min_length: 1, max_length: 2048 } }),
    contentField('content.figure', 'alt', 'data', 'text', { constraints: { min_length: 1, max_length: 1000 } }),
    contentField('content.figure', 'ratio', 'props', 'choice', { choices: ['auto', '1/1', '4/3', '3/2', '16/9', '21/9'], default: 'auto' }),
    contentField('content.figure', 'fit', 'props', 'choice', { choices: ['cover', 'contain'], default: 'cover' }),
  ]),
  contentEditor('content.alert', [
    contentField('content.alert', 'status', 'props', 'choice', { choices: ['neutral', 'info', 'success', 'warning', 'error'], default: 'neutral' }),
    contentField('content.alert', 'appearance', 'props', 'choice', { choices: ['default', 'outlined', 'flat'], default: 'default' }),
  ]),
  contentEditor('content.details', [
    contentField('content.details', 'open', 'props', 'toggle', { default: false }),
    contentField('content.details', 'layout', 'props', 'choice', { choices: ['surface', 'lines'], default: 'surface' }),
  ]),
  contentEditor('content.tabs', [
    contentField('content.tabs', 'label', 'data', 'text', { ...advanced, constraints: { min_length: 1, max_length: 120 } }),
  ]),
  contentEditor('content.tab', [
    contentField('content.tab', 'label', 'data', 'text', { constraints: { min_length: 1, max_length: 120 } }),
  ]),
  contentEditor('content.steps', [
    contentField('content.steps', 'current', 'props', 'integer', { constraints: { min: 1, max: 100 } }),
    contentField('content.steps', 'layout', 'props', 'choice', { choices: ['timeline', 'list'], default: 'timeline' }),
  ]),
  contentEditor('content.grid', [
    contentField('content.grid', 'columns', 'props', 'integer', { constraints: { min: 1, max: 4 }, default: 3 }),
    contentField('content.grid', 'gap', 'props', 'integer', { ...advanced, constraints: { min: 0, max: 4 }, default: 2 }),
  ]),
  contentEditor('content.card', [
    contentField('content.card', 'variant', 'props', 'choice', { choices: ['default', 'plain'], default: 'default' }),
  ]),
  contentEditor('content.media', [
    contentField('content.media', 'src', 'data', 'text', { constraints: { min_length: 1, max_length: 2048 } }),
    contentField('content.media', 'alt', 'data', 'text', { constraints: { min_length: 1, max_length: 1000 } }),
    contentField('content.media', 'side', 'props', 'choice', { choices: ['left', 'right'], default: 'right' }),
    contentField('content.media', 'ratio', 'props', 'choice', { choices: ['1/1', '4/3', '3/2', '16/9', '21/9'], default: '16/9' }),
  ]),
  contentEditor('content.file', [
    contentField('content.file', 'label', 'data', 'text', { constraints: { min_length: 1, max_length: 300 } }),
    contentField('content.file', 'href', 'data', 'text', { constraints: { min_length: 1, max_length: 2048 } }),
  ]),
  contentEditor('content.diagram', [
    contentField('content.diagram', 'title', 'props', 'text', { constraints: { min_length: 1, max_length: 200 } }),
    contentField('content.diagram', 'engine', 'props', 'choice', { ...advanced, choices: ['mermaid'], default: 'mermaid' }),
  ]),
  contentEditor('content.math', [
    contentField('content.math', 'label', 'props', 'text', { constraints: { min_length: 1, max_length: 200 } }),
  ]),
]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BUILTIN_TYPE_MANIFESTS);


/***/ },

/***/ "6f489cc65b77"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canonical: () => (/* binding */ canonical),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   stableStringify: () => (/* binding */ stableStringify)
/* harmony export */ });
function isPlainObject(value) {
  if (!value || Object.prototype.toString.call(value) !== '[object Object]') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
  }
  return value;
}

function stableStringify(value) {
  return JSON.stringify(canonical(value));
}




/***/ },

/***/ "76235de72516"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUILTIN_CATALOGUE: () => (/* binding */ BUILTIN_CATALOGUE),
/* harmony export */   BUILTIN_CATALOGUE_ALSO_IN: () => (/* binding */ BUILTIN_CATALOGUE_ALSO_IN),
/* harmony export */   BUILTIN_CATALOGUE_ICONS: () => (/* binding */ BUILTIN_CATALOGUE_ICONS),
/* harmony export */   CATALOGUE_GROUPS: () => (/* binding */ CATALOGUE_GROUPS),
/* harmony export */   CATALOGUE_GROUP_ALIASES: () => (/* binding */ CATALOGUE_GROUP_ALIASES),
/* harmony export */   CATALOGUE_GROUP_TABLE: () => (/* binding */ CATALOGUE_GROUP_TABLE),
/* harmony export */   CATALOGUE_TABS: () => (/* binding */ CATALOGUE_TABS),
/* harmony export */   SLOT_EXTRA_FIELDS: () => (/* binding */ SLOT_EXTRA_FIELDS),
/* harmony export */   catalogue: () => (/* binding */ catalogue),
/* harmony export */   catalogueEntry: () => (/* binding */ catalogueEntry),
/* harmony export */   catalogueGroup: () => (/* binding */ catalogueGroup),
/* harmony export */   entryGroups: () => (/* binding */ entryGroups),
/* harmony export */   groupAllowed: () => (/* binding */ groupAllowed),
/* harmony export */   instantiateVariant: () => (/* binding */ instantiateVariant),
/* harmony export */   slotAccepts: () => (/* binding */ slotAccepts),
/* harmony export */   slotPlaces: () => (/* binding */ slotPlaces),
/* harmony export */   validateCatalogueFields: () => (/* binding */ validateCatalogueFields)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
// The block catalogue: groups, tabs and variants of the types a registry holds
// (one block editor, owner 2026-11-03; ui-control
// control/ui-editor/UNIFIED-BLOCK-EDITOR.md, section 3). Additive to the type
// manifest: `catalogue` places a type in the catalogue, `variants` names its
// starting states, and a slot may say which groups it accepts.
//
// Three levels keep the catalogue small: a type is code (data, parameters,
// renderer), a variant is a named starting state of a type (parameters, child
// blocks, a preview), a saved block is a site's snapshot (the host's, not a
// manifest's). A new kind of header is a variant, not a type.



/**
 * The fixed groups, in catalogue order. A product adds its own group by its
 * namespace. Since the visual parity pass (2026-11-04) Elements (smart
 * elements a block prints) and Layout (sections, containers, grids) replace
 * Structure, which said nothing to an author.
 */
const CATALOGUE_GROUPS = Object.freeze(['text', 'media', 'elements', 'layout', 'page-parts', 'marketing', 'data', 'forms']);
/** Former group names a type may still give, and the group each now means (dated aliases). */
const CATALOGUE_GROUP_ALIASES = Object.freeze({ structure: Object.freeze({ group: 'layout', until: '2027-01-01' }) });
/**
 * Each fixed group's icon (a SIMAI Framework icon name) and word
 * (sf.composition.catalogue.group.<group>, editor-words.mjs): the catalogue's
 * sections draw an icon and a name from here.
 */
const CATALOGUE_GROUP_TABLE = Object.freeze({
  text: Object.freeze({ icon: 'notes', label_key: 'sf.composition.catalogue.group.text' }),
  media: Object.freeze({ icon: 'image', label_key: 'sf.composition.catalogue.group.media' }),
  elements: Object.freeze({ icon: 'interests', label_key: 'sf.composition.catalogue.group.elements' }),
  layout: Object.freeze({ icon: 'view_quilt', label_key: 'sf.composition.catalogue.group.layout' }),
  'page-parts': Object.freeze({ icon: 'web', label_key: 'sf.composition.catalogue.group.page_parts' }),
  marketing: Object.freeze({ icon: 'campaign', label_key: 'sf.composition.catalogue.group.marketing' }),
  data: Object.freeze({ icon: 'dataset', label_key: 'sf.composition.catalogue.group.data' }),
  forms: Object.freeze({ icon: 'edit_square', label_key: 'sf.composition.catalogue.group.forms' }),
});
/** The two tabs the catalogue opens on: what is written into a text flow, and what a page is built from. */
const CATALOGUE_TABS = Object.freeze(['text', 'blocks']);
const TEXT_TAB_GROUPS = new Set(['text', 'media']);
const CATALOGUE_FIELDS = new Set(['group', 'tab', 'label_key', 'help_key', 'keywords', 'preview', 'order', 'icon', 'also_in']);
const ALSO_IN_LIMIT = 8;
const ICON_NAME = /^[a-z0-9][a-z0-9_]{0,63}$/u;
const VARIANT_FIELDS = new Set(['id', 'label_key', 'preview', 'props', 'data', 'presentation', 'slots']);
const SLOT_EXTRA_FIELDS = new Set(['label_key', 'empty_key', 'groups']);
const STABLE_KEY = /^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)*$/u;
const VARIANT_ID = /^[a-z][a-z0-9-]{0,63}$/u;
const NODE_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$/u;

// The SIMAI Framework's own types in the catalogue. Their manifests carry no
// `catalogue` (their identities are pinned by the capability locks); a type
// listed as null stands only inside its parent or as a root and is not offered.
const BUILTIN_CATALOGUE = Object.freeze({
  'layout.page': null,
  'layout.section': 'layout',
  'layout.columns': 'layout',
  'layout.area': 'layout',
  'layout.container': 'layout',
  'layout.grid': 'layout',
  'layout.spacer': 'layout',
  'layout.regions': null,
  'layout.region': null,
  'layout.scope': null,
  'content.document': null,
  'content.heading': 'text',
  'content.paragraph': 'text',
  'content.list': 'text',
  'content.list-item': null,
  'content.quote': 'text',
  'content.code': 'text',
  'content.divider': 'elements',
  'content.alert': 'text',
  'content.math': 'text',
  'content.table': 'data',
  'content.figure': 'media',
  'content.media': 'media',
  'content.file': 'media',
  'content.html': 'media',
  'content.diagram': 'media',
  'content.details': 'text',
  'content.tabs': 'text',
  'content.tab': null,
  'content.steps': 'text',
  'content.step': null,
  'content.grid': 'layout',
  'content.card': 'elements',
  'content.outlet': null,
  'element.button': 'elements',
  'element.button-icon': 'elements',
  'element.badge': 'elements',
  'element.icon': 'elements',
  'form.form': 'forms',
  'form.input': 'forms',
  'form.textarea': 'forms',
  'form.checkbox': 'forms',
  'form.switch': 'forms',
  'form.select': 'forms',
  'form.button-submit': 'forms',
});

// The icon of each offered built-in type (a SIMAI Framework icon name, as the
// prototype draws the catalogue; a type's own catalogue.icon wins).
const BUILTIN_CATALOGUE_ICONS = Object.freeze({
  'layout.section': 'crop_landscape',
  'layout.columns': 'view_column',
  'layout.area': 'edit_note',
  'layout.container': 'width_normal',
  'layout.grid': 'grid_on',
  'layout.spacer': 'height',
  'content.heading': 'title',
  'content.paragraph': 'notes',
  'content.list': 'format_list_bulleted',
  'content.quote': 'format_quote',
  'content.code': 'code',
  'content.divider': 'horizontal_rule',
  'content.alert': 'info',
  'content.math': 'function',
  'content.table': 'table',
  'content.figure': 'image',
  'content.media': 'art_track',
  'content.file': 'download',
  'content.html': 'html',
  'content.diagram': 'schema',
  'content.details': 'expand_circle_down',
  'content.tabs': 'tab',
  'content.steps': 'format_list_numbered',
  'content.grid': 'grid_view',
  'content.card': 'crop_portrait',
  'element.button': 'smart_button',
  'element.button-icon': 'add_circle',
  'element.badge': 'label',
  'element.icon': 'star',
  'form.form': 'contact_mail',
  'form.input': 'input',
  'form.textarea': 'notes',
  'form.checkbox': 'check_box',
  'form.switch': 'toggle_on',
  'form.select': 'arrow_drop_down_circle',
  'form.button-submit': 'send',
});

// The further sections a built-in type stands in beside its own (type
// manifest 1.6.0, catalogue.also_in; the ui-editor host's G-20, 2026-11-04):
// as the prototype offers them, a button and a divider are written into a
// text flow as often as they are placed, so Text lists them too. A type's own
// catalogue.also_in wins.
const BUILTIN_CATALOGUE_ALSO_IN = Object.freeze({
  'element.button': Object.freeze(['text']),
  'content.divider': Object.freeze(['text']),
});

// Documents and manifests are JSON: a copy through JSON is a deep copy.
const clone = (value) => (value === undefined ? undefined : JSON.parse(JSON.stringify(value)));
const diagnostic = (code, path, message) => ({ code, path, message });
const namespaceOf = (type) => String(type || '').split('.')[0];

/** Whether a group name may stand in a type's catalogue entry: a fixed group, or the type's own namespace. */
function groupAllowed(group, type) {
  return CATALOGUE_GROUPS.includes(group) || Object.hasOwn(CATALOGUE_GROUP_ALIASES, group) || (typeof group === 'string' && group === namespaceOf(type));
}

/** The group a name stands for now: a dated alias gives its new group. */
function catalogueGroup(group) {
  return typeof group === 'string' && Object.hasOwn(CATALOGUE_GROUP_ALIASES, group) ? CATALOGUE_GROUP_ALIASES[group].group : group;
}

/**
 * A type's catalogue entry, or null when the type is not offered:
 * {type, group, also_in, tab, icon?, label_key?, help_key?, keywords, preview?, order, variants}.
 * A product type without `catalogue` falls into its namespace's group.
 * also_in (type manifest 1.6.0) are the further groups it stands in, each
 * once, never its own group; a dated alias gives its new group.
 */
function catalogueEntry(manifest) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest)) return null;
  const own = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest.catalogue) ? manifest.catalogue : null;
  let group = own?.group;
  if (group === undefined) {
    if (Object.hasOwn(BUILTIN_CATALOGUE, manifest.type)) group = BUILTIN_CATALOGUE[manifest.type];
    else group = namespaceOf(manifest.type);
  }
  if (!group) return null;
  group = catalogueGroup(group);
  const icon = own?.icon ?? BUILTIN_CATALOGUE_ICONS[manifest.type];
  const tab = own?.tab ?? (TEXT_TAB_GROUPS.has(group) ? 'text' : 'blocks');
  const also = Array.isArray(own?.also_in) ? own.also_in : BUILTIN_CATALOGUE_ALSO_IN[manifest.type] ?? [];
  const alsoIn = [...new Set(also.filter((name) => typeof name === 'string').map(catalogueGroup))].filter((name) => name !== group && groupAllowed(name, manifest.type));
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({
    type: manifest.type,
    version: manifest.version,
    group,
    also_in: alsoIn,
    tab,
    ...(icon ? { icon } : {}),
    ...(own?.label_key ? { label_key: own.label_key } : {}),
    ...(own?.help_key ? { help_key: own.help_key } : {}),
    keywords: (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(own?.keywords) ? own.keywords : {},
    ...(own?.preview ? { preview: own.preview } : {}),
    order: Number.isInteger(own?.order) ? own.order : 500,
    variants: (Array.isArray(manifest.variants) ? manifest.variants : []).map((variant) => ({
      id: variant.id,
      label_key: variant.label_key,
      ...(variant.preview ? { preview: variant.preview } : {}),
    })),
  });
}

/** The groups a catalogue entry stands in: its own first, then also_in. */
function entryGroups(entry) {
  return entry ? [entry.group, ...(Array.isArray(entry.also_in) ? entry.also_in : [])] : [];
}

/**
 * The catalogue of a registry: every offered type, by tab and group, in order.
 * With `{parent, slot}` only the types that place accepts (hidden, not
 * greyed: a mail column accepts no video); a tab with nothing is left out.
 *
 * `sections` (type manifest 1.6.0) is the one list of the editor's library,
 * the + and /: [{group, count, entries}], the fixed groups in their order,
 * then a product's own; a type stands in its group and in each also_in
 * group, so a section's count is the types it lists; a section with nothing
 * is left out. `entries` keeps each type once (a search names it once, under
 * its own group); `tabs` places it by its own group only.
 */
function catalogue(registry, place = {}) {
  const types = registry?.types instanceof Map ? [...registry.types.values()] : [];
  let entries = types.map(catalogueEntry).filter(Boolean);
  if (place.parent) {
    const parent = registry.types.get(place.parent);
    entries = entries.filter((entry) => slotAccepts(registry, parent, place.slot ?? 'default', entry.type));
  }
  if (place.profile) entries = entries.filter((entry) => registry.types.get(entry.type).profiles.includes(place.profile));
  entries.sort((left, right) => left.order - right.order || left.type.localeCompare(right.type));
  const tabs = {};
  const byGroup = new Map();
  for (const entry of entries) {
    tabs[entry.tab] ||= {};
    (tabs[entry.tab][entry.group] ||= []).push(entry);
    for (const group of entryGroups(entry)) {
      if (!byGroup.has(group)) byGroup.set(group, []);
      byGroup.get(group).push(entry);
    }
  }
  const order = [...CATALOGUE_GROUPS, ...[...byGroup.keys()].filter((group) => !CATALOGUE_GROUPS.includes(group))];
  const sections = order.filter((group) => byGroup.has(group)).map((group) => ({ group, count: byGroup.get(group).length, entries: byGroup.get(group) }));
  return { entries, tabs, sections };
}

/**
 * Whether a slot of a type accepts a child type: its `types`, its
 * `categories` and, when it declares them, its catalogue `groups`.
 */
function slotAccepts(registry, parentManifest, slotName, childType) {
  const slot = parentManifest?.slots?.[slotName];
  const child = registry?.types instanceof Map ? registry.types.get(childType) : undefined;
  if (!slot || !child) return false;
  if (parentManifest.mode === 'leaf') return false;
  if (slot.types && !slot.types.includes(childType)) return false;
  if (slot.categories && !slot.categories.includes(child.category)) return false;
  if (slot.groups) {
    // A type stands in its group and its also_in groups: a slot that takes
    // one of them takes it.
    const entry = catalogueEntry(child);
    const wanted = slot.groups.map(catalogueGroup);
    if (!entry || !entryGroups(entry).some((group) => wanted.includes(group))) return false;
  }
  return true;
}

/** The named places of a type: each slot with what it accepts and its words. */
function slotPlaces(manifest) {
  return Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest?.slots) ? manifest.slots : {}).map(([name, slot]) => (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({
    name,
    min: slot.min,
    max: slot.max,
    ...(slot.types ? { types: slot.types } : {}),
    ...(slot.categories ? { categories: slot.categories } : {}),
    ...(slot.groups ? { groups: slot.groups } : {}),
    ...(slot.label_key ? { label_key: slot.label_key } : {}),
    ...(slot.empty_key ? { empty_key: slot.empty_key } : {}),
  }));
}

function cloneWithIds(node, map, makeId) {
  const next = { ...node, id: makeId(node.id) };
  map.set(node.id, next.id);
  if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.slots)) {
    next.slots = Object.fromEntries(Object.entries(node.slots).map(([name, children]) => [name, (children || []).map((child) => cloneWithIds(child, map, makeId))]));
  }
  return next;
}

function rewriteLinks(node, map) {
  if (Array.isArray(node.bindings)) {
    node.bindings = node.bindings.map((binding) => {
      if (binding.owner !== 'section' || typeof binding.ref !== 'string') return binding;
      const [from, state] = binding.ref.split('#');
      return map.has(from) ? { ...binding, ref: `${map.get(from)}#${state}` } : binding;
    });
  }
  for (const children of Object.values(node.slots || {})) for (const child of children) rewriteLinks(child, map);
}

/**
 * A node made from a type's variant, ready to insert: the variant's props,
 * data, presentation and child blocks, every child with a new id
 * (`<id>-<variant child id>` unless `makeId` says otherwise) and the runtime
 * links between them rewritten to the new ids.
 */
function instantiateVariant(manifest, variantId, options = {}) {
  const variant = (manifest?.variants || []).find((entry) => entry.id === variantId);
  if (!variant) throw new TypeError(`composition_variant_unknown:${manifest?.type}:${variantId}`);
  const id = options.id ?? `${namespaceOf(manifest.type)}-${variantId}`;
  const makeId = options.makeId ?? ((childId) => `${id}-${childId}`);
  const source = clone({
    id,
    type: manifest.type,
    ...(variant.props ? { props: variant.props } : {}),
    ...(variant.data ? { data: variant.data } : {}),
    ...(variant.presentation ? { presentation: variant.presentation } : {}),
    ...(variant.slots ? { slots: variant.slots } : {}),
  });
  const map = new Map();
  const node = { ...source };
  if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(source.slots)) {
    node.slots = Object.fromEntries(Object.entries(source.slots).map(([name, children]) => [name, children.map((child) => cloneWithIds(child, map, makeId))]));
  }
  rewriteLinks(node, map);
  return node;
}

/** The problems of a type manifest's catalogue, variants and slot words (validate decides whether each variant is a valid node). */
function validateCatalogueFields(manifest) {
  const diagnostics = [];
  if (manifest.catalogue !== undefined) {
    const entry = manifest.catalogue;
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry)) diagnostics.push(diagnostic('catalogue_invalid', '$.catalogue', 'catalogue is an object'));
    else {
      for (const key of Object.keys(entry)) if (!CATALOGUE_FIELDS.has(key)) diagnostics.push(diagnostic('catalogue_invalid', `$.catalogue.${key}`, `Unknown catalogue field ${key}`));
      if (!groupAllowed(entry.group, manifest.type)) diagnostics.push(diagnostic('catalogue_group_unknown', '$.catalogue.group', `A group is one of ${CATALOGUE_GROUPS.join(', ')}, or the type's namespace ${namespaceOf(manifest.type)}`));
      if (entry.tab !== undefined && !CATALOGUE_TABS.includes(entry.tab)) diagnostics.push(diagnostic('catalogue_tab_unknown', '$.catalogue.tab', 'A tab is text or blocks'));
      for (const key of ['label_key', 'help_key']) if (entry[key] !== undefined && !STABLE_KEY.test(entry[key])) diagnostics.push(diagnostic('catalogue_word_invalid', `$.catalogue.${key}`, 'A word is a stable key'));
      if (entry.keywords !== undefined && (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry.keywords) || Object.entries(entry.keywords).some(([locale, words]) => !/^[a-z]{2,8}$/u.test(locale) || !Array.isArray(words) || words.length > 20 || words.some((word) => typeof word !== 'string' || !word || word.length > 60)))) {
        diagnostics.push(diagnostic('catalogue_keywords_invalid', '$.catalogue.keywords', 'keywords are up to 20 words per locale'));
      }
      if (entry.order !== undefined && (!Number.isInteger(entry.order) || entry.order < 0 || entry.order > 1000)) diagnostics.push(diagnostic('catalogue_order_invalid', '$.catalogue.order', 'order is 0 to 1000'));
      if (entry.icon !== undefined && (typeof entry.icon !== 'string' || !ICON_NAME.test(entry.icon))) diagnostics.push(diagnostic('catalogue_icon_invalid', '$.catalogue.icon', 'icon is a SIMAI Framework icon name'));
      if (entry.preview !== undefined && (typeof entry.preview !== 'string' || !entry.preview || entry.preview.length > 2048)) diagnostics.push(diagnostic('catalogue_preview_invalid', '$.catalogue.preview', 'preview is an image address'));
      if (entry.also_in !== undefined) {
        const list = entry.also_in;
        if (!Array.isArray(list) || !list.length || list.length > ALSO_IN_LIMIT || new Set(list).size !== list.length) diagnostics.push(diagnostic('catalogue_also_in_invalid', '$.catalogue.also_in', `also_in is a list of 1 to ${ALSO_IN_LIMIT} different groups`));
        else list.forEach((group, index) => {
          if (!groupAllowed(group, manifest.type)) diagnostics.push(diagnostic('catalogue_group_unknown', `$.catalogue.also_in[${index}]`, `A group is one of ${CATALOGUE_GROUPS.join(', ')}, or the type's namespace ${namespaceOf(manifest.type)}`));
          else if (catalogueGroup(group) === catalogueGroup(entry.group)) diagnostics.push(diagnostic('catalogue_also_in_invalid', `$.catalogue.also_in[${index}]`, 'also_in names groups other than the type\'s own'));
        });
      }
    }
  }
  if (manifest.variants !== undefined) {
    if (!Array.isArray(manifest.variants) || manifest.variants.length > 50) diagnostics.push(diagnostic('variants_invalid', '$.variants', 'variants is a list of up to 50'));
    else {
      const ids = new Set();
      manifest.variants.forEach((variant, index) => {
        const at = `$.variants[${index}]`;
        if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(variant)) return diagnostics.push(diagnostic('variant_invalid', at, 'A variant is an object'));
        for (const key of Object.keys(variant)) if (!VARIANT_FIELDS.has(key)) diagnostics.push(diagnostic('variant_invalid', `${at}.${key}`, `Unknown variant field ${key}`));
        if (!VARIANT_ID.test(variant.id ?? '')) diagnostics.push(diagnostic('variant_id_invalid', `${at}.id`, 'A variant id is lowercase words joined by hyphens'));
        else if (ids.has(variant.id)) diagnostics.push(diagnostic('variant_id_duplicate', `${at}.id`, `Duplicate variant ${variant.id}`));
        else ids.add(variant.id);
        if (!STABLE_KEY.test(variant.label_key ?? '')) diagnostics.push(diagnostic('variant_word_invalid', `${at}.label_key`, 'A variant names its word'));
        if (variant.preview !== undefined && (typeof variant.preview !== 'string' || !variant.preview)) diagnostics.push(diagnostic('variant_preview_invalid', `${at}.preview`, 'preview is an image address'));
        const childIds = new Set();
        const visit = (node, path) => {
          if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node) || !NODE_ID.test(node.id ?? '')) return diagnostics.push(diagnostic('variant_child_invalid', path, 'A child block is a node with an id'));
          if (childIds.has(node.id)) diagnostics.push(diagnostic('variant_child_id_duplicate', `${path}.id`, `Duplicate child id ${node.id}`));
          childIds.add(node.id);
          for (const [name, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.slots) ? node.slots : {})) (children || []).forEach((child, at2) => visit(child, `${path}.slots.${name}[${at2}]`));
          return undefined;
        };
        for (const [name, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(variant.slots) ? variant.slots : {})) (Array.isArray(children) ? children : []).forEach((child, at2) => visit(child, `${at}.slots.${name}[${at2}]`));
      });
    }
  }
  for (const [name, slot] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest.slots) ? manifest.slots : {})) {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(slot)) continue;
    for (const key of ['label_key', 'empty_key']) if (slot[key] !== undefined && !STABLE_KEY.test(slot[key])) diagnostics.push(diagnostic('slot_word_invalid', `$.slots.${name}.${key}`, 'A word is a stable key'));
    if (slot.groups !== undefined && (!Array.isArray(slot.groups) || !slot.groups.length || slot.groups.some((group) => typeof group !== 'string' || !/^[a-z][a-z0-9-]*$/u.test(group)))) diagnostics.push(diagnostic('slot_groups_invalid', `$.slots.${name}.groups`, 'groups is a list of catalogue groups'));
  }
  return diagnostics;
}




/***/ },

/***/ "e2cb52b018e5"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMPOSED_EXTENSION: () => (/* binding */ COMPOSED_EXTENSION),
/* harmony export */   COMPOSED_RENDERER: () => (/* binding */ COMPOSED_RENDERER),
/* harmony export */   MAX_COMPOSED_DEPTH: () => (/* binding */ MAX_COMPOSED_DEPTH),
/* harmony export */   composedEditorManifest: () => (/* binding */ composedEditorManifest),
/* harmony export */   composedInstance: () => (/* binding */ composedInstance),
/* harmony export */   composedPart: () => (/* binding */ composedPart),
/* harmony export */   composedTextPaths: () => (/* binding */ composedTextPaths),
/* harmony export */   defineComposedType: () => (/* binding */ defineComposedType),
/* harmony export */   expandComposed: () => (/* binding */ expandComposed),
/* harmony export */   instanceVersion: () => (/* binding */ instanceVersion),
/* harmony export */   isComposed: () => (/* binding */ isComposed),
/* harmony export */   textFields: () => (/* binding */ textFields),
/* harmony export */   upgradeComposed: () => (/* binding */ upgradeComposed),
/* harmony export */   validateComposedInstance: () => (/* binding */ validateComposedInstance)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac24888e7d3e");
// Site blocks: a type made of existing blocks (one block editor, owner
// 2026-11-03; ui-control control/ui-editor/UNIFIED-BLOCK-EDITOR.md, section 6).
//
// The block builder composes a tree of existing blocks, marks the parameters
// an author may set (`exposed`: a key, the path of a node in the tree and the
// target there), and saves it as a type with a version (`site.*` in a site's
// catalogue). On a page the block is closed: an instance is its type, the
// version it was written against, and what differs -- the exposed values in
// `props` and the texts by path in `data.texts`. A new version of the type
// reaches every instance, because the tree is read from the type; the
// author's texts and values stay. upgradeComposed moves an instance to the
// current version and reports what the new version no longer has.
//
// Nothing here is a new Document format: an instance is a node of
// composition-document v1 and the type is a type manifest with two more
// fields (`composed`, `exposed`).




const COMPOSED_EXTENSION = 'simai.composition:composed';
const COMPOSED_RENDERER = 'composed';
const MAX_COMPOSED_DEPTH = 8;
const KEY = /^[a-z][a-z0-9_]{0,31}$/u;
const TEXT_PATH = /^([A-Za-z0-9][A-Za-z0-9._:-]{0,119})\/([a-z][a-z0-9_]{0,31})$/u;
const VERSION = /^[0-9]+\.[0-9]+\.[0-9]+$/u;

// The inline text of the SIMAI Framework's types, by field: what an author
// writes in a site block. A product type's text is any data field holding
// inline content (an array of the inline model's entries).
const TEXT_FIELDS = Object.freeze({
  'content.heading': ['content'],
  'content.paragraph': ['content'],
  'content.list-item': ['content'],
  'content.alert': ['title'],
  'content.step': ['title'],
  'content.details': ['summary'],
  'content.figure': ['caption'],
});

// Documents and manifests are JSON: a copy through JSON is a deep copy.
const clone = (value) => (value === undefined ? undefined : JSON.parse(JSON.stringify(value)));
const diagnostic = (code, path, message, details = {}) => ({ code, path, message, ...details });

const isComposed = (manifest) => (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest?.composed) && (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest.composed.root);

/** The text fields of a type: inline content an author writes. */
function textFields(manifest) {
  if (!manifest) return [];
  if (Object.hasOwn(TEXT_FIELDS, manifest.type)) return TEXT_FIELDS[manifest.type];
  const properties = manifest.data_schema?.properties || {};
  return Object.keys(properties).filter((key) => properties[key]?.type === 'array' && Array.isArray(properties[key]?.items?.oneOf));
}

function walk(node, visit, path = []) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node)) return;
  visit(node, path);
  for (const [slot, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.slots) ? node.slots : {})) {
    (Array.isArray(children) ? children : []).forEach((child, index) => walk(child, visit, [...path, slot, index]));
  }
}

function nodeById(root, id) {
  let found = null;
  walk(root, (node) => { if (!found && node.id === id) found = node; });
  return found;
}

/** Every text path of a site block: `<node id>/<field>`, in tree order. */
function composedTextPaths(manifest, registry) {
  if (!isComposed(manifest)) return [];
  const paths = [];
  walk(manifest.composed.root, (node) => {
    for (const field of textFields(registry?.types?.get(node.type))) paths.push(`${node.id}/${field}`);
  });
  return paths;
}

/** The version a node of a site block was written against, or null when it says none. */
function instanceVersion(node) {
  const entry = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node?.extensions) ? node.extensions[COMPOSED_EXTENSION] : undefined;
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry) && typeof entry.version === 'string' ? entry.version : null;
}

const compareVersions = (left, right) => {
  const a = left.split('.').map(Number);
  const b = right.split('.').map(Number);
  for (let index = 0; index < 3; index += 1) if (a[index] !== b[index]) return a[index] < b[index] ? -1 : 1;
  return 0;
};

/**
 * Makes the type manifest of a site block from what the builder saved:
 * {type, version, category?, profiles, catalogue?, root, exposed}. The
 * parameters an author sees take the schema of their target; their default is
 * the value the tree holds. `validateDocument(document, registry)` checks the
 * tree as a Document. Returns {manifest, diagnostics}.
 */
function defineComposedType(definition, registry, validateDocument) {
  const diagnostics = [];
  const push = (code, path, message) => diagnostics.push(diagnostic(code, path, message));
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(definition)) return { manifest: null, diagnostics: [diagnostic('composed_definition_invalid', '$', 'A site block is an object')] };
  const { type, version, root } = definition;
  if (typeof type !== 'string' || !/^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/u.test(type)) push('composed_type_invalid', '$.type', 'A type is <owner>.<name>');
  if (registry?.types?.has(type) && !isComposed(registry.types.get(type))) push('composed_type_taken', '$.type', `${type} is a type of code, not a site block`);
  if (typeof version !== 'string' || !VERSION.test(version)) push('composed_version_invalid', '$.version', 'A version is major.minor.patch');
  const profiles = Array.isArray(definition.profiles) && definition.profiles.length ? definition.profiles : ['ui-layout'];
  const category = definition.category ?? 'layout';
  if (!['layout', 'content', 'component', 'smart'].includes(category)) push('composed_category_invalid', '$.category', 'A category is layout, content, component or smart');
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(root)) push('composed_root_missing', '$.root', 'A site block is a tree of blocks');
  if (diagnostics.length) return { manifest: null, diagnostics };

  const tree = clone(root);
  walk(tree, (node, path) => {
    if (node.type === type) push('composed_cycle', `$.root${path.length ? `.slots.${path.join('.')}` : ''}`, 'A site block cannot hold itself');
  });
  const probe = { ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.document', 1), id: 'composed-probe', profile: profiles[0], root: tree };
  if (typeof validateDocument === 'function') {
    const checked = validateDocument(probe, registry);
    for (const entry of checked.diagnostics) diagnostics.push({ ...entry, path: entry.path.replace(/^\$\.root/u, '$.root') });
  }

  const exposed = Array.isArray(definition.exposed) ? definition.exposed : [];
  const properties = {};
  const keys = new Set();
  if (exposed.length > 50) push('composed_exposed_limit', '$.exposed', 'A site block exposes at most 50 parameters');
  exposed.forEach((entry, index) => {
    const at = `$.exposed[${index}]`;
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry)) return push('composed_exposed_invalid', at, 'An exposed parameter is {key, path, target}');
    for (const field of Object.keys(entry)) if (!['key', 'path', 'target', 'label_key'].includes(field)) push('composed_exposed_invalid', `${at}.${field}`, `Unknown field ${field}`);
    if (!KEY.test(entry.key ?? '')) return push('composed_exposed_key_invalid', `${at}.key`, 'A key is a lowercase name');
    if (keys.has(entry.key)) return push('composed_exposed_key_duplicate', `${at}.key`, `Duplicate key ${entry.key}`);
    keys.add(entry.key);
    const node = nodeById(tree, entry.path);
    if (!node) return push('composed_exposed_path_unknown', `${at}.path`, `No block ${entry.path} in the tree`);
    const match = /^(props|data)\.([a-z][a-z0-9_]*)$/u.exec(entry.target ?? '');
    if (!match) return push('composed_exposed_target_invalid', `${at}.target`, 'A target is props.<name> or data.<name>');
    const target = registry?.types?.get(node.type);
    const schema = target?.[match[1] === 'props' ? 'props_schema' : 'data_schema']?.properties?.[match[2]];
    if (!schema) return push('composed_exposed_target_unknown', `${at}.target`, `${node.type} has no ${entry.target}`);
    const current = node[match[1]]?.[match[2]];
    properties[entry.key] = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({ ...schema, ...(current !== undefined && typeof current !== 'object' ? { default: current } : {}) });
    return undefined;
  });
  if (diagnostics.length) return { manifest: null, diagnostics };

  const assets = new Set(definition.assets || []);
  walk(tree, (node) => { for (const asset of registry?.types?.get(node.type)?.assets || []) assets.add(asset); });
  const manifest = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.type-manifest', 1),
    type,
    version,
    category,
    mode: 'leaf',
    profiles,
    data_schema: { type: 'object', additionalProperties: false, properties: { texts: { type: 'object' } } },
    props_schema: { type: 'object', additionalProperties: false, properties },
    presentation: { views: ['default'], presets: [], modifiers: [] },
    slots: {},
    renderer: { kind: 'builtin', name: COMPOSED_RENDERER },
    assets: [...assets].sort(),
    capabilities: ['html', 'composed'],
    ...(definition.catalogue ? { catalogue: definition.catalogue } : {}),
    composed: { root: tree },
    exposed: exposed.map(({ key, path, target, label_key: label }) => ({ key, path, target, ...(label ? { label_key: label } : {}) })),
  });
  return { manifest, diagnostics };
}

/**
 * A site block's parameter form (dispatcher decision 2026-11-03): a site
 * block has no editor manifest of its own. Its form is its `exposed` list,
 * each entry taking the field the target type's editor manifest declares for
 * that target, renamed to the exposed key and pointed at the instance's
 * `props.<key>`. The words are the exposed label_key, else the target field's.
 * `editorManifests` are the editor manifests a host knows (builtin and
 * product). Returns {manifest, origins, diagnostics}: an editor manifest
 * (editor-manifest v1, unchanged) of the site block's version, made fresh from
 * the type each time and never stored, and for each field key the block and
 * target it edits ({path, type, target}).
 */
function composedEditorManifest(manifest, registry, editorManifests) {
  const diagnostics = [];
  if (!isComposed(manifest)) return { manifest: null, origins: {}, diagnostics: [diagnostic('composed_type_required', '$', 'Not a site block')] };
  const byType = new Map((editorManifests || []).map((entry) => [`${entry.type}@${entry.type_version}`, entry]));
  const fields = [];
  const origins = {};
  (manifest.exposed || []).forEach((entry, index) => {
    const at = `$.exposed[${index}]`;
    const node = nodeById(manifest.composed.root, entry.path);
    const target = node && registry?.types?.get(node.type);
    if (!target) return diagnostics.push(diagnostic('composed_exposed_path_unknown', at, `No block ${entry.path} in the tree`));
    const editor = byType.get(`${target.type}@${target.version}`);
    const [plane, name] = String(entry.target).split('.');
    const field = editor?.fields?.find((candidate) => candidate.plane === plane && candidate.target === name);
    if (!field) return diagnostics.push(diagnostic('composed_editor_field_missing', at, `${target.type}@${target.version} declares no editor field for ${entry.target}; the parameter has no form field`, { key: entry.key }));
    const value = node[plane]?.[name];
    fields.push((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({
      ...field,
      key: entry.key,
      plane: 'props',
      target: entry.key,
      ...(entry.label_key ? { label_key: entry.label_key } : {}),
      ...(value !== undefined && typeof value !== 'object' ? { default: value } : {}),
      capability_hints: [`composition.props.${entry.key}`],
    }));
    origins[entry.key] = { path: entry.path, type: target.type, target: entry.target };
    return undefined;
  });
  return {
    manifest: (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({ ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.editor-manifest', 1), type: manifest.type, type_version: manifest.version, fields }),
    origins,
    diagnostics,
  };
}

/** A new instance of a site block: its type and version, nothing that differs yet. */
function composedInstance(manifest, id) {
  return { id, type: manifest.type, extensions: { [COMPOSED_EXTENSION]: { version: manifest.version } } };
}

/**
 * The problems of an instance's texts and the notices of what the current
 * version no longer has. `checkInline(content, path, diagnostics)` holds a
 * text to the inline model and the Document's URL rule.
 */
function validateComposedInstance(node, manifest, registry, path, checkInline) {
  const diagnostics = [];
  const notices = [];
  const texts = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.data?.texts) ? node.data.texts : {};
  const known = new Set(composedTextPaths(manifest, registry));
  for (const [key, content] of Object.entries(texts)) {
    const at = `${path}.data.texts.${key}`;
    if (!TEXT_PATH.test(key)) {
      diagnostics.push(diagnostic('composed_text_path_invalid', at, 'A text is keyed <node id>/<field>'));
      continue;
    }
    checkInline(content, at, diagnostics);
    if (!known.has(key)) notices.push(diagnostic('composed_text_orphaned', at, `${manifest.type} ${manifest.version} has no text ${key}; it is kept and not drawn`));
  }
  const version = instanceVersion(node);
  const entry = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.extensions) ? node.extensions[COMPOSED_EXTENSION] : undefined;
  if (entry !== undefined && (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry) || !VERSION.test(entry.version ?? ''))) diagnostics.push(diagnostic('composed_version_invalid', `${path}.extensions.${COMPOSED_EXTENSION}`, 'An instance names the version it was written against'));
  else if (version && compareVersions(version, manifest.version) > 0) notices.push(diagnostic('composed_version_newer', `node:${node.id}`, `Written against ${manifest.type} ${version}; this site has ${manifest.version}`));
  else if (version && version !== manifest.version) notices.push(diagnostic('composed_version_behind', `node:${node.id}`, `Written against ${version}; drawn with ${manifest.version} (upgradeComposed moves it)`));
  return { diagnostics, notices };
}

/**
 * The tree an instance draws: the type's current tree, with the instance's
 * exposed values and texts in place. The root takes the instance's id; every
 * other block `<instance id>:<tree id>`, so an editor maps a click back to a
 * text path and the instance stays one node in the Document.
 */
function expandComposed(node, manifest) {
  const tree = clone(manifest.composed.root);
  const ids = new Map();
  walk(tree, (child) => { ids.set(child, child.id); });
  const props = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.props) ? node.props : {};
  for (const entry of manifest.exposed || []) {
    if (!(entry.key in props)) continue;
    const target = nodeById(tree, entry.path);
    const [plane, name] = entry.target.split('.');
    if (target) target[plane] = { ...(target[plane] || {}), [name]: clone(props[entry.key]) };
  }
  const texts = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.data?.texts) ? node.data.texts : {};
  for (const [key, content] of Object.entries(texts)) {
    const match = TEXT_PATH.exec(key);
    const target = match && nodeById(tree, match[1]);
    if (target) target.data = { ...(target.data || {}), [match[2]]: clone(content) };
  }
  const drawnId = (id) => (id === manifest.composed.root.id ? node.id : `${node.id}:${id}`);
  walk(tree, (child) => {
    child.id = drawnId(ids.get(child));
    // A runtime link inside the block follows the ids (data.mjs: owner section).
    if (Array.isArray(child.bindings)) {
      child.bindings = child.bindings.map((binding) => {
        if (binding?.owner !== 'section' || typeof binding.ref !== 'string' || !binding.ref.includes('#')) return binding;
        const [from, state] = binding.ref.split('#');
        return [...ids.values()].includes(from) ? { ...binding, ref: `${drawnId(from)}#${state}` } : binding;
      });
    }
  });
  if (node.extensions) {
    const rest = Object.fromEntries(Object.entries(node.extensions).filter(([key]) => key !== COMPOSED_EXTENSION));
    if (Object.keys(rest).length) tree.extensions = { ...(tree.extensions || {}), ...rest };
  }
  return tree;
}

/** The tree id and text path a drawn id of an instance stands for: {instance, node, root}. */
function composedPart(drawnId) {
  const at = String(drawnId).indexOf(':');
  return at === -1 ? { instance: drawnId, node: null, root: true } : { instance: drawnId.slice(0, at), node: drawnId.slice(at + 1), root: false };
}

/**
 * Moves every instance of a site block in a Document to the type's current
 * version: texts whose block is gone and values the version no longer takes
 * are dropped and reported; everything else stays. `checkValue(value,
 * schema)` says whether a value fits a schema. Returns {document, changes}.
 */
function upgradeComposed(document, registry, checkValue) {
  const next = clone(document);
  const changes = [];
  const visit = (node) => {
    const manifest = registry.types.get(node.type);
    if (isComposed(manifest)) {
      const from = instanceVersion(node);
      const dropped = { texts: [], values: [] };
      const known = new Set(composedTextPaths(manifest, registry));
      if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.data?.texts)) {
        for (const key of Object.keys(node.data.texts)) if (!known.has(key)) { dropped.texts.push(key); delete node.data.texts[key]; }
        if (!Object.keys(node.data.texts).length) delete node.data.texts;
        if (node.data && !Object.keys(node.data).length) delete node.data;
      }
      if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.props)) {
        for (const [key, value] of Object.entries(node.props)) {
          const schema = manifest.props_schema.properties[key];
          if (!schema || !checkValue(value, schema)) { dropped.values.push(key); delete node.props[key]; }
        }
        if (!Object.keys(node.props).length) delete node.props;
      }
      if (from !== manifest.version || dropped.texts.length || dropped.values.length) {
        node.extensions = { ...(node.extensions || {}), [COMPOSED_EXTENSION]: { version: manifest.version } };
        changes.push({ id: node.id, type: node.type, from, to: manifest.version, dropped });
      }
    }
    for (const children of Object.values(node.slots || {})) for (const child of children) visit(child);
  };
  if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(next.root)) visit(next.root);
  return { document: next, changes };
}


/***/ },

/***/ "c6b53a101be9"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BINDING_STATES: () => (/* binding */ BINDING_STATES),
/* harmony export */   DATA_EXTENSION: () => (/* binding */ DATA_EXTENSION),
/* harmony export */   DATA_SHAPES: () => (/* binding */ DATA_SHAPES),
/* harmony export */   RUNTIME_OWNER: () => (/* binding */ RUNTIME_OWNER),
/* harmony export */   SOURCE_PORT: () => (/* binding */ SOURCE_PORT),
/* harmony export */   bindingSettings: () => (/* binding */ bindingSettings),
/* harmony export */   checkSourceAnswer: () => (/* binding */ checkSourceAnswer),
/* harmony export */   createShapeRegistry: () => (/* binding */ createShapeRegistry),
/* harmony export */   demoData: () => (/* binding */ demoData),
/* harmony export */   normalizeShapes: () => (/* binding */ normalizeShapes),
/* harmony export */   resolveData: () => (/* binding */ resolveData),
/* harmony export */   shapeFields: () => (/* binding */ shapeFields),
/* harmony export */   takesData: () => (/* binding */ takesData),
/* harmony export */   validateDataDeclarations: () => (/* binding */ validateDataDeclarations),
/* harmony export */   validateDataRules: () => (/* binding */ validateDataRules)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac24888e7d3e");
// Data for blocks: shapes, host bindings, the source port and runtime links
// (one block editor, owner 2026-11-03; ui-control
// control/ui-editor/UNIFIED-BLOCK-EDITOR.md, section 5).
//
// The rule: a block never fetches. A type says which shape of data it takes
// (`data_bindings` in its manifest); the host says where the data comes from.
// The node's `bindings` (composition-document v1) carry {owner, ref, target,
// revision}; what the host needs beside them (the shape, the field mapping,
// filter, sort, limit, the page parameter, the empty text) is the node's
// extension `simai.composition:data`, keyed by the binding's target, and only
// the host reads the query. A list and its pagination are linked by a runtime
// binding: owner `section`, ref `<list node id>#<state>`, resolved by the
// runtime inside the same section, never by the host.




const DATA_EXTENSION = 'simai.composition:data';
const RUNTIME_OWNER = 'section';
/** What a data block draws: the host's answer is on its way, empty, failed, real, or demo data in the editor. */
const BINDING_STATES = Object.freeze(['loading', 'empty', 'error', 'ready', 'preview']);
const SETTINGS_FIELDS = new Set(['shape', 'preset', 'mapping', 'filter', 'sort', 'limit', 'page_param', 'params', 'empty_text']);
const PARAM_SOURCES = new Set(['url', 'context', 'route']);
const NAME = /^[a-z][a-z0-9_]{0,31}$/u;
const MAX_FILTER_BYTES = 4000;

const text = (maxLength, minLength = 0) => ({ type: 'string', ...(minLength ? { minLength } : {}), maxLength });
const closed = (properties, required = []) => ({ type: 'object', ...(required.length ? { required } : {}), additionalProperties: false, properties });
const image = closed({ src: text(2048, 1), alt: text(1000) }, ['src']);
const item = closed({
  id: text(120, 1),
  title: text(500, 1),
  text: text(5000),
  url: text(2048, 1),
  image,
  date: text(40, 1),
  badge: text(60, 1),
}, ['title']);
const link = closed({ label: text(200, 1), url: text(2048, 1), active: { type: 'boolean' } }, ['label', 'url']);

// The data shapes of the SIMAI Framework: small named contracts a block takes
// and a host answers with (bx-simai.layout calls them view types). A host
// adds its own in its namespace (`larena.product`); it never changes these.
const DATA_SHAPES = Object.freeze({
  item: {
    summary: 'One record: a title, and optionally a text, an address, a picture, a date and a badge.',
    schema: item,
  },
  cards: {
    summary: 'A list of records for cards, with the page it is when the host pages it.',
    schema: closed({
      items: { type: 'array', maxItems: 500, items: item },
      total: { type: 'integer', minimum: 0 },
      page: { type: 'integer', minimum: 1 },
      pages: { type: 'integer', minimum: 0 },
      per_page: { type: 'integer', minimum: 1, maximum: 500 },
    }, ['items']),
    list: 'items',
  },
  gallery: {
    summary: 'Pictures with their captions.',
    schema: closed({
      items: { type: 'array', maxItems: 500, items: closed({ src: text(2048, 1), alt: text(1000), caption: text(1000) }, ['src']) },
    }, ['items']),
    list: 'items',
  },
  section_title: {
    summary: 'The title of a section and a line under it.',
    schema: closed({ title: text(500, 1), subtitle: text(1000) }, ['title']),
  },
  menu: {
    summary: 'Links of a menu, one level of children under each.',
    schema: closed({
      items: { type: 'array', maxItems: 200, items: closed({ ...link.properties, children: { type: 'array', maxItems: 100, items: link } }, ['label', 'url']) },
    }, ['items']),
    list: 'items',
  },
  pagination: {
    summary: 'Where a paged list is: the page, how many there are, and the total. A runtime state a list publishes.',
    schema: closed({
      page: { type: 'integer', minimum: 1 },
      pages: { type: 'integer', minimum: 0 },
      total: { type: 'integer', minimum: 0 },
      per_page: { type: 'integer', minimum: 1, maximum: 500 },
    }, ['page', 'pages']),
  },
});

const diagnostic = (code, path, message, details = {}) => ({ code, path, message, ...details });

/** The shape registry: the SIMAI Framework's shapes and a host's own (namespaced: `<owner>.<name>`). */
function createShapeRegistry(extra = {}) {
  const shapes = new Map(Object.entries(DATA_SHAPES));
  for (const [name, shape] of Object.entries(extra || {})) {
    if (!/^[a-z][a-z0-9-]*\.[a-z][a-z0-9_]*$/u.test(name)) throw new TypeError(`composition_shape_name_invalid:${name}`);
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(shape?.schema)) throw new TypeError(`composition_shape_invalid:${name}`);
    shapes.set(name, (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)(shape));
  }
  return shapes;
}

let defaultShapes = null;
function normalizeShapes(shapes) {
  if (shapes instanceof Map) return shapes;
  if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(shapes)) return createShapeRegistry(shapes);
  defaultShapes ||= createShapeRegistry();
  return defaultShapes;
}

/** The fields of a shape a mapping may name: the record's fields for a list shape, else the shape's own. */
function shapeFields(shape) {
  if (!shape) return [];
  const own = shape.schema?.properties || {};
  const listed = shape.list ? own[shape.list]?.items?.properties : null;
  return Object.keys(listed || own);
}

/** The settings a node keeps for the binding of one target, or undefined. */
function bindingSettings(node, target) {
  const entry = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node?.extensions) ? node.extensions[DATA_EXTENSION] : undefined;
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry) && (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry[target]) ? entry[target] : undefined;
}

const declaredBindings = (manifest) => ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest?.data_bindings) ? manifest.data_bindings : null);
const declaredRuntime = (manifest) => ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest?.runtime) ? manifest.runtime : null);
/** Whether a type takes data through bindings (host or runtime). */
const takesData = (manifest) => Boolean(declaredBindings(manifest) || declaredRuntime(manifest)?.accepts);

/** The problems of a manifest's data_bindings and runtime declarations. */
function validateDataDeclarations(manifest, shapes) {
  const diagnostics = [];
  const registry = normalizeShapes(shapes);
  const bindings = manifest.data_bindings;
  if (bindings !== undefined) {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(bindings) || !Object.keys(bindings).length) diagnostics.push(diagnostic('data_bindings_invalid', '$.data_bindings', 'data_bindings names each data key a host fills'));
    else for (const [target, entry] of Object.entries(bindings)) {
      const at = `$.data_bindings.${target}`;
      if (!NAME.test(target)) diagnostics.push(diagnostic('data_binding_target_invalid', at, 'A target is a data key'));
      if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry) || !Array.isArray(entry.shapes) || !entry.shapes.length) {
        diagnostics.push(diagnostic('data_binding_invalid', at, 'A binding names the shapes it takes'));
        continue;
      }
      for (const key of Object.keys(entry)) if (!['shapes', 'required', 'empty_key'].includes(key)) diagnostics.push(diagnostic('data_binding_invalid', `${at}.${key}`, `Unknown binding field ${key}`));
      for (const shape of entry.shapes) if (!registry.has(shape)) diagnostics.push(diagnostic('data_shape_unknown', `${at}.shapes`, `${shape} is not a data shape`));
    }
  }
  const runtime = manifest.runtime;
  if (runtime !== undefined) {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(runtime)) diagnostics.push(diagnostic('runtime_invalid', '$.runtime', 'runtime is {publishes, accepts}'));
    else {
      for (const key of Object.keys(runtime)) if (!['publishes', 'accepts'].includes(key)) diagnostics.push(diagnostic('runtime_invalid', `$.runtime.${key}`, `Unknown runtime field ${key}`));
      for (const [state, entry] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(runtime.publishes) ? runtime.publishes : {})) {
        const at = `$.runtime.publishes.${state}`;
        if (!NAME.test(state)) diagnostics.push(diagnostic('runtime_state_invalid', at, 'A state is a lowercase name'));
        if (!registry.has(entry?.shape)) diagnostics.push(diagnostic('data_shape_unknown', `${at}.shape`, `${entry?.shape} is not a data shape`));
        if (entry?.binding !== undefined && !Object.hasOwn(declaredBindings(manifest) || {}, entry.binding)) diagnostics.push(diagnostic('runtime_binding_unknown', `${at}.binding`, 'A state is taken from one of the type\'s own bindings'));
      }
      for (const [target, entry] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(runtime.accepts) ? runtime.accepts : {})) {
        const at = `$.runtime.accepts.${target}`;
        if (!NAME.test(target)) diagnostics.push(diagnostic('runtime_state_invalid', at, 'A target is a data key'));
        if (!registry.has(entry?.shape)) diagnostics.push(diagnostic('data_shape_unknown', `${at}.shape`, `${entry?.shape} is not a data shape`));
      }
    }
  }
  return diagnostics;
}

function validateSettings(settings, target, shapeNames, registry, path, diagnostics) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(settings)) {
    diagnostics.push(diagnostic('data_settings_invalid', path, 'The settings of a binding are an object'));
    return;
  }
  for (const key of Object.keys(settings)) if (!SETTINGS_FIELDS.has(key)) diagnostics.push(diagnostic('data_settings_invalid', `${path}.${key}`, `Unknown binding setting ${key}`));
  const shapeName = settings.shape ?? (shapeNames.length === 1 ? shapeNames[0] : undefined);
  if (settings.shape !== undefined && !shapeNames.includes(settings.shape)) diagnostics.push(diagnostic('data_shape_not_taken', `${path}.shape`, `${target} takes ${shapeNames.join(', ')}`));
  if (shapeName === undefined) diagnostics.push(diagnostic('data_shape_required', `${path}.shape`, `${target} takes several shapes; the binding names one`));
  if (settings.preset !== undefined && (typeof settings.preset !== 'string' || !/^[a-z][a-z0-9._-]{0,63}$/u.test(settings.preset))) diagnostics.push(diagnostic('data_settings_invalid', `${path}.preset`, 'A preset is the host\'s mapping preset name'));
  if (settings.mapping !== undefined) {
    const fields = new Set(shapeFields(registry.get(shapeName)));
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(settings.mapping)) diagnostics.push(diagnostic('data_mapping_invalid', `${path}.mapping`, 'A mapping maps shape fields to source fields'));
    else for (const [field, source] of Object.entries(settings.mapping)) {
      if (!fields.has(field)) diagnostics.push(diagnostic('data_mapping_field_unknown', `${path}.mapping.${field}`, `${field} is no field of ${shapeName}`));
      if (typeof source !== 'string' || !source || source.length > 120) diagnostics.push(diagnostic('data_mapping_invalid', `${path}.mapping.${field}`, 'A source field is a name'));
    }
  }
  if (settings.filter !== undefined && (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(settings.filter) || (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(settings.filter).length > MAX_FILTER_BYTES)) diagnostics.push(diagnostic('data_filter_invalid', `${path}.filter`, `A filter is an object of at most ${MAX_FILTER_BYTES} bytes, read by the host only`));
  if (settings.sort !== undefined && (!Array.isArray(settings.sort) || settings.sort.length > 5 || settings.sort.some((entry) => !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry) || typeof entry.field !== 'string' || !entry.field || !['asc', 'desc'].includes(entry.direction ?? 'asc') || Object.keys(entry).some((key) => !['field', 'direction'].includes(key))))) {
    diagnostics.push(diagnostic('data_sort_invalid', `${path}.sort`, 'sort is up to 5 {field, direction: asc | desc}'));
  }
  if (settings.limit !== undefined && (!Number.isInteger(settings.limit) || settings.limit < 1 || settings.limit > 500)) diagnostics.push(diagnostic('data_limit_invalid', `${path}.limit`, 'limit is 1 to 500'));
  if (settings.page_param !== undefined && (typeof settings.page_param !== 'string' || !/^[a-z][a-z0-9_-]{0,31}$/u.test(settings.page_param))) diagnostics.push(diagnostic('data_settings_invalid', `${path}.page_param`, 'page_param is the URL parameter the host pages by'));
  if (settings.params !== undefined) {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(settings.params)) diagnostics.push(diagnostic('data_params_invalid', `${path}.params`, 'params name URL and context values'));
    else for (const [name, param] of Object.entries(settings.params)) {
      if (!NAME.test(name) || !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(param) || !PARAM_SOURCES.has(param.from) || typeof param.key !== 'string' || !param.key || param.key.length > 64 || Object.keys(param).some((key) => !['from', 'key'].includes(key))) {
        diagnostics.push(diagnostic('data_params_invalid', `${path}.params.${name}`, 'A parameter is {from: url | context | route, key}'));
      }
    }
  }
  if (settings.empty_text !== undefined && (typeof settings.empty_text !== 'string' || settings.empty_text.length > 500)) diagnostics.push(diagnostic('data_settings_invalid', `${path}.empty_text`, 'empty_text is up to 500 characters'));
}

/**
 * The data rules of a Document, for the types that declare data: each host
 * binding fills a declared target with a shape the type takes, its settings
 * are well formed, and each runtime binding names a publisher in the same
 * section with a state of the shape the target takes.
 */
function validateDataRules(root, registry, shapes, diagnostics) {
  const shapeRegistry = normalizeShapes(shapes);
  const sections = new Map();
  const nodes = new Map();
  const visit = (node, path, section) => {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node)) return;
    const here = node.type === 'layout.section' ? node.id : section;
    nodes.set(node.id, { node, path, section: here });
    for (const [slot, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.slots) ? node.slots : {})) {
      if (Array.isArray(children)) children.forEach((child, index) => visit(child, `${path}.slots.${slot}[${index}]`, here));
    }
  };
  visit(root, '$.root', '$root');
  for (const { node, path, section } of nodes.values()) {
    sections.set(node.id, section);
    const manifest = registry.types.get(node.type);
    if (!manifest) continue;
    const declared = declaredBindings(manifest);
    const accepts = declaredRuntime(manifest)?.accepts;
    const extension = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.extensions) ? node.extensions[DATA_EXTENSION] : undefined;
    if (extension !== undefined && !declared) diagnostics.push(diagnostic('data_binding_undeclared', `${path}.extensions.${DATA_EXTENSION}`, `${node.type} takes no data from a host`));
    if (!declared && !accepts) continue;
    const bound = new Set();
    (Array.isArray(node.bindings) ? node.bindings : []).forEach((binding, index) => {
      const at = `${path}.bindings[${index}]`;
      if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(binding)) return;
      if (binding.owner === RUNTIME_OWNER) {
        if (!accepts || !Object.hasOwn(accepts, binding.target)) return diagnostics.push(diagnostic('runtime_target_undeclared', `${at}.target`, `${node.type} accepts no runtime state at ${binding.target}`));
        const [from, state, extra] = String(binding.ref).split('#');
        if (!from || !state || extra !== undefined) return diagnostics.push(diagnostic('runtime_ref_invalid', `${at}.ref`, 'A runtime binding names <node id>#<state>'));
        const publisher = nodes.get(from);
        if (!publisher || publisher.section !== section) return diagnostics.push(diagnostic('runtime_publisher_missing', `${at}.ref`, `${from} is not in the same section`));
        const published = declaredRuntime(registry.types.get(publisher.node.type))?.publishes?.[state];
        if (!published) return diagnostics.push(diagnostic('runtime_state_unknown', `${at}.ref`, `${publisher.node.type} publishes no ${state}`));
        if (published.shape !== accepts[binding.target].shape) diagnostics.push(diagnostic('runtime_shape_mismatch', `${at}.ref`, `${state} is ${published.shape}; ${binding.target} takes ${accepts[binding.target].shape}`));
        return undefined;
      }
      if (!declared || !Object.hasOwn(declared, binding.target)) return diagnostics.push(diagnostic('binding_target_undeclared', `${at}.target`, `${node.type} takes no host data at ${binding.target}`));
      if (bound.has(binding.target)) diagnostics.push(diagnostic('binding_target_duplicate', `${at}.target`, `${binding.target} is bound twice`));
      bound.add(binding.target);
      return undefined;
    });
    for (const [target, entry] of Object.entries(declared || {})) {
      if (entry.required === true && !bound.has(target)) diagnostics.push(diagnostic('binding_required', `${path}.bindings`, `${target} needs a source`));
    }
    if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(extension)) {
      for (const [target, settings] of Object.entries(extension)) {
        const at = `${path}.extensions.${DATA_EXTENSION}.${target}`;
        if (!Object.hasOwn(declared || {}, target)) diagnostics.push(diagnostic('binding_target_undeclared', at, `${node.type} takes no host data at ${target}`));
        else validateSettings(settings, target, declared[target].shapes, shapeRegistry, at, diagnostics);
      }
    } else if (extension !== undefined) diagnostics.push(diagnostic('data_settings_invalid', `${path}.extensions.${DATA_EXTENSION}`, 'The data settings are an object keyed by binding target'));
  }
}

/**
 * Demo data of a shape, for a preview when no source is reachable and for a
 * check that a block draws every state: each required field filled, a list
 * with `count` records.
 */
function demoData(shapeName, options = {}) {
  const shape = normalizeShapes(options.shapes).get(shapeName);
  if (!shape) throw new TypeError(`composition_shape_unknown:${shapeName}`);
  const count = Number.isInteger(options.count) ? options.count : 3;
  const fill = (schema, index) => {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(schema)) return null;
    if (schema.enum) return schema.enum[0];
    if (schema.type === 'object') {
      const keys = new Set([...(schema.required || []), ...Object.keys(schema.properties || {}).filter((key) => ['title', 'text', 'alt', 'label', 'url', 'src'].includes(key))]);
      return Object.fromEntries([...keys].filter((key) => schema.properties?.[key]).map((key) => [key, fill(schema.properties[key], index, key)]));
    }
    if (schema.type === 'array') return Array.from({ length: Math.min(count, schema.maxItems ?? count) }, (_, at) => fill(schema.items, at + 1));
    if (schema.type === 'integer' || schema.type === 'number') return Math.max(schema.minimum ?? 1, 1);
    if (schema.type === 'boolean') return false;
    return `Example ${index || 1}`;
  };
  const data = fill(shape.schema, 1);
  for (const [key, value] of Object.entries(data)) if (/(?:url|src)$/u.test(key) && typeof value === 'string') data[key] = '#';
  const fixAddresses = (value) => {
    if (Array.isArray(value)) return value.forEach(fixAddresses);
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) return undefined;
    for (const key of Object.keys(value)) {
      if (['url', 'src'].includes(key)) value[key] = key === 'src' ? '/example.webp' : '#';
      else fixAddresses(value[key]);
    }
    return undefined;
  };
  fixAddresses(data);
  return data;
}

// ------------------------------------------------------------- at render

function isEmpty(data, shape) {
  if (data === null) return true;
  if (shape?.list) return Array.isArray(data?.[shape.list]) && data[shape.list].length === 0;
  return false;
}

/**
 * Resolves the data of the nodes whose types declare it, before drawing: each
 * host binding through `context.resolveBinding`, with its state; then each
 * runtime binding from its publisher. A failure stays inside its block: the
 * state is `error` and the page still draws. Returns {byNode: Map(id ->
 * {values, states}), links, diagnostics}.
 */
async function resolveData(root, registry, context, check) {
  const shapes = normalizeShapes(context.options?.shapes);
  const byNode = new Map();
  const diagnostics = [];
  const links = [];
  const pending = [];
  const walk = (node) => {
    const manifest = registry.types.get(node.type);
    if (manifest && takesData(manifest)) pending.push({ node, manifest });
    for (const children of Object.values(node.slots || {})) for (const child of children) walk(child);
  };
  walk(root);
  for (const { node, manifest } of pending) {
    const entry = { values: {}, states: {} };
    byNode.set(node.id, entry);
    for (const binding of node.bindings || []) {
      if (binding.owner === RUNTIME_OWNER || !declaredBindings(manifest)?.[binding.target]) continue;
      const settings = bindingSettings(node, binding.target) || {};
      const shapeName = settings.shape ?? declaredBindings(manifest)[binding.target].shapes[0];
      const shape = shapes.get(shapeName);
      let data;
      try {
        data = typeof context.resolveBinding === 'function'
          ? await context.resolveBinding(binding, { node, shape: shapeName, settings })
          : undefined;
      } catch (error) {
        entry.states[binding.target] = 'error';
        diagnostics.push(diagnostic('binding_failed', `node:${node.id}`, `The source of ${binding.target} failed: ${String(error?.message || error).slice(0, 200)}`));
        continue;
      }
      if (data === undefined) {
        entry.states[binding.target] = 'loading';
        continue;
      }
      const problems = [];
      check(data, shape?.schema, `node:${node.id}.${binding.target}`, problems);
      if (problems.length) {
        entry.states[binding.target] = 'error';
        diagnostics.push(diagnostic('binding_shape_mismatch', `node:${node.id}`, `The host's answer for ${binding.target} is not ${shapeName}: ${problems.map((item) => `${item.code} at ${item.path}`).slice(0, 5).join('; ')}`));
        continue;
      }
      entry.values[binding.target] = data;
      entry.states[binding.target] = isEmpty(data, shape) ? 'empty' : context.preview === true ? 'preview' : 'ready';
    }
    for (const target of Object.keys(declaredBindings(manifest) || {})) if (!(target in entry.states)) entry.states[target] = 'empty';
  }
  // Runtime bindings read what their publisher holds now.
  for (const { node, manifest } of pending) {
    const entry = byNode.get(node.id);
    for (const binding of node.bindings || []) {
      if (binding.owner !== RUNTIME_OWNER || !declaredRuntime(manifest)?.accepts?.[binding.target]) continue;
      const [from, state] = String(binding.ref).split('#');
      const publisher = byNode.get(from);
      const publisherManifest = publisher && registry.types.get(pending.find((item) => item.node.id === from)?.node.type);
      const published = declaredRuntime(publisherManifest)?.publishes?.[state];
      links.push({ from, state, to: node.id, target: binding.target });
      if (!publisher || !published) {
        entry.states[binding.target] = 'empty';
        continue;
      }
      const sourceState = published.binding ? publisher.states[published.binding] : 'ready';
      const source = published.binding ? publisher.values[published.binding] : undefined;
      const fields = Object.keys(shapes.get(published.shape)?.schema?.properties || {});
      const value = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(source) ? Object.fromEntries(fields.filter((key) => key in source).map((key) => [key, source[key]])) : undefined;
      const problems = [];
      if (value !== undefined) check(value, shapes.get(published.shape)?.schema, `node:${node.id}.${binding.target}`, problems);
      if (value === undefined || problems.length) {
        entry.states[binding.target] = sourceState === 'loading' || sourceState === 'error' ? sourceState : 'empty';
        continue;
      }
      entry.values[binding.target] = value;
      entry.states[binding.target] = sourceState;
    }
  }
  return { byNode, links, diagnostics };
}

// ----------------------------------------------------------- the source port

// The three things an editor asks a host about data. The host answers; the
// editor never knows about iblocks, models or merge data. Bitrix, Larena and
// the mail editor each implement it.
const SOURCE_PORT = Object.freeze({
  ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.source-port', 1),
  requests: {
    sources: { summary: 'Which sources give this shape: [{id, label, shapes, presets?}].', input: ['shape'] },
    fields: { summary: 'Which fields a source has: [{key, label, type?}].', input: ['source'] },
    preview: { summary: 'Data for a binding to show in the editor, in the binding\'s shape (demo data when the source is not reachable).', input: ['binding', 'settings', 'shape'] },
  },
});

const SOURCE_FIELDS = new Set(['id', 'label', 'shapes', 'presets', 'revision']);
const PRESET_FIELDS = new Set(['id', 'label', 'shape', 'mapping']);

/** The problems of a host's answer to one source-port request. */
function checkSourceAnswer(request, answer, options = {}) {
  const diagnostics = [];
  const shapes = normalizeShapes(options.shapes);
  const push = (code, path, message) => diagnostics.push(diagnostic(code, path, message));
  if (request === 'sources') {
    if (!Array.isArray(answer) || answer.length > 200) push('source_answer_invalid', '$', 'sources is a list of up to 200');
    else answer.forEach((source, index) => {
      const at = `$[${index}]`;
      if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(source)) return push('source_answer_invalid', at, 'A source is an object');
      for (const key of Object.keys(source)) if (!SOURCE_FIELDS.has(key)) push('source_answer_invalid', `${at}.${key}`, `Unknown source field ${key}`);
      if (typeof source.id !== 'string' || !source.id || source.id.length > 200) push('source_answer_invalid', `${at}.id`, 'A source has an id');
      if (typeof source.label !== 'string' || !source.label) push('source_answer_invalid', `${at}.label`, 'A source has a label');
      if (!Array.isArray(source.shapes) || source.shapes.some((shape) => !shapes.has(shape))) push('source_shape_unknown', `${at}.shapes`, 'A source names the shapes it gives');
      for (const [presetIndex, preset] of (Array.isArray(source.presets) ? source.presets : []).entries()) {
        const presetAt = `${at}.presets[${presetIndex}]`;
        if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(preset) || Object.keys(preset).some((key) => !PRESET_FIELDS.has(key)) || typeof preset.id !== 'string' || !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(preset.mapping)) { push('source_preset_invalid', presetAt, 'A preset is {id, label, shape, mapping}'); continue; }
        const fields = new Set(shapeFields(shapes.get(preset.shape)));
        for (const field of Object.keys(preset.mapping)) if (!fields.has(field)) push('source_preset_invalid', `${presetAt}.mapping.${field}`, `${field} is no field of ${preset.shape}`);
      }
      return undefined;
    });
  } else if (request === 'fields') {
    if (!Array.isArray(answer) || answer.length > 500) push('source_answer_invalid', '$', 'fields is a list of up to 500');
    else answer.forEach((field, index) => {
      if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(field) || typeof field.key !== 'string' || !field.key || typeof field.label !== 'string' || Object.keys(field).some((key) => !['key', 'label', 'type'].includes(key))) push('source_answer_invalid', `$[${index}]`, 'A field is {key, label, type?}');
    });
  } else if (request === 'preview') {
    const shape = shapes.get(options.shape);
    if (!shape) push('source_shape_unknown', '$', `${options.shape} is not a data shape`);
    else if (typeof options.check === 'function') {
      const problems = [];
      options.check(answer, shape.schema, '$', problems);
      diagnostics.push(...problems);
    }
  } else push('source_request_unknown', '$', `${request} is not a request of the source port`);
  return diagnostics;
}


/***/ },

/***/ "fe90f998a31d"
(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EDITOR_FIELD_WORDS: () => (/* binding */ EDITOR_FIELD_WORDS),
/* harmony export */   EDITOR_WORDS_OWNER: () => (/* binding */ EDITOR_WORDS_OWNER),
/* harmony export */   catalogueWordKeys: () => (/* binding */ catalogueWordKeys),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   editorFieldKeys: () => (/* binding */ editorFieldKeys),
/* harmony export */   editorFieldMessages: () => (/* binding */ editorFieldMessages)
/* harmony export */ });
/* harmony import */ var _page_language_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _builtins_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("08e5033c490a");
/* harmony import */ var _catalogue_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("76235de72516");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_page_language_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_page_language_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];




// The words of the built-in editor manifests (simai/ui-source#65): every
// label_key, help_key and `<label_key>.<choice>` of a choice that is a stable
// segment, in English and Russian. A choice that is not a stable segment
// (`16/9`) is shown as it is, by the field kinds' localization rule.
//
// The words belong to the registry owner `sf-composition`, so a product adds a
// language or corrects one word the way it does for any component:
//
//   SF.language.register('sf-composition', 'de', {'sf.composition.content_figure.src': 'Bildadresse'});
//
// src/core/contracts/composition-editor-words.v1.json is generated from this
// file (scripts/generate-composition-contracts.mjs) for a host without
// JavaScript, which reads the same keys.

const EDITOR_WORDS_OWNER = 'sf-composition';

const words = (prefix, entries) => Object.fromEntries(Object.entries(entries).map(([key, value]) => [`sf.composition.${prefix}.${key}`, value]));

const EN = {
  ...words('layout_section', {
    surface: 'Background',
    surface_help: 'How the section stands out from the page',
    'surface.surface': 'Regular',
    'surface.contrast': 'Contrasting',
  }),
  ...words('layout_columns', {
    columns: 'Columns',
    columns_help: 'How many columns the content is split into',
    gap: 'Gap',
    gap_help: 'Space between the columns, from 0 to 8 steps',
  }),
  // Parameter sets (parameter-sets.mjs), shared by every type that takes them.
  ...words('set_background', {
    background: 'Background',
    background_help: 'The fill behind the block',
    'background.surface': 'Page',
    'background.container': 'Container',
    'background.primary': 'Primary',
    'background.secondary': 'Secondary',
    'background.tertiary': 'Tertiary',
    'background.accent': 'Accent',
  }),
  ...words('set_spacing', {
    padding_y: 'Space above and below',
    padding_y_help: 'From 0 to 8 steps, per screen',
    padding_x: 'Space at the sides',
    padding_x_help: 'From 0 to 8 steps, per screen',
  }),
  ...words('set_width', {
    width: 'Width',
    width_help: 'How wide the content stands on the page',
    'width.narrow': 'Narrow',
    'width.normal': 'Normal',
    'width.wide': 'Wide',
    'width.full': 'Full width',
  }),
  ...words('set_grid', {
    columns: 'Columns',
    columns_help: 'How many columns the content is split into, per screen',
    gap: 'Gap',
    gap_help: 'Space between the columns, from 0 to 8 steps',
  }),
  ...words('set_alignment', {
    align: 'Alignment',
    align_help: 'How the text lines up, per screen',
    'align.start': 'Start',
    'align.center': 'Centre',
    'align.end': 'End',
  }),
  ...words('set_breakout', {
    breakout: 'Edge to edge',
    breakout_help: 'The block spans the whole page width',
  }),
  ...words('set_visibility', {
    hidden: 'Hidden',
    hidden_help: 'The block is not shown on this screen',
  }),
  ...words('layout_area', {
    content: 'Text',
    empty: 'Start writing or press / for a block',
    padding: 'Padding',
    padding_help: 'Space inside the area, from 0 to 8 steps',
    hidden: 'Hidden',
    hidden_help: 'The area is not shown on this screen',
  }),
  ...words('content_heading', {
    level: 'Heading level',
    level_help: 'From 1, the page title, to 6',
  }),
  ...words('layout_region', {
    placement: 'Placement',
    placement_help: 'Where the area stands in the layout',
    'placement.block': 'Full width',
    'placement.start': 'At the start',
    'placement.center': 'In the centre',
    'placement.end': 'At the end',
    label: 'Name',
    label_help: 'The area\'s name for screen readers',
    landmark: 'Landmark',
    landmark_help: 'The area\'s role in the page structure for assistive technology',
    'landmark.banner': 'Header',
    'landmark.navigation': 'Navigation',
    'landmark.main': 'Main content',
    'landmark.complementary': 'Sidebar',
    'landmark.contentinfo': 'Footer',
    'landmark.region': 'Region',
    'landmark.none': 'None',
    sticky: 'Sticky',
    sticky_help: 'The area stays in view while the page scrolls',
  }),
  ...words('content_list', {
    ordered: 'Numbered',
    ordered_help: 'Numbers instead of bullets',
    start: 'Start at',
    start_help: 'The number of the first item',
  }),
  ...words('content_code', {
    lang: 'Language',
    lang_help: 'The programming language, for highlighting',
    title: 'Caption',
    title_help: 'A file name or a short caption above the code',
    numbers: 'Line numbers',
    numbers_help: 'Number every line',
  }),
  ...words('content_table', {
    header: 'Table headers',
    header_help: 'Which cells are headers',
    'header.row': 'First row',
    'header.column': 'First column',
    'header.both': 'Row and column',
    'header.none': 'None',
  }),
  ...words('content_figure', {
    src: 'Picture address',
    src_help: 'A link to the image: http(s) or a path on the site',
    alt: 'Picture description',
    alt_help: 'What the picture shows, for those who cannot see it',
    ratio: 'Ratio',
    ratio_help: 'The picture\'s width to its height',
    'ratio.auto': 'As it is',
    fit: 'Fit',
    fit_help: 'How the picture fills its frame',
    'fit.cover': 'Fill',
    'fit.contain': 'Whole',
  }),
  ...words('content_alert', {
    status: 'Kind',
    status_help: 'What the message is about',
    'status.neutral': 'Plain',
    'status.info': 'Information',
    'status.success': 'Success',
    'status.warning': 'Warning',
    'status.error': 'Error',
    appearance: 'Look',
    appearance_help: 'Filled, outlined or flat',
    'appearance.default': 'Filled',
    'appearance.outlined': 'Outlined',
    'appearance.flat': 'Flat',
  }),
  ...words('content_details', {
    open: 'Open at first',
    open_help: 'The block is shown open when the page loads',
    layout: 'Look',
    layout_help: 'A filled box or lines between blocks',
    'layout.surface': 'Filled',
    'layout.lines': 'Lines',
  }),
  ...words('content_tabs', {
    label: 'Name',
    label_help: 'The name of the row of tabs for screen readers',
  }),
  ...words('content_tab', {
    label: 'Tab name',
    label_help: 'The text on the tab',
  }),
  ...words('content_steps', {
    current: 'Current step',
    current_help: 'The number of the step in progress',
    layout: 'Look',
    layout_help: 'A timeline or a numbered list',
    'layout.timeline': 'Timeline',
    'layout.list': 'List',
  }),
  ...words('content_grid', {
    columns: 'Columns',
    columns_help: 'How many columns on a wide screen; a narrow one shows fewer',
    gap: 'Gap',
    gap_help: 'The space between the cells, from 0 to 4',
  }),
  ...words('content_card', {
    variant: 'Look',
    variant_help: 'A card with a background or without one',
    'variant.default': 'Card',
    'variant.plain': 'No background',
  }),
  ...words('content_media', {
    src: 'Picture address',
    src_help: 'A link to the image: http(s) or a path on the site',
    alt: 'Picture description',
    alt_help: 'What the picture shows, for those who cannot see it',
    side: 'Picture',
    side_help: 'Which side the picture stands on',
    'side.left': 'Left',
    'side.right': 'Right',
    ratio: 'Ratio',
    ratio_help: 'The picture\'s width to its height',
  }),
  ...words('content_file', {
    label: 'File name',
    label_help: 'The name shown; when empty, the last part of the address',
    href: 'File address',
    href_help: 'A link to the file to download',
  }),
  ...words('content_diagram', {
    title: 'Caption',
    title_help: 'The diagram\'s name, also for screen readers',
    engine: 'Engine',
    engine_help: 'What draws the diagram',
    'engine.mermaid': 'Mermaid',
  }),
  ...words('content_math', {
    label: 'Caption',
    label_help: 'The formula\'s name for screen readers',
  }),
  // The layout and element types of the one block editor (2026-11-04).
  ...words('layout_spacer', {
    size: 'Height',
    size_help: 'From 1 to 8 steps, per screen',
  }),
  ...words('element_button', {
    text: 'Text',
    text_help: 'The words on the button',
    href: 'Link',
    href_help: 'Where the button leads; empty, it is a button',
    appearance: 'Look',
    appearance_help: 'How the button stands out',
    'appearance.default': 'Filled',
    'appearance.tonal': 'Tonal',
    'appearance.outline': 'Outlined',
    'appearance.link': 'Link',
    'appearance.surface': 'On the surface',
    size: 'Size',
    size_help: 'Small, regular or large',
    icon: 'Icon',
    icon_help: 'A SIMAI Framework icon name, such as arrow_forward',
    icon_position: 'Icon side',
    icon_position_help: 'Before or after the words',
    'icon_position.start': 'Before',
    'icon_position.end': 'After',
    scheme: 'Colour',
    scheme_help: 'The colour role of the button',
    'scheme.primary': 'Primary',
    'scheme.secondary': 'Secondary',
  }),
  ...words('element_button_icon', {
    icon: 'Icon',
    icon_help: 'A SIMAI Framework icon name, such as favorite',
    label: 'Label for screen readers',
    label_help: 'What the button does, said aloud',
    appearance: 'Look',
    appearance_help: 'How the button stands out',
    'appearance.default': 'Filled',
    'appearance.tonal': 'Tonal',
    'appearance.outline': 'Outlined',
    'appearance.surface': 'On the surface',
    'appearance.ghost': 'No background',
    size: 'Size',
    size_help: 'Small, regular or large',
    scheme: 'Colour',
    scheme_help: 'The colour role of the button',
    'scheme.primary': 'Primary',
    'scheme.secondary': 'Secondary',
  }),
  ...words('element_badge', {
    text: 'Text',
    text_help: 'The words on the badge',
    appearance: 'Look',
    appearance_help: 'How the badge stands out',
    'appearance.main': 'Filled',
    'appearance.tonal': 'Tonal',
    'appearance.outline': 'Outlined',
    scheme: 'Colour',
    scheme_help: 'The colour role of the badge',
    'scheme.neutral': 'Neutral',
    'scheme.primary': 'Primary',
    'scheme.secondary': 'Secondary',
    'scheme.tertiary': 'Tertiary',
    size: 'Size',
    size_help: 'From small to regular',
    icon: 'Icon',
    icon_help: 'A SIMAI Framework icon name before the words',
  }),
  ...words('element_icon', {
    icon: 'Icon',
    icon_help: 'A SIMAI Framework icon name, such as star',
    size: 'Size',
    size_help: 'A step of the size ladder',
    label: 'Label for screen readers',
    label_help: 'Leave empty when the icon only decorates',
  }),
  // Forms (2026-11-04).
  ...words('form_form', {
    action: 'Where to send',
    action_help: "The address the form is sent to; the host's",
    method: 'Method',
    method_help: 'How the form is sent',
    'method.post': 'In the body (POST)',
    'method.get': 'In the address (GET)',
  }),
  ...words('form_input', {
    label: 'Label',
    label_help: 'The words above the field',
    placeholder: 'Placeholder',
    placeholder_help: 'A hint inside the empty field',
    input_type: 'Kind',
    input_type_help: 'What the field takes',
    'input_type.text': 'Text',
    'input_type.email': 'Email',
    'input_type.tel': 'Phone',
    'input_type.url': 'Address',
    required: 'Required',
    required_help: 'The form is not sent without it',
    hint: 'Hint',
    hint_help: 'A line under the field',
    name: 'Field name',
    name_help: 'What the form sends the value under',
    size: 'Size',
    size_help: 'Small, regular or large',
  }),
  ...words('form_textarea', {
    label: 'Label',
    label_help: 'The words above the field',
    placeholder: 'Placeholder',
    placeholder_help: 'A hint inside the empty field',
    rows: 'Rows',
    rows_help: 'How many lines the field shows, from 2 to 12',
    required: 'Required',
    required_help: 'The form is not sent without it',
    hint: 'Hint',
    hint_help: 'A line under the field',
    name: 'Field name',
    name_help: 'What the form sends the value under',
    size: 'Size',
    size_help: 'Small, regular or large',
  }),
  ...words('form_checkbox', {
    label: 'Label',
    label_help: 'The words beside the box',
    hint: 'Hint',
    hint_help: 'A line under the label',
    checked: 'On at first',
    checked_help: 'Whether it starts ticked',
    name: 'Field name',
    name_help: 'What the form sends the value under',
    size: 'Size',
    size_help: 'Small, regular or large',
  }),
  ...words('form_switch', {
    label: 'Label',
    label_help: 'The words beside the box',
    hint: 'Hint',
    hint_help: 'A line under the label',
    checked: 'On at first',
    checked_help: 'Whether it starts ticked',
    name: 'Field name',
    name_help: 'What the form sends the value under',
    size: 'Size',
    size_help: 'Small, regular or large',
  }),
  ...words('form_select', {
    label: 'Label',
    label_help: 'The words above the field',
    options: 'Options',
    options_help: 'The choices, separated by commas',
    placeholder: 'Placeholder',
    placeholder_help: 'A hint inside the empty field',
    required: 'Required',
    required_help: 'The form is not sent without it',
    name: 'Field name',
    name_help: 'What the form sends the value under',
    size: 'Size',
    size_help: 'Small, regular or large',
  }),
  ...words('form_button_submit', {
    text: 'Text',
    text_help: 'The words on the button',
    appearance: 'Look',
    appearance_help: 'How the button stands out',
    'appearance.default': 'Filled',
    'appearance.tonal': 'Tonal',
    'appearance.outline': 'Outlined',
    size: 'Size',
    size_help: 'Small, regular or large',
  }),
  // The catalogue: groups, the built-in types that name themselves, variants.
  ...words('catalogue.group', {
    text: 'Text',
    media: 'Media',
    elements: 'Elements',
    layout: 'Layout',
    page_parts: 'Page parts',
    marketing: 'Marketing',
    data: 'Data',
    forms: 'Forms',
  }),
  ...words('catalogue.type', {
    layout_container: 'Container',
    layout_grid: 'Grid',
    layout_spacer: 'Empty space',
    element_button: 'Button',
    element_button_icon: 'Icon button',
    element_badge: 'Badge',
    element_icon: 'Icon',
    form_form: 'Form',
    form_input: 'Field',
    form_textarea: 'Text area',
    form_checkbox: 'Checkbox',
    form_switch: 'Switch',
    form_select: 'List',
    form_button_submit: 'Send button',
  }),
  ...words('catalogue.variant', {
    'layout_section.plain': 'Empty',
    'layout_section.soft': 'On a soft background',
    'layout_section.accent': 'On an accent background',
    'layout_section.text': 'With a text area',
    'layout_section.two_columns': 'Two columns',
    'layout_container.narrow': 'Narrow, for text',
    'layout_container.normal': 'Page width',
    'layout_container.soft': 'On a soft background',
    'layout_grid.cards_2': 'Two cards',
    'layout_grid.cards_3': 'Three cards',
    'layout_grid.cards_4': 'Four cards',
    'element_button.plain': 'Button',
    'element_button.icon': 'With an icon',
    'element_button.outline': 'Outlined',
    'form_form.request': 'Request: name and phone',
    'form_form.message': 'Message: name, email and text',
  }),
};

const RU = {
  ...words('layout_section', {
    surface: 'Фон',
    surface_help: 'Как раздел выделяется на странице',
    'surface.surface': 'Обычный',
    'surface.contrast': 'Контрастный',
  }),
  ...words('layout_columns', {
    columns: 'Колонки',
    columns_help: 'На сколько колонок делится содержимое',
    gap: 'Промежуток',
    gap_help: 'Расстояние между колонками, от 0 до 8 шагов',
  }),
  ...words('set_background', {
    background: 'Фон',
    background_help: 'Заливка под блоком',
    'background.surface': 'Страница',
    'background.container': 'Контейнер',
    'background.primary': 'Основной',
    'background.secondary': 'Дополнительный',
    'background.tertiary': 'Третий',
    'background.accent': 'Акцент',
  }),
  ...words('set_spacing', {
    padding_y: 'Отступ сверху и снизу',
    padding_y_help: 'От 0 до 8 шагов, для каждого экрана',
    padding_x: 'Отступ по бокам',
    padding_x_help: 'От 0 до 8 шагов, для каждого экрана',
  }),
  ...words('set_width', {
    width: 'Ширина',
    width_help: 'Насколько широко стоит содержимое на странице',
    'width.narrow': 'Узкая',
    'width.normal': 'Обычная',
    'width.wide': 'Широкая',
    'width.full': 'Во всю ширину',
  }),
  ...words('set_grid', {
    columns: 'Колонки',
    columns_help: 'На сколько колонок делится содержимое, для каждого экрана',
    gap: 'Промежуток',
    gap_help: 'Расстояние между колонками, от 0 до 8 шагов',
  }),
  ...words('set_alignment', {
    align: 'Выравнивание',
    align_help: 'Как выравнивается текст, для каждого экрана',
    'align.start': 'К началу',
    'align.center': 'По центру',
    'align.end': 'К концу',
  }),
  ...words('set_breakout', {
    breakout: 'От края до края',
    breakout_help: 'Блок занимает всю ширину страницы',
  }),
  ...words('set_visibility', {
    hidden: 'Скрыт',
    hidden_help: 'Блок не показывается на этом экране',
  }),
  ...words('layout_area', {
    content: 'Текст',
    empty: 'Начните писать или нажмите / для блока',
    padding: 'Отступ',
    padding_help: 'Пространство внутри области, от 0 до 8 шагов',
    hidden: 'Скрыть',
    hidden_help: 'Область не показывается на этом экране',
  }),
  ...words('content_heading', {
    level: 'Уровень заголовка',
    level_help: 'От 1 (заголовок страницы) до 6',
  }),
  ...words('layout_region', {
    placement: 'Расположение',
    placement_help: 'Где область стоит в макете',
    'placement.block': 'Во всю ширину',
    'placement.start': 'В начале',
    'placement.center': 'По центру',
    'placement.end': 'В конце',
    label: 'Название',
    label_help: 'Название области для программ чтения с экрана',
    landmark: 'Ориентир',
    landmark_help: 'Роль области в структуре страницы для вспомогательных технологий',
    'landmark.banner': 'Шапка',
    'landmark.navigation': 'Навигация',
    'landmark.main': 'Основное содержимое',
    'landmark.complementary': 'Боковая колонка',
    'landmark.contentinfo': 'Подвал',
    'landmark.region': 'Область',
    'landmark.none': 'Нет',
    sticky: 'Закрепить',
    sticky_help: 'Область остаётся на виду при прокрутке страницы',
  }),
  ...words('content_list', {
    ordered: 'Нумерованный',
    ordered_help: 'Номера вместо маркеров',
    start: 'Начать с',
    start_help: 'Номер первого пункта',
  }),
  ...words('content_code', {
    lang: 'Язык',
    lang_help: 'Язык программирования для подсветки',
    title: 'Подпись',
    title_help: 'Имя файла или короткая подпись над кодом',
    numbers: 'Номера строк',
    numbers_help: 'Нумеровать каждую строку',
  }),
  ...words('content_table', {
    header: 'Заголовки таблицы',
    header_help: 'Какие ячейки — заголовки',
    'header.row': 'Первая строка',
    'header.column': 'Первый столбец',
    'header.both': 'Строка и столбец',
    'header.none': 'Нет',
  }),
  ...words('content_figure', {
    src: 'Адрес картинки',
    src_help: 'Ссылка на изображение: http(s) или путь на сайте',
    alt: 'Описание картинки',
    alt_help: 'Что на картинке — для тех, кто её не видит',
    ratio: 'Пропорции',
    ratio_help: 'Соотношение ширины и высоты картинки',
    'ratio.auto': 'Как есть',
    fit: 'Вписать',
    fit_help: 'Как картинка заполняет рамку',
    'fit.cover': 'Заполнить',
    'fit.contain': 'Целиком',
  }),
  ...words('content_alert', {
    status: 'Вид',
    status_help: 'О чём сообщение',
    'status.neutral': 'Обычная',
    'status.info': 'Сведения',
    'status.success': 'Успех',
    'status.warning': 'Внимание',
    'status.error': 'Ошибка',
    appearance: 'Оформление',
    appearance_help: 'Заливка, рамка или без фона',
    'appearance.default': 'Заливка',
    'appearance.outlined': 'Рамка',
    'appearance.flat': 'Плоско',
  }),
  ...words('content_details', {
    open: 'Открыт сразу',
    open_help: 'Блок показан раскрытым при загрузке страницы',
    layout: 'Оформление',
    layout_help: 'Заливка или линии между блоками',
    'layout.surface': 'Заливка',
    'layout.lines': 'Линии',
  }),
  ...words('content_tabs', {
    label: 'Название',
    label_help: 'Название ряда вкладок для программ чтения с экрана',
  }),
  ...words('content_tab', {
    label: 'Название вкладки',
    label_help: 'Текст на вкладке',
  }),
  ...words('content_steps', {
    current: 'Текущий шаг',
    current_help: 'Номер шага, который выполняется сейчас',
    layout: 'Оформление',
    layout_help: 'Линия или нумерованный список',
    'layout.timeline': 'Линия',
    'layout.list': 'Список',
  }),
  ...words('content_grid', {
    columns: 'Колонки',
    columns_help: 'Сколько колонок на широком экране; на узком их меньше',
    gap: 'Промежуток',
    gap_help: 'Расстояние между ячейками, от 0 до 4',
  }),
  ...words('content_card', {
    variant: 'Оформление',
    variant_help: 'Карточка с фоном или без него',
    'variant.default': 'Карточка',
    'variant.plain': 'Без фона',
  }),
  ...words('content_media', {
    src: 'Адрес картинки',
    src_help: 'Ссылка на изображение: http(s) или путь на сайте',
    alt: 'Описание картинки',
    alt_help: 'Что на картинке — для тех, кто её не видит',
    side: 'Картинка',
    side_help: 'С какой стороны стоит картинка',
    'side.left': 'Слева',
    'side.right': 'Справа',
    ratio: 'Пропорции',
    ratio_help: 'Соотношение ширины и высоты картинки',
  }),
  ...words('content_file', {
    label: 'Название файла',
    label_help: 'Показываемое название; если пусто — последняя часть адреса',
    href: 'Адрес файла',
    href_help: 'Ссылка на файл для скачивания',
  }),
  ...words('content_diagram', {
    title: 'Подпись',
    title_help: 'Название схемы, в том числе для программ чтения с экрана',
    engine: 'Движок',
    engine_help: 'Чем рисуется схема',
    'engine.mermaid': 'Mermaid',
  }),
  ...words('content_math', {
    label: 'Подпись',
    label_help: 'Название формулы для программ чтения с экрана',
  }),
  ...words('layout_spacer', {
    size: 'Высота',
    size_help: 'От 1 до 8 шагов, для каждого экрана',
  }),
  ...words('element_button', {
    text: 'Текст',
    text_help: 'Слова на кнопке',
    href: 'Ссылка',
    href_help: 'Куда ведёт кнопка; пусто — это просто кнопка',
    appearance: 'Вид',
    appearance_help: 'Насколько кнопка заметна',
    'appearance.default': 'Заливка',
    'appearance.tonal': 'Тональная',
    'appearance.outline': 'Контур',
    'appearance.link': 'Ссылка',
    'appearance.surface': 'На поверхности',
    size: 'Размер',
    size_help: 'Маленькая, обычная или крупная',
    icon: 'Значок',
    icon_help: 'Имя значка SIMAI Framework, например arrow_forward',
    icon_position: 'Где значок',
    icon_position_help: 'До или после слов',
    'icon_position.start': 'Слева',
    'icon_position.end': 'Справа',
    scheme: 'Цвет',
    scheme_help: 'Цветовая роль кнопки',
    'scheme.primary': 'Основной',
    'scheme.secondary': 'Дополнительный',
  }),
  ...words('element_button_icon', {
    icon: 'Значок',
    icon_help: 'Имя значка SIMAI Framework, например favorite',
    label: 'Подпись для экранного диктора',
    label_help: 'Что делает кнопка, вслух',
    appearance: 'Вид',
    appearance_help: 'Насколько кнопка заметна',
    'appearance.default': 'Заливка',
    'appearance.tonal': 'Тональная',
    'appearance.outline': 'Контур',
    'appearance.surface': 'На поверхности',
    'appearance.ghost': 'Без фона',
    size: 'Размер',
    size_help: 'Маленькая, обычная или крупная',
    scheme: 'Цвет',
    scheme_help: 'Цветовая роль кнопки',
    'scheme.primary': 'Основной',
    'scheme.secondary': 'Дополнительный',
  }),
  ...words('element_badge', {
    text: 'Текст',
    text_help: 'Слова на метке',
    appearance: 'Вид',
    appearance_help: 'Насколько метка заметна',
    'appearance.main': 'Заливка',
    'appearance.tonal': 'Тональная',
    'appearance.outline': 'Контур',
    scheme: 'Цвет',
    scheme_help: 'Цветовая роль метки',
    'scheme.neutral': 'Нейтральный',
    'scheme.primary': 'Основной',
    'scheme.secondary': 'Дополнительный',
    'scheme.tertiary': 'Третий',
    size: 'Размер',
    size_help: 'От маленькой до обычной',
    icon: 'Значок',
    icon_help: 'Имя значка SIMAI Framework перед словами',
  }),
  ...words('element_icon', {
    icon: 'Значок',
    icon_help: 'Имя значка SIMAI Framework, например star',
    size: 'Размер',
    size_help: 'Шаг шкалы размеров',
    label: 'Подпись для экранного диктора',
    label_help: 'Оставьте пустой, если значок только украшает',
  }),
  // Формы (2026-11-04).
  ...words('form_form', {
    action: 'Куда отправить',
    action_help: 'Адрес, на который уходит форма; его даёт сайт',
    method: 'Способ',
    method_help: 'Как отправляется форма',
    'method.post': 'В теле запроса (POST)',
    'method.get': 'В адресе (GET)',
  }),
  ...words('form_input', {
    label: 'Подпись',
    label_help: 'Слова над полем',
    placeholder: 'Подсказка в поле',
    placeholder_help: 'Текст внутри пустого поля',
    input_type: 'Вид',
    input_type_help: 'Что поле принимает',
    'input_type.text': 'Текст',
    'input_type.email': 'Почта',
    'input_type.tel': 'Телефон',
    'input_type.url': 'Адрес',
    required: 'Обязательное',
    required_help: 'Без него форма не отправится',
    hint: 'Пояснение',
    hint_help: 'Строка под полем',
    name: 'Имя поля',
    name_help: 'Под каким именем форма отправит значение',
    size: 'Размер',
    size_help: 'Маленький, обычный или большой',
  }),
  ...words('form_textarea', {
    label: 'Подпись',
    label_help: 'Слова над полем',
    placeholder: 'Подсказка в поле',
    placeholder_help: 'Текст внутри пустого поля',
    rows: 'Строк',
    rows_help: 'Сколько строк видно, от 2 до 12',
    required: 'Обязательное',
    required_help: 'Без него форма не отправится',
    hint: 'Пояснение',
    hint_help: 'Строка под полем',
    name: 'Имя поля',
    name_help: 'Под каким именем форма отправит значение',
    size: 'Размер',
    size_help: 'Маленький, обычный или большой',
  }),
  ...words('form_checkbox', {
    label: 'Подпись',
    label_help: 'Слова рядом с флажком',
    hint: 'Подсказка',
    hint_help: 'Строка под подписью',
    checked: 'Включено сразу',
    checked_help: 'Отмечено ли с самого начала',
    name: 'Имя поля',
    name_help: 'Под каким именем форма отправит значение',
    size: 'Размер',
    size_help: 'Маленький, обычный или большой',
  }),
  ...words('form_switch', {
    label: 'Подпись',
    label_help: 'Слова рядом с флажком',
    hint: 'Подсказка',
    hint_help: 'Строка под подписью',
    checked: 'Включено сразу',
    checked_help: 'Отмечено ли с самого начала',
    name: 'Имя поля',
    name_help: 'Под каким именем форма отправит значение',
    size: 'Размер',
    size_help: 'Маленький, обычный или большой',
  }),
  ...words('form_select', {
    label: 'Подпись',
    label_help: 'Слова над полем',
    options: 'Варианты',
    options_help: 'Варианты через запятую',
    placeholder: 'Подсказка в поле',
    placeholder_help: 'Текст внутри пустого поля',
    required: 'Обязательное',
    required_help: 'Без него форма не отправится',
    name: 'Имя поля',
    name_help: 'Под каким именем форма отправит значение',
    size: 'Размер',
    size_help: 'Маленький, обычный или большой',
  }),
  ...words('form_button_submit', {
    text: 'Текст',
    text_help: 'Слова на кнопке',
    appearance: 'Вид',
    appearance_help: 'Как выделяется кнопка',
    'appearance.default': 'Залитая',
    'appearance.tonal': 'Тоновая',
    'appearance.outline': 'Контурная',
    size: 'Размер',
    size_help: 'Маленький, обычный или большой',
  }),
  ...words('catalogue.group', {
    text: 'Текст',
    media: 'Медиа',
    elements: 'Элементы',
    layout: 'Макет',
    page_parts: 'Части страницы',
    marketing: 'Маркетинг',
    data: 'Данные',
    forms: 'Формы',
  }),
  ...words('catalogue.type', {
    layout_container: 'Контейнер',
    layout_grid: 'Сетка',
    layout_spacer: 'Пустое место',
    element_button: 'Кнопка',
    element_button_icon: 'Кнопка-значок',
    element_badge: 'Метка',
    element_icon: 'Значок',
    form_form: 'Форма',
    form_input: 'Поле',
    form_textarea: 'Многострочное поле',
    form_checkbox: 'Флажок',
    form_switch: 'Переключатель',
    form_select: 'Список',
    form_button_submit: 'Кнопка отправки',
  }),
  ...words('catalogue.variant', {
    'layout_section.plain': 'Пустая',
    'layout_section.soft': 'На мягком фоне',
    'layout_section.accent': 'На акцентном фоне',
    'layout_section.text': 'С областью текста',
    'layout_section.two_columns': 'Две колонки',
    'layout_container.narrow': 'Узкий, для текста',
    'layout_container.normal': 'Шириной страницы',
    'layout_container.soft': 'На мягком фоне',
    'layout_grid.cards_2': 'Две карточки',
    'layout_grid.cards_3': 'Три карточки',
    'layout_grid.cards_4': 'Четыре карточки',
    'element_button.plain': 'Кнопка',
    'element_button.icon': 'Со значком',
    'element_button.outline': 'Контурная',
    'form_form.request': 'Заявка: имя и телефон',
    'form_form.message': 'Сообщение: имя, почта и текст',
  }),
};

const EDITOR_FIELD_WORDS = Object.freeze({ en: Object.freeze(EN), ru: Object.freeze(RU) });

const STABLE_SEGMENT = /^[a-z][a-z0-9_]*$/u;

/** Every word key a field reads: its label, its help and its stable choices. */
/** The keys of the catalogue's words: the fixed groups, and the built-in types and variants that name one. */
function catalogueWordKeys() {
  const keys = Object.values(_catalogue_mjs__WEBPACK_IMPORTED_MODULE_2__.CATALOGUE_GROUP_TABLE).map(({ label_key: key }) => key);
  for (const manifest of _builtins_mjs__WEBPACK_IMPORTED_MODULE_1__.BUILTIN_TYPE_MANIFESTS) {
    keys.push(...[manifest.catalogue?.label_key, manifest.catalogue?.help_key].filter(Boolean));
    for (const variant of manifest.variants || []) if (variant.label_key) keys.push(variant.label_key);
  }
  return [...new Set(keys)];
}

function editorFieldKeys(field) {
  if (!field || typeof field.label_key !== 'string') return [];
  const keys = [field.label_key];
  if (typeof field.help_key === 'string') keys.push(field.help_key);
  for (const choice of Array.isArray(field.choices) ? field.choices : []) {
    if (typeof choice === 'string' && STABLE_SEGMENT.test(choice)) keys.push(`${field.label_key}.${choice}`);
  }
  return keys;
}

/**
 * The `messages` renderFieldFallback and a host's form read, for one editor
 * manifest, a list of them, or every built-in one when none is given. The
 * language is `locale` when it is named, else the language of `node` (the
 * nearest [lang], SF.language.use(), <html lang>), else English. A word
 * registered for `sf-composition` wins over the shipped one; a key with no
 * word in any language is left out, so the host's own words or the key show.
 */
function editorFieldMessages(manifests, { node = null, locale } = {}) {
  const list = manifests === undefined ? _builtins_mjs__WEBPACK_IMPORTED_MODULE_1__.BUILTIN_EDITOR_MANIFESTS : Array.isArray(manifests) ? manifests : [manifests];
  const language = locale || (0,_page_language_js__WEBPACK_IMPORTED_MODULE_0__.pageLocale)(node);
  const messages = {};
  // Without a manifest, the words of the built-in types' named places too
  // (a slot's label_key and empty_key; one block editor, 2026-11-03).
  // And the catalogue's words (2026-11-04): each group's name, and the name
  // of each built-in type and variant that gives a label_key.
  if (manifests === undefined) {
    for (const slot of _builtins_mjs__WEBPACK_IMPORTED_MODULE_1__.BUILTIN_TYPE_MANIFESTS.flatMap((manifest) => Object.values(manifest.slots || {}))) {
      for (const key of [slot.label_key, slot.empty_key].filter(Boolean)) messages[key] = (0,_page_language_js__WEBPACK_IMPORTED_MODULE_0__.localeText)(EDITOR_FIELD_WORDS, key, language, EDITOR_WORDS_OWNER);
    }
    for (const key of catalogueWordKeys()) messages[key] = (0,_page_language_js__WEBPACK_IMPORTED_MODULE_0__.localeText)(EDITOR_FIELD_WORDS, key, language, EDITOR_WORDS_OWNER);
  }
  for (const manifest of list) {
    for (const field of manifest?.fields || []) {
      for (const key of editorFieldKeys(field)) {
        const word = (0,_page_language_js__WEBPACK_IMPORTED_MODULE_0__.localeText)(EDITOR_FIELD_WORDS, key, language, EDITOR_WORDS_OWNER);
        if (word !== key) messages[key] = word;
      }
    }
  }
  return messages;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ EDITOR_FIELD_WORDS, EDITOR_WORDS_OWNER, catalogueWordKeys, editorFieldKeys, editorFieldMessages });

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "3765e2c966fd"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   projectDocumentEditorFields: () => (/* binding */ projectDocumentEditorFields),
/* harmony export */   projectEditorFields: () => (/* binding */ projectEditorFields),
/* harmony export */   validateEditorManifest: () => (/* binding */ validateEditorManifest)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac24888e7d3e");
/* harmony import */ var _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("18b9c76994c9");
/* harmony import */ var _utilities_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("b88de35f4919");





const SCHEMA = 'simai.composition.editor-manifest.v1';
const MANIFEST_FIELDS = new Set(['schema', 'schema_version', 'type', 'type_version', 'applies_to', 'fields']);
const APPLIES_FIELDS = new Set(['views', 'presets', 'modifiers']);
const FIELD_FIELDS = new Set([
  'key', 'plane', 'target', 'property', 'constraints', 'group', 'visibility',
  'choices', 'default', 'label_key', 'help_key', 'capability_hints',
  'permission_hints', 'owner',
]);
const PROPERTY_FIELDS = new Set(['type', 'version']);
const PLANES = new Set(['props', 'data', 'presentation']);
const GROUPS = new Set(['preset', 'basic', 'advanced']);
const VISIBILITIES = new Set(['visible', 'collapsed', 'hidden']);
const PRESENTATION_TARGETS = new Set(['view', 'preset']);
const FORBIDDEN_KEYS = new Set([
  'actor', 'authorization', 'class', 'classname', 'cookie', 'endpoint', 'eval',
  'expression', 'function', 'handler', 'html', 'innerhtml', 'javascript', 'method',
  'password', 'php', 'query', 'request', 'script', 'secret', 'sql', 'token',
]);

const diagnostic = (code, path, message) => ({ code, path, message });
const stableKey = (value) => typeof value === 'string' && /^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)*$/u.test(value);
const componentType = (value) => typeof value === 'string' && /^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/u.test(value);
const version = (value) => typeof value === 'string' && /^[0-9]+\.[0-9]+\.[0-9]+$/u.test(value);
const owner = (value) => typeof value === 'string' && /^[a-z][a-z0-9.-]*\/[a-z][a-z0-9.-]*$/u.test(value);
const scalar = (value) => value === null
  || typeof value === 'string'
  || typeof value === 'boolean'
  || (typeof value === 'number' && Number.isFinite(value));
const forbiddenIdentity = (value) => typeof value === 'string'
  && value.split('.').some((part) => FORBIDDEN_KEYS.has(part.toLowerCase().replaceAll('-', '').replaceAll('_', '')));

function unknownFields(value, allowed, path, diagnostics) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) return;
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) diagnostics.push(diagnostic('editor_unknown_field', `${path}.${key}`, `Unknown editor field ${key}`));
  }
}

function scanForbidden(value, path, diagnostics) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => scanForbidden(entry, `${path}[${index}]`, diagnostics));
    return;
  }
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) return;
  for (const [key, entry] of Object.entries(value)) {
    const normalized = key.toLowerCase().replaceAll('-', '').replaceAll('_', '');
    if (FORBIDDEN_KEYS.has(normalized)) {
      diagnostics.push(diagnostic('editor_executable_or_secret_field_forbidden', `${path}.${key}`, `Field ${key} is not portable editor metadata`));
    }
    scanForbidden(entry, `${path}.${key}`, diagnostics);
  }
}

function propertyIdentities(propertyTypes) {
  if (propertyTypes === undefined) return null;
  const identities = new Set();
  for (const entry of propertyTypes) {
    if (typeof entry === 'string') identities.add(entry);
    else if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry)) identities.add(`${entry.type}@${entry.version}`);
  }
  return identities;
}

function validateHintList(value, path, diagnostics) {
  if (value === undefined) return;
  if (!Array.isArray(value) || value.length > 50 || value.some((entry) => !stableKey(entry)) || new Set(value).size !== value.length) {
    diagnostics.push(diagnostic('editor_hint_list_invalid', path, 'Hints must be a bounded unique stable-key list'));
  }
}

function selectionValues(typeManifest, target) {
  if (target === 'view') return typeManifest.presentation?.views || [];
  if (target === 'preset') return typeManifest.presentation?.presets || [];
  return [];
}

function validateAppliesTo(value, typeManifest, diagnostics) {
  if (value === undefined) return;
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) {
    diagnostics.push(diagnostic('editor_applies_to_invalid', '$.applies_to', 'applies_to must be an object'));
    return;
  }
  unknownFields(value, APPLIES_FIELDS, '$.applies_to', diagnostics);
  for (const [key, registeredKey] of [['views', 'views'], ['presets', 'presets'], ['modifiers', 'modifiers']]) {
    if (value[key] === undefined) continue;
    if (!Array.isArray(value[key]) || value[key].length === 0 || value[key].some((entry) => typeof entry !== 'string') || new Set(value[key]).size !== value[key].length) {
      diagnostics.push(diagnostic('editor_applies_to_invalid', `$.applies_to.${key}`, `${key} must be a non-empty unique string list`));
      continue;
    }
    const registered = new Set(typeManifest.presentation?.[registeredKey] || []);
    for (const entry of value[key]) {
      if (!registered.has(entry)) diagnostics.push(diagnostic('editor_presentation_choice_unknown', `$.applies_to.${key}`, `${entry} is not registered by the type manifest`));
    }
  }
}

function validateEditorManifest(editorManifest, given, options = {}) {
  const diagnostics = [];
  // A type's parameter sets are its props too (parameter-sets.mjs).
  const typeManifest = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(given) ? (0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_2__.expandParameterSets)(given) : given;
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(editorManifest)) return { valid: false, diagnostics: [diagnostic('editor_manifest_invalid', '$', 'Editor manifest must be an object')] };
  unknownFields(editorManifest, MANIFEST_FIELDS, '$', diagnostics);
  scanForbidden(editorManifest, '$', diagnostics);
  if (!(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.isSchema)(editorManifest, 'simai.composition.editor-manifest', 1)) diagnostics.push(diagnostic('editor_schema_unknown', '$.schema', `Expected ${SCHEMA}, or simai.composition.editor-manifest with schema_version 1`));
  if (!componentType(editorManifest.type)) diagnostics.push(diagnostic('editor_type_invalid', '$.type', 'Component type is invalid'));
  if (!version(editorManifest.type_version)) diagnostics.push(diagnostic('editor_type_version_invalid', '$.type_version', 'Component type version is invalid'));
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(typeManifest) || typeManifest.type !== editorManifest.type || typeManifest.version !== editorManifest.type_version) {
    diagnostics.push(diagnostic('editor_type_registration_mismatch', '$.type', 'Editor manifest must bind one exact registered type revision'));
  }
  validateAppliesTo(editorManifest.applies_to, typeManifest || {}, diagnostics);
  if (!Array.isArray(editorManifest.fields) || editorManifest.fields.length > 200) {
    diagnostics.push(diagnostic('editor_fields_invalid', '$.fields', 'fields must be a bounded array'));
    return { valid: false, diagnostics };
  }

  const keys = new Set();
  const destinations = new Set();
  const availablePropertyTypes = propertyIdentities(options.propertyTypes);
  editorManifest.fields.forEach((field, index) => {
    const path = `$.fields[${index}]`;
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(field)) {
      diagnostics.push(diagnostic('editor_field_invalid', path, 'Editor field must be an object'));
      return;
    }
    unknownFields(field, FIELD_FIELDS, path, diagnostics);
    if (!stableKey(field.key)) diagnostics.push(diagnostic('editor_field_key_invalid', `${path}.key`, 'Field key must be stable'));
    else if (keys.has(field.key)) diagnostics.push(diagnostic('editor_field_key_duplicate', `${path}.key`, `Duplicate field key ${field.key}`));
    else keys.add(field.key);
    if (!PLANES.has(field.plane)) diagnostics.push(diagnostic('editor_plane_unknown', `${path}.plane`, 'Field plane is unknown'));
    if (!stableKey(field.target)) diagnostics.push(diagnostic('editor_target_invalid', `${path}.target`, 'Field target must be stable'));
    if (forbiddenIdentity(field.key)) diagnostics.push(diagnostic('editor_executable_or_secret_field_forbidden', `${path}.key`, 'Field key names executable or secret data'));
    if (forbiddenIdentity(field.target)) diagnostics.push(diagnostic('editor_executable_or_secret_field_forbidden', `${path}.target`, 'Field target names executable or secret data'));
    const destination = `${field.plane}.${field.target}`;
    if (destinations.has(destination)) diagnostics.push(diagnostic('editor_destination_duplicate', `${path}.target`, `Duplicate destination ${destination}`));
    else destinations.add(destination);
    if (!GROUPS.has(field.group)) diagnostics.push(diagnostic('editor_group_unknown', `${path}.group`, 'Field group is unknown'));
    if (!VISIBILITIES.has(field.visibility)) diagnostics.push(diagnostic('editor_visibility_unknown', `${path}.visibility`, 'Field visibility is unknown'));
    if (!stableKey(field.label_key)) diagnostics.push(diagnostic('editor_label_key_invalid', `${path}.label_key`, 'Localization key must be stable'));
    if (field.help_key !== undefined && !stableKey(field.help_key)) diagnostics.push(diagnostic('editor_help_key_invalid', `${path}.help_key`, 'Help localization key must be stable'));
    validateHintList(field.capability_hints, `${path}.capability_hints`, diagnostics);
    validateHintList(field.permission_hints, `${path}.permission_hints`, diagnostics);
    if (!owner(field.owner)) diagnostics.push(diagnostic('editor_owner_invalid', `${path}.owner`, 'Owner must be a portable owner id'));
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(field.constraints)) diagnostics.push(diagnostic('editor_constraints_invalid', `${path}.constraints`, 'Constraints must be an object'));

    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(field.property)) diagnostics.push(diagnostic('editor_property_invalid', `${path}.property`, 'Property identity must be an object'));
    else {
      unknownFields(field.property, PROPERTY_FIELDS, `${path}.property`, diagnostics);
      if (!stableKey(field.property.type)) diagnostics.push(diagnostic('editor_property_type_invalid', `${path}.property.type`, 'Property type must be stable'));
      if (!Number.isInteger(field.property.version) || field.property.version < 1) diagnostics.push(diagnostic('editor_property_version_invalid', `${path}.property.version`, 'Property version must be positive'));
      if (availablePropertyTypes && !availablePropertyTypes.has(`${field.property.type}@${field.property.version}`)) {
        diagnostics.push(diagnostic('editor_property_registration_unknown', `${path}.property`, 'Property type and version are not registered by the host'));
      }
    }

    if (field.choices !== undefined && (!Array.isArray(field.choices) || field.choices.length === 0 || field.choices.length > 200 || field.choices.some((entry) => !scalar(entry)) || new Set(field.choices.map(_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)).size !== field.choices.length)) {
      diagnostics.push(diagnostic('editor_choices_invalid', `${path}.choices`, 'Choices must be a bounded unique scalar list'));
    }
    if ('default' in field && !scalar(field.default)) diagnostics.push(diagnostic('editor_default_invalid', `${path}.default`, 'Default must be scalar'));
    if ('default' in field && Array.isArray(field.choices) && !field.choices.some((choice) => (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(choice) === (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(field.default))) {
      diagnostics.push(diagnostic('editor_default_choice_unknown', `${path}.default`, 'Default must be one of the allowed choices'));
    }

    if (field.plane === 'presentation') {
      if (!PRESENTATION_TARGETS.has(field.target)) diagnostics.push(diagnostic('editor_presentation_target_unsupported', `${path}.target`, 'Only view and preset are scalar editable presentation targets'));
      const registered = new Set(selectionValues(typeManifest || {}, field.target));
      for (const choice of field.choices || []) {
        if (typeof choice !== 'string' || !registered.has(choice)) diagnostics.push(diagnostic('editor_presentation_choice_unknown', `${path}.choices`, `${String(choice)} is not registered by the type manifest`));
      }
    } else if (PLANES.has(field.plane) && (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(typeManifest)) {
      const schema = field.plane === 'props' ? typeManifest.props_schema : typeManifest.data_schema;
      if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(schema?.properties) || !(field.target in schema.properties)) diagnostics.push(diagnostic('editor_destination_unknown', `${path}.target`, `${destination} is not declared by the type manifest`));
    }
  });
  return { valid: diagnostics.length === 0, diagnostics };
}

const BREAKPOINT_KEYS = new Set(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

function nodeValue(node, field, typeManifest) {
  const plane = node?.[field.plane];
  if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(plane) && field.target in plane) {
    const value = plane[field.target];
    // A layout parameter held per screen (x-simai-utility responsive): the
    // field shows the phone's value and lists the screens that differ, for a
    // per-screen switch.
    const responsive = field.plane === 'props' && (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_3__.isResponsive)(typeManifest?.props_schema?.properties?.[field.target]);
    if (responsive && (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && Object.keys(value).every((key) => BREAKPOINT_KEYS.has(key))) {
      return { value: 'xs' in value ? value.xs : ('default' in field ? field.default : null), source: 'xs' in value ? 'node' : 'default', screens: value };
    }
    return { value, source: 'node' };
  }
  if ('default' in field) return { value: field.default, source: 'default' };
  return { value: null, source: 'unset' };
}

function projectEditorFields(editorManifest, given, node, options = {}) {
  const typeManifest = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(given) ? (0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_2__.expandParameterSets)(given) : given;
  const checked = validateEditorManifest(editorManifest, typeManifest, options);
  if (!checked.valid) return { valid: false, fields: [], diagnostics: checked.diagnostics };
  const diagnostics = [];
  const fields = editorManifest.fields.map((field) => {
    const current = nodeValue(node, field, typeManifest);
    if (current.source !== 'unset' && field.choices && !field.choices.some((choice) => (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(choice) === (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(current.value))) {
      diagnostics.push(diagnostic('editor_choice_unknown', `node:${node?.id || ''}.${field.plane}.${field.target}`, 'Current value is not an allowed choice'));
    }
    return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({ ...field, destination: `${field.plane}.${field.target}`, ...current });
  });
  return { valid: diagnostics.length === 0, fields, diagnostics };
}

function projectDocumentEditorFields(document, typeRegistry, editorManifests, options = {}) {
  const byType = new Map();
  for (const manifest of editorManifests || []) {
    const identity = `${manifest.type}@${manifest.type_version}`;
    if (byType.has(identity)) return { valid: false, instances: [], diagnostics: [diagnostic('editor_manifest_duplicate', '$', `Duplicate editor manifest ${identity}`)] };
    byType.set(identity, manifest);
  }
  const instances = [];
  const diagnostics = [];
  const visit = (node) => {
    const typeManifest = typeRegistry?.types instanceof Map ? typeRegistry.types.get(node.type) : undefined;
    if (typeManifest) {
      const editorManifest = byType.get(`${typeManifest.type}@${typeManifest.version}`);
      if (editorManifest) {
        const projected = projectEditorFields(editorManifest, typeManifest, node, options);
        diagnostics.push(...projected.diagnostics.map((entry) => ({ ...entry, instance: node.id })));
        instances.push({ id: node.id, type: node.type, fields: projected.fields });
      }
    }
    for (const children of Object.values(node.slots || {})) for (const child of children) visit(child);
  };
  if (document?.root) visit(document.root);
  return { valid: diagnostics.length === 0, instances, diagnostics };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ projectDocumentEditorFields, projectEditorFields, validateEditorManifest });


/***/ },

/***/ "07d89539a7af"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PRINTED_ELEMENT_TABLE: () => (/* binding */ PRINTED_ELEMENT_TABLE)
/* harmony export */ });
// Generated by scripts/generate-composition-contracts.mjs from src/smart/*/smart.manifest.json; do not edit.
// The smart elements a block's renderer may print, with the inputs it may set (elements.mjs).
const PRINTED_ELEMENT_TABLE = Object.freeze({
  "sf-badge": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "activity": {
          "default": "",
          "enum": [
            "",
            "running",
            "waiting",
            "done",
            "stopped",
            "failed"
          ],
          "type": "string"
        },
        "appearance": {
          "default": "main",
          "enum": [
            "main",
            "tonal",
            "outline"
          ],
          "type": "string"
        },
        "aria-label": {
          "default": "",
          "type": "string"
        },
        "compact": {
          "default": false,
          "type": "boolean"
        },
        "icon": {
          "default": "",
          "type": "string"
        },
        "icon-end": {
          "default": "",
          "type": "string"
        },
        "icon-position": {
          "default": "start",
          "enum": [
            "start",
            "end"
          ],
          "type": "string"
        },
        "icon-start": {
          "default": "",
          "type": "string"
        },
        "line": {
          "default": "",
          "enum": [
            "",
            "1/2",
            "1",
            "2"
          ],
          "type": "string"
        },
        "scheme": {
          "default": "neutral",
          "enum": [
            "neutral",
            "primary",
            "secondary",
            "tertiary",
            "on-surface"
          ],
          "type": "string"
        },
        "size": {
          "default": "1/3",
          "enum": [
            "1/3",
            "1/2",
            "1"
          ],
          "type": "string"
        },
        "status": {
          "default": "",
          "enum": [
            "",
            "info",
            "success",
            "warning",
            "error"
          ],
          "type": "string"
        },
        "text": {
          "default": "",
          "type": "string"
        },
        "tight": {
          "default": false,
          "type": "boolean"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.badge",
    "version": "1.3.1"
  },
  "sf-button": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "appearance": {
          "default": "default",
          "enum": [
            "default",
            "tonal",
            "outline",
            "ghost",
            "surface"
          ],
          "type": "string"
        },
        "aria-label": {
          "default": "",
          "type": "string"
        },
        "disabled": {
          "default": false,
          "type": "boolean"
        },
        "expanded": {
          "default": false,
          "type": "boolean"
        },
        "form": {
          "default": "",
          "type": "string"
        },
        "href": {
          "default": "",
          "type": "string"
        },
        "icon": {
          "default": "",
          "type": "string"
        },
        "icon-end": {
          "default": "",
          "type": "string"
        },
        "icon-position": {
          "default": "start",
          "enum": [
            "start",
            "end"
          ],
          "type": "string"
        },
        "icon-start": {
          "default": "",
          "type": "string"
        },
        "loading": {
          "default": false,
          "type": "boolean"
        },
        "name": {
          "default": "",
          "type": "string"
        },
        "native-type": {
          "default": "button",
          "enum": [
            "button",
            "submit",
            "reset"
          ],
          "type": "string"
        },
        "pressed": {
          "default": false,
          "type": "boolean"
        },
        "radius": {
          "default": "",
          "enum": [
            "",
            "default",
            "square",
            "rounded"
          ],
          "type": "string"
        },
        "rel": {
          "default": "",
          "type": "string"
        },
        "scheme": {
          "default": "primary",
          "enum": [
            "primary",
            "secondary",
            "on-surface",
            "on-surface-variant"
          ],
          "type": "string"
        },
        "segment": {
          "default": "",
          "enum": [
            "",
            "start",
            "middle",
            "end"
          ],
          "type": "string"
        },
        "shortcut": {
          "default": "",
          "type": "string"
        },
        "shortcut-listen": {
          "default": false,
          "type": "boolean"
        },
        "size": {
          "default": "1",
          "enum": [
            "1/3",
            "1/2",
            "1",
            "2",
            "3"
          ],
          "type": "string"
        },
        "spacing": {
          "default": "normal",
          "enum": [
            "compact",
            "normal",
            "comfortable",
            "spacious"
          ],
          "type": "string"
        },
        "status": {
          "default": "",
          "enum": [
            "",
            "danger"
          ],
          "type": "string"
        },
        "target": {
          "default": "",
          "type": "string"
        },
        "text": {
          "default": "",
          "type": "string"
        },
        "text-position": {
          "default": "center",
          "enum": [
            "start",
            "center",
            "end",
            "justify"
          ],
          "type": "string"
        },
        "text-pressed": {
          "default": "",
          "type": "string"
        },
        "theme-cycle": {
          "default": "",
          "type": "string"
        },
        "value": {
          "default": "",
          "type": "string"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.button",
    "version": "1.9.0"
  },
  "sf-button-icon": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "appearance": {
          "default": "default",
          "enum": [
            "default",
            "tonal",
            "outline",
            "ghost"
          ],
          "type": "string"
        },
        "aria-label": {
          "default": "",
          "type": "string"
        },
        "badge-cap": {
          "default": 99,
          "minimum": 1,
          "type": "integer"
        },
        "badge-count": {
          "default": "",
          "type": "string"
        },
        "badge-dot": {
          "default": false,
          "type": "boolean"
        },
        "badge-label": {
          "default": "",
          "type": "string"
        },
        "disabled": {
          "default": false,
          "type": "boolean"
        },
        "filled": {
          "default": false,
          "type": "boolean"
        },
        "icon": {
          "default": "add",
          "type": "string"
        },
        "kind": {
          "default": "icon",
          "enum": [
            "icon",
            "close"
          ],
          "type": "string"
        },
        "label-pressed": {
          "default": "",
          "type": "string"
        },
        "loading": {
          "default": false,
          "type": "boolean"
        },
        "native-type": {
          "default": "button",
          "enum": [
            "button",
            "submit",
            "reset"
          ],
          "type": "string"
        },
        "pressed": {
          "default": false,
          "type": "boolean"
        },
        "radius": {
          "default": "",
          "enum": [
            "",
            "default",
            "square",
            "rounded"
          ],
          "type": "string"
        },
        "scheme": {
          "default": "primary",
          "enum": [
            "primary",
            "on-surface",
            "on-surface-variant"
          ],
          "type": "string"
        },
        "segment": {
          "default": "",
          "enum": [
            "",
            "start",
            "middle",
            "end"
          ],
          "type": "string"
        },
        "size": {
          "default": "1",
          "enum": [
            "1/3",
            "1/2",
            "1",
            "2",
            "3"
          ],
          "type": "string"
        },
        "spacing": {
          "default": "normal",
          "enum": [
            "compact",
            "normal",
            "comfortable",
            "spacious"
          ],
          "type": "string"
        },
        "status": {
          "default": "",
          "enum": [
            "",
            "danger"
          ],
          "type": "string"
        },
        "theme-cycle": {
          "default": "",
          "type": "string"
        },
        "value": {
          "default": "",
          "type": "string"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.button-icon",
    "version": "1.7.1"
  },
  "sf-checkbox": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "aria-label": {
          "default": "",
          "type": "string"
        },
        "checked": {
          "default": false,
          "type": "boolean"
        },
        "description": {
          "default": "",
          "type": "string"
        },
        "disabled": {
          "default": false,
          "type": "boolean"
        },
        "help": {
          "default": "",
          "type": "string"
        },
        "indeterminate": {
          "default": false,
          "type": "boolean"
        },
        "invalid": {
          "default": false,
          "type": "boolean"
        },
        "label": {
          "default": "",
          "type": "string"
        },
        "name": {
          "default": "",
          "type": "string"
        },
        "position": {
          "default": "start",
          "enum": [
            "start",
            "end"
          ],
          "type": "string"
        },
        "size": {
          "default": "1",
          "enum": [
            "1/2",
            "1",
            "2"
          ],
          "type": "string"
        },
        "value": {
          "default": "on",
          "type": "string"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.checkbox",
    "version": "1.1.6"
  },
  "sf-divider": {
    "component": "component.content-divider",
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "orientation": {
          "default": "horizontal",
          "enum": [
            "horizontal",
            "vertical"
          ],
          "type": "string"
        }
      },
      "type": "object"
    },
    "kind": "class"
  },
  "sf-dropdown": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "appearance": {
          "default": "outlined",
          "enum": [
            "filled",
            "outlined"
          ],
          "type": "string"
        },
        "aria-label": {
          "default": "",
          "type": "string"
        },
        "columns": {
          "default": 6,
          "type": "number"
        },
        "disabled": {
          "default": false,
          "type": "boolean"
        },
        "inherited-text": {
          "default": "",
          "type": "string"
        },
        "inherited-value": {
          "default": "",
          "type": "string"
        },
        "label": {
          "default": "",
          "type": "string"
        },
        "layout": {
          "default": "list",
          "enum": [
            "list",
            "grid"
          ],
          "type": "string"
        },
        "mode": {
          "default": "select",
          "enum": [
            "tag",
            "select"
          ],
          "type": "string"
        },
        "multiple": {
          "default": false,
          "type": "boolean"
        },
        "name": {
          "default": "",
          "type": "string"
        },
        "options": {
          "type": "string"
        },
        "placeholder": {
          "type": "string"
        },
        "portal": {
          "default": true,
          "type": "boolean"
        },
        "required": {
          "default": false,
          "type": "boolean"
        },
        "reset-label": {
          "default": "",
          "type": "string"
        },
        "search": {
          "default": true,
          "type": "boolean"
        },
        "search-placeholder": {
          "type": "string"
        },
        "size": {
          "default": "1",
          "enum": [
            "1/2",
            "1",
            "2"
          ],
          "type": "string"
        },
        "value": {
          "default": "",
          "type": "string"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.dropdown",
    "version": "1.7.3"
  },
  "sf-icon": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "badge-cap": {
          "default": 99,
          "minimum": 1,
          "type": "integer"
        },
        "badge-count": {
          "default": "",
          "type": "string"
        },
        "badge-dot": {
          "default": false,
          "type": "boolean"
        },
        "badge-label": {
          "default": "",
          "type": "string"
        },
        "filled": {
          "default": false,
          "type": "boolean"
        },
        "grade": {
          "default": 0,
          "maximum": 200,
          "minimum": -50,
          "type": "integer"
        },
        "icon": {
          "default": "",
          "type": "string"
        },
        "label": {
          "default": "",
          "type": "string"
        },
        "optical-size": {
          "default": 24,
          "maximum": 48,
          "minimum": 20,
          "type": "number"
        },
        "size": {
          "default": "",
          "enum": [
            "",
            "1/4",
            "1/3",
            "1/2",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7"
          ],
          "type": "string"
        },
        "type": {
          "default": "",
          "enum": [
            "",
            "outlined",
            "rounded",
            "sharp"
          ],
          "type": "string"
        },
        "weight": {
          "default": 400,
          "maximum": 700,
          "minimum": 100,
          "type": "integer"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.icon",
    "version": "1.1.6"
  },
  "sf-input": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "appearance": {
          "default": "bordered",
          "enum": [
            "bordered",
            "filled",
            "hidden"
          ],
          "type": "string"
        },
        "aria-label": {
          "default": "",
          "type": "string"
        },
        "autocomplete": {
          "default": "",
          "type": "string"
        },
        "default-value": {
          "default": "",
          "type": "string"
        },
        "disabled": {
          "default": false,
          "type": "boolean"
        },
        "error-message": {
          "default": "",
          "type": "string"
        },
        "hint": {
          "default": "",
          "type": "string"
        },
        "hint-icon": {
          "default": "",
          "type": "string"
        },
        "icon-start": {
          "default": "",
          "type": "string"
        },
        "inherited-text": {
          "default": "",
          "type": "string"
        },
        "inherited-value": {
          "default": "",
          "type": "string"
        },
        "input-type": {
          "default": "text",
          "enum": [
            "text",
            "email",
            "password",
            "search",
            "tel",
            "url",
            "number"
          ],
          "type": "string"
        },
        "inputmode": {
          "default": "",
          "enum": [
            "",
            "none",
            "text",
            "tel",
            "url",
            "email",
            "numeric",
            "decimal",
            "search"
          ],
          "type": "string"
        },
        "invalid": {
          "default": false,
          "type": "boolean"
        },
        "label": {
          "default": "",
          "type": "string"
        },
        "mask": {
          "default": false,
          "type": "boolean"
        },
        "mask-lazy": {
          "default": "",
          "type": "string"
        },
        "mask-options": {
          "default": "",
          "type": "string"
        },
        "mask-pattern": {
          "default": "",
          "type": "string"
        },
        "mask-placeholder-char": {
          "default": "",
          "type": "string"
        },
        "max": {
          "default": "",
          "type": "string"
        },
        "maxlength": {
          "default": "",
          "type": "string"
        },
        "min": {
          "default": "",
          "type": "string"
        },
        "minlength": {
          "default": "",
          "type": "string"
        },
        "name": {
          "default": "",
          "type": "string"
        },
        "pattern": {
          "default": "",
          "type": "string"
        },
        "placeholder": {
          "default": "",
          "type": "string"
        },
        "radius": {
          "default": "",
          "enum": [
            "",
            "default",
            "square",
            "rounded"
          ],
          "type": "string"
        },
        "readonly": {
          "default": false,
          "type": "boolean"
        },
        "required": {
          "default": false,
          "type": "boolean"
        },
        "reset-label": {
          "default": "",
          "type": "string"
        },
        "size": {
          "default": "1",
          "enum": [
            "1/3",
            "1/2",
            "1",
            "2",
            "3"
          ],
          "type": "string"
        },
        "step": {
          "default": "",
          "type": "string"
        },
        "text-end": {
          "default": "",
          "type": "string"
        },
        "value": {
          "default": "",
          "type": "string"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.input",
    "version": "1.6.0"
  },
  "sf-input-textarea": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "appearance": {
          "default": "bordered",
          "enum": [
            "bordered",
            "filled",
            "flush"
          ],
          "type": "string"
        },
        "aria-label": {
          "default": "",
          "type": "string"
        },
        "aria-labelledby": {
          "default": "",
          "type": "string"
        },
        "auto-grow": {
          "default": false,
          "type": "boolean"
        },
        "autocomplete": {
          "default": "",
          "type": "string"
        },
        "disabled": {
          "default": false,
          "type": "boolean"
        },
        "error-message": {
          "default": "",
          "type": "string"
        },
        "hint": {
          "default": "",
          "type": "string"
        },
        "inherited-text": {
          "default": "",
          "type": "string"
        },
        "inherited-value": {
          "default": "",
          "type": "string"
        },
        "inputmode": {
          "default": "",
          "enum": [
            "",
            "none",
            "text",
            "tel",
            "url",
            "email",
            "numeric",
            "decimal",
            "search"
          ],
          "type": "string"
        },
        "invalid": {
          "default": false,
          "type": "boolean"
        },
        "label": {
          "default": "",
          "type": "string"
        },
        "mask": {
          "default": false,
          "type": "boolean"
        },
        "mask-options": {
          "default": "",
          "type": "string"
        },
        "mask-pattern": {
          "default": "",
          "type": "string"
        },
        "max-rows": {
          "type": "number"
        },
        "maxlength": {
          "type": "number"
        },
        "min-rows": {
          "default": 1,
          "type": "number"
        },
        "minlength": {
          "type": "number"
        },
        "name": {
          "default": "",
          "type": "string"
        },
        "placeholder": {
          "default": "",
          "type": "string"
        },
        "readonly": {
          "default": false,
          "type": "boolean"
        },
        "required": {
          "default": false,
          "type": "boolean"
        },
        "reset-label": {
          "default": "",
          "type": "string"
        },
        "rows": {
          "default": 3,
          "type": "number"
        },
        "size": {
          "default": "1",
          "enum": [
            "1/2",
            "1",
            "2"
          ],
          "type": "string"
        },
        "spell-check": {
          "default": true,
          "type": "boolean"
        },
        "value": {
          "default": "",
          "type": "string"
        },
        "wrap": {
          "default": "soft",
          "enum": [
            "soft",
            "hard"
          ],
          "type": "string"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.input-textarea",
    "version": "1.7.3"
  },
  "sf-switch": {
    "inputs": {
      "additionalProperties": false,
      "properties": {
        "aria-label": {
          "default": "",
          "type": "string"
        },
        "checked": {
          "default": false,
          "type": "boolean"
        },
        "description": {
          "default": "",
          "type": "string"
        },
        "disabled": {
          "default": false,
          "type": "boolean"
        },
        "help": {
          "default": "",
          "type": "string"
        },
        "inherited-text": {
          "default": "",
          "type": "string"
        },
        "inherited-value": {
          "default": "",
          "type": "string"
        },
        "label": {
          "default": "",
          "type": "string"
        },
        "name": {
          "default": "",
          "type": "string"
        },
        "reset-label": {
          "default": "",
          "type": "string"
        },
        "size": {
          "default": "1",
          "enum": [
            "1/2",
            "1",
            "2"
          ],
          "type": "string"
        },
        "value": {
          "default": "on",
          "type": "string"
        }
      },
      "type": "object"
    },
    "kind": "custom-element",
    "manifest": "smart.switch",
    "version": "1.3.3"
  }
});


/***/ },

/***/ "3ad83f3699c7"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PRINTED_ELEMENTS: () => (/* binding */ PRINTED_ELEMENTS),
/* harmony export */   checkPrintedElements: () => (/* binding */ checkPrintedElements),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   elementInputs: () => (/* binding */ elementInputs),
/* harmony export */   printElement: () => (/* binding */ printElement)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("07d89539a7af");
// Smart elements a block prints (one block editor, 2026-11-03): a block's
// renderer may draw sf-button, sf-button-icon, sf-badge, sf-icon and the
// sf-divider class component, with attributes from their smart.manifest.json
// inputs (elements.generated.mjs) and nothing else. printElement makes the
// markup from inputs and refuses what a manifest does not take;
// checkPrintedElements reads HTML a renderer wrote by hand and reports every
// attribute those manifests do not take.
//
// An element draws itself in the browser (the Loader loads it); the HTML only
// names it. A block prints no inline style, no free classes on the element
// (root-class) and no legacy or alias names.




const PRINTED_ELEMENTS = Object.freeze(Object.keys(_elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__.PRINTED_ELEMENT_TABLE));

// Attributes any printed element may carry beside its inputs: an editor's and
// the composition's own markers, and the host's class for its placement.
const HOST_ATTRIBUTE = /^(?:class|id|slot|data-[a-z0-9-]+)$/u;
const ATTRIBUTE = /([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/gu;

const diagnostic = (code, path, message, details = {}) => ({ code, path, message, ...details });
const escapeAttribute = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const unescape = (value) => String(value).replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');

/** The inputs schema of a printed element, or null. */
function elementInputs(name) {
  return Object.hasOwn(_elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__.PRINTED_ELEMENT_TABLE, name) ? _elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__.PRINTED_ELEMENT_TABLE[name].inputs : null;
}

function labelProblem(name, inputs, path) {
  // An element a reader must be able to name: a button with words or a label,
  // an icon button with its label.
  if (name === 'sf-button' && !inputs.text && !inputs['aria-label']) return diagnostic('element_label_missing', path, 'sf-button prints its text or an aria-label');
  if (name === 'sf-button-icon' && !inputs['aria-label']) return diagnostic('element_label_missing', path, 'sf-button-icon prints an aria-label');
  return null;
}

/**
 * The markup of one element from its inputs: {html, diagnostics}. `check(value,
 * schema, path, diagnostics)` is the Composition JSON Schema check. A value
 * equal to the input's default is left out; a boolean prints only when true.
 * An input the manifest does not take, or a value it refuses, prints nothing.
 */
function printElement(name, inputs = {}, check = undefined, path = '$') {
  const entry = _elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__.PRINTED_ELEMENT_TABLE[name];
  if (!Object.hasOwn(_elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__.PRINTED_ELEMENT_TABLE, name)) return { html: '', diagnostics: [diagnostic('element_unknown', path, `${String(name)} is not an element a block prints; they are ${PRINTED_ELEMENTS.join(', ')}`)] };
  const diagnostics = [];
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(inputs)) return { html: '', diagnostics: [diagnostic('element_inputs_invalid', path, 'Inputs are an object')] };
  const properties = entry.inputs.properties;
  for (const key of Object.keys(inputs)) {
    if (!Object.hasOwn(properties, key)) diagnostics.push(diagnostic('element_input_unknown', `${path}.${key}`, `${name} takes no input ${key}`, { element: name, input: key }));
  }
  // Unknown inputs are reported above, once; the schema holds the values.
  if (typeof check === 'function') check(inputs, { ...entry.inputs, additionalProperties: true }, path, diagnostics);
  const label = labelProblem(name, inputs, path);
  if (label) diagnostics.push(label);
  if (diagnostics.length) return { html: '', diagnostics };
  if (entry.kind === 'class') {
    const vertical = inputs.orientation === 'vertical';
    return { html: `<hr class="sf-divider sf-divider-${vertical ? 'vertical' : 'horizontal'}"${vertical ? ' aria-orientation="vertical"' : ''}>`, diagnostics };
  }
  const attributes = Object.keys(inputs).sort().flatMap((key) => {
    const value = inputs[key];
    if ('default' in properties[key] && value === properties[key].default) return [];
    if (typeof value === 'boolean') return value ? [` ${key}`] : [];
    return [` ${key}="${escapeAttribute(value)}"`];
  });
  return { html: `<${name}${attributes.join('')}></${name}>`, diagnostics };
}

/** The value an attribute stands for, read by the input's type. */
function attributeValue(raw, schema) {
  if (schema.type === 'boolean') return raw === undefined || raw === '' || raw === 'true' ? true : raw === 'false' ? false : raw;
  if (raw === undefined) return '';
  if (schema.type === 'integer' || schema.type === 'number') return /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/u.test(raw) ? Number(raw) : raw;
  return unescape(raw);
}

/**
 * Every printed element in HTML a renderer wrote, held to its manifest: an
 * attribute that is not an input (nor a host attribute), a value the input
 * refuses, an inline style, a missing label. Returns the diagnostics.
 */
function checkPrintedElements(html, check = undefined, path = '$') {
  const diagnostics = [];
  if (typeof html !== 'string') return diagnostics;
  const names = PRINTED_ELEMENTS.filter((name) => _elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__.PRINTED_ELEMENT_TABLE[name].kind === 'custom-element');
  const tag = new RegExp(`<(${names.join('|')})(?=[\\s>/])([^>]*)>`, 'gu');
  for (const match of html.matchAll(tag)) {
    const [, name, rest] = match;
    const at = `${path}<${name}>@${match.index}`;
    const properties = _elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__.PRINTED_ELEMENT_TABLE[name].inputs.properties;
    const inputs = {};
    for (const attribute of rest.matchAll(ATTRIBUTE)) {
      const key = attribute[1].toLowerCase();
      const raw = attribute[2] ?? attribute[3] ?? attribute[4];
      if (key === 'style') diagnostics.push(diagnostic('element_inline_style', at, `${name} prints no inline style`, { element: name }));
      else if (Object.hasOwn(properties, key)) inputs[key] = attributeValue(raw, properties[key]);
      else if (!HOST_ATTRIBUTE.test(key)) diagnostics.push(diagnostic('element_input_unknown', `${at}.${key}`, `${name} takes no input ${key}`, { element: name, input: key }));
    }
    if (typeof check === 'function') check(inputs, _elements_generated_mjs__WEBPACK_IMPORTED_MODULE_1__.PRINTED_ELEMENT_TABLE[name].inputs, at, diagnostics);
    const label = labelProblem(name, inputs, at);
    if (label) diagnostics.push(label);
  }
  return diagnostics;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ PRINTED_ELEMENTS, checkPrintedElements, elementInputs, printElement });


/***/ },

/***/ "4e6fc63bed81"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUILTIN_FIELD_KINDS: () => (/* binding */ BUILTIN_FIELD_KINDS),
/* harmony export */   applyFieldValue: () => (/* binding */ applyFieldValue),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fieldKindRegistry: () => (/* binding */ fieldKindRegistry),
/* harmony export */   parseFieldSubmission: () => (/* binding */ parseFieldSubmission),
/* harmony export */   renderFieldFallback: () => (/* binding */ renderFieldFallback),
/* harmony export */   resolveFieldKind: () => (/* binding */ resolveFieldKind),
/* harmony export */   validateFieldKinds: () => (/* binding */ validateFieldKinds),
/* harmony export */   validateFieldValue: () => (/* binding */ validateFieldValue)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac24888e7d3e");



// Editor field kinds. A kind is derived from the exact host Property identity
// and the presence of choices in a simai.composition.editor-manifest.v1 field;
// the editor manifest schema is unchanged. Each kind fixes value schema,
// default, normalization, validation, accessibility, themes, localization and
// the server-rendered fallback control. Hosts keep persistence and access.

const STABLE_SEGMENT = /^[a-z][a-z0-9_]*$/u;
const INTEGER_TEXT = /^-?(?:0|[1-9][0-9]*)$/u;

const BUILTIN_FIELD_KINDS = Object.freeze([
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.editor-field-kind', 1),
    kind: 'choice',
    version: 1,
    status: 'formalized-existing',
    match: { property: [{ type: 'string', version: 1 }, { type: 'string', version: 2 }], choices: 'required' },
    value_schema: { type: 'string', minLength: 1 },
    default: { kind: null, field: 'must-be-a-choice' },
    constraints: { allowed: ['min_length', 'max_length'] },
    normalization: { form: 'exact-string', unset: 'absent-field', stored: 'value' },
    validation: ['choice-member'],
    accessibility: { control: 'select', role: 'combobox', name: 'label_key', description: 'help_key via aria-describedby', keyboard: ['Tab', 'ArrowUp', 'ArrowDown', 'Enter', 'Space', 'Escape'] },
    themes: { modes: ['light', 'dark'], tokens: ['--sf-surface-1', '--sf-on-surface', '--sf-outline', '--sf-primary'], contrast: 'WCAG 2.2 AA' },
    localization: { label: 'label_key', help: 'help_key', value_labels: '<label_key>.<choice> when the choice is a stable segment, otherwise the raw choice', direction: 'logical' },
    server_fallback: { element: 'select', value: 'option value', enhanced_control: 'sf-dropdown' },
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.editor-field-kind', 1),
    kind: 'integer',
    version: 1,
    status: 'formalized-existing',
    match: { property: [{ type: 'integer', version: 1 }], choices: 'forbidden' },
    value_schema: { type: 'integer', minimum: -9007199254740991, maximum: 9007199254740991 },
    default: { kind: null, field: 'must-satisfy-constraints' },
    constraints: { allowed: ['min', 'max'], required: ['min', 'max'] },
    normalization: { form: 'decimal-integer-text', unset: 'empty-text', stored: 'safe-integer' },
    validation: ['integer-text', 'range'],
    accessibility: { control: 'input[type=number]', role: 'spinbutton', name: 'label_key', description: 'help_key via aria-describedby', keyboard: ['Tab', 'ArrowUp', 'ArrowDown', 'digits'] },
    themes: { modes: ['light', 'dark'], tokens: ['--sf-surface-1', '--sf-on-surface', '--sf-outline', '--sf-primary'], contrast: 'WCAG 2.2 AA' },
    localization: { label: 'label_key', help: 'help_key', value_labels: 'none', direction: 'logical', digits: 'ASCII decimal' },
    server_fallback: { element: 'input', type: 'number', attributes: ['min', 'max', 'step=1', 'inputmode=numeric'], enhanced_control: 'sf-input' },
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.editor-field-kind', 1),
    kind: 'text',
    version: 1,
    status: 'new',
    match: { property: [{ type: 'string', version: 2 }], choices: 'forbidden' },
    value_schema: { type: 'string', minLength: 1, maxLength: 2000 },
    default: { kind: null, field: 'must-satisfy-constraints' },
    constraints: { allowed: ['min_length', 'max_length'], required: ['max_length'] },
    normalization: { form: 'exact-string-no-trim-no-unicode-normalization', unset: 'empty-text', stored: 'value' },
    validation: ['code-point-length', 'no-control-characters', 'well-formed-unicode'],
    accessibility: { control: 'input[type=text]', role: 'textbox', name: 'label_key', description: 'help_key via aria-describedby', keyboard: ['Tab', 'text entry'], attributes: ['dir=auto', 'maxlength'] },
    themes: { modes: ['light', 'dark'], tokens: ['--sf-surface-1', '--sf-on-surface', '--sf-outline', '--sf-primary'], contrast: 'WCAG 2.2 AA' },
    localization: { label: 'label_key', help: 'help_key', value_labels: 'none', direction: 'dir=auto per value; value is author content in the Document locale' },
    server_fallback: { element: 'input', type: 'text', attributes: ['maxlength', 'dir=auto'], enhanced_control: 'sf-input' },
  },
  {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.editor-field-kind', 1),
    kind: 'toggle',
    version: 1,
    status: 'new',
    match: { property: [{ type: 'boolean', version: 1 }], choices: 'forbidden' },
    value_schema: { type: 'boolean' },
    default: { kind: false, field: 'false-or-absent' },
    constraints: { allowed: [] },
    normalization: { form: 'present-true-absent-false', unset: 'false', stored: 'true only; false removes the key' },
    validation: ['strict-boolean'],
    accessibility: { control: 'input[type=checkbox][role=switch]', role: 'switch', name: 'label_key', description: 'help_key via aria-describedby', keyboard: ['Tab', 'Space'], states: ['checked'] },
    themes: { modes: ['light', 'dark'], tokens: ['--sf-surface-1', '--sf-on-surface', '--sf-outline', '--sf-primary'], contrast: 'WCAG 2.2 AA' },
    localization: { label: 'label_key', help: 'help_key', value_labels: 'none', direction: 'logical' },
    server_fallback: { element: 'input', type: 'checkbox', attributes: ['role=switch', 'value=true'], enhanced_control: 'sf-switch' },
  },
]);

const diagnostic = (code, path, message) => ({ code, path, message });

function codePoints(value) {
  return [...value].length;
}

function wellFormed(value) {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return false;
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return false;
    }
  }
  return true;
}

function hasControl(value) {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code < 32 || code === 127) return true;
  }
  return false;
}

/** Returns the kind manifest that governs an editor field, or null. */
function resolveFieldKind(field, kinds = BUILTIN_FIELD_KINDS) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(field?.property)) return null;
  const hasChoices = Array.isArray(field.choices);
  const matches = kinds.filter((kind) => kind.match.property.some((property) => property.type === field.property.type && property.version === field.property.version)
    && (kind.match.choices === 'required' ? hasChoices : !hasChoices));
  return matches.length === 1 ? matches[0] : null;
}

/** Checks one normalized value against its field; returns diagnostics. */
function validateFieldValue(field, value, path = '$') {
  const kind = resolveFieldKind(field);
  if (!kind) return [diagnostic('field_kind_unknown', path, 'The field does not map to exactly one published kind')];
  const constraints = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(field.constraints) ? field.constraints : {};
  const problems = [];
  if (kind.kind === 'choice') {
    if (typeof value !== 'string' || !field.choices.includes(value)) problems.push(diagnostic('field_value_choice', path, 'Value is not an allowed choice'));
  } else if (kind.kind === 'integer') {
    if (!Number.isSafeInteger(value)) problems.push(diagnostic('field_value_type', path, 'Value must be a safe integer'));
    else if ((Number.isInteger(constraints.min) && value < constraints.min) || (Number.isInteger(constraints.max) && value > constraints.max)) problems.push(diagnostic('field_value_range', path, 'Value is outside the allowed range'));
  } else if (kind.kind === 'text') {
    if (typeof value !== 'string') problems.push(diagnostic('field_value_type', path, 'Value must be a string'));
    else if (!wellFormed(value)) problems.push(diagnostic('field_value_unicode', path, 'Value must be well-formed Unicode'));
    else if (hasControl(value)) problems.push(diagnostic('field_value_control', path, 'Value cannot contain control characters'));
    else {
      const length = codePoints(value);
      const min = Math.max(1, Number.isInteger(constraints.min_length) ? constraints.min_length : 1);
      const max = Math.min(2000, Number.isInteger(constraints.max_length) ? constraints.max_length : 2000);
      if (length < min || length > max) problems.push(diagnostic('field_value_length', path, 'Value length is outside the allowed range'));
    }
  } else if (kind.kind === 'toggle' && typeof value !== 'boolean') {
    problems.push(diagnostic('field_value_type', path, 'Value must be a boolean'));
  }
  return problems;
}

/** Kind-specific manifest rules added on top of validateEditorManifest. */
function validateFieldKinds(editorManifest) {
  const problems = [];
  (Array.isArray(editorManifest?.fields) ? editorManifest.fields : []).forEach((field, index) => {
    const path = `$.fields[${index}]`;
    const kind = resolveFieldKind(field);
    if (!kind) {
      problems.push(diagnostic('field_kind_unknown', path, 'The field does not map to exactly one published kind'));
      return;
    }
    const constraints = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(field.constraints) ? field.constraints : {};
    for (const key of Object.keys(constraints)) {
      if (!kind.constraints.allowed.includes(key)) problems.push(diagnostic('field_constraint_unknown', `${path}.constraints.${key}`, `${key} is not a ${kind.kind} constraint`));
    }
    for (const key of kind.constraints.required || []) {
      if (!Number.isInteger(constraints[key])) problems.push(diagnostic('field_constraint_required', `${path}.constraints.${key}`, `${kind.kind} requires ${key}`));
    }
    if (kind.kind === 'choice') {
      const min = Number.isInteger(constraints.min_length) ? constraints.min_length : 0;
      const max = Number.isInteger(constraints.max_length) ? constraints.max_length : Infinity;
      if (min > max) problems.push(diagnostic('field_constraint_invalid', `${path}.constraints`, 'min_length must not exceed max_length'));
      for (const choice of field.choices) {
        if (typeof choice !== 'string' || codePoints(choice) < min || codePoints(choice) > max) problems.push(diagnostic('field_choice_invalid', `${path}.choices`, `${String(choice)} violates the choice constraints`));
      }
    }
    if (kind.kind === 'integer' && Number.isInteger(constraints.min) && Number.isInteger(constraints.max) && constraints.min > constraints.max) {
      problems.push(diagnostic('field_constraint_invalid', `${path}.constraints`, 'min must not exceed max'));
    }
    if (kind.kind === 'text' && Number.isInteger(constraints.min_length) && Number.isInteger(constraints.max_length) && constraints.min_length > constraints.max_length) {
      problems.push(diagnostic('field_constraint_invalid', `${path}.constraints`, 'min_length must not exceed max_length'));
    }
    if (kind.kind === 'toggle' && 'default' in field && field.default !== false) problems.push(diagnostic('field_default_invalid', `${path}.default`, 'A toggle default must be false or absent'));
    if (kind.kind !== 'toggle' && 'default' in field) problems.push(...validateFieldValue(field, field.default, `${path}.default`).map((entry) => ({ ...entry, code: 'field_default_invalid' })));
  });
  return problems;
}

/**
 * Normalizes one submitted form value. raw is the submitted string, or null
 * when the control sent nothing. Returns {value} or {unset: true} or {error}.
 */
function parseFieldSubmission(field, raw) {
  const kind = resolveFieldKind(field);
  if (!kind) return { error: diagnostic('field_kind_unknown', '$', 'The field does not map to exactly one published kind') };
  if (raw !== null && typeof raw !== 'string') return { error: diagnostic('field_submission_invalid', '$', 'A submission must be a string or absent') };
  let value;
  if (kind.kind === 'toggle') {
    if (raw !== null && raw !== 'true') return { error: diagnostic('field_submission_invalid', '$', 'A toggle submits only true') };
    return raw === 'true' ? { value: true } : { unset: true };
  }
  if (raw === null || raw === '') return { unset: true };
  if (kind.kind === 'integer') {
    if (!INTEGER_TEXT.test(raw)) return { error: diagnostic('field_value_type', '$', 'Value must be a decimal integer') };
    value = Number(raw);
  } else {
    value = raw;
  }
  const problems = validateFieldValue(field, value);
  return problems.length ? { error: problems[0] } : { value };
}

/** Returns a new node with the field value set, or the key removed when unset. */
function applyFieldValue(node, field, result) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(result) || result.error || (result.unset !== true && !('value' in result))) {
    throw new TypeError('applyFieldValue requires a successful parseFieldSubmission result');
  }
  const next = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)(JSON.parse(JSON.stringify(node)));
  const plane = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(next[field.plane]) ? { ...next[field.plane] } : {};
  if (result.unset || (resolveFieldKind(field)?.kind === 'toggle' && result.value === false)) delete plane[field.target];
  else plane[field.target] = result.value;
  if (Object.keys(plane).length) next[field.plane] = plane;
  else delete next[field.plane];
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)(next);
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function controlId(instance, field) {
  return `sf-field-${instance}-${field.key}`.replace(/[^A-Za-z0-9_-]/gu, '-');
}

/**
 * Server-rendered fallback control for one projected field (the output of
 * projectEditorFields plus its instance id). Works without JavaScript; the
 * submitted name is "<instance>.<destination>". Missing translations fall back
 * to the stable key text.
 */
function renderFieldFallback(field, { instance, messages = {} } = {}) {
  const kind = resolveFieldKind(field);
  if (!kind) throw new TypeError('field_kind_unknown');
  // Hidden fields are not rendered; a form handler must skip them so that
  // their stored values stay unchanged.
  if (field.visibility === 'hidden') return '';
  const id = controlId(instance, field);
  const name = escapeHtml(`${instance}.${field.plane}.${field.target}`);
  const label = escapeHtml(messages[field.label_key] ?? field.label_key);
  const helpId = field.help_key ? `${id}-help` : null;
  const described = helpId ? ` aria-describedby="${helpId}"` : '';
  const help = helpId ? `<small class="sf-editor-field-help" id="${helpId}">${escapeHtml(messages[field.help_key] ?? field.help_key)}</small>` : '';
  const value = field.value ?? field.default ?? null;
  const constraints = field.constraints || {};
  let control;
  if (kind.kind === 'toggle') {
    control = `<input class="sf-editor-field-control" type="checkbox" role="switch" id="${id}" name="${name}" value="true"${value === true ? ' checked' : ''}${described}><label for="${id}">${label}</label>`;
  } else if (kind.kind === 'choice') {
    const options = field.choices.map((choice) => {
      const text = STABLE_SEGMENT.test(choice) ? (messages[`${field.label_key}.${choice}`] ?? choice) : choice;
      return `<option value="${escapeHtml(choice)}"${choice === value ? ' selected' : ''}>${escapeHtml(text)}</option>`;
    }).join('');
    control = `<label for="${id}">${label}</label><select class="sf-editor-field-control" id="${id}" name="${name}"${described}>${value === null ? '<option value="" selected></option>' : ''}${options}</select>`;
  } else if (kind.kind === 'integer') {
    const bounds = `${Number.isInteger(constraints.min) ? ` min="${constraints.min}"` : ''}${Number.isInteger(constraints.max) ? ` max="${constraints.max}"` : ''}`;
    control = `<label for="${id}">${label}</label><input class="sf-editor-field-control" type="number" inputmode="numeric" step="1"${bounds} id="${id}" name="${name}" value="${value === null ? '' : escapeHtml(value)}"${described}>`;
  } else {
    const max = Math.min(2000, Number.isInteger(constraints.max_length) ? constraints.max_length : 2000);
    control = `<label for="${id}">${label}</label><input class="sf-editor-field-control" type="text" dir="auto" maxlength="${max}" id="${id}" name="${name}" value="${value === null ? '' : escapeHtml(value)}"${described}>`;
  }
  const html = `<div class="sf-editor-field" data-sf-field-kind="${kind.kind}" data-sf-field-group="${escapeHtml(field.group)}">${control}${help}</div>`;
  return field.visibility === 'collapsed'
    ? `<details class="sf-editor-field-disclosure"><summary>${label}</summary>${html}</details>`
    : html;
}

function fieldKindRegistry() {
  return JSON.parse((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)({ ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.editor-field-kind-registry', 1), entries: BUILTIN_FIELD_KINDS }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ BUILTIN_FIELD_KINDS, applyFieldValue, parseFieldSubmission, renderFieldFallback, resolveFieldKind, validateFieldKinds, validateFieldValue });


/***/ },

/***/ "fb0bdf7719f0"
(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FILE_ICONS: () => (/* binding */ FILE_ICONS),
/* harmony export */   FILE_SIZE_UNITS: () => (/* reexport safe */ _format_js__WEBPACK_IMPORTED_MODULE_0__.FILE_SIZE_UNITS),
/* harmony export */   fileIcon: () => (/* binding */ fileIcon),
/* harmony export */   fileNameFromAddress: () => (/* binding */ fileNameFromAddress),
/* harmony export */   fileSizeUnits: () => (/* reexport safe */ _format_js__WEBPACK_IMPORTED_MODULE_0__.fileSizeUnits),
/* harmony export */   formatFileSize: () => (/* reexport safe */ _format_js__WEBPACK_IMPORTED_MODULE_0__.formatFileSize)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5b8371b87515");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_format_js__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
// How a stored file reads to people: its size in the page's language and its
// name when nobody gave it one. sf-image-field wrote these first (its
// value.mjs re-exports them); the Composition renderer draws content.file with
// the same rule, so a size reads the same in a field and on a page. No DOM.

// The size rule is core's number format (core/js/format.js, reuse audit
// 2026-11-02 finding 7), re-exported under the names this module published:
// formatFileSize(size, units, locale) still reads as it did. Imported through
// format.js on purpose: the builder ships a source module's relative imports
// beside it, and this import is what lays core/js/format.js and its parts
// (format-*.js) in the distribution for products that import them. None of
// them has a top-level side effect, so a bundle keeps only what it calls.


// The last part of an address, decoded, without its query and fragment: the
// name a file is shown under when it has no label.
function fileNameFromAddress(href) {
  const tail = String(href).split(/[?#]/u)[0].split('/').pop() || '';
  try {
    return decodeURIComponent(tail);
  } catch {
    return tail;
  }
}

// The icon of a file's kind, by its media type: sf-download-file's own glyph
// (download) when the type says nothing a reader would recognise. The
// Composition renderer draws content.file with it; an editor that draws the
// same row (sf-content-editor) imports it from here rather than keeping a copy.
// Each entry is [pattern, icon]; the first pattern that matches wins.
const FILE_ICONS = Object.freeze([
  [/^application\/pdf$/u, 'picture_as_pdf'],
  [/^image\//u, 'image'],
  [/^video\//u, 'movie'],
  [/^audio\//u, 'audio_file'],
  [/^application\/(?:zip|x-zip-compressed|x-7z-compressed|x-rar-compressed|vnd\.rar|x-tar|gzip|x-gzip)$/u, 'folder_zip'],
  [/^(?:text\/csv|application\/vnd\.ms-excel|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.[a-z.]+|application\/vnd\.oasis\.opendocument\.spreadsheet)$/u, 'table_chart'],
  [/^(?:application\/vnd\.ms-powerpoint|application\/vnd\.openxmlformats-officedocument\.presentationml\.[a-z.]+|application\/vnd\.oasis\.opendocument\.presentation)$/u, 'slideshow'],
  [/^(?:text\/|application\/msword$|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.[a-z.]+$|application\/vnd\.oasis\.opendocument\.text$|application\/rtf$)/u, 'description'],
].map((entry) => Object.freeze(entry)));

// The icon name for a media type; download when there is none or nothing matches.
function fileIcon(mime) {
  if (typeof mime !== 'string' || !mime) return 'download';
  return FILE_ICONS.find(([pattern]) => pattern.test(mime))?.[1] ?? 'download';
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "c2e3ed8498dc"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FRAGMENT_DESCRIPTOR_SCHEMA: () => (/* binding */ FRAGMENT_DESCRIPTOR_SCHEMA),
/* harmony export */   checkFragmentDescriptor: () => (/* binding */ checkFragmentDescriptor),
/* harmony export */   defineFragmentBoundary: () => (/* binding */ defineFragmentBoundary),
/* harmony export */   definePageHost: () => (/* binding */ definePageHost),
/* harmony export */   publishEffects: () => (/* binding */ publishEffects)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac24888e7d3e");
/* harmony import */ var _routing_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4aea5d6d49c7");




// The interface fragment descriptor (simai.interface-fragment 1.0.0): checked
// here so a package gate, a page and a test read one rule. Returns the list of
// problems, empty when the descriptor holds; never coerces.
const FRAGMENT_DESCRIPTOR_SCHEMA = 'simai.interface-fragment.v1';

const FIELDS = ['schema', 'id', 'element', 'regions', 'port', 'outputs', 'inputs', 'operation', 'url_state', 'budget'];
const ID = /^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/u;
const ELEMENT = /^[a-z][a-z0-9]*-[a-z0-9-]+$/u;
const NAME = /^[a-z][a-z0-9-]{0,31}$/u;
const STANDARD = /^[a-z][a-z0-9.-]*$/u;
const VERSION = /^[0-9]+\.[0-9]+\.[0-9]+$/u;
const OPERATION = /^[a-z][a-z0-9._:-]{0,127}$/u;
const URL_KEY = /^[a-z][a-z0-9_-]{0,63}$/u;

const closed = (value, allowed) => (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && Object.keys(value).every((key) => allowed.includes(key));
const uniqueList = (value, max, test) => Array.isArray(value) && value.length <= max
  && new Set(value).size === value.length && value.every(test);

function portProblems(ports, where) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(ports)) return [`${where}: not an object`];
  const names = Object.keys(ports);
  const problems = names.length > 16 ? [`${where}: more than 16 ports`] : [];
  for (const name of names) {
    const port = ports[name];
    if (!NAME.test(name)) problems.push(`${where}.${name}: name`);
    if (!closed(port, ['value', 'summary'])) { problems.push(`${where}.${name}: undeclared keys`); continue; }
    if ((0,_routing_mjs__WEBPACK_IMPORTED_MODULE_2__.valueTypeName)(port.value) === null) problems.push(`${where}.${name}: unknown value type ${port.value}`);
    if (typeof port.summary !== 'string' || !port.summary.trim() || port.summary.length > 1000) problems.push(`${where}.${name}: summary`);
  }
  return problems;
}

function checkFragmentDescriptor(descriptor) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(descriptor)) return ['descriptor: not an object'];
  const problems = [];
  const keys = Object.keys(descriptor);
  for (const field of FIELDS) if (!keys.includes(field)) problems.push(`${field}: required`);
  for (const key of keys) if (!FIELDS.includes(key) && key !== 'schema_version') problems.push(`${key}: undeclared`);
  // Either form of the format name: simai.interface-fragment.v1, or
  // simai.interface-fragment with schema_version 1 (schema-name.mjs).
  if (!(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.isSchema)(descriptor, 'simai.interface-fragment', 1)) problems.push('schema: not simai.interface-fragment, schema_version 1');
  if (typeof descriptor.id !== 'string' || !ID.test(descriptor.id)) problems.push('id: a dotted identity');
  if (typeof descriptor.element !== 'string' || !ELEMENT.test(descriptor.element)) problems.push('element: a custom element name');
  if (!uniqueList(descriptor.regions, 8, (region) => typeof region === 'string' && NAME.test(region)) || !descriptor.regions.length) problems.push('regions: one to eight region names');
  const port = descriptor.port;
  if (!closed(port, ['standard', 'version']) || !STANDARD.test(port?.standard ?? '') || !VERSION.test(port?.version ?? '')) problems.push('port: {standard, version}');
  if ('outputs' in descriptor) problems.push(...portProblems(descriptor.outputs, 'outputs'));
  if ('inputs' in descriptor) problems.push(...portProblems(descriptor.inputs, 'inputs'));
  if (typeof descriptor.operation !== 'string' || !OPERATION.test(descriptor.operation)) problems.push('operation: an access operation token');
  if (!uniqueList(descriptor.url_state, 16, (key) => typeof key === 'string' && URL_KEY.test(key))) problems.push('url_state: up to sixteen query keys');
  const budget = descriptor.budget;
  if (!closed(budget, ['kb', 'first_answer_ms'])
    || !Number.isSafeInteger(budget.kb) || budget.kb < 0 || budget.kb > 2048
    || !Number.isSafeInteger(budget.first_answer_ms) || budget.first_answer_ms < 0 || budget.first_answer_ms > 10000) problems.push('budget: {kb 0-2048, first_answer_ms 0-10000}');
  return problems;
}

// The page host as an endpoint (simai.interface-fragment, host-is-an-endpoint).
// A product's port answers carry `effects` -- [{type: 'record-changed',
// value}, ...] -- and the page publishes them on this element's outputs, one
// output per value type, named by the type without its version
// (record-changed, files-moved ...). The routes the page declares deliver them
// to the fragments that listen; the host never calls a fragment itself. An
// effect's type is read in either form, the bare name or the older label with
// the version (record-changed.v1), until the change journal retires the older
// one (value-types-without-version); both publish the same value on the same
// output. The host's own declared outputs keep the older labels.
//
//   <sf-composition-scope data-sf-routes='[{"id": "files-refresh",
//       "from": {"endpoint": "host", "port": "collection-changed", "value": "collection-changed.v1"},
//       "to": {"endpoint": "files", "port": "changed", "value": "collection-changed.v1"}}]'>
//     <sf-page-host data-sf-endpoint="host"></sf-page-host>
//     ...
//   </sf-composition-scope>
const PAGE_EFFECT_TYPES = ['record-changed.v1', 'record-removed.v1', 'collection-changed.v1', 'files-moved.v1', 'counter.v1', 'navigation.v1', 'preference-changed.v1'];
const effectPort = (type) => (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_2__.valueTypeName)(type);
const PAGE_EFFECT_PORTS = PAGE_EFFECT_TYPES.map(effectPort);

function definePageHost(registry = globalThis.customElements) {
  if (!registry || typeof globalThis.HTMLElement !== 'function') return null;
  const existing = registry.get('sf-page-host');
  if (existing) return existing;
  class SfPageHost extends globalThis.HTMLElement {
    static sfPorts = Object.freeze({
      outputs: Object.freeze(Object.fromEntries(PAGE_EFFECT_TYPES.map((type) => [effectPort(type), type]))),
      inputs: Object.freeze({}),
    });

    connectedCallback() {
      this.hidden = true;
    }

    // The host takes nothing in: what it says, it says from the product.
    sfPortInput() {
      throw new TypeError('sf-page-host has no inputs');
    }

    // Each effect is checked against its value type and published; one that
    // fails its check, or names a type the host does not publish, is refused
    // and reported, and the others still go.
    publish(effects = []) {
      const published = [];
      const refused = [];
      for (const effect of Array.isArray(effects) ? effects : []) {
        const type = effect?.type;
        if (!PAGE_EFFECT_PORTS.includes((0,_routing_mjs__WEBPACK_IMPORTED_MODULE_2__.valueTypeName)(type))) {
          refused.push({type: type ?? null, reason: 'type_not_published'});
          continue;
        }
        let value;
        try {
          value = (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_2__.valueTypeEntry)(type).check(effect.value);
        } catch (error) {
          refused.push({type, reason: 'value_invalid', message: String(error?.message ?? error)});
          continue;
        }
        this.dispatchEvent(new globalThis.CustomEvent('sf-port-output', {bubbles: true, detail: {port: effectPort(type), value}}));
        published.push(type);
      }
      if (refused.length) this.dispatchEvent(new globalThis.CustomEvent('sf-page-host-refused', {bubbles: true, detail: {refused}}));
      return {published, refused};
    }
  }
  registry.define('sf-page-host', SfPageHost);
  return SfPageHost;
}

// Effects from wherever an answer arrived: the page host of the scope the
// origin stands in, or the page's only host when the origin stands in none.
function publishEffects(effects, {origin = null} = {}) {
  if (!Array.isArray(effects) || !effects.length) return {published: [], refused: []};
  const document = globalThis.document;
  const scope = origin?.closest?.('sf-composition-scope');
  const hosts = scope
    ? [...scope.querySelectorAll('sf-page-host')].filter((host) => host.parentElement?.closest('sf-composition-scope') === scope)
    : [...(document?.querySelectorAll('sf-page-host') ?? [])];
  const host = hosts.length === 1 ? hosts[0] : null;
  if (!host || typeof host.publish !== 'function') return {published: [], refused: effects.map((effect) => ({type: effect?.type ?? null, reason: 'no_page_host'}))};
  return host.publish(effects);
}

// The fragment boundary (simai.interface-fragment, failure-is-contained). A
// fragment that throws while it draws (sf-component-error), or whose element
// does not arrive within its load time, is replaced in its place by the error
// state with a retry; the rest of the page and its routes keep working.
// Retry puts the fragment's own markup back and lets it start again.
//
//   <sf-fragment data-sf-fragment="larena.file-manager" load-timeout="10000">
//     <sf-file-manager ...></sf-file-manager>
//   </sf-fragment>
const FRAGMENT_TEXT = {
  ru: {heading: 'Не удалось показать этот блок'},
  en: {heading: 'This block could not be shown'},
};

function defineFragmentBoundary(registry = globalThis.customElements) {
  if (!registry || typeof globalThis.HTMLElement !== 'function') return null;
  const existing = registry.get('sf-fragment');
  if (existing) return existing;
  class SfFragment extends globalThis.HTMLElement {
    constructor() {
      super();
      this.markup = null;
      this.failed = null;
      this.timer = null;
      this.onError = (event) => {
        if (this.failed) return;
        event.stopPropagation();
        this.fail(event.detail?.phase ?? 'render', event.detail?.message ?? '');
      };
      this.onAction = (event) => {
        if (!this.failed || event.detail?.id !== 'retry') return;
        event.stopPropagation();
        this.retry();
      };
    }

    connectedCallback() {
      if (this.markup === null) this.markup = this.innerHTML;
      this.addEventListener('sf-component-error', this.onError);
      this.addEventListener('sf-empty-state-action', this.onAction);
      if (!this.failed) this.watchLoad();
    }

    disconnectedCallback() {
      clearTimeout(this.timer);
      this.removeEventListener('sf-component-error', this.onError);
      this.removeEventListener('sf-empty-state-action', this.onAction);
    }

    // The fragment's own element: the first custom element it holds.
    get fragmentElement() {
      return [...this.children].find((child) => child.localName.includes('-')) ?? null;
    }

    watchLoad() {
      clearTimeout(this.timer);
      const element = this.fragmentElement;
      if (!element || globalThis.customElements.get(element.localName)) return;
      const limit = Number(this.getAttribute('load-timeout')) || 10000;
      this.timer = setTimeout(() => {
        if (!globalThis.customElements.get(element.localName) && element.isConnected) this.fail('load', `${element.localName} did not load`);
      }, limit);
    }

    text(key) {
      const lang = (this.closest('[lang]')?.getAttribute('lang') || 'en').slice(0, 2);
      return (FRAGMENT_TEXT[lang] ?? FRAGMENT_TEXT.en)[key];
    }

    fail(phase, message) {
      clearTimeout(this.timer);
      this.failed = {phase, message};
      this.setAttribute('data-sf-fragment-state', 'error');
      // The fragment leaves: its elements are disconnected, so its routes and
      // listeners go with it, and what stands in its place is the error state.
      const state = globalThis.document.createElement('sf-empty-state');
      state.setAttribute('kind', 'error');
      state.setAttribute('title', this.text('heading'));
      this.replaceChildren(state);
      this.dispatchEvent(new globalThis.CustomEvent('sf-fragment-error', {
        bubbles: true, composed: true,
        detail: {fragment: this.getAttribute('data-sf-fragment'), phase, message},
      }));
    }

    retry() {
      this.failed = null;
      this.removeAttribute('data-sf-fragment-state');
      this.innerHTML = this.markup ?? '';
      this.watchLoad();
      this.dispatchEvent(new globalThis.CustomEvent('sf-fragment-retry', {bubbles: true, composed: true, detail: {fragment: this.getAttribute('data-sf-fragment')}}));
    }
  }
  registry.define('sf-fragment', SfFragment);
  return SfFragment;
}


/***/ },

/***/ "e19611ff78cb"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PASTE_BLOCKS: () => (/* binding */ PASTE_BLOCKS),
/* harmony export */   RICH_TEXT_BLOCKS: () => (/* binding */ RICH_TEXT_BLOCKS),
/* harmony export */   RICH_TEXT_ELEMENTS: () => (/* binding */ RICH_TEXT_ELEMENTS),
/* harmony export */   RICH_TEXT_PROFILES: () => (/* binding */ RICH_TEXT_PROFILES),
/* harmony export */   RICH_TEXT_SCHEMES: () => (/* binding */ RICH_TEXT_SCHEMES),
/* harmony export */   cleanTree: () => (/* binding */ cleanTree),
/* harmony export */   decodeEntities: () => (/* binding */ decodeEntities),
/* harmony export */   parseHtml: () => (/* binding */ parseHtml),
/* harmony export */   plainText: () => (/* binding */ plainText),
/* harmony export */   richTextFromPlainText: () => (/* binding */ richTextFromPlainText),
/* harmony export */   richTextHref: () => (/* binding */ richTextHref),
/* harmony export */   sanitizeRichText: () => (/* binding */ sanitizeRichText),
/* harmony export */   serialize: () => (/* binding */ serialize),
/* harmony export */   treeFromDom: () => (/* binding */ treeFromDom)
/* harmony export */ });
// The HTML subset of sf-rich-text: what the value may hold, and how anything
// else is brought into it. Larena stores page text as a property of type
// html@1, and this module is that type's rule in the browser: the editor
// cleans the value it is given, every paste and drop, and its own DOM after
// every edit and command, through the one function here.
//
// The subset:
//
//   p  h2  h3  h4  strong  em  a[href]  ul  ol  li  blockquote  br
//
// - no attribute is kept but href on <a>;
// - href is kept for https:, mailto: and tel: URLs and for a site path
//   ("/docs/a"), judged after removing control characters and white space, so
//   "java\tscript:" does not pass; "//host" and "/\host" leave the site and
//   are not kept; a link whose href is not kept becomes its text;
// - script, style and the other containers whose content is not text for a
//   reader (DROPPED) go with their content; any other element is unwrapped,
//   and its text stays; one that stands as a block (div, section, table, a
//   cell, h1, pre) still separates its text from its neighbours';
// - b and i are strong and em, and a span whose style is bold or italic is
//   too (a word processor's paste); a b whose style says normal is not;
// - text outside a block is wrapped in p, a block inside a paragraph splits
//   it, a block inside a list item becomes a line of it (br), a list holds
//   only items, adjacent lists of one kind are one list;
// - the value has no empty block, no line break at a block's edge and no
//   white space between blocks; an editor with no text is "".
//
// Two readers feed one cleaner: `treeFromDom` reads a DOM (the editor, or a
// paste parsed by the browser in an inert <template>), `parseHtml` reads a
// string without a DOM (a server, a test). Neither ever assigns the input to
// a live element. What comes out is written by `serialize` from the cleaned
// model, every text escaped, so it holds nothing the subset does not allow
// whatever the reader understood.
//
// No imports and no state: the element and the contract tests use the same
// functions.
//
// The paste profile (simai/ui-source#66). html@1 is a stored type, so it does
// not grow: a value never holds pre or table. A structured-content editor
// reads a paste with cleanTree(tree, {profile: 'paste'}), which is html@1
// plus two blocks the profile maps to its own types instead of flattening
// them into paragraphs:
//
//   {type: 'pre', text}            a code block: its text with its line
//                                  breaks and indentation (-> content.code)
//   {type: 'table', caption, rows} a simple table: rows of {head, cells},
//                                  each cell {header, leaves} with the
//                                  subset's inline leaves (-> content.table)
//
// Everything inside them is cleaned by the same rule: the same marks, the
// same href check, DROPPED goes with its content. A pre or a table inside a
// list item, and a table inside a cell, are read as html@1 reads them.
// serialize writes the two in html@1 terms (lines of a paragraph, a
// paragraph per cell), so whatever comes out of it is still the subset.
//
// The module lives in the core runtime since content.html 1.0.0: the
// Composition renderer sanitises a content.html block through it at render,
// so a page that only renders a Document needs no Smart component.
// src/smart/input-rich/js/rich-text-html.mjs re-exports it for sf-rich-text and
// the field renderers; there is one rule, here.

const RICH_TEXT_ELEMENTS = Object.freeze(['p', 'h2', 'h3', 'h4', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'blockquote', 'br']);
const RICH_TEXT_BLOCKS = Object.freeze(['p', 'h2', 'h3', 'h4']);
const RICH_TEXT_SCHEMES = Object.freeze(['https:', 'mailto:', 'tel:']);
// The profiles cleanTree reads by: html@1 itself, and the paste profile of a
// structured-content editor, which keeps PASTE_BLOCKS as blocks of their own.
const RICH_TEXT_PROFILES = Object.freeze(['html', 'paste']);
const PASTE_BLOCKS = Object.freeze(['pre', 'table']);

// Dropped with everything inside: their content is code, a document's head,
// a drawing, or a control's own data, not text for a reader.
const DROPPED = new Set([
  'script', 'style', 'template', 'head', 'title', 'meta', 'link', 'base', 'noscript',
  'iframe', 'frame', 'frameset', 'noembed', 'noframes', 'object', 'embed', 'applet',
  'svg', 'math', 'canvas', 'video', 'audio', 'img', 'picture', 'source', 'track',
  'input', 'select', 'textarea', 'xmp', 'plaintext',
]);

// Elements off the subset that stand as blocks: unwrapped, but their text is
// not run together with the text around them.
const BREAKING = new Set([
  'address', 'article', 'aside', 'body', 'caption', 'center', 'dd', 'details', 'dialog', 'dir', 'div',
  'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h5', 'h6', 'header',
  'hgroup', 'hr', 'html', 'legend', 'listing', 'main', 'menu', 'nav', 'optgroup', 'option', 'pre',
  'section', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr',
]);

const LISTS = new Set(['ul', 'ol']);
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
// Raw text: what follows the start tag up to its end tag is not markup.
const RAW = new Set(['script', 'style', 'textarea', 'title', 'xmp', 'iframe', 'noembed', 'noframes', 'noscript']);
// Where an implied </p> stops looking for the paragraph (the parser's button scope).
const P_SCOPE = new Set(['td', 'th', 'table', 'caption', 'button']);

// C0 controls, DEL and C1 controls: a browser ignores them inside a scheme.
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const CONTROLS = /[\u0000-\u001f\u007f-\u009f]/gu;
// ...and white space, which a browser also skips around and inside a scheme.
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const CONTROLS_AND_SPACE = /[\u0000- \u007f-\u009f\u00a0\u1680\u2000-\u200b\u2028\u2029\u202f\u205f\u3000\ufeff]/gu;
const HREF_MAX = 2048;

/**
 * The href sf-rich-text keeps, or null: https:, mailto: and tel: URLs and a
 * path on the site ("/docs/a", "/docs?q=1#a"). "//host", "/\host", http:,
 * javascript:, data: and anything else are not kept.
 * @param {unknown} value
 * @returns {string|null}
 */
function richTextHref(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > HREF_MAX) return null;
  const compact = trimmed.replace(CONTROLS_AND_SPACE, '');
  if (!compact) return null;
  if (compact.startsWith('/')) {
    // A site path, but not "//host" or "/\host", which leave the site.
    if (/^\/[/\\]/u.test(compact)) return null;
    const path = trimmed.replace(CONTROLS, '');
    return /^\/[/\\]/u.test(path) ? null : path;
  }
  const scheme = /^([a-z][a-z0-9+.-]*):/iu.exec(compact)?.[1]?.toLowerCase();
  if (!scheme || !RICH_TEXT_SCHEMES.includes(`${scheme}:`)) return null;
  let url;
  try {
    url = new globalThis.URL(trimmed.replace(CONTROLS, ''));
  } catch {
    return null;
  }
  if (url.protocol !== `${scheme}:`) return null;
  if (url.protocol === 'https:' && !url.hostname) return null;
  if (url.protocol !== 'https:' && url.href.length <= url.protocol.length) return null;
  return url.href;
}

// ---------------------------------------------------------------- entities

const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', shy: '\u00ad',
  hellip: '\u2026', mdash: '\u2014', ndash: '\u2013', minus: '\u2212', laquo: '\u00ab', raquo: '\u00bb',
  lsquo: '\u2018', rsquo: '\u2019', sbquo: '\u201a', ldquo: '\u201c', rdquo: '\u201d', bdquo: '\u201e',
  bull: '\u2022', middot: '\u00b7', copy: '\u00a9', reg: '\u00ae', trade: '\u2122', deg: '\u00b0',
  times: '\u00d7', divide: '\u00f7', plusmn: '\u00b1', euro: '\u20ac', pound: '\u00a3', yen: '\u00a5',
  cent: '\u00a2', sect: '\u00a7', para: '\u00b6', thinsp: '\u2009', ensp: '\u2002', emsp: '\u2003',
  zwj: '\u200d', zwnj: '\u200c', larr: '\u2190', rarr: '\u2192', uarr: '\u2191', darr: '\u2193',
  numero: '\u2116', prime: '\u2032', Prime: '\u2033',
};

function decodeEntities(text) {
  return String(text).replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]*);?/giu, (whole, body) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X' ? Number.parseInt(body.slice(2), 16) : Number.parseInt(body.slice(1), 10);
      if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return '\ufffd';
      return String.fromCodePoint(code);
    }
    return Object.hasOwn(NAMED, body) && whole.endsWith(';') ? NAMED[body] : whole;
  });
}

// ---------------------------------------------------------------- readers

// The raw tree both readers give: {type: 'element', name, attrs, children}
// and {type: 'text', value}. Only href and style are read from attributes.

/**
 * Reads an HTML string into the raw tree, without a DOM. Tolerant the way a
 * browser is for what matters here: implied ends of p and li, void elements,
 * raw-text elements, comments, entities in text and attributes.
 * @param {string} html
 */
function parseHtml(html) {
  const source = typeof html === 'string' ? html : '';
  const root = {type: 'element', name: '#root', attrs: {}, children: []};
  const stack = [root];
  const top = () => stack[stack.length - 1];
  const append = (node) => top().children.push(node);
  const appendText = (value) => {
    if (!value) return;
    const last = top().children.at(-1);
    if (last?.type === 'text') last.value += value;
    else append({type: 'text', value});
  };
  const closeTo = (name, stopAt = null) => {
    for (let index = stack.length - 1; index > 0; index -= 1) {
      const open = stack[index].name;
      if (stopAt && stopAt.has(open)) return false;
      if (open === name) {
        stack.length = index;
        return true;
      }
    }
    return false;
  };
  let at = 0;
  const length = source.length;
  while (at < length) {
    const lt = source.indexOf('<', at);
    if (lt < 0) {
      appendText(decodeEntities(source.slice(at)));
      break;
    }
    if (lt > at) appendText(decodeEntities(source.slice(at, lt)));
    at = lt;
    if (source.startsWith('<!--', at)) {
      const end = source.indexOf('-->', at + 4);
      at = end < 0 ? length : end + 3;
      continue;
    }
    const next = source[at + 1] ?? '';
    if (next === '!' || next === '?') {
      const end = source.indexOf('>', at + 2);
      at = end < 0 ? length : end + 1;
      continue;
    }
    if (next === '/') {
      const match = /^<\/([a-z][a-z0-9-]*)[^>]*>?/iu.exec(source.slice(at));
      if (!match) {
        // "</" not followed by a name is a bogus comment.
        const end = source.indexOf('>', at + 2);
        at = end < 0 ? length : end + 1;
        continue;
      }
      at += match[0].length;
      const name = match[1].toLowerCase();
      if (name === 'br') append({type: 'element', name: 'br', attrs: {}, children: []});
      else if (name === 'p' && !closeTo('p', P_SCOPE)) {
        // A </p> without a <p> is an empty paragraph, as a browser reads it.
        append({type: 'element', name: 'p', attrs: {}, children: []});
      } else closeTo(name);
      continue;
    }
    const tag = /^<([a-z][a-z0-9-]*)/iu.exec(source.slice(at));
    if (!tag) {
      appendText('<');
      at += 1;
      continue;
    }
    at += tag[0].length;
    const name = tag[1].toLowerCase();
    const attrs = {};
    let selfClosing = false;
    // Attributes, up to the closing ">".
    while (at < length) {
      const space = /^[\s/]+/u.exec(source.slice(at));
      if (space) {
        if (space[0].includes('/') && source[at + space[0].length] === '>') selfClosing = true;
        at += space[0].length;
        continue;
      }
      if (source[at] === '>') {
        at += 1;
        break;
      }
      const attr = /^([^\s/>"'=][^\s/>"'=]*)(?:\s*=\s*(?:"([^"]*)"?|'([^']*)'?|([^\s>]*)))?/u.exec(source.slice(at));
      if (!attr) {
        at += 1;
        continue;
      }
      at += attr[0].length;
      const key = attr[1].toLowerCase();
      if (!Object.hasOwn(attrs, key)) attrs[key] = decodeEntities(attr[2] ?? attr[3] ?? attr[4] ?? '');
    }
    const element = {type: 'element', name, attrs, children: []};
    if (name === 'li') closeTo('li', LISTS);
    // A block start ends an open paragraph (the browser's implied </p>).
    if (RICH_TEXT_BLOCKS.includes(name) || LISTS.has(name) || name === 'blockquote' || BREAKING.has(name)) closeTo('p', P_SCOPE);
    append(element);
    if (name === 'plaintext') {
      at = length;
      break;
    }
    if (RAW.has(name)) {
      const close = new RegExp(`</${name}[\\s/>]`, 'iu').exec(source.slice(at));
      const end = close ? at + close.index : length;
      if (name === 'textarea' || name === 'title') element.children.push({type: 'text', value: decodeEntities(source.slice(at, end))});
      else element.children.push({type: 'text', value: source.slice(at, end)});
      const gt = close ? source.indexOf('>', end) : -1;
      at = gt < 0 ? length : gt + 1;
      continue;
    }
    if (!VOID.has(name) && !selfClosing) stack.push(element);
  }
  return root;
}

const HTML_NS = 'http://www.w3.org/1999/xhtml';

/**
 * Reads a DOM subtree (an element, a fragment, a template's content) into the
 * raw tree. Elements outside the HTML namespace are dropped.
 * @param {Node} node
 */
function treeFromDom(node) {
  const read = (current) => {
    if (current.nodeType === 3) return {type: 'text', value: current.data};
    if (current.nodeType === 11) return {type: 'element', name: '#root', attrs: {}, children: [...current.childNodes].map(read).filter(Boolean)};
    if (current.nodeType !== 1) return null;
    if (current.namespaceURI && current.namespaceURI !== HTML_NS) return null;
    const name = current.localName;
    if (DROPPED.has(name)) return null;
    const attrs = {};
    const href = current.getAttribute('href');
    if (href !== null) attrs.href = href;
    const style = current.getAttribute('style');
    if (style !== null) attrs.style = style;
    const children = name === 'template' ? [] : [...current.childNodes].map(read).filter(Boolean);
    return {type: 'element', name, attrs, children};
  };
  const tree = read(node);
  if (!tree || tree.type !== 'element') return {type: 'element', name: '#root', attrs: {}, children: tree ? [tree] : []};
  return {...tree, name: '#root'};
}

// ---------------------------------------------------------------- the cleaner

// What a style says of the marks: {strong: true|false|undefined, em: ...}.
function styleMarks(style) {
  const out = {};
  if (!style) return out;
  const weight = /(?:^|;)\s*font-weight\s*:\s*([^;!]+)/iu.exec(style)?.[1]?.trim().toLowerCase();
  if (weight) {
    if (weight === 'bold' || weight === 'bolder' || Number(weight) >= 600) out.strong = true;
    else if (weight === 'normal' || weight === 'lighter' || Number(weight) < 600) out.strong = false;
  }
  const fontStyle = /(?:^|;)\s*font-style\s*:\s*([^;!]+)/iu.exec(style)?.[1]?.trim().toLowerCase();
  if (fontStyle) {
    if (fontStyle === 'italic' || fontStyle.startsWith('oblique')) out.em = true;
    else if (fontStyle === 'normal') out.em = false;
  }
  return out;
}

function marksOf(element, marks) {
  const next = {...marks};
  if (element.name === 'strong' || element.name === 'b') next.strong = true;
  if (element.name === 'em' || element.name === 'i') next.em = true;
  const styled = styleMarks(element.attrs?.style);
  if (styled.strong !== undefined) next.strong = styled.strong;
  if (styled.em !== undefined) next.em = styled.em;
  return next;
}

// A leaf of inline content: {kind: 'text', value, strong, em, href} or
// {kind: 'br', strong, em, href}.
const leaf = (kind, value, context) => ({kind, value, strong: Boolean(context.marks.strong), em: Boolean(context.marks.em), href: context.href || null});

// A flow (the root, a quote) collects blocks; a list item collects its own
// content. Text comes in as leaves into the current run; a block ends the
// run.
class Flow {
  constructor(kind) {
    this.kind = kind;
    this.blocks = [];
    this.run = [];
    this.types = ['p'];
    this.starts = [0];
    this.needBreak = false;
  }

  inline(item) {
    if (this.kind === 'item' && this.needBreak && this.run.length > 0) {
      if (!(item.kind === 'text' && !item.value.trim())) {
        this.run.push({kind: 'br', strong: false, em: false, href: null});
        this.needBreak = false;
      }
    }
    this.run.push(item);
  }

  flush() {
    if (!this.run.length) return;
    if (this.kind === 'item') {
      this.blocks.push({type: 'inline', leaves: this.run});
    } else {
      this.blocks.push({type: this.types[this.types.length - 1], leaves: this.run});
    }
    this.run = [];
  }

  // A paragraph or heading starts (or a block off the subset): the text so
  // far is one block, and what follows belongs to the new one.
  open(type) {
    if (this.kind === 'item') {
      this.needBreak = true;
      return;
    }
    this.flush();
    this.types.push(type);
    this.starts.push(this.blocks.length);
  }

  // keepEmpty: a paragraph or heading of the subset that held nothing is
  // still a block (the editing surface keeps it; the value drops it).
  close(keepEmpty = false) {
    if (this.kind === 'item') {
      this.needBreak = true;
      return;
    }
    const start = this.starts[this.starts.length - 1];
    if (keepEmpty && !this.run.length && this.blocks.length === start) this.blocks.push({type: this.types[this.types.length - 1], leaves: []});
    this.flush();
    if (this.types.length > 1) {
      this.types.pop();
      this.starts.pop();
    }
  }

  block(block) {
    this.flush();
    this.blocks.push(block);
    this.needBreak = false;
  }
}

function walkText(value, flow, context) {
  if (context.pre) {
    const lines = value.replace(/\r\n?/gu, '\n').split('\n');
    lines.forEach((line, index) => {
      if (index > 0) flow.inline(leaf('br', '', context));
      if (line) flow.inline(leaf('text', line.replace(/[\t\f]/gu, ' '), context));
    });
    return;
  }
  const text = value.replace(/[\t\n\r\f ]+/gu, ' ');
  if (!text) return;
  // White space between blocks is formatting of the source, not text.
  if (text === ' ' && !flow.run.length) return;
  flow.inline(leaf('text', text, context));
}

function walkChildren(children, flow, context) {
  for (const child of children) walk(child, flow, context);
}

function walk(node, flow, context) {
  if (node.type === 'text') {
    walkText(node.value, flow, context);
    return;
  }
  const name = node.name;
  if (DROPPED.has(name)) return;
  if (name === 'br') {
    flow.inline(leaf('br', '', context));
    return;
  }
  const inner = {...context, marks: marksOf(node, context.marks)};
  if (name === 'a') {
    const href = richTextHref(node.attrs?.href);
    walkChildren(node.children, flow, href && !context.href ? {...inner, href} : inner);
    return;
  }
  if (RICH_TEXT_BLOCKS.includes(name)) {
    flow.open(name);
    walkChildren(node.children, flow, inner);
    flow.close(true);
    return;
  }
  if (LISTS.has(name)) {
    const list = readList(node, inner, name);
    if (list.items.length) flow.block(list);
    return;
  }
  if (name === 'blockquote') {
    if (flow.kind === 'item') {
      flow.open('p');
      walkChildren(node.children, flow, inner);
      flow.close();
      return;
    }
    const quote = new Flow('flow');
    walkChildren(node.children, quote, inner);
    quote.flush();
    flow.block({type: 'blockquote', blocks: quote.blocks});
    return;
  }
  if (name === 'li') {
    // An item outside a list is a paragraph of its own.
    flow.open('p');
    walkChildren(node.children, flow, inner);
    flow.close();
    return;
  }
  if (context.paste && flow.kind !== 'item' && (name === 'pre' || name === 'listing')) {
    flow.block({type: 'pre', text: preText(node)});
    return;
  }
  if (context.paste && flow.kind !== 'item' && name === 'table') {
    flow.block(readTable(node, inner));
    return;
  }
  if (BREAKING.has(name)) {
    flow.open('p');
    walkChildren(node.children, flow, name === 'pre' || name === 'listing' ? {...inner, pre: true} : inner);
    flow.close();
    return;
  }
  // Any other element: its text, in place.
  walkChildren(node.children, flow, inner);
}

// The text of a pre as it stands: line breaks and indentation kept, a <br> a
// line break, what DROPPED names gone. The newline right after <pre> is the
// markup's, as a browser reads it; trailing blank lines are not code.
function preText(node) {
  const read = (current) => {
    if (current.type === 'text') return current.value;
    if (DROPPED.has(current.name)) return '';
    if (current.name === 'br') return '\n';
    return current.children.map(read).join('');
  };
  return node.children.map(read).join('')
    .replace(/\r\n?/gu, '\n')
    .replace(/\u00a0/gu, ' ')
    .replace(/^\n/u, '')
    .replace(/\s+$/u, '');
}

// A simple table: thead, tbody, tfoot and rows straight in the table, cells
// th and td; a cell's content is inline leaves, its paragraphs and list items
// lines of it. colspan and rowspan are not read: a cell is one cell.
function readTable(node, context) {
  const table = {type: 'table', caption: [], rows: []};
  const readRow = (row, head) => {
    const cells = [];
    for (const cell of row.children) {
      if (cell.type !== 'element' || (cell.name !== 'td' && cell.name !== 'th')) continue;
      const flow = new Flow('item');
      walkChildren(cell.children, flow, {...context, marks: marksOf(cell, context.marks)});
      flow.flush();
      cells.push({header: cell.name === 'th', leaves: flatLeaves(flow.blocks)});
    }
    if (cells.length) table.rows.push({head, cells});
  };
  const readSection = (section, head) => {
    for (const child of section.children) {
      if (child.type === 'element' && child.name === 'tr') readRow(child, head);
    }
  };
  for (const child of node.children) {
    if (child.type !== 'element') continue;
    if (child.name === 'caption') {
      const flow = new Flow('item');
      walkChildren(child.children, flow, context);
      flow.flush();
      table.caption = flatLeaves(flow.blocks);
    } else if (child.name === 'thead') readSection(child, true);
    else if (child.name === 'tbody' || child.name === 'tfoot') readSection(child, false);
    else if (child.name === 'tr') readRow(child, false);
  }
  return table;
}

// An item's parts as one line of leaves: a nested list's items are lines too.
function flatLeaves(parts) {
  const out = [];
  const add = (leaves) => {
    if (!leaves.length) return;
    if (out.length) out.push({kind: 'br', strong: false, em: false, href: null});
    out.push(...leaves);
  };
  const visit = (part) => {
    if (part.type === 'inline') add(part.leaves);
    else for (const item of part.items) item.children.forEach(visit);
  };
  parts.forEach(visit);
  return out;
}

function readItem(node, context) {
  const flow = new Flow('item');
  walkChildren(node.children, flow, context);
  flow.flush();
  return {children: flow.blocks};
}

function readList(node, context, type) {
  const list = {type, items: []};
  let loose = null;
  const endLoose = () => {
    if (loose) {
      loose.flush();
      list.items.push({children: loose.blocks});
      loose = null;
    }
  };
  for (const child of node.children) {
    if (child.type === 'element' && child.name === 'li') {
      endLoose();
      list.items.push(readItem(child, context));
      continue;
    }
    if (child.type === 'element' && LISTS.has(child.name)) {
      endLoose();
      // A list right inside a list (what an indent command leaves) belongs to
      // the item before it.
      const nested = readList(child, {...context, marks: marksOf(child, context.marks)}, child.name);
      if (!nested.items.length) continue;
      const previous = list.items.at(-1);
      if (previous) previous.children.push(nested);
      else list.items.push({children: [nested]});
      continue;
    }
    if (child.type === 'text' && !child.value.trim()) continue;
    if (child.type === 'element' && DROPPED.has(child.name)) continue;
    // Loose content in a list is an item.
    loose ??= new Flow('item');
    walk(child, loose, context);
  }
  endLoose();
  return list;
}

// ---------------------------------------------------------------- tidying

const SPACE = ' ';
const sameFormat = (a, b) => a.strong === b.strong && a.em === b.em && a.href === b.href;

// Inline leaves made canonical: adjacent text of one format joined, runs of
// spaces made one, spaces at the edges and around a line break removed, a link
// with nothing but spaces made text.
function tidyLeaves(leaves, mode) {
  const out = [];
  for (const item of leaves) {
    if (item.kind === 'text' && !item.value) continue;
    const last = out.at(-1);
    if (item.kind === 'text' && last?.kind === 'text' && sameFormat(last, item)) {
      last.value += item.value;
    } else {
      out.push({...item});
    }
  }
  // One space between words, whatever the leaves.
  for (let index = 0; index < out.length; index += 1) {
    const item = out[index];
    if (item.kind !== 'text') continue;
    item.value = item.value.replace(/ {2,}/gu, SPACE);
    const previous = out[index - 1];
    if (item.value.startsWith(SPACE) && (!previous || previous.kind === 'br' || (previous.kind === 'text' && previous.value.endsWith(SPACE)))) {
      item.value = item.value.slice(1);
    }
    const next = out[index + 1];
    if (item.value.endsWith(SPACE) && (!next || next.kind === 'br')) item.value = item.value.slice(0, -1);
  }
  let kept = out.filter((item) => item.kind === 'br' || item.value);
  if (mode === 'value') {
    while (kept[0]?.kind === 'br') kept.shift();
    while (kept.at(-1)?.kind === 'br') kept.pop();
    if (kept[0]?.kind === 'text') kept[0].value = kept[0].value.replace(/^[\s\u00a0]+/u, '');
    const end = kept.at(-1);
    if (end?.kind === 'text') end.value = end.value.replace(/[\s\u00a0]+$/u, '');
    kept = kept.filter((item) => item.kind === 'br' || item.value);
  }
  // A link of nothing but spaces is not a link.
  const groups = new Map();
  for (const item of kept) {
    if (!item.href) continue;
    groups.set(item.href, (groups.get(item.href) || '') + (item.kind === 'text' ? item.value : 'x'));
  }
  for (const item of kept) if (item.href && !groups.get(item.href).trim()) item.href = null;
  // Join again: dropping spaces and links may have made neighbours alike.
  const joined = [];
  for (const item of kept) {
    const last = joined.at(-1);
    if (item.kind === 'text' && last?.kind === 'text' && sameFormat(last, item)) last.value += item.value;
    else joined.push(item);
  }
  return joined;
}

const hasText = (leaves) => leaves.some((item) => item.kind === 'text' && item.value.replace(/[\s\u00a0]+/gu, '') !== '');

function tidyItem(item, mode) {
  const children = [];
  for (const part of item.children) {
    if (part.type === 'inline') {
      const leaves = tidyLeaves(part.leaves, mode);
      if (!leaves.length) continue;
      const last = children.at(-1);
      if (last?.type === 'inline') last.leaves = tidyLeaves([...last.leaves, {kind: 'br', strong: false, em: false, href: null}, ...leaves], mode);
      else children.push({type: 'inline', leaves});
    } else {
      const list = tidyList(part, mode);
      if (!list) continue;
      const last = children.at(-1);
      if (last && last.type === list.type) last.items.push(...list.items);
      else children.push(list);
    }
  }
  if (mode === 'value') {
    const filtered = children.filter((part) => part.type !== 'inline' || hasText(part.leaves));
    return filtered.length ? {children: filtered} : null;
  }
  if (!children.length || children[0].type !== 'inline') children.unshift({type: 'inline', leaves: [{kind: 'br', strong: false, em: false, href: null}]});
  return {children};
}

function tidyList(list, mode) {
  const items = list.items.map((item) => tidyItem(item, mode)).filter(Boolean);
  return items.length ? {type: list.type, items} : null;
}

function tidyBlocks(blocks, mode) {
  const out = [];
  for (const block of blocks) {
    let tidy = null;
    if (block.type === 'blockquote') {
      const inner = tidyBlocks(block.blocks, mode);
      if (inner.length) tidy = {type: 'blockquote', blocks: inner};
      else if (mode === 'editor') tidy = {type: 'blockquote', blocks: [{type: 'p', leaves: [{kind: 'br', strong: false, em: false, href: null}]}]};
    } else if (LISTS.has(block.type)) {
      tidy = tidyList(block, mode);
    } else if (block.type === 'pre') {
      if (block.text.trim()) tidy = {type: 'pre', text: block.text};
    } else if (block.type === 'table') {
      // A row with no text in any cell is not kept, as an empty paragraph is not.
      const rows = block.rows.map((row) => ({head: row.head, cells: row.cells.map((cell) => ({header: cell.header, leaves: tidyLeaves(cell.leaves, 'value')}))}))
        .filter((row) => row.cells.some((cell) => hasText(cell.leaves)));
      if (rows.length) tidy = {type: 'table', caption: tidyLeaves(block.caption, 'value'), rows};
    } else {
      const leaves = tidyLeaves(block.leaves, mode);
      if (mode === 'value') {
        if (hasText(leaves)) tidy = {type: block.type, leaves};
      } else {
        tidy = {type: block.type, leaves: leaves.length ? leaves : [{kind: 'br', strong: false, em: false, href: null}]};
      }
    }
    if (!tidy) continue;
    const last = out.at(-1);
    // Adjacent lists of one kind are one list.
    if (last && LISTS.has(tidy.type) && last.type === tidy.type) last.items.push(...tidy.items);
    else out.push(tidy);
  }
  return out;
}

/**
 * The raw tree cleaned into blocks.
 * mode "value": the stored form -- no empty block, no break at an edge.
 * mode "editor": what the editing surface holds -- an empty block keeps a
 *   <br> so the caret has a line, breaks the person typed stay.
 */
function cleanTree(tree, {mode = 'value', profile = 'html'} = {}) {
  if (!RICH_TEXT_PROFILES.includes(profile)) throw new TypeError(`rich_text_profile_unknown: ${profile}`);
  const flow = new Flow('flow');
  walkChildren(tree.children ?? [], flow, {marks: {}, href: null, pre: false, paste: profile === 'paste'});
  flow.flush();
  const blocks = tidyBlocks(flow.blocks, mode);
  if (mode === 'editor' && !blocks.length) return [{type: 'p', leaves: [{kind: 'br', strong: false, em: false, href: null}]}];
  return blocks;
}

// ---------------------------------------------------------------- writing

const escapeText = (text) => text.replace(/&/gu, '&amp;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;').replace(/\u00a0/gu, '&nbsp;');
const escapeAttribute = (text) => text.replace(/&/gu, '&amp;').replace(/"/gu, '&quot;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;').replace(/\u00a0/gu, '&nbsp;');

// Leaves to markup, nested a > strong > em, each run of one format once.
function writeLeaves(leaves) {
  const writeGroup = (items, level) => {
    let out = '';
    let at = 0;
    const key = ['href', 'strong', 'em'][level];
    while (at < items.length) {
      const value = key ? items[at][key] : null;
      let end = at + 1;
      while (end < items.length && key && items[end][key] === value) end += 1;
      const group = items.slice(at, end);
      if (!key) {
        out += group.map((item) => (item.kind === 'br' ? '<br>' : escapeText(item.value))).join('');
      } else if (key === 'href' && value) {
        out += `<a href="${escapeAttribute(value)}">${writeGroup(group, level + 1)}</a>`;
      } else if (key !== 'href' && value) {
        out += `<${key}>${writeGroup(group, level + 1)}</${key}>`;
      } else {
        out += writeGroup(group, level + 1);
      }
      at = end;
    }
    return out;
  };
  return writeGroup(leaves, 0);
}

function writeList(list) {
  return `<${list.type}>${list.items.map((item) => `<li>${item.children.map((part) => (part.type === 'inline' ? writeLeaves(part.leaves) : writeList(part))).join('')}</li>`).join('')}</${list.type}>`;
}

/** Cleaned blocks to the HTML string. */
function serialize(blocks) {
  return blocks.map((block) => {
    if (block.type === 'blockquote') return `<blockquote>${serialize(block.blocks)}</blockquote>`;
    if (LISTS.has(block.type)) return writeList(block);
    // The paste profile's blocks in html@1 terms: never a pre or a table.
    if (block.type === 'pre') {
      const leaves = block.text.split('\n').flatMap((line, index) => [
        ...(index ? [{kind: 'br', strong: false, em: false, href: null}] : []),
        {kind: 'text', value: line.replace(/[\t\f]/gu, ' '), strong: false, em: false, href: null},
      ]);
      return `<p>${writeLeaves(tidyLeaves(leaves, 'value'))}</p>`;
    }
    if (block.type === 'table') {
      const cells = [{leaves: block.caption}, ...block.rows.flatMap((row) => row.cells)];
      return cells.filter((cell) => hasText(cell.leaves)).map((cell) => `<p>${writeLeaves(cell.leaves)}</p>`).join('');
    }
    return `<${block.type}>${writeLeaves(block.leaves)}</${block.type}>`;
  }).join('');
}

/** The text of cleaned blocks, for counting and emptiness. */
function plainText(html) {
  const blocks = cleanTree(parseHtml(html), {mode: 'value'});
  const text = (leaves) => leaves.map((item) => (item.kind === 'br' ? '\n' : item.value)).join('');
  const list = (block) => block.items.map((item) => item.children.map((part) => (part.type === 'inline' ? text(part.leaves) : list(part))).join('\n')).join('\n');
  const all = (items) => items.map((block) => (block.type === 'blockquote' ? all(block.blocks) : LISTS.has(block.type) ? list(block) : text(block.leaves))).join('\n\n');
  return all(blocks);
}

/**
 * Untrusted HTML into the subset. With a document (the browser) the string
 * is parsed by the browser in an inert <template>; without one, by
 * parseHtml. A DOM node may be given instead of a string.
 * @param {string|Node|null|undefined} input
 * @param {{mode?: 'value'|'editor', document?: Document|null}} [options]
 * @returns {string}
 */
function sanitizeRichText(input, {mode = 'value', document: documentRef} = {}) {
  let tree;
  if (input && typeof input === 'object' && typeof input.nodeType === 'number') {
    tree = treeFromDom(input);
  } else {
    const html = typeof input === 'string' ? input : '';
    const doc = documentRef === undefined ? globalThis.document : documentRef;
    if (html && doc?.createElement) {
      const template = doc.createElement('template');
      template.innerHTML = html;
      tree = treeFromDom(template.content);
    } else {
      tree = parseHtml(html);
    }
  }
  return serialize(cleanTree(tree, {mode}));
}

/**
 * Plain text into the subset: paragraphs split on blank lines, a single line
 * break a <br>.
 * @param {string} text
 * @param {{mode?: 'value'|'editor'}} [options]
 */
function richTextFromPlainText(text, {mode = 'value'} = {}) {
  const source = String(text ?? '').replace(/\r\n?/gu, '\n');
  const blocks = source.split(/\n[ \t\f\v\u00a0]*\n+/u).map((paragraph) => {
    const leaves = [];
    paragraph.split('\n').forEach((line, index) => {
      if (index > 0) leaves.push({kind: 'br', strong: false, em: false, href: null});
      const value = line.replace(/[\t\f\v ]+/gu, ' ');
      if (value) leaves.push({kind: 'text', value, strong: false, em: false, href: null});
    });
    return {type: 'p', leaves};
  });
  return serialize(tidyBlocks(blocks, mode));
}


/***/ },

/***/ "32dfc4431a24"
(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BINDING_STATES: () => (/* reexport safe */ _data_mjs__WEBPACK_IMPORTED_MODULE_18__.BINDING_STATES),
/* harmony export */   BUILTIN_CATALOGUE: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.BUILTIN_CATALOGUE),
/* harmony export */   BUILTIN_CATALOGUE_ALSO_IN: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.BUILTIN_CATALOGUE_ALSO_IN),
/* harmony export */   BUILTIN_CATALOGUE_ICONS: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.BUILTIN_CATALOGUE_ICONS),
/* harmony export */   BUILTIN_EDITOR_MANIFESTS: () => (/* reexport safe */ _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_EDITOR_MANIFESTS),
/* harmony export */   BUILTIN_FIELD_KINDS: () => (/* reexport safe */ _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.BUILTIN_FIELD_KINDS),
/* harmony export */   BUILTIN_PORT_MANIFESTS: () => (/* reexport safe */ _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_PORT_MANIFESTS),
/* harmony export */   BUILTIN_TYPE_MANIFESTS: () => (/* reexport safe */ _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_TYPE_MANIFESTS),
/* harmony export */   CATALOGUE_GROUPS: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.CATALOGUE_GROUPS),
/* harmony export */   CATALOGUE_GROUP_ALIASES: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.CATALOGUE_GROUP_ALIASES),
/* harmony export */   CATALOGUE_GROUP_TABLE: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.CATALOGUE_GROUP_TABLE),
/* harmony export */   CATALOGUE_TABS: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.CATALOGUE_TABS),
/* harmony export */   COMPOSED_EXTENSION: () => (/* reexport safe */ _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.COMPOSED_EXTENSION),
/* harmony export */   Composition: () => (/* binding */ Composition),
/* harmony export */   DATA_EXTENSION: () => (/* reexport safe */ _data_mjs__WEBPACK_IMPORTED_MODULE_18__.DATA_EXTENSION),
/* harmony export */   DATA_SHAPES: () => (/* reexport safe */ _data_mjs__WEBPACK_IMPORTED_MODULE_18__.DATA_SHAPES),
/* harmony export */   EDITOR_FIELD_WORDS: () => (/* reexport safe */ _editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__.EDITOR_FIELD_WORDS),
/* harmony export */   EDITOR_WORDS_OWNER: () => (/* reexport safe */ _editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__.EDITOR_WORDS_OWNER),
/* harmony export */   FRAGMENT_DESCRIPTOR_SCHEMA: () => (/* reexport safe */ _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.FRAGMENT_DESCRIPTOR_SCHEMA),
/* harmony export */   INLINE_MARKS: () => (/* reexport safe */ _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.INLINE_MARKS),
/* harmony export */   MODIFIERS_EXTENSION: () => (/* reexport safe */ _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.MODIFIERS_EXTENSION),
/* harmony export */   PARAMETER_SETS: () => (/* reexport safe */ _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.PARAMETER_SETS),
/* harmony export */   PARAMETER_SET_NAMES: () => (/* reexport safe */ _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.PARAMETER_SET_NAMES),
/* harmony export */   PRINTED_ELEMENTS: () => (/* reexport safe */ _elements_mjs__WEBPACK_IMPORTED_MODULE_15__.PRINTED_ELEMENTS),
/* harmony export */   RUNTIME_OWNER: () => (/* reexport safe */ _data_mjs__WEBPACK_IMPORTED_MODULE_18__.RUNTIME_OWNER),
/* harmony export */   Recipe: () => (/* reexport safe */ _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__.Recipe),
/* harmony export */   SOURCE_PORT: () => (/* reexport safe */ _data_mjs__WEBPACK_IMPORTED_MODULE_18__.SOURCE_PORT),
/* harmony export */   UTILITY_BREAKPOINTS: () => (/* reexport safe */ _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.UTILITY_BREAKPOINTS),
/* harmony export */   VALUE_TYPES: () => (/* reexport safe */ _routing_mjs__WEBPACK_IMPORTED_MODULE_11__.VALUE_TYPES),
/* harmony export */   applyFieldValue: () => (/* reexport safe */ _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.applyFieldValue),
/* harmony export */   bindingSettings: () => (/* reexport safe */ _data_mjs__WEBPACK_IMPORTED_MODULE_18__.bindingSettings),
/* harmony export */   catalogue: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.catalogue),
/* harmony export */   catalogueEntry: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.catalogueEntry),
/* harmony export */   checkFragmentDescriptor: () => (/* reexport safe */ _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.checkFragmentDescriptor),
/* harmony export */   checkModifiers: () => (/* reexport safe */ _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.checkModifiers),
/* harmony export */   checkPortValue: () => (/* reexport safe */ _routing_mjs__WEBPACK_IMPORTED_MODULE_11__.checkPortValue),
/* harmony export */   checkPrintedElements: () => (/* binding */ checkPrintedElements),
/* harmony export */   checkSourceAnswer: () => (/* binding */ checkSourceAnswer),
/* harmony export */   composedEditorFields: () => (/* binding */ composedEditorFields),
/* harmony export */   composedInstance: () => (/* reexport safe */ _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.composedInstance),
/* harmony export */   composedPart: () => (/* reexport safe */ _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.composedPart),
/* harmony export */   composedTextPaths: () => (/* reexport safe */ _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.composedTextPaths),
/* harmony export */   compositionTypeFromSmartManifest: () => (/* binding */ compositionTypeFromSmartManifest),
/* harmony export */   createPortRegistry: () => (/* reexport safe */ _routing_mjs__WEBPACK_IMPORTED_MODULE_11__.createPortRegistry),
/* harmony export */   createRegistry: () => (/* binding */ createRegistry),
/* harmony export */   createShapeRegistry: () => (/* reexport safe */ _data_mjs__WEBPACK_IMPORTED_MODULE_18__.createShapeRegistry),
/* harmony export */   createSourcePort: () => (/* binding */ createSourcePort),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defineComposedType: () => (/* binding */ defineComposedType),
/* harmony export */   defineCompositionScope: () => (/* reexport safe */ _routing_mjs__WEBPACK_IMPORTED_MODULE_11__.defineCompositionScope),
/* harmony export */   defineFragmentBoundary: () => (/* reexport safe */ _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.defineFragmentBoundary),
/* harmony export */   definePageHost: () => (/* reexport safe */ _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.definePageHost),
/* harmony export */   demoData: () => (/* reexport safe */ _data_mjs__WEBPACK_IMPORTED_MODULE_18__.demoData),
/* harmony export */   describeRegions: () => (/* reexport safe */ _regions_mjs__WEBPACK_IMPORTED_MODULE_9__.describeRegions),
/* harmony export */   editorFieldMessages: () => (/* reexport safe */ _editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__.editorFieldMessages),
/* harmony export */   effectiveProps: () => (/* reexport safe */ _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.effectiveProps),
/* harmony export */   elementInputs: () => (/* reexport safe */ _elements_mjs__WEBPACK_IMPORTED_MODULE_15__.elementInputs),
/* harmony export */   entryGroups: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.entryGroups),
/* harmony export */   expandComposed: () => (/* reexport safe */ _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.expandComposed),
/* harmony export */   expandParameterSets: () => (/* reexport safe */ _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.expandParameterSets),
/* harmony export */   extendRegistry: () => (/* binding */ extendRegistry),
/* harmony export */   inlineText: () => (/* reexport safe */ _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.inlineText),
/* harmony export */   instantiateVariant: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.instantiateVariant),
/* harmony export */   marksIn: () => (/* reexport safe */ _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.marksIn),
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   normalizeInline: () => (/* reexport safe */ _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.normalizeInline),
/* harmony export */   ownModifiers: () => (/* reexport safe */ _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.ownModifiers),
/* harmony export */   parameterSetFields: () => (/* reexport safe */ _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.parameterSetFields),
/* harmony export */   parameterSetParts: () => (/* reexport safe */ _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.parameterSetParts),
/* harmony export */   parseFieldSubmission: () => (/* reexport safe */ _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.parseFieldSubmission),
/* harmony export */   parseRecipeJson: () => (/* reexport safe */ _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__.parseRecipeJson),
/* harmony export */   printElement: () => (/* binding */ printElement),
/* harmony export */   projectDocumentEditorFields: () => (/* reexport safe */ _editor_mjs__WEBPACK_IMPORTED_MODULE_6__.projectDocumentEditorFields),
/* harmony export */   projectEditorFields: () => (/* reexport safe */ _editor_mjs__WEBPACK_IMPORTED_MODULE_6__.projectEditorFields),
/* harmony export */   publishEffects: () => (/* reexport safe */ _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.publishEffects),
/* harmony export */   recipeDigest: () => (/* reexport safe */ _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__.recipeDigest),
/* harmony export */   recipeNodeId: () => (/* reexport safe */ _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__.recipeNodeId),
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   renderFieldFallback: () => (/* reexport safe */ _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.renderFieldFallback),
/* harmony export */   replaceRange: () => (/* reexport safe */ _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.replaceRange),
/* harmony export */   resolveFieldKind: () => (/* reexport safe */ _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.resolveFieldKind),
/* harmony export */   resolveRecipe: () => (/* reexport safe */ _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__.resolveRecipe),
/* harmony export */   setLink: () => (/* reexport safe */ _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.setLink),
/* harmony export */   slotAccepts: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.slotAccepts),
/* harmony export */   slotPlaces: () => (/* reexport safe */ _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.slotPlaces),
/* harmony export */   stableStringify: () => (/* reexport safe */ _canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.stableStringify),
/* harmony export */   startInlineEdit: () => (/* binding */ startInlineEdit),
/* harmony export */   toggleMark: () => (/* reexport safe */ _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.toggleMark),
/* harmony export */   upgradeComposed: () => (/* binding */ upgradeComposed),
/* harmony export */   utilityClassSpace: () => (/* reexport safe */ _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.utilityClassSpace),
/* harmony export */   utilityClasses: () => (/* reexport safe */ _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.utilityClasses),
/* harmony export */   utilityPartClasses: () => (/* reexport safe */ _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.utilityPartClasses),
/* harmony export */   validate: () => (/* binding */ validate),
/* harmony export */   validateEditorManifest: () => (/* reexport safe */ _editor_mjs__WEBPACK_IMPORTED_MODULE_6__.validateEditorManifest),
/* harmony export */   validateFieldKinds: () => (/* reexport safe */ _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.validateFieldKinds),
/* harmony export */   validateFieldValue: () => (/* reexport safe */ _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.validateFieldValue),
/* harmony export */   validateParameterSets: () => (/* reexport safe */ _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.validateParameterSets),
/* harmony export */   validateTypeManifest: () => (/* binding */ validateTypeManifest),
/* harmony export */   valuesByBreakpoint: () => (/* reexport safe */ _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.valuesByBreakpoint),
/* harmony export */   withParameterSetFields: () => (/* reexport safe */ _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.withParameterSetFields)
/* harmony export */ });
/* harmony import */ var _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("08e5033c490a");
/* harmony import */ var _editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fe90f998a31d");
/* harmony import */ var _html_subset_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e19611ff78cb");
/* harmony import */ var _file_size_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("fb0bdf7719f0");
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ac24888e7d3e");
/* harmony import */ var _editor_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("3765e2c966fd");
/* harmony import */ var _fields_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4e6fc63bed81");
/* harmony import */ var _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("6770fb69bd04");
/* harmony import */ var _regions_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("68efac8c1b57");
/* harmony import */ var _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("e66d878fb4f8");
/* harmony import */ var _routing_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("4aea5d6d49c7");
/* harmony import */ var _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("c2e3ed8498dc");
/* harmony import */ var _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("b88de35f4919");
/* harmony import */ var _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("76235de72516");
/* harmony import */ var _elements_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("3ad83f3699c7");
/* harmony import */ var _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("18b9c76994c9");
/* harmony import */ var _composed_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("e2cb52b018e5");
/* harmony import */ var _data_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("c6b53a101be9");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__, _file_size_mjs__WEBPACK_IMPORTED_MODULE_3__]);
([_editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__, _file_size_mjs__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




















const DOCUMENT_SCHEMA = 'simai.composition.document.v1';

// The editor surfaces (sf-editor-overlay, sf-sortable, sf-editor-inline)
// are Smart components loaded on demand, so pages that only render stay small.
// startInlineEdit keeps its Core name and delegates to the loaded editor.
function startInlineEdit(element, options) {
  const editor = globalThis.SF?.InlineEditor;
  if (typeof editor?.startInlineEdit !== 'function') throw new TypeError('inline_editor_not_loaded');
  return editor.startInlineEdit(element, options);
}
const PROFILES = new Set(['ui-layout', 'structured-content']);
const DOCUMENT_FIELDS = new Set(['schema', 'schema_version', 'id', 'profile', 'locale', 'root', 'extensions']);
const NODE_FIELDS = new Set(['id', 'type', 'data', 'props', 'slots', 'presentation', 'bindings', 'extensions']);
const PRESENTATION_FIELDS = new Set(['view', 'preset', 'modifiers']);
const BINDING_FIELDS = new Set(['owner', 'ref', 'target', 'revision']);
const FORBIDDEN_KEYS = new Set([
  'html', 'innerhtml', 'script', 'javascript', 'php', 'eval', 'function',
  'expression', 'query', 'sql', 'graphql', 'class', 'classname', 'rootclass',
  'cssclass', 'secret', 'password', 'token', 'cookie', 'authorization', 'request',
]);
const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const DEFAULT_LIMITS = Object.freeze({
  maxDocumentBytes: 1024 * 1024,
  maxDepth: 32,
  maxNodes: 2000,
  maxChildrenPerSlot: 500,
});

function diagnostic(code, path, message, details = {}) {
  return { code, path, message, ...details };
}

async function sha256(value) {
  if (!globalThis.crypto?.subtle) throw new Error('composition_crypto_unavailable');
  const bytes = new globalThis.TextEncoder().encode(value);
  const hash = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function pushUnknownFields(value, allowed, path, diagnostics) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(value)) return;
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) diagnostics.push(diagnostic('unknown_field', `${path}.${key}`, `Unknown field ${key}`));
  }
}

function scanForbiddenKeys(value, path, diagnostics) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => scanForbiddenKeys(entry, `${path}[${index}]`, diagnostics));
    return;
  }
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(value)) return;
  for (const [key, entry] of Object.entries(value)) {
    const normalized = key.toLowerCase().replaceAll('-', '');
    if (FORBIDDEN_KEYS.has(normalized)) {
      diagnostics.push(diagnostic('executable_or_secret_field_forbidden', `${path}.${key}`, `Field ${key} is not portable composition data`));
    }
    scanForbiddenKeys(entry, `${path}.${key}`, diagnostics);
  }
}

function validateExtensions(value, path, diagnostics, supported = new Set()) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(value)) {
    diagnostics.push(diagnostic('extensions_invalid', path, 'Extensions must be an object'));
    return;
  }
  for (const key of Object.keys(value)) {
    if (!/^[a-z][a-z0-9.-]*:[a-z][a-z0-9._-]*$/u.test(key)) {
      diagnostics.push(diagnostic('extension_name_invalid', `${path}.${key}`, 'Extension keys must be namespaced'));
    }
    if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(value[key]) && value[key].required === true && !supported.has(key)) {
      diagnostics.push(diagnostic('extension_required_unknown', `${path}.${key}`, `Required extension ${key} is not supported`));
    }
  }
}

function validateJsonSchema(value, schema, path, diagnostics) {
  if (!schema) return;
  if (schema.oneOf) {
    const matches = schema.oneOf.filter((candidate) => {
      const local = [];
      validateJsonSchema(value, candidate, path, local);
      return local.length === 0;
    });
    if (matches.length !== 1) diagnostics.push(diagnostic('schema_one_of', path, 'Value must match exactly one allowed shape'));
    return;
  }
  if (schema.const !== undefined && value !== schema.const) {
    diagnostics.push(diagnostic('schema_const', path, `Value must equal ${schema.const}`));
    return;
  }
  if (schema.enum && !schema.enum.includes(value)) {
    diagnostics.push(diagnostic('schema_enum', path, 'Value is not in the allowed list'));
    return;
  }
  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  if (schema.type) {
    const actual = value === null ? 'null' : Array.isArray(value) ? 'array' : Number.isInteger(value) ? 'integer' : typeof value === 'number' ? 'number' : typeof value;
    if (!types.includes(actual) && !(actual === 'integer' && types.includes('number')) && !(actual === 'object' && !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(value))) {
      diagnostics.push(diagnostic('schema_type', path, `Expected ${types.join(' or ')}`));
      return;
    }
  }
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) diagnostics.push(diagnostic('schema_min_length', path, 'String is too short'));
    if (schema.maxLength !== undefined && value.length > schema.maxLength) diagnostics.push(diagnostic('schema_max_length', path, 'String is too long'));
    if (schema.pattern && !(new RegExp(schema.pattern, 'u')).test(value)) diagnostics.push(diagnostic('schema_pattern', path, 'String has an invalid format'));
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) diagnostics.push(diagnostic('schema_minimum', path, 'Number is too small'));
    if (schema.maximum !== undefined && value > schema.maximum) diagnostics.push(diagnostic('schema_maximum', path, 'Number is too large'));
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) diagnostics.push(diagnostic('schema_min_items', path, 'Array has too few items'));
    if (schema.maxItems !== undefined && value.length > schema.maxItems) diagnostics.push(diagnostic('schema_max_items', path, 'Array has too many items'));
    if (schema.uniqueItems && new Set(value.map(_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.stableStringify)).size !== value.length) diagnostics.push(diagnostic('schema_unique_items', path, 'Array items must be unique'));
    if (schema.items) value.forEach((entry, index) => validateJsonSchema(entry, schema.items, `${path}[${index}]`, diagnostics));
  }
  if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(value)) {
    for (const key of schema.required || []) {
      if (!(key in value)) diagnostics.push(diagnostic('schema_required', `${path}.${key}`, `Required field ${key} is missing`));
    }
    if (schema.additionalProperties === false) {
      const properties = schema.properties || {};
      for (const key of Object.keys(value)) {
        if (!(key in properties)) diagnostics.push(diagnostic('schema_additional_property', `${path}.${key}`, `Field ${key} is not allowed`));
      }
    }
    for (const [key, childSchema] of Object.entries(schema.properties || {})) {
      if (key in value) validateJsonSchema(value[key], childSchema, `${path}.${key}`, diagnostics);
    }
  }
}

// The inline model as content.paragraph holds it: what a site block's text is.
const INLINE_SCHEMA = _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_TYPE_MANIFESTS.find(({ type }) => type === 'content.paragraph').data_schema.properties.content;
function checkInline(content, path, diagnostics) {
  validateJsonSchema(content, INLINE_SCHEMA, path, diagnostics);
  validateInlineContent(content, path, diagnostics);
}

function validUrl(value) {
  // Browsers read "/\\host" like "//host": backslashes never form a local link.
  if (/^(?:\/|\.?\.\/|#)/u.test(value)) return !value.startsWith('//') && !value.includes('\\');
  try {
    return SAFE_SCHEMES.has(new globalThis.URL(value).protocol);
  } catch {
    return false;
  }
}

// A picture the host keeps in the browser (IndexedDB, before a server store)
// is shown from an object URL. Such an address is only ever one a host's
// resolveSource gave at render (simai/ui-source#71), never one a Document
// stores, and only of the page's own origin: a blob: address is the page's.
function hostBlobUrl(value) {
  const match = /^blob:(https?:\/\/[^/]+)\//u.exec(String(value));
  if (!match) return false;
  const origin = globalThis.location?.origin;
  return !origin || origin === 'null' || origin === match[1];
}

function validateInlineContent(value, path, diagnostics) {
  if (!Array.isArray(value)) return;
  for (let index = 0; index < value.length; index += 1) {
    const inline = value[index];
    if (inline?.type === 'link' && !validUrl(inline.href)) {
      diagnostics.push(diagnostic('unsafe_url', `${path}[${index}].href`, 'Link protocol is not allowed'));
    }
  }
}

// Every inline content of a node, with its path: the link rule applies to all
// of them, wherever a type keeps text.
function inlineFields(node, path) {
  const data = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(node.data) ? node.data : {};
  const at = (key) => (Array.isArray(data[key]) ? [[data[key], `${path}.data.${key}`]] : []);
  switch (node.type) {
    case 'content.heading':
    case 'content.paragraph':
    case 'content.list-item':
      return at('content');
    case 'content.alert':
    case 'content.step':
      return at('title');
    case 'content.details':
      return at('summary');
    case 'content.figure':
      return at('caption');
    case 'content.table':
      return [
        ...at('caption'),
        ...(Array.isArray(data.rows) ? data.rows : []).flatMap((row, rowIndex) => (Array.isArray(row) ? row : [])
          .map((cell, cellIndex) => [cell, `${path}.data.rows[${rowIndex}][${cellIndex}]`])),
      ];
    default:
      return [];
  }
}

// Content rules beyond a type's own schema: links and image sources follow the
// Document's URL rule, an item type stands only in its own parent, and a
// layout holds at most one outlet.
function validateContentRules(root, diagnostics, { hostSources = false } = {}) {
  let outlets = 0;
  const visit = (node, path, parentType) => {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(node)) return;
    for (const [content, contentPath] of inlineFields(node, path)) validateInlineContent(content, contentPath, diagnostics);
    // With a host source resolver the stored name is the host's (media:<id>),
    // and the address it resolves to is checked where it is drawn.
    if ((node.type === 'content.figure' || node.type === 'content.media') && typeof node.data?.src === 'string' && !hostSources && !validUrl(node.data.src)) {
      diagnostics.push(diagnostic('unsafe_url', `${path}.data.src`, 'Image source protocol is not allowed'));
    }
    if (node.type === 'element.button' && typeof node.data?.href === 'string' && !validUrl(node.data.href)) {
      diagnostics.push(diagnostic('unsafe_url', `${path}.data.href`, 'Link protocol is not allowed'));
    }
    if (node.type === 'form.form' && typeof node.data?.action === 'string' && !validUrl(node.data.action)) {
      diagnostics.push(diagnostic('unsafe_url', `${path}.data.action`, 'Form address protocol is not allowed'));
    }
    if (node.type === 'content.file' && typeof node.data?.href === 'string' && !validUrl(node.data.href)) {
      diagnostics.push(diagnostic('unsafe_url', `${path}.data.href`, 'File address protocol is not allowed'));
    }
    const parent = _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.CONTENT_ITEM_PARENTS[node.type];
    if (parent && parentType !== parent) diagnostics.push(diagnostic('content_parent_invalid', path, `${node.type} must be a direct child of ${parent}`));
    if (node.type === 'content.outlet') {
      outlets += 1;
      if (outlets > 1) diagnostics.push(diagnostic('outlet_duplicate', path, 'A layout holds the page content in one place'));
    }
    for (const [slotName, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(node.slots) ? node.slots : {})) {
      if (Array.isArray(children)) children.forEach((child, index) => visit(child, `${path}.slots.${slotName}[${index}]`, node.type));
    }
  };
  visit(root, '$.root', null);
}

let defaultPorts = null;

function normalizePorts(ports) {
  if (ports?.elements instanceof Map) return ports;
  if (Array.isArray(ports)) return (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.createPortRegistry)(ports);
  if (ports && Array.isArray(ports.manifests)) return (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.createPortRegistry)(ports.manifests, { bindings: ports.bindings });
  defaultPorts = defaultPorts || (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.createPortRegistry)(_builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_PORT_MANIFESTS);
  return defaultPorts;
}

function normalizeRegistry(registry) {
  if (registry?.types instanceof Map) return registry;
  return createRegistry(Array.isArray(registry) ? registry : _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_TYPE_MANIFESTS);
}

function createRegistry(manifests = _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_TYPE_MANIFESTS, renderers = {}) {
  const types = new Map();
  for (const manifest of manifests) {
    // Either form of the format name (schema-name.mjs).
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(manifest) || !(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_5__.isSchema)(manifest, 'simai.composition.type-manifest', 1)) throw new TypeError('composition_manifest_invalid');
    if (types.has(manifest.type)) throw new TypeError(`composition_manifest_duplicate:${manifest.type}`);
    // A type's parameter sets join its props (parameter-sets.mjs).
    types.set(manifest.type, (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.canonical)((0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.expandParameterSets)(manifest)));
  }
  return { types, renderers: new Map(Object.entries(renderers)) };
}

// A registry of the built-in types plus a product's own. createRegistry(list)
// takes the list as the whole registry, which is what a test of one type wants
// and what a product adding a type does not: the built-in layout types were
// gone from every registry made from a product's list alone, and they were not
// exported to add back (documentation trial, 2026-10-12).
function extendRegistry(manifests = [], renderers = {}) {
  return createRegistry([..._builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_TYPE_MANIFESTS, ...manifests], renderers);
}

function compositionTypeFromSmartManifest(manifest) {
  const declaration = manifest?.composition?.declarative;
  if (!declaration) return null;
  const inputs = manifest.inputs?.properties || {};
  // Structure and request-bound data travel in separate channels: props are the
  // structure a document holds, data is what a host answers with. Both are
  // closed and both come from the component's own declared inputs.
  const pick = (names) => Object.fromEntries(Object.entries(inputs).filter(([key]) => new Set(names || []).has(key)));
  // Request-bound data is described by the component's own declared contracts,
  // not by attributes: rows and columns arrive from a host, not from markup.
  const dataProperties = Object.fromEntries(Object.entries(declaration.data || {}).map(([key, binding]) => {
    const schema = manifest.contracts?.[binding.contract];
    if (!schema) throw new TypeError(`composition_data_contract_missing:${declaration.type}:${key}`);
    return [key, schema];
  }));
  const events = Object.fromEntries((declaration.events || [])
    .filter((name) => manifest.events?.[name])
    .map((name) => [name, { summary: manifest.events[name].summary, payload: manifest.events[name].payload }]));
  const persistence = manifest.persistence
    ? {
      mode: manifest.persistence.mode,
      source_of_truth: manifest.persistence.source_of_truth,
      network_owner: manifest.persistence.network_owner,
      settings_key_prop: declaration.persistence?.settings_key_prop ?? null,
      revision_prop: declaration.persistence?.revision_prop ?? null,
    }
    : undefined;
  return {
    ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_5__.schemaFields)('simai.composition.type-manifest', 1),
    type: declaration.type,
    version: manifest.version,
    category: 'smart',
    mode: declaration.mode,
    profiles: declaration.profiles,
    data_schema: { type: 'object', additionalProperties: false, properties: dataProperties },
    props_schema: { type: 'object', additionalProperties: false, properties: pick(declaration.props) },
    presentation: declaration.presentation || { views: ['default'], presets: [], modifiers: [] },
    slots: declaration.slots || {},
    renderer: declaration.renderer,
    assets: declaration.assets || [],
    capabilities: ['html', 'hydration'],
    ...(Object.keys(events).length ? { events } : {}),
    ...(persistence ? { persistence } : {}),
  };
}

// How a node of an unregistered type is met: 'refuse' (the default, type_unknown
// makes the Document invalid) or 'placeholder' (G-32).
const UNKNOWN_MODES = new Set(['refuse', 'placeholder']);
function unknownAsPlaceholder(options) {
  const mode = options?.unknown ?? 'refuse';
  if (!UNKNOWN_MODES.has(mode)) throw new TypeError(`composition_unknown_mode_invalid:${String(mode)}`);
  return mode === 'placeholder';
}

// options.embedded (simai/ui-source#60): the Document is drawn inside a host
// page that holds its own main landmark -- an editor's canvas. layout.page and
// a main layout.region are drawn as plain elements marked
// data-sf-composition-landmark="main", so the page keeps one main. The default,
// false, is what a publishing host keeps; anything but a boolean throws.
function renderEmbedded(options) {
  const embedded = options?.embedded === undefined ? false : options.embedded;
  if (typeof embedded !== 'boolean') throw new TypeError(`composition_embedded_invalid:${String(embedded)}`);
  return embedded;
}

// The placeholder of a node whose type the host does not know: its type as
// text, its id kept for the editor's selection, nothing of its data or slots.
const unknownPlaceholder = (node) => `<div class="sf-composition-unknown" role="note" data-sf-composition-type="${escapeHtml(node.type)}" data-sf-composition-id="${escapeHtml(node.id)}">${escapeHtml(node.type)}</div>`;

function validate(document, registry = undefined, options = {}) {
  const diagnostics = [];
  const notices = [];
  const resolvedRegistry = normalizeRegistry(registry);
  const limits = { ...DEFAULT_LIMITS, ...(options.limits || {}) };
  const supportedExtensions = new Set([_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.ENDPOINT_EXTENSION, ...(options.supportedExtensions || [])]);
  let serialized;
  try {
    serialized = JSON.stringify(document);
  } catch {
    return { valid: false, diagnostics: [diagnostic('document_not_json', '$', 'Document must be JSON serializable')] };
  }
  if (new globalThis.TextEncoder().encode(serialized).byteLength > limits.maxDocumentBytes) diagnostics.push(diagnostic('document_too_large', '$', 'Document exceeds the byte limit'));
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(document)) return { valid: false, diagnostics: [diagnostic('document_invalid', '$', 'Document must be an object')] };
  pushUnknownFields(document, DOCUMENT_FIELDS, '$', diagnostics);
  if (!(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_5__.isSchema)(document, 'simai.composition.document', 1)) diagnostics.push(diagnostic('schema_unknown', '$.schema', `Expected ${DOCUMENT_SCHEMA}, or simai.composition.document with schema_version 1`));
  if (typeof document.id !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,119}$/u.test(document.id)) diagnostics.push(diagnostic('document_id_invalid', '$.id', 'Document id is invalid'));
  if (!PROFILES.has(document.profile)) diagnostics.push(diagnostic('profile_unknown', '$.profile', 'Profile is not supported'));
  if (document.locale !== undefined && (typeof document.locale !== 'string' || !/^[a-zA-Z]{2,8}(?:-[a-zA-Z0-9]{1,8})*$/u.test(document.locale))) diagnostics.push(diagnostic('locale_invalid', '$.locale', 'Locale is invalid'));
  if (document.extensions !== undefined) validateExtensions(document.extensions, '$.extensions', diagnostics, supportedExtensions);
  scanForbiddenKeys(document, '$', diagnostics);

  const ids = new Set();
  let nodeCount = 0;
  const visit = (node, path, depth) => {
    nodeCount += 1;
    if (nodeCount > limits.maxNodes) return;
    if (depth > limits.maxDepth) diagnostics.push(diagnostic('depth_limit', path, 'Composition is too deeply nested'));
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(node)) {
      diagnostics.push(diagnostic('node_invalid', path, 'Node must be an object'));
      return;
    }
    pushUnknownFields(node, NODE_FIELDS, path, diagnostics);
    if (typeof node.id !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,119}$/u.test(node.id)) diagnostics.push(diagnostic('node_id_invalid', `${path}.id`, 'Node id is invalid'));
    else if (ids.has(node.id)) diagnostics.push(diagnostic('node_id_duplicate', `${path}.id`, `Duplicate node id ${node.id}`));
    else ids.add(node.id);
    const manifest = resolvedRegistry.types.get(node.type);
    if (!manifest) {
      // unknown: 'placeholder' (G-32, for an editor's canvas): a node of a
      // type this host does not know is a notice, not a refusal; render draws
      // it as a placeholder and the rest of the page. Its own data and slots
      // are left unread. The default stays strict: a publishing host refuses.
      const unknown = diagnostic('type_unknown', `${path}.type`, `Unknown type ${node.type || ''}`);
      if (unknownAsPlaceholder(options) && typeof node.type === 'string' && node.type) notices.push(unknown);
      else diagnostics.push(unknown);
      return;
    }
    if (!manifest.profiles.includes(document.profile)) diagnostics.push(diagnostic('type_profile_unsupported', `${path}.type`, `${node.type} does not support ${document.profile}`));
    validateJsonSchema(node.data || {}, manifest.data_schema, `${path}.data`, diagnostics);
    // A layout parameter may hold a value per breakpoint (utilities.mjs): each
    // value is checked on its own, the rest of the props as before.
    const responsive = (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.checkResponsiveProps)(node.props || {}, manifest.props_schema, `${path}.props`, validateJsonSchema);
    diagnostics.push(...responsive.diagnostics);
    validateJsonSchema(responsive.props, responsive.schema || manifest.props_schema, `${path}.props`, diagnostics);
    // A block's own modifiers never refuse a Document: a class no utility rule
    // knows is left out of the HTML and reported.
    notices.push(...(0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.modifierNotices)(node, { rules: options.utilityRules }).notices);
    if ((0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.isComposed)(manifest)) {
      const instance = (0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.validateComposedInstance)(node, manifest, resolvedRegistry, path, checkInline);
      diagnostics.push(...instance.diagnostics);
      notices.push(...instance.notices);
      const depth = (options.composedDepth || 0) + 1;
      if (depth > _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.MAX_COMPOSED_DEPTH) diagnostics.push(diagnostic('composed_depth_limit', path, 'Site blocks are nested too deeply'));
      else {
        const expanded = validate({ ...document, root: (0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.expandComposed)(node, manifest) }, resolvedRegistry, { ...options, composedDepth: depth });
        diagnostics.push(...expanded.diagnostics.map((entry) => ({ ...entry, path: `${path}.composed${entry.path.replace(/^\$\.root/u, '').replace(/^\$/u, '')}` })));
        notices.push(...(expanded.notices || []));
      }
    }
    if (node.presentation !== undefined) {
      if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(node.presentation)) diagnostics.push(diagnostic('presentation_invalid', `${path}.presentation`, 'Presentation must be an object'));
      else {
        pushUnknownFields(node.presentation, PRESENTATION_FIELDS, `${path}.presentation`, diagnostics);
        const contract = manifest.presentation || {};
        if (node.presentation.view && !(contract.views || []).includes(node.presentation.view)) diagnostics.push(diagnostic('view_unknown', `${path}.presentation.view`, 'View is not registered'));
        if (node.presentation.preset && !(contract.presets || []).includes(node.presentation.preset)) diagnostics.push(diagnostic('preset_unknown', `${path}.presentation.preset`, 'Preset is not registered'));
        if (node.presentation.modifiers !== undefined) {
          if (!Array.isArray(node.presentation.modifiers)) diagnostics.push(diagnostic('modifiers_invalid', `${path}.presentation.modifiers`, 'Modifiers must be an array'));
          else for (const modifier of node.presentation.modifiers) if (!(contract.modifiers || []).includes(modifier)) diagnostics.push(diagnostic('modifier_unknown', `${path}.presentation.modifiers`, `Modifier ${modifier} is not registered`));
        }
      }
    }
    if (node.extensions !== undefined) validateExtensions(node.extensions, `${path}.extensions`, diagnostics, supportedExtensions);
    if (node.bindings !== undefined) {
      if (!Array.isArray(node.bindings)) diagnostics.push(diagnostic('bindings_invalid', `${path}.bindings`, 'Bindings must be an array'));
      else node.bindings.forEach((binding, index) => {
        const bindingPath = `${path}.bindings[${index}]`;
        if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(binding)) diagnostics.push(diagnostic('binding_invalid', bindingPath, 'Binding must be an object'));
        else {
          pushUnknownFields(binding, BINDING_FIELDS, bindingPath, diagnostics);
          for (const key of ['owner', 'ref', 'target']) if (typeof binding[key] !== 'string' || !binding[key]) diagnostics.push(diagnostic('binding_field_invalid', `${bindingPath}.${key}`, `${key} is required`));
          if (binding.revision !== undefined && (typeof binding.revision !== 'string' || !binding.revision)) diagnostics.push(diagnostic('binding_revision_invalid', `${bindingPath}.revision`, 'Revision must be a non-empty string'));
        }
      });
    }
    const slots = node.slots || {};
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(slots)) {
      diagnostics.push(diagnostic('slots_invalid', `${path}.slots`, 'Slots must be an object'));
      return;
    }
    if (manifest.mode === 'leaf' && Object.keys(slots).length) diagnostics.push(diagnostic('leaf_slots_forbidden', `${path}.slots`, 'Leaf type cannot contain slots'));
    for (const [slotName, children] of Object.entries(slots)) {
      const slot = manifest.slots?.[slotName];
      if (!slot) {
        diagnostics.push(diagnostic('slot_unknown', `${path}.slots.${slotName}`, `Slot ${slotName} is not registered`));
        continue;
      }
      if (!Array.isArray(children)) {
        diagnostics.push(diagnostic('slot_children_invalid', `${path}.slots.${slotName}`, 'Slot children must be an array'));
        continue;
      }
      if (children.length > limits.maxChildrenPerSlot || children.length > slot.max || children.length < slot.min) diagnostics.push(diagnostic('slot_cardinality', `${path}.slots.${slotName}`, 'Slot child count is outside the allowed range'));
      children.forEach((child, index) => {
        const childManifest = resolvedRegistry.types.get(child?.type);
        if (childManifest && slot.types && !slot.types.includes(child.type)) diagnostics.push(diagnostic('slot_child_type_forbidden', `${path}.slots.${slotName}[${index}]`, `${child.type} is not allowed in this slot`));
        if (childManifest && slot.categories && !slot.categories.includes(childManifest.category)) diagnostics.push(diagnostic('slot_child_category_forbidden', `${path}.slots.${slotName}[${index}]`, `${childManifest.category} is not allowed in this slot`));
        if (childManifest && slot.groups && !(0,_catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.entryGroups)((0,_catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.catalogueEntry)(childManifest)).some((group) => slot.groups.map(_catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.catalogueGroup).includes(group))) diagnostics.push(diagnostic('slot_child_group_forbidden', `${path}.slots.${slotName}[${index}]`, `${child.type} is not in a group this place accepts (${slot.groups.join(', ')})`));
        visit(child, `${path}.slots.${slotName}[${index}]`, depth + 1);
      });
    }
    for (const [slotName, slot] of Object.entries(manifest.slots || {})) {
      if (slot.min > 0 && !(slotName in slots)) diagnostics.push(diagnostic('slot_required', `${path}.slots.${slotName}`, `Slot ${slotName} is required`));
    }
  };
  visit(document.root, '$.root', 1);
  if (nodeCount > limits.maxNodes) diagnostics.push(diagnostic('node_limit', '$.root', 'Composition has too many nodes'));
  else {
    (0,_regions_mjs__WEBPACK_IMPORTED_MODULE_9__.validateRegionRules)(document.root, resolvedRegistry, diagnostics);
    validateContentRules(document.root, diagnostics, { hostSources: typeof options.resolveSource === 'function' });
    (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.resolveRoutes)(document.root, resolvedRegistry, normalizePorts(options.ports), diagnostics);
    (0,_data_mjs__WEBPACK_IMPORTED_MODULE_18__.validateDataRules)(document.root, resolvedRegistry, options.shapes, diagnostics);
  }
  return { valid: diagnostics.length === 0, diagnostics, ...(notices.length ? { notices } : {}) };
}

function collectDependencies(node, manifest, output) {
  for (const asset of manifest.assets || []) output.assets.add(asset);
  for (const binding of node.bindings || []) output.bindings.set(`${binding.owner}:${binding.ref}:${binding.target}:${binding.revision || ''}`, (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.canonical)(binding));
}

async function normalize(document, registry = undefined, options = {}) {
  const resolvedRegistry = normalizeRegistry(registry);
  const result = validate(document, resolvedRegistry, options);
  if (!result.valid) return { document: null, digest: null, dependencies: { assets: [], bindings: [] }, diagnostics: result.diagnostics };
  const normalized = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.canonical)(JSON.parse(JSON.stringify(document)));
  const dependencies = { assets: new Set(), bindings: new Map() };
  const visit = (node, depth = 0) => {
    const manifest = resolvedRegistry.types.get(node.type);
    if (!manifest) return;
    collectDependencies(node, manifest, dependencies);
    // A site block needs what the blocks of its tree need.
    if ((0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.isComposed)(manifest) && depth < _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.MAX_COMPOSED_DEPTH) visit((0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.expandComposed)(node, manifest), depth + 1);
    Object.values(node.slots || {}).flat().forEach((child) => visit(child, depth));
  };
  visit(normalized.root);
  return {
    ...(result.notices ? { notices: result.notices } : {}),
    document: normalized,
    digest: await sha256((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.stableStringify)(normalized)),
    dependencies: {
      assets: [...dependencies.assets].sort(),
      bindings: [...dependencies.bindings.values()].sort((left, right) => (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.stableStringify)(left).localeCompare((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.stableStringify)(right))),
    },
    diagnostics: [],
  };
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function renderInline(content) {
  return (content || []).map((inline) => {
    if (inline.type === 'link') return `<a href="${escapeHtml(inline.href)}">${renderInline(inline.children)}</a>`;
    if (inline.type !== 'text') {
      // An atom draws its own element, its props escaped as text; anything
      // else (validation refuses it) draws nothing rather than "undefined".
      const view = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.inlineComponentView)(inline);
      if (!view) return '';
      const attributes = view.attributes.map(([name, value]) => (value === '' ? ` ${name}` : ` ${name}="${escapeHtml(value)}"`)).join('');
      return `<${view.tag}${attributes}>${escapeHtml(view.text)}</${view.tag}>`;
    }
    let output = escapeHtml(inline.value);
    for (const mark of inline.marks || []) output = mark === 'strong' ? `<strong>${output}</strong>` : mark === 'em' ? `<em>${output}</em>` : `<code>${output}</code>`;
    return output;
  }).join('');
}

const id = (node) => ` data-sf-composition-id="${escapeHtml(node.id)}"`;
// Docara's ratio words and the figure's modifier: 16/9 is sf-figure--ratio-16x9.
const ratioClass = (ratio) => (ratio && ratio !== 'auto' ? ` sf-figure--ratio-${ratio.replace('/', 'x')}` : '');
const ALERT_ICONS = { neutral: 'info', info: 'info', success: 'check_circle', warning: 'warning', error: 'error' };
const GRID_COLUMNS = {
  1: 'grid-col-1',
  2: 'grid-col-1 md:grid-col-2',
  3: 'grid-col-1 md:grid-col-2 lg:grid-col-3',
  4: 'grid-col-1 md:grid-col-2 lg:grid-col-4',
};

function renderImage(data) {
  const size = ['width', 'height'].filter((key) => Number.isInteger(data[key])).map((key) => ` ${key}="${data[key]}"`).join('');
  return `<img src="${escapeHtml(data.src)}" alt="${escapeHtml(data.alt)}"${size} loading="lazy" decoding="async">`;
}

// sf-download-file's row, drawn as a plain link: it downloads with no script,
// the name falls back to the address's last part, and the size reads in the
// Document's language.
function renderFile(node, locale) {
  const { href, label, mime, size } = node.data;
  const name = label || (0,_file_size_mjs__WEBPACK_IMPORTED_MODULE_3__.fileNameFromAddress)(href) || href;
  const type = mime ? ` type="${escapeHtml(mime)}"` : '';
  const sizeText = Number.isInteger(size) ? (0,_file_size_mjs__WEBPACK_IMPORTED_MODULE_3__.formatFileSize)(size, (0,_file_size_mjs__WEBPACK_IMPORTED_MODULE_3__.fileSizeUnits)(locale), locale) : '';
  const sizePart = sizeText ? `<span class="sf-download-file__size sf-download-file-file-size">${escapeHtml(sizeText)}</span>` : '';
  return `<a class="sf-download-file" href="${escapeHtml(href)}" download${type}${id(node)}><span class="sf-download-file__body sf-download-file-wrap"><span class="sf-download-file__main sf-download-file-container"><i class="sf-download-file__icon sf-icon" aria-hidden="true">${(0,_file_size_mjs__WEBPACK_IMPORTED_MODULE_3__.fileIcon)(mime)}</i><span class="sf-download-file__name sf-download-file-file-name">${escapeHtml(name)}</span></span>${sizePart}</span></a>`;
}

function renderTable(node) {
  const { rows } = node.data;
  const header = node.props?.header ?? 'row';
  const headRow = header === 'row' || header === 'both';
  const headColumn = header === 'column' || header === 'both';
  const align = Array.isArray(node.props?.align) ? node.props.align : [];
  // The frame sets every cell to the start; a column set otherwise says so on
  // its cells, with one of two fixed values.
  const cellStyle = (index) => (align[index] === 'center' || align[index] === 'end' ? ` style="text-align: ${align[index]}"` : '');
  const cell = (content, index, tag, scope) => `<${tag}${scope ? ` scope="${scope}"` : ''}${cellStyle(index)}>${renderInline(content)}</${tag}>`;
  const row = (cells, inHead) => `<tr>${cells.map((content, index) => (inHead
    ? cell(content, index, 'th', 'col')
    : headColumn && index === 0 ? cell(content, index, 'th', 'row') : cell(content, index, 'td', null))).join('')}</tr>`;
  const caption = Array.isArray(node.data.caption) ? `<caption>${renderInline(node.data.caption)}</caption>` : '';
  const head = headRow ? `<thead>${row(rows[0], true)}</thead>` : '';
  const body = (headRow ? rows.slice(1) : rows).map((cells) => row(cells, false)).join('');
  return `<div class="table-frame"${id(node)}><table class="table">${caption}${head}${body ? `<tbody>${body}</tbody>` : ''}</table></div>`;
}

function renderCode(node) {
  const lang = node.props?.lang;
  const language = lang ? ` class="language-${escapeHtml(lang)}" data-lang="${escapeHtml(lang)}"` : '';
  const lines = node.props?.numbers === true ? ' data-lines' : '';
  const code = `<div class="sf-highlight"${node.props?.title ? '' : id(node)}><pre><code${language}${lines}>${escapeHtml(node.data.code)}</code></pre></div>`;
  if (!node.props?.title) return code;
  return `<figure class="flex flex-col gap-1/2 m-0"${id(node)}><figcaption class="text-1/2 weight-5 color-on-surface-variant">${escapeHtml(node.props.title)}</figcaption>${code}</figure>`;
}

function renderTabs(node, slots) {
  const tabs = node.slots.tabs;
  const panels = slots.tabsList || [];
  const label = node.data?.label ? ` aria-label="${escapeHtml(node.data.label)}"` : '';
  // The first tab is selected; the tabs runtime adds roles, ids and keys.
  const buttons = tabs.map((tab, index) => `<button type="button" class="sf-button sf-button--default sf-button--primary sf-button--size-1${index === 0 ? ' selected' : ''}"><span class="sf-button-text-container">${escapeHtml(tab.data.label)}</span></button>`).join('');
  const bodies = tabs.map((tab, index) => `<div class="sf-tabs-main-tab${index === 0 ? ' selected' : ''}"${id(tab)}${index === 0 ? '' : ' hidden'}>${panels[index] || ''}</div>`).join('');
  return `<div class="sf-tabs sf-tabs--underline flex flex-col"${id(node)}><div class="sf-tabs-top-container"><div class="sf-tabs-top flex"${label}>${buttons}</div></div><div class="sf-tabs-main-container">${bodies}</div></div>`;
}

function renderSteps(node, slots) {
  const steps = node.slots.steps;
  const items = slots.stepsList || [];
  const current = Number.isInteger(node.props?.current) ? node.props.current : null;
  const layout = node.props?.layout === 'list' ? ' sf-procedure--list' : '';
  return `<ol class="sf-procedure${layout}"${id(node)}>${steps.map((step, index) => {
    const number = index + 1;
    const state = current === null ? '' : number < current ? ' sf-procedure-step--complete' : number === current ? ' sf-procedure-step--current' : '';
    return `<li class="sf-procedure-step${state}"${id(step)}${current === number ? ' aria-current="step"' : ''}>${items[index] || ''}</li>`;
  }).join('')}</ol>`;
}

function renderMedia(node, slots) {
  const figure = `<figure class="sf-figure${ratioClass(node.props?.ratio ?? '16/9')}"><div class="sf-figure-media">${renderImage(node.data)}</div></figure>`;
  const text = `<div class="min-w-0">${slots.default || ''}</div>`;
  const parts = node.props?.side === 'left' ? figure + text : text + figure;
  return `<div class="grid grid-col-1 md:grid-col-2 gap-3 items-cross-center"${id(node)}>${parts}</div>`;
}

// The words an element prints until the author writes its own, in the
// Document's language (English when there is none for it).
const ELEMENT_PLACEHOLDERS = Object.freeze({
  en: { button: 'Button', badge: 'Badge', send: 'Send', field: 'Field', option: 'Option', name: 'Name', phone: 'Phone', email: 'Email', message: 'Message' },
  ru: { button: 'Кнопка', badge: 'Метка', send: 'Отправить', field: 'Поле', option: 'Вариант', name: 'Имя', phone: 'Телефон', email: 'Почта', message: 'Сообщение' },
});
// The fields whose name has a word of its own when they have no label (forms, 2026-11-04).
const NAMED_FIELDS = new Set(['name', 'phone', 'email', 'message']);
const fieldLabel = (node, locale) => node.data?.label || placeholder(locale, NAMED_FIELDS.has(node.data?.name) ? node.data.name : 'field');
// A form field fills its column (a block, not the element block's flex row).
const fieldBlock = (node, html) => (html ? `<div${id(node)}>${html}</div>` : '');
// The options of a select: the words an author wrote, separated by commas.
const optionList = (text) => [...new Set(String(text ?? '').split(',').map((word) => word.trim()).filter(Boolean))];
const placeholder = (locale, key) => (ELEMENT_PLACEHOLDERS[String(locale || 'en').toLowerCase().split('-')[0]] || ELEMENT_PLACEHOLDERS.en)[key];
const defined = (inputs) => Object.fromEntries(Object.entries(inputs).filter(([, value]) => value !== undefined && value !== ''));
// An element stands in a block of its own: the editor selects and the
// utilities reach the block (sf-button's host is display: contents), the
// element draws inside it. The block is a flex row, so an element keeps its
// own width (the prototype's inline button) instead of the column's.
const elementBlock = (node, html) => (html ? `<div class="flex"${id(node)}>${html}</div>` : '');

// The space between the blocks of a section or a container (visual parity,
// 2026-11-04): the prototype's 24 px at the desktop, space-3 of the SIMAI
// Framework ladder (16 px on the phone). Blocks in a column stand one rhythm
// apart (space-y-*, their own margins collapse into it); a gap the Document
// sets is the rhythm, per screen. Columns make the content a grid, whose gap
// the grid set prints: no rhythm then.
const BLOCK_RHYTHM = 3;
function rhythm(props) {
  if (props.columns !== undefined) return '';
  const values = (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.valuesByBreakpoint)(props.gap ?? BLOCK_RHYTHM);
  const classes = [];
  let previous;
  _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.UTILITY_BREAKPOINTS.forEach((breakpoint) => {
    const value = values[breakpoint];
    if (value !== previous && Number.isInteger(value)) classes.push(`${breakpoint === 'xs' ? '' : `${breakpoint}:`}space-y-${value}`);
    previous = value;
  });
  return classes.length ? ` class="${classes.join(' ')}"` : '';
}

const BUILTIN_RENDERERS = {
  // A page is the document's main landmark; drawn embedded (options.embedded,
  // a host's canvas inside the host's own main) it is a plain element that
  // names the landmark it stands for (simai/ui-source#60).
  'layout.page': ({ node, slots, context }) => (renderEmbedded(context?.options)
    ? `<div data-sf-composition-landmark="main" data-sf-composition-id="${escapeHtml(node.id)}">${slots.default || ''}</div>`
    : `<main data-sf-composition-id="${escapeHtml(node.id)}">${slots.default || ''}</main>`),
  'layout.section': ({ node, slots, manifest }) => {
    // 1.1.0: a section given a width or columns draws the frame and content
    // parts its parameter sets place classes on. 1.2.0: its width defaults to
    // the page container (parameter_defaults), so a section draws them unless
    // the Document sets its width full and gives no columns.
    const props = (0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.effectiveProps)(node, manifest);
    const framed = (props.width !== undefined && props.width !== 'full') || ['columns', 'gap'].some((key) => props[key] !== undefined);
    const inner = framed ? `<div data-sf-composition-part="frame"><div${rhythm(props)} data-sf-composition-part="content">${slots.default || ''}</div></div>` : (slots.default || '');
    return `<section data-sf-composition-id="${escapeHtml(node.id)}">${inner}</section>`;
  },
  'layout.columns': ({ node, slots }) => {
    const columns = Number.isInteger(node.props?.columns) ? ` data-composition-columns="${node.props.columns}"` : '';
    // A grid of one column on the phone unless columns says otherwise; the
    // columns and gap utilities are added from the props (1.1.0). No gap given
    // keeps the type's own gap.
    const gap = node.props?.gap === undefined ? ' gap-4' : '';
    return `<div class="sf-composition-columns grid${gap}" data-sf-composition-id="${escapeHtml(node.id)}"${columns}>${(slots.columnsList || []).map((child) => `<div class="sf-composition-column">${child}</div>`).join('')}</div>`;
  },
  'content.heading': ({ node }) => `<h${node.data.level || 2} data-sf-composition-id="${escapeHtml(node.id)}">${renderInline(node.data.content)}</h${node.data.level || 2}>`,
  'content.paragraph': ({ node }) => `<p data-sf-composition-id="${escapeHtml(node.id)}">${renderInline(node.data.content)}</p>`,
  'layout.regions': ({ node, slots }) => `<div class="sf-composition-regions" data-sf-composition-id="${escapeHtml(node.id)}"><div class="sf-composition-regions-grid">${slots.regions || ''}</div></div>`,
  'layout.region': ({ node, slots, context }) => {
    const props = node.props;
    // Embedded, the main region is a plain element too: the host's page holds the one main.
    const embeddedMain = props.landmark === 'main' && renderEmbedded(context?.options);
    const element = embeddedMain ? 'div' : _regions_mjs__WEBPACK_IMPORTED_MODULE_9__.REGION_ELEMENTS[props.landmark];
    const landmark = embeddedMain ? ' data-sf-composition-landmark="main"' : '';
    const sticky = props.sticky === true ? ' data-sf-region-sticky=""' : '';
    const label = props.label !== undefined ? ` aria-label="${escapeHtml(props.label)}"` : '';
    return `<${element} class="sf-composition-region" data-sf-composition-id="${escapeHtml(node.id)}" data-sf-region="${escapeHtml(props.name)}" data-sf-region-placement="${escapeHtml(props.placement ?? 'block')}"${landmark}${sticky}${label}>${slots.default || ''}</${element}>`;
  },
  'layout.scope': ({ node, slots, routes }) => `<sf-composition-scope data-sf-composition-id="${escapeHtml(node.id)}" data-sf-routes="${escapeHtml((0,_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.routesAttribute)(routes || []))}">${slots.default || ''}</sf-composition-scope>`,
  'layout.area': ({ node, slots }) => `<div data-sf-composition-area=""${id(node)}>${slots.default || ''}</div>`,
  // The layout and element types of the one block editor (2026-11-04): the
  // block's own element, its parts, and SIMAI Framework utilities only.
  'layout.container': ({ node, slots, manifest }) => `<div${id(node)}><div data-sf-composition-part="frame"><div${rhythm((0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.effectiveProps)(node, manifest))} data-sf-composition-part="content">${slots.default || ''}</div></div></div>`,
  'layout.grid': ({ node, slots }) => `<div${id(node)}><div class="grid" data-sf-composition-part="content">${(slots.defaultList || []).map((child) => `<div class="min-w-0">${child}</div>`).join('')}</div></div>`,
  'layout.spacer': ({ node }) => `<div aria-hidden="true"${id(node)}></div>`,
  'element.button': ({ node, elements, locale }) => {
    const props = node.props || {};
    return elementBlock(node, elements.print('sf-button', defined({
      text: node.data?.text || placeholder(locale, 'button'),
      // A button with an address is a link with the button's look (sf-button 1.4.0).
      href: node.data?.href,
      appearance: props.appearance,
      scheme: props.scheme,
      size: props.size,
      icon: props.icon,
      'icon-position': props.icon ? props.icon_position : undefined,
    })));
  },
  'element.button-icon': ({ node, elements, locale }) => {
    const props = node.props || {};
    return elementBlock(node, elements.print('sf-button-icon', defined({
      icon: props.icon ?? 'favorite',
      'aria-label': node.data?.label || placeholder(locale, 'button'),
      appearance: props.appearance ?? 'tonal',
      scheme: props.scheme,
      size: props.size,
    })));
  },
  'element.badge': ({ node, elements, locale }) => {
    const props = node.props || {};
    return elementBlock(node, elements.print('sf-badge', defined({
      text: node.data?.text || placeholder(locale, 'badge'),
      appearance: props.appearance ?? 'tonal',
      scheme: props.scheme ?? 'primary',
      size: props.size ?? '1/2',
      icon: props.icon,
    })));
  },
  'element.icon': ({ node, elements }) => {
    const props = node.props || {};
    return elementBlock(node, elements.print('sf-icon', defined({ icon: props.icon ?? 'star', size: props.size ?? '2', label: node.data?.label })));
  },
  // Forms (2026-11-04): a <form> around its fields, its blocks one rhythm
  // apart; each field one Smart element printed from its inputs.
  'form.form': ({ node, slots }) => {
    const action = node.data?.action ? ` action="${escapeHtml(node.data.action)}"` : '';
    return `<form class="grid gap-4" method="${node.props?.method === 'get' ? 'get' : 'post'}"${action}${id(node)}>${slots.default || ''}</form>`;
  },
  'form.input': ({ node, elements, locale }) => {
    const props = node.props || {};
    return fieldBlock(node, elements.print('sf-input', defined({
      label: fieldLabel(node, locale),
      placeholder: node.data?.placeholder,
      hint: node.data?.hint,
      name: node.data?.name,
      'input-type': props.input_type,
      autocomplete: { email: 'email', tel: 'tel', url: 'url' }[props.input_type],
      required: props.required === true || undefined,
      size: props.size,
    })));
  },
  'form.textarea': ({ node, elements, locale }) => {
    const props = node.props || {};
    return fieldBlock(node, elements.print('sf-input-textarea', defined({
      label: fieldLabel(node, locale),
      placeholder: node.data?.placeholder,
      hint: node.data?.hint,
      name: node.data?.name,
      rows: props.rows,
      required: props.required === true || undefined,
      size: props.size,
    })));
  },
  'form.checkbox': ({ node, elements, locale }) => {
    const props = node.props || {};
    return fieldBlock(node, elements.print('sf-checkbox', defined({
      label: fieldLabel(node, locale),
      description: node.data?.hint,
      name: node.data?.name,
      checked: props.checked === true || undefined,
      size: props.size,
    })));
  },
  'form.switch': ({ node, elements, locale }) => {
    const props = node.props || {};
    return fieldBlock(node, elements.print('sf-switch', defined({
      label: fieldLabel(node, locale),
      description: node.data?.hint,
      name: node.data?.name,
      checked: props.checked === true || undefined,
      size: props.size,
    })));
  },
  'form.select': ({ node, elements, locale }) => {
    const props = node.props || {};
    const options = optionList(node.data?.options);
    return fieldBlock(node, elements.print('sf-dropdown', defined({
      label: fieldLabel(node, locale),
      placeholder: node.data?.placeholder,
      name: node.data?.name,
      options: JSON.stringify(options.length ? options : [placeholder(locale, 'option')]),
      required: props.required === true || undefined,
      size: props.size,
    })));
  },
  'form.button-submit': ({ node, elements, locale }) => {
    const props = node.props || {};
    return elementBlock(node, elements.print('sf-button', defined({
      text: node.data?.text || placeholder(locale, 'send'),
      'native-type': 'submit',
      appearance: props.appearance,
      size: props.size,
    })));
  },
  'content.document': ({ node, slots }) => `<article${id(node)}>${node.data?.title ? `<h1>${escapeHtml(node.data.title)}</h1>` : ''}${slots.default || ''}</article>`,
  'content.list': ({ node, slots }) => {
    const ordered = node.props?.ordered === true;
    const start = ordered && Number.isInteger(node.props?.start) && node.props.start !== 1 ? ` start="${node.props.start}"` : '';
    return `<${ordered ? 'ol' : 'ul'}${start}${id(node)}>${slots.items || ''}</${ordered ? 'ol' : 'ul'}>`;
  },
  'content.list-item': ({ node, slots }) => `<li${id(node)}>${renderInline(node.data.content)}${slots.default || ''}</li>`,
  'content.quote': ({ node, slots }) => `<blockquote${id(node)}>${slots.default || ''}</blockquote>`,
  'content.code': ({ node }) => renderCode(node),
  'content.divider': ({ node }) => `<hr class="sf-divider sf-divider-horizontal"${id(node)}>`,
  'content.table': ({ node }) => renderTable(node),
  'content.figure': ({ node }) => {
    const fit = node.props?.fit === 'contain' ? ' sf-figure--contain' : '';
    const caption = Array.isArray(node.data.caption) ? `<figcaption class="sf-figure-caption">${renderInline(node.data.caption)}</figcaption>` : '';
    return `<figure class="sf-figure${ratioClass(node.props?.ratio)}${fit}"${id(node)}><div class="sf-figure-media">${renderImage(node.data)}</div>${caption}</figure>`;
  },
  'content.alert': ({ node, slots }) => {
    const status = node.props?.status ?? 'neutral';
    const appearance = node.props?.appearance ?? 'default';
    const title = Array.isArray(node.data?.title) ? `<div class="sf-alert-text">${renderInline(node.data.title)}</div>` : '';
    const body = slots.default ? `<div class="sf-alert-supporting-text">${slots.default}</div>` : '';
    return `<div class="sf-alert sf-alert--${status} sf-alert--${appearance} flex items-start"${id(node)}><i class="sf-icon" aria-hidden="true">${ALERT_ICONS[status]}</i><div class="sf-alert-wrap flex flex-col flex-1"><div class="sf-alert-content flex flex-col flex-1">${title}${body}</div></div></div>`;
  },
  // Native details: it opens and closes with no script.
  'content.details': ({ node, slots }) => {
    const lines = node.props?.layout === 'lines';
    const frame = lines ? 'border-bottom-1 border-bottom-solid border-outline-variant p-y-1' : 'bg-surface-0 border-1 border-solid border-outline-variant radius-2 p-2';
    return `<details class="${frame}"${id(node)}${node.props?.open === true ? ' open' : ''}><summary class="weight-5 cursor-pointer">${renderInline(node.data.summary)}</summary><div class="p-top-1">${slots.default || ''}</div></details>`;
  },
  'content.tabs': ({ node, slots }) => renderTabs(node, slots),
  // A tab is drawn by its tabs: the panel is theirs, the content its own.
  'content.tab': ({ slots }) => slots.default || '',
  'content.steps': ({ node, slots }) => renderSteps(node, slots),
  // A step is drawn by its steps: the item is theirs, title and content its own.
  'content.step': ({ node, slots }) => {
    const title = Array.isArray(node.data?.title) ? `<div class="sf-procedure-title">${renderInline(node.data.title)}</div>` : '';
    return `${title}<div class="sf-procedure-content">${slots.default || ''}</div>`;
  },
  'content.grid': ({ node, slots }) => {
    const columns = GRID_COLUMNS[node.props?.columns ?? 3];
    const gap = Number.isInteger(node.props?.gap) ? node.props.gap : 2;
    return `<div class="grid ${columns} gap-${gap}"${id(node)}>${(slots.defaultList || []).map((child) => `<div class="min-w-0">${child}</div>`).join('')}</div>`;
  },
  'content.card': ({ node, slots }) => `<div class="sf-card${node.props?.variant === 'plain' ? ' sf-card--plain' : ''}"${id(node)}>${slots.default || ''}</div>`,
  'content.media': ({ node, slots }) => renderMedia(node, slots),
  'content.file': ({ node, locale }) => renderFile(node, locale),
  // Cleaned at render by the html@1 subset's one rule: no script, no style, no
  // attribute but a safe href survives.
  'content.html': ({ node }) => `<div${id(node)}>${(0,_html_subset_mjs__WEBPACK_IMPORTED_MODULE_2__.sanitizeRichText)(node.data.markup)}</div>`,
  'content.outlet': ({ node, outlet }) => `<div data-sf-outlet=""${id(node)}>${outlet || ''}</div>`,
};

// context.resolveSource(src, {node}) → address: a host that keeps pictures
// itself names them in content.figure and content.media (media:<id>) and gives
// the address to draw at render, which may be a blob: address of the page's
// origin (simai/ui-source#71). The address is held to the Document's URL rule
// with that one addition; one that fails it draws nothing and is reported.
const HOST_SOURCE_TYPES = new Set(['content.figure', 'content.media']);

async function render(document, context = {}) {
  const registry = normalizeRegistry(context.registry);
  renderEmbedded(context.options);
  const resolveSource = typeof context.resolveSource === 'function' ? context.resolveSource : null;
  const normalized = await normalize(document, registry, { ...(context.options || {}), ...(resolveSource ? { resolveSource } : {}) });
  if (!normalized.document) return { html: '', assets: [], hydration: [], diagnostics: normalized.diagnostics, digest: null };
  const diagnostics = [];
  const notices = [...(normalized.notices || [])].filter((entry) => !entry.code.startsWith('modifier'));
  const hydration = [];
  const routes = (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.resolveRoutes)(normalized.document.root, registry, normalizePorts(context.options?.ports), []);
  // The data of the blocks that declare it, resolved before drawing (data.mjs).
  const data = await (0,_data_mjs__WEBPACK_IMPORTED_MODULE_18__.resolveData)(normalized.document.root, registry, context, validateJsonSchema);
  diagnostics.push(...data.diagnostics);
  // The page's content for a layout's content.outlet: a structured-content
  // Document, rendered with the same registry; its assets and diagnostics
  // join the layout's.
  let outlet = '';
  const outletAssets = [];
  if (context.content !== undefined) {
    if (context.content?.profile !== 'structured-content') {
      diagnostics.push(diagnostic('outlet_content_invalid', '$.content', 'The page content must be a structured-content Document'));
    } else {
      const { content, ...rest } = context;
      const page = await render(content, rest);
      outlet = page.html;
      outletAssets.push(...page.assets);
      hydration.push(...page.hydration);
      diagnostics.push(...page.diagnostics.map((entry) => ({ ...entry, path: `$.content${entry.path.startsWith('$') ? entry.path.slice(1) : `:${entry.path}`}` })));
    }
  }
  // `inside`: an ancestor already stands in a centred container (its frame
  // part prints `container`). A frame inside one takes container-flush, so a
  // container in a section has no second gutter; a breakout leaves the
  // container and its own frame keeps the gutter (2026-11-04).
  const renderNode = async (given, depth = 0, inside = false) => {
    let node = given;
    if (resolveSource && HOST_SOURCE_TYPES.has(node.type) && typeof node.data?.src === 'string') {
      const address = await resolveSource(node.data.src, { node });
      if (typeof address !== 'string' || !(validUrl(address) || hostBlobUrl(address))) {
        diagnostics.push(diagnostic('unsafe_url', `node:${node.id}.data.src`, 'The resolved image source is not allowed'));
        return '';
      }
      node = { ...node, data: { ...node.data, src: address } };
    }
    const manifest = registry.types.get(node.type);
    // Only reached under unknown: 'placeholder' (validate's notice says
    // which node); normalize refused the Document otherwise.
    if (!manifest) return unknownPlaceholder(node);
    // A site block draws its type's current tree with the instance's values
    // and texts (composed.mjs); the instance stays one node of the Document.
    if ((0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.isComposed)(manifest)) {
      if (depth >= _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.MAX_COMPOSED_DEPTH) return '';
      const expanded = (0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.expandComposed)(node, manifest);
      const inner = await (0,_data_mjs__WEBPACK_IMPORTED_MODULE_18__.resolveData)(expanded, registry, context, validateJsonSchema);
      for (const [id, entry] of inner.byNode) data.byNode.set(id, entry);
      data.links.push(...inner.links);
      diagnostics.push(...inner.diagnostics);
      return renderNode(expanded, depth + 1, inside);
    }
    const byPart = (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.utilityPartClasses)(node, manifest);
    const ownFrame = (byPart.frame || []).includes('container');
    const outer = inside && !(byPart[''] || []).includes('container-breakout');
    if (outer && ownFrame) byPart.frame.push('container-flush');
    const slots = {};
    for (const [name, children] of Object.entries(node.slots || {})) {
      const rendered = [];
      for (const child of children) rendered.push(await renderNode(child, depth, outer || ownFrame));
      slots[name] = rendered.join('');
      slots[`${name}List`] = rendered;
    }
    const resolvedBindings = {};
    let bindingStates;
    if ((0,_data_mjs__WEBPACK_IMPORTED_MODULE_18__.takesData)(manifest)) {
      const entry = data.byNode.get(node.id) || { values: {}, states: {} };
      Object.assign(resolvedBindings, entry.values);
      bindingStates = entry.states;
    } else {
      for (const binding of node.bindings || []) {
        if (context.resolveBinding) resolvedBindings[binding.target] = await context.resolveBinding(binding, { document: normalized.document, node });
      }
    }
    // Layout parameters and the block's own modifiers become SIMAI Framework
    // utilities on the block's element (utilities.mjs).
    const own = (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.modifierNotices)(node, { rules: context.options?.utilityRules });
    notices.push(...own.notices);
    const utilities = [...new Set([...(byPart[''] || []), ...modifierUtilities(node, manifest), ...own.kept])];
    let renderer = registry.renderers.get(manifest.renderer.name) || BUILTIN_RENDERERS[manifest.renderer.name];
    if (!renderer && manifest.renderer.kind === 'custom-element' && manifest.renderer.name) {
      renderer = ({ node: current, slots: currentSlots, endpoint }) => {
        const endpointAttribute = endpoint ? ` data-sf-endpoint="${escapeHtml(endpoint)}"` : '';
        const attributes = Object.entries(current.props || {}).map(([key, value]) => ` ${escapeHtml(key)}="${escapeHtml(value)}"`).join('') + endpointAttribute;
        hydration.push({ id: current.id, type: current.type, element: manifest.renderer.name });
        return `<${manifest.renderer.name}${attributes}>${Object.values(currentSlots).filter((value) => typeof value === 'string').join('')}</${manifest.renderer.name}>`;
      };
    }
    if (!renderer) {
      diagnostics.push(diagnostic('renderer_unavailable', `node:${node.id}`, `Renderer ${manifest.renderer.name} is unavailable`));
      return '';
    }
    if (node.type === 'layout.scope') hydration.push({ id: node.id, type: node.type, element: 'sf-composition-scope' });
    // The smart elements a block may print, held to their manifests (elements.mjs).
    const elements = {
      print: (name, inputs) => {
        const printed = (0,_elements_mjs__WEBPACK_IMPORTED_MODULE_15__.printElement)(name, inputs, validateJsonSchema, `node:${node.id}`);
        diagnostics.push(...printed.diagnostics);
        return printed.html;
      },
    };
    const html = await renderer({ node, slots, context, elements, resolvedBindings, ...(bindingStates ? { bindingStates } : {}), utilities, manifest, routes: routes.get(node.id), endpoint: (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.endpointName)(node), outlet: node.type === 'content.outlet' ? outlet : undefined, locale: normalized.document.locale ?? 'en' });
    let drawn = (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.withClasses)(html, node.id, utilities);
    // A parameter that reaches an inner element (a set's part): the renderer
    // marks it data-sf-composition-part; classes for a part it did not draw
    // are reported, never placed elsewhere.
    for (const [part, classes] of Object.entries(byPart)) {
      if (part === '' || !classes.length) continue;
      const placed = (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.withPartClasses)(drawn, node.id, part, classes);
      if (placed.found) drawn = placed.html;
      else notices.push(diagnostic('utility_part_missing', `node:${node.id}`, `${node.type} draws no ${part} part; ${classes.join(' ')} is left out`, { part }));
    }
    return drawn;
  };
  const html = await renderNode(normalized.document.root);
  const assets = outletAssets.length ? [...new Set([...normalized.dependencies.assets, ...outletAssets])].sort() : normalized.dependencies.assets;
  return {
    html,
    assets,
    hydration,
    diagnostics,
    digest: normalized.digest,
    ...(notices.length ? { notices } : {}),
    ...(data.links.length ? { runtime: data.links } : {}),
  };
}

// ------------------------------------------------- one block editor (2026-11-03)

const fits = (value, schema) => {
  const problems = [];
  const responsive = (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.isResponsive)(schema) && (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.isBreakpointValue)(value);
  if (responsive) for (const entry of Object.values(value)) validateJsonSchema(entry, (0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.valueSchema)(schema), '$', problems);
  else validateJsonSchema(value, schema, '$', problems);
  return problems.length === 0;
};

/**
 * The problems of a type manifest's additive fields (catalogue, variants,
 * slot words and groups, layout utilities, data bindings, runtime states, a
 * site block's tree): {valid, diagnostics}. Each variant is made into a node
 * and validated as a Document of the type's first profile.
 */
function validateTypeManifest(manifest, registry = undefined, options = {}) {
  const diagnostics = [];
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(manifest) || !(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_5__.isSchema)(manifest, 'simai.composition.type-manifest', 1)) return { valid: false, diagnostics: [diagnostic('composition_manifest_invalid', '$', 'A type manifest is simai.composition.type-manifest with schema_version 1')] };
  diagnostics.push(...(0,_catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.validateCatalogueFields)(manifest));
  diagnostics.push(...(0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.validateParameterSets)(manifest));
  diagnostics.push(...(0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.validateParameterDefaults)(manifest, fits));
  diagnostics.push(...validateModifierUtilities(manifest));
  diagnostics.push(...(0,_utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.validateUtilityDeclarations)((0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.expandParameterSets)(manifest)));
  diagnostics.push(...(0,_data_mjs__WEBPACK_IMPORTED_MODULE_18__.validateDataDeclarations)(manifest, options.shapes));
  let resolved = normalizeRegistry(registry);
  if (resolved.types.get(manifest.type) !== manifest) {
    const others = [...resolved.types.values()].filter((entry) => entry.type !== manifest.type);
    resolved = { types: new Map([...others, (0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.expandParameterSets)(manifest)].map((entry) => [entry.type, entry])), renderers: resolved.renderers };
  }
  if ((0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.isComposed)(manifest)) {
    const again = (0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.defineComposedType)({ ...manifest, root: manifest.composed.root }, resolved, (document, current) => validate(document, current, options));
    diagnostics.push(...again.diagnostics.map((entry) => ({ ...entry, path: entry.path.startsWith('$.root') ? `$.composed${entry.path.slice(1)}` : entry.path })));
    if (again.manifest && (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.stableStringify)(again.manifest.props_schema) !== (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.stableStringify)(manifest.props_schema)) diagnostics.push(diagnostic('composed_schema_drift', '$.props_schema', 'The exposed parameters do not match the tree: make the manifest with defineComposedType'));
    if (manifest.renderer?.kind !== 'builtin' || manifest.renderer?.name !== 'composed') diagnostics.push(diagnostic('composed_renderer_invalid', '$.renderer', 'A site block is drawn by the builtin renderer composed'));
  } else if (manifest.exposed !== undefined) diagnostics.push(diagnostic('composed_exposed_without_tree', '$.exposed', 'Only a site block (composed) exposes parameters'));
  if (Array.isArray(manifest.variants) && !diagnostics.some((entry) => entry.code.startsWith('variant'))) {
    for (const variant of manifest.variants) {
      const node = (0,_catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.instantiateVariant)(manifest, variant.id, { id: `variant-${variant.id}` });
      const checked = validate({ ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_5__.schemaFields)('simai.composition.document', 1), id: 'variant-probe', profile: manifest.profiles[0], root: node }, resolved, options);
      diagnostics.push(...checked.diagnostics.map((entry) => ({ ...entry, path: `$.variants.${variant.id}${entry.path.replace(/^\$\.root/u, '')}` })));
    }
  }
  return { valid: diagnostics.length === 0, diagnostics };
}

// presentation.modifier_utilities (type manifest 1.5.0, G-39 2026-11-04): the
// SIMAI Framework classes a declared modifier prints on the block's element. A
// modifier with no entry prints nothing, as before.
const MODIFIER_CLASS = /^[a-z0-9][a-z0-9:/_.-]{0,99}$/u;
function modifierUtilities(node, manifest) {
  const table = manifest?.presentation?.modifier_utilities;
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(table) || !Array.isArray(node?.presentation?.modifiers)) return [];
  return node.presentation.modifiers.flatMap((modifier) => (Array.isArray(table[modifier]) ? table[modifier] : []));
}
function validateModifierUtilities(manifest) {
  const table = manifest?.presentation?.modifier_utilities;
  if (table === undefined) return [];
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(table)) return [diagnostic('modifier_utilities_invalid', '$.presentation.modifier_utilities', 'Modifier utilities are an object of class lists')];
  const declared = manifest.presentation.modifiers || [];
  const diagnostics = [];
  for (const [modifier, classes] of Object.entries(table)) {
    if (!declared.includes(modifier)) diagnostics.push(diagnostic('modifier_utilities_unknown', `$.presentation.modifier_utilities.${modifier}`, `Modifier ${modifier} is not declared`));
    if (!Array.isArray(classes) || !classes.every((value) => typeof value === 'string' && MODIFIER_CLASS.test(value))) diagnostics.push(diagnostic('modifier_utilities_invalid', `$.presentation.modifier_utilities.${modifier}`, 'A modifier prints a list of classes'));
  }
  return diagnostics;
}

/** A site block's type manifest from what the block builder saved (composed.mjs). */
function defineComposedType(definition, registry = undefined, options = {}) {
  return (0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.defineComposedType)(definition, normalizeRegistry(registry), (document, current) => validate(document, current, options));
}

/**
 * A site block's parameter form: its exposed list with the target types'
 * editor fields (composed.mjs composedEditorManifest). With an instance it
 * also projects the instance's values, as projectEditorFields does for a type
 * of code: {manifest, origins, fields, diagnostics, valid}.
 */
function composedEditorFields(manifest, instance = undefined, options = {}) {
  const registry = normalizeRegistry(options.registry);
  const editors = [..._builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_EDITOR_MANIFESTS, ...(options.editorManifests || [])];
  const made = (0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.composedEditorManifest)(manifest, registry, editors);
  if (!made.manifest) return { valid: false, manifest: null, origins: {}, fields: [], diagnostics: made.diagnostics };
  const projected = (0,_editor_mjs__WEBPACK_IMPORTED_MODULE_6__.projectEditorFields)(made.manifest, manifest, instance || { id: '', type: manifest.type }, options);
  const diagnostics = [...made.diagnostics, ...projected.diagnostics];
  return { valid: diagnostics.length === 0, manifest: made.manifest, origins: made.origins, fields: projected.fields, diagnostics };
}

/** Every instance of a site block moved to its type's current version; what the new version no longer has is reported. */
function upgradeComposed(document, registry = undefined) {
  return (0,_composed_mjs__WEBPACK_IMPORTED_MODULE_17__.upgradeComposed)(document, normalizeRegistry(registry), fits);
}

/** The markup of a smart element a block prints, from its manifest inputs: {html, diagnostics} (elements.mjs). */
function printElement(name, inputs = {}) {
  return (0,_elements_mjs__WEBPACK_IMPORTED_MODULE_15__.printElement)(name, inputs, validateJsonSchema);
}

/** The problems of the smart elements in HTML a renderer wrote: attributes their manifests do not take (elements.mjs). */
function checkPrintedElements(html) {
  return (0,_elements_mjs__WEBPACK_IMPORTED_MODULE_15__.checkPrintedElements)(html, validateJsonSchema);
}

/** The problems of a host's answer to one source-port request. */
function checkSourceAnswer(request, answer, options = {}) {
  return (0,_data_mjs__WEBPACK_IMPORTED_MODULE_18__.checkSourceAnswer)(request, answer, { ...options, check: validateJsonSchema });
}

/**
 * The source port over a host's three functions {sources(shape),
 * fields(source), preview(binding, {settings, shape})}: each answer is checked
 * before an editor reads it. resolveBinding draws the editor's preview through
 * the port: render(document, {resolveBinding: port.resolveBinding, preview: true}).
 */
function createSourcePort(host, options = {}) {
  if (!host || ['sources', 'fields', 'preview'].some((name) => typeof host[name] !== 'function')) throw new TypeError('composition_source_port_incomplete');
  const answered = async (request, answer, extra = {}) => {
    const problems = checkSourceAnswer(request, answer, { ...options, ...extra });
    if (problems.length) {
      const error = new TypeError(`composition_source_answer_invalid:${request}`);
      error.diagnostics = problems;
      throw error;
    }
    return answer;
  };
  return Object.freeze({
    sources: async (shape) => answered('sources', await host.sources(shape)),
    fields: async (source) => answered('fields', await host.fields(source)),
    preview: async (binding, { settings = {}, shape } = {}) => answered('preview', await host.preview(binding, { settings, shape }), { shape }),
    resolveBinding: async (binding, { shape, settings } = {}) => host.preview(binding, { settings: settings || {}, shape }),
  });
}

const Composition = Object.freeze({
  BUILTIN_EDITOR_MANIFESTS: _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_EDITOR_MANIFESTS,
  BUILTIN_FIELD_KINDS: _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.BUILTIN_FIELD_KINDS,
  BUILTIN_PORT_MANIFESTS: _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_PORT_MANIFESTS,
  EDITOR_FIELD_WORDS: _editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__.EDITOR_FIELD_WORDS,
  EDITOR_WORDS_OWNER: _editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__.EDITOR_WORDS_OWNER,
  Recipe: _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__.Recipe,
  applyFieldValue: _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.applyFieldValue,
  editorFieldMessages: _editor_words_mjs__WEBPACK_IMPORTED_MODULE_1__.editorFieldMessages,
  parseFieldSubmission: _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.parseFieldSubmission,
  renderFieldFallback: _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.renderFieldFallback,
  resolveFieldKind: _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.resolveFieldKind,
  validateFieldKinds: _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.validateFieldKinds,
  validateFieldValue: _fields_mjs__WEBPACK_IMPORTED_MODULE_7__.validateFieldValue,
  VALUE_TYPES: _routing_mjs__WEBPACK_IMPORTED_MODULE_11__.VALUE_TYPES,
  checkPortValue: _routing_mjs__WEBPACK_IMPORTED_MODULE_11__.checkPortValue,
  checkFragmentDescriptor: _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.checkFragmentDescriptor,
  FRAGMENT_DESCRIPTOR_SCHEMA: _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.FRAGMENT_DESCRIPTOR_SCHEMA,
  publishEffects: _fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.publishEffects,
  createPortRegistry: _routing_mjs__WEBPACK_IMPORTED_MODULE_11__.createPortRegistry,
  defineCompositionScope: _routing_mjs__WEBPACK_IMPORTED_MODULE_11__.defineCompositionScope,
  startInlineEdit,
  normalizeInline: _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.normalizeInline,
  inlineText: _inline_model_mjs__WEBPACK_IMPORTED_MODULE_10__.inlineText,
  BUILTIN_TYPE_MANIFESTS: _builtins_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_TYPE_MANIFESTS,
  createRegistry,
  extendRegistry,
  compositionTypeFromSmartManifest,
  describeRegions: _regions_mjs__WEBPACK_IMPORTED_MODULE_9__.describeRegions,
  normalize,
  projectDocumentEditorFields: _editor_mjs__WEBPACK_IMPORTED_MODULE_6__.projectDocumentEditorFields,
  projectEditorFields: _editor_mjs__WEBPACK_IMPORTED_MODULE_6__.projectEditorFields,
  render,
  resolveRecipe: _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__.resolveRecipe,
  parseRecipeJson: _recipe_mjs__WEBPACK_IMPORTED_MODULE_8__.parseRecipeJson,
  stableStringify: _canonical_mjs__WEBPACK_IMPORTED_MODULE_4__.stableStringify,
  validate,
  validateEditorManifest: _editor_mjs__WEBPACK_IMPORTED_MODULE_6__.validateEditorManifest,
  // One block editor (2026-11-03): catalogue, layout utilities, own
  // modifiers, site blocks, named places and data.
  BINDING_STATES: _data_mjs__WEBPACK_IMPORTED_MODULE_18__.BINDING_STATES,
  BUILTIN_CATALOGUE: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.BUILTIN_CATALOGUE,
  BUILTIN_CATALOGUE_ALSO_IN: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.BUILTIN_CATALOGUE_ALSO_IN,
  BUILTIN_CATALOGUE_ICONS: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.BUILTIN_CATALOGUE_ICONS,
  CATALOGUE_GROUPS: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.CATALOGUE_GROUPS,
  CATALOGUE_GROUP_ALIASES: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.CATALOGUE_GROUP_ALIASES,
  CATALOGUE_GROUP_TABLE: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.CATALOGUE_GROUP_TABLE,
  CATALOGUE_TABS: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.CATALOGUE_TABS,
  DATA_SHAPES: _data_mjs__WEBPACK_IMPORTED_MODULE_18__.DATA_SHAPES,
  SOURCE_PORT: _data_mjs__WEBPACK_IMPORTED_MODULE_18__.SOURCE_PORT,
  UTILITY_BREAKPOINTS: _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.UTILITY_BREAKPOINTS,
  bindingSettings: _data_mjs__WEBPACK_IMPORTED_MODULE_18__.bindingSettings,
  catalogue: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.catalogue,
  catalogueEntry: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.catalogueEntry,
  entryGroups: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.entryGroups,
  checkModifiers: _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.checkModifiers,
  checkSourceAnswer,
  composedEditorFields,
  composedInstance: _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.composedInstance,
  composedPart: _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.composedPart,
  composedTextPaths: _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.composedTextPaths,
  createShapeRegistry: _data_mjs__WEBPACK_IMPORTED_MODULE_18__.createShapeRegistry,
  createSourcePort,
  defineComposedType,
  demoData: _data_mjs__WEBPACK_IMPORTED_MODULE_18__.demoData,
  PARAMETER_SETS: _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.PARAMETER_SETS,
  PRINTED_ELEMENTS: _elements_mjs__WEBPACK_IMPORTED_MODULE_15__.PRINTED_ELEMENTS,
  checkPrintedElements,
  elementInputs: _elements_mjs__WEBPACK_IMPORTED_MODULE_15__.elementInputs,
  effectiveProps: _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.effectiveProps,
  expandParameterSets: _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.expandParameterSets,
  parameterSetFields: _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.parameterSetFields,
  printElement,
  withParameterSetFields: _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_16__.withParameterSetFields,
  expandComposed: _composed_mjs__WEBPACK_IMPORTED_MODULE_17__.expandComposed,
  instantiateVariant: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.instantiateVariant,
  ownModifiers: _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.ownModifiers,
  slotAccepts: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.slotAccepts,
  slotPlaces: _catalogue_mjs__WEBPACK_IMPORTED_MODULE_14__.slotPlaces,
  upgradeComposed,
  utilityClasses: _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.utilityClasses,
  utilityClassSpace: _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.utilityClassSpace,
  utilityPartClasses: _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.utilityPartClasses,
  validateTypeManifest,
  valuesByBreakpoint: _utilities_mjs__WEBPACK_IMPORTED_MODULE_13__.valuesByBreakpoint,
});

if (typeof globalThis !== 'undefined') {
  globalThis.SF = globalThis.SF || {};
  globalThis.SF.Composition = Composition;
  (0,_routing_mjs__WEBPACK_IMPORTED_MODULE_11__.defineCompositionScope)();
  (0,_fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.definePageHost)();
  (0,_fragments_mjs__WEBPACK_IMPORTED_MODULE_12__.defineFragmentBoundary)();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Composition);
















__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "f0e430451ca1"
(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INLINE_EVENTS: () => (/* binding */ INLINE_EVENTS),
/* harmony export */   INLINE_EVENTS_FORMER_TAG: () => (/* binding */ INLINE_EVENTS_FORMER_TAG),
/* harmony export */   INLINE_EVENTS_LEGACY: () => (/* binding */ INLINE_EVENTS_LEGACY),
/* harmony export */   INLINE_TOOLBAR_MODES: () => (/* binding */ INLINE_TOOLBAR_MODES),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defineInlineEditor: () => (/* binding */ defineInlineEditor),
/* harmony export */   readInlineDom: () => (/* binding */ readInlineDom),
/* harmony export */   renderInlineDom: () => (/* binding */ renderInlineDom),
/* harmony export */   startInlineEdit: () => (/* binding */ startInlineEdit),
/* harmony export */   textOffset: () => (/* binding */ textOffset)
/* harmony export */ });
/* harmony import */ var _page_language_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("43090d1c8307");
/* harmony import */ var _tag_aliases_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4a85acfb05c1");
/* harmony import */ var _inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e66d878fb4f8");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_page_language_js__WEBPACK_IMPORTED_MODULE_0__, _tag_aliases_js__WEBPACK_IMPORTED_MODULE_1__]);
([_page_language_js__WEBPACK_IMPORTED_MODULE_0__, _tag_aliases_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




// In-place editor for the Composition inline content model. The host starts
// it on a rendered heading or paragraph element; the editor exposes only
// normalized content (never HTML) through events. Cancel restores the exact
// original DOM; commit restores it too and lets the host re-render the saved
// value, so the canvas always returns to host-rendered HTML.

// The names sf-editor-inline's component.json declares (standard 1.3.8 §8,
// vocabulary 1.1.5): input while the text changes, change when it is
// committed, cancel when it is put back -- {id, content}, data only. The
// edited element is the host's, which carries no shim, so each event is
// followed here by the name it had under the former tag sf-inline-editor
// (the same detail, until 2027-01-01), then by its former name with its
// former detail ({node_id, content}) until 2026-12-01.
const INLINE_EVENTS = Object.freeze({
  input: 'sf-editor-inline-input',
  commit: 'sf-editor-inline-change',
  cancel: 'sf-editor-inline-cancel',
});

const INLINE_EVENTS_FORMER_TAG = Object.freeze({
  input: 'sf-inline-editor-input',
  commit: 'sf-inline-editor-change',
  cancel: 'sf-inline-editor-cancel',
});

const INLINE_EVENTS_LEGACY = Object.freeze({
  input: 'sf-inline-edit-input',
  commit: 'sf-inline-edit-commit',
  cancel: 'sf-inline-edit-cancel',
});

function emitInline(element, key, id, content) {
  const detail = content === undefined ? { id } : { id, content };
  const legacy = content === undefined ? { node_id: id } : { node_id: id, content };
  const frozen = Object.freeze(detail);
  element.dispatchEvent(new globalThis.CustomEvent(INLINE_EVENTS[key], { bubbles: true, composed: true, detail: frozen }));
  element.dispatchEvent(new globalThis.CustomEvent(INLINE_EVENTS_FORMER_TAG[key], { bubbles: true, composed: true, detail: frozen }));
  element.dispatchEvent(new globalThis.CustomEvent(INLINE_EVENTS_LEGACY[key], { bubbles: true, composed: true, detail: Object.freeze(legacy) }));
}

const MESSAGES = {
  ru: { toolbar: 'Форматирование', strong: 'Полужирный', em: 'Курсив', code: 'Код', link: 'Ссылка', url: 'Адрес ссылки', apply: 'Применить', unlink: 'Убрать ссылку', editing: '{label}: редактирование. Enter — сохранить, Escape — отменить.', invalid: 'Недопустимый адрес ссылки' },
  en: { toolbar: 'Formatting', strong: 'Bold', em: 'Italic', code: 'Code', link: 'Link', url: 'Link address', apply: 'Apply', unlink: 'Remove link', editing: '{label}: editing. Enter saves, Escape cancels.', invalid: 'Invalid link address' },
};
const SHORTCUTS = { strong: 'b', em: 'i', code: 'e' };
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'HEAD', 'TITLE', 'META', 'LINK', 'IMG', 'SVG', 'OBJECT', 'IFRAME', 'NOSCRIPT']);
const BLOCK = new Set(['P', 'DIV', 'LI', 'UL', 'OL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TR', 'TABLE', 'BLOCKQUOTE', 'SECTION', 'ARTICLE']);
// While editing, an atom or an opaque node is one element that is not
// editable inside and carries its entry as JSON here, so reading the DOM back,
// and pasting what the editor copied, return the entry exactly.
const NODE_ATTRIBUTE = 'data-sf-inline-node';
const ATOM_TAGS = new Map(Object.entries(_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.INLINE_COMPONENTS).map(([name, entry]) => [entry.tag.toUpperCase(), name]));
const isAtomElement = (node) => node?.nodeType === 1 && node.hasAttribute(NODE_ATTRIBUTE);

/** The entry an atom element holds: its JSON, or for a drawn atom without it, its tag and declared attributes. */
function atomEntry(element) {
  const json = element.getAttribute(NODE_ATTRIBUTE);
  if (json !== null) {
    try {
      const entry = JSON.parse(json);
      // Only atoms and opaque nodes travel this way; text and links are read from the DOM.
      if (entry && typeof entry === 'object' && !Array.isArray(entry) && typeof entry.type === 'string' && entry.type !== 'text' && entry.type !== 'link') return entry;
    } catch { /* not ours: read the element as markup */ }
    return null;
  }
  const name = ATOM_TAGS.get(element.tagName.toUpperCase());
  if (!name) return null;
  const declared = _inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.INLINE_COMPONENTS[name].props;
  const props = {};
  if (name === 'kbd') props.text = element.textContent.replace(/\s+/gu, ' ').trim();
  else for (const [key, kind] of Object.entries(declared)) {
    if (!element.hasAttribute(key)) continue;
    props[key] = kind === 'boolean' ? true : element.getAttribute(key);
  }
  const entry = { type: 'component', name, ...(Object.keys(props).length ? { props } : {}) };
  return (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.isInlineComponent)(entry) ? entry : null;
}

const format = (template, values) => template.replace(/\{(\w+)\}/gu, (_, key) => String(values[key] ?? ''));
// Words in the page's language through pageText, as every component takes
// them: the editor read <html lang> alone and offered only English or Russian,
// so SF.language.use() and a product's own dictionary never reached it
// (documentation trial, 2026-10-12).
const words = (node) => Object.fromEntries(Object.keys(MESSAGES.en).map((key) => [key, (0,_page_language_js__WEBPACK_IMPORTED_MODULE_0__.pageText)(MESSAGES, key, node, 'sf-editor-inline')]));

/** Reads inline content from any DOM subtree; foreign markup and styles are dropped. */
function readInlineDom(root, { marks = _inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.INLINE_MARKS, links = true, collapse = false } = {}) {
  const segments = [];
  const visit = (node, active, href) => {
    if (node.nodeType === 3) {
      let text = node.nodeValue.replace(/\u00a0/gu, ' ').replace(/[\r\n\t\f\v]/gu, ' ');
      if (collapse) text = text.replace(/ {2,}/gu, ' ');
      if (text) segments.push({ text, marks: [...active], href });
      return;
    }
    if (node.nodeType !== 1 && node.nodeType !== 11) return;
    if (node.nodeType === 1 && node !== root) {
      const entry = atomEntry(node);
      if (entry) {
        segments.push({ text: _inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.INLINE_OBJECT, marks: [], href, node: entry });
        return;
      }
    }
    if (node.nodeType === 1 && SKIP.has(node.tagName.toUpperCase())) return;
    const tag = node.nodeType === 1 ? node.tagName.toUpperCase() : '';
    const next = new Set(active);
    let nextHref = href;
    if (tag === 'STRONG' || tag === 'B') next.add('strong');
    if (tag === 'EM' || tag === 'I') next.add('em');
    if (tag === 'CODE' || tag === 'KBD' || tag === 'SAMP') next.add('code');
    if (node.nodeType === 1 && node.style) {
      const weight = node.style.fontWeight;
      if (weight === 'bold' || weight === 'bolder' || Number(weight) >= 600) next.add('strong');
      if (node.style.fontStyle === 'italic') next.add('em');
    }
    if (tag === 'A' && !href && links) {
      const candidate = node.getAttribute('href');
      if ((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.safeHref)(candidate)) nextHref = candidate;
    }
    if (tag === 'BR') {
      // The placeholder <br> a browser leaves in an emptied editor is not content.
      if (node.parentNode === root && !node.nextSibling) return;
      segments.push({ text: ' ', marks: [...active], href });
      return;
    }
    for (const child of node.childNodes) visit(child, next, nextHref);
    // Nested blocks (pasted paragraphs) are separated by one space; the root is not.
    if (BLOCK.has(tag) && node !== root) segments.push({ text: ' ', marks: [], href: null });
  };
  visit(root, new Set(), null);
  const allowed = new Set(marks);
  let content = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.fromSegments)(segments.map((segment) => ({ ...segment, marks: segment.marks.filter((mark) => allowed.has(mark)), href: links ? segment.href : null })));
  if (collapse) {
    const flat = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.toSegments)(content);
    if (flat.length && !flat[0].node) flat[0] = { ...flat[0], text: flat[0].text.replace(/^ +/u, '') };
    if (flat.length && !flat.at(-1).node) flat[flat.length - 1] = { ...flat.at(-1), text: flat.at(-1).text.replace(/ +$/u, '') };
    content = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.fromSegments)(flat);
  }
  return content;
}

/**
 * Renders inline content with the same element nesting as the Framework
 * renderer. An atom draws its component's element, an opaque node a
 * placeholder; both are not editable inside and carry their entry.
 */
function renderInlineDom(doc, content) {
  const fragment = doc.createDocumentFragment();
  const object = (entry) => {
    const view = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.inlineComponentView)(entry);
    const element = doc.createElement(view ? view.tag : 'span');
    if (view) {
      for (const [name, value] of view.attributes) element.setAttribute(name, value);
      if (view.text) element.textContent = view.text;
    } else element.textContent = _inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.INLINE_OBJECT;
    element.setAttribute('contenteditable', 'false');
    element.setAttribute(NODE_ATTRIBUTE, JSON.stringify(entry));
    return element;
  };
  const run = (entry) => {
    if (entry.type !== 'text') return object(entry);
    let node = doc.createTextNode(entry.value);
    for (const mark of entry.marks || []) {
      const wrapper = doc.createElement(mark);
      wrapper.append(node);
      node = wrapper;
    }
    return node;
  };
  for (const entry of (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.normalizeInline)(content)) {
    if (entry.type === 'link') {
      const anchor = doc.createElement('a');
      anchor.setAttribute('href', entry.href);
      for (const child of entry.children) anchor.append(run(child));
      fragment.append(anchor);
    } else fragment.append(run(entry));
  }
  return fragment;
}

// The units of offset inside root, in document order: text nodes outside
// atoms, and atom elements, which hold one unit each.
function units(root) {
  const list = [];
  const visit = (node) => {
    for (const child of node.childNodes) {
      if (child.nodeType === 3) list.push(child);
      else if (isAtomElement(child)) list.push(child);
      else if (child.nodeType === 1) visit(child);
    }
  };
  visit(root);
  return list;
}
const unitLength = (unit) => (unit.nodeType === 3 ? unit.nodeValue.length : 1);

/** Offset of a DOM position inside root: characters of text nodes, one per atom. */
function textOffset(root, container, offset) {
  const range = root.ownerDocument.createRange();
  range.setStart(root, 0);
  range.setEnd(container, offset);
  let total = 0;
  for (const unit of units(root)) {
    if (unit === container) return total + offset;
    // A unit counts once its end is inside [root start, position].
    const [parent, index] = unit.nodeType === 3 ? [unit, unit.nodeValue.length] : [unit.parentNode, [...unit.parentNode.childNodes].indexOf(unit) + 1];
    if (range.comparePoint(parent, index) !== 0) break;
    total += unitLength(unit);
  }
  return total;
}

// The DOM position of an offset: inside a text node where one holds it, else
// beside the atom, so the caret never lands inside one.
function locate(root, offset) {
  let total = 0;
  const list = units(root);
  for (const unit of list) {
    if (unit.nodeType === 3) {
      if (offset <= total + unit.nodeValue.length) return [unit, offset - total];
    } else if (offset <= total) return [unit.parentNode, [...unit.parentNode.childNodes].indexOf(unit)];
    total += unitLength(unit);
  }
  const last = list.at(-1);
  if (!last) return [root, 0];
  return last.nodeType === 3 ? [last, last.nodeValue.length] : [last.parentNode, [...last.parentNode.childNodes].indexOf(last) + 1];
}

/** Selects from anchor to focus (focus may come first: a backward selection). */
function setSelection(root, anchor, focus = anchor) {
  const selection = root.ownerDocument.getSelection();
  const [anchorNode, anchorOffset] = locate(root, anchor);
  const [focusNode, focusOffset] = locate(root, focus);
  selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
}

// When the formatting toolbar shows: for the whole edit, over the element
// (session, the default), or only while text is selected, over the selection
// (selection: a flow editor where every paragraph is an edit, and a bar over
// the element would cover the line being typed; simai/ui-source#67).
const INLINE_TOOLBAR_MODES = Object.freeze(['session', 'selection']);

/**
 * Starts in-place editing of a rendered heading or paragraph element.
 * options: {content, nodeId, label, marks, links, messages, toolbar}
 * Returns {commit(), cancel(), value(), element}.
 */
function startInlineEdit(element, options = {}) {
  if (!(element instanceof globalThis.Element)) throw new TypeError('Inline editing needs an element');
  if (element.hasAttribute('data-sf-inline-editing')) throw new TypeError('inline_edit_active');
  const toolbarMode = options.toolbar ?? 'session';
  if (!INLINE_TOOLBAR_MODES.includes(toolbarMode)) throw new TypeError(`inline_toolbar_unknown: ${toolbarMode}`);
  const doc = element.ownerDocument;
  const text = { ...words(element), ...(options.messages || {}) };
  const marks = (options.marks || _inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.INLINE_MARKS).filter((mark) => _inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.INLINE_MARKS.includes(mark));
  const links = options.links !== false;
  const original = { html: element.innerHTML, attributes: ['contenteditable', 'role', 'aria-multiline', 'aria-label', 'spellcheck', 'tabindex'].map((name) => [name, element.getAttribute(name)]) };
  const history = [];
  let historyIndex = -1;
  let composing = false;
  let lastTyping = 0;
  let finished = false;
  const connection = new AbortController();
  const signal = { signal: connection.signal };

  const read = () => readInlineDom(element, { marks, links });
  const selectionOffsets = () => {
    const selection = doc.getSelection();
    if (!selection?.rangeCount || !element.contains(selection.anchorNode)) return [(0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.inlineLength)(read()), (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.inlineLength)(read())];
    const range = selection.getRangeAt(0);
    return [textOffset(element, range.startContainer, range.startOffset), textOffset(element, range.endContainer, range.endOffset)];
  };
  const draw = (content, start, end) => {
    element.replaceChildren(renderInlineDom(doc, content));
    setSelection(element, start, end);
  };
  const snapshot = (merge = false) => {
    const entry = { content: read(), selection: selectionOffsets() };
    if (merge && historyIndex === history.length - 1 && history[historyIndex].typing) history[historyIndex] = { ...entry, typing: true };
    else {
      history.splice(historyIndex + 1);
      history.push({ ...entry, typing: merge });
      historyIndex = history.length - 1;
    }
  };
  const emitInput = () => emitInline(element, 'input', options.nodeId ?? null, read());
  const apply = (content, start, end) => {
    draw(content, start, end);
    snapshot(false);
    emitInput();
    updateToolbar();
  };
  const restore = (index) => {
    historyIndex = index;
    const entry = history[index];
    draw(entry.content, ...entry.selection);
    emitInput();
    updateToolbar();
  };

  // Toolbar ----------------------------------------------------------------
  const toolbar = doc.createElement('div');
  toolbar.className = 'sf-inline-editor-toolbar';
  toolbar.setAttribute('role', 'toolbar');
  toolbar.setAttribute('aria-label', text.toolbar);
  toolbar.dataset.sfToolbar = toolbarMode;
  if (toolbarMode === 'selection') toolbar.hidden = true;
  const buttons = new Map();
  for (const mark of marks) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = `sf-inline-editor-button sf-inline-editor-button--${mark}`;
    button.dataset.mark = mark;
    button.textContent = text[mark];
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-keyshortcuts', `Control+${SHORTCUTS[mark].toUpperCase()} Meta+${SHORTCUTS[mark].toUpperCase()}`);
    buttons.set(mark, button);
    toolbar.append(button);
  }
  const linkForm = doc.createElement('div');
  linkForm.className = 'sf-inline-editor-link';
  linkForm.hidden = true;
  const linkInput = doc.createElement('input');
  linkInput.type = 'url';
  linkInput.className = 'sf-inline-editor-url';
  linkInput.setAttribute('aria-label', text.url);
  const linkApply = doc.createElement('button');
  linkApply.type = 'button';
  linkApply.className = 'sf-inline-editor-button';
  linkApply.textContent = text.apply;
  const linkRemove = doc.createElement('button');
  linkRemove.type = 'button';
  linkRemove.className = 'sf-inline-editor-button';
  linkRemove.textContent = text.unlink;
  const linkError = doc.createElement('span');
  linkError.className = 'sf-inline-editor-error';
  linkError.setAttribute('role', 'alert');
  linkForm.append(linkInput, linkApply, linkRemove, linkError);
  if (links) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = 'sf-inline-editor-button sf-inline-editor-button--link';
    button.dataset.link = 'toggle';
    button.textContent = text.link;
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-keyshortcuts', 'Control+K Meta+K');
    buttons.set('link', button);
    toolbar.append(button, linkForm);
  }
  doc.body.append(toolbar);
  let savedSelection = [0, 0];

  // The box of the text between two offsets: the first line's top, the last
  // line's bottom, the span between the leftmost and rightmost edge.
  function rangeBox(start, end) {
    if (start === end) return null;
    const range = doc.createRange();
    range.setStart(...locate(element, Math.min(start, end)));
    range.setEnd(...locate(element, Math.max(start, end)));
    const lines = [...range.getClientRects()].filter((rect) => rect.width > 0 || rect.height > 0);
    if (!lines.length) return null;
    return {
      top: Math.min(...lines.map((rect) => rect.top)),
      bottom: Math.max(...lines.map((rect) => rect.bottom)),
      left: Math.min(...lines.map((rect) => rect.left)),
      right: Math.max(...lines.map((rect) => rect.right)),
    };
  }

  // The selection mode's place: above the selected text, centred on it,
  // below it when there is no room above, kept inside the viewport. While the
  // link form is open the selection is in its field, so the saved one counts.
  function positionOverSelection() {
    if (toolbar.hidden) return;
    const box = rangeBox(...(linkForm.hidden ? selectionOffsets() : savedSelection));
    if (!box) return;
    const bar = toolbar.getBoundingClientRect();
    const above = box.top - bar.height - 4;
    const top = above >= 0 ? above : Math.min(globalThis.innerHeight - bar.height, box.bottom + 4);
    const left = (box.left + box.right) / 2 - bar.width / 2;
    Object.assign(toolbar.style, { top: `${top}px`, left: `${Math.max(0, Math.min(left, globalThis.innerWidth - bar.width))}px` });
  }

  function positionToolbar() {
    if (toolbarMode === 'selection') {
      positionOverSelection();
      return;
    }
    const box = element.getBoundingClientRect();
    const bar = toolbar.getBoundingClientRect();
    const rtl = globalThis.getComputedStyle(element).direction === 'rtl';
    const above = box.top - bar.height - 4;
    const top = above >= 0 ? above : Math.min(globalThis.innerHeight - bar.height, box.bottom + 4);
    const start = rtl ? box.right - bar.width : box.left;
    Object.assign(toolbar.style, { top: `${top}px`, left: `${Math.max(0, Math.min(start, globalThis.innerWidth - bar.width))}px` });
  }

  function updateToolbar() {
    const [start, end] = selectionOffsets();
    const state = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.marksIn)(read(), start, end === start ? Math.max(0, start - 1) : end);
    for (const mark of marks) buttons.get(mark).setAttribute('aria-pressed', state.marks.includes(mark) ? 'true' : 'false');
    buttons.get('link')?.setAttribute('aria-pressed', state.href ? 'true' : 'false');
    // Selection mode: the bar is there while text is selected or a link is
    // being written, and nowhere while the caret only stands in the text.
    if (toolbarMode === 'selection') toolbar.hidden = start === end && linkForm.hidden;
    positionToolbar();
  }

  function toggle(mark) {
    const [start, end] = selectionOffsets();
    if (start === end) return;
    apply((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.toggleMark)(read(), start, end, mark), start, end);
  }

  function openLink() {
    savedSelection = selectionOffsets();
    if (savedSelection[0] === savedSelection[1]) return;
    linkForm.hidden = false;
    linkError.textContent = '';
    linkInput.value = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.marksIn)(read(), ...savedSelection).href || '';
    linkInput.focus();
    positionToolbar();
  }

  function closeLink(focusEditor = true) {
    linkForm.hidden = true;
    if (focusEditor) {
      element.focus();
      setSelection(element, ...savedSelection);
    }
    if (toolbarMode === 'selection' && !finished) updateToolbar();
  }

  function applyLink(href) {
    if (href !== null && !(0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.safeHref)(href)) {
      linkError.textContent = text.invalid;
      linkInput.setAttribute('aria-invalid', 'true');
      return;
    }
    linkInput.removeAttribute('aria-invalid');
    closeLink();
    apply((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.setLink)(read(), ...savedSelection, href), ...savedSelection);
  }

  // Lifecycle --------------------------------------------------------------
  function teardown() {
    finished = true;
    connection.abort();
    toolbar.remove();
    element.innerHTML = original.html;
    for (const [name, value] of original.attributes) {
      if (value === null) element.removeAttribute(name);
      else element.setAttribute(name, value);
    }
    element.removeAttribute('data-sf-inline-editing');
  }

  function commit() {
    if (finished) return null;
    const content = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.normalizeInline)(read());
    teardown();
    emitInline(element, 'commit', options.nodeId ?? null, content);
    return content;
  }

  function cancel() {
    if (finished) return;
    teardown();
    emitInline(element, 'cancel', options.nodeId ?? null);
  }

  // Start ------------------------------------------------------------------
  const initial = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.normalizeInline)(options.content ?? readInlineDom(element, { marks, links }));
  element.setAttribute('data-sf-inline-editing', '');
  element.setAttribute('contenteditable', 'true');
  element.setAttribute('role', 'textbox');
  element.setAttribute('aria-multiline', 'false');
  element.setAttribute('aria-label', format(text.editing, { label: options.label || '' }).replace(/^: /u, ''));
  element.replaceChildren(renderInlineDom(doc, initial));
  element.focus();
  setSelection(element, (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.inlineLength)(initial));
  history.push({ content: initial, selection: selectionOffsets(), typing: false });
  historyIndex = 0;

  element.addEventListener('beforeinput', (event) => {
    if (event.inputType === 'historyUndo' || event.inputType === 'historyRedo') {
      event.preventDefault();
      if (event.inputType === 'historyUndo' && historyIndex > 0) restore(historyIndex - 1);
      if (event.inputType === 'historyRedo' && historyIndex < history.length - 1) restore(historyIndex + 1);
    } else if (event.inputType === 'insertParagraph' || event.inputType === 'insertLineBreak') {
      event.preventDefault();
    } else if (event.inputType.startsWith('format')) {
      event.preventDefault();
      const mark = { formatBold: 'strong', formatItalic: 'em' }[event.inputType];
      if (mark && marks.includes(mark)) toggle(mark);
    } else if (event.inputType === 'insertFromDrop') {
      event.preventDefault();
    }
  }, signal);
  element.addEventListener('input', () => {
    if (composing) return;
    const now = Date.now();
    snapshot(now - lastTyping < 700);
    lastTyping = now;
    emitInput();
    updateToolbar();
  }, signal);
  element.addEventListener('compositionstart', () => { composing = true; }, signal);
  element.addEventListener('compositionend', () => {
    composing = false;
    snapshot(false);
    emitInput();
  }, signal);
  element.addEventListener('paste', (event) => {
    event.preventDefault();
    const data = event.clipboardData;
    const html = data?.getData('text/html');
    const plain = data?.getData('text/plain') || '';
    const parsed = html
      ? readInlineDom(new globalThis.DOMParser().parseFromString(html, 'text/html').body, { marks, links, collapse: true })
      : [{ type: 'text', value: plain.replace(/\s+/gu, ' ').trim() }];
    const inserted = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.toSegments)(parsed);
    const [start, end] = selectionOffsets();
    const length = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.inlineLength)((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.fromSegments)(inserted));
    apply((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.replaceRange)(read(), start, end, inserted), start + length, start + length);
  }, signal);
  element.addEventListener('drop', (event) => event.preventDefault(), signal);
  // Copy and cut write the editor's own HTML, in which an atom keeps its
  // entry, so pasting it into an inline editor gives the same atom back.
  const copySelection = (event, remove) => {
    const [start, end] = selectionOffsets();
    if (start === end || !event.clipboardData) return;
    event.preventDefault();
    const slice = (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.sliceInline)(read(), start, end);
    const holder = doc.createElement('div');
    holder.append(renderInlineDom(doc, slice));
    event.clipboardData.setData('text/html', holder.innerHTML);
    event.clipboardData.setData('text/plain', (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.toSegments)(slice).map(({ text, node }) => (node ? (typeof node.props?.text === 'string' ? node.props.text : '') : text)).join(''));
    if (remove) apply((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.replaceRange)(read(), start, end, []), start, start);
  };
  element.addEventListener('copy', (event) => copySelection(event, false), signal);
  element.addEventListener('cut', (event) => copySelection(event, true), signal);
  // An atom is one caret stop: arrows step over it in one move, Backspace
  // and Delete remove it whole. Only the moves next to an atom are taken over.
  const stepOverAtom = (event) => {
    const selection = doc.getSelection();
    if (!selection?.rangeCount || event.altKey || event.ctrlKey || event.metaKey) return false;
    const content = read();
    const [start, end] = selectionOffsets();
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (start !== end) {
        if (!(0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.toSegments)((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.sliceInline)(content, start, end)).some(({ node }) => node)) return false;
        apply((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.replaceRange)(content, start, end, []), start, start);
        return true;
      }
      const at = event.key === 'Backspace' ? start - 1 : start;
      if (at < 0 || !(0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.objectAt)(content, at)) return false;
      apply((0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.replaceRange)(content, at, at + 1, []), at, at);
      return true;
    }
    const rtl = globalThis.getComputedStyle(element).direction === 'rtl';
    const forward = (event.key === 'ArrowRight') !== rtl;
    const anchor = textOffset(element, selection.anchorNode, selection.anchorOffset);
    const focus = textOffset(element, selection.focusNode, selection.focusOffset);
    if (!event.shiftKey && anchor !== focus) return false;
    const next = forward ? focus + 1 : focus - 1;
    if (!(0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.objectAt)(content, forward ? focus : focus - 1)) return false;
    setSelection(element, event.shiftKey ? anchor : next, next);
    updateToolbar();
    return true;
  };
  element.addEventListener('keydown', (event) => {
    if (event.isComposing || composing) return;
    const modifier = event.ctrlKey || event.metaKey;
    if (['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(event.key) && stepOverAtom(event)) {
      event.preventDefault();
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      commit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
    } else if (modifier && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) { if (historyIndex < history.length - 1) restore(historyIndex + 1); } else if (historyIndex > 0) restore(historyIndex - 1);
    } else if (modifier && event.key.toLowerCase() === 'y') {
      event.preventDefault();
      if (historyIndex < history.length - 1) restore(historyIndex + 1);
    } else if (modifier && event.key.toLowerCase() === 'k' && links) {
      event.preventDefault();
      openLink();
    } else if (modifier) {
      const mark = Object.entries(SHORTCUTS).find(([, key]) => key === event.key.toLowerCase())?.[0];
      if (mark && marks.includes(mark)) {
        event.preventDefault();
        toggle(mark);
      }
    }
  }, signal);
  toolbar.addEventListener('mousedown', (event) => {
    // Keep the text selection while pressing toolbar buttons.
    if (event.target.closest('button')) event.preventDefault();
  }, signal);
  toolbar.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.mark) toggle(button.dataset.mark);
    else if (button.dataset.link) (linkForm.hidden ? openLink() : closeLink());
    else if (button === linkApply) applyLink(linkInput.value.trim());
    else if (button === linkRemove) applyLink(null);
  }, signal);
  linkInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); applyLink(linkInput.value.trim()); }
    if (event.key === 'Escape') { event.preventDefault(); closeLink(); }
  }, signal);
  const onFocusOut = (event) => {
    const next = event.relatedTarget;
    if (next && (element.contains(next) || toolbar.contains(next))) return;
    // Let a click inside the toolbar land before deciding to commit.
    globalThis.setTimeout(() => {
      if (!finished && !element.contains(doc.activeElement) && !toolbar.contains(doc.activeElement)) commit();
    }, 0);
  };
  element.addEventListener('focusout', onFocusOut, signal);
  toolbar.addEventListener('focusout', onFocusOut, signal);
  doc.addEventListener('selectionchange', () => { if (element.contains(doc.getSelection()?.anchorNode)) updateToolbar(); }, signal);
  globalThis.addEventListener('scroll', positionToolbar, { ...signal, passive: true, capture: true });
  globalThis.addEventListener('resize', positionToolbar, { ...signal, passive: true });
  updateToolbar();

  return Object.freeze({ element, commit, cancel, value: () => (0,_inline_model_mjs__WEBPACK_IMPORTED_MODULE_2__.normalizeInline)(read()) });
}

/**
 * <sf-editor-inline> is the loadable carrier of the inline editor: placing it
 * on a page lets the Smart loader fetch this code on demand. It renders
 * nothing; edit(element, options) is startInlineEdit.
 */
//
// base: the class made from sf-editor-inline's component.json
// (manifest-host.mjs); without it the carrier is a plain element.
function defineInlineEditor(registry = globalThis.customElements, { base = null } = {}) {
  if (!registry || typeof globalThis.HTMLElement !== 'function') return null;
  const existing = registry.get('sf-editor-inline');
  if (existing) return existing;
  class SfInlineEditor extends (base || globalThis.HTMLElement) {
    connectedCallback() {
      super.connectedCallback?.();
      this.hidden = true;
    }

    edit(element, options) {
      return startInlineEdit(element, options);
    }
  }
  registry.define('sf-editor-inline', SfInlineEditor);
  // The former tag sf-inline-editor is a dated alias (a subclass, noted once).
  (0,_tag_aliases_js__WEBPACK_IMPORTED_MODULE_1__.defineTagAliases)(SfInlineEditor, 'sf-editor-inline', { define: (name, Class) => registry.define(name, Class) });
  return SfInlineEditor;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ INLINE_EVENTS, INLINE_EVENTS_FORMER_TAG, INLINE_EVENTS_LEGACY, INLINE_TOOLBAR_MODES, defineInlineEditor, readInlineDom, renderInlineDom, startInlineEdit, textOffset });

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "e66d878fb4f8"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INLINE_COMPONENTS: () => (/* binding */ INLINE_COMPONENTS),
/* harmony export */   INLINE_LIMITS: () => (/* binding */ INLINE_LIMITS),
/* harmony export */   INLINE_MARKS: () => (/* binding */ INLINE_MARKS),
/* harmony export */   INLINE_OBJECT: () => (/* binding */ INLINE_OBJECT),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fromSegments: () => (/* binding */ fromSegments),
/* harmony export */   inlineComponentSchemas: () => (/* binding */ inlineComponentSchemas),
/* harmony export */   inlineComponentView: () => (/* binding */ inlineComponentView),
/* harmony export */   inlineLength: () => (/* binding */ inlineLength),
/* harmony export */   inlineText: () => (/* binding */ inlineText),
/* harmony export */   isInlineComponent: () => (/* binding */ isInlineComponent),
/* harmony export */   marksIn: () => (/* binding */ marksIn),
/* harmony export */   normalizeInline: () => (/* binding */ normalizeInline),
/* harmony export */   objectAt: () => (/* binding */ objectAt),
/* harmony export */   replaceRange: () => (/* binding */ replaceRange),
/* harmony export */   safeHref: () => (/* binding */ safeHref),
/* harmony export */   setLink: () => (/* binding */ setLink),
/* harmony export */   sliceInline: () => (/* binding */ sliceInline),
/* harmony export */   toSegments: () => (/* binding */ toSegments),
/* harmony export */   toggleMark: () => (/* binding */ toggleMark)
/* harmony export */ });
// Pure operations on the Composition inline content model used by
// content.heading and content.paragraph: text runs with strong, em and code
// marks, links whose children are text runs, and inline component atoms
// ({type: 'component', name, props}). No DOM access here.
//
// Every other entry -- a node from a newer producer, or an atom this model
// does not know -- is opaque: it holds one caret stop, takes no marks, and
// comes back out of every operation exactly as it went in. toSegments used
// to drop such entries, so an edit next to them lost them silently.

const INLINE_MARKS = Object.freeze(['strong', 'em', 'code']);
const MARK_ORDER = new Map(INLINE_MARKS.map((mark, index) => [mark, index]));
const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const INLINE_LIMITS = Object.freeze({ maxTextLength: 100000, maxHrefLength: 2048, maxPropLength: 1000 });

// The closed list of inline atoms. Each name draws one element; its props
// are that component's own settings, a string (text) or a token (a name the
// component reads from a fixed set) or a boolean. Nothing else is drawn, so
// no prop can become an event handler or markup.
const INLINE_COMPONENTS = Object.freeze({
  badge: Object.freeze({ tag: 'sf-badge', required: [], props: Object.freeze({ text: 'text', icon: 'token', appearance: 'token', scheme: 'token', status: 'token', size: 'token', compact: 'boolean' }) }),
  kbd: Object.freeze({ tag: 'kbd', required: ['text'], props: Object.freeze({ text: 'text' }) }),
  icon: Object.freeze({ tag: 'sf-icon', required: ['icon'], props: Object.freeze({ icon: 'token', label: 'text', size: 'token', filled: 'boolean' }) }),
  button: Object.freeze({ tag: 'sf-button', required: [], props: Object.freeze({ text: 'text', icon: 'token', appearance: 'token', scheme: 'token', size: 'token' }) }),
});
const TOKEN = '^[a-z0-9][a-z0-9_/-]{0,63}$';
const TOKEN_PATTERN = new RegExp(TOKEN, 'u');
// The one unit an atom or an opaque node holds in segment offsets.
const INLINE_OBJECT = '\ufffc';

/** JSON Schema of one inline atom per name, for the type manifests. */
function inlineComponentSchemas() {
  const prop = (kind) => (kind === 'boolean' ? { type: 'boolean' } : kind === 'token' ? { type: 'string', pattern: TOKEN } : { type: 'string', maxLength: INLINE_LIMITS.maxPropLength });
  return Object.entries(INLINE_COMPONENTS).map(([name, entry]) => ({
    type: 'object',
    required: ['type', 'name', ...(entry.required.length ? ['props'] : [])],
    additionalProperties: false,
    properties: {
      type: { const: 'component' },
      name: { const: name },
      props: {
        type: 'object',
        ...(entry.required.length ? { required: [...entry.required] } : {}),
        additionalProperties: false,
        properties: Object.fromEntries(Object.entries(entry.props).map(([key, kind]) => [key, prop(kind)])),
      },
    },
  }));
}

/** True for an atom whose name is declared and whose props are all declared and well typed. */
function isInlineComponent(node) {
  const entry = node?.type === 'component' && Object.hasOwn(INLINE_COMPONENTS, node.name) ? INLINE_COMPONENTS[node.name] : null;
  if (!entry) return false;
  if (Object.keys(node).some((key) => !['type', 'name', 'props'].includes(key))) return false;
  const props = node.props ?? {};
  if (!props || typeof props !== 'object' || Array.isArray(props)) return false;
  if (entry.required.some((key) => !(key in props))) return false;
  return Object.entries(props).every(([key, value]) => {
    const kind = Object.hasOwn(entry.props, key) ? entry.props[key] : null;
    if (kind === 'boolean') return typeof value === 'boolean';
    if (kind === 'token') return typeof value === 'string' && TOKEN_PATTERN.test(value);
    return kind === 'text' && typeof value === 'string' && value.length <= INLINE_LIMITS.maxPropLength;
  });
}

/** The tag and attributes an atom draws as; text is a kbd's content. Values are raw: the caller escapes. */
function inlineComponentView(node) {
  if (!isInlineComponent(node)) return null;
  const entry = INLINE_COMPONENTS[node.name];
  const props = node.props ?? {};
  if (node.name === 'kbd') return { tag: entry.tag, attributes: [], text: props.text };
  const attributes = Object.keys(entry.props).filter((key) => key in props && props[key] !== false)
    .map((key) => [key, props[key] === true ? '' : props[key]]);
  return { tag: entry.tag, attributes, text: '' };
}

const clone = (value) => JSON.parse(JSON.stringify(value));
const isObjectEntry = (entry) => entry !== null && typeof entry === 'object' && !Array.isArray(entry) && entry.type !== 'text' && entry.type !== 'link';

/** Same link rule as Document validation: relative, fragment or http(s)/mailto/tel. */
function safeHref(value) {
  if (typeof value !== 'string' || value.length < 1 || value.length > INLINE_LIMITS.maxHrefLength) return false;
  // Browsers read "/\\host" like "//host": backslashes never form a local link.
  if (/^(?:\/|\.?\.\/|#)/u.test(value)) return !value.startsWith('//') && !value.includes('\\');
  try {
    return SAFE_SCHEMES.has(new globalThis.URL(value).protocol);
  } catch {
    return false;
  }
}

function sortMarks(marks) {
  return [...new Set(marks)].filter((mark) => MARK_ORDER.has(mark)).sort((left, right) => MARK_ORDER.get(left) - MARK_ORDER.get(right));
}

/**
 * Flat segments: {text, marks: string[], href: string|null}. An atom or an
 * opaque node is one segment {text: INLINE_OBJECT, marks: [], href, node}
 * that carries the entry unchanged; inside a link it keeps the link's href.
 */
function toSegments(content) {
  const segments = [];
  const push = (run, href) => {
    if (isObjectEntry(run)) {
      segments.push({ text: INLINE_OBJECT, marks: [], href, node: clone(run) });
      return;
    }
    if (run?.type !== 'text' || typeof run.value !== 'string' || !run.value) return;
    segments.push({ text: run.value, marks: sortMarks(Array.isArray(run.marks) ? run.marks : []), href });
  };
  for (const entry of Array.isArray(content) ? content : []) {
    if (entry?.type === 'link') {
      const href = safeHref(entry.href) ? entry.href : null;
      for (const child of Array.isArray(entry.children) ? entry.children : []) push(child, href);
    } else push(entry, null);
  }
  return segments;
}

const sameStyle = (left, right) => !left.node && !right.node && left.href === right.href && left.marks.join() === right.marks.join();

/** Builds normalized content: merged runs, canonical marks, no empty parts. */
function fromSegments(segments) {
  const merged = [];
  for (const segment of segments) {
    if (segment.node) {
      merged.push({ text: INLINE_OBJECT, marks: [], href: segment.href && safeHref(segment.href) ? segment.href : null, node: segment.node });
      continue;
    }
    if (!segment.text) continue;
    const clean = { text: segment.text, marks: sortMarks(segment.marks || []), href: segment.href && safeHref(segment.href) ? segment.href : null };
    const previous = merged.at(-1);
    if (previous && sameStyle(previous, clean)) previous.text += clean.text;
    else merged.push(clean);
  }
  const content = [];
  for (const segment of merged) {
    const run = segment.node ? clone(segment.node) : { type: 'text', value: segment.text, ...(segment.marks.length ? { marks: segment.marks } : {}) };
    const previous = content.at(-1);
    if (segment.href) {
      if (previous?.type === 'link' && previous.href === segment.href) previous.children.push(run);
      else content.push({ type: 'link', href: segment.href, children: [run] });
    } else content.push(run);
  }
  return content;
}

function normalizeInline(content) {
  return fromSegments(toSegments(content));
}

/** The text of the text runs; atoms and opaque nodes add nothing. */
function inlineText(content) {
  return toSegments(content).filter(({ node }) => !node).map(({ text }) => text).join('');
}

/** Length in segment offsets: characters, plus one for each atom or opaque node. */
function inlineLength(content) {
  return toSegments(content).reduce((sum, { text }) => sum + text.length, 0);
}

/** The atom or opaque node that holds offset [at, at + 1), or null. */
function objectAt(content, at) {
  let position = 0;
  for (const segment of toSegments(content)) {
    if (position === at && segment.node) return segment.node;
    position += segment.text.length;
    if (position > at) return null;
  }
  return null;
}

/** The segments of [start, end), for copying. */
function sliceInline(content, start, end) {
  const [from, to] = [Math.min(start, end), Math.max(start, end)];
  return fromSegments(range(content, from, to).filter(({ inside }) => inside).map(({ segment }) => segment));
}

function split(segments, offset) {
  const output = [];
  let position = 0;
  for (const segment of segments) {
    const end = position + segment.text.length;
    if (offset > position && offset < end) {
      output.push({ ...segment, text: segment.text.slice(0, offset - position) }, { ...segment, text: segment.text.slice(offset - position) });
    } else output.push(segment);
    position = end;
  }
  return output;
}

function range(content, start, end) {
  const segments = split(split(toSegments(content), start), end);
  let position = 0;
  return segments.map((segment) => {
    const from = position;
    position += segment.text.length;
    return { segment, inside: from >= start && position <= end && position > from };
  });
}

/** Marks and link shared by every character in [start, end). */
function marksIn(content, start, end) {
  // Atoms take no marks and no link, so they do not decide the state.
  const inside = range(content, Math.min(start, end), Math.max(start, end)).filter(({ inside: isInside, segment }) => isInside && !segment.node).map(({ segment }) => segment);
  if (!inside.length) return { marks: [], href: null };
  const marks = INLINE_MARKS.filter((mark) => inside.every((segment) => segment.marks.includes(mark)));
  const href = inside.every((segment) => segment.href === inside[0].href) ? inside[0].href : null;
  return { marks, href };
}

/** Adds the mark to [start, end) unless every character already has it. */
function toggleMark(content, start, end, mark) {
  if (!MARK_ORDER.has(mark) || start === end) return normalizeInline(content);
  const [from, to] = [Math.min(start, end), Math.max(start, end)];
  const remove = marksIn(content, from, to).marks.includes(mark);
  return fromSegments(range(content, from, to).map(({ segment, inside }) => (inside && !segment.node
    ? { ...segment, marks: remove ? segment.marks.filter((entry) => entry !== mark) : [...segment.marks, mark] }
    : segment)));
}

/** Sets or removes (href null) a link on [start, end); unsafe links are refused. */
function setLink(content, start, end, href) {
  if (href !== null && !safeHref(href)) throw new TypeError('inline_link_unsafe');
  const [from, to] = [Math.min(start, end), Math.max(start, end)];
  if (from === to) return normalizeInline(content);
  // An atom is never nested in a link: the link stops on each side of it.
  return fromSegments(range(content, from, to).map(({ segment, inside }) => (inside && !segment.node ? { ...segment, href } : segment)));
}

/** Replaces [start, end) with segments (typing, paste or deletion). */
function replaceRange(content, start, end, inserted) {
  const [from, to] = [Math.min(start, end), Math.max(start, end)];
  const parts = range(content, from, to);
  const before = parts.filter((_, index) => parts.slice(0, index + 1).reduce((sum, part) => sum + part.segment.text.length, 0) <= from).map(({ segment }) => segment);
  let consumed = 0;
  const after = [];
  for (const { segment } of parts) {
    const segmentStart = consumed;
    consumed += segment.text.length;
    if (segmentStart >= to) after.push(segment);
  }
  return fromSegments([...before, ...inserted, ...after]);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ INLINE_COMPONENTS, INLINE_MARKS, INLINE_OBJECT, fromSegments, inlineComponentSchemas, inlineComponentView, inlineLength, inlineText, isInlineComponent, marksIn, normalizeInline, objectAt, replaceRange, safeHref, setLink, sliceInline, toSegments, toggleMark });


/***/ },

/***/ "18b9c76994c9"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PARAMETER_DEFAULTS_FIELD: () => (/* binding */ PARAMETER_DEFAULTS_FIELD),
/* harmony export */   PARAMETER_SETS: () => (/* binding */ PARAMETER_SETS),
/* harmony export */   PARAMETER_SETS_FIELD: () => (/* binding */ PARAMETER_SETS_FIELD),
/* harmony export */   PARAMETER_SET_NAMES: () => (/* binding */ PARAMETER_SET_NAMES),
/* harmony export */   PARAMETER_SET_OWNER: () => (/* binding */ PARAMETER_SET_OWNER),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   effectiveProps: () => (/* binding */ effectiveProps),
/* harmony export */   expandParameterSets: () => (/* binding */ expandParameterSets),
/* harmony export */   parameterDefaultsOf: () => (/* binding */ parameterDefaultsOf),
/* harmony export */   parameterSetFields: () => (/* binding */ parameterSetFields),
/* harmony export */   parameterSetParts: () => (/* binding */ parameterSetParts),
/* harmony export */   parameterSetTable: () => (/* binding */ parameterSetTable),
/* harmony export */   parameterSetsOf: () => (/* binding */ parameterSetsOf),
/* harmony export */   validateParameterDefaults: () => (/* binding */ validateParameterDefaults),
/* harmony export */   validateParameterSets: () => (/* binding */ validateParameterSets),
/* harmony export */   withParameterSetFields: () => (/* binding */ withParameterSetFields)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
// Parameter sets: reusable groups of layout parameters a type manifest names
// instead of declaring them again (one block editor, 2026-11-03; ui-control
// control/ui-editor/UNIFIED-BLOCK-EDITOR.md, owner questions of the third
// review). Each set is props_schema properties with their SIMAI Framework
// utilities (x-simai-utility, utilities.mjs), the editor fields that set them
// and the inner elements (parts) a renderer draws for them.
//
// A type names its sets in `parameter_sets`; a registry (createRegistry,
// extendRegistry) adds their properties to the type's props_schema, so
// validation, the form and the output read them as the type's own. The stored
// manifest keeps only the names.
//
// Width is not one class on one element. Measured on the built sheet
// (2026-11-03): `.container` sets no inline margins, so a container is
// centred only with `m-inline-auto`; `max-container-N` widens a `.container`
// that is its descendant (`.max-container-N .container`, from the desktop
// breakpoint), never one on the same element; and `container max-w-prose` on
// one element is decided by which sheet comes later, which the Loader does
// not fix. So width reaches three elements: the block's own (wide:
// max-container-7), its `frame` part (the centred container) and its
// `content` part (the measure of a narrow block, around the slots).



const PARAMETER_SETS_FIELD = 'parameter_sets';
// The values a type prints when a node does not set them (type manifest
// 1.5.0, visual parity 2026-11-04): a section stands in the page container
// with space above and below unless the Document says otherwise. Keyed by a
// props_schema property that prints a utility (a set's or the type's own); a
// node's own value, scalar or per screen, replaces it whole.
const PARAMETER_DEFAULTS_FIELD = 'parameter_defaults';
const PARAMETER_SET_OWNER = 'simai/framework';

// A background is named by its role; the class is the role's container fill.
// accent (background 1.1.0, 2026-11-04) is the primary role's own fill with
// its on-primary text, as the accepted prototype draws an accent section: the
// text over it, and the dimmed text and icons the Framework draws in the
// on-surface roles, read on it (the composition sheet switches those roles
// inside it, as bg-surface-container switches on-surface-variant).
const BACKGROUND_CLASSES = {
  surface: 'bg-surface',
  container: 'bg-surface-container',
  primary: 'bg-primary-container',
  secondary: 'bg-secondary-container',
  tertiary: 'bg-tertiary-container',
  accent: 'bg-primary color-on-primary',
};
const BACKGROUNDS = Object.keys(BACKGROUND_CLASSES);
const step = (maximum) => ({ type: 'integer', minimum: 0, maximum });

/**
 * The sets, by name. `properties` join the type's props_schema; `parts` are
 * the inner elements a renderer must draw (`data-sf-composition-part`);
 * `fields` are editor manifest fields (key, kind and the field's own extras).
 */
const PARAMETER_SETS = Object.freeze({
  background: {
    version: '1.1.0',
    summary: 'The block\'s fill: a surface or container colour role.',
    properties: {
      background: { type: 'string', enum: BACKGROUNDS, 'x-simai-utility': { values: BACKGROUND_CLASSES } },
    },
    parts: [],
    fields: [{ key: 'background', kind: 'choice', choices: BACKGROUNDS }],
  },
  spacing: {
    version: '1.0.0',
    summary: 'Space inside the block, above and below, and at the sides, per screen.',
    properties: {
      padding_y: { ...step(8), 'x-simai-utility': { class: 'p-y-{value}', responsive: true } },
      padding_x: { ...step(8), 'x-simai-utility': { class: 'p-x-{value}', responsive: true } },
    },
    parts: [],
    fields: [{ key: 'padding_y', kind: 'integer' }, { key: 'padding_x', kind: 'integer' }],
  },
  width: {
    version: '1.0.0',
    summary: 'How wide the block\'s content stands: a text measure, the page container, a wider container or the full width.',
    properties: {
      // Without a width the block draws as it always did: no container, the
      // width of where it stands (full).
      width: {
        type: 'string',
        enum: ['narrow', 'normal', 'wide', 'full'],
        default: 'full',
        'x-simai-utility': [
          { values: { wide: 'max-container-7' } },
          { part: 'frame', values: { narrow: 'container m-inline-auto', normal: 'container m-inline-auto', wide: 'container m-inline-auto' } },
          { part: 'content', values: { narrow: 'max-w-prose m-inline-auto' } },
        ],
      },
    },
    parts: ['frame', 'content'],
    fields: [{ key: 'width', kind: 'choice', choices: ['narrow', 'normal', 'wide', 'full'], default: 'full' }],
  },
  grid: {
    version: '1.0.0',
    summary: 'The block\'s children in columns, with a gap, per screen.',
    properties: {
      columns: { type: 'integer', minimum: 1, maximum: 12, default: 1, 'x-simai-utility': { part: 'content', class: 'grid grid-col-{value}', responsive: true } },
      gap: { ...step(8), 'x-simai-utility': { part: 'content', class: 'gap-{value}', responsive: true } },
    },
    parts: ['content'],
    fields: [{ key: 'columns', kind: 'integer', default: 1 }, { key: 'gap', kind: 'integer', default: 4 }],
  },
  alignment: {
    version: '1.0.0',
    summary: 'How the block\'s text lines up, per screen.',
    properties: {
      align: { type: 'string', enum: ['start', 'center', 'end'], 'x-simai-utility': { class: 'text-{value}', responsive: true } },
    },
    parts: [],
    fields: [{ key: 'align', kind: 'choice', choices: ['start', 'center', 'end'] }],
  },
  breakout: {
    version: '1.0.0',
    summary: 'The block leaves its container and spans the page\'s width (container-breakout).',
    properties: {
      breakout: { type: 'boolean', default: false, 'x-simai-utility': { values: { true: 'container-breakout', false: '' } } },
    },
    parts: [],
    fields: [{ key: 'breakout', kind: 'toggle', default: false }],
  },
  visibility: {
    version: '1.0.0',
    summary: 'The block is hidden on the screens where it is set.',
    properties: {
      hidden: { type: 'boolean', default: false, 'x-simai-utility': { values: { true: 'hidden', false: 'block' }, responsive: true } },
    },
    parts: [],
    fields: [{ key: 'hidden', kind: 'toggle', default: false }],
  },
});

const PARAMETER_SET_NAMES = Object.freeze(Object.keys(PARAMETER_SETS));

/** The set names a type manifest takes, as stored (an empty list when none). */
function parameterSetsOf(manifest) {
  const names = manifest?.[PARAMETER_SETS_FIELD];
  return Array.isArray(names) ? names.filter((name) => typeof name === 'string') : [];
}

/** The values a type prints for the properties a node leaves unset (an empty object when none). */
function parameterDefaultsOf(manifest) {
  const defaults = manifest?.[PARAMETER_DEFAULTS_FIELD];
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(defaults) ? defaults : {};
}

/** A node's props with its type's parameter defaults under them: what the node prints. */
function effectiveProps(node, manifest) {
  const own = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node?.props) ? node.props : {};
  const defaults = parameterDefaultsOf(manifest);
  return Object.keys(defaults).length ? { ...defaults, ...own } : own;
}

/** The parts a type's renderer draws for its sets. */
function parameterSetParts(manifest) {
  return [...new Set(parameterSetsOf(manifest).flatMap((name) => PARAMETER_SETS[name]?.parts || []))];
}

/**
 * The type manifest with its sets' properties in props_schema (a copy; the
 * manifest itself is not touched). A property the type declares itself wins;
 * validateParameterSets reports the clash. Unknown names are left out.
 */
function expandParameterSets(manifest) {
  const names = parameterSetsOf(manifest);
  if (!names.length || !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest)) return manifest;
  const own = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest.props_schema?.properties) ? manifest.props_schema.properties : {};
  const added = {};
  for (const name of names) {
    for (const [key, schema] of Object.entries(PARAMETER_SETS[name]?.properties || {})) if (!(key in own) && !(key in added)) added[key] = schema;
  }
  if (!Object.keys(added).length) return manifest;
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({
    ...manifest,
    props_schema: {
      type: 'object',
      additionalProperties: false,
      ...manifest.props_schema,
      properties: { ...own, ...added },
    },
  });
}

/** The problems of a type's `parameter_sets`. */
function validateParameterSets(manifest) {
  const diagnostics = [];
  if (!(PARAMETER_SETS_FIELD in (manifest || {}))) return diagnostics;
  const names = manifest[PARAMETER_SETS_FIELD];
  const at = `$.${PARAMETER_SETS_FIELD}`;
  if (!Array.isArray(names)) return [{ code: 'parameter_sets_invalid', path: at, message: 'parameter_sets is a list of set names' }];
  const own = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest.props_schema?.properties) ? manifest.props_schema.properties : {};
  const taken = new Map();
  names.forEach((name, index) => {
    if (!Object.hasOwn(PARAMETER_SETS, name)) {
      diagnostics.push({ code: 'parameter_set_unknown', path: `${at}[${index}]`, message: `No parameter set ${String(name)}; the sets are ${PARAMETER_SET_NAMES.join(', ')}` });
      return;
    }
    if (names.indexOf(name) !== index) {
      diagnostics.push({ code: 'parameter_set_duplicate', path: `${at}[${index}]`, message: `${name} is named twice` });
      return;
    }
    for (const key of Object.keys(PARAMETER_SETS[name].properties)) {
      if (key in own) diagnostics.push({ code: 'parameter_set_conflict', path: `$.props_schema.properties.${key}`, message: `${key} is a parameter of the set ${name}; the type declares it too` });
      else if (taken.has(key) && taken.get(key) !== name) diagnostics.push({ code: 'parameter_set_conflict', path: `${at}[${index}]`, message: `${key} is in both ${taken.get(key)} and ${name}` });
      taken.set(key, name);
    }
  });
  if (manifest.mode === 'leaf' && parameterSetParts(manifest).length) {
    diagnostics.push({ code: 'parameter_set_parts_leaf', path: at, message: 'A set with parts (width, grid) arranges children: the type is composite' });
  }
  return diagnostics;
}

// The field's default: the type's parameter default when it gives one (its
// phone value when it differs per screen), else the set's.
function fieldDefault(field, defaults) {
  if (!Object.hasOwn(defaults, field.key)) return 'default' in field ? { default: field.default } : {};
  const value = defaults[field.key];
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) return { default: value };
  if ('xs' in value) return { default: value.xs };
  return 'default' in field ? { default: field.default } : {};
}

function setField(name, field, defaults = {}) {
  const property = field.kind === 'choice' ? { type: 'string', version: 2 }
    : field.kind === 'integer' ? { type: 'integer', version: 1 } : { type: 'boolean', version: 1 };
  const schema = PARAMETER_SETS[name].properties[field.key];
  const constraints = field.kind === 'integer' ? { min: schema.minimum, max: schema.maximum }
    : field.kind === 'choice' ? { min_length: 1, max_length: 32 } : {};
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)({
    key: field.key,
    plane: 'props',
    target: field.key,
    property,
    constraints,
    group: 'basic',
    visibility: 'visible',
    ...(field.choices ? { choices: field.choices } : {}),
    ...fieldDefault(field, defaults),
    label_key: `sf.composition.set_${name}.${field.key}`,
    help_key: `sf.composition.set_${name}.${field.key}_help`,
    capability_hints: [`composition.props.${field.key}`],
    permission_hints: ['composition.node.update'],
    owner: PARAMETER_SET_OWNER,
  });
}

/** The editor fields of a type's sets, in set order. */
function parameterSetFields(manifest) {
  const defaults = parameterDefaultsOf(manifest);
  return parameterSetsOf(manifest).filter((name) => Object.hasOwn(PARAMETER_SETS, name)).flatMap((name) => PARAMETER_SETS[name].fields.map((field) => setField(name, field, defaults)));
}

/**
 * An editor manifest with the fields of its type's sets added after its own;
 * a field the manifest already has for that target is kept as it is.
 */
function withParameterSetFields(editorManifest, typeManifest) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(editorManifest)) return editorManifest;
  const fields = Array.isArray(editorManifest.fields) ? editorManifest.fields : [];
  const have = new Set(fields.filter((field) => field?.plane === 'props').map((field) => field.target));
  const added = parameterSetFields(typeManifest).filter((field) => !have.has(field.target));
  return added.length ? { ...editorManifest, fields: [...fields, ...added] } : editorManifest;
}

/** The sets as a table for a host without JavaScript (composition-blocks.v1.json). */
function parameterSetTable() {
  return Object.fromEntries(Object.entries(PARAMETER_SETS).map(([name, { version, summary, properties, parts, fields }]) => [name, {
    version,
    summary,
    properties,
    parts,
    fields: fields.map((field) => setField(name, field)),
  }]));
}

/**
 * The problems of a type's `parameter_defaults`, read on the manifest with its
 * sets expanded: each key a property that prints a utility, each value one it
 * takes (`fits(value, schema)`), scalar or per screen.
 */
function validateParameterDefaults(manifest, fits = () => true) {
  if (!(PARAMETER_DEFAULTS_FIELD in (manifest || {}))) return [];
  const at = `$.${PARAMETER_DEFAULTS_FIELD}`;
  const defaults = manifest[PARAMETER_DEFAULTS_FIELD];
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(defaults)) return [{ code: 'parameter_defaults_invalid', path: at, message: 'parameter_defaults is an object of property values' }];
  const properties = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(expandParameterSets(manifest)?.props_schema?.properties) ? expandParameterSets(manifest).props_schema.properties : {};
  const diagnostics = [];
  for (const [key, value] of Object.entries(defaults)) {
    const schema = properties[key];
    if (!schema || !schema['x-simai-utility']) diagnostics.push({ code: 'parameter_default_unknown', path: `${at}.${key}`, message: `${key} is no property of the type that prints a utility` });
    else if (!fits(value, schema)) diagnostics.push({ code: 'parameter_default_invalid', path: `${at}.${key}`, message: `${key} does not take this value` });
  }
  return diagnostics;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ PARAMETER_SETS, expandParameterSets, parameterSetFields, validateParameterSets, withParameterSetFields });


/***/ },

/***/ "6770fb69bd04"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RECIPE_DEFAULT_LIMITS: () => (/* binding */ RECIPE_DEFAULT_LIMITS),
/* harmony export */   Recipe: () => (/* binding */ Recipe),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parseRecipeJson: () => (/* binding */ parseRecipeJson),
/* harmony export */   recipeDigest: () => (/* binding */ recipeDigest),
/* harmony export */   recipeNodeId: () => (/* binding */ recipeNodeId),
/* harmony export */   resolveRecipe: () => (/* binding */ resolveRecipe)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac24888e7d3e");



// Readers take either form of a format name (simai.composition.recipe.v1, or
// simai.composition.recipe with schema_version 1): schema-name.mjs. Writers
// emit the new form. The resolved Document and its dependency receipt take
// the form of the recipe they came from: a recipe in the older form resolves
// to a simai.composition.document.v1 Document and a
// simai.composition.dependencies.v1 receipt, as Recipe 1.0.1 fixes
// (fixtures/header-switch.json, whose expected Document, receipt and
// documentDigest are published bytes); a recipe named without a version
// resolves to a Document and a receipt named without one.
// The canonicalization profile has one algorithm under two names since Recipe
// 1.1.0: simai.recipe.canonical-json.v1 and simai.recipe.canonical-json. An
// execution contract may name either; the receipt keeps the name it was given,
// and the older one when none is, so the bytes Recipe 1.0.1 fixes stay as
// they were.
const CANONICALIZATION = 'simai.recipe.canonical-json.v1';
const CANONICALIZATION_NAMES = new Set([CANONICALIZATION, 'simai.recipe.canonical-json']);

function namedLike(recipe, name) {
  return (0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.readSchema)(recipe)?.form === 'name' ? (0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)(name, 1) : { schema: `${name}.v1` };
}

const documentSchemaFor = (recipe) => namedLike(recipe, 'simai.composition.document');
const SAFE_INTEGER_MIN = -9007199254740991;
const SAFE_INTEGER_MAX = 9007199254740991;

const RECIPE_DEFAULT_LIMITS = Object.freeze({
  maxRecipeBytes: 1048576,
  maxSourceBytes: 1048576,
  maxTotalSourceBytes: 8388608,
  maxInputBytes: 1048576,
  maxTotalInputBytes: 4194304,
  maxUniqueReferences: 128,
  maxInputs: 256,
  maxReferenceDepth: 16,
  maxExpansionSteps: 10000,
  maxIntermediateBytes: 4194304,
  maxOutputBytes: 1048576,
  maxOutputNodes: 2000,
  maxOutputDepth: 32,
  maxChildrenPerSlot: 500,
  maxSelectCases: 64,
});

const HARD_LIMITS = RECIPE_DEFAULT_LIMITS;
const ENTRY_FIELDS = {
  node: new Set(['id', 'node']),
  ref: new Set(['id', 'ref', 'params', 'slots', 'extensions']),
  select: new Set(['id', 'select']),
  insertSlot: new Set(['id', 'insertSlot']),
};
const NODE_FIELDS = new Set(['type', 'data', 'props', 'presentation', 'slots', 'bindings', 'extensions']);
const RECIPE_FIELDS = new Set(['schema', 'schema_version', 'id', 'profile', 'locale', 'inputs', 'root', 'extensions']);
const INPUT_ENVELOPE_FIELDS = new Set(['schema', 'schema_version', 'scope', 'values', 'extensions']);
const MANIFEST_FIELDS = new Set(['schema', 'schema_version', 'id', 'parameters', 'slots', 'body', 'extensions']);
const INPUT_DECLARATION_FIELDS = new Set(['kind', 'schema', 'default', 'expectedOrigin', 'extensions']);
const ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$/u;

function isObject(value) {
  if (!value || Object.prototype.toString.call(value) !== '[object Object]') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function utf8Size(value) {
  return new globalThis.TextEncoder().encode(typeof value === 'string' ? value : JSON.stringify(value)).byteLength;
}

function parseRecipeJson(text) {
  if (typeof text !== 'string' || text.charCodeAt(0) === 0xfeff) throw Object.assign(new SyntaxError('Invalid JSON input'), { code: 'invalid_json', sourcePath: '$' });
  let position = 0;
  const whitespace = () => { while (/\s/u.test(text[position] || '') && !['\u00a0'].includes(text[position])) position += 1; };
  const stringToken = () => {
    if (text[position] !== '"') throw new SyntaxError('Expected string');
    const start = position++;
    while (position < text.length) {
      const code = text.charCodeAt(position);
      if (code === 34) {
        position += 1;
        const value = JSON.parse(text.slice(start, position));
        for (let index = 0; index < value.length; index += 1) {
          const unit = value.charCodeAt(index);
          if (unit >= 0xd800 && unit <= 0xdbff) {
            const next = value.charCodeAt(index + 1);
            if (!(next >= 0xdc00 && next <= 0xdfff)) throw new SyntaxError('Unpaired surrogate');
            index += 1;
          } else if (unit >= 0xdc00 && unit <= 0xdfff) throw new SyntaxError('Unpaired surrogate');
        }
        return value;
      }
      if (code < 0x20) throw new SyntaxError('Control character in string');
      if (code === 92) {
        position += 1;
        if (text[position] === 'u') {
          if (!/^[0-9a-fA-F]{4}$/u.test(text.slice(position + 1, position + 5))) throw new SyntaxError('Invalid Unicode escape');
          position += 5;
          continue;
        }
        if (!/["\\/bfnrt]/u.test(text[position] || '')) throw new SyntaxError('Invalid escape');
      }
      position += 1;
    }
    throw new SyntaxError('Unterminated string');
  };
  const valueToken = () => {
    whitespace();
    if (text[position] === '{') {
      position += 1;
      whitespace();
      const keys = new Set();
      if (text[position] === '}') { position += 1; return; }
      while (position < text.length) {
        whitespace();
        const key = stringToken();
        if (keys.has(key)) throw new SyntaxError(`Duplicate key ${key}`);
        keys.add(key);
        whitespace();
        if (text[position++] !== ':') throw new SyntaxError('Expected colon');
        valueToken();
        whitespace();
        if (text[position] === '}') { position += 1; return; }
        if (text[position++] !== ',') throw new SyntaxError('Expected comma');
      }
      throw new SyntaxError('Unterminated object');
    }
    if (text[position] === '[') {
      position += 1;
      whitespace();
      if (text[position] === ']') { position += 1; return; }
      while (position < text.length) {
        valueToken();
        whitespace();
        if (text[position] === ']') { position += 1; return; }
        if (text[position++] !== ',') throw new SyntaxError('Expected comma');
      }
      throw new SyntaxError('Unterminated array');
    }
    if (text[position] === '"') { stringToken(); return; }
    const literal = /^(?:true|false|null|-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?)/u.exec(text.slice(position));
    if (!literal) throw new SyntaxError('Invalid JSON value');
    position += literal[0].length;
  };
  try {
    valueToken();
    whitespace();
    if (position !== text.length) throw new SyntaxError('Trailing JSON data');
    const value = JSON.parse(text);
    assertCanonicalValue(value);
    return value;
  } catch (error) {
    if (error?.code === 'invalid_value') throw error;
    throw Object.assign(new SyntaxError(error.message), { code: 'invalid_json', sourcePath: '$' });
  }
}

async function hashBytes(value) {
  if (!globalThis.crypto?.subtle) throw new Error('composition_crypto_unavailable');
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new globalThis.TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function recipeDigest(value) {
  assertCanonicalValue(value);
  return `sha256:${await hashBytes((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(value))}`;
}

async function recipeNodeId(recipeId, segments) {
  return `n-${await hashBytes((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(['sf-composition-node-v1', recipeId, segments]))}`;
}

function assertCanonicalValue(value, path = '$', seen = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value) || value < SAFE_INTEGER_MIN || value > SAFE_INTEGER_MAX) {
      throw Object.assign(new TypeError('invalid canonical number'), { code: 'invalid_value', sourcePath: path });
    }
    return;
  }
  if (typeof value !== 'object' || (!Array.isArray(value) && !isObject(value)) || seen.has(value)) {
    throw Object.assign(new TypeError('value is not canonical JSON'), { code: 'invalid_json', sourcePath: path });
  }
  seen.add(value);
  if (Array.isArray(value)) value.forEach((entry, index) => assertCanonicalValue(entry, `${path}/${index}`, seen));
  else Object.entries(value).forEach(([key, entry]) => {
    if (/^[0-9]+$/u.test(key) && Number(key) > 4294967294) {
      // It remains a normal string key; the check intentionally documents the boundary.
    }
    assertCanonicalValue(entry, `${path}/${key.replaceAll('~', '~0').replaceAll('/', '~1')}`, seen);
  });
  seen.delete(value);
}

function failure(code, sourcePath, message, referenceChain = []) {
  return { code, sourcePath, referenceChain: [...referenceChain], message };
}

function normalizeLimits(overrides = {}) {
  const limits = {};
  for (const [name, hardMaximum] of Object.entries(HARD_LIMITS)) {
    const value = overrides[name] ?? hardMaximum;
    if (!Number.isInteger(value) || value <= 0) {
      throw Object.assign(new RangeError(`Invalid limit ${name}`), { code: 'invalid_value', sourcePath: `/limits/${name}` });
    }
    if (value > hardMaximum) {
      throw Object.assign(new RangeError(`Limit ${name} exceeds the hard maximum`), { code: 'limit_exceeded', sourcePath: `/limits/${name}` });
    }
    limits[name] = value;
  }
  return limits;
}

function assertFields(value, allowed, path) {
  if (!isObject(value)) throw Object.assign(new TypeError('Expected object'), { code: 'invalid_value', sourcePath: path });
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) throw Object.assign(new TypeError(`Unknown field ${key}`), { code: 'unknown_field', sourcePath: `${path}/${key}` });
  }
}

function assertExtensions(extensions, path, supportedExtensions) {
  if (extensions === undefined) return;
  if (!isObject(extensions)) throw Object.assign(new TypeError('Extensions must be an object'), { code: 'invalid_value', sourcePath: path });
  for (const [name, value] of Object.entries(extensions)) {
    if (!/^[a-z][a-z0-9.-]*:[a-z][a-z0-9._-]*$/u.test(name)) throw Object.assign(new TypeError('Extension name must be namespaced'), { code: 'invalid_value', sourcePath: `${path}/${name}` });
    if (isObject(value) && value.required === true && !supportedExtensions.has(name)) throw Object.assign(new Error(`Required extension ${name} is unsupported`), { code: 'unsupported_extension', sourcePath: `${path}/${name}` });
  }
}

function assertValueExpression(expression, path) {
  if (!isObject(expression)) throw Object.assign(new TypeError('Value wrapper is required'), { code: 'invalid_value', sourcePath: path });
  const forms = ['literal', 'input', 'parameter'].filter((name) => Object.hasOwn(expression, name));
  if (forms.length !== 1 || Object.keys(expression).length !== 1) throw Object.assign(new TypeError('Value must have exactly one form'), { code: 'invalid_value', sourcePath: path });
  if (forms[0] !== 'literal' && !ID.test(expression[forms[0]] || '')) throw Object.assign(new TypeError('Value reference is invalid'), { code: 'invalid_value', sourcePath: path });
}

function entryKind(entry) {
  const kinds = ['node', 'ref', 'select', 'insertSlot'].filter((key) => Object.hasOwn(entry || {}, key));
  if (kinds.length !== 1) throw Object.assign(new TypeError('Entry must contain one form'), { code: 'invalid_value' });
  return kinds[0];
}

function validateEntrySyntax(entry, path, { insertionAllowed = false, localIds = new Set(), maxSelectCases = HARD_LIMITS.maxSelectCases, supportedExtensions = new Set() } = {}) {
  if (!isObject(entry) || !ID.test(entry.id || '')) throw Object.assign(new TypeError('Invalid entry id'), { code: 'invalid_value', sourcePath: `${path}/id` });
  const kind = entryKind(entry);
  if (kind === 'insertSlot' && !insertionAllowed) throw Object.assign(new TypeError('Insertion is only valid inside a slot'), { code: 'invalid_value', sourcePath: path });
  assertFields(entry, ENTRY_FIELDS[kind], path);
  if (localIds.has(entry.id)) throw Object.assign(new TypeError('Duplicate local id'), { code: 'duplicate_id', sourcePath: `${path}/id` });
  localIds.add(entry.id);
  if (kind === 'node') {
    assertFields(entry.node, NODE_FIELDS, `${path}/node`);
    if (!/^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/u.test(entry.node.type || '')) throw Object.assign(new TypeError('Node type is invalid'), { code: 'unknown_type', sourcePath: `${path}/node/type` });
    for (const [field, expressions] of Object.entries({ data: entry.node.data, props: entry.node.props, presentation: entry.node.presentation })) {
      for (const [name, expression] of Object.entries(expressions || {})) assertValueExpression(expression, `${path}/node/${field}/${name}`);
    }
    for (const [index, binding] of (entry.node.bindings || []).entries()) {
      assertFields(binding, new Set(['input', 'target']), `${path}/node/bindings/${index}`);
      if (!ID.test(binding.input || '') || !ID.test(binding.target || '')) throw Object.assign(new TypeError('Binding is invalid'), { code: 'invalid_value', sourcePath: `${path}/node/bindings/${index}` });
    }
    assertExtensions(entry.node.extensions, `${path}/node/extensions`, supportedExtensions);
    for (const [slot, children] of Object.entries(entry.node.slots || {})) {
      if (!Array.isArray(children)) throw Object.assign(new TypeError('Slot must be an array'), { code: 'invalid_value', sourcePath: `${path}/node/slots/${slot}` });
      children.forEach((child, index) => validateEntrySyntax(child, `${path}/node/slots/${slot}/${index}`, { insertionAllowed: true, localIds, maxSelectCases, supportedExtensions }));
    }
  } else if (kind === 'ref') {
    if (!isObject(entry.ref)) throw Object.assign(new TypeError('Reference is invalid'), { code: 'invalid_value', sourcePath: `${path}/ref` });
    const referenceFields = entry.ref.policy === 'pinned'
      ? new Set(['kind', 'owner', 'ref', 'policy', 'revision', 'extensions'])
      : new Set(['kind', 'owner', 'ref', 'policy', 'pointer', 'extensions']);
    assertFields(entry.ref, referenceFields, `${path}/ref`);
    if (!['template', 'fragment'].includes(entry.ref.kind) || !['pinned', 'follow-published'].includes(entry.ref.policy)) throw Object.assign(new TypeError('Reference kind or policy is invalid'), { code: 'invalid_value', sourcePath: `${path}/ref` });
    const selector = entry.ref.policy === 'pinned' ? entry.ref.revision : entry.ref.pointer;
    if (![entry.ref.owner, entry.ref.ref, selector].every((value) => typeof value === 'string' && value)) throw Object.assign(new TypeError('Reference identity is incomplete'), { code: 'invalid_value', sourcePath: `${path}/ref` });
    for (const [name, expression] of Object.entries(entry.params || {})) assertValueExpression(expression, `${path}/params/${name}`);
    assertExtensions(entry.ref.extensions, `${path}/ref/extensions`, supportedExtensions);
    assertExtensions(entry.extensions, `${path}/extensions`, supportedExtensions);
    for (const [slot, children] of Object.entries(entry.slots || {})) {
      if (!Array.isArray(children)) throw Object.assign(new TypeError('Slot must be an array'), { code: 'invalid_value', sourcePath: `${path}/slots/${slot}` });
      children.forEach((child, index) => validateEntrySyntax(child, `${path}/slots/${slot}/${index}`, { insertionAllowed: false, localIds, maxSelectCases, supportedExtensions }));
    }
  } else if (kind === 'select') {
    assertFields(entry.select, new Set(['value', 'cases', 'missingCase']), `${path}/select`);
    assertValueExpression(entry.select.value, `${path}/select/value`);
    const cases = entry.select?.cases;
    if (!isObject(cases) || Object.keys(cases).length === 0) throw Object.assign(new TypeError('Select needs cases'), { code: 'invalid_value', sourcePath: `${path}/select/cases` });
    if (Object.keys(cases).length > maxSelectCases) throw Object.assign(new RangeError('Select case limit exceeded'), { code: 'limit_exceeded', sourcePath: `${path}/select/cases` });
    if (entry.select.missingCase !== undefined && !Object.hasOwn(cases, entry.select.missingCase)) throw Object.assign(new TypeError('Missing case must name an existing case'), { code: 'invalid_value', sourcePath: `${path}/select/missingCase` });
    for (const [key, child] of Object.entries(cases)) validateEntrySyntax(child, `${path}/select/cases/${key}`, { localIds: new Set(), maxSelectCases, supportedExtensions });
  } else if (!ID.test(entry.insertSlot || '')) {
    throw Object.assign(new TypeError('Insertion slot is invalid'), { code: 'unknown_slot', sourcePath: `${path}/insertSlot` });
  }
  return kind;
}

function checkValue(value, schema, path) {
  const errors = [];
  const actual = value === null ? 'null' : Array.isArray(value) ? 'array' : Number.isInteger(value) ? 'integer' : typeof value;
  if (schema.type && schema.type !== actual) errors.push(`expected ${schema.type}`);
  if (schema.const !== undefined && (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(schema.const) !== (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(value)) errors.push('const mismatch');
  if (schema.enum && !schema.enum.some((item) => (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(item) === (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(value))) errors.push('enum mismatch');
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) errors.push('string too short');
    if (schema.maxLength !== undefined && value.length > schema.maxLength) errors.push('string too long');
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push('number too small');
    if (schema.maximum !== undefined && value > schema.maximum) errors.push('number too large');
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push('array too short');
    if (schema.maxItems !== undefined && value.length > schema.maxItems) errors.push('array too long');
    if (schema.items) value.forEach((item, index) => checkValue(item, schema.items, `${path}/${index}`));
  }
  if (isObject(value)) {
    for (const name of schema.required || []) if (!Object.hasOwn(value, name)) errors.push(`missing ${name}`);
    if (schema.additionalProperties === false) for (const name of Object.keys(value)) if (!Object.hasOwn(schema.properties || {}, name)) errors.push(`unknown ${name}`);
    for (const [name, child] of Object.entries(schema.properties || {})) if (Object.hasOwn(value, name)) checkValue(value[name], child, `${path}/${name}`);
  }
  if (errors.length) throw Object.assign(new TypeError(errors[0]), { code: 'invalid_value', sourcePath: path });
}

function copyExtensions(value) {
  return value === undefined ? undefined : clone(value);
}

async function resolveRecipe(recipe, context = {}) {
  const trace = [];
  const diagnostics = [];
  const referenceChain = [];
  try {
    const limits = normalizeLimits(context.limits);
    assertCanonicalValue(recipe);
    if (utf8Size(recipe) > limits.maxRecipeBytes) throw Object.assign(new RangeError('Recipe byte limit exceeded'), { code: 'limit_exceeded', sourcePath: '$' });
    if (!isObject(recipe) || !(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.isSchema)(recipe, 'simai.composition.recipe', 1)) throw Object.assign(new TypeError('Unsupported recipe schema'), { code: 'invalid_value', sourcePath: '/schema' });
    assertFields(recipe, RECIPE_FIELDS, '');
    if (!ID.test(recipe.id || '') || !['ui-layout', 'structured-content'].includes(recipe.profile)) throw Object.assign(new TypeError('Recipe identity or profile is invalid'), { code: 'invalid_value', sourcePath: '/' });
    const supportedExtensions = new Set(context.supportedExtensions || []);
    for (const [name, declaration] of Object.entries(recipe.inputs || {})) {
      assertFields(declaration, INPUT_DECLARATION_FIELDS, `/inputs/${name}`);
      if (!['parameter', 'setting', 'content'].includes(declaration.kind) || !isObject(declaration.schema)) throw Object.assign(new TypeError('Input declaration is invalid'), { code: 'invalid_value', sourcePath: `/inputs/${name}` });
      if (declaration.default) assertValueExpression(declaration.default, `/inputs/${name}/default`);
      if (declaration.default && !Object.hasOwn(declaration.default, 'literal')) throw Object.assign(new TypeError('Input default must be literal'), { code: 'invalid_value', sourcePath: `/inputs/${name}/default` });
      if (declaration.kind === 'content' && (!declaration.expectedOrigin?.owner || !declaration.expectedOrigin?.ref)) throw Object.assign(new TypeError('Content origin is required'), { code: 'input_origin_mismatch', sourcePath: `/inputs/${name}/expectedOrigin` });
      assertExtensions(declaration.extensions, `/inputs/${name}/extensions`, supportedExtensions);
    }
    assertExtensions(recipe.extensions, '/extensions', supportedExtensions);
    validateEntrySyntax(recipe.root, '/root', { localIds: new Set(), maxSelectCases: limits.maxSelectCases, supportedExtensions });
    if (Object.keys(recipe.inputs || {}).length > limits.maxInputs) throw Object.assign(new RangeError('Input limit exceeded'), { code: 'limit_exceeded', sourcePath: '/inputs' });
    const scope = context.trustedContext?.scope;
    if (typeof scope !== 'string' || !scope) throw Object.assign(new TypeError('Trusted scope is required'), { code: 'invalid_value', sourcePath: '/trustedContext/scope' });
    const inputsEnvelope = context.inputs || { ...(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.schemaFields)('simai.composition.inputs', 1), scope, values: {} };
    assertCanonicalValue(inputsEnvelope, '/inputs');
    assertFields(inputsEnvelope, INPUT_ENVELOPE_FIELDS, '/inputs');
    if (!(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.isSchema)(inputsEnvelope, 'simai.composition.inputs', 1) || inputsEnvelope.scope !== scope) throw Object.assign(new TypeError('Input scope mismatch'), { code: 'input_origin_mismatch', sourcePath: '/inputs' });

    const recipeHash = await recipeDigest(recipe);
    const limitsState = { steps: 0, sourceBytes: 0, inputBytes: 0, nodes: 0, intermediateBytes: 0 };
    const usedIds = new Set();
    const referenceCache = new Map();
    const inputCache = new Map();
    const references = [];
    const inputReceipts = [];
    const logicalPointers = [];

    const step = (sourcePath) => {
      limitsState.steps += 1;
      if (limitsState.steps > limits.maxExpansionSteps) throw Object.assign(new RangeError('Expansion step limit exceeded'), { code: 'limit_exceeded', sourcePath });
    };

    const readInput = async (name, sourcePath) => {
      step(sourcePath);
      if (inputCache.has(name)) return inputCache.get(name);
      const declaration = recipe.inputs?.[name];
      if (!declaration) throw Object.assign(new TypeError(`Unknown input ${name}`), { code: 'missing_input', sourcePath });
      trace.push({ operation: 'read-input', name, sourcePath });
      let supplied = inputsEnvelope.values?.[name];
      if (supplied === undefined && context.ports?.readInput) supplied = await context.ports.readInput(name, declaration, { scope });
      if (supplied?.status === 'denied') throw Object.assign(new Error('Input access denied'), { code: 'access_denied', sourcePath });
      if (supplied?.status === 'error') throw Object.assign(new Error('Input source failed'), { code: 'source_error', sourcePath });
      let result;
      if (supplied === undefined || supplied?.status === 'missing') {
        if (!declaration.default) throw Object.assign(new Error(`Input ${name} is missing`), { code: 'missing_input', sourcePath });
        const value = clone(declaration.default.literal);
        checkValue(value, declaration.schema, sourcePath);
        const valueDigest = await recipeDigest(value);
        const missingSource = supplied?.missingSource || (declaration.kind === 'parameter' ? undefined : { scope, owner: declaration.expectedOrigin?.owner, ref: declaration.expectedOrigin?.ref });
        if (declaration.kind !== 'parameter' && (!missingSource?.owner || !missingSource?.ref)) throw Object.assign(new Error('Missing source identity is required'), { code: 'input_origin_mismatch', sourcePath });
        result = { value, receipt: { name, kind: declaration.kind, valueDigest, ...(missingSource ? { missingSource } : {}), resolution: 'default' } };
      } else {
        limitsState.inputBytes += utf8Size(supplied);
        if (utf8Size(supplied) > limits.maxInputBytes || limitsState.inputBytes > limits.maxTotalInputBytes) throw Object.assign(new RangeError('Input byte limit exceeded'), { code: 'limit_exceeded', sourcePath });
        if (supplied.kind !== declaration.kind) throw Object.assign(new Error('Input kind mismatch'), { code: 'input_origin_mismatch', sourcePath });
        checkValue(supplied.value, declaration.schema, sourcePath);
        const valueDigest = await recipeDigest(supplied.value);
        if (valueDigest !== supplied.valueDigest) throw Object.assign(new Error('Input digest mismatch'), { code: 'input_digest_mismatch', sourcePath });
        const expected = declaration.expectedOrigin;
        if (declaration.kind !== 'parameter') {
          if (!supplied.origin || supplied.origin.scope !== scope || expected?.owner !== supplied.origin.owner || expected?.ref !== supplied.origin.ref || (expected?.revision && expected.revision !== supplied.origin.revision)) {
            throw Object.assign(new Error('Input origin mismatch'), { code: 'input_origin_mismatch', sourcePath });
          }
        }
        result = { value: clone(supplied.value), receipt: { name, kind: declaration.kind, valueDigest, ...(supplied.origin ? { origin: clone(supplied.origin) } : {}), resolution: 'provided' } };
      }
      inputCache.set(name, result);
      inputReceipts.push(result.receipt);
      return result;
    };

    const resolveValue = async (expression, parameters, sourcePath) => {
      step(sourcePath);
      if (!isObject(expression)) throw Object.assign(new TypeError('Value wrapper is required'), { code: 'invalid_value', sourcePath });
      if (Object.hasOwn(expression, 'literal')) return clone(expression.literal);
      if (Object.hasOwn(expression, 'input')) return (await readInput(expression.input, sourcePath)).value;
      if (Object.hasOwn(expression, 'parameter')) {
        if (!parameters.has(expression.parameter)) throw Object.assign(new Error(`Parameter ${expression.parameter} is missing`), { code: 'unknown_parameter', sourcePath });
        return clone(parameters.get(expression.parameter));
      }
      throw Object.assign(new TypeError('Unknown value wrapper'), { code: 'invalid_value', sourcePath });
    };

    const readReference = async (reference, sourcePath) => {
      step(sourcePath);
      const revisionKey = reference.policy === 'pinned' ? reference.revision : `pointer:${reference.pointer}`;
      const cacheKey = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)([scope, reference.kind, reference.owner, reference.ref, revisionKey]);
      if (referenceCache.has(cacheKey)) return referenceCache.get(cacheKey);
      if (referenceCache.size >= limits.maxUniqueReferences) throw Object.assign(new RangeError('Reference limit exceeded'), { code: 'limit_exceeded', sourcePath });
      if (!context.ports?.readReference) throw Object.assign(new Error('Reference port is unavailable'), { code: 'missing_reference', sourcePath });
      trace.push({ operation: 'read-reference', kind: reference.kind, owner: reference.owner, ref: reference.ref, revision: reference.revision, pointer: reference.pointer, sourcePath });
      const response = await context.ports.readReference(reference, { scope, maxBytes: limits.maxSourceBytes });
      if (response?.status === 'denied') throw Object.assign(new Error('Reference access denied'), { code: 'access_denied', sourcePath });
      if (response?.status === 'error') throw Object.assign(new Error('Reference source failed'), { code: 'source_error', sourcePath });
      if (!response?.source) throw Object.assign(new Error('Reference not found'), { code: 'missing_reference', sourcePath });
      const revision = response.revision;
      if (reference.policy === 'pinned' && revision !== reference.revision) throw Object.assign(new Error('Reference revision mismatch'), { code: 'revision_mismatch', sourcePath });
      const bytes = utf8Size(response.source);
      limitsState.sourceBytes += bytes;
      if (bytes > limits.maxSourceBytes || limitsState.sourceBytes > limits.maxTotalSourceBytes) throw Object.assign(new RangeError('Source byte limit exceeded'), { code: 'limit_exceeded', sourcePath });
      const digest = await recipeDigest(response.source);
      if (response.digest && response.digest !== digest) throw Object.assign(new Error('Reference digest mismatch'), { code: 'revision_mismatch', sourcePath });
      const result = { source: clone(response.source), revision, digest };
      referenceCache.set(cacheKey, result);
      references.push({ kind: reference.kind, owner: reference.owner, ref: reference.ref, revision, digest, scope });
      if (reference.policy === 'follow-published') logicalPointers.push({ kind: reference.kind, owner: reference.owner, ref: reference.ref, pointer: reference.pointer, generation: response.generation, resolvedRevision: revision, scope });
      return result;
    };

    const expand = async (entry, state, sourcePath) => {
      step(sourcePath);
      const kind = entryKind(entry);
      if (kind === 'select') {
        const selected = await resolveValue(entry.select.value, state.parameters, `${sourcePath}/select/value`);
        if (typeof selected !== 'string') throw Object.assign(new Error('Select value must be a string'), { code: 'invalid_value', sourcePath: `${sourcePath}/select/value` });
        let caseName = String(selected);
        if (!Object.hasOwn(entry.select.cases, caseName)) caseName = entry.select.missingCase;
        if (!caseName || !Object.hasOwn(entry.select.cases, caseName)) throw Object.assign(new Error('Select value has no case'), { code: 'invalid_value', sourcePath });
        return expand(entry.select.cases[caseName], { ...state, segments: [...state.segments, ['select', entry.id], ['case', caseName]] }, `${sourcePath}/select/cases/${caseName}`);
      }
      if (kind === 'insertSlot') {
        const entries = state.callSlots?.[entry.insertSlot] ?? state.slotDefaults?.[entry.insertSlot] ?? [];
        const output = [];
        for (let index = 0; index < entries.length; index += 1) {
          output.push(await expand(entries[index], { ...state, segments: [...state.segments, ['insertion', entry.id], ['argument-slot', entry.insertSlot]] }, `${sourcePath}/inserted/${entry.insertSlot}/${index}`));
        }
        const expanded = output.flat();
        const slot = state.slotSpecs?.[entry.insertSlot];
        if (!slot) throw Object.assign(new Error(`Unknown insertion slot ${entry.insertSlot}`), { code: 'unknown_slot', sourcePath });
        if (expanded.length < slot.min || expanded.length > slot.max) throw Object.assign(new Error(`Slot ${entry.insertSlot} has invalid cardinality`), { code: 'invalid_value', sourcePath });
        if (slot.types?.length && expanded.some((node) => !slot.types.includes(node.type))) throw Object.assign(new Error(`Slot ${entry.insertSlot} contains a forbidden type`), { code: 'unknown_type', sourcePath });
        state.usedCallSlots?.add(entry.insertSlot);
        return expanded;
      }
      if (kind === 'ref') {
        if (referenceChain.length >= limits.maxReferenceDepth) throw Object.assign(new RangeError('Reference depth exceeded'), { code: 'limit_exceeded', sourcePath });
        const refKey = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)([scope, entry.ref.kind, entry.ref.owner, entry.ref.ref, entry.ref.revision || entry.ref.pointer]);
        if (referenceChain.includes(refKey)) throw Object.assign(new Error('Reference cycle'), { code: 'reference_cycle', sourcePath });
        const resolved = await readReference(entry.ref, sourcePath);
        referenceChain.push(refKey);
        try {
          if (entry.ref.kind === 'fragment') {
            if (entry.params || entry.slots) throw Object.assign(new Error('Fragment cannot receive parameters or slots'), { code: 'invalid_value', sourcePath });
            validateEntrySyntax(resolved.source, `${sourcePath}/source`, { localIds: new Set(), maxSelectCases: limits.maxSelectCases, supportedExtensions });
            return await expand(resolved.source, { ...state, segments: [...state.segments, ['placement', entry.id]] }, `${sourcePath}/source`);
          }
          if (!(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.isSchema)(resolved.source, 'simai.composition.recipe-manifest', 1)) throw Object.assign(new Error('Template manifest is invalid'), { code: 'invalid_value', sourcePath });
          assertFields(resolved.source, MANIFEST_FIELDS, `${sourcePath}/source`);
          assertExtensions(resolved.source.extensions, `${sourcePath}/source/extensions`, supportedExtensions);
          validateEntrySyntax(resolved.source.body, `${sourcePath}/source/body`, { localIds: new Set(), maxSelectCases: limits.maxSelectCases, supportedExtensions });
          const parameters = new Map();
          for (const [name, schema] of Object.entries(resolved.source.parameters || {})) {
            const expression = entry.params?.[name] ?? schema.default;
            if (!expression) throw Object.assign(new Error(`Parameter ${name} is missing`), { code: 'unknown_parameter', sourcePath });
            const value = await resolveValue(expression, state.parameters, `${sourcePath}/params/${name}`);
            checkValue(value, schema, `${sourcePath}/params/${name}`);
            parameters.set(name, value);
          }
          for (const name of Object.keys(entry.params || {})) if (!Object.hasOwn(resolved.source.parameters || {}, name)) throw Object.assign(new Error(`Unknown parameter ${name}`), { code: 'unknown_parameter', sourcePath: `${sourcePath}/params/${name}` });
          for (const name of Object.keys(entry.slots || {})) if (!Object.hasOwn(resolved.source.slots || {}, name)) throw Object.assign(new Error(`Unknown slot ${name}`), { code: 'unknown_slot', sourcePath: `${sourcePath}/slots/${name}` });
          const defaults = Object.fromEntries(Object.entries(resolved.source.slots || {}).map(([name, spec]) => [name, spec.defaults || []]));
          for (const [name, spec] of Object.entries(resolved.source.slots || {})) {
            assertFields(spec, new Set(['min', 'max', 'types', 'defaults']), `${sourcePath}/source/slots/${name}`);
            if (!Number.isInteger(spec.min) || !Number.isInteger(spec.max) || spec.min < 0 || spec.max > limits.maxChildrenPerSlot || spec.min > spec.max) throw Object.assign(new Error(`Slot ${name} has invalid limits`), { code: 'invalid_value', sourcePath });
          }
          const usedCallSlots = new Set();
          const expanded = await expand(resolved.source.body, { ...state, parameters, callSlots: entry.slots || {}, slotDefaults: defaults, slotSpecs: resolved.source.slots || {}, usedCallSlots, segments: [...state.segments, ['placement', entry.id]] }, `${sourcePath}/source/body`);
          for (const name of Object.keys(entry.slots || {})) if (!usedCallSlots.has(name)) throw Object.assign(new Error(`Slot ${name} was not inserted`), { code: 'unknown_slot', sourcePath: `${sourcePath}/slots/${name}` });
          return expanded;
        } catch (error) {
          if (!error.referenceChain) error.referenceChain = [...referenceChain];
          throw error;
        } finally {
          referenceChain.pop();
        }
      }

      const nodePath = [...state.segments, ['node', entry.id]];
      const node = { id: await recipeNodeId(recipe.id, nodePath), type: entry.node.type };
      if (usedIds.has(node.id)) throw Object.assign(new Error('Duplicate resolved identity'), { code: 'duplicate_id', sourcePath });
      usedIds.add(node.id);
      for (const field of ['data', 'props']) {
        if (entry.node[field]) {
          node[field] = {};
          for (const [name, expression] of Object.entries(entry.node[field])) node[field][name] = await resolveValue(expression, state.parameters, `${sourcePath}/node/${field}/${name}`);
        }
      }
      if (entry.node.presentation) {
        node.presentation = {};
        for (const [name, expression] of Object.entries(entry.node.presentation)) node.presentation[name] = await resolveValue(expression, state.parameters, `${sourcePath}/node/presentation/${name}`);
      }
      if (entry.node.bindings) {
        node.bindings = [];
        for (const binding of entry.node.bindings) {
          const declaration = recipe.inputs?.[binding.input];
          if (declaration?.kind !== 'content' || !entry.node.data?.[binding.target] || entry.node.data[binding.target].input !== binding.input) throw Object.assign(new Error('Binding must match content data input'), { code: 'invalid_value', sourcePath });
          const input = await readInput(binding.input, `${sourcePath}/node/bindings/${binding.target}`);
          node.bindings.push({ owner: input.receipt.origin.owner, ref: input.receipt.origin.ref, target: binding.target, revision: input.receipt.origin.revision });
        }
      }
      if (entry.node.extensions) node.extensions = copyExtensions(entry.node.extensions);
      if (entry.node.slots) {
        node.slots = {};
        for (const [slotName, entries] of Object.entries(entry.node.slots)) {
          const children = [];
          for (let index = 0; index < entries.length; index += 1) children.push(await expand(entries[index], { ...state, segments: [...nodePath, ['slot', slotName]] }, `${sourcePath}/node/slots/${slotName}/${index}`));
          node.slots[slotName] = children.flat();
          if (node.slots[slotName].length > limits.maxChildrenPerSlot) throw Object.assign(new RangeError('Slot child limit exceeded'), { code: 'limit_exceeded', sourcePath });
        }
      }
      limitsState.nodes += 1;
      if (limitsState.nodes > limits.maxOutputNodes) throw Object.assign(new RangeError('Output node limit exceeded'), { code: 'limit_exceeded', sourcePath });
      limitsState.intermediateBytes += utf8Size(node);
      if (limitsState.intermediateBytes > limits.maxIntermediateBytes) throw Object.assign(new RangeError('Intermediate byte limit exceeded'), { code: 'limit_exceeded', sourcePath });
      return node;
    };

    const root = await expand(recipe.root, { parameters: new Map(), callSlots: {}, slotDefaults: {}, segments: [] }, '/root');
    if (Array.isArray(root)) throw Object.assign(new Error('Root must resolve to one node'), { code: 'invalid_resolved_document', sourcePath: '/root' });
    const document = { ...documentSchemaFor(recipe), id: recipe.id, profile: recipe.profile, ...(recipe.locale ? { locale: recipe.locale } : {}), root };
    const outputDepth = (node) => 1 + Math.max(0, ...Object.values(node.slots || {}).flat().map(outputDepth));
    if (outputDepth(root) > limits.maxOutputDepth) throw Object.assign(new RangeError('Output depth limit exceeded'), { code: 'limit_exceeded', sourcePath: '/root' });
    const outputBytes = utf8Size(document);
    if (outputBytes > limits.maxOutputBytes) throw Object.assign(new RangeError('Output byte limit exceeded'), { code: 'limit_exceeded', sourcePath: '/root' });
    const { normalize } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "32dfc4431a24"));
    const normalized = await normalize(document, context.registry, { limits: { maxDocumentBytes: limits.maxOutputBytes, maxDepth: limits.maxOutputDepth, maxNodes: limits.maxOutputNodes, maxChildrenPerSlot: limits.maxChildrenPerSlot }, supportedExtensions: context.supportedExtensions, ports: context.compositionPorts });
    if (!normalized.document) throw Object.assign(new Error('Resolved document is invalid'), { code: 'invalid_resolved_document', sourcePath: '/root', details: normalized.diagnostics });
    const executionContract = context.executionContract;
    if (!executionContract?.contractDigest || !executionContract?.registryDigest || !executionContract?.rendererDigest) throw Object.assign(new Error('Execution contract is required'), { code: 'invalid_value', sourcePath: '/executionContract' });
    const canonicalization = executionContract.canonicalization ?? CANONICALIZATION;
    if (!CANONICALIZATION_NAMES.has(canonicalization)) throw Object.assign(new Error('Unsupported canonicalization profile'), { code: 'incompatible_profile', sourcePath: '/executionContract/canonicalization' });
    const dependencyReceipt = {
      ...namedLike(recipe, 'simai.composition.dependencies'),
      scope,
      recipeDigest: recipeHash,
      documentDigest: `sha256:${normalized.digest}`,
      references,
      inputs: inputReceipts,
      logicalPointers,
      executionContract: { ...clone(executionContract), canonicalization },
    };
    return { document: normalized.document, dependencyReceipt, trace, diagnostics };
  } catch (error) {
    diagnostics.push(failure(error.code || 'source_error', error.sourcePath || '$', error.message || 'Recipe resolution failed', error.referenceChain || referenceChain));
    if (error.details) diagnostics.push(...error.details.map((entry) => ({ ...entry, sourcePath: entry.path || error.sourcePath || '$' })));
    return { document: null, dependencyReceipt: null, trace, diagnostics };
  }
}

const Recipe = Object.freeze({
  defaultLimits: RECIPE_DEFAULT_LIMITS,
  digest: recipeDigest,
  nodeId: recipeNodeId,
  parseJson: parseRecipeJson,
  resolve: resolveRecipe,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recipe);


/***/ },

/***/ "68efac8c1b57"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REGION_ACCEPTS: () => (/* binding */ REGION_ACCEPTS),
/* harmony export */   REGION_ELEMENTS: () => (/* binding */ REGION_ELEMENTS),
/* harmony export */   REGION_LANDMARKS: () => (/* binding */ REGION_LANDMARKS),
/* harmony export */   REGION_LIMITS: () => (/* binding */ REGION_LIMITS),
/* harmony export */   REGION_PLACEMENTS: () => (/* binding */ REGION_PLACEMENTS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   describeRegions: () => (/* binding */ describeRegions),
/* harmony export */   validateRegionRules: () => (/* binding */ validateRegionRules)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");


// Declared-region layout rules. Region names are chosen by the document author;
// Framework owns only landmark semantics, placement, cardinality and nesting.
const REGION_LANDMARKS = Object.freeze(['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region', 'none']);
const REGION_PLACEMENTS = Object.freeze(['block', 'start', 'center', 'end']);
const REGION_ACCEPTS = Object.freeze(['layout', 'content', 'smart']);
const REGION_LIMITS = Object.freeze({ maxRegionsPerLayout: 12, maxRegionLayoutNesting: 4 });
const REGION_ELEMENTS = Object.freeze({
  banner: 'header',
  navigation: 'nav',
  main: 'main',
  complementary: 'aside',
  contentinfo: 'footer',
  region: 'section',
  none: 'div',
});

const DOCUMENT_LEVEL_LANDMARKS = new Set(['banner', 'main', 'contentinfo']);
const PLACEMENT_RANK = { start: 0, center: 1, end: 2 };

const diagnostic = (code, path, message) => ({ code, path, message });

function landmarkOf(node) {
  return node?.type === 'layout.region' && typeof node.props?.landmark === 'string' ? node.props.landmark : null;
}

function validateRegionList(node, path, diagnostics) {
  const regions = Array.isArray(node.slots?.regions) ? node.slots.regions : [];
  const names = new Set();
  let bandRank = -1;
  regions.forEach((region, index) => {
    const regionPath = `${path}.slots.regions[${index}]`;
    if (region?.type !== 'layout.region') return;
    const name = region.props?.name;
    if (typeof name === 'string') {
      if (names.has(name)) diagnostics.push(diagnostic('region_name_duplicate', `${regionPath}.props.name`, `Region ${name} is declared twice in one layout`));
      names.add(name);
    }
    const placement = region.props?.placement ?? 'block';
    if (placement === 'block') {
      bandRank = -1;
      return;
    }
    const rank = PLACEMENT_RANK[placement];
    if (rank === undefined) return;
    if (rank < bandRank) diagnostics.push(diagnostic('region_order_invalid', `${regionPath}.props.placement`, 'Side-by-side regions must be declared in start, center, end order'));
    bandRank = Math.max(bandRank, rank);
  });
}

function validateRegionNode(node, path, context, diagnostics) {
  const props = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.props) ? node.props : {};
  const landmark = landmarkOf(node);
  if (landmark && DOCUMENT_LEVEL_LANDMARKS.has(landmark) && (context.insideLandmark || context.insidePage)) {
    diagnostics.push(diagnostic('region_landmark_context', `${path}.props.landmark`, `${landmark} is only allowed outside other landmarks and layout.page`));
  }
  if (landmark === 'region' && props.label === undefined) {
    diagnostics.push(diagnostic('region_label_required', `${path}.props.label`, 'A region landmark requires an accessible label'));
  }
  if (landmark === 'none' && props.label !== undefined) {
    diagnostics.push(diagnostic('region_label_forbidden', `${path}.props.label`, 'A region without a landmark cannot carry an accessible label'));
  }
  const children = Array.isArray(node.slots?.default) ? node.slots.default : [];
  const min = Number.isInteger(props.min_items) ? props.min_items : 0;
  const max = Number.isInteger(props.max_items) ? props.max_items : 500;
  if (min > max) diagnostics.push(diagnostic('region_bounds_invalid', `${path}.props`, 'min_items must not exceed max_items'));
  else if (children.length < min || children.length > max) diagnostics.push(diagnostic('region_cardinality', `${path}.slots.default`, 'Region child count is outside its declared range'));
  if (Array.isArray(props.accepts)) {
    const accepted = new Set(props.accepts);
    children.forEach((child, index) => {
      const manifest = context.registry.types.get(child?.type);
      if (manifest && !accepted.has(manifest.category)) {
        diagnostics.push(diagnostic('region_child_category_forbidden', `${path}.slots.default[${index}]`, `${manifest.category} is not accepted by this region`));
      }
    });
  }
}

/**
 * Applies declared-region rules to a structurally valid Document root.
 * The generic validator has already checked manifests, props and slot types.
 */
function validateRegionRules(root, registry, diagnostics) {
  const landmarkUse = new Map();
  const visit = (node, path, context) => {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node)) return;
    if (node.type === 'layout.region' && context.parentType !== 'layout.regions') {
      diagnostics.push(diagnostic('region_parent_invalid', path, 'layout.region must be a direct child of layout.regions'));
    }
    let next = { ...context, parentType: node.type };
    if (node.type === 'layout.page') next.insidePage = true;
    if (node.type === 'layout.regions') {
      next.regionDepth = context.regionDepth + 1;
      if (next.regionDepth > REGION_LIMITS.maxRegionLayoutNesting) diagnostics.push(diagnostic('region_nesting_limit', path, 'Region layouts are nested too deeply'));
      validateRegionList(node, path, diagnostics);
    }
    if (node.type === 'layout.region') {
      validateRegionNode(node, path, { ...context, registry }, diagnostics);
      const landmark = landmarkOf(node);
      if (landmark && landmark !== 'none') {
        if (!landmarkUse.has(landmark)) landmarkUse.set(landmark, []);
        landmarkUse.get(landmark).push({ path, label: node.props?.label });
        next = { ...next, insideLandmark: true };
      }
    }
    for (const [slotName, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.slots) ? node.slots : {})) {
      if (!Array.isArray(children)) continue;
      children.forEach((child, index) => visit(child, `${path}.slots.${slotName}[${index}]`, next));
    }
  };
  visit(root, '$.root', { parentType: null, insidePage: false, insideLandmark: false, regionDepth: 0 });
  for (const [landmark, uses] of landmarkUse) {
    if (landmark === 'main' && uses.length > 1) {
      for (const use of uses.slice(1)) diagnostics.push(diagnostic('region_landmark_duplicate', `${use.path}.props.landmark`, 'A document can contain only one main region'));
      continue;
    }
    if (uses.length < 2) continue;
    const labels = new Set();
    for (const use of uses) {
      if (use.label === undefined) {
        // A region landmark without a label is already reported once above.
        if (landmark !== 'region') diagnostics.push(diagnostic('region_label_required', `${use.path}.props.label`, `Repeated ${landmark} regions require distinct labels`));
        continue;
      }
      if (labels.has(use.label)) diagnostics.push(diagnostic('region_label_duplicate', `${use.path}.props.label`, `Repeated ${landmark} regions require distinct labels`));
      else labels.add(use.label);
    }
  }
}

async function sha256(value) {
  const bytes = new globalThis.TextEncoder().encode(value);
  const hash = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Lists every declared region of an already normalized Document with a
 * digest of its canonical subtree. Products use the digest to invalidate only
 * outputs that depend on a changed region; the list order is document order.
 */
async function describeRegions(document) {
  const regions = [];
  const visit = async (node, path, layout) => {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node)) return;
    if (node.type === 'layout.region' && layout) {
      const props = node.props || {};
      regions.push({
        layout,
        node: node.id,
        name: props.name,
        landmark: props.landmark,
        placement: props.placement ?? 'block',
        path,
        digest: `sha256:${await sha256((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)(node)))}`,
      });
    }
    const nextLayout = node.type === 'layout.regions' ? node.id : null;
    for (const [slotName, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.slots) ? node.slots : {})) {
      if (!Array.isArray(children)) continue;
      for (let index = 0; index < children.length; index += 1) await visit(children[index], `${path}.slots.${slotName}[${index}]`, nextLayout);
    }
  };
  await visit(document?.root, '$.root', null);
  return regions;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ describeRegions, validateRegionRules });


/***/ },

/***/ "4aea5d6d49c7"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositionRouteController: () => (/* binding */ CompositionRouteController),
/* harmony export */   ENDPOINT_EXTENSION: () => (/* binding */ ENDPOINT_EXTENSION),
/* harmony export */   PORT_ELEMENT_ALIASES: () => (/* binding */ PORT_ELEMENT_ALIASES),
/* harmony export */   PORT_OUTPUT_EVENT: () => (/* binding */ PORT_OUTPUT_EVENT),
/* harmony export */   ROUTE_STATE_EVENT: () => (/* binding */ ROUTE_STATE_EVENT),
/* harmony export */   ROUTING_LIMITS: () => (/* binding */ ROUTING_LIMITS),
/* harmony export */   VALUE_TYPES: () => (/* binding */ VALUE_TYPES),
/* harmony export */   checkPortValue: () => (/* binding */ checkPortValue),
/* harmony export */   createPortRegistry: () => (/* binding */ createPortRegistry),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defineCompositionScope: () => (/* binding */ defineCompositionScope),
/* harmony export */   endpointName: () => (/* binding */ endpointName),
/* harmony export */   parseRoutesAttribute: () => (/* binding */ parseRoutesAttribute),
/* harmony export */   portManifestFor: () => (/* binding */ portManifestFor),
/* harmony export */   portsForType: () => (/* binding */ portsForType),
/* harmony export */   resolveRoutes: () => (/* binding */ resolveRoutes),
/* harmony export */   routesAttribute: () => (/* binding */ routesAttribute),
/* harmony export */   sameValueType: () => (/* binding */ sameValueType),
/* harmony export */   valueTypeEntry: () => (/* binding */ valueTypeEntry),
/* harmony export */   valueTypeName: () => (/* binding */ valueTypeName)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac24888e7d3e");



// Generic cross-composite routing. A layout.scope node is the common parent
// that declares typed routes between endpoint descendants. Routes name only
// endpoints and published ports; they never carry endpoints, methods, actions,
// expressions or transformations. Products keep data access and authorization.

const ENDPOINT_EXTENSION = 'simai.composition:endpoint';
const PORT_OUTPUT_EVENT = 'sf-port-output';
const ROUTE_STATE_EVENT = 'sf-composition-route-state';
const ROUTING_LIMITS = Object.freeze({
  maxRoutesPerScope: 32,
  maxEndpointsPerScope: 64,
  maxFanOut: 8,
  maxScopeNesting: 4,
  maxReentrancy: 8,
  maxValueBytes: 65536,
});

const NAME_PATTERN = /^[a-z][a-z0-9-]{0,31}$/u;
const ROUTE_ID_PATTERN = /^[a-z][a-z0-9-]{0,63}$/u;
const CONTROL = /[\u0000-\u001f\u007f]/u;

const diagnostic = (code, path, message) => ({ code, path, message });

function checkedRecordId(value) {
  if (typeof value === 'string') return value.length > 0 && value.length <= 256 && !CONTROL.test(value);
  return Number.isSafeInteger(value);
}

function freezeList(list) {
  return Object.freeze([...list]);
}

// The page-level value types (interface fragments, 2026-10-15) are closed
// objects: a key a type does not name is refused, never carried through.
function closedObject(value, required, optional, type) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) throw new TypeError(`${type} value is not an object`);
  const keys = Object.keys(value);
  if (!required.every((key) => keys.includes(key))) throw new TypeError(`${type} value misses a required key`);
  if (!keys.every((key) => required.includes(key) || optional.includes(key))) throw new TypeError(`${type} value has an undeclared key`);
}

const TOKEN = /^[a-z][a-z0-9._:-]{0,127}$/u;
const isToken = (value) => typeof value === 'string' && TOKEN.test(value);
const isCollection = (value) => typeof value === 'string' && value.length > 0 && value.length <= 128 && !CONTROL.test(value);
const isRevision = (value) => (typeof value === 'string' && value.length > 0 && value.length <= 128 && !CONTROL.test(value)) || Number.isSafeInteger(value);
const PREFERENCE_KEY = /^[\w.*:-]+(?:\/[\w.*:/-]+)?$/u;
// An address inside the same site: a path, never a scheme of its own, never
// another origin's protocol-relative form.
const isLocalUrl = (value) => typeof value === 'string' && value.length > 0 && value.length <= 2048
  && !CONTROL.test(value) && value.startsWith('/') && !value.startsWith('//');
const COLLECTION_SCHEMA = { type: 'string', minLength: 1, maxLength: 128 };
const RECORD_ID_SCHEMA = { oneOf: [{ type: 'string', minLength: 1, maxLength: 256 }, { type: 'integer', minimum: -9007199254740991, maximum: 9007199254740991 }] };
const REVISION_SCHEMA = { oneOf: [{ type: 'string', minLength: 1, maxLength: 128 }, { type: 'integer', minimum: -9007199254740991, maximum: 9007199254740991 }] };
const TOKEN_SCHEMA = { type: 'string', pattern: '^[a-z][a-z0-9._:-]{0,127}$' };

// Closed value-type vocabulary. Each validator returns an immutable copy or
// throws TypeError; there is no coercion between types.
const VALUE_TYPES = Object.freeze({
  'record-ids.v1': Object.freeze({
    summary: 'Ordered unique opaque record identities: nonempty strings up to 256 code units without control characters, or safe integers. Up to 1000 items; empty means no selection.',
    schema: {
      type: 'array',
      maxItems: 1000,
      uniqueItems: true,
      items: { oneOf: [{ type: 'string', minLength: 1, maxLength: 256 }, { type: 'integer', minimum: -9007199254740991, maximum: 9007199254740991 }] },
    },
    check(value) {
      if (!Array.isArray(value) || value.length > 1000 || !value.every(checkedRecordId)) throw new TypeError('record-ids.v1 value is invalid');
      const seen = new Set(value.map((entry) => `${typeof entry}:${entry}`));
      if (seen.size !== value.length) throw new TypeError('record-ids.v1 value has duplicates');
      return freezeList(value);
    },
  }),
  'record-id.v1': Object.freeze({
    summary: 'One opaque record identity or null for none.',
    schema: { oneOf: [{ type: 'null' }, { type: 'string', minLength: 1, maxLength: 256 }, { type: 'integer', minimum: -9007199254740991, maximum: 9007199254740991 }] },
    check(value) {
      if (value !== null && !checkedRecordId(value)) throw new TypeError('record-id.v1 value is invalid');
      return value;
    },
  }),
  'text.v1': Object.freeze({
    summary: 'Plain text up to 2000 code units; never interpreted as markup or a query language.',
    schema: { type: 'string', maxLength: 2000 },
    check(value) {
      if (typeof value !== 'string' || value.length > 2000) throw new TypeError('text.v1 value is invalid');
      return value;
    },
  }),
  'boolean.v1': Object.freeze({
    summary: 'A strict boolean.',
    schema: { type: 'boolean' },
    check(value) {
      if (typeof value !== 'boolean') throw new TypeError('boolean.v1 value is invalid');
      return value;
    },
  }),
  'record-changed.v1': Object.freeze({
    summary: 'A record changed: its collection, identity and new revision, and optionally the keys of the fields that changed (up to 256). Says what changed, never the values.',
    schema: {
      type: 'object', additionalProperties: false, required: ['collection', 'id', 'revision'],
      properties: {
        collection: COLLECTION_SCHEMA, id: RECORD_ID_SCHEMA, revision: REVISION_SCHEMA,
        fields: { type: 'array', maxItems: 256, uniqueItems: true, items: { type: 'string', minLength: 1, maxLength: 128 } },
      },
    },
    check(value) {
      closedObject(value, ['collection', 'id', 'revision'], ['fields'], 'record-changed.v1');
      if (!isCollection(value.collection) || !checkedRecordId(value.id) || !isRevision(value.revision)) throw new TypeError('record-changed.v1 value is invalid');
      const out = { collection: value.collection, id: value.id, revision: value.revision };
      if (value.fields !== undefined) {
        const fields = value.fields;
        if (!Array.isArray(fields) || fields.length > 256 || !fields.every(isCollection) || new Set(fields).size !== fields.length) throw new TypeError('record-changed.v1 fields are invalid');
        out.fields = freezeList(fields);
      }
      return Object.freeze(out);
    },
  }),
  'record-removed.v1': Object.freeze({
    summary: 'A record was removed from its collection.',
    schema: { type: 'object', additionalProperties: false, required: ['collection', 'id'], properties: { collection: COLLECTION_SCHEMA, id: RECORD_ID_SCHEMA } },
    check(value) {
      closedObject(value, ['collection', 'id'], [], 'record-removed.v1');
      if (!isCollection(value.collection) || !checkedRecordId(value.id)) throw new TypeError('record-removed.v1 value is invalid');
      return Object.freeze({ collection: value.collection, id: value.id });
    },
  }),
  'collection-changed.v1': Object.freeze({
    summary: 'Something in a collection changed that a list should read again; reason is a short token (created, imported, reordered, settings ...).',
    schema: { type: 'object', additionalProperties: false, required: ['collection', 'reason'], properties: { collection: COLLECTION_SCHEMA, reason: TOKEN_SCHEMA } },
    check(value) {
      closedObject(value, ['collection', 'reason'], [], 'collection-changed.v1');
      if (!isCollection(value.collection) || !isToken(value.reason)) throw new TypeError('collection-changed.v1 value is invalid');
      return Object.freeze({ collection: value.collection, reason: value.reason });
    },
  }),
  'files-moved.v1': Object.freeze({
    summary: 'Files moved between folders: their identities (1 to 1000, unique), the folder they left and the one they went to; null is the root.',
    schema: {
      type: 'object', additionalProperties: false, required: ['ids', 'from', 'to'],
      properties: {
        ids: { type: 'array', minItems: 1, maxItems: 1000, uniqueItems: true, items: RECORD_ID_SCHEMA },
        from: { oneOf: [{ type: 'null' }, ...RECORD_ID_SCHEMA.oneOf] },
        to: { oneOf: [{ type: 'null' }, ...RECORD_ID_SCHEMA.oneOf] },
      },
    },
    check(value) {
      closedObject(value, ['ids', 'from', 'to'], [], 'files-moved.v1');
      const ids = value.ids;
      if (!Array.isArray(ids) || ids.length === 0 || ids.length > 1000 || !ids.every(checkedRecordId)) throw new TypeError('files-moved.v1 ids are invalid');
      if (new Set(ids.map((entry) => `${typeof entry}:${entry}`)).size !== ids.length) throw new TypeError('files-moved.v1 ids have duplicates');
      const folder = (entry) => entry === null || checkedRecordId(entry);
      if (!folder(value.from) || !folder(value.to)) throw new TypeError('files-moved.v1 folder is invalid');
      return Object.freeze({ ids: freezeList(ids), from: value.from, to: value.to });
    },
  }),
  'counter.v1': Object.freeze({
    summary: 'A named count changed: key is a token (notifications, requests.new ...), value a non-negative safe integer.',
    schema: { type: 'object', additionalProperties: false, required: ['key', 'value'], properties: { key: TOKEN_SCHEMA, value: { type: 'integer', minimum: 0, maximum: 9007199254740991 } } },
    check(value) {
      closedObject(value, ['key', 'value'], [], 'counter.v1');
      if (!isToken(value.key) || !Number.isSafeInteger(value.value) || value.value < 0) throw new TypeError('counter.v1 value is invalid');
      return Object.freeze({ key: value.key, value: value.value });
    },
  }),
  'navigation.v1': Object.freeze({
    summary: 'Go to an address of the same site, in a named region: url is a path (starting with one slash, up to 2048 code units), region a region name.',
    schema: { type: 'object', additionalProperties: false, required: ['url', 'region'], properties: { url: { type: 'string', minLength: 1, maxLength: 2048, pattern: '^/(?!/)' }, region: { type: 'string', pattern: '^[a-z][a-z0-9-]{0,31}$' } } },
    check(value) {
      closedObject(value, ['url', 'region'], [], 'navigation.v1');
      if (!isLocalUrl(value.url) || typeof value.region !== 'string' || !NAME_PATTERN.test(value.region)) throw new TypeError('navigation.v1 value is invalid');
      return Object.freeze({ url: value.url, region: value.region });
    },
  }),
  'preference-changed.v1': Object.freeze({
    summary: 'A person changed a view preference: the SF.Preferences key (sf-table/<key>, sf-table/*, sf-admin-menu/main ...). Says which, never the value.',
    schema: { type: 'object', additionalProperties: false, required: ['key'], properties: { key: { type: 'string', minLength: 1, maxLength: 256, pattern: '^[\\w.*:-]+(?:/[\\w.*:/-]+)?$' } } },
    check(value) {
      closedObject(value, ['key'], [], 'preference-changed.v1');
      if (typeof value.key !== 'string' || value.key.length > 256 || !PREFERENCE_KEY.test(value.key)) throw new TypeError('preference-changed.v1 value is invalid');
      return Object.freeze({ key: value.key });
    },
  }),
});

const own = (object, key) => (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(object) && typeof key === 'string' && Object.hasOwn(object, key);

// Names carry no version (owner, 2026-10-19; journal record
// value-types-without-version). A value type is read by its bare name
// (record-removed) or by the older label with the version (record-removed.v1)
// until the change journal retires the older one. VALUE_TYPES and the
// registries keep the older labels as keys, so published bytes and digests do
// not move; this is the one place that reads either form.
const VALUE_TYPE_LABELS = Object.freeze(Object.assign(Object.create(null),
  Object.fromEntries(Object.keys(VALUE_TYPES).map((label) => [label.replace(/\.v1$/u, ''), label]))));

/** The bare name of a value type given in either form, or null when the vocabulary has no such type. */
function valueTypeName(name) {
  if (typeof name !== 'string') return null;
  if (Object.hasOwn(VALUE_TYPE_LABELS, name)) return name;
  if (Object.hasOwn(VALUE_TYPES, name)) return name.replace(/\.v1$/u, '');
  return null;
}

/** Whether two value types are the same type, whichever form each is named in. */
function sameValueType(left, right) {
  const name = valueTypeName(left);
  return name !== null && name === valueTypeName(right);
}

/** The vocabulary entry {summary, schema, check} of a value type named in either form, or null. */
function valueTypeEntry(name) {
  const bare = valueTypeName(name);
  return bare === null ? null : VALUE_TYPES[VALUE_TYPE_LABELS[bare]];
}

const knownValueType = (name) => valueTypeName(name) !== null;

function checkPortValue(valueType, value) {
  if (!knownValueType(valueType)) throw new TypeError(`Unknown value type ${valueType}`);
  const type = valueTypeEntry(valueType);
  const checked = type.check(value);
  if (new globalThis.TextEncoder().encode(JSON.stringify(checked)).byteLength > ROUTING_LIMITS.maxValueBytes) throw new TypeError('Port value is too large');
  return checked;
}

// Former port element names, each read as its new name until remove_after
// (change journal port-element-sf-table-to-sf-view-table, beside the tag
// record tag-sf-table-to-sf-view-table): a binding to sf-table, or a type
// drawn by the custom element sf-table, finds the sf-view-table manifest.
// A registry given a manifest under the old name itself keeps that manifest.
const PORT_ELEMENT_ALIASES = Object.freeze({
  'sf-table': Object.freeze({ to: 'sf-view-table', journal: 'port-element-sf-table-to-sf-view-table', remove_after: '2027-01-01' }),
});

function createPortRegistry(manifests = [], options = {}) {
  const elements = new Map();
  for (const manifest of manifests) {
    // Either form of the format name (schema-name.mjs).
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(manifest) || !(0,_schema_name_mjs__WEBPACK_IMPORTED_MODULE_1__.isSchema)(manifest, 'simai.composition.port-manifest', 1)) throw new TypeError('composition_port_manifest_invalid');
    if (elements.has(manifest.element)) throw new TypeError(`composition_port_manifest_duplicate:${manifest.element}`);
    for (const port of [...Object.values(manifest.outputs || {}), ...Object.values(manifest.inputs || {})]) {
      if (!knownValueType(port.value)) throw new TypeError(`composition_port_value_type_unknown:${port.value}`);
    }
    elements.set(manifest.element, (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.canonical)(manifest));
  }
  // An alias stands only where its new name is registered and its old name is not.
  const aliases = new Map(Object.entries(options.aliases ?? PORT_ELEMENT_ALIASES)
    .map(([from, entry]) => [from, typeof entry === 'string' ? entry : entry?.to])
    .filter(([from, to]) => typeof to === 'string' && elements.has(to) && !elements.has(from)));
  const bindings = new Map(Object.entries(options.bindings || {}));
  for (const [type, element] of bindings) {
    if (!elements.has(element) && !aliases.has(element)) throw new TypeError(`composition_port_binding_unknown:${type}`);
  }
  return { elements, bindings, aliases };
}

// The manifest a port registry holds for an element name, a former name read
// as its new one (PORT_ELEMENT_ALIASES).
function portManifestFor(ports, element) {
  if (!ports || typeof element !== 'string') return null;
  return ports.elements.get(element) || ports.elements.get(ports.aliases?.get(element)) || null;
}

function portsForType(typeManifest, ports) {
  if (!typeManifest || !ports) return null;
  const bound = ports.bindings.get(typeManifest.type);
  if (bound) return portManifestFor(ports, bound);
  if (typeManifest.renderer?.kind === 'custom-element') return portManifestFor(ports, typeManifest.renderer.name);
  return null;
}

function validEndpointExtension(extension) {
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(extension) && Object.keys(extension).length === 1
    && typeof extension.name === 'string' && NAME_PATTERN.test(extension.name);
}

function endpointName(node) {
  const extension = own(node?.extensions, ENDPOINT_EXTENSION) ? node.extensions[ENDPOINT_EXTENSION] : undefined;
  return validEndpointExtension(extension) ? extension.name : undefined;
}

function collectScope(scopeNode, path) {
  const endpoints = new Map();
  const problems = [];
  const visit = (node, nodePath, nested) => {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node)) return;
    if (node !== scopeNode) {
      const extension = own(node.extensions, ENDPOINT_EXTENSION) ? node.extensions[ENDPOINT_EXTENSION] : undefined;
      // Shape errors are reported once for every node by resolveRoutes.
      if (validEndpointExtension(extension) && !nested) {
        if (endpoints.has(extension.name)) {
          problems.push(diagnostic('route_endpoint_duplicate', `${nodePath}.extensions.${ENDPOINT_EXTENSION}`, `Endpoint ${extension.name} is declared twice in one scope`));
        } else {
          endpoints.set(extension.name, { node, path: nodePath });
        }
      }
      // A nested scope encapsulates its own endpoints.
      if (node.type === 'layout.scope') nested = true;
    }
    for (const [slotName, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.slots) ? node.slots : {})) {
      if (Array.isArray(children)) children.forEach((child, index) => visit(child, `${nodePath}.slots.${slotName}[${index}]`, nested));
    }
  };
  visit(scopeNode, path, false);
  return { endpoints, problems };
}

function findCycle(edges) {
  const graph = new Map();
  for (const [from, to] of edges) {
    if (!graph.has(from)) graph.set(from, new Set());
    graph.get(from).add(to);
  }
  const state = new Map();
  const walk = (node) => {
    state.set(node, 'active');
    for (const next of graph.get(node) || []) {
      if (state.get(next) === 'active') return true;
      if (!state.has(next) && walk(next)) return true;
    }
    state.set(node, 'done');
    return false;
  };
  return [...graph.keys()].some((node) => !state.has(node) && walk(node));
}

/**
 * Resolves and validates every layout.scope in a Document. Returns a map of
 * scope node id to typed routes; problems are appended to diagnostics.
 */
function resolveRoutes(root, registry, ports, diagnostics = []) {
  const resolved = new Map();
  const visit = (node, path, scopeDepth) => {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node)) return;
    if (own(node.extensions, ENDPOINT_EXTENSION) && !validEndpointExtension(node.extensions[ENDPOINT_EXTENSION])) {
      diagnostics.push(diagnostic('route_endpoint_invalid', `${path}.extensions.${ENDPOINT_EXTENSION}`, 'Endpoint extension must contain only a valid name'));
    }
    let depth = scopeDepth;
    if (node.type === 'layout.scope') {
      depth += 1;
      if (depth > ROUTING_LIMITS.maxScopeNesting) diagnostics.push(diagnostic('scope_nesting_limit', path, 'Routing scopes are nested too deeply'));
      const routes = Array.isArray(node.props?.routes) ? node.props.routes : [];
      const { endpoints, problems } = collectScope(node, path);
      diagnostics.push(...problems);
      if (endpoints.size > ROUTING_LIMITS.maxEndpointsPerScope) diagnostics.push(diagnostic('route_limit', path, 'Scope declares too many endpoints'));
      const ids = new Set();
      const inputs = new Set();
      const fanOut = new Map();
      const edges = [];
      const typed = [];
      routes.forEach((route, index) => {
        const routePath = `${path}.props.routes[${index}]`;
        if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(route) || !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(route.from) || !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(route.to)) return;
        if (ids.has(route.id)) diagnostics.push(diagnostic('route_id_duplicate', `${routePath}.id`, `Route ${route.id} is declared twice`));
        ids.add(route.id);
        const ends = {};
        for (const side of ['from', 'to']) {
          const endpoint = typeof route[side].endpoint === 'string' ? endpoints.get(route[side].endpoint) : undefined;
          if (!endpoint) {
            diagnostics.push(diagnostic('route_endpoint_unknown', `${routePath}.${side}.endpoint`, `Endpoint ${route[side].endpoint} is not declared in this scope`));
            continue;
          }
          const portManifest = portsForType(registry.types.get(endpoint.node.type), ports);
          const direction = side === 'from' ? 'outputs' : 'inputs';
          const opposite = side === 'from' ? 'inputs' : 'outputs';
          const port = own(portManifest?.[direction], route[side].port) ? portManifest[direction][route[side].port] : undefined;
          if (!port) {
            const wrongDirection = own(portManifest?.[opposite], route[side].port);
            diagnostics.push(wrongDirection
              ? diagnostic('route_port_direction', `${routePath}.${side}.port`, `${route[side].port} is not ${side === 'from' ? 'an output' : 'an input'}`)
              : diagnostic('route_port_unknown', `${routePath}.${side}.port`, `${endpoint.node.type} publishes no ${side === 'from' ? 'output' : 'input'} ${route[side].port}`));
            continue;
          }
          ends[side] = { endpoint: route[side].endpoint, port: route[side].port, value: port.value, element: portManifest.element };
        }
        if (route.from.endpoint === route.to.endpoint) diagnostics.push(diagnostic('route_self', routePath, 'A route cannot connect an endpoint to itself'));
        const inputKey = `${route.to.endpoint}.${route.to.port}`;
        if (inputs.has(inputKey)) diagnostics.push(diagnostic('route_input_conflict', `${routePath}.to`, `Input ${inputKey} already has a route`));
        inputs.add(inputKey);
        const outputKey = `${route.from.endpoint}.${route.from.port}`;
        fanOut.set(outputKey, (fanOut.get(outputKey) || 0) + 1);
        if (fanOut.get(outputKey) > ROUTING_LIMITS.maxFanOut) diagnostics.push(diagnostic('route_fanout_limit', `${routePath}.from`, `Output ${outputKey} feeds too many routes`));
        edges.push([route.from.endpoint, route.to.endpoint]);
        if (ends.from && ends.to) {
          if (!sameValueType(ends.from.value, ends.to.value)) diagnostics.push(diagnostic('route_type_mismatch', routePath, `${ends.from.value} cannot feed ${ends.to.value}`));
          else typed.push({ id: route.id, from: ends.from, to: ends.to });
        }
      });
      if (findCycle(edges.filter(([from, to]) => from !== to))) diagnostics.push(diagnostic('route_cycle', `${path}.props.routes`, 'Routes form a cycle between endpoints'));
      resolved.set(node.id, typed);
    }
    for (const [slotName, children] of Object.entries((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node.slots) ? node.slots : {})) {
      if (Array.isArray(children)) children.forEach((child, index) => visit(child, `${path}.slots.${slotName}[${index}]`, depth));
    }
  };
  visit(root, '$.root', 0);
  return resolved;
}

/**
 * DOM-independent route controller used by sf-composition-scope. The host is
 * any EventTarget; endpoints are resolved lazily on every delivery so that
 * removed and remounted children never keep stale references.
 */
class CompositionRouteController {
  constructor(host, routes, options = {}) {
    this.host = host;
    this.routes = Object.freeze(routes.map((route) => Object.freeze({ ...route, from: Object.freeze({ ...route.from }), to: Object.freeze({ ...route.to }) })));
    this.options = options;
    this.sequence = 0;
    this.depth = 0;
    this.states = new Map();
    this.pending = new Map();
    this.counters = { outputs: 0, deliveries: 0, settled: 0, stale: 0, rejected: 0 };
    this.connection = null;
    this.onOutput = this.onOutput.bind(this);
  }

  get connected() {
    return this.connection !== null;
  }

  connect() {
    if (this.connection) return false;
    this.connection = new AbortController();
    this.host.addEventListener(PORT_OUTPUT_EVENT, this.onOutput, { signal: this.connection.signal });
    for (const route of this.routes) this.setState(route.id, { status: 'idle', sequence: 0 });
    return true;
  }

  disconnect() {
    if (!this.connection) return false;
    this.connection.abort();
    this.connection = null;
    for (const controller of this.pending.values()) controller.abort();
    this.pending.clear();
    for (const route of this.routes) this.setState(route.id, { status: 'disposed', sequence: this.states.get(route.id)?.sequence || 0 });
    return true;
  }

  getState(routeId) {
    const state = this.states.get(routeId);
    return state ? { ...state } : null;
  }

  setState(routeId, state) {
    const next = Object.freeze({ route: routeId, ...state });
    this.states.set(routeId, next);
    this.options.onState?.(next);
  }

  onOutput(event) {
    const source = this.options.sourceEndpoint?.(event);
    if (!source) return;
    const detail = event.detail;
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(detail) || typeof detail.port !== 'string') return;
    this.counters.outputs += 1;
    for (const route of this.routes) {
      if (route.from.endpoint !== source || route.from.port !== detail.port) continue;
      let value;
      try {
        value = checkPortValue(route.from.value, detail.value);
      } catch {
        // The newest output wins even when invalid: an older pending delivery
        // for this route becomes stale and cannot settle afterwards.
        this.counters.rejected += 1;
        this.pending.get(route.id)?.abort();
        this.pending.delete(route.id);
        this.setState(route.id, { status: 'error', error: 'value_invalid', sequence: ++this.sequence });
        continue;
      }
      this.deliver(route, value);
    }
  }

  deliver(route, value) {
    if (!this.connection) return;
    const sequence = ++this.sequence;
    this.pending.get(route.id)?.abort();
    const abort = new AbortController();
    this.pending.set(route.id, abort);
    this.setState(route.id, { status: 'pending', sequence });
    const isLatest = () => this.connection !== null && !abort.signal.aborted && this.states.get(route.id)?.sequence === sequence;
    const meta = Object.freeze({ route: route.id, sequence, signal: abort.signal, isLatest });
    const attempt = () => {
      if (!isLatest()) return;
      const target = this.options.targetEndpoint?.(route.to.endpoint);
      if (!target) {
        this.setState(route.id, { status: 'error', error: 'endpoint_unresolved', sequence });
        return;
      }
      if (typeof target.sfPortInput !== 'function') {
        const ready = this.options.whenReady?.(target);
        if (ready) {
          this.setState(route.id, { status: 'waiting', sequence });
          ready.then(attempt, () => this.setState(route.id, { status: 'error', error: 'endpoint_unavailable', sequence }));
        } else {
          this.setState(route.id, { status: 'error', error: 'port_unsupported', sequence });
        }
        return;
      }
      const declared = target.constructor?.sfPorts?.inputs?.[route.to.port];
      if (!sameValueType(declared, route.to.value)) {
        this.counters.rejected += 1;
        this.setState(route.id, { status: 'error', error: 'port_mismatch', sequence });
        return;
      }
      if (this.depth >= ROUTING_LIMITS.maxReentrancy) {
        this.counters.rejected += 1;
        this.setState(route.id, { status: 'error', error: 'reentrancy_limit', sequence });
        return;
      }
      this.depth += 1;
      let result;
      try {
        this.counters.deliveries += 1;
        result = target.sfPortInput(route.to.port, value, meta);
      } catch {
        this.depth -= 1;
        this.counters.rejected += 1;
        this.setState(route.id, { status: 'error', error: 'port_rejected', sequence });
        return;
      }
      this.depth -= 1;
      if (result && typeof result.then === 'function') {
        this.setState(route.id, { status: 'pending', sequence });
        result.then(() => {
          if (!isLatest()) { this.counters.stale += 1; return; }
          this.counters.settled += 1;
          this.pending.delete(route.id);
          this.setState(route.id, { status: 'settled', sequence });
        }, () => {
          if (!isLatest()) { this.counters.stale += 1; return; }
          this.setState(route.id, { status: 'error', error: 'port_rejected', sequence });
        });
      } else {
        this.counters.settled += 1;
        this.pending.delete(route.id);
        this.setState(route.id, { status: 'settled', sequence });
      }
    };
    attempt();
  }
}

function nearestScope(element) {
  return element?.parentElement?.closest?.('sf-composition-scope') || null;
}

const isCustom = (element) => typeof element?.localName === 'string' && element.localName.includes('-');
const upgradePending = (element) => isCustom(element) && !globalThis.customElements?.get(element.localName);

// The endpoint element either implements the port protocol itself or wraps
// exactly one port element that belongs to the same scope.
function portElement(endpointElement, scope) {
  if (typeof endpointElement.sfPortInput === 'function' || upgradePending(endpointElement)) return endpointElement;
  const candidates = [...endpointElement.querySelectorAll('*')]
    .filter((element) => isCustom(element) && element.localName !== 'sf-composition-scope' && nearestScope(element) === scope);
  const implemented = candidates.filter((element) => typeof element.sfPortInput === 'function');
  if (implemented.length === 1) return implemented[0];
  const pending = candidates.filter(upgradePending);
  return implemented.length === 0 && pending.length === 1 ? pending[0] : null;
}

function parseRoutesAttribute(value) {
  let parsed;
  try { parsed = JSON.parse(value || '[]'); } catch { return null; }
  if (!Array.isArray(parsed) || parsed.length > ROUTING_LIMITS.maxRoutesPerScope) return null;
  const ids = new Set();
  for (const route of parsed) {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(route) || typeof route.id !== 'string' || !ROUTE_ID_PATTERN.test(route.id)) return null;
    for (const side of ['from', 'to']) {
      const end = route[side];
      if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(end) || typeof end.endpoint !== 'string' || typeof end.port !== 'string'
        || !NAME_PATTERN.test(end.endpoint) || !NAME_PATTERN.test(end.port) || !knownValueType(end.value)) return null;
    }
    if (!sameValueType(route.from.value, route.to.value) || ids.has(route.id)) return null;
    ids.add(route.id);
  }
  return parsed;
}

function defineCompositionScope(registry = globalThis.customElements) {
  if (!registry || typeof globalThis.HTMLElement !== 'function') return null;
  const existing = registry.get('sf-composition-scope');
  if (existing) return existing;
  class SfCompositionScope extends globalThis.HTMLElement {
    constructor() {
      super();
      this.routeController = null;
      this.routeDiagnostics = [];
    }

    connectedCallback() {
      if (!this.routeController) {
        const routes = parseRoutesAttribute(this.getAttribute('data-sf-routes'));
        if (!routes) {
          this.routeDiagnostics = [{ code: 'routes_invalid', path: 'data-sf-routes', message: 'Rendered routes are invalid' }];
          this.setAttribute('data-sf-routing', 'error');
          return;
        }
        this.routeController = new CompositionRouteController(this, routes, {
          sourceEndpoint: (event) => {
            const origin = event.target?.closest?.('[data-sf-endpoint]');
            if (!origin || nearestScope(origin) !== this || portElement(origin, this) !== event.target) return null;
            return origin.getAttribute('data-sf-endpoint');
          },
          targetEndpoint: (name) => {
            const matches = [...this.querySelectorAll('[data-sf-endpoint]')]
              .filter((element) => element.getAttribute('data-sf-endpoint') === name && nearestScope(element) === this);
            return matches.length === 1 ? portElement(matches[0], this) : null;
          },
          whenReady: (element) => (element.localName?.includes('-') && globalThis.customElements
            ? globalThis.customElements.whenDefined(element.localName)
            : null),
          onState: (state) => this.dispatchEvent(new globalThis.CustomEvent(ROUTE_STATE_EVENT, { detail: state })),
        });
      }
      this.routeController.connect();
      this.setAttribute('data-sf-routing', 'connected');
    }

    disconnectedCallback() {
      this.routeController?.disconnect();
      if (this.routeController) this.setAttribute('data-sf-routing', 'disposed');
    }

    getRouteState(routeId) {
      return this.routeController?.getState(routeId) || null;
    }

    getRoutingCounters() {
      return this.routeController ? { ...this.routeController.counters } : null;
    }
  }
  registry.define('sf-composition-scope', SfCompositionScope);
  return SfCompositionScope;
}

function routesAttribute(routes) {
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.stableStringify)(routes.map((route) => ({
    id: route.id,
    from: { endpoint: route.from.endpoint, port: route.from.port, value: route.from.value },
    to: { endpoint: route.to.endpoint, port: route.to.port, value: route.to.value },
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ CompositionRouteController, checkPortValue, createPortRegistry, defineCompositionScope, resolveRoutes });


/***/ },

/***/ "ac24888e7d3e"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSchema: () => (/* binding */ isSchema),
/* harmony export */   readSchema: () => (/* binding */ readSchema),
/* harmony export */   schemaFields: () => (/* binding */ schemaFields),
/* harmony export */   withUnversionedSchema: () => (/* binding */ withUnversionedSchema)
/* harmony export */ });
// Names carry no version (owner, 2026-10-11; ui-control
// control/NAMES-WITHOUT-VERSIONS-DECISION-2026-10-11.md). A data format is
// `"schema": "simai.<name>"` with `"schema_version": <major>` beside it; the
// older form put the major in the name, `"simai.<name>.v<major>"`. Through the
// change journal's compatibility window every reader accepts both, and writers
// emit the new one. This is the one place that reads them.

const VERSIONED = /^(.+)\.v([0-9]+)$/u;

/**
 * The format a document declares, in either form: {name, version}, or null
 * when it declares none. `version` is the major, an integer; null when the
 * new form leaves schema_version out.
 */
function readSchema(document) {
  const label = document?.schema ?? document?.schema_id;
  if (typeof label !== 'string' || !label) return null;
  const versioned = label.match(VERSIONED);
  if (versioned) return {name: versioned[1], version: Number(versioned[2]), form: 'versioned-name'};
  const version = document?.schema_version;
  return {name: label, version: Number.isInteger(version) ? version : null, form: 'name'};
}

/**
 * Whether a document is the format `name` at major `version`, in either form.
 * A schema_version beside the older label must agree with it.
 */
function isSchema(document, name, version) {
  const read = readSchema(document);
  if (!read || read.name !== name || read.version !== version) return false;
  return document.schema_version === undefined || document.schema_version === version;
}

/** The new form of a format's fields, for a writer: {schema, schema_version}. */
function schemaFields(name, version) {
  if (VERSIONED.test(name)) throw new TypeError(`A format name carries no version: ${name}`);
  if (!Number.isInteger(version) || version < 1) throw new TypeError(`A format's version is a whole major: ${version}`);
  return {schema: name, schema_version: version};
}

/** A document's format moved to the new form, everything else as it was. */
function withUnversionedSchema(document) {
  const read = readSchema(document);
  if (!read || read.form === 'name') return document;
  const {schema, schema_id, schema_version, ...rest} = document;
  return {...schemaFields(read.name, read.version), ...rest};
}


/***/ },

/***/ "b88de35f4919"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MODIFIERS_EXTENSION: () => (/* binding */ MODIFIERS_EXTENSION),
/* harmony export */   PART_ATTRIBUTE: () => (/* binding */ PART_ATTRIBUTE),
/* harmony export */   UTILITY_BREAKPOINTS: () => (/* binding */ UTILITY_BREAKPOINTS),
/* harmony export */   UTILITY_KEYWORD: () => (/* binding */ UTILITY_KEYWORD),
/* harmony export */   checkModifiers: () => (/* binding */ checkModifiers),
/* harmony export */   checkResponsiveProps: () => (/* binding */ checkResponsiveProps),
/* harmony export */   declarationsOf: () => (/* binding */ declarationsOf),
/* harmony export */   isBreakpointValue: () => (/* binding */ isBreakpointValue),
/* harmony export */   isResponsive: () => (/* binding */ isResponsive),
/* harmony export */   modifierNotices: () => (/* binding */ modifierNotices),
/* harmony export */   ownModifiers: () => (/* binding */ ownModifiers),
/* harmony export */   utilityClass: () => (/* binding */ utilityClass),
/* harmony export */   utilityClassSpace: () => (/* binding */ utilityClassSpace),
/* harmony export */   utilityClasses: () => (/* binding */ utilityClasses),
/* harmony export */   utilityOf: () => (/* binding */ utilityOf),
/* harmony export */   utilityPartClasses: () => (/* binding */ utilityPartClasses),
/* harmony export */   utilityRules: () => (/* binding */ utilityRules),
/* harmony export */   validateUtilityDeclarations: () => (/* binding */ validateUtilityDeclarations),
/* harmony export */   valueSchema: () => (/* binding */ valueSchema),
/* harmony export */   valuesByBreakpoint: () => (/* binding */ valuesByBreakpoint),
/* harmony export */   withClasses: () => (/* binding */ withClasses),
/* harmony export */   withPartClasses: () => (/* binding */ withPartClasses)
/* harmony export */ });
/* harmony import */ var _canonical_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f489cc65b77");
/* harmony import */ var _parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("18b9c76994c9");
// Layout parameters as SIMAI Framework modifiers, and a block's own modifiers
// (one block editor, owner 2026-11-03; ui-control
// control/ui-editor/UNIFIED-BLOCK-EDITOR.md, section 6).
//
// A Document keeps values, never class strings: `cols: 3`, on the tablet 2,
// on the phone 1. A parameter of a type's props_schema declares the utility it
// becomes (`x-simai-utility`), and the renderer prints the classes mobile
// first: no prefix for the phone, `md:` for the tablet, `lg:` for the desktop,
// a prefix only where the value changes. Grid, gap, padding and visibility are
// utilities, never inline styles.
//
// A block's own modifiers are classes an author adds (the editor's "Extra"
// field). They live in the node's extension `simai.composition:modifiers`,
// are checked against the RuleLoader's utility rules, and a class no rule
// knows is left out of the HTML and reported: a notice, never a refusal.




/** The SIMAI Framework's breakpoints, narrowest first (core/js/breakpoints.js; xs has no prefix). */
const UTILITY_BREAKPOINTS = Object.freeze(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
const UTILITY_KEYWORD = 'x-simai-utility';
const MODIFIERS_EXTENSION = 'simai.composition:modifiers';
const MAX_MODIFIERS = 50;
const CLASS_PATTERN = /^[a-z0-9][a-z0-9:/_.-]{0,99}$/u;
const TEMPLATE_PATTERN = /^[a-z][a-z0-9-]*\{value\}$/u;
const PART_PATTERN = /^[a-z][a-z0-9-]{0,31}$/u;
const DECLARATION_FIELDS = new Set(['class', 'values', 'responsive', 'part']);
/** The attribute a renderer marks an inner element with, so a parameter's classes reach it (`part`). */
const PART_ATTRIBUTE = 'data-sf-composition-part';

const diagnostic = (code, path, message, details = {}) => ({ code, path, message, ...details });
const prefix = (breakpoint) => (breakpoint === 'xs' ? '' : `${breakpoint}:`);

/**
 * The utility declarations of a props_schema property: one object, or a list
 * when the value also reaches inner elements of the block (each with its
 * `part`; parameter sets, 2026-11-03). Empty when there is none.
 */
function declarationsOf(schema) {
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(schema)) return [];
  const value = schema[UTILITY_KEYWORD];
  if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) return [value];
  if (Array.isArray(value)) return value.filter(_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject);
  return [];
}

/** The utility a props_schema property declares on the block's own element (its first declaration), or null. */
function utilityOf(schema) {
  return declarationsOf(schema)[0] ?? null;
}

/** Whether a property takes a value per breakpoint. */
function isResponsive(schema) {
  return declarationsOf(schema).some((declaration) => declaration.responsive === true);
}

/** A value held per breakpoint: an object whose keys are breakpoint names. */
function isBreakpointValue(value) {
  return (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && Object.keys(value).length > 0 && Object.keys(value).every((key) => UTILITY_BREAKPOINTS.includes(key));
}

/** The schema a single value of the property is checked by: the property without its utility annotation. */
function valueSchema(schema) {
  if (!utilityOf(schema)) return schema;
  return Object.fromEntries(Object.entries(schema).filter(([key]) => key !== UTILITY_KEYWORD));
}

/**
 * The value of a property at each breakpoint, carried forward from the
 * narrowest one; the property's `default` where nothing is set yet.
 * A scalar stands for every breakpoint.
 */
function valuesByBreakpoint(value, schema = {}) {
  const fallback = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(schema) && 'default' in schema ? schema.default : undefined;
  const out = {};
  let current = fallback;
  for (const breakpoint of UTILITY_BREAKPOINTS) {
    if (isBreakpointValue(value)) {
      if (breakpoint in value) current = value[breakpoint];
    } else if (value !== undefined) current = value;
    out[breakpoint] = current;
  }
  return out;
}

const tokens = (value) => String(value).split(' ').filter(Boolean);
const prefixed = (breakpoint, name) => tokens(name).map((token) => `${prefix(breakpoint)}${token}`);

/** The class (or space-separated classes) one value becomes, without a prefix; '' when it becomes none. */
function utilityClass(declaration, value) {
  if (value === undefined || value === null || !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(declaration)) return '';
  if ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(declaration.values) && Object.hasOwn(declaration.values, String(value))) return declaration.values[String(value)];
  if (typeof declaration.class === 'string') return declaration.class.replaceAll('{value}', String(value));
  return '';
}

/**
 * The classes a node's layout parameters print, mobile first, by part: '' is
 * the block's own element, any other key an inner element the renderer marks
 * `data-sf-composition-part="<part>"`. At the phone a value equal to the
 * property's default prints nothing when no wider screen differs (the
 * type draws its default without a class); once one differs the base is
 * printed too; at a wider breakpoint a class is printed only where the value
 * differs from the narrower one. A value may become several classes.
 */
function utilityPartClasses(node, manifest) {
  const parts = {};
  const properties = manifest?.props_schema?.properties;
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(properties)) return parts;
  // A property the node leaves unset prints the type's parameter default
  // (parameter_defaults, type manifest 1.5.0); the node's own value wins.
  const props = (0,_parameter_sets_mjs__WEBPACK_IMPORTED_MODULE_1__.effectiveProps)(node, manifest);
  for (const [key, schema] of Object.entries(properties)) {
    if (!(key in props)) continue;
    for (const declaration of declarationsOf(schema)) {
      const part = typeof declaration.part === 'string' ? declaration.part : '';
      const classes = parts[part] || (parts[part] = []);
      // A parameter that is not responsive holds one value for every screen.
      const values = valuesByBreakpoint(declaration.responsive === true ? props[key] : ((0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(props[key]) ? undefined : props[key]), schema);
      // `effective` are the classes in force at the narrower screen: a class
      // a wider value shares with it (grid in grid grid-col-{value}) is not
      // printed again.
      let previous;
      let effective = [];
      // Mobile first: the phone's value is the base the wider screens change.
      // Equal to the default it prints nothing only when every screen keeps
      // it; once a wider screen differs, the base is printed too (G-36:
      // {xs: 1, md: 2} printed md:grid-col-2 without grid-col-1).
      const varies = UTILITY_BREAKPOINTS.some((breakpoint) => values[breakpoint] !== values[UTILITY_BREAKPOINTS[0]]);
      UTILITY_BREAKPOINTS.forEach((breakpoint, index) => {
        const value = values[breakpoint];
        if (index === 0) {
          if (varies || !('default' in schema && value === schema.default)) {
            effective = tokens(utilityClass(declaration, value));
            classes.push(...prefixed('xs', effective.join(' ')));
          }
        } else if (value !== previous) {
          const next = tokens(utilityClass(declaration, value));
          classes.push(...prefixed(breakpoint, next.filter((token) => !effective.includes(token)).join(' ')));
          effective = next;
        }
        previous = value;
      });
    }
  }
  for (const part of Object.keys(parts)) parts[part] = [...new Set(parts[part])];
  return parts;
}

/** The classes a node's layout parameters print on the block's own element. */
function utilityClasses(node, manifest) {
  return utilityPartClasses(node, manifest)[''] || [];
}

/**
 * Every class a property can print, for a check against the utility rules: each
 * allowed value at each breakpoint. Null when the values are not a closed list
 * (an integer range of more than 100 steps).
 */
function utilityClassSpace(schema) {
  const declarations = declarationsOf(schema);
  if (!declarations.length) return [];
  let values = null;
  if (Array.isArray(schema.enum)) values = schema.enum;
  else if (schema.type === 'boolean') values = [true, false];
  else if (schema.type === 'integer' && Number.isInteger(schema.minimum) && Number.isInteger(schema.maximum) && schema.maximum - schema.minimum <= 100) {
    values = Array.from({ length: schema.maximum - schema.minimum + 1 }, (_, index) => schema.minimum + index);
  }
  if (!values) return null;
  return [...new Set(declarations.flatMap((declaration) => {
    const breakpoints = declaration.responsive === true ? UTILITY_BREAKPOINTS : ['xs'];
    return values.flatMap((value) => breakpoints.flatMap((breakpoint) => prefixed(breakpoint, utilityClass(declaration, value))));
  }))];
}

/** The problems of a props_schema's utility declarations (a type manifest check). */
function validateUtilityDeclarations(manifest, path = '$.props_schema') {
  const diagnostics = [];
  const properties = manifest?.props_schema?.properties;
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(properties)) return diagnostics;
  for (const [key, schema] of Object.entries(properties)) {
    if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(schema) || !(UTILITY_KEYWORD in schema)) continue;
    const declared = schema[UTILITY_KEYWORD];
    const list = Array.isArray(declared) ? declared : [declared];
    if (Array.isArray(declared) && (declared.length === 0 || declared.length > 8)) diagnostics.push(diagnostic('utility_declaration_invalid', `${path}.properties.${key}.${UTILITY_KEYWORD}`, 'A list holds one to eight declarations'));
    const partsSeen = new Set();
    list.forEach((declaration, index) => {
      const at = `${path}.properties.${key}.${UTILITY_KEYWORD}${Array.isArray(declared) ? `[${index}]` : ''}`;
      if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(declaration)) {
        diagnostics.push(diagnostic('utility_declaration_invalid', at, 'A utility declaration is an object'));
        return;
      }
      for (const field of Object.keys(declaration)) if (!DECLARATION_FIELDS.has(field)) diagnostics.push(diagnostic('utility_declaration_invalid', `${at}.${field}`, `Unknown utility field ${field}`));
      const part = declaration.part ?? '';
      if (declaration.part !== undefined && (typeof declaration.part !== 'string' || !PART_PATTERN.test(declaration.part))) diagnostics.push(diagnostic('utility_declaration_invalid', `${at}.part`, 'A part is a lowercase name'));
      else if (partsSeen.has(part)) diagnostics.push(diagnostic('utility_declaration_invalid', `${at}.part`, 'One declaration per part'));
      partsSeen.add(part);
      const hasClass = declaration.class !== undefined;
      const hasValues = declaration.values !== undefined;
      if (!hasClass && !hasValues) diagnostics.push(diagnostic('utility_declaration_invalid', at, 'A utility names a class template or a class per value'));
      // A template is one or more classes, at least one ending in {value}.
      const templateTokens = typeof declaration.class === 'string' ? declaration.class.split(' ') : [];
      if (hasClass && (typeof declaration.class !== 'string' || !templateTokens.some((token) => TEMPLATE_PATTERN.test(token)) || templateTokens.some((token) => !TEMPLATE_PATTERN.test(token) && (!CLASS_PATTERN.test(token) || token.includes(':'))))) diagnostics.push(diagnostic('utility_template_invalid', `${at}.class`, 'The class template is utility names with no prefix, one ending in {value}'));
      if (hasValues) {
        if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(declaration.values)) diagnostics.push(diagnostic('utility_declaration_invalid', `${at}.values`, 'values maps each value to a class'));
        else for (const [value, name] of Object.entries(declaration.values)) {
          if (typeof name !== 'string' || (name !== '' && name.split(' ').some((token) => !CLASS_PATTERN.test(token) || token.includes(':')))) diagnostics.push(diagnostic('utility_template_invalid', `${at}.values.${value}`, 'A value becomes classes with no prefix (space-separated), or none'));
        }
      }
      if (declaration.responsive !== undefined && typeof declaration.responsive !== 'boolean') diagnostics.push(diagnostic('utility_declaration_invalid', `${at}.responsive`, 'responsive is true or false'));
    });
    const scalarSchema = Array.isArray(schema.enum) || ['integer', 'number', 'string', 'boolean'].includes(schema.type);
    if (!scalarSchema) diagnostics.push(diagnostic('utility_value_not_scalar', `${path}.properties.${key}`, 'A layout parameter holds one scalar value per breakpoint'));
  }
  return diagnostics;
}

/**
 * Splits a node's props for the schema check: a responsive property held per
 * breakpoint is checked value by value, and stands in the props by one of its
 * values so the closed schema still reads it.
 */
function checkResponsiveProps(props, schema, path, check) {
  const diagnostics = [];
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(props) || !(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(schema?.properties)) return { props, diagnostics };
  let flat = props;
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!(key in props)) continue;
    const value = props[key];
    if (isResponsive(property) && (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) {
      if (!isBreakpointValue(value)) {
        diagnostics.push(diagnostic('breakpoint_unknown', `${path}.${key}`, `A value per screen is keyed by ${UTILITY_BREAKPOINTS.join(', ')}`));
      } else {
        for (const [breakpoint, entry] of Object.entries(value)) check(entry, valueSchema(property), `${path}.${key}.${breakpoint}`, diagnostics);
      }
      if (flat === props) flat = { ...props };
      delete flat[key];
    }
  }
  if (flat !== props) {
    const properties = Object.fromEntries(Object.entries(schema.properties).filter(([key]) => key in flat));
    return { props: flat, schema: { ...schema, properties, required: (schema.required || []).filter((key) => key in flat || !(key in props)) }, diagnostics };
  }
  return { props, diagnostics };
}

// ------------------------------------------------------------- own modifiers

/** The classes an author added to a node (its own modifiers), as stored. */
function ownModifiers(node) {
  const entry = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node?.extensions) ? node.extensions[MODIFIERS_EXTENSION] : undefined;
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry) || !Array.isArray(entry.utilities)) return [];
  return entry.utilities.filter((value) => typeof value === 'string').slice(0, MAX_MODIFIERS);
}

/** The class rules of a RuleLoader map: its RegExp entries (component rules are objects). */
function utilityRules(ruleLoader = globalThis.SF?.RuleLoader) {
  if (Array.isArray(ruleLoader)) return ruleLoader.filter((rule) => rule instanceof RegExp);
  if (!ruleLoader || typeof ruleLoader !== 'object') return null;
  const rules = Object.values(ruleLoader).filter((rule) => rule instanceof RegExp);
  return rules.length ? rules : null;
}

/**
 * Checks classes against the utility rules: `kept` are printed, `dropped` are
 * left out with the reason. Without any rule nothing unchecked is printed.
 */
function checkModifiers(classes, options = {}) {
  const rules = utilityRules(options.rules ?? globalThis.SF?.RuleLoader);
  const kept = [];
  const dropped = [];
  const seen = new Set();
  for (const value of Array.isArray(classes) ? classes : []) {
    if (typeof value !== 'string' || !CLASS_PATTERN.test(value)) dropped.push({ class: String(value), reason: 'modifier_invalid' });
    else if (seen.has(value)) continue;
    else if (!rules) dropped.push({ class: value, reason: 'modifier_rules_unavailable' });
    else if (rules.some((rule) => { rule.lastIndex = 0; return rule.test(value); })) kept.push(value);
    else dropped.push({ class: value, reason: 'modifier_unknown' });
    seen.add(value);
  }
  if (Array.isArray(classes) && classes.length > MAX_MODIFIERS) dropped.push({ class: `(${classes.length - MAX_MODIFIERS} more)`, reason: 'modifier_limit' });
  return { kept, dropped };
}

/** The notices a node's own modifiers give: one per class left out. */
function modifierNotices(node, options = {}) {
  const entry = (0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(node?.extensions) ? node.extensions[MODIFIERS_EXTENSION] : undefined;
  if (entry === undefined) return { kept: [], notices: [] };
  if (!(0,_canonical_mjs__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(entry) || !Array.isArray(entry.utilities)) {
    return { kept: [], notices: [diagnostic('modifiers_invalid', `node:${node.id}`, `${MODIFIERS_EXTENSION} holds {utilities: [classes]}`)] };
  }
  const { kept, dropped } = checkModifiers(entry.utilities, options);
  return {
    kept,
    notices: dropped.map((item) => diagnostic(item.reason, `node:${node.id}`, item.reason === 'modifier_unknown'
      ? `${item.class} is no SIMAI Framework utility; it is left out of the HTML`
      : item.reason === 'modifier_rules_unavailable'
        ? `${item.class} cannot be checked without the utility rules; it is left out of the HTML`
        : `${item.class} is left out of the HTML`, { class: item.class })),
  };
}

// --------------------------------------------------------------- the output

function escapeAttribute(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

/**
 * Adds classes to the inner element a renderer marks `data-sf-composition-part="<part>"`,
 * the first one after the node's own element (a renderer draws its parts
 * around its slots, so the node's parts come before its children's).
 * Returns {html, found}.
 */
function withPartClasses(html, id, part, classes) {
  if (typeof html !== 'string') return { html, found: false };
  const at = html.indexOf(`data-sf-composition-id="${escapeAttribute(id)}"`);
  if (at === -1) return { html, found: false };
  const marker = html.indexOf(`${PART_ATTRIBUTE}="${escapeAttribute(part)}"`, at);
  // The part belongs to this node only if no other node's element comes first.
  const next = html.indexOf('data-sf-composition-id="', at + 1);
  if (marker === -1 || (next !== -1 && next < marker)) return { html, found: false };
  if (!classes.length) return { html, found: true };
  const start = html.lastIndexOf('<', marker);
  const end = html.indexOf('>', marker);
  const tag = html.slice(start, end);
  const existing = tag.match(/\sclass="([^"]*)"/u);
  let replaced;
  if (existing) {
    const own = existing[1].split(/\s+/u).filter(Boolean);
    replaced = tag.replace(existing[0], ` class="${escapeAttribute([...own, ...classes.filter((name) => !own.includes(name))].join(' '))}"`);
  } else {
    const name = tag.match(/^<[A-Za-z][A-Za-z0-9-]*/u);
    if (!name) return { html, found: false };
    replaced = `${name[0]} class="${escapeAttribute(classes.join(' '))}"${tag.slice(name[0].length)}`;
  }
  return { html: html.slice(0, start) + replaced + html.slice(end), found: true };
}

/**
 * Adds classes to the element that carries `data-sf-composition-id="<id>"`:
 * the one element each renderer draws for its node. The classes join the
 * element's own, once each; HTML without that element is returned as it came.
 */
function withClasses(html, id, classes) {
  if (!classes.length || typeof html !== 'string') return html;
  const marker = `data-sf-composition-id="${escapeAttribute(id)}"`;
  const at = html.indexOf(marker);
  if (at === -1) return html;
  const start = html.lastIndexOf('<', at);
  const end = html.indexOf('>', at);
  if (start === -1 || end === -1) return html;
  const tag = html.slice(start, end);
  const existing = tag.match(/\sclass="([^"]*)"/u);
  if (existing) {
    const own = existing[1].split(/\s+/u).filter(Boolean);
    const merged = [...own, ...classes.filter((name) => !own.includes(name))].join(' ');
    const replaced = tag.replace(existing[0], ` class="${escapeAttribute(merged)}"`);
    return html.slice(0, start) + replaced + html.slice(end);
  }
  const name = tag.match(/^<[A-Za-z][A-Za-z0-9-]*/u);
  if (!name) return html;
  return `${html.slice(0, start)}${name[0]} class="${escapeAttribute(classes.join(' '))}"${tag.slice(name[0].length)}${html.slice(end)}`;
}


/***/ },

/***/ "8d9331f1f24f"
(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TABS: () => (/* binding */ TABS),
/* harmony export */   catalogueAt: () => (/* binding */ catalogueAt),
/* harmony export */   groupIcon: () => (/* binding */ groupIcon),
/* harmony export */   groupWordKey: () => (/* binding */ groupWordKey),
/* harmony export */   itemKey: () => (/* binding */ itemKey),
/* harmony export */   itemsFor: () => (/* binding */ itemsFor),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   pushRecent: () => (/* binding */ pushRecent),
/* harmony export */   searchItems: () => (/* binding */ searchItems),
/* harmony export */   sectionForPlace: () => (/* binding */ sectionForPlace),
/* harmony export */   sectionsOf: () => (/* binding */ sectionsOf),
/* harmony export */   skeletonOf: () => (/* binding */ skeletonOf),
/* harmony export */   tabForPlace: () => (/* binding */ tabForPlace),
/* harmony export */   toggleFavourite: () => (/* binding */ toggleFavourite),
/* harmony export */   typeWordKey: () => (/* binding */ typeWordKey)
/* harmony export */ });
/* harmony import */ var _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("32dfc4431a24");
/* harmony import */ var _core_js_composition_catalogue_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("76235de72516");
/* harmony import */ var _core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e2cb52b018e5");
/* harmony import */ var _tree_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("c584913fd94f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
// The one catalogue of sf-editor: every way to insert (the + between blocks,
// / in text, the library on the left) reads it. It is Part A's catalogue of
// the registry (tabs Text and Blocks, the fixed groups, variants) narrowed to
// a place: what a slot cannot take is hidden, not greyed out, and a tab with
// nothing that fits is left out. Search covers names, keywords and the group
// in both languages; Favourites and Recent sit on top. A variant's picture is
// drawn from the variant itself (skeleton), never by hand.
//
// Since 1.1.0 (visual parity, 2026-11-04) the library is a list of sections,
// each with the Framework's icon and word (CATALOGUE_GROUP_TABLE) and a count,
// in the Framework's order (CATALOGUE_GROUPS); a product's own group follows.
//
// Since 1.2.0 (the ui-editor host's G-20, 2026-11-04) the + and / catalogue
// are that same list of sections (no Text/Blocks tabs): the + between
// sections opens on the sections, the + in a text flow and / on Text. A type
// stands in its own section and in each also_in section (core.runtime
// 1.27.0), counted in each; a search lists it once, under its own section.





const TABS = Object.freeze(["text", "blocks"]);
const TEXT_FLOWS = new Set(["layout.area", "content.document", "content.quote", "content.alert", "content.details", "content.step", "content.tab", "content.card", "content.list-item", "content.grid", "content.media"]);
const RECENT_LIMIT = 8;
// A product group the Framework does not name (a type's own namespace) gets this icon.
const OTHER_GROUP_ICON = "widgets";
const OTHER_TYPE_ICON = "widgets";

/** The word key of a catalogue group: the Framework's for its own groups, group-<id> for a product's. */
const groupWordKey = (group) => _core_js_composition_catalogue_mjs__WEBPACK_IMPORTED_MODULE_1__.CATALOGUE_GROUP_TABLE[group]?.label_key ?? `group-${group}`;

/** The icon of a catalogue group (a SIMAI Framework icon name). */
const groupIcon = (group) => _core_js_composition_catalogue_mjs__WEBPACK_IMPORTED_MODULE_1__.CATALOGUE_GROUP_TABLE[group]?.icon ?? OTHER_GROUP_ICON;

/** The word of a type with no label_key of its own: type-<type with dashes>, from the editor's lang files. */
const typeWordKey = (type) => `type-${String(type).replace(/[^a-z0-9]+/gu, "-")}`;

/** The key of a catalogue item: its type and variant. */
const itemKey = (item) => `${item.type}${item.variant ? `#${item.variant}` : ""}`;

/** Which tab a place opens on: inside a text flow, Text; between sections, Blocks. */
function tabForPlace(model, place) {
    const parent = place ? model.node(place.parent) : null;
    return parent && TEXT_FLOWS.has(parent.type) ? "text" : "blocks";
}

/**
 * The items a place takes (or, with no place, those that have some place in
 * the page): each type once, or once per variant. `word(key)` names them.
 */
function itemsFor(model, place, word = (key) => key) {
    const registry = model.registry;
    const listed = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].catalogue(registry, place ? {parent: model.node(place.parent)?.type, slot: place.slot} : {}).entries;
    const items = [];
    for (const entry of listed) {
        const manifest = registry.types.get(entry.type);
        if (!model.rights.layout && manifest.category === "layout") continue;
        if (place ? !model.accepts(place.parent, place.slot, entry.type) || model.placeLock(place.parent) : !model.placeFor(entry.type)) continue;
        const base = {type: entry.type, group: entry.group, groups: [entry.group, ...(entry.also_in ?? [])], tab: entry.tab, order: entry.order, icon: entry.icon ?? groupIcon(entry.group) ?? OTHER_TYPE_ICON, keywords: entry.keywords ?? {}, site: (0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(manifest), variants: entry.variants.length};
        const typeKey = entry.label_key ?? typeWordKey(entry.type);
        const typeLabel = word(typeKey);
        if (entry.variants.length) {
            for (const variant of entry.variants) items.push({...base, variant: variant.id, label: word(variant.label_key), labelKeys: [variant.label_key, typeKey], typeLabel, ...(variant.preview ? {preview: variant.preview} : {})});
        } else items.push({...base, label: typeLabel, labelKeys: [typeKey], typeLabel, ...(entry.preview ? {preview: entry.preview} : {})});
    }
    return items;
}

/**
 * The catalogue at a place: {tab, tabs: [{id, groups: [{id, items}]}]}, the
 * tab the place opens on first; tabs with nothing are left out.
 */
function catalogueAt(model, place, {word = (key) => key, groups = []} = {}) {
    const items = itemsFor(model, place, word);
    const tabs = TABS.map((id) => {
        const own = items.filter((item) => item.tab === id);
        const order = [...groups, ...new Set(own.map((item) => item.group))];
        const named = [...new Set(order)].map((group) => ({id: group, items: own.filter((item) => item.group === group)})).filter((group) => group.items.length);
        return {id, groups: named, count: own.length};
    }).filter((tab) => tab.count);
    const wanted = tabForPlace(model, place);
    const tab = tabs.some((entry) => entry.id === wanted) ? wanted : tabs[0]?.id ?? wanted;
    return {tab, tabs, items};
}

/** The section a place opens on: Text inside a text flow and for /, the list of sections between blocks. */
function sectionForPlace(model, place, mode = "plus") {
    return mode === "slash" || tabForPlace(model, place) === "text" ? "text" : "";
}

/**
 * The library's sections: [{id, icon, labelKey, count, types: [{type, label,
 * icon, site, items}]}], the Framework's groups in its order, then a
 * product's own; a section with nothing is left out. A type with variants
 * holds one item per variant, a type without one item; count is the types.
 * A type stands in each of its groups (also_in), unless `own` (a search):
 * then under its own group only, so it is named once.
 */
function sectionsOf(items, {own = false} = {}) {
    const groupsOf = (item) => (own || !Array.isArray(item.groups) ? [item.group] : item.groups);
    const order = [..._core_js_composition_catalogue_mjs__WEBPACK_IMPORTED_MODULE_1__.CATALOGUE_GROUPS, ...new Set(items.flatMap(groupsOf))];
    return [...new Set(order)].map((id) => {
        const types = [];
        // A section's own blocks first, then those that also stand in it
        // (also_in), as the prototype lists the button last in Text.
        const here = items.filter((entry) => groupsOf(entry).includes(id));
        for (const item of [...here.filter((entry) => entry.group === id), ...here.filter((entry) => entry.group !== id)]) {
            let type = types.find((entry) => entry.type === item.type);
            if (!type) {
                type = {type: item.type, label: item.typeLabel, icon: item.icon, site: item.site, items: []};
                types.push(type);
            }
            type.items.push(item);
        }
        return {id, icon: groupIcon(id), labelKey: groupWordKey(id), count: types.length, types};
    }).filter((section) => section.count);
}

/**
 * Search across every tab and group: names, keywords and the group, in every
 * language given. `words(key)` gives a word in every language (the editor's
 * and the host's), so a block is found by its name in any of them.
 */
function searchItems(items, query, {word = (key) => key, words = () => [], locales = ["en", "ru"]} = {}) {
    const wanted = String(query ?? "").trim().toLowerCase();
    if (!wanted) return items;
    const parts = wanted.split(/\s+/u);
    return items.filter((item) => {
        const haystack = [
            item.label, item.typeLabel, item.type, item.variant ?? "", word(groupWordKey(item.group)),
            ...(item.labelKeys ?? []).flatMap((key) => words(key)), ...words(groupWordKey(item.group)),
            ...locales.flatMap((locale) => item.keywords?.[locale] ?? []),
        ].join(" ").toLowerCase();
        return parts.every((part) => haystack.includes(part));
    });
}

/** Recent: the newest first, each once, at most eight. */
function pushRecent(recent, item) {
    const key = typeof item === "string" ? item : itemKey(item);
    return [key, ...(Array.isArray(recent) ? recent : []).filter((entry) => entry !== key)].slice(0, RECENT_LIMIT);
}

function toggleFavourite(favourites, item) {
    const key = typeof item === "string" ? item : itemKey(item);
    const list = Array.isArray(favourites) ? favourites : [];
    return list.includes(key) ? list.filter((entry) => entry !== key) : [...list, key];
}

/** The items of a key list that this place takes, in the list's order. */
function pick(items, keys) {
    const byKey = new Map(items.map((item) => [itemKey(item), item]));
    return (Array.isArray(keys) ? keys : []).map((key) => byKey.get(key)).filter(Boolean);
}

/**
 * A variant's picture as a skeleton: the variant's own tree with its type's
 * effective values (parameter_defaults under its own props), so two variants
 * that differ look apart. Text is bars, a heading a thicker bar, a picture a
 * tinted box, a button an accent pill (outlined when it is outlined), an icon
 * or an icon button an accent dot, a badge a short pill, a section its
 * background and width, a grid its columns, a spacer a gap.
 * [{kind, columns?, look?, background?, width?, children?}]
 */
function skeletonOf(model, item) {
    const manifest = model.registry.types.get(item.type);
    if (!manifest) return [];
    const node = (0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(manifest) ? manifest.composed.root : model.sample(item);
    return node ? [shapeOf(node, model)] : [];
}

function columnsOf(value) {
    if (Number.isInteger(value)) return value;
    if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_3__.isPlainObject)(value)) return Number(value.lg ?? value.md ?? value.xs ?? 1) || 1;
    return 1;
}

/** What a node prints: its own props over its type's parameter defaults. */
function propsOf(node, model) {
    const manifest = model.registry.types.get(node.type);
    return _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].effectiveProps ? _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].effectiveProps(node, manifest) : (node.props ?? {});
}

/** A row of `columns` cells holding the children, empty cells where a column has none. */
function rowOf(columns, children, cell = {kind: "cell"}) {
    const count = Math.max(1, Math.min(4, columns));
    const cells = Array.from({length: count}, (_, index) => children[index] ?? cell);
    return {kind: "row", columns: count, children: cells};
}

function shapeOf(node, model) {
    const children = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_3__.childrenOf)(node).map((child) => shapeOf(child.node, model));
    const props = propsOf(node, model);
    switch (node.type) {
    case "content.heading": return {kind: "heading", level: node.data?.level ?? 2};
    case "content.paragraph":
    case "content.list-item": return {kind: "text"};
    case "content.list": return {kind: "list", children};
    case "content.figure":
    case "content.media": return {kind: "picture", children};
    case "content.divider": return {kind: "line"};
    case "content.code":
    case "content.table": return {kind: "box"};
    case "content.card": return {kind: "card"};
    case "element.button": return {kind: "button", look: props.appearance === "outline" ? "outline" : "fill", icon: Boolean(props.icon)};
    case "element.button-icon":
    case "element.icon": return {kind: "dot"};
    case "element.badge": return {kind: "badge"};
    case "layout.spacer": return {kind: "gap"};
    case "form.input":
    case "form.select": return {kind: "field"};
    case "form.textarea": return {kind: "field", tall: true};
    case "form.checkbox":
    case "form.switch": return {kind: "text"};
    case "form.form": return {kind: "stack", children: children.length ? children : [{kind: "field"}, {kind: "field"}, {kind: "button", look: "fill"}]};
    case "layout.area": return {kind: "stack", children: children.length ? children : [{kind: "heading", level: 3}, {kind: "text"}, {kind: "text"}]};
    case "layout.columns": return rowOf(children.length || columnsOf(props.columns), children);
    case "layout.grid": return rowOf(columnsOf(props.columns), children.length ? children : [], {kind: "card"});
    case "layout.section":
    case "layout.container": {
        const columns = columnsOf(props.columns);
        const inner = columns > 1 ? [rowOf(columns, children)] : children.length ? children : [{kind: "box"}];
        return {kind: "section", background: String(props.background ?? "none"), width: String(props.width ?? "full"), children: inner};
    }
    default: {
        if (/button/u.test(node.type)) return {kind: "button", look: "fill"};
        const columns = columnsOf(props.columns ?? props.cols);
        // A block with data draws its records as the variant lays them out:
        // cards in its columns, or one under another, below its own slots (an
        // intro heading). Variants that differ by their columns so look apart.
        if (model.registry.types.get(node.type)?.data_bindings) {
            const records = columns > 1
                ? {kind: "row", columns: Math.min(4, columns), children: Array.from({length: Math.min(4, columns)}, () => ({kind: "card"}))}
                : {kind: "stack", children: [{kind: "card"}, {kind: "card"}]};
            return children.length ? {kind: "stack", children: [...children, records]} : records;
        }
        if (!children.length) return {kind: "box"};
        return columns > 1 ? {kind: "row", columns, children} : {kind: "stack", children};
    }
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "50d340b22253"
(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditorModel: () => (/* binding */ EditorModel),
/* harmony export */   MAX_COLUMNS: () => (/* binding */ MAX_COLUMNS),
/* harmony export */   ORIGINS: () => (/* binding */ ORIGINS),
/* harmony export */   SCREENS: () => (/* binding */ SCREENS),
/* harmony export */   VARIANT_EXTENSION: () => (/* binding */ VARIANT_EXTENSION),
/* harmony export */   coerce: () => (/* binding */ coerce),
/* harmony export */   compareVersions: () => (/* binding */ compareVersions),
/* harmony export */   emptyDocument: () => (/* binding */ emptyDocument),
/* harmony export */   fieldSection: () => (/* binding */ fieldSection),
/* harmony export */   inlineToMarkdown: () => (/* binding */ inlineToMarkdown),
/* harmony export */   normalizeRights: () => (/* binding */ normalizeRights),
/* harmony export */   refusedClasses: () => (/* binding */ refusedClasses),
/* harmony export */   slugify: () => (/* binding */ slugify),
/* harmony export */   text: () => (/* binding */ text)
/* harmony export */ });
/* harmony import */ var _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("32dfc4431a24");
/* harmony import */ var _core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b88de35f4919");
/* harmony import */ var _core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("e2cb52b018e5");
/* harmony import */ var _core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("e66d878fb4f8");
/* harmony import */ var _tree_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("c584913fd94f");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
// The model of sf-editor: one Composition Document, the choice by depth, one
// undo history for typing and structure, the rights the host gave, and every
// change the editor makes (insert, move, split into columns, a parameter, a
// binding, a site block). No DOM here: the element draws what this holds and
// calls these methods, and the unit tests drive the same methods.
//
// The Document is composition-document v1, unchanged. Layout and text are one
// tree (page -> section -> columns -> area -> paragraph): text areas are
// `layout.area` nodes, the site template is the regions around the page's
// `main` region, a site block is a composed type (Part A, ui-source
// a0b7f2ec). The one thing the editor writes of its own is the variant a
// block was inserted from, in the node's extension `simai.composition:variant`, so
// the parameter panel can say a value came from the variant.






const VARIANT_EXTENSION = "simai.composition:variant";
/** The three screens of the editor and the breakpoint each one edits (phone has no prefix). */
const SCREENS = Object.freeze({phone: "xs", tablet: "md", desktop: "lg"});
/** Where a parameter's value comes from, each layer over the one before. */
const ORIGINS = Object.freeze(["type", "theme", "variant", "block", "screen"]);
const MAX_COLUMNS = 4;
/** The breakpoints the editor's screens edit, narrowest first. */
const EDITOR_BREAKPOINTS = Object.freeze(["xs", "md", "lg"]);
const UNDO_DEPTH = 200;
const TYPING_PAUSE = 800;
const DOCUMENT = {schema: "simai.composition.document", schema_version: 1};

const text = (value) => (value ? [{type: "text", value}] : []);
const refused = (reason) => ({ok: false, reason});
const done = (extra = {}) => ({ok: true, ...extra});

/** An empty page: one section with one text area and one line to type in. */
function emptyDocument(id = "page") {
    return {
        ...DOCUMENT, id, profile: "ui-layout",
        root: {id: "root", type: "layout.page", slots: {default: [
            {id: "s1", type: "layout.section", props: {width: "normal"}, slots: {default: [
                {id: "a1", type: "layout.area", slots: {default: [{id: "p1", type: "content.paragraph", data: {content: []}}]}},
            ]}},
        ]}},
    };
}

/** The rights the host gave; nothing given is the full set (a designer). */
function normalizeRights(rights) {
    const given = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(rights) ? rights : {};
    return {
        layout: given.layout !== false,
        template: given.template !== false,
        builder: given.builder !== false && given.layout !== false,
        reasons: (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(given.reasons) ? {...given.reasons} : {},
    };
}

class EditorModel {
    /**
     * options: {document, types, renderers, editorManifests, siteBlocks, rights, theme, now}
     * types are a host's type manifests; siteBlocks the site's composed types.
     */
    constructor(options = {}) {
        this.now = options.now ?? (() => Date.now());
        this.listeners = new Set();
        this.types = Array.isArray(options.types) ? options.types : [];
        this.siteBlocks = Array.isArray(options.siteBlocks) ? options.siteBlocks : [];
        this.renderers = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(options.renderers) ? options.renderers : {};
        this.editorManifests = Array.isArray(options.editorManifests) ? options.editorManifests : [];
        this.rights = normalizeRights(options.rights);
        this.theme = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(options.theme) ? options.theme : null;
        this.templateEditing = false;
        this.buildRegistry();
        this.setDocument(options.document);
    }

    // ------------------------------------------------------------ setup

    buildRegistry() {
        // The newest version of each site block stands in the catalogue; a host
        // keeps older ones only while a Document names them.
        const latest = new Map();
        for (const manifest of this.siteBlocks) {
            const have = latest.get(manifest?.type);
            if (!have || compareVersions(manifest.version, have.version) > 0) latest.set(manifest.type, manifest);
        }
        const own = this.types.filter((manifest) => !latest.has(manifest?.type));
        try {
            this.registry = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].extendRegistry([...own, ...latest.values()], this.renderers);
        } catch {
            this.registry = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].extendRegistry([], this.renderers);
        }
        this.canvasRegistry = canvasRegistry(this.registry);
    }

    setTypes({types, siteBlocks, renderers, editorManifests} = {}) {
        if (types !== undefined) this.types = Array.isArray(types) ? types : [];
        if (siteBlocks !== undefined) this.siteBlocks = Array.isArray(siteBlocks) ? siteBlocks : [];
        if (renderers !== undefined) this.renderers = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(renderers) ? renderers : {};
        if (editorManifests !== undefined) this.editorManifests = Array.isArray(editorManifests) ? editorManifests : [];
        this.buildRegistry();
    }

    setRights(rights) {
        this.rights = normalizeRights(rights);
        if (!this.rights.template) this.templateEditing = false;
    }

    setTheme(theme) {
        this.theme = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(theme) ? theme : null;
    }

    setDocument(document) {
        this.doc = document && (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(document.root) ? (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(document) : emptyDocument();
        this.next = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.idMaker)(this.doc.root, "e");
        this.selected = null;
        this.typing = null;
        this.undoStack = [];
        this.redoStack = [];
        this.typingKey = "";
        this.typingUntil = 0;
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    changed(reason, extra = {}) {
        for (const listener of this.listeners) listener({reason, scope: this.templateEditing ? "template" : "page", ...extra});
    }

    manifestOf(type) {
        return this.registry.types.get(type);
    }

    node(id) {
        return this.place(id)?.node ?? null;
    }

    /** Where a node stands; a drawn id of a site block's part stands for the instance. */
    place(id) {
        if (!id) return null;
        const own = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        if (own) return own;
        const at = String(id).indexOf(":");
        return at === -1 ? null : (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, String(id).slice(0, at));
    }

    // ------------------------------------------------------------ template and rights

    /** 'template' (a region of the site template), 'frame' (the regions themselves) or 'page'. */
    scopeOf(id) {
        const at = this.place(id);
        if (!at) return "page";
        const chain = [...at.ancestors, at.node];
        const region = [...chain].reverse().find((node) => node.type === "layout.region");
        if (region) return region.props?.landmark === "main" ? "page" : "template";
        if (chain.some((node) => node.type === "layout.regions") || (this.hasRegions() && at.node === this.doc.root)) return "frame";
        return "page";
    }

    hasRegions() {
        let found = false;
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(this.doc.root, (node) => {
            if (node.type === "layout.regions") found = true;
            return !found;
        });
        return found;
    }

    /** Whether a node stands inside a text area (an author's place to write). */
    insideArea(id) {
        const at = this.place(id);
        if (!at) return false;
        if (this.doc.root.type === "content.document") return at.node !== this.doc.root;
        return at.ancestors.some((node) => node.type === "layout.area");
    }

    /**
     * Why a node cannot be changed, or null when it can: 'template' (the site
     * template, changed only through «Edit template»), 'page' (the page while
     * the template is edited), 'layout' (the layout, which the person has no
     * right to; an author writes only in text areas).
     */
    lockOf(id) {
        const scope = this.scopeOf(id);
        if ((scope === "template" || scope === "frame") && !this.templateEditing) return "template";
        if (scope === "page" && this.templateEditing) return "page";
        if (!this.rights.layout && !this.insideArea(id)) return "layout";
        return null;
    }

    /** Why a place (a slot of a node) cannot take, lose or reorder children, or null. */
    placeLock(parentId) {
        const parent = this.node(parentId);
        if (!parent) return "unknown";
        const scope = this.scopeOf(parentId);
        if ((scope === "template" || scope === "frame") && !this.templateEditing) return "template";
        if (scope === "page" && this.templateEditing) return "page";
        if (!this.rights.layout && parent.type !== "layout.area" && !this.insideArea(parentId)) return "layout";
        return null;
    }

    editTemplate(on) {
        if (on && !this.rights.template) return refused("rights");
        this.finishTyping();
        this.templateEditing = Boolean(on);
        this.selected = null;
        this.typing = null;
        this.changed("template-mode", {silent: true});
        return done();
    }

    // ------------------------------------------------------------ choice by depth

    isText(id) {
        const node = this.textNode(id);
        return Boolean(node && (0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.textFields)(this.manifestOf(node.type)).length);
    }

    /** The node a drawn id edits text of: a part of a site block is its tree node. */
    textNode(id) {
        const own = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id)?.node;
        if (own) return own;
        const at = String(id).indexOf(":");
        if (at === -1) return null;
        const instance = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, String(id).slice(0, at))?.node;
        const manifest = instance && this.manifestOf(instance.type);
        if (!(0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(manifest)) return null;
        let found = null;
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(manifest.composed.root, (node) => {
            if (node.id === String(id).slice(at + 1)) found = node;
        });
        return found;
    }

    select(id) {
        this.finishTyping();
        const at = id ? this.place(id) : null;
        this.selected = at ? at.node.id : null;
        this.typing = null;
        return done({id: this.selected});
    }

    /** Starts typing in a node's text field: {id, key}; the id may be a site block's part. */
    startTyping(id, key = null) {
        const node = this.textNode(id);
        const fields = node ? (0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.textFields)(this.manifestOf(node.type)) : [];
        const field = key ?? fields[0];
        if (!field || !fields.includes(field)) return refused("not-text");
        const lock = this.lockOf(id);
        if (lock) return refused(lock);
        this.typing = {id, key: field};
        this.selected = this.place(id).node.id;
        return done();
    }

    finishTyping() {
        this.typingUntil = 0;
        this.typingKey = "";
    }

    /** The chain from the outermost block a person can choose down to the node. */
    pathOf(id) {
        const at = this.place(id);
        if (!at) return [];
        return [...at.ancestors, at.node].filter((node) => this.choosable(node));
    }

    choosable(node) {
        return node !== this.doc.root && !["layout.regions", "layout.region"].includes(node.type);
    }

    /** Esc: one level up -- text to its block, a block to its container, up to the section. */
    up() {
        if (this.typing) {
            const id = this.place(this.typing.id).node.id;
            this.finishTyping();
            this.typing = null;
            this.selected = id;
            return done({id});
        }
        if (!this.selected) return refused("none");
        const path = this.pathOf(this.selected);
        const parent = path.at(-2) ?? null;
        this.selected = parent ? parent.id : null;
        return done({id: this.selected});
    }

    /** Enter: one level down -- into the first child, or into the text. */
    down() {
        if (!this.selected) {
            const first = this.firstChoosable(this.doc.root);
            if (!first) return refused("empty");
            this.selected = first.id;
            return done({id: first.id});
        }
        const node = this.node(this.selected);
        if (this.isText(node.id) && !(0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(this.manifestOf(node.type))) {
            const started = this.startTyping(node.id);
            return started.ok ? done({id: node.id, typing: true}) : started;
        }
        if ((0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(this.manifestOf(node.type))) return refused("closed");
        const child = this.firstChoosable(node);
        if (!child) return refused("leaf");
        this.selected = child.id;
        return done({id: child.id});
    }

    firstChoosable(node) {
        for (const child of (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.childrenOf)(node)) {
            if (this.choosable(child.node)) return child.node;
            const deeper = this.firstChoosable(child.node);
            if (deeper) return deeper;
        }
        return null;
    }

    lastChoosable(node) {
        for (const child of (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.childrenOf)(node).reverse()) {
            if (this.choosable(child.node)) return child.node;
            const deeper = this.lastChoosable(child.node);
            if (deeper) return deeper;
        }
        return null;
    }

    /**
     * ↑ ↓ on the canvas: the block before or after a block among its
     * siblings. A container a person cannot choose (a region of the site
     * template) is no wall: past its last block ↓ goes on to the next
     * region's first. Inside a block the arrows stay among its children (Esc
     * goes up). With nothing chosen, ↓ takes the first block a person can
     * work on and ↑ the last. Returns the id, or null when there is none.
     */
    neighbour(id, delta) {
        if (!id || !this.place(id)) return this.openEnd(delta);
        let at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, this.place(id).node.id);
        while (at?.parent) {
            const list = at.parent.slots[at.slot];
            for (let index = at.index + delta; index >= 0 && index < list.length; index += delta) {
                const node = list[index];
                if (this.choosable(node)) return node.id;
                const inside = delta > 0 ? this.firstChoosable(node) : this.lastChoosable(node);
                if (inside) return inside.id;
            }
            if (this.choosable(at.parent)) return null;
            at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, at.parent.id);
        }
        return null;
    }

    /** The first (or last) block a person can choose and change; a locked one when every block is locked. */
    openEnd(delta = 1) {
        // The outermost choosable blocks, in page order: ↑ starts at the last section, not inside it.
        const all = [];
        const visit = (node) => {
            if (this.choosable(node)) {
                all.push(node);
                return;
            }
            for (const list of Object.values(node?.slots ?? {})) for (const child of list) visit(child);
        };
        visit(this.doc.root);
        if (delta < 0) all.reverse();
        return (all.find((node) => !this.lockOf(node.id)) ?? all[0])?.id ?? null;
    }

    isColumnArea(id) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        return Boolean(at?.parent?.type === "layout.columns");
    }

    // ------------------------------------------------------------ history

    snapshot() {
        return {doc: JSON.stringify(this.doc), selected: this.selected, typing: this.typing ? {...this.typing} : null};
    }

    /** Before a change of structure or a parameter: one step back. */
    remember() {
        this.undoStack.push(this.snapshot());
        if (this.undoStack.length > UNDO_DEPTH) this.undoStack.shift();
        this.redoStack = [];
        this.typingUntil = 0;
        this.typingKey = "";
    }

    /** Before typing: one step for a run of typing in one field, not one per letter. */
    rememberTyping(key) {
        const now = this.now();
        if (now > this.typingUntil || key !== this.typingKey) {
            this.undoStack.push(this.snapshot());
            if (this.undoStack.length > UNDO_DEPTH) this.undoStack.shift();
            this.redoStack = [];
        }
        this.typingKey = key;
        this.typingUntil = now + TYPING_PAUSE;
    }

    restore(from, to) {
        const step = from.pop();
        if (!step) return refused("empty");
        to.push(this.snapshot());
        this.typingUntil = 0;
        this.typingKey = "";
        this.doc = JSON.parse(step.doc);
        this.next = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.idMaker)(this.doc.root, "e");
        this.selected = step.selected && this.place(step.selected) ? step.selected : null;
        this.typing = step.typing && this.place(step.typing.id) ? step.typing : null;
        this.changed("history");
        return done();
    }

    undo() {
        return this.restore(this.undoStack, this.redoStack);
    }

    redo() {
        return this.restore(this.redoStack, this.undoStack);
    }

    get canUndo() {
        return this.undoStack.length > 0;
    }

    get canRedo() {
        return this.redoStack.length > 0;
    }

    // ------------------------------------------------------------ text

    /** The inline value of a text field; a site block's part reads the instance's text first. */
    textOf(id, key) {
        const at = String(id).indexOf(":");
        if (at !== -1 && !(0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id)) {
            const instance = this.place(id)?.node;
            const own = instance?.data?.texts?.[`${String(id).slice(at + 1)}/${key}`];
            if (Array.isArray(own)) return own;
        }
        const node = this.textNode(id);
        const value = node?.data?.[key];
        return Array.isArray(value) ? value : [];
    }

    /** Typing: the field's new inline content. One undo step per run of typing. */
    setText(id, key, content) {
        if (this.lockOf(id)) return refused(this.lockOf(id));
        const value = (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.normalizeInline)(content);
        if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(value, this.textOf(id, key))) return done({same: true});
        this.rememberTyping(`${id}/${key}`);
        this.writeText(id, key, value);
        this.changed("typing");
        return done();
    }

    writeText(id, key, value) {
        const own = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id)?.node;
        if (own) {
            own.data ??= {};
            own.data[key] = value;
            return;
        }
        const at = String(id).indexOf(":");
        const instance = this.place(id).node;
        instance.data ??= {};
        instance.data.texts ??= {};
        instance.data.texts[`${String(id).slice(at + 1)}/${key}`] = value;
    }

    /**
     * Enter in a text block: the words after the caret go to a new block
     * after it (a new item in a list). Enter on an empty last item leaves the
     * list. Returns {ok, id} of the block the caret goes to.
     */
    splitText(id, offset) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        if (!at?.parent || this.lockOf(id)) return refused(this.lockOf(id) ?? "unknown");
        const node = at.node;
        const content = this.textOf(id, "content");
        if (node.type === "content.list-item" && !(0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.inlineLength)(content) && at.index === at.parent.slots[at.slot].length - 1) {
            const list = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, at.parent.id);
            if (!list?.parent) return refused("unknown");
            this.remember();
            (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.removeAt)(at.parent, at.slot, at.index);
            const paragraph = {id: this.next(), type: "content.paragraph", data: {content: []}};
            if (!at.parent.slots[at.slot].length) (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.removeAt)(list.parent, list.slot, list.index);
            const stay = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, at.parent.id);
            if (stay) (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.insertAt)(stay.parent, stay.slot, stay.index + 1, paragraph);
            else (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.insertAt)(list.parent, list.slot, list.index, paragraph);
            this.typing = {id: paragraph.id, key: "content"};
            this.selected = paragraph.id;
            this.changed("split");
            return done({id: paragraph.id, offset: 0});
        }
        if (!["content.paragraph", "content.heading", "content.list-item"].includes(node.type)) return refused("not-text");
        this.remember();
        const before = (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.sliceInline)(content, 0, offset);
        const after = (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.sliceInline)(content, offset, (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.inlineLength)(content));
        node.data = {...(node.data ?? {}), content: (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.normalizeInline)(before)};
        const type = node.type === "content.list-item" ? "content.list-item" : "content.paragraph";
        const fresh = {id: this.next(), type, data: {content: (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.normalizeInline)(after)}};
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.insertAt)(at.parent, at.slot, at.index + 1, fresh);
        this.typing = {id: fresh.id, key: "content"};
        this.selected = fresh.id;
        this.changed("split");
        return done({id: fresh.id, offset: 0});
    }

    /** Backspace at a text block's start: it joins the text block before it. */
    joinBack(id) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        if (!at?.parent || at.index === 0 || this.lockOf(id)) return refused(this.lockOf(id) ?? "first");
        const previous = at.parent.slots[at.slot][at.index - 1];
        const joinable = ["content.paragraph", "content.heading", "content.list-item"];
        if (!joinable.includes(previous.type) || !joinable.includes(at.node.type)) return refused("not-text");
        this.remember();
        const before = this.textOf(previous.id, "content");
        const offset = (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.inlineLength)(before);
        previous.data = {...(previous.data ?? {}), content: (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.normalizeInline)([...before, ...this.textOf(id, "content")])};
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.removeAt)(at.parent, at.slot, at.index);
        this.typing = {id: previous.id, key: "content"};
        this.selected = previous.id;
        this.changed("join");
        return done({id: previous.id, offset});
    }

    /**
     * Markdown at the start of a paragraph turns it into a block: `- ` or
     * `* ` a list, `1. ` a numbered list, `#`..`###` a heading, `> ` a quote.
     * One undo returns the paragraph. Returns {ok, id} or {ok: false}.
     */
    markdownShortcut(id) {
        const node = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id)?.node;
        if (node?.type !== "content.paragraph") return refused("not-paragraph");
        const content = this.textOf(id, "content");
        const typed = content.filter((entry) => entry.type === "text").map((entry) => entry.value).join("").replace(/\u00a0/gu, " ");
        const rules = [
            [/^(#{1,3}) /u, (match) => ({type: "content.heading", data: {level: match[1].length}})],
            [/^[-*] /u, () => ({type: "content.list"})],
            [/^1[.)] /u, () => ({type: "content.list", props: {ordered: true}})],
            [/^> /u, () => ({type: "content.quote"})],
        ];
        for (const [pattern, make] of rules) {
            const match = pattern.exec(typed);
            if (!match) continue;
            const rest = (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.sliceInline)(content, match[0].length, (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.inlineLength)(content));
            const made = make(match);
            const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
            if (!this.accepts(at.parent.id, at.slot, made.type)) return refused("place");
            this.remember();
            let fresh;
            let caret;
            if (made.type === "content.heading") {
                fresh = {id, type: made.type, data: {level: made.data.level, content: (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.normalizeInline)(rest)}};
                caret = fresh.id;
            } else if (made.type === "content.list") {
                const item = {id: this.next(), type: "content.list-item", data: {content: (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.normalizeInline)(rest)}};
                fresh = {id, type: made.type, ...(made.props ? {props: made.props} : {}), slots: {items: [item]}};
                caret = item.id;
            } else {
                const line = {id: this.next(), type: "content.paragraph", data: {content: (0,_core_js_composition_inline_model_mjs__WEBPACK_IMPORTED_MODULE_3__.normalizeInline)(rest)}};
                fresh = {id, type: made.type, slots: {default: [line]}};
                caret = line.id;
            }
            at.parent.slots[at.slot][at.index] = fresh;
            this.typing = {id: caret, key: "content"};
            this.selected = caret;
            this.changed("convert");
            return done({id: caret, offset: 0});
        }
        return refused("none");
    }

    // ------------------------------------------------------------ places and insert

    /** Whether a slot of a node accepts a type, by its declaration (Part A slotAccepts). */
    accepts(parentId, slot, type) {
        const parent = this.node(parentId);
        if (!parent) return false;
        const manifest = this.manifestOf(parent.type);
        if (!_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].slotAccepts(this.registry, manifest, slot, type)) return false;
        const max = manifest.slots?.[slot]?.max;
        return !(Number.isInteger(max) && (parent.slots?.[slot]?.length ?? 0) >= max);
    }

    /** The place right after a block: {parent, slot, index}. */
    placeAfter(id) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        return at?.parent ? {parent: at.parent.id, slot: at.slot, index: at.index + 1} : null;
    }

    /** The place at the end of a node's first slot (or the named one). */
    placeInside(id, slot) {
        const node = this.node(id);
        const manifest = node && this.manifestOf(node.type);
        const name = slot ?? Object.keys(manifest?.slots ?? {})[0];
        if (!name) return null;
        return {parent: node.id, slot: name, index: node.slots?.[name]?.length ?? 0};
    }

    /**
     * The default place a new block goes when nothing more is said: after the
     * chosen block if its slot takes it, else inside it, else at the end of
     * the first text area (or the page) that takes it.
     */
    placeFor(type) {
        const candidates = [];
        const chosen = this.selected ? (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, this.selected) : null;
        if (chosen?.parent) candidates.push(this.placeAfter(chosen.node.id));
        if (chosen) candidates.push(this.placeInside(chosen.node.id));
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(this.doc.root, (node) => {
            for (const slot of Object.keys(this.manifestOf(node.type)?.slots ?? {})) candidates.push({parent: node.id, slot, index: node.slots?.[slot]?.length ?? 0});
        });
        return candidates.find((place) => place && this.accepts(place.parent, place.slot, type) && !this.placeLock(place.parent)) ?? null;
    }

    /**
     * A new node from a catalogue choice: {type, variant?}. A variant brings
     * its props, data and children (ids renewed) and is remembered in the
     * node's extension so its values show as the variant's; a site block is
     * an instance (type and version); a type with nothing else gets what it
     * needs to be valid and a place to type.
     */
    make(choice) {
        const manifest = this.manifestOf(choice?.type);
        if (!manifest) return null;
        if ((0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(manifest)) return _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].composedInstance(manifest, this.next());
        if (choice.variant) {
            const node = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].instantiateVariant(manifest, choice.variant, {id: this.next(), makeId: () => this.next()});
            node.extensions = {...(node.extensions ?? {}), [VARIANT_EXTENSION]: {id: choice.variant}};
            return node;
        }
        return this.blank(choice.type, choice.options);
    }

    /** A node made for a picture or a check only: it takes no id of the page. */
    sample(choice) {
        const keep = this.next;
        let count = 0;
        this.next = () => `sample-${(count += 1)}`;
        try {
            return this.make(choice);
        } finally {
            this.next = keep;
        }
    }

    blank(type, options = {}) {
        const id = this.next();
        const paragraph = (content = []) => ({id: this.next(), type: "content.paragraph", data: {content}});
        switch (type) {
        case "content.paragraph": return {id, type, data: {content: options.content ?? []}};
        case "content.heading": return {id, type, data: {level: options.level ?? 2, content: []}};
        case "content.list": return {id, type, ...(options.ordered ? {props: {ordered: true}} : {}), slots: {items: [{id: this.next(), type: "content.list-item", data: {content: []}}]}};
        case "content.quote":
        case "content.alert":
        case "content.card": return {id, type, slots: {default: [paragraph()]}};
        case "content.details": return {id, type, props: {open: true}, data: {summary: []}, slots: {default: [paragraph()]}};
        case "content.code": return {id, type, data: {code: ""}};
        case "content.table": return {id, type, data: {rows: [[[], []], [[], []]]}};
        case "content.figure": return {id, type, data: {src: "", alt: ""}};
        case "content.media": return {id, type, data: {src: "", alt: ""}, slots: {default: [paragraph()]}};
        case "content.file": return {id, type, data: {href: ""}};
        case "content.steps": return {id, type, slots: {steps: [{id: this.next(), type: "content.step", data: {title: []}, slots: {default: []}}]}};
        case "content.tabs": return {id, type, slots: {tabs: [{id: this.next(), type: "content.tab", data: {label: "1"}, slots: {default: [paragraph()]}}]}};
        case "content.grid": return {id, type, slots: {default: [paragraph(), paragraph()]}};
        case "layout.area": return {id, type, slots: {default: [paragraph()]}};
        case "layout.section": return {id, type, slots: {default: [{id: this.next(), type: "layout.area", slots: {default: [paragraph()]}}]}};
        case "layout.columns": return {id, type, props: {columns: {xs: 1, md: 2}}, slots: {columns: [this.blank("layout.area"), this.blank("layout.area")]}};
        default: {
            const manifest = this.manifestOf(type);
            const node = {id, type};
            for (const [slot, rule] of Object.entries(manifest?.slots ?? {})) {
                if (!Number.isInteger(rule?.min) || rule.min < 1) continue;
                const fits = ["content.paragraph", "layout.area"].find((candidate) => _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].slotAccepts(this.registry, manifest, slot, candidate));
                if (fits) node.slots = {...(node.slots ?? {}), [slot]: Array.from({length: rule.min}, () => this.blank(fits))};
            }
            return node;
        }
        }
    }

    /** Inserts a node at a place, refusing what the place does not take or the rights do not allow. */
    insertNode(node, place) {
        if (!node || !place) return refused("unknown");
        const lock = this.placeLock(place.parent);
        if (lock) return refused(lock);
        if (!this.accepts(place.parent, place.slot, node.type)) return refused("place");
        this.remember();
        this.next.reserve?.(node);
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.insertAt)(this.node(place.parent), place.slot, place.index, node);
        this.selected = node.id;
        this.typing = null;
        const typing = this.typingTarget(node);
        if (typing) this.typing = typing;
        this.changed("insert", {id: node.id});
        return done({id: node.id, typing: Boolean(typing)});
    }

    /** Where the caret goes in a new block: its own text, else the first text inside. */
    typingTarget(node) {
        let found = null;
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(node, (current) => {
            if (found) return false;
            const fields = (0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.textFields)(this.manifestOf(current.type));
            if (fields.length && fields[0] === "content" && !(0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(this.manifestOf(current.type))) found = {id: current.id, key: "content"};
            return !found;
        });
        return found;
    }

    insert(choice, place = null) {
        const where = place ?? this.placeFor(choice?.type);
        if (!where) return refused("place");
        const node = this.make(choice);
        if (!node) return refused("unknown");
        return this.insertNode(node, where);
    }

    /**
     * / in text: the chosen block takes the place of the paragraph the slash
     * was typed in when that holds nothing else; otherwise it goes after it.
     */
    insertFromSlash(choice, paragraphId) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, paragraphId);
        if (!at?.parent) return refused("unknown");
        const words = this.textOf(paragraphId, "content").filter((entry) => entry.type === "text").map((entry) => entry.value).join("");
        const only = /^\/\S*$/u.test(words.trim()) || !words.trim();
        if (!only) return this.insert(choice, {parent: at.parent.id, slot: at.slot, index: at.index + 1});
        const node = this.make(choice);
        if (!node) return refused("unknown");
        if (this.placeLock(at.parent.id)) return refused(this.placeLock(at.parent.id));
        if (!this.accepts(at.parent.id, at.slot, node.type) && node.type !== "content.paragraph") return refused("place");
        this.remember();
        at.parent.slots[at.slot][at.index] = node;
        this.selected = node.id;
        this.typing = this.typingTarget(node);
        this.changed("insert", {id: node.id});
        return done({id: node.id, typing: Boolean(this.typing)});
    }

    remove(id) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        if (!at?.parent) return refused("unknown");
        const lock = this.placeLock(at.parent.id) ?? this.lockOf(id);
        if (lock) return refused(lock);
        const min = this.manifestOf(at.parent.type)?.slots?.[at.slot]?.min ?? 0;
        if (at.parent.slots[at.slot].length <= min) return refused("required");
        this.remember();
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.removeAt)(at.parent, at.slot, at.index);
        if (at.parent.type === "layout.columns") this.syncColumns(at.parent);
        const list = at.parent.slots[at.slot];
        this.selected = (list[Math.min(at.index, list.length - 1)] ?? at.parent).id;
        if (this.selected === this.doc.root.id) this.selected = null;
        this.typing = null;
        this.changed("remove", {id});
        return done({id: this.selected});
    }

    duplicate(id) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        if (!at?.parent) return refused("unknown");
        const lock = this.placeLock(at.parent.id);
        if (lock) return refused(lock);
        if (!this.accepts(at.parent.id, at.slot, at.node.type)) return refused("place");
        const copy = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.freshCopy)(at.node, this.next);
        this.remember();
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.insertAt)(at.parent, at.slot, at.index + 1, copy);
        if (at.parent.type === "layout.columns") this.syncColumns(at.parent);
        this.selected = copy.id;
        this.typing = null;
        this.changed("duplicate", {id: copy.id});
        return done({id: copy.id});
    }

    /** Moves a block to a place (a drop line); the place is read before the block leaves. */
    move(id, place) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        if (!at?.parent || !place) return refused("unknown");
        const lock = this.placeLock(at.parent.id) ?? this.placeLock(place.parent);
        if (lock) return refused(lock);
        if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(at.node, place.parent)) return refused("inside-itself");
        const sameSlot = place.parent === at.parent.id && place.slot === at.slot;
        if (!sameSlot && !this.accepts(place.parent, place.slot, at.node.type)) return refused("place");
        const index = sameSlot && place.index > at.index ? place.index - 1 : place.index;
        if (sameSlot && index === at.index) return refused("same");
        const min = this.manifestOf(at.parent.type)?.slots?.[at.slot]?.min ?? 0;
        if (!sameSlot && at.parent.slots[at.slot].length <= min) return refused("required");
        this.remember();
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.removeAt)(at.parent, at.slot, at.index);
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.insertAt)(this.node(place.parent), place.slot, index, at.node);
        for (const parent of [at.parent, this.node(place.parent)]) if (parent?.type === "layout.columns") this.syncColumns(parent);
        this.selected = id;
        this.changed("move", {id});
        return done({id, index});
    }

    /** Alt+↑↓ (and Alt+Shift+↑↓ while typing): one step among the siblings. */
    moveBy(id, delta) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, this.place(id)?.node.id);
        if (!at?.parent) return refused("unknown");
        const to = at.index + delta;
        if (to < 0 || to >= at.parent.slots[at.slot].length) return refused("edge");
        const typing = this.typing;
        const moved = this.move(at.node.id, {parent: at.parent.id, slot: at.slot, index: delta > 0 ? to + 1 : to});
        if (moved.ok && typing) this.typing = typing;
        return moved;
    }

    // ------------------------------------------------------------ columns

    /**
     * Splits a block into columns: it goes into the left column (or the
     * right with side 'left' for the other), the other column is empty with a
     * place to type, or holds `other` (a side drop). New columns show one
     * column on the phone (columns {xs: 1, md: 2}). One undo step.
     */
    splitColumns(id, {side = "right", other = null} = {}) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        if (!at?.parent) return refused("unknown");
        const lock = this.placeLock(at.parent.id) ?? (this.rights.layout ? null : "layout");
        if (lock) return refused(lock);
        let target = at;
        let carried = [at.node];
        let rest = null;
        // A block inside a text area: the area is split around it.
        if (!this.accepts(at.parent.id, at.slot, "layout.columns") && at.parent.type === "layout.area") {
            const area = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, at.parent.id);
            if (!area?.parent || !this.accepts(area.parent.id, area.slot, "layout.columns")) return refused("place");
            target = area;
            const list = area.node.slots.default;
            rest = {before: list.slice(0, at.index), after: list.slice(at.index + 1)};
            carried = [at.node];
        } else if (!this.accepts(at.parent.id, at.slot, "layout.columns")) return refused("place");
        this.remember();
        const wrap = (node) => (node.type === "layout.area" ? node : {id: this.next(), type: "layout.area", slots: {default: [node]}});
        const own = rest ? {id: this.next(), type: "layout.area", slots: {default: carried}} : wrap(at.node);
        const fresh = other ? wrap(other) : this.blank("layout.area");
        if (other) this.next.reserve?.(other);
        const columns = {id: this.next(), type: "layout.columns", props: {columns: {xs: 1, md: 2}}, slots: {columns: side === "left" ? [fresh, own] : [own, fresh]}};
        const list = target.parent.slots[target.slot];
        if (rest) {
            const replaced = [];
            if (rest.before.length) replaced.push({...target.node, slots: {...target.node.slots, default: rest.before}});
            replaced.push(columns);
            if (rest.after.length) replaced.push({id: this.next(), type: "layout.area", ...(target.node.props ? {props: (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(target.node.props)} : {}), slots: {default: rest.after}});
            list.splice(target.index, 1, ...replaced);
        } else list.splice(target.index, 1, columns);
        this.selected = columns.id;
        this.typing = null;
        this.changed("columns", {id: columns.id});
        return done({id: columns.id});
    }

    /** Adds a column to a columns block, up to four; the phone keeps its own value. */
    addColumn(columnsId, index = null) {
        const node = this.node(columnsId);
        if (node?.type !== "layout.columns") return refused("unknown");
        const lock = this.placeLock(columnsId);
        if (lock) return refused(lock);
        const list = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.slotList)(node, "columns");
        if (list.length >= MAX_COLUMNS) return refused("limit");
        this.remember();
        const area = this.blank("layout.area");
        list.splice(index ?? list.length, 0, area);
        this.syncColumns(node);
        this.selected = area.id;
        this.typing = this.typingTarget(area);
        this.changed("columns", {id: area.id});
        return done({id: area.id});
    }

    /**
     * A side drop: `dragId` stands beside `targetId`. Inside a column it adds
     * a column next to that one (up to four); elsewhere the two are split
     * into two columns.
     */
    dropBeside(dragId, targetId, side = "right") {
        if (dragId === targetId) return refused("same");
        const drag = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, dragId);
        const target = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, targetId);
        if (!drag?.parent || !target?.parent) return refused("unknown");
        if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(drag.node, targetId)) return refused("inside-itself");
        const lock = this.placeLock(drag.parent.id) ?? this.placeLock(target.parent.id) ?? (this.rights.layout ? null : "layout");
        if (lock) return refused(lock);
        const column = target.parent.type === "layout.area" ? (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, target.parent.id) : null;
        if (column?.parent?.type === "layout.columns") {
            const columns = column.parent;
            if (columns.slots.columns.length >= MAX_COLUMNS) return refused("limit");
            this.remember();
            (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.removeAt)(drag.parent, drag.slot, drag.index);
            const area = drag.node.type === "layout.area" ? drag.node : {id: this.next(), type: "layout.area", slots: {default: [drag.node]}};
            const at = columns.slots.columns.findIndex((entry) => entry.id === column.node.id);
            columns.slots.columns.splice(side === "left" ? at : at + 1, 0, area);
            this.syncColumns(columns);
            this.selected = drag.node.id;
            this.changed("columns", {id: columns.id});
            return done({id: columns.id});
        }
        // Split: the dragged block leaves its place first, in the same step.
        const before = this.snapshot();
        const moved = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.removeAt)(drag.parent, drag.slot, drag.index);
        const result = this.splitColumns(targetId, {side, other: moved});
        if (!result.ok) {
            this.doc = JSON.parse(before.doc);
            return result;
        }
        // splitColumns remembered the Document without the dragged block: the step back is to before the drag.
        this.undoStack[this.undoStack.length - 1] = before;
        return result;
    }

    /** Whether a type may stand beside a block in a column of its own (a side drop): a column is a text area. */
    standsBeside(type) {
        if (!type || ["layout.section", "layout.columns"].includes(type)) return false;
        return _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].slotAccepts(this.registry, this.manifestOf("layout.area"), "default", type);
    }

    /**
     * A new block from the catalogue dropped at a block's side (a library card
     * pulled to its edge): as a side drop, in one step -- inside a column it
     * stands in a new column beside that one (up to four), elsewhere the two
     * are split into two columns. Returns {ok, id} of the new block.
     */
    /**
     * The block a side drop stands beside: the block itself, or, for a block inside
     * another (a paragraph in a quote), the nearest outer block that stands in an
     * area or a place that takes columns. Containers and layout give none.
     */
    besideTarget(id) {
        let at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        while (at?.parent) {
            if (/^layout\./u.test(at.node.type)) return null;
            if (at.parent.type === "layout.area" || this.accepts(at.parent.id, at.slot, "layout.columns")) return at.node.id;
            at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, at.parent.id);
        }
        return null;
    }

    insertBeside(choice, targetId, side = "right") {
        targetId = this.besideTarget(targetId) ?? targetId;
        const target = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, targetId);
        if (!target?.parent) return refused("unknown");
        const lock = this.placeLock(target.parent.id) ?? (this.rights.layout ? null : "layout");
        if (lock) return refused(lock);
        if (!this.standsBeside(choice?.type)) return refused("place");
        const node = this.make(choice);
        if (!node) return refused("unknown");
        const column = target.parent.type === "layout.area" ? (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, target.parent.id) : null;
        if (column?.parent?.type === "layout.columns") {
            const columns = column.parent;
            if (columns.slots.columns.length >= MAX_COLUMNS) return refused("limit");
            this.remember();
            const area = node.type === "layout.area" ? node : {id: this.next(), type: "layout.area", slots: {default: [node]}};
            const at = columns.slots.columns.findIndex((entry) => entry.id === column.node.id);
            columns.slots.columns.splice(side === "left" ? at : at + 1, 0, area);
            this.syncColumns(columns);
            this.selected = node.id;
            this.typing = this.typingTarget(node);
            this.changed("columns", {id: columns.id});
            return done({id: node.id, typing: Boolean(this.typing)});
        }
        const result = this.splitColumns(targetId, {side, other: node});
        if (!result.ok) return result;
        this.selected = node.id;
        this.typing = this.typingTarget(node);
        return done({id: node.id, columns: result.id, typing: Boolean(this.typing)});
    }

    /** The columns parameter follows the number of columns; the phone keeps its own value. */
    syncColumns(node) {
        const count = node.slots?.columns?.length ?? 0;
        if (!count) return;
        node.props ??= {};
        const current = node.props.columns;
        if ((0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(current)) {
            const wider = Object.keys(current).filter((key) => key !== "xs");
            if (wider.length) for (const key of wider) current[key] = count;
            else current.md = count;
            if (count === 1) node.props.columns = 1;
        } else node.props.columns = count === 1 ? 1 : {xs: 1, md: count};
    }

    // ------------------------------------------------------------ parameters

    /** The editor manifest of a node's type: a host's for the type, else the Framework's; with its parameter sets. */
    editorManifest(type) {
        const manifest = this.manifestOf(type);
        if (!manifest) return null;
        const identity = (entry) => entry?.type === manifest.type && entry?.type_version === manifest.version;
        let editor = this.editorManifests.find(identity) ?? _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_EDITOR_MANIFESTS.find(identity);
        if (!editor && Array.isArray(manifest.parameter_sets) && manifest.parameter_sets.length) {
            editor = {schema: "simai.composition.editor-manifest", schema_version: 1, type: manifest.type, type_version: manifest.version, fields: []};
        }
        return editor ? _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].withParameterSetFields(editor, _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.BUILTIN_TYPE_MANIFESTS.find(identity) ?? manifest) : null;
    }

    variantOf(node) {
        const id = node?.extensions?.[VARIANT_EXTENSION]?.id;
        return id ? (this.manifestOf(node.type)?.variants ?? []).find((variant) => variant.id === id) ?? null : null;
    }

    themeValue(type, key) {
        const defaults = this.theme?.defaults;
        if (!(0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(defaults)) return undefined;
        if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(defaults[type]) && Object.hasOwn(defaults[type], key)) return defaults[type][key];
        if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(defaults["*"]) && Object.hasOwn(defaults["*"], key)) return defaults["*"][key];
        return undefined;
    }

    /**
     * The fields of a node's parameter form, at a screen (xs, md or lg): each
     * with its kind, value there, where the value comes from (type, theme,
     * variant, block, screen), the inherited value a reset returns to, and the
     * screens whose value differs. A site block's form is its exposed list.
     */
    fields(id, screen = "xs") {
        const node = this.node(id);
        const manifest = node && this.manifestOf(node.type);
        if (!manifest) return [];
        let projected;
        let editor;
        if ((0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(manifest)) {
            const form = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].composedEditorFields(manifest, node, {registry: this.registry, editorManifests: this.editorManifests});
            projected = form.fields;
            editor = form.manifest;
        } else {
            editor = this.editorManifest(node.type);
            if (!editor) return [];
            projected = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].projectEditorFields(editor, manifest, node).fields;
        }
        const properties = manifest.props_schema?.properties ?? {};
        return projected.filter((field) => field.visibility !== "hidden" && (field.plane === "props" || field.plane === "data"))
            .filter((field) => !(field.plane === "data" && ["content", "summary", "title", "caption"].includes(field.target)))
            .map((field) => this.describeField(node, manifest, field, properties[field.target], screen));
    }

    describeField(node, manifest, field, schema, screen) {
        const kind = Array.isArray(field.choices) ? "choice" : field.property?.type === "boolean" ? "toggle" : field.property?.type === "integer" ? "integer" : "text";
        const responsive = field.plane === "props" && (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isResponsive)(schema);
        // What the type draws without a value is its schema's default; the
        // editor field's default is only what the form offers first.
        // Since core.runtime 1.26.0 a type may print values unset
        // (parameter_defaults): that is the type's value here, per screen.
        const defaults = field.plane === "props" && (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(manifest?.parameter_defaults) ? manifest.parameter_defaults : {};
        const typeDefault = Object.hasOwn(defaults, field.target) ? atScreen(defaults[field.target], schema, responsive, screen) : schema && "default" in schema ? schema.default : undefined;
        const themed = field.plane === "props" ? this.themeValue(node.type, field.target) : undefined;
        const theme = themed === undefined ? undefined : atScreen(themed, schema, responsive, screen);
        const variant = this.variantOf(node);
        const variantValue = field.plane === "props" ? variant?.props?.[field.target] : variant?.data?.[field.target];
        const plane = node[field.plane];
        const own = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(plane) && Object.hasOwn(plane, field.target) ? plane[field.target] : undefined;
        // What a reset returns to follows the origin chain the dot shows: a
        // block made from a variant goes back to the variant's value, then to
        // the theme's, then to the type's (1.2.0, the ui-editor host's G-21).
        const variantAt = variantValue === undefined ? undefined : atScreen(variantValue, schema, responsive, screen);
        const above = theme !== undefined ? theme : typeDefault;
        // `inherited` is what writing leaves unwritten (the theme's or the
        // type's); `resetTo` is what the reset shows it returns to.
        const inherited = above;
        const resetTo = own !== undefined && variantValue !== undefined && !(0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(own, variantValue) && variantAt !== undefined ? variantAt : above;
        let value = above !== undefined ? above : field.default;
        let origin = theme !== undefined ? "theme" : "type";
        if (own !== undefined) {
            if (responsive && (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(own)) {
                const order = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.UTILITY_BREAKPOINTS.slice(0, _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.UTILITY_BREAKPOINTS.indexOf(screen) + 1);
                const decided = [...order].reverse().find((key) => key in own);
                if (decided) {
                    value = own[decided];
                    // The phone's value is the block's own unless other screens differ
                    // from it: then, seen on the phone, it is the phone's.
                    origin = decided !== "xs" || (screen === "xs" && Object.keys(own).length > 1) ? "screen" : "block";
                }
            } else {
                value = own;
                origin = "block";
            }
            if (variantValue !== undefined && (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(own, variantValue)) origin = "variant";
        }
        const screens = responsive && (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(own) ? Object.keys(own).filter((key) => key !== "xs") : [];
        return {
            key: field.key,
            target: field.target,
            plane: field.plane,
            kind,
            responsive,
            label_key: field.label_key,
            help_key: field.help_key,
            ...(Array.isArray(field.choices) ? {choices: field.choices} : {}),
            ...(kind === "integer" ? {min: field.constraints?.min ?? schema?.minimum ?? 0, max: field.constraints?.max ?? schema?.maximum ?? 100} : {}),
            value: value ?? null,
            origin,
            inherited: inherited ?? null,
            resetTo: resetTo ?? null,
            set: own !== undefined,
            screens,
            utility: describeUtility(schema),
            section: fieldSection(field, schema),
        };
    }

    /**
     * Sets a parameter at a screen. A responsive value is written per
     * breakpoint, and only where it changes (mobile first); a value equal to
     * what it inherits is not written at all.
     */
    setParam(id, key, value, screen = "xs") {
        const node = this.node(id);
        if (!node) return refused("unknown");
        const lock = this.lockOf(node.id);
        if (lock) return refused(lock);
        const field = this.fields(node.id, screen).find((entry) => entry.key === key);
        if (!field) return refused("unknown");
        const coerced = coerce(field, value);
        if (coerced === null) return refused("invalid");
        const before = JSON.stringify(node);
        const next = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(node);
        writeField(next, field, coerced.value, screen);
        if (JSON.stringify(next) === before) return done({same: true});
        this.remember();
        Object.assign(node, next);
        for (const plane of ["props", "data"]) if (!(plane in next)) delete node[plane];
        this.changed("parameter", {id: node.id, key});
        return done();
    }

    /**
     * «Reset to inherited», one step along the origin chain the dot shows: a
     * value set here on a block made from a variant goes back to the
     * variant's value (this screen's, when it differs by screen); the
     * variant's value, or one set on a block with no variant, is taken out,
     * so the theme's or the type's stands. The value of this screen (or the
     * block's own on the phone) is what is reset.
     */
    resetParam(id, key, screen = "xs") {
        const node = this.node(id);
        if (!node) return refused("unknown");
        const lock = this.lockOf(node.id);
        if (lock) return refused(lock);
        const field = this.fields(node.id, screen).find((entry) => entry.key === key);
        if (!field || !field.set) return refused("unknown");
        this.remember();
        const plane = node[field.plane];
        const own = plane[field.target];
        const variant = this.variantOf(node);
        const variantValue = field.plane === "props" ? variant?.props?.[field.target] : variant?.data?.[field.target];
        if (variantValue !== undefined && !(0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(own, variantValue)) {
            if (field.responsive && (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(own) && screen !== "xs") {
                // This screen goes back to the variant's value there.
                const wanted = (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(variantValue) ? variantValue[screen] : undefined;
                if (wanted === undefined) delete own[screen];
                else own[screen] = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(wanted);
                if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(own, variantValue) || ((0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(variantValue) === false && Object.keys(own).length === 1 && (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(own.xs, variantValue))) plane[field.target] = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(variantValue);
            } else plane[field.target] = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(variantValue);
            this.changed("parameter", {id: node.id, key});
            return done();
        }
        if (field.responsive && (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(own) && screen !== "xs") {
            delete own[screen];
            const left = Object.keys(own);
            if (!left.length) delete plane[field.target];
            else if (left.length === 1 && left[0] === "xs") plane[field.target] = own.xs;
        } else if (field.responsive && (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(own)) {
            delete own.xs;
            if (!Object.keys(own).length) delete plane[field.target];
        } else delete plane[field.target];
        if (!Object.keys(plane).length) delete node[field.plane];
        this.changed("parameter", {id: node.id, key});
        return done();
    }

    /** The block's own modifiers (the «Extra» field): Framework classes with a screen prefix. */
    modifiersOf(id) {
        const list = this.node(id)?.extensions?.[_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.MODIFIERS_EXTENSION]?.utilities;
        return Array.isArray(list) ? [...list] : [];
    }

    setModifiers(id, classes, rules) {
        const node = this.node(id);
        if (!node) return refused("unknown");
        const lock = this.lockOf(node.id);
        if (lock) return refused(lock);
        // A site block's instance takes only its exposed parameters (G-42).
        if ((0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(this.manifestOf(node.type))) return refused("closed");
        const list = [...new Set((Array.isArray(classes) ? classes : String(classes ?? "").split(/\s+/u)).map((value) => String(value).trim()).filter(Boolean))];
        const checked = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].checkModifiers(list, rules ? {rules} : {});
        if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(list, this.modifiersOf(id))) return done({dropped: checked.dropped});
        this.remember();
        if (list.length) node.extensions = {...(node.extensions ?? {}), [_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.MODIFIERS_EXTENSION]: {utilities: list}};
        else if (node.extensions) {
            delete node.extensions[_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.MODIFIERS_EXTENSION];
            if (!Object.keys(node.extensions).length) delete node.extensions;
        }
        this.changed("modifiers", {id: node.id});
        return done({dropped: checked.dropped});
    }

    // ------------------------------------------------------------ data

    /** The data a block takes: its host bindings and runtime states, with what is set. */
    dataOf(id) {
        const node = this.node(id);
        const manifest = node && this.manifestOf(node.type);
        if (!manifest) return {bindings: [], runtime: []};
        const bindings = Object.entries(manifest.data_bindings ?? {}).map(([target, entry]) => {
            const binding = (node.bindings ?? []).find((item) => item.target === target && item.owner !== "section") ?? null;
            const settings = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].bindingSettings(node, target) ?? {};
            return {target, shapes: entry.shapes, shape: settings.shape ?? entry.shapes[0], empty_key: entry.empty_key, binding, settings};
        });
        const runtime = Object.entries(manifest.runtime?.accepts ?? {}).map(([target, entry]) => {
            const binding = (node.bindings ?? []).find((item) => item.target === target && item.owner === "section") ?? null;
            return {target, shape: entry.shape, binding, publishers: this.publishers(node.id, entry.shape)};
        });
        return {bindings, runtime, publishes: Object.keys(manifest.runtime?.publishes ?? {})};
    }

    /** The blocks of the same section that publish a state of a shape: [{id, type, state}]. */
    publishers(id, shape) {
        const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, id);
        if (!at) return [];
        const section = [...at.ancestors].reverse().find((node) => node.type === "layout.section") ?? this.doc.root;
        const out = [];
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(section, (node) => {
            if (node.id === id) return;
            for (const [state, entry] of Object.entries(this.manifestOf(node.type)?.runtime?.publishes ?? {})) {
                if (entry.shape === shape) out.push({id: node.id, type: node.type, state});
            }
        });
        return out;
    }

    /** Binds a target to a host source (ref), or takes the binding away (ref empty). */
    setSource(id, target, ref, {owner = "host", revision} = {}) {
        const node = this.node(id);
        if (!node) return refused("unknown");
        if (this.lockOf(id)) return refused(this.lockOf(id));
        if (!this.manifestOf(node.type)?.data_bindings?.[target]) return refused("unknown");
        this.remember();
        const others = (node.bindings ?? []).filter((item) => !(item.target === target && item.owner !== "section"));
        node.bindings = ref ? [...others, {owner, ref: String(ref), target, ...(revision ? {revision: String(revision)} : {})}] : others;
        if (!node.bindings.length) delete node.bindings;
        if (!ref) this.writeSettings(node, target, null);
        this.changed("data", {id, target});
        return done();
    }

    /** Changes what the host needs beside a binding: shape, preset, mapping, filter, sort, limit, page_param, params, empty_text. */
    setSettings(id, target, patch) {
        const node = this.node(id);
        if (!node) return refused("unknown");
        if (this.lockOf(id)) return refused(this.lockOf(id));
        if (!this.manifestOf(node.type)?.data_bindings?.[target]) return refused("unknown");
        const current = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].bindingSettings(node, target) ?? {};
        const next = {...current};
        for (const [key, value] of Object.entries(patch ?? {})) {
            if (value === undefined || value === null || value === "" || ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(value) && !Object.keys(value).length)) delete next[key];
            else next[key] = value;
        }
        if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(next, current)) return done({same: true});
        this.remember();
        this.writeSettings(node, target, next);
        this.changed("data", {id, target});
        return done();
    }

    writeSettings(node, target, settings) {
        const entry = {...(node.extensions?.[_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.DATA_EXTENSION] ?? {})};
        if (settings && Object.keys(settings).length) entry[target] = settings;
        else delete entry[target];
        if (Object.keys(entry).length) node.extensions = {...(node.extensions ?? {}), [_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.DATA_EXTENSION]: entry};
        else if (node.extensions) {
            delete node.extensions[_core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.DATA_EXTENSION];
            if (!Object.keys(node.extensions).length) delete node.extensions;
        }
    }

    /** A runtime link: the target follows a state another block of the section publishes (empty: no link). */
    setRuntime(id, target, publisherId, state) {
        const node = this.node(id);
        if (!node) return refused("unknown");
        if (this.lockOf(id)) return refused(this.lockOf(id));
        const accepts = this.manifestOf(node.type)?.runtime?.accepts?.[target];
        if (!accepts) return refused("unknown");
        if (publisherId && !this.publishers(id, accepts.shape).some((entry) => entry.id === publisherId && entry.state === state)) return refused("publisher");
        this.remember();
        const others = (node.bindings ?? []).filter((item) => !(item.target === target && item.owner === "section"));
        node.bindings = publisherId ? [...others, {owner: "section", ref: `${publisherId}#${state}`, target}] : others;
        if (!node.bindings.length) delete node.bindings;
        this.changed("data", {id, target});
        return done();
    }

    // ------------------------------------------------------------ site blocks

    /**
     * The block builder: a tree to compose (a copy of a block, an existing
     * site block's tree, or a new section), the parameters exposed to the
     * author, a name and a catalogue group. Returns a builder session the
     * element edits with a model of its own over the tree.
     */
    startBuilder({from = null, type = null} = {}) {
        if (!this.rights.builder) return refused("rights");
        if (type) {
            const manifest = this.manifestOf(type);
            if (!(0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(manifest)) return refused("unknown");
            return done({builder: {
                type: manifest.type, version: manifest.version, editing: true,
                catalogue: (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(manifest.catalogue ?? {group: "marketing"}),
                root: (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(manifest.composed.root), exposed: (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(manifest.exposed ?? []),
                profiles: manifest.profiles, category: manifest.category,
            }});
        }
        const source = from ? this.node(from) : null;
        const root = source ? (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(source) : this.blank("layout.section");
        if (source && (0,_core_js_composition_composed_mjs__WEBPACK_IMPORTED_MODULE_2__.isComposed)(this.manifestOf(source.type))) return this.startBuilder({type: source.type});
        return done({builder: {type: "", version: "1.0.0", editing: false, from: source?.id ?? null, catalogue: {group: "marketing"}, root, exposed: [], profiles: ["ui-layout"], category: "layout"}});
    }

    /**
     * Saves a builder session as a site block: defineComposedType makes the
     * type; a block it was made from becomes an instance; a changed site
     * block gets the next minor version and every instance in this Document
     * is moved to it (upgradeComposed), the author's texts and values kept.
     * Returns {ok, manifest, changes} or {ok: false, diagnostics}.
     */
    saveBuilder(builder, {name = "", locale = "en"} = {}) {
        if (!this.rights.builder) return refused("rights");
        const slug = String(builder.type || `site.${slugify(name) || "block"}`);
        let version = builder.version ?? "1.0.0";
        if (builder.editing) {
            const current = this.manifestOf(slug);
            const [major, minor] = (current?.version ?? version).split(".").map(Number);
            version = `${major}.${minor + 1}.0`;
        } else if (this.manifestOf(slug)) return {ok: false, reason: "taken", diagnostics: [{code: "composed_type_taken", path: "$.type", message: `${slug} is taken`}]};
        const labelKey = `${slug}.name`;
        const definition = {
            type: slug, version, profiles: builder.profiles ?? ["ui-layout"], category: builder.category ?? "layout",
            catalogue: {...(builder.catalogue ?? {}), group: builder.catalogue?.group ?? "marketing", label_key: builder.catalogue?.label_key ?? labelKey},
            root: builder.root, exposed: builder.exposed ?? [],
        };
        const made = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].defineComposedType(definition, this.registry);
        if (!made.manifest) return {ok: false, reason: "invalid", diagnostics: made.diagnostics};
        const words = name ? {[locale]: {[definition.catalogue.label_key]: name}} : {};
        this.remember();
        this.siteBlocks = [...this.siteBlocks.filter((entry) => !(entry.type === slug && entry.version === version)), made.manifest];
        this.buildRegistry();
        let changes = [];
        if (builder.editing) {
            const upgraded = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].upgradeComposed(this.doc, this.registry);
            this.doc = upgraded.document;
            changes = upgraded.changes;
        } else if (builder.from) {
            const at = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.locate)(this.doc.root, builder.from);
            if (at?.parent && this.accepts(at.parent.id, at.slot, slug)) {
                const instance = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].composedInstance(made.manifest, this.next());
                at.parent.slots[at.slot][at.index] = instance;
                this.selected = instance.id;
            }
        }
        this.typing = null;
        this.changed("site-block", {type: slug, version});
        return {ok: true, manifest: made.manifest, words, changes};
    }

    /** The parameters a builder may expose: every field of every block of the tree, {path, target, key, label_key}. */
    exposable(builder) {
        const model = new EditorModel({document: {...DOCUMENT, id: "builder", profile: "ui-layout", root: builder.root}, types: this.types, siteBlocks: this.siteBlocks, renderers: this.renderers, editorManifests: this.editorManifests});
        const out = [];
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(builder.root, (node) => {
            for (const field of model.fields(node.id)) {
                if (field.plane !== "props" && field.kind === "text") continue;
                out.push({path: node.id, target: `${field.plane}.${field.target}`, key: field.target, label_key: field.label_key, type: node.type});
            }
        });
        return out;
    }

    // ------------------------------------------------------------ output

    toJSON() {
        return (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(this.doc);
    }

    /**
     * The Document as the canvas draws it at a screen: each responsive value
     * flattened to that screen's (so the canvas shows the screen whatever the
     * window is), the theme's defaults where the block sets nothing, and a
     * block hidden on that screen drawn faded instead of left out.
     */
    canvasDocument(screen = "lg") {
        const doc = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(this.doc);
        const hidden = new Set();
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(doc.root, (node) => {
            const manifest = this.manifestOf(node.type);
            const properties = manifest?.props_schema?.properties ?? {};
            const defaults = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(manifest?.parameter_defaults) ? manifest.parameter_defaults : {};
            for (const [key, schema] of Object.entries(properties)) {
                const theme = this.themeValue(node.type, key);
                const has = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(node.props) && Object.hasOwn(node.props, key);
                // What the type prints unset (parameter_defaults) is drawn too:
                // flattened to this screen, as the block's own value is.
                const raw = has ? node.props[key] : theme !== undefined ? theme : defaults[key];
                if (raw === undefined) continue;
                const value = (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isResponsive)(schema) && (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(raw) ? (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.valuesByBreakpoint)(raw, schema)[screen] : raw;
                node.props ??= {};
                if (value === undefined) delete node.props[key];
                else node.props[key] = value;
            }
            if (node.props?.hidden === true) {
                hidden.add(node.id);
                delete node.props.hidden;
            }
            if (node.props && !Object.keys(node.props).length) delete node.props;
        });
        return {document: doc, hidden};
    }

    /** The Document with the theme's defaults where blocks set nothing: what the site prints. */
    themedDocument() {
        const doc = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(this.doc);
        if (!this.theme?.defaults) return doc;
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(doc.root, (node) => {
            for (const key of Object.keys(this.manifestOf(node.type)?.props_schema?.properties ?? {})) {
                const theme = this.themeValue(node.type, key);
                if (theme === undefined || ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(node.props) && Object.hasOwn(node.props, key))) continue;
                node.props = {...(node.props ?? {}), [key]: (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.clone)(theme)};
            }
        });
        return doc;
    }

    /** The HTML a site prints: SIMAI Framework utilities, mobile first; unknown own modifiers left out. */
    async toHTML({resolveBinding, utilityRules} = {}) {
        const result = await _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].render(this.themedDocument(), {
            registry: this.registry,
            ...(resolveBinding ? {resolveBinding} : {}),
            options: utilityRules ? {utilityRules} : {},
        });
        return {html: result.html, diagnostics: result.diagnostics, notices: result.notices ?? [], assets: result.assets};
    }

    /** Markdown for the text areas: [{id, markdown}], one per area (the page's text when it has none). */
    toMarkdown() {
        const areas = [];
        (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.walk)(this.doc.root, (node) => {
            if (node.type === "layout.area" || node.type === "content.document") {
                areas.push({id: node.id, markdown: blocksToMarkdown(node.slots?.default ?? [], this)});
                return false;
            }
            return true;
        });
        return areas;
    }

    validate() {
        return _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].validate(this.doc, this.registry);
    }
}

// ------------------------------------------------------------ helpers

function compareVersions(left = "0.0.0", right = "0.0.0") {
    const a = String(left).split(".").map(Number);
    const b = String(right).split(".").map(Number);
    for (let index = 0; index < 3; index += 1) if ((a[index] ?? 0) !== (b[index] ?? 0)) return (a[index] ?? 0) < (b[index] ?? 0) ? -1 : 1;
    return 0;
}

function slugify(value) {
    return String(value ?? "").toLowerCase().normalize("NFKD")
        .replace(/[а-яё]/gu, (letter) => TRANSLIT[letter] ?? "")
        .replace(/[^a-z0-9]+/gu, "-").replace(/^-+|-+$/gu, "").slice(0, 40);
}

const TRANSLIT = {а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"};

/**
 * The registry the canvas draws with. The canvas shows one screen in a
 * window of another width, so each block's values are flattened to that
 * screen (canvasDocument) and must print whatever they are: a responsive
 * utility parameter has no default here, so the phone's one column of a
 * split prints grid-col-1 even in a wide window. What a site prints (the
 * output) uses the Framework's registry as it is: since core.runtime 1.26.0
 * it prints the phone's value once a wider screen differs (G-36).
 */
function canvasRegistry(registry) {
    const types = new Map();
    for (const [type, manifest] of registry.types) {
        const properties = manifest?.props_schema?.properties;
        const keys = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(properties) ? Object.keys(properties).filter((key) => (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isResponsive)(properties[key]) && (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(properties[key]) && "default" in properties[key]) : [];
        if (!keys.length) {
            types.set(type, manifest);
            continue;
        }
        const own = {...properties};
        for (const key of keys) {
            const {default: _default, ...rest} = own[key];
            own[key] = rest;
        }
        types.set(type, {...manifest, props_schema: {...manifest.props_schema, properties: own}});
    }
    return {...registry, types};
}

/**
 * The heading a field stands under in the panel: content (what the block
 * says and is), layout (the Framework's layout utilities: width, space,
 * grid, alignment, background) or extra (visibility per screen and what
 * the editor manifest marks advanced).
 */
function fieldSection(field, schema) {
    const set = /^sf\.composition\.set_([a-z_]+)\./u.exec(String(field.label_key ?? ""))?.[1];
    if (set === "visibility" || field.target === "hidden") return "extra";
    // A block's own content (its data: a heading's level) stays under Content
    // even when its manifest files it as advanced; advanced props go to More.
    if (field.plane === "data") return "content";
    if (field.group === "advanced") return "extra";
    if (field.plane === "props" && (set || schema?.["x-simai-utility"])) return "layout";
    return "content";
}

/** A value at a screen: a responsive value per breakpoint gives that screen's, anything else itself. */
function atScreen(value, schema, responsive, screen) {
    return responsive && (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(value) ? (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.valuesByBreakpoint)(value, schema)[screen] : value;
}

/** What a parameter is bound to in the Framework, for the line under its control: the utility it prints. */
function describeUtility(schema) {
    const declaration = Array.isArray(schema?.["x-simai-utility"]) ? schema["x-simai-utility"][0] : schema?.["x-simai-utility"];
    if (!(0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(declaration)) return null;
    if (typeof declaration.class === "string") return declaration.class.replace("{value}", "*");
    if ((0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(declaration.values)) return Object.values(declaration.values).filter(Boolean).join(" · ");
    return null;
}

/** A value as a field takes it: {value}, {value: undefined} for empty, or null when it cannot be one. */
function coerce(field, value) {
    if (value === undefined || value === null || value === "") return {value: undefined};
    if (field.kind === "toggle") return {value: value === true || value === "true"};
    if (field.kind === "integer") {
        const number = Number(value);
        if (!Number.isInteger(number)) return null;
        return {value: Math.max(field.min ?? -Infinity, Math.min(field.max ?? Infinity, number))};
    }
    if (field.kind === "choice") {
        const found = field.choices.find((choice) => String(choice) === String(value));
        return found === undefined ? null : {value: found};
    }
    return {value: String(value)};
}

/** The value a breakpoint map gives at a breakpoint, mobile first; `inherited` below its first key. */
function valueAt(values, breakpoint, inherited) {
    const order = _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.UTILITY_BREAKPOINTS.slice(0, _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.UTILITY_BREAKPOINTS.indexOf(breakpoint) + 1);
    const decided = [...order].reverse().find((key) => key in values);
    return decided ? values[decided] : inherited;
}

/**
 * Writes a field's value into a node, at a screen, keeping only what differs
 * from what it inherits. A responsive value set for one screen is that
 * screen's only: the next wider screen the editor shows keeps what it showed,
 * and the narrowest value is stored whatever the type's default while a wider
 * screen differs from it (columns {xs: 2} set to 1 on the phone become
 * {xs: 1, md: 2}, not nothing).
 */
function writeField(node, field, value, screen) {
    const planeName = field.plane;
    node[planeName] ??= {};
    const plane = node[planeName];
    const inherited = field.inherited ?? undefined;
    if (!field.responsive) {
        if (value === undefined || (planeName === "props" && (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(value, inherited))) delete plane[field.target];
        else plane[field.target] = value;
    } else {
        const current = plane[field.target];
        const before = (0,_core_js_composition_utilities_mjs__WEBPACK_IMPORTED_MODULE_1__.isBreakpointValue)(current) ? {...current} : current !== undefined ? {xs: current} : {};
        const values = {...before};
        const wider = EDITOR_BREAKPOINTS[EDITOR_BREAKPOINTS.indexOf(screen) + 1];
        if (wider && !(wider in values)) {
            const kept = valueAt(before, wider, inherited);
            if (kept !== undefined) values[wider] = kept;
        }
        if (value === undefined) delete values[screen];
        else values[screen] = value;
        // Mobile first: a wider value is kept only where it changes from the narrower one.
        let carried;
        let first = true;
        for (const breakpoint of _core_js_composition_index_mjs__WEBPACK_IMPORTED_MODULE_0__.UTILITY_BREAKPOINTS) {
            if (!(breakpoint in values)) continue;
            if (!first && (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(values[breakpoint], carried)) delete values[breakpoint];
            else carried = values[breakpoint];
            first = false;
        }
        const keys = Object.keys(values);
        if (!keys.length || (keys.length === 1 && (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.same)(values[keys[0]], inherited))) delete plane[field.target];
        else if (keys.length === 1 && keys[0] === "xs") plane[field.target] = values.xs;
        else plane[field.target] = values;
    }
    if (!Object.keys(plane).length) delete node[planeName];
}

/** Why each class of the «Extra classes» was not taken, by reason: [{reason, classes}], each class by its name. */
function refusedClasses(dropped) {
    const groups = new Map();
    for (const entry of Array.isArray(dropped) ? dropped : []) {
        const name = typeof entry === "string" ? entry : String(entry?.class ?? "");
        if (!name) continue;
        const reason = typeof entry === "string" ? "modifier_unknown" : String(entry?.reason ?? "modifier_unknown");
        groups.set(reason, [...(groups.get(reason) ?? []), name]);
    }
    return [...groups].map(([reason, classes]) => ({reason, classes}));
}

// ------------------------------------------------------------ Markdown

const escapeMarkdown = (value) => String(value).replace(/([\\`*_[\]<>])/gu, "\\$1");

function inlineToMarkdown(content) {
    return (Array.isArray(content) ? content : []).map((entry) => {
        if (entry?.type === "text") {
            let value = (entry.marks ?? []).includes("code") ? `\`${String(entry.value).replace(/`/gu, "\\`")}\`` : escapeMarkdown(entry.value);
            if ((entry.marks ?? []).includes("em")) value = `*${value}*`;
            if ((entry.marks ?? []).includes("strong")) value = `**${value}**`;
            return value;
        }
        if (entry?.type === "link") return `[${inlineToMarkdown(entry.children)}](${String(entry.href).replace(/[()\s]/gu, encodeURIComponent)})`;
        if (entry?.type === "component") return escapeMarkdown(entry.props?.text ?? entry.props?.label ?? "");
        return "";
    }).join("");
}

function blocksToMarkdown(nodes, model, depth = 0) {
    return nodes.map((node) => blockToMarkdown(node, model, depth)).filter((value) => value !== "").join("\n\n");
}

function blockToMarkdown(node, model, depth) {
    const indent = "  ".repeat(depth);
    const words = (key = "content") => inlineToMarkdown(node.data?.[key]);
    const inner = (slot = "default") => blocksToMarkdown(node.slots?.[slot] ?? [], model, depth);
    switch (node.type) {
    case "content.paragraph": return words();
    case "content.heading": return `${"#".repeat(Math.min(6, Math.max(1, node.data?.level ?? 2)))} ${words()}`;
    case "content.list": {
        const start = node.props?.ordered ? (node.props?.start ?? 1) : null;
        return (node.slots?.items ?? []).map((item, index) => {
            const mark = start === null ? "-" : `${start + index}.`;
            const nested = item.slots?.default?.length ? `\n${blocksToMarkdown(item.slots.default, model, depth + 1).split("\n").map((line) => `${indent}  ${line}`).join("\n")}` : "";
            return `${indent}${mark} ${inlineToMarkdown(item.data?.content)}${nested}`;
        }).join("\n");
    }
    case "content.quote": return inner().split("\n").map((line) => `> ${line}`.trimEnd()).join("\n");
    case "content.alert": {
        const title = node.data?.title ? `**${inlineToMarkdown(node.data.title)}**\n` : "";
        return `${title}${inner()}`.split("\n").map((line) => `> ${line}`.trimEnd()).join("\n");
    }
    case "content.code": return `\`\`\`${node.props?.lang ?? ""}\n${node.data?.code ?? ""}\n\`\`\``;
    case "content.divider": return "---";
    case "content.figure": {
        const picture = node.data?.src ? `![${escapeMarkdown(node.data?.alt ?? "")}](${node.data.src})` : "";
        const caption = node.data?.caption ? `\n*${inlineToMarkdown(node.data.caption)}*` : "";
        return `${picture}${caption}`;
    }
    case "content.file": return node.data?.href ? `[${escapeMarkdown(node.data?.label ?? node.data.href)}](${node.data.href})` : "";
    case "content.table": {
        const rows = Array.isArray(node.data?.rows) ? node.data.rows : [];
        if (!rows.length) return "";
        const line = (row) => `| ${row.map((cell) => inlineToMarkdown(cell).replace(/\|/gu, "\\|")).join(" | ")} |`;
        return [line(rows[0]), `| ${rows[0].map(() => "---").join(" | ")} |`, ...rows.slice(1).map(line)].join("\n");
    }
    case "content.details": return `**${inlineToMarkdown(node.data?.summary)}**\n\n${inner()}`;
    case "content.math": return `$$\n${node.data?.source ?? ""}\n$$`;
    default: {
        const children = (0,_tree_mjs__WEBPACK_IMPORTED_MODULE_4__.childrenOf)(node).map((child) => child.node);
        return children.length ? blocksToMarkdown(children, model, depth) : "";
    }
    }
}



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ },

/***/ "c584913fd94f"
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   childrenOf: () => (/* binding */ childrenOf),
/* harmony export */   clone: () => (/* binding */ clone),
/* harmony export */   freshCopy: () => (/* binding */ freshCopy),
/* harmony export */   idMaker: () => (/* binding */ idMaker),
/* harmony export */   idsOf: () => (/* binding */ idsOf),
/* harmony export */   insertAt: () => (/* binding */ insertAt),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   locate: () => (/* binding */ locate),
/* harmony export */   removeAt: () => (/* binding */ removeAt),
/* harmony export */   same: () => (/* binding */ same),
/* harmony export */   slotList: () => (/* binding */ slotList),
/* harmony export */   walk: () => (/* binding */ walk),
/* harmony export */   within: () => (/* binding */ within)
/* harmony export */ });
// The tree of a Composition Document as sf-editor walks it: where a node
// stands, its ancestors, its children in slot order, and new ids. Pure
// functions over plain JSON; nothing here knows about the page.

const clone = (value) => (value === undefined ? undefined : JSON.parse(JSON.stringify(value)));
const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);

/** The children of a node in slot order: [{slot, index, node}]. */
function childrenOf(node) {
    const out = [];
    for (const [slot, list] of Object.entries(isPlainObject(node?.slots) ? node.slots : {})) {
        (Array.isArray(list) ? list : []).forEach((child, index) => out.push({slot, index, node: child}));
    }
    return out;
}

/** Calls visit(node, parent, slot, index) for every node, parents first. */
function walk(root, visit, parent = null, slot = "", index = 0) {
    if (!isPlainObject(root)) return;
    if (visit(root, parent, slot, index) === false) return;
    for (const child of childrenOf(root)) walk(child.node, visit, root, child.slot, child.index);
}

/** Where a node stands: {node, parent, slot, index, ancestors} (ancestors from the root down to the parent), or null. */
function locate(root, id) {
    if (!root) return null;
    if (root.id === id) return {node: root, parent: null, slot: "", index: 0, ancestors: []};
    const trail = [root];
    const search = (node) => {
        for (const child of childrenOf(node)) {
            if (child.node.id === id) return {node: child.node, parent: node, slot: child.slot, index: child.index, ancestors: [...trail]};
            trail.push(child.node);
            const found = search(child.node);
            trail.pop();
            if (found) return found;
        }
        return null;
    };
    return search(root);
}

/** Every id of a subtree. */
function idsOf(node, into = new Set()) {
    walk(node, (current) => { into.add(current.id); });
    return into;
}

/** Makes ids `<prefix><n>` that no node of the tree holds; `taken` grows as ids are given. */
function idMaker(root, prefix = "e") {
    const taken = idsOf(root);
    let count = taken.size;
    const next = () => {
        let id;
        do id = `${prefix}${(count += 1).toString(36)}`; while (taken.has(id));
        taken.add(id);
        return id;
    };
    next.reserve = (node) => idsOf(node, taken);
    return next;
}

/** A copy of a subtree with new ids all through it; runtime links inside follow the ids. */
function freshCopy(node, next) {
    const copy = clone(node);
    const map = new Map();
    walk(copy, (current) => {
        const id = next();
        map.set(current.id, id);
        current.id = id;
    });
    walk(copy, (current) => {
        if (!Array.isArray(current.bindings)) return;
        current.bindings = current.bindings.map((binding) => {
            if (binding?.owner !== "section" || typeof binding.ref !== "string") return binding;
            const [from, state] = binding.ref.split("#");
            return map.has(from) ? {...binding, ref: `${map.get(from)}#${state}`} : binding;
        });
    });
    return copy;
}

/** The list of a slot, made when it is missing. */
function slotList(node, slot) {
    node.slots ??= {};
    node.slots[slot] ??= [];
    return node.slots[slot];
}

function insertAt(parent, slot, index, node) {
    const list = slotList(parent, slot);
    list.splice(Math.max(0, Math.min(index, list.length)), 0, node);
}

function removeAt(parent, slot, index) {
    const list = parent.slots?.[slot];
    if (!Array.isArray(list)) return null;
    return list.splice(index, 1)[0] ?? null;
}

/** Whether `id` stands inside the subtree of `ancestorId` (or is it). */
function within(root, ancestorId, id) {
    const at = locate(root, ancestorId);
    if (!at) return false;
    let found = false;
    walk(at.node, (current) => {
        if (current.id === id) found = true;
        return !found;
    });
    return found;
}


/***/ },

/***/ "b1c5d4f6dddd"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"smart.editor","tag":"sf-editor","version":"1.2.2","kind":"leaf","settings":{"document":{"type":"object","default":null},"types":{"type":"list","default":[],"of":"object"},"renderers":{"type":"object","default":null},"editor-manifests":{"type":"list","default":[],"of":"object","entries":{"key":"type","changes":"content"}},"site-blocks":{"type":"list","default":[],"of":"object"},"words":{"type":"object","default":null},"rights":{"type":"object","default":null},"theme":{"type":"object","default":null},"screen":{"type":"enum","values":["desktop","tablet","phone"],"default":"desktop"},"preferences-key":{"type":"string","default":""},"heading":{"type":"string","default":""},"caption":{"type":"string","default":""},"page-settings":{"type":"object","default":null},"label":{"type":"string","default-from":"runtime.label"}},"values":{},"events":{"change":{"carries":{"document":"object","reason":"string","scope":{"type":"enum","values":["page","template"]}}},"select":{"carries":{"ids":"list"}},"block-save":{"carries":{"manifest":"object","words":"object","changes":"list"},"own-verb":true},"page-change":{"carries":{"key":{"type":"enum","values":["name","address","template"]},"value":"string"},"own-verb":true},"page-action":{"carries":{"action":{"type":"enum","values":["publish","history"]}},"own-verb":true}},"actions":{"select":{"with":{"id":{"type":"id","optional":true}}},"edit":{"with":{"id":"id"}},"insert":{"with":{"type":"string","variant":{"type":"id","optional":true},"after":{"type":"id","optional":true}}},"undo":{"with":{}},"redo":{"with":{}},"set-parameter":{"with":{"id":"id","key":"string","value":"any","screen":{"type":"enum","values":["desktop","tablet","phone"],"optional":true}}},"edit-template":{"with":{"on":{"type":"boolean","optional":true}}},"build-block":{"with":{"id":{"type":"id","optional":true},"type":{"type":"string","optional":true}}},"output":{"with":{"format":{"type":"enum","values":["json","html","markdown"]}},"waits":true}},"host-states":{},"css-variables":{}}');

/***/ },

/***/ "5bf8f84cf5a8"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Page editor","runtime":{"back":"Back","bar-label":"Editor tools","binding":"SIMAI Framework: {classes}","block-not-kept-text":"The site did not keep the block","block-saved-text":"Site block saved","builder-editing":"Changing a site block","builder-group":"Group","builder-invalid":"Not saved","builder-label":"Block builder","builder-name":"Name","builder-new":"New site block","builder-note":"Parameters for the author: {count}","builder-save":"Save block","builder-save-everywhere":"Save and change everywhere","builder-start":"Create your own block","cancel":"Cancel","canvas-role":"page","catalogue-label":"Add a block","catalogue-tabs":"Kind","columns-text":"Columns changed","data-binding":"Data: {target}","data-empty-text":"When there is nothing","data-follows":"Block in this section","data-limit":"How many","data-mapping":"Fields","data-no-port":"The site gives no data sources here; demo data is shown.","data-no-publishers":"No block in this section gives this.","data-none":"None","data-own-mapping":"My own","data-preset":"Mapping","data-runtime":"Follows: {target}","data-source":"Source","data-states":"Show as","data-states-help":"Look at the block with data, empty, with an error or while loading. Only the preview changes.","duplicated-text":"Block duplicated","editing-for":"Values for","empty-place":"Add a block here","expose":"For the author","favourite":"Add {name} to favourites","favourites":"Favourites","favourites-empty":"Star a block and it shows up here.","grip-label":"Drag to move, press for the menu","gutter-hint":"Drag ⠿ to move a block · press it for the menu","gutter-label":"Block actions","heading-placeholder":"Heading","help-1":"Press text to type in it; press beside it to choose its block.","help-2":"Drag a block from the library onto the page, or press it to add it after the chosen block.","help-3":"Drag ⠿ to move a block; + adds one after it; / in an empty line opens the catalogue.","help-4":"Esc goes a level up, Enter a level down; Alt+arrows move the chosen block; ⌘Z undoes.","help-label":"Help","help-text":"Click text to type, click beside it to choose the block. Esc goes up a level, Enter goes down. Alt+arrows move the chosen block; Alt+Shift+arrows move it while typing. / in an empty line opens the catalogue.","help-title":"How to edit","hidden-here":"Hidden on this screen","html-none":"This block prints nothing on its own.","html-note":"The block as the site prints it.","inserted-text":"Block added","item-drag-hint":"Drag onto the page, or press to add","json-note":"The block as the Document holds it.","keys-chosen":"Esc up · Enter down · Alt+↑↓ move · ⌫ remove","keys-page":"Enter: into the page","keys-typing":"Esc: choose the block · / insert · Alt+Shift+↑↓ move","label":"Page editor","left-blocks":"Blocks","left-label":"Blocks and structure","left-structure":"Structure","lock-layout":"The layout is set by the site; you write inside its text areas.","lock-mark-layout":"Layout","lock-mark-page":"Page","lock-mark-template":"Template","lock-page":"While the template is edited, the page waits.","lock-template":"The header and footer are the site template. Change them with Edit template.","locked":"locked","menu-add-column":"Add a column","menu-change-block":"Change the site block everywhere","menu-columns":"Split into columns","menu-down":"Move down","menu-duplicate":"Duplicate","menu-make-block":"Make a site block","menu-more":"More","menu-remove":"Remove","menu-up":"Move up","modifiers-dropped":"Not taken: {classes}","modifiers-hint":"Framework utilities only","modifiers-invalid":"Not a class: {classes}","modifiers-label":"Extra classes","modifiers-limit":"Over the limit: {classes}","modifiers-placeholder":"Framework classes","modifiers-unchecked":"Cannot be checked without the Framework rules: {classes}","modifiers-unknown":"Not in SIMAI Framework: {classes}","more":"more","more-steps":"{name}: other values","moved-text":"Block moved","no":"No","no-parameters":"This block has no parameters.","nothing-chosen":"Choose a block to see its parameters.","nothing-fits":"Nothing fits here.","nothing-found":"Nothing found.","origin-block":"Block","origin-block-help":"set on this block","origin-screen":"Screen","origin-screen-help":"set for this screen and wider","origin-theme":"Theme","origin-theme-help":"set by the site\'s theme","origin-type":"Type","origin-type-help":"what the block draws with nothing set","origin-variant":"Variant","origin-variant-help":"set by the variant the block was made from","origins-label":"Where a value comes from","origins-note":"The dot says where a value comes from: the type, the theme, the variant, this block or this screen.","output-html":"HTML","output-json":"JSON","output-markdown":"Markdown","output-open":"Output","output-title":"What the page is made of","page-address":"Address","page-hint":"Choose a block on the page to see its settings here. How to work here: the help button at the top.","page-history":"History · {count}","page-history-plain":"History","page-name":"Name","page-publish":"Publish","page-publishing":"Publishing","page-theme":"Site theme","page-title":"Page","path-label":"Where the chosen block is","path-page":"Page","per-screen":"Set per screen","plus-label":"Add a block below","range-hint":"From {min} to {max}","recent":"Recent","redo-label":"Redo","redone-text":"Redone","refused-closed":"A site block is changed in the block builder.","refused-edge":"It is already at the edge.","refused-empty":"There is nothing here.","refused-inside-itself":"A block cannot go inside itself.","refused-invalid":"That would break the page.","refused-layout":"The layout is set by the site.","refused-leaf":"This block has nothing inside.","refused-limit":"No more fit here.","refused-none":"Nothing is chosen.","refused-not-paragraph":"Only a paragraph can become that.","refused-not-text":"This is not text.","refused-page":"This is outside the template.","refused-place":"It does not fit there.","refused-publisher":"That block does not give this.","refused-required":"This block must stay.","refused-rights":"Your role does not allow it.","refused-same":"Nothing changed.","refused-template":"This is the site template.","refused-unknown":"That block is not on the page.","removed-text":"Block removed","reset":"Reset","reset-field":"Reset {name}","right-label":"Parameters","screen-desktop":"Desktop","screen-label":"Screen","screen-phone":"Phone","screen-tablet":"Tablet","screens-note":"Fields marked with a screen are set for {screen} and wider.","search-placeholder":"Find a block","section-count":"{count} blocks","from-section":"from {name}","search-results":"Found","section-content":"Content","section-extra":"More","section-layout":"Layout","section-open":"{name}, {count} blocks","sections":"Sections","set-alignment":"Alignment","set-background":"Background","set-breakout":"Breakout","set-color":"Colour","set-for":"Set for: {screens}","set-grid":"Grid","set-spacing":"Spacing","set-visibility":"Visibility","set-width":"Width","sets-none":"This block\'s parameters come from its type; no SIMAI Framework utilities are bound.","sets-note":"Sets: {sets}. Every parameter is bound to SIMAI Framework.","show-on-screen":"Show on this screen","site-block":"Site block","slash-filter":"Blocks with «{query}»","slash-hint":"Type to filter, Enter to insert, Esc to close","slash-label":"Insert","state-auto":"Data","state-empty":"Empty","state-error":"Error","state-error-text":"The source did not answer","state-loading":"Loading","structure-empty":"The page is empty.","tab-blocks":"Blocks","tab-data":"Data","tab-html":"HTML","tab-json":"JSON","tab-parameters":"Parameters","tab-text":"Text","template-badge":"Template: header and footer of every page","template-done":"Done with template","template-edit":"Edit template","template-help":"The header and footer are the same on every page. Change them only on purpose: Edit template.","template-no-rights":"The header and footer are the site template; your role does not change it.","template-off-text":"Back to the page","template-on-text":"Editing the site template","template-title":"Site template","text-placeholder":"Type, or / for a block","theme-label":"Theme: {name}","theme-read-only":"The theme is set for the whole site; it is not changed here.","theme-settings":"Theme settings","theme-title":"Theme","toolbar-label":"Chosen block","type-content-alert":"Note","type-content-card":"Card","type-content-code":"Code","type-content-details":"Details","type-content-diagram":"Diagram","type-content-divider":"Divider","type-content-document":"Document","type-content-figure":"Picture","type-content-file":"File","type-content-grid":"Grid","type-content-heading":"Heading","type-content-html":"HTML","type-content-list":"List","type-content-list-item":"List item","type-content-math":"Formula","type-content-media":"Media","type-content-paragraph":"Paragraph","type-content-quote":"Quote","type-content-step":"Step","type-content-steps":"Steps","type-content-tab":"Tab","type-content-table":"Table","type-content-tabs":"Tabs","type-layout-area":"Text area","type-layout-columns":"Columns","type-layout-page":"Page","type-layout-region":"Region","type-layout-regions":"Page with template","type-layout-section":"Section","undo-label":"Undo","undone-text":"Undone","unfavourite":"Remove {name} from favourites","utility-help":"The utility classes this value writes","variants-count":"Variants: {count}","variants-label":"Variants of {name}","yes":"Yes"}}');

/***/ },

/***/ "362a712abf5e"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"title":"Редактор страницы","runtime":{"back":"Назад","bar-label":"Инструменты редактора","binding":"SIMAI Framework: {classes}","block-not-kept-text":"Сайт не сохранил блок","block-saved-text":"Блок сайта сохранён","builder-editing":"Изменение блока сайта","builder-group":"Группа","builder-invalid":"Не сохранено","builder-label":"Конструктор блоков","builder-name":"Название","builder-new":"Новый блок сайта","builder-note":"Параметров для автора: {count}","builder-save":"Сохранить блок","builder-save-everywhere":"Сохранить и изменить везде","builder-start":"Создать свой блок","cancel":"Отмена","canvas-role":"страница","catalogue-label":"Добавить блок","catalogue-tabs":"Вид","columns-text":"Колонки изменены","data-binding":"Данные: {target}","data-empty-text":"Когда ничего нет","data-follows":"Блок в этой секции","data-limit":"Сколько","data-mapping":"Поля","data-no-port":"Сайт не даёт здесь источников данных; показаны демо-данные.","data-no-publishers":"Ни один блок этой секции этого не даёт.","data-none":"Нет","data-own-mapping":"Своё","data-preset":"Сопоставление","data-runtime":"Следует за: {target}","data-source":"Источник","data-states":"Показать как","data-states-help":"Посмотрите блок с данными, пустым, с ошибкой или в загрузке. Меняется только предпросмотр.","duplicated-text":"Блок продублирован","editing-for":"Значения для","empty-place":"Добавьте блок сюда","expose":"Для автора","favourite":"Добавить «{name}» в избранное","favourites":"Избранное","favourites-empty":"Отметьте блок звёздочкой — он появится здесь.","grip-label":"Тяните, чтобы переместить; нажмите для меню","gutter-hint":"Тяните за ⠿, чтобы переместить блок · щелчок — меню","gutter-label":"Действия с блоком","heading-placeholder":"Заголовок","help-1":"Щёлкните по тексту, чтобы печатать; рядом с ним — чтобы выбрать блок.","help-2":"Перетащите блок из библиотеки на страницу или нажмите его, чтобы добавить после выбранного.","help-3":"Тяните за ⠿, чтобы переместить блок; + добавляет блок после него; / в пустой строке открывает каталог.","help-4":"Esc — уровень вверх, Enter — вниз; Alt+стрелки двигают выбранный блок; ⌘Z отменяет.","help-label":"Справка","help-text":"Щёлкните по тексту, чтобы печатать, рядом с ним — чтобы выбрать блок. Esc — уровень вверх, Enter — вниз. Alt+стрелки двигают выбранный блок, Alt+Shift+стрелки — во время набора. / в пустой строке открывает каталог.","help-title":"Как редактировать","hidden-here":"Скрыто на этом экране","html-none":"Этот блок сам по себе ничего не печатает.","html-note":"Блок, как его печатает сайт.","inserted-text":"Блок добавлен","item-drag-hint":"Перетащите на страницу или нажмите, чтобы добавить","json-note":"Блок, как его хранит документ.","keys-chosen":"Esc вверх · Enter вниз · Alt+↑↓ двигать · ⌫ удалить","keys-page":"Enter: внутрь страницы","keys-typing":"Esc: выбрать блок · / вставить · Alt+Shift+↑↓ двигать","label":"Редактор страницы","left-blocks":"Блоки","left-label":"Блоки и структура","left-structure":"Структура","lock-layout":"Раскладку задаёт сайт; вы пишете в её текстовых областях.","lock-mark-layout":"Макет","lock-mark-page":"Страница","lock-mark-template":"Шаблон","lock-page":"Пока редактируется шаблон, страница ждёт.","lock-template":"Шапка и подвал — шаблон сайта. Их меняют через «Изменить шаблон».","locked":"закреплён","menu-add-column":"Добавить колонку","menu-change-block":"Изменить блок сайта везде","menu-columns":"Разделить на колонки","menu-down":"Ниже","menu-duplicate":"Дублировать","menu-make-block":"Сделать блоком сайта","menu-more":"Ещё","menu-remove":"Удалить","menu-up":"Выше","modifiers-dropped":"Не приняты: {classes}","modifiers-hint":"Только утилиты Framework","modifiers-invalid":"Не класс: {classes}","modifiers-label":"Дополнительные классы","modifiers-limit":"Сверх предела: {classes}","modifiers-placeholder":"Классы SIMAI Framework","modifiers-unchecked":"Не проверить без правил Framework: {classes}","modifiers-unknown":"Нет в SIMAI Framework: {classes}","more":"ещё","more-steps":"{name}: другие значения","moved-text":"Блок перемещён","no":"Нет","no-parameters":"У этого блока нет параметров.","nothing-chosen":"Выберите блок, чтобы увидеть его параметры.","nothing-fits":"Сюда ничего не подходит.","nothing-found":"Ничего не найдено.","origin-block":"Блок","origin-block-help":"задано у этого блока","origin-screen":"Экран","origin-screen-help":"задано для этого экрана и шире","origin-theme":"Тема","origin-theme-help":"задано темой сайта","origin-type":"Тип","origin-type-help":"что блок рисует без настроек","origin-variant":"Вариант","origin-variant-help":"задано вариантом, из которого сделан блок","origins-label":"Откуда значение","origins-note":"Точка показывает, откуда значение: тип, тема, вариант, этот блок или этот экран.","output-html":"HTML","output-json":"JSON","output-markdown":"Markdown","output-open":"Результат","output-title":"Из чего состоит страница","page-address":"Адрес","page-hint":"Выберите блок на странице — здесь появятся его настройки. Как здесь работать — кнопка помощи вверху.","page-history":"История · {count}","page-history-plain":"История","page-name":"Название","page-publish":"Опубликовать","page-publishing":"Публикация","page-theme":"Тема сайта","page-title":"Страница","path-label":"Где выбранный блок","path-page":"Страница","per-screen":"Задаётся для каждого экрана","plus-label":"Добавить блок ниже","range-hint":"От {min} до {max}","recent":"Недавние","redo-label":"Повторить","redone-text":"Повторено","refused-closed":"Блок сайта меняется в конструкторе блоков.","refused-edge":"Блок уже с краю.","refused-empty":"Здесь ничего нет.","refused-inside-itself":"Блок нельзя поместить в себя.","refused-invalid":"Так страница сломается.","refused-layout":"Раскладку задаёт сайт.","refused-leaf":"Внутри этого блока ничего нет.","refused-limit":"Больше сюда не поместится.","refused-none":"Ничего не выбрано.","refused-not-paragraph":"Так можно превратить только абзац.","refused-not-text":"Это не текст.","refused-page":"Это вне шаблона.","refused-place":"Туда это не подходит.","refused-publisher":"Этот блок этого не даёт.","refused-required":"Этот блок обязателен.","refused-rights":"Ваша роль этого не позволяет.","refused-same":"Ничего не изменилось.","refused-template":"Это шаблон сайта.","refused-unknown":"Такого блока на странице нет.","removed-text":"Блок удалён","reset":"Сбросить","reset-field":"Сбросить «{name}»","right-label":"Параметры","screen-desktop":"Компьютер","screen-label":"Экран","screen-phone":"Телефон","screen-tablet":"Планшет","screens-note":"Поля со значком экрана задаются для экрана «{screen}» и шире.","search-placeholder":"Найти блок","section-count":"блоков: {count}","from-section":"из раздела «{name}»","search-results":"Найдено","section-content":"Содержимое","section-extra":"Дополнительно","section-layout":"Расположение","section-open":"{name}, блоков: {count}","sections":"Разделы","set-alignment":"Выравнивание","set-background":"Фон","set-breakout":"Выход за колонку","set-color":"Цвет","set-for":"Задано для: {screens}","set-grid":"Сетка","set-spacing":"Отступы","set-visibility":"Видимость","set-width":"Ширина","sets-none":"Параметры этого блока задаёт его тип; утилиты SIMAI Framework не подключены.","sets-note":"Наборы: {sets}. Каждый параметр связан с SIMAI Framework.","show-on-screen":"Показывать на этом экране","site-block":"Блок сайта","slash-filter":"Блоки с «{query}»","slash-hint":"Печатайте для отбора, Enter — вставить, Esc — закрыть","slash-label":"Вставить","state-auto":"Данные","state-empty":"Пусто","state-error":"Ошибка","state-error-text":"Источник не ответил","state-loading":"Загрузка","structure-empty":"Страница пуста.","tab-blocks":"Блоки","tab-data":"Данные","tab-html":"HTML","tab-json":"JSON","tab-parameters":"Параметры","tab-text":"Текст","template-badge":"Шаблон: шапка и подвал всех страниц","template-done":"Готово с шаблоном","template-edit":"Изменить шаблон","template-help":"Шапка и подвал одинаковы на всех страницах. Меняйте их только намеренно: «Изменить шаблон».","template-no-rights":"Шапка и подвал — шаблон сайта; ваша роль его не меняет.","template-off-text":"Снова страница","template-on-text":"Редактируется шаблон сайта","template-title":"Шаблон сайта","text-placeholder":"Печатайте или / для блока","theme-label":"Тема: {name}","theme-read-only":"Тема задана для всего сайта и здесь не меняется.","theme-settings":"Настройки темы","theme-title":"Тема","toolbar-label":"Выбранный блок","type-content-alert":"Заметка","type-content-card":"Карточка","type-content-code":"Код","type-content-details":"Подробности","type-content-diagram":"Диаграмма","type-content-divider":"Разделитель","type-content-document":"Документ","type-content-figure":"Изображение","type-content-file":"Файл","type-content-grid":"Сетка","type-content-heading":"Заголовок","type-content-html":"HTML","type-content-list":"Список","type-content-list-item":"Пункт списка","type-content-math":"Формула","type-content-media":"Медиа","type-content-paragraph":"Абзац","type-content-quote":"Цитата","type-content-step":"Шаг","type-content-steps":"Шаги","type-content-tab":"Вкладка","type-content-table":"Таблица","type-content-tabs":"Вкладки","type-layout-area":"Текстовая область","type-layout-columns":"Колонки","type-layout-page":"Страница","type-layout-region":"Область","type-layout-regions":"Страница с шаблоном","type-layout-section":"Секция","undo-label":"Отменить","undone-text":"Отменено","unfavourite":"Убрать «{name}» из избранного","utility-help":"Классы утилит, которые даёт это значение","variants-count":"Варианты: {count}","variants-label":"Варианты блока «{name}»","yes":"Да"}}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		const hasSymbol = typeof Symbol === "function";
/******/ 		const webpackQueues = hasSymbol ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		const webpackExports = hasSymbol ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		const webpackError = hasSymbol ? Symbol("webpack error") : "__webpack_error__";
/******/
/******/ 		const resolveQueue = (queue) => {
/******/ 			if(queue?.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		const wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					const queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					const obj = {};
/******/
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			const ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			let queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			const depQueues = new Set();
/******/ 			const exports = module.exports;
/******/ 			let currentDeps;
/******/ 			let outerResolve;
/******/ 			let reject;
/******/ 			const promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			const handle = (deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				let fn;
/******/ 				const getResult = () => (currentDeps.map((d) => {
/******/
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				const promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					const fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}
/******/ 			const done = (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue))
/******/ 			body(handle, done);
/******/ 			queue?.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("4ddf32352097");
/******/
/******/ })()
;