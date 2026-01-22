#!/usr/bin/env bun
// @bun
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __require = import.meta.require;

// src/index.ts
import { platform as platform2 } from "os";
import * as readline2 from "readline";

// src/config.ts
import { join } from "path";
import { homedir } from "os";
import { mkdir } from "fs/promises";

// node_modules/zod/v3/external.js
var exports_external = {};
__export(exports_external, {
  void: () => voidType,
  util: () => util,
  unknown: () => unknownType,
  union: () => unionType,
  undefined: () => undefinedType,
  tuple: () => tupleType,
  transformer: () => effectsType,
  symbol: () => symbolType,
  string: () => stringType,
  strictObject: () => strictObjectType,
  setErrorMap: () => setErrorMap,
  set: () => setType,
  record: () => recordType,
  quotelessJson: () => quotelessJson,
  promise: () => promiseType,
  preprocess: () => preprocessType,
  pipeline: () => pipelineType,
  ostring: () => ostring,
  optional: () => optionalType,
  onumber: () => onumber,
  oboolean: () => oboolean,
  objectUtil: () => objectUtil,
  object: () => objectType,
  number: () => numberType,
  nullable: () => nullableType,
  null: () => nullType,
  never: () => neverType,
  nativeEnum: () => nativeEnumType,
  nan: () => nanType,
  map: () => mapType,
  makeIssue: () => makeIssue,
  literal: () => literalType,
  lazy: () => lazyType,
  late: () => late,
  isValid: () => isValid,
  isDirty: () => isDirty,
  isAsync: () => isAsync,
  isAborted: () => isAborted,
  intersection: () => intersectionType,
  instanceof: () => instanceOfType,
  getParsedType: () => getParsedType,
  getErrorMap: () => getErrorMap,
  function: () => functionType,
  enum: () => enumType,
  effect: () => effectsType,
  discriminatedUnion: () => discriminatedUnionType,
  defaultErrorMap: () => en_default,
  datetimeRegex: () => datetimeRegex,
  date: () => dateType,
  custom: () => custom,
  coerce: () => coerce,
  boolean: () => booleanType,
  bigint: () => bigIntType,
  array: () => arrayType,
  any: () => anyType,
  addIssueToContext: () => addIssueToContext,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransformer: () => ZodEffects,
  ZodSymbol: () => ZodSymbol,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodSchema: () => ZodType,
  ZodRecord: () => ZodRecord,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPipeline: () => ZodPipeline,
  ZodParsedType: () => ZodParsedType,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNever: () => ZodNever,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodIssueCode: () => ZodIssueCode,
  ZodIntersection: () => ZodIntersection,
  ZodFunction: () => ZodFunction,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodError: () => ZodError,
  ZodEnum: () => ZodEnum,
  ZodEffects: () => ZodEffects,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCatch: () => ZodCatch,
  ZodBranded: () => ZodBranded,
  ZodBoolean: () => ZodBoolean,
  ZodBigInt: () => ZodBigInt,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny,
  Schema: () => ZodType,
  ParseStatus: () => ParseStatus,
  OK: () => OK,
  NEVER: () => NEVER,
  INVALID: () => INVALID,
  EMPTY_PATH: () => EMPTY_PATH,
  DIRTY: () => DIRTY,
  BRAND: () => BRAND
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {};
  function assertIs(_arg) {}
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error;
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};

class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== undefined) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === en_default ? undefined : en_default
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}

class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}

class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus,
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}

class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}

class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};

class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};

class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};

class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};

class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};

class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};

class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};

class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};

class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};

class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};

class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};

class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : undefined,
          maximum: tooBig ? def.exactLength.value : undefined,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}

class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {} else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== undefined ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};

class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = undefined;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [undefined];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [undefined, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};

class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = new Map;
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}

class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};

class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};

class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}

class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = new Map;
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = new Map;
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};

class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = new Set;
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};

class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}

class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};

class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}

class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;

class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};

class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};

class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(undefined);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};

class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};

class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};

class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};

class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");

class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}

class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}

class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
// src/schema.ts
var CommandResponseSchema = exports_external.object({
  command: exports_external.string().optional().describe("The shell command to execute"),
  explanation: exports_external.string().optional().describe("Brief explanation of what the command does"),
  message: exports_external.string().optional().describe("Message from the LLM if it needs to ask a clarifying question or doesn't know"),
  risk_hint: exports_external.enum(["SAFE", "CAUTION", "DANGEROUS"]).optional().describe("Optional risk hint from the LLM"),
  exit_codes: exports_external.record(exports_external.string()).optional().describe("Map of exit codes to human-readable messages (e.g., {'0': 'Success', '1': 'No processes found'})")
});
var WhisperConfigSchema = exports_external.object({
  api_key: exports_external.string().optional(),
  selected_model: exports_external.string().default("xiaomi/mimo-v2-flash:free"),
  default_model: exports_external.string().default("xiaomi/mimo-v2-flash:free"),
  fallback_model: exports_external.string().default("mistralai/devstral-2512:free"),
  auto_run_safe: exports_external.boolean().default(true),
  max_output_lines: exports_external.number().default(300),
  command_timeout_ms: exports_external.number().default(1e4),
  arm_duration_seconds: exports_external.number().default(60),
  custom_denylist: exports_external.array(exports_external.string()).default([]),
  custom_allowlist: exports_external.array(exports_external.string()).default([]),
  first_run_complete: exports_external.boolean().default(false)
});
var DEFAULT_CONFIG = {
  api_key: undefined,
  selected_model: "xiaomi/mimo-v2-flash:free",
  default_model: "xiaomi/mimo-v2-flash:free",
  fallback_model: "mistralai/devstral-2512:free",
  auto_run_safe: true,
  max_output_lines: 300,
  command_timeout_ms: 1e4,
  arm_duration_seconds: 60,
  custom_denylist: [],
  custom_allowlist: [],
  first_run_complete: false
};

// src/config.ts
function getConfigPath() {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  const configDir = xdgConfig ? join(xdgConfig, "whisper") : join(homedir(), ".config", "whisper");
  return join(configDir, "config.json");
}
function getConfigDir() {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  return xdgConfig ? join(xdgConfig, "whisper") : join(homedir(), ".config", "whisper");
}
async function loadConfig() {
  const configPath = getConfigPath();
  try {
    const file = Bun.file(configPath);
    if (await file.exists()) {
      const json = await file.json();
      const parsed = WhisperConfigSchema.parse(json);
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load config, using defaults:", error);
  }
  return DEFAULT_CONFIG;
}
async function saveConfig(config) {
  const configDir = getConfigDir();
  const configPath = getConfigPath();
  try {
    await mkdir(configDir, { recursive: true });
    const validated = WhisperConfigSchema.parse(config);
    await Bun.write(configPath, JSON.stringify(validated, null, 2));
  } catch (error) {
    throw new Error(`Failed to save config: ${error}`);
  }
}
async function initConfig() {
  const config = await loadConfig();
  const configPath = getConfigPath();
  const file = Bun.file(configPath);
  if (!await file.exists()) {
    await saveConfig(DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
  }
  return config;
}

// src/repl.ts
import * as readline from "readline";

// src/tools.ts
import { platform } from "os";
function detectOS() {
  const p = platform();
  if (p === "darwin")
    return "macOS";
  if (p === "linux")
    return "Linux";
  return p;
}
function detectShell() {
  const shell = process.env.SHELL || "";
  if (shell.includes("zsh"))
    return "zsh";
  if (shell.includes("bash"))
    return "bash";
  if (shell.includes("fish"))
    return "fish";
  return "unknown";
}
function getCwd() {
  return process.cwd();
}
async function isCommandAvailable(command) {
  try {
    const proc = Bun.spawn(["which", command], {
      stdout: "ignore",
      stderr: "ignore"
    });
    await proc.exited;
    return proc.exitCode === 0;
  } catch {
    return false;
  }
}
async function detectAvailableTools() {
  const toolsToCheck = ["rg", "fd", "jq", "lsof", "ss", "netstat"];
  const available = [];
  for (const tool of toolsToCheck) {
    if (await isCommandAvailable(tool)) {
      available.push(tool);
    }
  }
  return available;
}
async function getEnvironmentContext() {
  return {
    os: detectOS(),
    shell: detectShell(),
    cwd: getCwd(),
    availableTools: await detectAvailableTools()
  };
}
function buildContextString(context) {
  const lines = [
    `OS: ${context.os}`,
    `Shell: ${context.shell}`,
    `Working Directory: ${context.cwd}`
  ];
  if (context.availableTools.length > 0) {
    lines.push(`Available Tools: ${context.availableTools.join(", ")}`);
  }
  return lines.join(`
`);
}

// src/openrouter.ts
var OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
var LLM_TIMEOUT_MS = 30000;
async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out after 30 seconds");
    }
    throw error;
  }
}
function buildSystemPrompt(context) {
  const contextStr = buildContextString(context);
  return `You are a shell command generator. Convert natural language requests into shell commands.

Environment:
${contextStr}

CRITICAL: Respond ONLY with valid JSON in ONE of these formats:

Format 1 - Command response:
{
  "command": "the shell command",
  "explanation": "brief explanation",
  "risk_hint": "SAFE" | "CAUTION" | "DANGEROUS",
  "exit_codes": {
    "0": "human-readable success message",
    "1": "human-readable failure message",
    ...
  }
}

Format 2 - Message response (when you need clarification or don't know):
{
  "message": "your question or explanation"
}

Examples:

User: "show me all files"
{
  "command": "ls -la",
  "explanation": "List all files including hidden ones with details",
  "risk_hint": "SAFE",
  "exit_codes": {
    "0": "Successfully listed files",
    "1": "Permission denied or directory not found"
  }
}

User: "what's using port 8080"
{
  "command": "lsof -i :8080",
  "explanation": "Find processes listening on port 8080",
  "risk_hint": "SAFE",
  "exit_codes": {
    "0": "Found processes using port 8080",
    "1": "No processes found on port 8080"
  }
}

User: "what port is my metro bundler running on"
{
  "command": "lsof -i -P -n | grep -i metro",
  "explanation": "Find metro bundler process and show the port it's using",
  "risk_hint": "SAFE",
  "exit_codes": {
    "0": "Found metro bundler process",
    "1": "Metro bundler is not running"
  }
}

User: "check if nginx is running"
{
  "command": "pgrep nginx",
  "explanation": "Check for nginx processes",
  "risk_hint": "SAFE",
  "exit_codes": {
    "0": "nginx is running",
    "1": "nginx is not running"
  }
}

User: "y"
{
  "message": "I'm not sure what you mean by 'y'. Could you provide more context about what you'd like to do?"
}

User: "delete temp directory"
{
  "command": "rm -rf ./temp",
  "explanation": "Recursively delete temp directory",
  "risk_hint": "DANGEROUS",
  "exit_codes": {
    "0": "Successfully deleted temp directory",
    "1": "Failed to delete - permission denied or not found"
  }
}

Rules:
- ONLY output JSON, no other text
- Use ${context.shell} shell syntax
- Prefer safe, read-only commands when possible
- Mark destructive operations as DANGEROUS
- Mark mutations as CAUTION
- ALWAYS include exit_codes with human-readable messages for common exit codes (especially 0 and 1)
- exit_codes should be context-specific (e.g., for lsof, exit code 1 means "no processes found", not generic failure)
- If unclear what the user wants, use "message" format to ask for clarification
- When using lsof to find processes, use "lsof -i -P -n | grep <name>" instead of "lsof -i :*" to avoid glob expansion issues
- Avoid shell glob patterns (*, ?, []) in arguments unless properly quoted
- Use grep with pipes for searching process names rather than relying on command-specific filters
- For port searches, use specific ports (lsof -i :8080) or pipe to grep (lsof -i -P -n | grep)`;
}
function parseJSONResponse(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      const extracted = cleaned.slice(start, end + 1);
      return JSON.parse(extracted);
    }
    throw new Error("Failed to parse JSON response from the model.");
  }
}
function formatAttemptError(attemptLabel, error) {
  const message = error instanceof Error ? error.message : typeof error === "string" ? error : String(error);
  const indented = message.replace(/\n/g, `
  `);
  return `${attemptLabel}
  ${indented}`;
}
async function callOpenRouter(model, userMessage, systemPrompt, apiKey, conversationHistory = []) {
  const messages = [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage }
  ];
  const response = await fetchWithTimeout(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://github.com/your-username/whisper-cli",
      "X-Title": "Whisper CLI"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      max_tokens: 500
    })
  }, LLM_TIMEOUT_MS);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${error}`);
  }
  const data = await response.json();
  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("Invalid response format from OpenRouter");
  }
  return data.choices[0].message.content;
}
async function generateCommand(userInput, context, defaultModel, fallbackModel, conversationHistory = []) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY environment variable not set. Get your key at https://openrouter.ai/");
  }
  const systemPrompt = buildSystemPrompt(context);
  try {
    const responseText = await callOpenRouter(defaultModel, userInput, systemPrompt, apiKey, conversationHistory);
    const parsed = parseJSONResponse(responseText);
    return CommandResponseSchema.parse(parsed);
  } catch (error) {
    console.error(formatAttemptError("Attempt 1 failed:", error));
  }
  try {
    const stricterPrompt = `${systemPrompt}

