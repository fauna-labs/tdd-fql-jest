// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb, { CreateFunction } from 'faunadb';

const q = faunadb.query
const {
  Concat,
  FindStrRegex,
  Lambda,
  Map,
  Select,
  Var
} = q;

export function Split(str, sep) {
  return Map(
    FindStrRegex(str, Concat(["[^\\", sep, "]+"])),
    Lambda("res", Select(["data"], Var("res")))
  )
};

// Pre-implementation function stub
//
// export function Split(str, sep) {
//   return undefined;
// };