IMPORTANT: Your response must be ONLY valid JSON. Do not include any text before or after the JSON object.`;
    const responseText = await callOpenRouter(defaultModel, userInput, stricterPrompt, apiKey, conversationHistory);
    const parsed = parseJSONResponse(responseText);
    return CommandResponseSchema.parse(parsed);
  } catch (error) {
    console.error(formatAttemptError("Attempt 2 failed:", error));
  }
  try {
    const responseText = await callOpenRouter(fallbackModel, userInput, systemPrompt, apiKey, conversationHistory);
    const parsed = parseJSONResponse(responseText);
    return CommandResponseSchema.parse(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : typeof error === "string" ? error : String(error);
    throw new Error(`All 3 attempts failed to generate a valid command.
  Last error: ${message}`);
  }
}

// src/policy.ts
var SAFE_COMMANDS = new Set([
  "pwd",
  "cd",
  "ls",
  "cat",
  "head",
  "tail",
  "wc",
  "stat",
  "grep",
  "rg",
  "find",
  "fd",
  "ps",
  "pgrep",
  "lsof",
  "ss",
  "netstat",
  "echo",
  "date",
  "whoami",
  "hostname",
  "uname",
  "env",
  "printenv",
  "which",
  "whereis",
  "file",
  "type",
  "man",
  "help",
  "history",
  "clear",
  "tree",
  "df",
  "du",
  "free",
  "uptime",
  "top",
  "htop",
  "sw_vers",
  "system_profiler",
  "diskutil",
  "ifconfig",
  "ip",
  "route",
  "arp",
  "nslookup",
  "dig",
  "host",
  "ping",
  "traceroute",
  "cal",
  "bc",
  "units",
  "w",
  "users",
  "last",
  "lastlog",
  "id",
  "groups"
]);
var SAFE_GIT_SUBCOMMANDS = new Set([
  "status",
  "diff",
  "log",
  "show",
  "branch",
  "remote",
  "config",
  "blame",
  "reflog"
]);
var DANGEROUS_PATTERNS = [
  /rm\s+-rf/,
  /rm\s+-fr/,
  /git\s+reset\s+--hard/,
  /mkfs/,
  /\bdd\b/,
  /format/i,
  /:\(\)\{.*\|.*&\s*\}/,
  />\s*\/dev\/sda/,
  /chmod\s+-R\s+777/,
  /chown\s+-R/
];
var MUTATION_VERBS = new Set([
  "rm",
  "mv",
  "cp",
  "chmod",
  "chown",
  "kill",
  "killall",
  "pkill",
  "touch",
  "truncate",
  "unlink"
]);
var PACKAGE_MANAGERS = new Set([
  "npm",
  "yarn",
  "pnpm",
  "bun",
  "pip",
  "pip3",
  "brew",
  "apt",
  "apt-get",
  "yum",
  "dnf",
  "pacman",
  "cargo"
]);
var SENSITIVE_PATHS = [
  "/etc",
  "/var",
  "/usr",
  "/bin",
  "/sbin",
  "/boot",
  "/sys",
  "/proc",
  "~/.ssh",
  "~/.config",
  "/home",
  "/root"
];
function tokenizeCommand(command) {
  return command.trim().split(/\s+/);
}
function hasSudo(command) {
  const tokens = tokenizeCommand(command);
  return tokens[0] === "sudo";
}
function hasRedirection(command) {
  return /[>><&]/.test(command);
}
var SAFE_FILTERS = new Set([
  "grep",
  "rg",
  "awk",
  "sed",
  "head",
  "tail",
  "wc",
  "sort",
  "uniq",
  "cut",
  "tr",
  "column",
  "less",
  "more",
  "cat"
]);
function hasSafePipe(command) {
  if (!command.includes("|"))
    return false;
  const parts = command.split("|");
  const firstCommand = parts[0]?.trim().split(/\s+/)[0];
  if (!firstCommand || !SAFE_COMMANDS.has(firstCommand)) {
    return false;
  }
  for (let i = 1;i < parts.length; i++) {
    const part = parts[i]?.trim();
    if (!part)
      return false;
    const cmd = part.split(/\s+/)[0];
    if (!cmd || !SAFE_FILTERS.has(cmd)) {
      return false;
    }
  }
  return true;
}
function hasChaining(command) {
  return /[;&]/.test(command) || /\|\|/.test(command) || /&&/.test(command);
}
function hasSubshell(command) {
  return /\$\(/.test(command) || /`/.test(command);
}
function touchesSensitivePath(command) {
  return SENSITIVE_PATHS.some((path) => command.includes(path));
}
function matchesDangerousPattern(command) {
  return DANGEROUS_PATTERNS.some((pattern) => pattern.test(command));
}
function classifyRisk(command) {
  const tokens = tokenizeCommand(command);
  const baseCommand = tokens[0];
  if (!baseCommand) {
    return "DANGEROUS" /* DANGEROUS */;
  }
  if (matchesDangerousPattern(command)) {
    return "DANGEROUS" /* DANGEROUS */;
  }
  if (hasSudo(command)) {
    return "DANGEROUS" /* DANGEROUS */;
  }
  if (touchesSensitivePath(command)) {
    return "DANGEROUS" /* DANGEROUS */;
  }
  if (hasSafePipe(command)) {
    return "SAFE" /* SAFE */;
  }
  if (hasRedirection(command) || hasChaining(command) || hasSubshell(command) || command.includes("|")) {
    return "CAUTION" /* CAUTION */;
  }
  if (baseCommand === "git" && tokens.length > 1) {
    const subcommand = tokens[1];
    if (SAFE_GIT_SUBCOMMANDS.has(subcommand)) {
      return "SAFE" /* SAFE */;
    }
    return "CAUTION" /* CAUTION */;
  }
  if (MUTATION_VERBS.has(baseCommand)) {
    return "CAUTION" /* CAUTION */;
  }
  if (PACKAGE_MANAGERS.has(baseCommand)) {
    return "CAUTION" /* CAUTION */;
  }
  if (SAFE_COMMANDS.has(baseCommand)) {
    return "SAFE" /* SAFE */;
  }
  return "CAUTION" /* CAUTION */;
}
function evaluatePolicy(command, config, armMode) {
  for (const pattern of config.custom_denylist) {
    if (command.includes(pattern)) {
      return {
        allowed: false,
        riskLevel: "DANGEROUS" /* DANGEROUS */,
        requiresConfirmation: false,
        reason: "Blocked by custom denylist",
        blockingRule: pattern
      };
    }
  }
  for (const pattern of config.custom_allowlist) {
    if (command.includes(pattern)) {
      return {
        allowed: true,
        riskLevel: "SAFE" /* SAFE */,
        requiresConfirmation: false,
        reason: "Allowed by custom allowlist"
      };
    }
  }
  const riskLevel = classifyRisk(command);
  if (hasSudo(command)) {
    return {
      allowed: false,
      riskLevel: "DANGEROUS" /* DANGEROUS */,
      requiresConfirmation: false,
      reason: "sudo commands are always blocked for safety",
      blockingRule: "sudo_always_blocked"
    };
  }
  if (riskLevel === "DANGEROUS" /* DANGEROUS */) {
    if (!armMode) {
      return {
        allowed: false,
        riskLevel: "DANGEROUS" /* DANGEROUS */,
        requiresConfirmation: false,
        reason: "Dangerous command blocked. Use :arm to enable.",
        blockingRule: "dangerous_without_arm"
      };
    }
    return {
      allowed: true,
      riskLevel: "DANGEROUS" /* DANGEROUS */,
      requiresConfirmation: true,
      reason: "Dangerous command requires confirmation"
    };
  }
  if (riskLevel === "CAUTION" /* CAUTION */) {
    return {
      allowed: true,
      riskLevel: "CAUTION" /* CAUTION */,
      requiresConfirmation: true,
      reason: "Command requires confirmation"
    };
  }
  return {
    allowed: true,
    riskLevel: "SAFE" /* SAFE */,
    requiresConfirmation: !config.auto_run_safe,
    reason: "Safe command"
  };
}

// src/executor.ts
class OutputBuffer {
  lines = [];
  maxLines;
  truncated = false;
  constructor(maxLines = 300) {
    this.maxLines = maxLines;
  }
  addLine(line) {
    if (this.lines.length >= this.maxLines) {
      this.truncated = true;
      return;
    }
    this.lines.push(line);
  }
  getLines() {
    return this.lines;
  }
  isTruncated() {
    return this.truncated;
  }
  getOutput() {
    let output = this.lines.join(`
`);
    if (this.truncated) {
      output += `

... (output truncated at ${this.maxLines} lines)`;
    }
    return output;
  }
}
function getShell() {
  return process.env.SHELL || "/bin/sh";
}
async function executeCommand(command, config) {
  const startTime = Date.now();
  const buffer = new OutputBuffer(config.max_output_lines);
  try {
    const shell = getShell();
    const proc = Bun.spawn([shell, "-c", command], {
      stdout: "pipe",
      stderr: "pipe"
    });
    const timeoutMs = config.command_timeout_ms;
    const timeoutHandle = setTimeout(() => {
      proc.kill();
    }, timeoutMs);
    let timedOut = false;
    const stdoutReader = proc.stdout.getReader();
    const stderrReader = proc.stderr.getReader();
    async function readStream(reader) {
      const decoder = new TextDecoder;
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done)
            break;
          const text = decoder.decode(value, { stream: true });
          const lines = text.split(`
`);
          for (const line of lines) {
            if (line.trim()) {
              buffer.addLine(line);
              console.log(line);
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    }
    await Promise.all([readStream(stdoutReader), readStream(stderrReader)]);
    const exitCode = await proc.exited;
    clearTimeout(timeoutHandle);
    if (exitCode === null || exitCode === 124 || exitCode === 137) {
      timedOut = true;
    }
    const duration = Date.now() - startTime;
    return {
      exitCode: exitCode ?? -1,
      output: buffer.getOutput(),
      duration,
      truncated: buffer.isTruncated(),
      timedOut
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      exitCode: -1,
      output: `Error executing command: ${error}`,
      duration,
      truncated: false,
      timedOut: false
    };
  }
}

// src/logger.ts
import { join as join2 } from "path";
import { homedir as homedir2 } from "os";
import { mkdir as mkdir2 } from "fs/promises";
function getLogDir() {
  const xdgData = process.env.XDG_DATA_HOME;
  return xdgData ? join2(xdgData, "whisper") : join2(homedir2(), ".local", "share", "whisper");
}
function getLogPath() {
  return join2(getLogDir(), "log.jsonl");
}
async function ensureLogDir() {
  const logDir = getLogDir();
  await mkdir2(logDir, { recursive: true });
}
async function logAuditEntry(entry) {
  try {
    await ensureLogDir();
    const logPath = getLogPath();
    const line = JSON.stringify(entry) + `
`;
    const file = Bun.file(logPath);
    const writer = file.writer();
    if (await file.exists()) {
      const existingContent = await file.text();
      writer.write(existingContent);
    }
    writer.write(line);
    await writer.end();
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
async function readAuditHistory(limit = 20) {
  try {
    const logPath = getLogPath();
    const file = Bun.file(logPath);
    if (!await file.exists()) {
      return [];
    }
    const content = await file.text();
    const lines = content.trim().split(`
`).filter((line) => line.length > 0);
    const entries = [];
    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        entries.push(entry);
      } catch {
        continue;
      }
    }
    return entries.slice(-limit);
  } catch (error) {
    console.error("Failed to read audit history:", error);
    return [];
  }
}
function formatAuditEntry(entry) {
  const timestamp = new Date(entry.timestamp).toLocaleString();
  const status = entry.executed ? entry.exitCode === 0 ? "\u2713" : "\u2717" : "-";
  const risk = entry.riskLevel.padEnd(9);
  return `[${timestamp}] ${status} [${risk}] ${entry.command}`;
}

// src/spinner.ts
var ACCENT = "\x1B[38;5;214m";
var MUTED = "\x1B[38;5;245m";
var RESET = "\x1B[0m";

class LoadingSpinner {
  frames = ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"];
  currentFrame = 0;
  intervalId = null;
  isRunning = false;
  start(message = "Thinking") {
    if (this.isRunning)
      return;
    this.isRunning = true;
    this.currentFrame = 0;
    process.stdout.write("\x1B[?25l");
    this.render(message);
    this.intervalId = setInterval(() => {
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
      this.render(message);
    }, 80);
  }
  render(message) {
    const frame = this.frames[this.currentFrame];
    process.stdout.write(`\r${ACCENT}${frame}${RESET} ${message}${MUTED}\u2026${RESET}`);
  }
  stop() {
    if (!this.isRunning)
      return;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    process.stdout.write("\r\x1B[K");
    process.stdout.write("\x1B[?25h");
  }
}
function createSpinner() {
  return new LoadingSpinner;
}

// src/models.ts
var AVAILABLE_MODELS = [
  {
    id: "xiaomi/mimo-v2-flash:free",
    name: "MiMo-V2-Flash (free)",
    description: "Fast Xiaomi model",
    contextWindow: 262144,
    pricePer1MTokens: 0,
    speed: "fast",
    recommended: true
  },
  {
    id: "mistralai/devstral-2512:free",
    name: "Devstral 2 2512 (free)",
    description: "Free coding model",
    contextWindow: 262144,
    pricePer1MTokens: 0,
    speed: "fast"
  },
  {
    id: "x-ai/grok-code-fast-1",
    name: "Grok Code Fast 1",
    description: "Grok coding model",
    contextWindow: 256000,
    pricePer1MTokens: 0.85,
    speed: "fast"
  },
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    description: "Claude general-purpose",
    contextWindow: 1e6,
    pricePer1MTokens: 9,
    speed: "medium"
  },
  {
    id: "anthropic/claude-opus-4.5",
    name: "Claude Opus 4.5",
    description: "Highest-accuracy Claude",
    contextWindow: 200000,
    pricePer1MTokens: 15,
    speed: "slow"
  },
  {
    id: "google/gemini-3-flash-preview",
    name: "Gemini 3 Flash Preview",
    description: "Fast Google model",
    contextWindow: 1048576,
    pricePer1MTokens: 1.75,
    speed: "fast"
  },
  {
    id: "minimax/minimax-m2.1",
    name: "MiniMax M2.1",
    description: "Efficient coding model",
    contextWindow: 196608,
    pricePer1MTokens: 0.695,
    speed: "medium"
  },
  {
    id: "z-ai/glm-4.7",
    name: "GLM 4.7",
    description: "Z.AI flagship model",
    contextWindow: 202752,
    pricePer1MTokens: 0.95,
    speed: "medium"
  },
  {
    id: "deepseek/deepseek-v3.2",
    name: "DeepSeek V3.2",
    description: "Balanced DeepSeek",
    contextWindow: 163840,
    pricePer1MTokens: 0.315,
    speed: "medium"
  }
];
function getModelById(modelId) {
  return AVAILABLE_MODELS.find((m) => m.id === modelId);
}
function formatModelDisplay(model, isCurrent = false) {
  const marker = isCurrent ? "\u2192" : " ";
  const recommended = model.recommended ? " \u2605" : "";
  const price = model.pricePer1MTokens === 0 ? "free" : `$${model.pricePer1MTokens}/1M`;
  return `${marker} ${model.name}${recommended} \xB7 ${model.speed} \xB7 ${price}`;
}
function listModels(currentModelId) {
  return AVAILABLE_MODELS.map((model) => formatModelDisplay(model, model.id === currentModelId)).join(`
`);
}
// package.json
var package_default = {
  name: "@shahidrogers/whisper-cli",
  version: "0.2.0",
  description: "Natural language terminal assistant that converts your intentions into safe shell commands",
  type: "module",
  bin: {
    whisper: "./dist/index.js"
  },
  scripts: {
    dev: "bun run src/index.ts",
    build: "bun build src/index.ts --outdir dist --target bun",
    test: "bun test",
    lint: "tsc --noEmit",
    prepublishOnly: "bun run build"
  },
  keywords: [
    "cli",
    "terminal",
    "assistant",
    "ai",
    "shell",
    "natural-language",
    "llm",
    "openrouter",
    "command-line",
    "automation",
    "safety"
  ],
  author: "Shahid Rogers",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/shahidrogers/whisper-cli.git"
  },
  bugs: {
    url: "https://github.com/shahidrogers/whisper-cli/issues"
  },
  homepage: "https://github.com/shahidrogers/whisper-cli#readme",
  files: [
    "dist",
    "src",
    "LICENSE",
    "README.md"
  ],
  dependencies: {
    zod: "^3.22.4"
  },
  devDependencies: {
    "@types/bun": "latest",
    typescript: "^5.3.3"
  },
  engines: {
    bun: ">=1.0.0"
  },
  os: [
    "darwin",
    "linux"
  ]
};

// src/repl.ts
var VERSION = package_default.version;
var colors = {
  reset: "\x1B[0m",
  dim: "\x1B[2m",
  bold: "\x1B[1m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  magenta: "\x1B[35m",
  cyan: "\x1B[38;5;214m",
  orange: "\x1B[38;5;214m",
  slate: "\x1B[38;5;245m",
  accent: "\x1B[38;5;214m"
};
var ANSI_PATTERN = /\x1b\[[0-9;]*m/g;
function visibleLength(text) {
  return text.replace(ANSI_PATTERN, "").length;
}
function getTerminalWidth() {
  const columns = process.stdout.columns ?? 80;
  return Math.max(64, Math.min(96, columns - 4));
}
function padRight(text, width) {
  return text + " ".repeat(Math.max(0, width - visibleLength(text)));
}
function wrapWords(text, width) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }
    if (visibleLength(current) + 1 + word.length <= width) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current)
    lines.push(current);
  return lines.length > 0 ? lines : [""];
}
function enterAltScreen(stdout) {
  if (!stdout.isTTY)
    return false;
  const term = process.env.TERM ?? "";
  if (!term || term === "dumb")
    return false;
  stdout.write("\x1B[?1049h\x1B[?1047h\x1B[?47h\x1B[?25l");
  return true;
}
function exitAltScreen(stdout) {
  stdout.write("\x1B[?25h\x1B[?47l\x1B[?1047l\x1B[?1049l");
}
function getRiskBadge(risk) {
  switch (risk) {
    case "SAFE" /* SAFE */:
      return `${colors.green}[SAFE]${colors.reset}`;
    case "CAUTION" /* CAUTION */:
      return `${colors.yellow}[CAUTION]${colors.reset}`;
    case "DANGEROUS" /* DANGEROUS */:
      return `${colors.red}[DANGEROUS]${colors.reset}`;
  }
}
function renderPanel(title, lines, borderColor = colors.orange) {
  const width = getTerminalWidth();
  const contentWidth = width - 4;
  const headerText = ` ${colors.bold}${title}${colors.reset} `;
  const dashCount = Math.max(0, width - 2 - visibleLength(headerText));
  console.log(`
${borderColor}\u256D${colors.reset}${headerText}${borderColor}${"\u2500".repeat(dashCount)}\u256E${colors.reset}`);
  for (const line of lines) {
    console.log(`${borderColor}\u2502${colors.reset} ${padRight(line, contentWidth)} ${borderColor}\u2502${colors.reset}`);
  }
  console.log(`${borderColor}\u2570${"\u2500".repeat(width - 2)}\u256F${colors.reset}
`);
}
function showBoxedMessage(message) {
  const width = getTerminalWidth();
  const contentWidth = width - 4;
  const lines = wrapWords(message, contentWidth);
  renderPanel("Whisper", lines, colors.orange);
}
function showCommandPreview(command, explanation, risk, autoRun = false) {
  const width = getTerminalWidth();
  const contentWidth = width - 4;
  const badge = getRiskBadge(risk);
  const statusText = autoRun ? "AUTO-RUN" : "CONFIRM";
  let borderColor;
  switch (risk) {
    case "SAFE" /* SAFE */:
      borderColor = colors.green;
      break;
    case "CAUTION" /* CAUTION */:
      borderColor = colors.yellow;
      break;
    case "DANGEROUS" /* DANGEROUS */:
      borderColor = colors.red;
      break;
  }
  const headerText = ` ${badge} ${colors.dim}${statusText}${colors.reset} `;
  const dashCount = Math.max(0, width - 2 - visibleLength(headerText));
  console.log(`
${borderColor}\u256D${colors.reset}${headerText}${borderColor}${"\u2500".repeat(dashCount)}\u256E${colors.reset}`);
  const commandPrefixPlain = "Command: ";
  const commandPrefix = `${colors.bold}Command${colors.reset}: `;
  const commandLines = wrapWords(command, contentWidth - commandPrefixPlain.length);
  commandLines.forEach((line, idx) => {
    const text = idx === 0 ? `${commandPrefix}${line}` : `${" ".repeat(commandPrefixPlain.length)}${line}`;
    console.log(`${borderColor}\u2502${colors.reset} ${padRight(text, contentWidth)} ${borderColor}\u2502${colors.reset}`);
  });
  const explanationPrefixPlain = "Why: ";
  const explanationPrefix = `${colors.dim}Why${colors.reset}: `;
  const explanationLines = wrapWords(explanation, contentWidth - explanationPrefixPlain.length);
  explanationLines.forEach((line, idx) => {
    const text = idx === 0 ? `${explanationPrefix}${colors.dim}${line}${colors.reset}` : `${" ".repeat(explanationPrefixPlain.length)}${colors.dim}${line}${colors.reset}`;
    console.log(`${borderColor}\u2502${colors.reset} ${padRight(text, contentWidth)} ${borderColor}\u2502${colors.reset}`);
  });
  console.log(`${borderColor}\u2570${"\u2500".repeat(width - 2)}\u256F${colors.reset}
`);
}
function showOutputHeader(label = "Output") {
  const width = getTerminalWidth();
  const labelText = ` ${label} `;
  const dashCount = Math.max(0, width - visibleLength(labelText) - 3);
  console.log(`${colors.dim}\u256D\u2500${labelText}${"\u2500".repeat(dashCount)}\u256E${colors.reset}`);
}
function showOutputFooter() {
  const width = getTerminalWidth();
  console.log(`${colors.dim}\u2570${"\u2500".repeat(width - 2)}\u256F${colors.reset}`);
}
async function showWhisperAsciiArt() {
  const art = [
    "                                                      ",
    " \u2588\u2588\u2557    \u2588\u2588\u2557\u2588\u2588\u2557  \u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
    " \u2588\u2588\u2551    \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
    " \u2588\u2588\u2551 \u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
    " \u2588\u2588\u2551\u2588\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u255D  \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
    " \u255A\u2588\u2588\u2588\u2554\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551  \u2588\u2588\u2551",
    "  \u255A\u2550\u2550\u255D\u255A\u2550\u2550\u255D \u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D     \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D",
    "                                                      "
  ];
  const frames = 8;
  const delay = 12;
  process.stdout.write("\x1B[2J\x1B[0f");
  for (let frame = 0;frame <= frames; frame++) {
    const opacity = frame / frames;
    process.stdout.write("\x1B[0f");
    for (let i = 0;i < art.length; i++) {
      const line = art[i];
      let displayLine = "";
      for (let j = 0;j < line.length; j++) {
        const char = line[j];
        const charPosition = (i * line.length + j) / (art.length * line.length);
        if (opacity >= charPosition) {
          if (char !== " ") {
            const colorCode = Math.floor(90 + opacity * 10);
            displayLine += `\x1B[${colorCode}m${char}\x1B[0m`;
          } else {
            displayLine += char;
          }
        } else {
          displayLine += " ";
        }
      }
      process.stdout.write(displayLine + `
`);
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  process.stdout.write("\x1B[0f");
  for (const line of art) {
    let coloredLine = "";
    for (const char of line) {
      if (char !== " ") {
        coloredLine += `${colors.orange}${char}${colors.reset}`;
      } else {
        coloredLine += char;
      }
    }
    console.log(coloredLine);
  }
  await new Promise((resolve) => setTimeout(resolve, 120));
}
function buildPrompt(state) {
  const cwd = process.cwd();
  const home = __require("os").homedir();
  const shortCwd = cwd.startsWith(home) ? `~${cwd.slice(home.length)}` : cwd;
  const dirName = shortCwd.split("/").pop() || shortCwd;
  let prompt = `${colors.accent}whisper${colors.reset} ${colors.slate}${dirName}${colors.reset}`;
  const badges = [];
  if (state.dryRun)
    badges.push(`${colors.orange}DRY${colors.reset}`);
  if (state.armMode)
    badges.push(`${colors.red}ARMED${colors.reset}`);
  if (badges.length > 0) {
    prompt += ` ${colors.dim}\xB7${colors.reset} ${badges.join(" ")}`;
  }
  prompt += ` ${colors.accent}\u203A${colors.reset} `;
  return prompt;
}
function showHelp() {
  console.log(`
${colors.bold}Whisper${colors.reset} ${colors.dim}Natural Language Terminal Assistant${colors.reset}

${colors.bold}Try:${colors.reset}
  ${colors.accent}show me all files${colors.reset}
  ${colors.accent}what's using port 8080${colors.reset}
  ${colors.accent}find all .log files modified today${colors.reset}

${colors.bold}Usage:${colors.reset}
  Type natural language to generate commands, or type direct shell commands to skip the LLM.
  Follow-up questions work: "list apps on port 3000" then "port 4000?"
  Press ${colors.accent}Tab${colors.reset} to autocomplete paths.

${colors.bold}Meta:${colors.reset}
  ${colors.accent}/help${colors.reset}        Show this help message
  ${colors.accent}/exit${colors.reset}        Quit (or press Ctrl+D)
  ${colors.accent}/dry${colors.reset}         Toggle dry-run mode
  ${colors.accent}/models${colors.reset}      List all available models
  ${colors.accent}/model <id>${colors.reset}  Change the LLM model
  ${colors.accent}/key${colors.reset}         Change your OpenRouter API key
  ${colors.accent}/history${colors.reset}     Show last 20 commands from audit log
  ${colors.accent}/clear${colors.reset}       Clear conversation history
  ${colors.accent}/arm${colors.reset}         Enable dangerous commands for 60 seconds
  ${colors.accent}/unarm${colors.reset}       Disable arm mode

${colors.bold}Safety:${colors.reset}
  ${colors.green}SAFE${colors.reset}     Auto-executed (e.g., ls, cat, git status)
  ${colors.yellow}CAUTION${colors.reset} Requires confirmation (e.g., kill, mv, rm)
  ${colors.red}DANGEROUS${colors.reset} Blocked without /arm (e.g., sudo, rm -rf)
`);
}
function showFirstRunTips() {
  renderPanel("Welcome", [
    `${colors.green}\u2022${colors.reset} Type what you want in plain English`,
    `${colors.green}\u2022${colors.reset} Press ${colors.accent}Tab${colors.reset} to autocomplete paths`,
    `${colors.green}\u2022${colors.reset} Press ${colors.accent}ESC${colors.reset} while thinking to cancel`,
    `${colors.bold}Try:${colors.reset} ${colors.dim}"show me all files"${colors.reset} or ${colors.dim}"cd node"${colors.reset} then press Tab`
  ], colors.orange);
}
async function showHistorySimple() {
  const entries = await readAuditHistory(20);
  if (entries.length === 0) {
    console.log("No command history yet.");
    return;
  }
  console.log(`
${colors.bold}Recent Commands:${colors.reset}
`);
  for (const entry of entries) {
    console.log(formatAuditEntry(entry));
  }
  console.log();
}
async function showHistoryInteractive(rl) {
  const allEntries = await readAuditHistory(100);
  if (allEntries.length === 0) {
    console.log("No command history yet.");
    return;
  }
  let searchQuery = "";
  let filteredEntries = allEntries.reverse();
  let selectedIndex = 0;
  let showingDetails = false;
  const stdin = process.stdin;
  const stdout = process.stdout;
  const useAltScreen = enterAltScreen(stdout);
  const filterEntries = (query) => {
    if (!query)
      return allEntries;
    const lowerQuery = query.toLowerCase();
    return allEntries.filter((entry) => entry.command.toLowerCase().includes(lowerQuery) || entry.userInput.toLowerCase().includes(lowerQuery) || entry.explanation.toLowerCase().includes(lowerQuery));
  };
  const formatEntryLine = (entry, isSelected) => {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const status = entry.executed ? entry.exitCode === 0 ? `${colors.green}\u2713${colors.reset}` : `${colors.red}\u2717${colors.reset}` : `${colors.dim}-${colors.reset}`;
    let riskBadge = "";
    if (entry.riskLevel === "SAFE")
      riskBadge = `${colors.green}S${colors.reset}`;
    else if (entry.riskLevel === "CAUTION")
      riskBadge = `${colors.yellow}C${colors.reset}`;
    else
      riskBadge = `${colors.red}D${colors.reset}`;
    const marker = isSelected ? "\u2192" : " ";
    const lineColor = isSelected ? colors.cyan : "";
    const reset = isSelected ? colors.reset : "";
    return `${lineColor}${marker} ${timestamp} ${status} ${riskBadge} ${entry.command.slice(0, 60)}${reset}`;
  };
  const showDetails = (entry) => {
    stdout.write("\x1B[2J\x1B[H");
    console.log(`${colors.bold}Command Details${colors.reset}
`);
    console.log(`${colors.dim}Timestamp:${colors.reset} ${new Date(entry.timestamp).toLocaleString()}`);
    console.log(`${colors.dim}User Input:${colors.reset} ${entry.userInput}`);
    console.log(`${colors.dim}Command:${colors.reset} ${entry.command}`);
    console.log(`${colors.dim}Explanation:${colors.reset} ${entry.explanation}`);
    console.log(`${colors.dim}Risk Level:${colors.reset} ${entry.riskLevel}`);
    console.log(`${colors.dim}Executed:${colors.reset} ${entry.executed ? "Yes" : "No"}`);
    if (entry.executed) {
      console.log(`${colors.dim}Exit Code:${colors.reset} ${entry.exitCode}`);
      console.log(`${colors.dim}Duration:${colors.reset} ${entry.duration}ms`);
    }
    console.log(`${colors.dim}Dry Run:${colors.reset} ${entry.dryRun ? "Yes" : "No"}`);
    console.log(`${colors.dim}Armed:${colors.reset} ${entry.armMode ? "Yes" : "No"}`);
    console.log(`
${colors.dim}Press any key to go back...${colors.reset}`);
  };
  const render = () => {
    if (showingDetails)
      return;
    stdout.write("\x1B[2J\x1B[H");
    console.log(`${colors.bold}Command History${colors.reset} ${colors.dim}(${filteredEntries.length} entries)${colors.reset}`);
    if (searchQuery) {
      console.log(`${colors.dim}Search: ${searchQuery}_${colors.reset}`);
    } else {
      console.log(`${colors.dim}Type to search, \u2191/\u2193 to navigate, Enter for details, Esc to exit${colors.reset}`);
    }
    console.log();
    const maxDisplay = 15;
    const startIdx = Math.max(0, selectedIndex - Math.floor(maxDisplay / 2));
    const endIdx = Math.min(filteredEntries.length, startIdx + maxDisplay);
    for (let i = startIdx;i < endIdx; i++) {
      console.log(formatEntryLine(filteredEntries[i], i === selectedIndex));
    }
    if (filteredEntries.length === 0) {
      console.log(`${colors.yellow}No matching commands found${colors.reset}`);
    }
  };
  await new Promise((resolve) => {
    function cleanup() {
      stdin.removeListener("keypress", onKeypress);
      if (stdin.isTTY) {
        stdin.setRawMode(false);
      }
      if (useAltScreen) {
        exitAltScreen(stdout);
      } else {
        stdout.write("\x1B[2J\x1B[H");
      }
    }
    function finish() {
      cleanup();
      resolve();
    }
    const onKeypress = (_str, key) => {
      if (showingDetails) {
        showingDetails = false;
        render();
        return;
      }
      if (key?.name === "up") {
        selectedIndex = Math.max(0, selectedIndex - 1);
        render();
        return;
      }
      if (key?.name === "down") {
        selectedIndex = Math.min(filteredEntries.length - 1, selectedIndex + 1);
        render();
        return;
      }
      if (key?.name === "return") {
        if (filteredEntries.length > 0) {
          showingDetails = true;
          showDetails(filteredEntries[selectedIndex]);
        }
        return;
      }
      if (key?.name === "escape" || key?.name === "q") {
        finish();
        return;
      }
      if (key?.name === "backspace") {
        if (searchQuery.length > 0) {
          searchQuery = searchQuery.slice(0, -1);
          filteredEntries = filterEntries(searchQuery);
          selectedIndex = 0;
          render();
        }
        return;
      }
      if (key?.ctrl && key?.name === "c") {
        finish();
        return;
      }
      if (_str && !key?.ctrl && !key?.meta && _str.length === 1 && _str.charCodeAt(0) >= 32) {
        searchQuery += _str;
        filteredEntries = filterEntries(searchQuery);
        selectedIndex = 0;
        render();
      }
    };
    readline.emitKeypressEvents(stdin);
    if (stdin.isTTY) {
      stdin.setRawMode(true);
    }
    stdin.on("keypress", onKeypress);
    render();
  });
}
async function promptModelSelection(state, rl) {
  const models = AVAILABLE_MODELS;
  if (models.length === 0) {
    console.log(`${colors.red}No models available.${colors.reset}`);
    return;
  }
  let index = Math.max(0, models.findIndex((model) => model.id === state.config.selected_model));
  const stdin = process.stdin;
  const stdout = process.stdout;
  const useAltScreen = enterAltScreen(stdout);
  const formatModelLine = (model, isSelected) => {
    const marker = isSelected ? "\u2192" : " ";
    const recommended = model.recommended ? ` ${colors.green}\u2605${colors.reset}` : "";
    const lineColor = isSelected ? colors.accent : "";
    const price = model.pricePer1MTokens === 0 ? "free" : `$${model.pricePer1MTokens}/1M`;
    return `${lineColor}${marker} ${model.name}${recommended}${colors.reset} ${colors.dim}\xB7 ${model.speed} \xB7 ${price}${colors.reset}`;
  };
  const listStartRow = 3;
  const renderInitial = () => {
    stdout.write("\x1B[2J\x1B[H");
    stdout.write(`${colors.bold}Select a model:${colors.reset}
`);
    stdout.write(`${colors.dim}Use \u2191/\u2193 to move, Enter to select, Esc to cancel${colors.reset}

`);
    for (let i = 0;i < models.length; i += 1) {
      stdout.write(formatModelLine(models[i], i === index) + `
`);
    }
    stdout.write(`
`);
  };
  const redrawLine = (lineIndex, isSelected) => {
    if (lineIndex < 0 || lineIndex >= models.length)
      return;
    readline.cursorTo(stdout, 0, listStartRow + lineIndex);
    readline.clearLine(stdout, 0);
    stdout.write(formatModelLine(models[lineIndex], isSelected));
    readline.cursorTo(stdout, 0, listStartRow + models.length + 1);
  };
  const selected = await new Promise((resolve) => {
    function cleanup() {
      stdin.removeListener("keypress", onKeypress);
      if (stdin.isTTY) {
        stdin.setRawMode(false);
      }
      if (useAltScreen) {
        exitAltScreen(stdout);
      } else {
        stdout.write("\x1B[2J\x1B[H");
      }
    }
    function finish(value) {
      cleanup();
      resolve(value);
    }
    const onKeypress = (_str, key) => {
      if (key?.name === "up") {
        const prevIndex = index;
        index = (index - 1 + models.length) % models.length;
        redrawLine(prevIndex, false);
        redrawLine(index, true);
        return;
      }
      if (key?.name === "down") {
        const prevIndex = index;
        index = (index + 1) % models.length;
        redrawLine(prevIndex, false);
        redrawLine(index, true);
        return;
      }
      if (key?.name === "return") {
        finish(models[index]);
        return;
      }
      if (key?.name === "escape" || key?.name === "q") {
        finish(null);
      }
    };
    readline.emitKeypressEvents(stdin);
    if (stdin.isTTY) {
      stdin.setRawMode(true);
    }
    stdin.on("keypress", onKeypress);
    renderInitial();
  });
  if (!selected) {
    console.log(`${colors.yellow}Cancelled${colors.reset}
`);
    return;
  }
  state.config.selected_model = selected.id;
  await saveConfig(state.config);
  console.log(`${colors.green}\u2713${colors.reset} Model: ${colors.bold}${selected.name}${colors.reset}
`);
}
async function askConfirmation(rl, command, explanation, risk) {
  return new Promise((resolve) => {
    showCommandPreview(command, explanation, risk, false);
    rl.question(`${colors.bold}Proceed?${colors.reset} (y/n) ${colors.dim}[default: n]${colors.reset} `, (answer) => {
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
}
async function handleMetaCommand(command, state, rl) {
  const parts = command.slice(1).trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);
  switch (cmd) {
    case "help":
      showHelp();
      return true;
    case "exit":
    case "quit":
      state.running = false;
      return true;
    case "dry":
      state.dryRun = !state.dryRun;
      console.log(`Dry-run mode ${state.dryRun ? "enabled" : "disabled"}`);
      return true;
    case "models":
      if (!process.stdin.isTTY) {
        console.log(`
${colors.bold}Available Models:${colors.reset}
`);
        console.log(listModels(state.config.selected_model));
        console.log(`
${colors.dim}Use "/model <id>" to select a model${colors.reset}
`);
        return true;
      }
      await promptModelSelection(state, rl);
      return true;
    case "model":
      if (args.length === 0) {
        const currentModel = getModelById(state.config.selected_model);
        if (currentModel) {
          console.log(`
${colors.bold}Current:${colors.reset} ${currentModel.name}`);
        } else {
          console.log(`
${colors.bold}Current:${colors.reset} ${state.config.selected_model}`);
        }
        console.log(`${colors.dim}Use "/models" to see all options${colors.reset}
`);
      } else {
        const modelId = args.join(" ");
        const model = getModelById(modelId);
        if (!model) {
          console.log(`${colors.red}Error: Model not found: ${modelId}${colors.reset}`);
          console.log(`${colors.dim}Use "/models" to see all available models${colors.reset}`);
        } else {
          state.config.selected_model = modelId;
          await saveConfig(state.config);
          console.log(`${colors.green}\u2713${colors.reset} Model: ${colors.bold}${model.name}${colors.reset}
`);
        }
      }
      return true;
    case "history":
      if (process.stdin.isTTY) {
        await showHistoryInteractive(rl);
      } else {
        await showHistorySimple();
      }
      return true;
    case "arm":
      state.armMode = true;
      state.armExpiry = Date.now() + state.config.arm_duration_seconds * 1000;
      console.log(`${colors.red}\u26A0 Dangerous commands enabled for ${state.config.arm_duration_seconds} seconds${colors.reset}`);
      return true;
    case "unarm":
      state.armMode = false;
      state.armExpiry = null;
      console.log("Dangerous commands disabled");
      return true;
    case "key":
      return new Promise((resolve) => {
        rl.question("Enter new OpenRouter API key: ", async (answer) => {
          const newKey = answer.trim();
          if (newKey) {
            state.config.api_key = newKey;
            process.env.OPENROUTER_API_KEY = newKey;
            await saveConfig(state.config);
            console.log("API key updated and saved");
          } else {
            console.log("API key unchanged");
          }
          resolve(true);
        });
      });
    case "clear":
      state.conversationHistory = [];
      process.stdout.write("\x1B[2J\x1B[H");
      return true;
    default:
      console.log(`Unknown meta command: ${cmd}`);
      console.log('Type "/help" for available commands');
      return true;
  }
}
var META_COMMANDS = [
  { command: "/help", description: "Show this help message" },
  { command: "/exit", description: "Quit (or press Ctrl+D)" },
  { command: "/dry", description: "Toggle dry-run mode" },
  { command: "/models", description: "List all available models" },
  { command: "/model", description: "Change the LLM model" },
  { command: "/key", description: "Change your OpenRouter API key" },
  { command: "/history", description: "Show last 20 commands" },
  { command: "/clear", description: "Clear conversation history" },
  { command: "/arm", description: "Enable dangerous commands for 60s" },
  { command: "/unarm", description: "Disable arm mode" }
];
function getPathCompletions(partial) {
  const fs = __require("fs");
  const path = __require("path");
  try {
    if (!partial || partial.trim() === "") {
      partial = ".";
    }
    const home = __require("os").homedir();
    if (partial === "~") {
      partial = home;
    } else if (partial.startsWith("~/")) {
      partial = partial.replace("~", home);
    }
    const dir = path.dirname(partial);
    const base = path.basename(partial);
    const searchDir = dir === "." ? process.cwd() : path.resolve(process.cwd(), dir);
    if (!fs.existsSync(searchDir)) {
      return [];
    }
    const entries = fs.readdirSync(searchDir, { withFileTypes: true });
    const matches = entries.filter((entry) => {
      if (entry.name.startsWith(".") && !base.startsWith(".")) {
        return false;
      }
      return entry.name.startsWith(base);
    }).map((entry) => {
      const fullPath = dir === "." ? entry.name : path.join(dir, entry.name);
      return entry.isDirectory() ? fullPath + "/" : fullPath;
    }).sort();
    return matches;
  } catch (error) {
    return [];
  }
}
async function readLineWithAutocomplete(prompt, rl) {
  return new Promise((resolve) => {
    let input = "";
    let originalInput = "";
    let selectedIndex = -1;
    let suggestions = [];
    let pathCompletions = [];
    let completionMode = null;
    let suggestionsVisible = false;
    const stdin = process.stdin;
    const stdout = process.stdout;
    stdout.write(prompt);
    const redraw = () => {
      if (stdin.isTTY) {
        stdin.setRawMode(false);
      }
      stdout.write("\r");
      stdout.write("\x1B[K");
      stdout.write("\x1B[J");
      stdout.write(prompt + input);
      suggestionsVisible = false;
      if (completionMode === "meta" && suggestions.length > 0) {
        suggestionsVisible = true;
        stdout.write("\x1B[s");
        stdout.write(`
`);
        stdout.write(`${colors.dim}${"\u2500".repeat(70)}${colors.reset}
`);
        suggestions.forEach((item, idx) => {
          if (idx === selectedIndex) {
            stdout.write(`${colors.orange}\u25B8 ${colors.bold}${item.command.padEnd(18)}${colors.reset} ${colors.dim}\u2502${colors.reset} ${item.description}${colors.reset}`);
          } else {
            stdout.write(`  ${colors.dim}${item.command.padEnd(18)} \u2502 ${item.description}${colors.reset}`);
          }
          if (idx < suggestions.length - 1) {
            stdout.write(`
`);
          }
        });
        stdout.write(`
${colors.dim}${"\u2500".repeat(70)}${colors.reset}`);
        stdout.write("\x1B[u");
      } else if (completionMode === "path" && pathCompletions.length > 0) {
        suggestionsVisible = true;
        stdout.write("\x1B[s");
        stdout.write(`
`);
        const maxDisplay = Math.min(pathCompletions.length, 10);
        for (let i = 0;i < maxDisplay; i++) {
          const completion = pathCompletions[i];
          if (i === selectedIndex) {
            stdout.write(`${colors.cyan}\u25B8 ${completion}${colors.reset}`);
          } else {
            stdout.write(`  ${colors.dim}${completion}${colors.reset}`);
          }
          if (i < maxDisplay - 1) {
            stdout.write(`
`);
          }
        }
        if (pathCompletions.length > maxDisplay) {
          stdout.write(`
${colors.dim}  ... ${pathCompletions.length - maxDisplay} more${colors.reset}`);
        }
        stdout.write("\x1B[u");
      }
      if (stdin.isTTY) {
        stdin.setRawMode(true);
      }
    };
    const updateSuggestions = () => {
      const hadSuggestions = suggestions.length > 0 || pathCompletions.length > 0;
      if (input.startsWith("/") && input.length >= 1) {
        completionMode = "meta";
        pathCompletions = [];
        suggestions = META_COMMANDS.filter((cmd) => cmd.command.startsWith(input));
        if (suggestions.length > 0 && !hadSuggestions) {
          originalInput = input;
          selectedIndex = -1;
        } else if (suggestions.length > 0 && selectedIndex >= suggestions.length) {
          selectedIndex = suggestions.length - 1;
        } else if (suggestions.length === 0) {
          selectedIndex = -1;
          originalInput = "";
        }
      } else {
        suggestions = [];
        completionMode = null;
        pathCompletions = [];
        selectedIndex = -1;
        originalInput = "";
      }
    };
    const updatePathCompletions = () => {
      const words = input.split(/\s+/);
      if (words.length === 0) {
        pathCompletions = [];
        return;
      }
      const lastWord = words[words.length - 1] || "";
      if (lastWord.length === 0 && words.length === 1) {
        pathCompletions = [];
        return;
      }
      pathCompletions = getPathCompletions(lastWord);
      if (pathCompletions.length > 0) {
        completionMode = "path";
        originalInput = input;
        selectedIndex = -1;
      } else {
        completionMode = null;
        selectedIndex = -1;
        originalInput = "";
      }
    };
    const onKeypress = (str, key) => {
      if (!key)
        return;
      if (key.name === "return" || key.name === "enter") {
        const result = input;
        stdin.removeListener("keypress", onKeypress);
        if (stdin.isTTY) {
          stdin.setRawMode(false);
        }
        stdout.write("\x1B[J");
        stdout.write(`
`);
        resolve(result);
        return;
      }
      if (key.ctrl && key.name === "c") {
        stdout.write(`
`);
        stdin.setRawMode(false);
        stdin.removeListener("keypress", onKeypress);
        process.exit(0);
      }
      if (key.ctrl && key.name === "d") {
        if (input.length === 0) {
          stdout.write(`
`);
          stdin.setRawMode(false);
          stdin.removeListener("keypress", onKeypress);
          resolve("");
          return;
        }
      }
      if (key.name === "escape") {
        if (completionMode && originalInput) {
          input = originalInput;
          suggestions = [];
          pathCompletions = [];
          completionMode = null;
          selectedIndex = -1;
          originalInput = "";
          redraw();
        }
        return;
      }
      if (key.name === "backspace") {
        if (key.meta) {
          input = "";
          pathCompletions = [];
          completionMode = null;
          selectedIndex = -1;
          originalInput = "";
          updateSuggestions();
          redraw();
          return;
        }
        if (input.length > 0) {
          input = input.slice(0, -1);
          pathCompletions = [];
          completionMode = null;
          selectedIndex = -1;
          originalInput = "";
          updateSuggestions();
          redraw();
        }
        return;
      }
      if (key.ctrl && key.name === "u") {
        input = "";
        pathCompletions = [];
        completionMode = null;
        selectedIndex = -1;
        originalInput = "";
        updateSuggestions();
        redraw();
        return;
      }
      if (key.ctrl && key.name === "k") {
        input = "";
        pathCompletions = [];
        completionMode = null;
        selectedIndex = -1;
        originalInput = "";
        updateSuggestions();
        redraw();
        return;
      }
      if (key.name === "up") {
        if (completionMode === "meta" && suggestions.length > 0) {
          if (selectedIndex === -1) {
            selectedIndex = suggestions.length - 1;
          } else {
            selectedIndex = selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1;
          }
          input = suggestions[selectedIndex].command;
          redraw();
        } else if (completionMode === "path" && pathCompletions.length > 0) {
          if (selectedIndex === -1) {
            selectedIndex = pathCompletions.length - 1;
          } else {
            selectedIndex = selectedIndex <= 0 ? pathCompletions.length - 1 : selectedIndex - 1;
          }
          const words = originalInput.split(/\s+/);
          words[words.length - 1] = pathCompletions[selectedIndex];
          input = words.join(" ");
          redraw();
        }
        return;
      }
      if (key.name === "down") {
        if (completionMode === "meta" && suggestions.length > 0) {
          if (selectedIndex === -1) {
            selectedIndex = 0;
          } else {
            selectedIndex = selectedIndex >= suggestions.length - 1 ? 0 : selectedIndex + 1;
          }
          input = suggestions[selectedIndex].command;
          redraw();
        } else if (completionMode === "path" && pathCompletions.length > 0) {
          if (selectedIndex === -1) {
            selectedIndex = 0;
          } else {
            selectedIndex = selectedIndex >= pathCompletions.length - 1 ? 0 : selectedIndex + 1;
          }
          const words = originalInput.split(/\s+/);
          words[words.length - 1] = pathCompletions[selectedIndex];
          input = words.join(" ");
          redraw();
        }
        return;
      }
      if (key.name === "tab") {
        if (completionMode === "meta" && suggestions.length > 0) {
          if (selectedIndex === -1) {
            selectedIndex = 0;
          } else {
            selectedIndex = selectedIndex >= suggestions.length - 1 ? 0 : selectedIndex + 1;
          }
          input = suggestions[selectedIndex].command;
          redraw();
        } else if (completionMode === "path" && pathCompletions.length > 0) {
          if (pathCompletions.length === 1) {
            const words = originalInput.split(/\s+/);
            words[words.length - 1] = pathCompletions[0];
            input = words.join(" ");
            pathCompletions = [];
            completionMode = null;
            selectedIndex = -1;
            originalInput = "";
            updateSuggestions();
            redraw();
          } else {
            if (selectedIndex === -1) {
              selectedIndex = 0;
            } else {
              selectedIndex = selectedIndex >= pathCompletions.length - 1 ? 0 : selectedIndex + 1;
            }
            const words = originalInput.split(/\s+/);
            words[words.length - 1] = pathCompletions[selectedIndex];
            input = words.join(" ");
            redraw();
          }
        } else {
          updatePathCompletions();
          redraw();
        }
        return;
      }
      if (str && !key.ctrl && !key.meta) {
        input += str;
        pathCompletions = [];
        completionMode = null;
        selectedIndex = -1;
        originalInput = "";
        updateSuggestions();
        redraw();
      }
    };
    readline.emitKeypressEvents(stdin);
    if (stdin.isTTY) {
      stdin.setRawMode(true);
    }
    stdin.on("keypress", onKeypress);
  });
}
async function startRepl(initialConfig) {
  const state = {
    config: initialConfig,
    armMode: false,
    armExpiry: null,
    dryRun: false,
    running: true,
    conversationHistory: []
  };
  await showWhisperAsciiArt();
  console.log(`${colors.bold}Whisper${colors.reset} ${colors.dim}v${VERSION}${colors.reset} ${colors.slate}\u2014 Natural Language Terminal Assistant${colors.reset}`);
  const currentModel = getModelById(state.config.selected_model);
  const modelName = currentModel ? currentModel.name : state.config.selected_model;
  console.log(`${colors.slate}Model:${colors.reset} ${modelName} ${colors.dim}\xB7${colors.reset} ${colors.accent}/models${colors.reset} ${colors.dim}\xB7${colors.reset} ${colors.accent}/help${colors.reset} ${colors.dim}\xB7${colors.reset} ${colors.accent}/exit${colors.reset}
`);
  if (!state.config.first_run_complete) {
    showFirstRunTips();
    state.config.first_run_complete = true;
    await saveConfig(state.config);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const context = await getEnvironmentContext();
  while (state.running) {
    if (state.armMode && state.armExpiry && Date.now() > state.armExpiry) {
      state.armMode = false;
      state.armExpiry = null;
      console.log(`
${colors.yellow}Arm mode expired${colors.reset}
`);
    }
    let userInput = await readLineWithAutocomplete(buildPrompt(state), rl);
    userInput = userInput.trim();
    if (!userInput) {
      continue;
    }
    if (userInput.startsWith("/")) {
      if (userInput.length > 1) {
        await handleMetaCommand(userInput, state, rl);
      }
      continue;
    }
    const commonCommands = [
      "ls",
      "cd",
      "pwd",
      "cat",
      "echo",
      "grep",
      "find",
      "ps",
      "top",
      "kill",
      "mv",
      "cp",
      "rm",
      "mkdir",
      "rmdir",
      "touch",
      "chmod",
      "chown",
      "git",
      "npm",
      "yarn",
      "bun",
      "node",
      "python",
      "pip",
      "curl",
      "wget",
      "ssh",
      "scp",
      "rsync",
      "tar",
      "zip",
      "unzip",
      "vim",
      "nano",
      "emacs",
      "less",
      "more",
      "head",
      "tail",
      "df",
      "du",
      "free",
      "uptime",
      "who",
      "whoami",
      "date",
      "export",
      "env",
      "printenv",
      "which",
      "whereis",
      "man",
      "history",
      "clear",
      "exit"
    ];
    const words = userInput.trim().split(/\s+/);
    const firstWord = words[0];
    const naturalLanguagePronouns = ["it", "that", "this", "them", "those", "these", "here", "there"];
    const hasNaturalLanguage = words.slice(1).some((word) => naturalLanguagePronouns.includes(word.toLowerCase()));
    const isDirectCommand = commonCommands.includes(firstWord) && !hasNaturalLanguage;
    if (firstWord === "cd") {
      const args = userInput.trim().split(/\s+/).slice(1);
      let targetDir = args[0] || __require("os").homedir();
      const home = __require("os").homedir();
      if (targetDir === "~") {
        targetDir = home;
      } else if (targetDir.startsWith("~/")) {
        targetDir = targetDir.replace("~", home);
      }
      try {
        const path = __require("path");
        const resolvedPath = path.resolve(process.cwd(), targetDir);
        const fs = __require("fs");
        if (!fs.existsSync(resolvedPath)) {
          console.log(`${colors.red}\u2717 Directory not found:${colors.reset} ${targetDir}
`);
          continue;
        }
        const stats = fs.statSync(resolvedPath);
        if (!stats.isDirectory()) {
          console.log(`${colors.red}\u2717 Not a directory:${colors.reset} ${targetDir}
`);
          continue;
        }
        process.chdir(resolvedPath);
        console.log(`${colors.green}\u2713${colors.reset} ${colors.dim}Changed directory to ${process.cwd()}${colors.reset}
`);
      } catch (error) {
        console.log(`${colors.red}\u2717 Failed to change directory:${colors.reset} ${error}
`);
      }
      continue;
    }
    if (isDirectCommand) {
      const command = userInput;
      const explanation = `Direct shell command: ${command}`;
      const policy = evaluatePolicy(command, state.config, state.armMode);
      if (!policy.allowed) {
        console.log(`
${colors.red}\u2717 Blocked:${colors.reset} ${policy.reason}`);
        if (policy.blockingRule) {
          console.log(`${colors.dim}Rule: ${policy.blockingRule}${colors.reset}
`);
        }
        if (policy.riskLevel === "DANGEROUS" /* DANGEROUS */ && !state.armMode) {
          console.log(`${colors.bold}To enable dangerous commands:${colors.reset}`);
          console.log(`  \u2022 Use ${colors.cyan}/arm${colors.reset} to enable for 60 seconds`);
          console.log(`  \u2022 Use ${colors.cyan}/dry${colors.reset} to preview the command without executing
`);
        } else {
          console.log(`${colors.dim}This command was blocked by your safety rules.${colors.reset}
`);
        }
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: false,
          executed: false,
          dryRun: state.dryRun,
          armMode: state.armMode
        });
        continue;
      }
      let confirmed = true;
      if (policy.requiresConfirmation) {
        confirmed = await askConfirmation(rl, command, explanation, policy.riskLevel);
      }
      if (!confirmed) {
        console.log(`${colors.yellow}Cancelled${colors.reset}`);
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: false,
          dryRun: state.dryRun,
          armMode: state.armMode
        });
        continue;
      }
      if (state.dryRun) {
        console.log(`${colors.orange}[DRY RUN]${colors.reset} Would execute: ${command}`);
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: false,
          dryRun: true,
          armMode: state.armMode
        });
      } else {
        console.log(`${colors.accent}\u2192${colors.reset} ${colors.dim}${command}${colors.reset}`);
        showOutputHeader("Output");
        const result = await executeCommand(command, state.config);
        showOutputFooter();
        const statusIcon = result.exitCode === 0 ? `${colors.green}\u2713${colors.reset}` : `${colors.red}\u2717${colors.reset}`;
        const exitMessage = result.exitCode === 0 ? "Success" : `Exit code: ${result.exitCode}`;
        console.log(`${statusIcon} ${exitMessage} ${colors.dim}(${result.duration}ms)${colors.reset}`);
        if (result.timedOut) {
          console.log(`${colors.yellow}\u26A0 Command timed out${colors.reset}`);
        }
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: true,
          exitCode: result.exitCode,
          duration: result.duration,
          dryRun: false,
          armMode: state.armMode
        });
      }
      console.log();
      continue;
    }
    try {
      const spinner = createSpinner();
      let cancelled = false;
      const abortController = new AbortController;
      const stdin = process.stdin;
      const onKeypress = (str, key) => {
        if (key && key.name === "escape") {
          cancelled = true;
          abortController.abort();
          spinner.stop();
          stdin.setRawMode(false);
          stdin.removeListener("keypress", onKeypress);
          console.log(`${colors.yellow}Cancelled${colors.reset}
`);
        }
      };
      readline.emitKeypressEvents(stdin);
      if (stdin.isTTY) {
        stdin.setRawMode(true);
      }
      stdin.on("keypress", onKeypress);
      spinner.start("Thinking");
      let response;
      try {
        response = await generateCommand(userInput, context, state.config.selected_model, state.config.fallback_model, state.conversationHistory);
      } catch (error) {
        spinner.stop();
        if (stdin.isTTY && stdin.setRawMode) {
          stdin.setRawMode(false);
        }
        stdin.removeListener("keypress", onKeypress);
        if (cancelled) {
          continue;
        }
        throw error;
      }
      spinner.stop();
      if (stdin.isTTY && stdin.setRawMode) {
        stdin.setRawMode(false);
      }
      stdin.removeListener("keypress", onKeypress);
      if (cancelled) {
        continue;
      }
      if (response.message) {
        showBoxedMessage(response.message);
        state.conversationHistory.push({ role: "user", content: userInput });
        state.conversationHistory.push({ role: "assistant", content: response.message });
        if (state.conversationHistory.length > 20) {
          state.conversationHistory = state.conversationHistory.slice(-20);
        }
        continue;
      }
      if (!response.command || !response.explanation) {
        console.log(`
${colors.red}\u2717 Error: Invalid response from LLM${colors.reset}`);
        console.log(`${colors.dim}The model couldn't generate a valid command.${colors.reset}
`);
        console.log(`${colors.bold}Try:${colors.reset}`);
        console.log(`  \u2022 Rephrase your request more specifically`);
        console.log(`  \u2022 Use ${colors.cyan}/models${colors.reset} to switch to a different model`);
        console.log(`  \u2022 Check ${colors.cyan}/history${colors.reset} for examples of successful commands
`);
        continue;
      }
      const { command, explanation, exit_codes } = response;
      state.conversationHistory.push({ role: "user", content: userInput });
      state.conversationHistory.push({
        role: "assistant",
        content: `Command: ${command}
Explanation: ${explanation}`
      });
      if (state.conversationHistory.length > 20) {
        state.conversationHistory = state.conversationHistory.slice(-20);
      }
      const policy = evaluatePolicy(command, state.config, state.armMode);
      if (!policy.allowed) {
        console.log(`
${colors.red}\u2717 Blocked:${colors.reset} ${policy.reason}`);
        if (policy.blockingRule) {
          console.log(`${colors.dim}Rule: ${policy.blockingRule}${colors.reset}
`);
        }
        if (policy.riskLevel === "DANGEROUS" /* DANGEROUS */ && !state.armMode) {
          console.log(`${colors.bold}To enable dangerous commands:${colors.reset}`);
          console.log(`  \u2022 Use ${colors.cyan}/arm${colors.reset} to enable for 60 seconds`);
          console.log(`  \u2022 Use ${colors.cyan}/dry${colors.reset} to preview the command without executing
`);
        } else {
          console.log(`${colors.dim}This command was blocked by your safety rules.${colors.reset}
`);
        }
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: false,
          executed: false,
          dryRun: state.dryRun,
          armMode: state.armMode
        });
        continue;
      }
      let confirmed = true;
      if (policy.requiresConfirmation) {
        confirmed = await askConfirmation(rl, command, explanation, policy.riskLevel);
      }
      if (!confirmed) {
        console.log(`${colors.yellow}Cancelled${colors.reset}`);
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: false,
          dryRun: state.dryRun,
          armMode: state.armMode
        });
        continue;
      }
      if (state.dryRun) {
        console.log(`${colors.orange}[DRY RUN]${colors.reset} Would execute: ${command}`);
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: false,
          dryRun: true,
          armMode: state.armMode
        });
      } else {
        console.log(`${colors.accent}\u2192${colors.reset} ${colors.dim}${command}${colors.reset}`);
        showOutputHeader("Output");
        const result = await executeCommand(command, state.config);
        showOutputFooter();
        const statusIcon = result.exitCode === 0 ? `${colors.green}\u2713${colors.reset}` : `${colors.red}\u2717${colors.reset}`;
        let exitMessage = `Exit code: ${result.exitCode}`;
        if (exit_codes && exit_codes[result.exitCode.toString()]) {
          exitMessage = exit_codes[result.exitCode.toString()];
        }
        console.log(`${statusIcon} ${exitMessage} ${colors.dim}(${result.duration}ms)${colors.reset}`);
        if (result.timedOut) {
          console.log(`${colors.yellow}\u26A0 Command timed out${colors.reset}`);
        }
        await logAuditEntry({
          timestamp: new Date().toISOString(),
          userInput,
          command,
          explanation,
          riskLevel: policy.riskLevel,
          allowed: true,
          executed: true,
          exitCode: result.exitCode,
          duration: result.duration,
          dryRun: false,
          armMode: state.armMode
        });
      }
    } catch (error) {
      console.log(`
${colors.red}\u2717 Error:${colors.reset} ${error}
`);
      const errorStr = String(error).toLowerCase();
      console.log(`${colors.bold}Troubleshooting:${colors.reset}`);
      if (errorStr.includes("api") || errorStr.includes("key") || errorStr.includes("unauthorized")) {
        console.log(`  \u2022 Check your API key with ${colors.cyan}/key${colors.reset}`);
        console.log(`  \u2022 Verify you have credits at ${colors.cyan}https://openrouter.ai${colors.reset}`);
      } else if (errorStr.includes("timeout")) {
        console.log(`  \u2022 The request timed out - try again`);
        console.log(`  \u2022 Consider using a faster model with ${colors.cyan}/models${colors.reset}`);
      } else if (errorStr.includes("network") || errorStr.includes("fetch")) {
        console.log(`  \u2022 Check your internet connection`);
        console.log(`  \u2022 OpenRouter API may be temporarily unavailable`);
      } else {
        console.log(`  \u2022 Try rephrasing your request`);
        console.log(`  \u2022 Use ${colors.cyan}/help${colors.reset} for usage information`);
        console.log(`  \u2022 Use ${colors.cyan}/clear${colors.reset} to reset conversation history`);
      }
      console.log();
    }
    console.log();
  }
  rl.close();
  console.log(`
Goodbye!`);
}

// src/index.ts
async function promptForApiKey() {
  const rl = readline2.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log(`
Welcome to Whisper CLI!`);
  console.log(`
To get started, you need an OpenRouter API key.`);
  console.log("Get your free key at: https://openrouter.ai/");
  console.log(`(You can also set the OPENROUTER_API_KEY environment variable)
`);
  return new Promise((resolve) => {
    rl.question("Enter your OpenRouter API key: ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}
async function main() {
  const p = platform2();
  if (p !== "darwin" && p !== "linux") {
    console.error(`Error: Unsupported platform: ${p}`);
    console.error("Whisper CLI only supports macOS and Linux");
    process.exit(1);
  }
  try {
    let config = await initConfig();
    const envApiKey = process.env.OPENROUTER_API_KEY;
    if (!envApiKey && !config.api_key) {
      const apiKey = await promptForApiKey();
      if (!apiKey) {
        console.error(`
Error: API key is required`);
        process.exit(1);
      }
      config.api_key = apiKey;
      await saveConfig(config);
      console.log(`
API key saved to config file.`);
      console.log(`You can change it later by editing: ~/.config/whisper/config.json
`);
    }
    if (envApiKey) {
      process.env.OPENROUTER_API_KEY = envApiKey;
    } else if (config.api_key) {
      process.env.OPENROUTER_API_KEY = config.api_key;
    }
    await startRepl(config);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}
main();
